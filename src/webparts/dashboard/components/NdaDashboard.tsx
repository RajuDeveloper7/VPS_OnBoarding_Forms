import * as React from 'react';
import { IDashboardProps } from './IDashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import '@pnp/sp/site-users';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import * as $ from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as moment from 'moment';
import swal from 'sweetalert';



// SPComponentLoader.loadCss(`https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`);
// SPComponentLoader.loadCss(
//   "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.5"
// );

export interface IEmployeeNdaDashboardState {
  Items: any[];
  DynamicFilter: string;
  IsEmployee: boolean;
  IsUnitHR: boolean;
  IsGroupHR: boolean;
  IsHeadHR: boolean;
  UnitHrUnitDetails: string;
  GroupHRUnitDetails: string;

}
let MasterGlobArray: any = [];
const HrUnitNames: any = [];
const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");
var curentndaid: number = null;
export default class EmployeeNdaDashboard extends React.Component<IDashboardProps, IEmployeeNdaDashboardState, {}> {
  public constructor(props: IDashboardProps, state: IEmployeeNdaDashboardState) {
    super(props);
    this.state = {
      Items: [],
      DynamicFilter: `Author/Id eq ${this.props.UserId}`,
      IsEmployee: true,
      IsUnitHR: false,
      IsGroupHR: false,
      IsHeadHR: false,
      UnitHrUnitDetails: "",
      GroupHRUnitDetails: "",

    }
  }

  public componentDidMount() {
    $('div[data-automation-id="pageHeader"]').attr('style', 'display: none !important');
    $('#spCommandBar').attr('style', 'display: none !important');
    $('#spLeftNav').attr('style', 'display: none !important');
    $('div[data-automation-id="pageHeader"]').attr('style', 'display: none !important');
    $("#spCommandBar,#SuiteNavWrapper").attr('style', 'display: none !important');
    // this.GetNdaListItems();
    $(`#no-ndadata`).hide();
    this.GetCurrentUserIDnda();

  }

  public GetHrMasterSubmitStatus() {
    newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("StatusbyUnitHR eq 'Completed'").get().then((resp) => {
      if (resp.length != 0) {
        for (var i = 0; i < resp.length; i++) {
          // $("#" + resp[i].ONBSessionID + "").remove();
        }
      }
    })
  }

  // public async GetNdaListItems() {
  //   // get all the items from a list
  //   await newweb.lists.getByTitle("Emp NDA Transaction").items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address","Status", "Author/Title").expand("Author").get().then((response) => {
  //     if (response.length != 0) {
  //       this.setState({
  //         Items: response
  //       });
  //       setTimeout(() => {
  //         ($('#examplenda') as any).DataTable();
  //       }, 1500);

  //     }

  //   });
  // }


  public GetCurrentUserIDnda() {
    var reacthandler = this;
    let curruser = newweb.currentUser.get().then(function (res) {

      var loacurrentuserid = res.Id;
      curentndaid = res.Id;
      reacthandler.GetcurrentUserViewLevels(loacurrentuserid);

    })
  }

  public async GetcurrentUserViewLevels(personalid) {
    //Unit hr
    await newweb.lists
      .getByTitle("UNIT HR MASTER")
      .items.select("Name/Id", "Business/Title")
      .expand("Name", "Business")
      .filter(`Name/Id eq ${personalid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          this.setState({
            IsUnitHR: true,
            IsEmployee: false,

          });
          for (var i = 0; i < response.length; i++) {

            if (HrUnitNames.indexOf(response[i].Business.Title) == -1) {
              HrUnitNames.push(response[i].Business.Title)
            }

          }
        }
      });

    //Group hr
    await newweb.lists
      .getByTitle("Group Hr Manager Master")
      .items.select("Name/Id", "Business/Title")
      .expand("Name", "Business")
      .filter(`Name/Id eq ${personalid}`)
      .get()
      .then((response) => {


        if (response.length != 0) {

          this.setState({
            IsGroupHR: true,
            IsEmployee: false,
            GroupHRUnitDetails: response[0].Business.Title,
          });


        }
      });

    //Head HR
    await newweb.lists
      .getByTitle("Group Head Hr Master")
      .items.select("Name/Id")
      .expand("Name")
      .filter(`Name/Id eq ${personalid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          this.setState({
            IsHeadHR: true,
            IsEmployee: false,
          });

        }
      });

    if (this.state.IsHeadHR == true) {
      this.GetEmpNDATransactionListItems("HRHead");
    } else if (this.state.IsUnitHR == true && this.state.IsGroupHR == false) {
      this.GetEmpNDATransactionListItems("UnitHR");
    } else if (this.state.IsUnitHR == false && this.state.IsGroupHR == true) {
      this.GetEmpNDATransactionListItems("GroupHR");
    } else if (this.state.IsUnitHR == true && this.state.IsGroupHR == true) {
      this.GetEmpNDATransactionListItems("GroupHR-UnitHR");
    }
  }

  public async GetEmpNDATransactionListItems(ViewMode) {

    // get all the items from a list
    if (ViewMode == "UnitHR") {
      for (var i = 0; i < HrUnitNames.length; i++) {
        await newweb.lists
          .getByTitle("Emp NDA Transaction")
          .items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address", "Status", "ONBSessionID", "Author/Title",
            "BusinessUnit", "Created")
          .filter(`BusinessUnit eq '${HrUnitNames[i]}'`)
          .expand("Author")
          .get()
          .then((response) => {

            if (response.length != 0) {

              for (var i = 0; i < response.length; i++) {
                MasterGlobArray.push(response[i]);
              }
            }
          }).then(() => {
            this.GetHrMasterSubmitStatus();
          });
        await newweb.lists.getByTitle('Onboarding Transaction Master').items
          .select("*", "AssignedTo/Title").expand("AssignedTo")
          .filter(`BusinessUnit eq '${HrUnitNames[i]}' and Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT' and Status ne 'Completed'`)
          .get().then((items) => {

            if (items.length != 0) {
              for (var i = 0; i < items.length; i++) {
                MasterGlobArray.push({
                  Id: "notfilled",
                  ONBSessionID: items[i].ONBSessionID,
                  Status: "Employee Not Started",
                  Name: items[i].AssignedTo.Title,
                  Created: "-",
                  BusinessUnit: items[i].BusinessUnit,
                  Author: {
                    Title: "-"
                  }
                });
              }
            }
          })
      }


      if (MasterGlobArray.length != 0) {
        this.setState({
          Items: MasterGlobArray
        })
        setTimeout(() => {
          ($("#examplepersonalinfo") as any).DataTable();
        }, 1500);
      } else {
        setTimeout(() => {
          ($("#examplepersonalinfo") as any).DataTable();
        }, 800);
      }
    } else if (ViewMode == "GroupHR") {
      var resholder = [];
      await newweb.lists
        .getByTitle("Emp NDA Transaction")
        .items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address", "Status", "ONBSessionID", "Author/Title",
          "BusinessUnit", "Created")
        .expand("Author")
        .get()
        .then((response) => {
          if (response.length != 0) {
            var tempstring: string = this.state.GroupHRUnitDetails; //Burjeelholdings,llh
            for (var i = 0; i < response.length; i++) {
              if (tempstring.indexOf(response[i].BusinessUnit) != -1) {
                //Burjeelholdings
                resholder.push(response[i]);
              }
            }
            for (var i = 0; i < resholder.length; i++) {
              MasterGlobArray.push(resholder[i]);
            }
            this.setState({
              Items: MasterGlobArray
            })

            setTimeout(() => {
              ($("#examplenda") as any).DataTable();
            }, 1500);
          } else {
            setTimeout(() => {
              ($("#examplenda") as any).DataTable();
            }, 800);
          }
        })
    } else if (ViewMode == "HRHead") {
      await newweb.lists
        .getByTitle("Emp NDA Transaction")
        .items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address", "Status", "ONBSessionID", "Author/Title",
          "BusinessUnit", "Created")
        .expand("Author")
        .get()
        .then((response) => {
          if (response.length != 0) {
            for (var i = 0; i < response.length; i++) {
              MasterGlobArray.push(response[i]);
            }
            this.setState({
              Items: MasterGlobArray
            })

            setTimeout(() => {
              ($("#examplenda") as any).DataTable();
            }, 1500);
          } else {
            setTimeout(() => {
              ($("#examplenda") as any).DataTable();
            }, 800);
          }
        })
    } else if (ViewMode == "GroupHR-UnitHR") {

      if (HrUnitNames.indexOf(this.state.GroupHRUnitDetails) == -1) {
        HrUnitNames.push(this.state.GroupHRUnitDetails)
      }

      for (var i = 0; i < HrUnitNames.length; i++) {
        await newweb.lists
          .getByTitle("Emp NDA Transaction")
          .items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address", "Status", "ONBSessionID", "Author/Title",
            "BusinessUnit", "Created")
          .filter(`BusinessUnit eq '${HrUnitNames[i]}'`)
          .expand("Author")
          .get()
          .then((response) => {
            if (response.length != 0) {
              for (var j = 0; j < response.length; j++) {
                MasterGlobArray.push(response[j]);
              }
            }
          })
        await newweb.lists.getByTitle('Onboarding Transaction Master').items
          .select("*", "AssignedTo/Title").expand("AssignedTo")
          .filter(`BusinessUnit eq '${HrUnitNames[i]}' and Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT' and Status ne 'Completed'`)
          .get().then((items) => {

            if (items.length != 0) {
              for (var i = 0; i < items.length; i++) {
                MasterGlobArray.push({
                  Id: "notfilled",
                  ONBSessionID: items[i].ONBSessionID,
                  Status: "Employee Not Started",
                  Name: items[i].AssignedTo.Title,
                  Created: "-",
                  BusinessUnit: items[i].BusinessUnit,
                  Author: {
                    Title: "-"
                  }
                });
              }
            }
          })
      }

      if (MasterGlobArray.length != 0) {
        this.setState({
          Items: MasterGlobArray
        })
        setTimeout(() => {
          ($("#examplepersonalinfo") as any).DataTable();
        }, 1500);
      } else {
        setTimeout(() => {
          ($("#examplepersonalinfo") as any).DataTable();
        }, 800);
      }
    }


    // else if (ViewMode == "Creator") {
    //   //Employee
    //   await newweb.lists
    //     .getByTitle("Emp NDA Transaction")
    //     .items.select("ID", "Date", "Name", "National", "PassportNo", "IndentificationNo", "Address", "Status", "ONBSessionID", "Author/Title",
    //       "BusinessUnit", "Created")
    //     .filter(`Author/Id eq ${curentndaid}`)
    //     .expand("Author")
    //     .get()
    //     .then((response) => {
    //       if (response.length != 0) {
    //         for(var i = 0; i < response.length; i++){
    //           MasterGlobArray.push(response[i]);
    //         } 
    //         this.setState({
    //           Items:MasterGlobArray
    //         })

    //         setTimeout(() => {
    //           ($("#examplenda") as any).DataTable();
    //         }, 1500);
    //       } else {
    //         setTimeout(() => {
    //           ($("#examplenda") as any).DataTable();
    //         }, 800);
    //       }
    //     }).then(() => {
    //       this.GetHrMasterSubmitStatus();
    //     });
    // }
    ($("#examplenda") as any).DataTable({
      'columnDefs': [{
        'targets': [1], /* column index */
        'orderable': false, /* true or false */
      }],
      "bDestroy": true
    });
  }







  public render(): React.ReactElement<IDashboardProps> {
    var handler = this;

    // Exit Process Approval
    const DynamicTableRows: JSX.Element[] = handler.state.Items.map(function (item, key) {
      return (
        <tr>
          <td>{item.ONBSessionID}</td>
          {/* <td>{moment(item.Date).format("MM/DD/YYYY")}</td> */}
          <td><a href={`https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?NDaItemID=${item.ID}&NDAMode=View&mdeopn=View&glblsessid=${item.ONBSessionID}&env=WebView`} data-interception="off" target="_blank"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/enable.svg" className="view_btn" alt="image" /></span></a>
            {handler.state.IsUnitHR == true && item.Id != "notfilled" && (

              <a id={`${item.ONBSessionID}`} href={`https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?NDaItemID=${item.ID}&NDAMode=Edit&mdeopn=Edit&glblsessid=${item.ONBSessionID}&env=WebView`} data-interception="off" target="_blank"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/edit.svg" className="edit_btn" alt="image" /></span></a>

            )}
            {/* <a href="#" onClick={() => handler.DeleteItem(item.ID, "ExitProcess")}><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/delete.svg" className="delete_btn" alt="image"/></span></a> */}

          </td>
          <td>{item.Name}</td>
          {/* <td>{item.National}</td> */}
          {/* <td>{item.PassportNo}</td> */}
          {/* <td>{item.IndentificationNo}</td> */}
          {/* <td>{item.Address}</td> */}
          <td>{item.BusinessUnit}</td>
          <td>{item.Status}</td>
          <td>{item.Author.Title}</td>
          <td>{moment(item.Created).format('MM/DD/YYYY h:MM A')}</td>

          <td style={{ width: "10%" }}>{item.Status == "Updated by Unit HR" ? "Completed" : "In progress"}</td>
        </tr>
      );
    });

    return (
      <div >

        {/* employee nda agreement */}

        <div className="db-multiple-table mb-20 sec">
          <div className="dashboard-title clearfix">
            <div className="table-wrapper-date enda_part clearfix">
              <div className="table-search"><h3 className="contact-pg-title">Employee Non-Disclosure Agreement </h3></div>
              {/* <div className="table-sort"><a href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/SitePages/ExitProcessNewForm.aspx?env=WebView" target="_blank" data-interception="off" type="button" className="btn btn-primary">Add</a></div> */}
            </div>
            <div className="table-scroll">
              <table id="examplenda" style={{ width: "100%" }} className="display table-striped list_of_table">

                <thead>
                  <tr>
                    <th>Onboarding Request ID</th>
                    {/* <th>Date</th> */}
                    <th>Actions</th>
                    <th>Name</th>
                    {/* <th>National</th> */}
                    {/* <th>Passport No</th> */}
                    {/* <th>Identification No</th> */}
                    {/* <th>Address</th> */}
                    <th>Bussiness Unit</th>
                    <th>Employee Status</th>
                    <th>Created By</th>
                    <th>Created On</th>
                    <th>Status</th>

                  </tr>
                </thead>
                {/* <p  id='no-ndadata'>No content available to show</p> */}
                <tbody id="dynamic-tbody">
                  {DynamicTableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
