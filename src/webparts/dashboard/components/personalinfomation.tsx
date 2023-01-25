import * as React from "react";

import { IDashboardProps } from "./IDashboardProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import * as $ from "jquery";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as moment from "moment";
import swal from "sweetalert";
import { Item, Items } from "@pnp/sp/items";

// SPComponentLoader.loadCss(
//   `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
// );
// SPComponentLoader.loadCss(
//   "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.5"
// );

export interface ILetterAuthorizationDashboardState {
  Items: any[];
  DynamicFilter: string;
  IsEmployee: boolean;
  IsUnitHR: boolean;
  IsGroupHR: boolean;
  IsHeadHR: boolean;
  UnitHrUnitDetails: string;
  GroupHRUnitDetails: string;
  AllItem: any[]
}
var appweburl;
var TotalData: number;

let MasterGlobArray: any = [];
const HrUnitNames: any = [];
const BussinessUnit_ONBSessionID = [];
const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");
var currentpersonalid: number = null;
export default class LoaDashboard extends React.Component<
  IDashboardProps,
  ILetterAuthorizationDashboardState,
  {}
> {
  public constructor(
    props: IDashboardProps,
    state: ILetterAuthorizationDashboardState
  ) {
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
      AllItem: []
    };
  }

  public componentDidMount() {

    $('div[data-automation-id="pageHeader"]').attr(
      "style",
      "display: none !important"
    );
    $("#spCommandBar").attr("style", "display: none !important");
    $("#spLeftNav").attr("style", "display: none !important");
    $('div[data-automation-id="pageHeader"]').attr(
      "style",
      "display: none !important"
    );
    $("#spCommandBar,#SuiteNavWrapper").attr(
      "style",
      "display: none !important"

    );
    // $('#NO-item').hide();
    // this.GetCurrentUserIDloa();
    this.GetCurrentUserIDloa();

  }

  public GetHrMasterSubmitStatus() {
    newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("StatusbyUnitHR eq 'Completed'").getAll().then((resp) => {
      if (resp.length != 0) {
        for (var i = 0; i < resp.length; i++) {

          //  $("#" + resp[i].ONBSessionID + "").remove();
        }
      }
    })
  }


  public GetCurrentUserIDloa() {
    var reacthandler = this;

    let curruser = newweb.currentUser.get().then(function (res) {

      var loacurrentuserid = res.Id;
      currentpersonalid = res.Id;
      reacthandler.GetcurrentUserViewLevelsloa(loacurrentuserid);



    })
  }

  public async GetcurrentUserViewLevelsloa(personalid) {
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
      this.GetLetterAuthorizationListItems("HRHead");
    } else if (this.state.IsUnitHR == true && this.state.IsGroupHR == false) {
      this.GetLetterAuthorizationListItems("UnitHR");
    } else if (this.state.IsUnitHR == false && this.state.IsGroupHR == true) {
      this.GetLetterAuthorizationListItems("GroupHR");
    } else if (this.state.IsUnitHR == true && this.state.IsGroupHR == true) {
      this.GetLetterAuthorizationListItems("GroupHR-UnitHR");
    }

  }

  public async GetLetterAuthorizationListItems(ViewMode) {

    // get all the items from a list
    if (ViewMode == "UnitHR") {
      for (var i = 0; i < HrUnitNames.length; i++) {
        await newweb.lists
          .getByTitle("Personal Information Master")
          .items.select(
            "ID",
            "DateofBirth",
            "FullName",
            "ContactNumber",
            "Status",
            "BloodGroup",
            "EmailID",
            "DocumentNo",
            "Author/Title",
            "ONBSessionID",
            "BusinessUnit",
            "Created"
          )
          .filter(`BusinessUnit eq '${HrUnitNames[i]}'`)
          .expand("Author")
          .get()
          .then((response) => {
            if (response.length != 0) {

              for (var i = 0; i < response.length; i++) {
                MasterGlobArray.push(response[i]);
              }
            }
          })

        await newweb.lists.getByTitle('Onboarding Transaction Master').items
          .select("*", "AssignedTo/Title").expand("AssignedTo")
          .filter(`BusinessUnit eq '${HrUnitNames[i]}' and Title eq 'PERSONAL INFORMATION FORM' and Status ne 'Completed'`)
          .get().then((items) => {

            if (items.length != 0) {
              for (var i = 0; i < items.length; i++) {
                MasterGlobArray.push({
                  Id: "notfilled",
                  ONBSessionID: items[i].ONBSessionID,
                  Status: "Employee Not Started",
                  FullName: items[i].AssignedTo.Title,
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
          AllItem: MasterGlobArray
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
        .getByTitle("Personal Information Master")
        .items.select(
          "ID",
          "DateofBirth",
          "FullName",
          "ContactNumber",
          "Status",
          "BloodGroup",
          "EmailID",
          "DocumentNo",
          "Author/Title",
          "ONBSessionID",
          "BusinessUnit",
          "Created"
        )
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

            // this.setState({
            //   Items: resholder,
            // });
            // for(var i = 0; i < resholder.length; i++){
            //   MasterGlobArray.push(resholder[i]);
            // } 
            this.setState({
              AllItem: resholder
            })
            //(resholder);
            setTimeout(() => {
              ($("#examplepersonalinfo") as any).DataTable();
            }, 1500);
          } else {
            setTimeout(() => {
              ($("#examplepersonalinfo") as any).DataTable();
            }, 800);
          }
        });
    } else if (ViewMode == "HRHead") {


      await newweb.lists
        .getByTitle("Personal Information Master")
        .items.select(
          "ID",
          "DateofBirth",
          "FullName",
          "ContactNumber",
          "Status",
          "BloodGroup",
          "EmailID",
          "DocumentNo",
          "Author/Title",
          "ONBSessionID",
          "BusinessUnit",
          "Created"
        )
        .expand("Author")
        .get()
        .then((response) => {
          if (response.length != 0) {

            for (var i = 0; i < response.length; i++) {
              MasterGlobArray.push(response[i]);
            }
            this.setState({
              AllItem: MasterGlobArray
            })
            setTimeout(() => {
              ($("#examplepersonalinfo") as any).DataTable();
            }, 1500);
          } else {
            setTimeout(() => {
              ($("#examplepersonalinfo") as any).DataTable();
            }, 800);
          }
        });
    } else if (ViewMode == "GroupHR-UnitHR") {

      if (HrUnitNames.indexOf(this.state.GroupHRUnitDetails) == -1) {
        HrUnitNames.push(this.state.GroupHRUnitDetails)
      }

      for (var i = 0; i < HrUnitNames.length; i++) {

        await newweb.lists
          .getByTitle("Personal Information Master")
          .items.select(
            "ID",
            "DateofBirth",
            "FullName",
            "ContactNumber",
            "Status",
            "BloodGroup",
            "EmailID",
            "DocumentNo",
            "Author/Title",
            "ONBSessionID",
            "BusinessUnit",
            "Created"
          )
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
          .filter(`BusinessUnit eq '${HrUnitNames[i]}' and Title eq 'PERSONAL INFORMATION FORM' and Status ne 'Completed'`)
          .get().then((items) => {

            if (items.length != 0) {
              for (var i = 0; i < items.length; i++) {
                MasterGlobArray.push({
                  Id: "notfilled",
                  ONBSessionID: items[i].ONBSessionID,
                  Status: "Employee Not Started",
                  FullName: items[i].AssignedTo.Title,
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
          AllItem: MasterGlobArray
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



    ($("#examplepersonalinfo") as any).DataTable({
      'columnDefs': [{
        'targets': [1], /* column index */
        'orderable': false, /* true or false */
      }],
      "bDestroy": true
    });


  }



  public render(): React.ReactElement<IDashboardProps> {
    var handler = this;

    const personalidDynamicTableRows: JSX.Element[] = handler.state.AllItem.map(function (item, key) {


      return (
        <tr>
          <td>{item.ONBSessionID}</td>
          <td>
            <a
              href={`https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?PersonalItemID=${item.ID}&PIFMode=View&mdeopn=View&glblsessid=${item.ONBSessionID}&env=WebView`} data-interception="off" target="_blank"
            >
              <span>
                <img
                  src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/enable.svg"
                  className="view_btn"
                  alt="image"
                />
              </span>
            </a>
            {handler.state.IsUnitHR == true && item.Id != "notfilled" && (

              <a id={`${item.ONBSessionID}`}
                href={`https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?PersonalItemID=${item.ID}&PIFMode=Edit&mdeopn=Edit&glblsessid=${item.ONBSessionID}&env=WebView`} data-interception="off" target="_blank"
              >
                <span>
                  <img
                    src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/edit.svg"
                    className="edit_btn"
                    alt="image"
                  />
                </span>
              </a>
            )}

          </td>
          <td>{item.FullName}</td>
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
        {/* Letter Authorization */}

        <div className="db-multiple-table mb-20 sec" >
          <div className="dashboard-title clearfix">
            <div className="table-wrapper-date">
              <div className="table-search">
                <h3 className="contact-pg-title">
                  {" "}
                  <a data-interception='off' href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/SitePages/MasterDashboardForm.aspx?env=WebView">
                    <span>

                    </span>
                  </a>
                  Personal Information
                </h3>
              </div>
              {/* <div className="table-sort">
                <a
                  href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/SitePages/LetterAuthorizationNewForm.aspx?env=WebView"
                  target="_blank"
                  data-interception="off"
                  type="button"
                  className="btn btn-primary"
                >
                  Add
                </a>
              </div> */}
            </div>
            {/* <div className="table-scroll"> */}
            <div>
              <table id="examplepersonalinfo" className="display table-striped list_of_table">
                <thead>
                  <tr>
                    <th>Onboarding Request ID</th>
                    <th style={{ width: "58px" }}>Actions</th>
                    <th>Name</th>
                    <th>Bussiness Unit</th>
                    {/* <th>Date of Birth</th> */}
                    {/* <th>Document No</th> */}
                    <th>Employee Status</th>
                    <th>Created By</th>
                    <th>Created On</th>
                    <th>Status</th>

                  </tr>
                </thead>
                {/* <p  id="NO-item">No content available to show</p> */}
                <tbody id="dynamic-tbody">{personalidDynamicTableRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
