import * as React from "react";
import { IcocProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import swal from "sweetalert";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";

export interface IEmployeeCocNewformState {
  CurrentDate: any;
  EmployeeName: string;
  EmployeeId: string;
  Master: any[];
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  Dynamiclogo: any[];
  ONBSessionID: string;
  COCSubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  cocFormControlNumber: any[];
  cocFormVersionNumber: any[];
  HrCompleteStatus: boolean;
}


const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings//HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var LogoUrl = "";
var officename;
let cocItemID;
var Mode;
var cocsmode;
var cocimgsrc;
var coclistid;
var VersionNumber;
var ControlNumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class EmployeeCocNew extends React.Component<IcocProps, IEmployeeCocNewformState, {}> {
  constructor(props: IcocProps, state: IEmployeeCocNewformState) {
    super(props);
    this.state = {
      CurrentDate: null,
      EmployeeName: "",
      EmployeeId: "",
      Master: [],
      CurrentUserName: [],
      CurrentUserDesignation: [],
      Dynamiclogo: [],
      ONBSessionID: "",
      COCSubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      cocFormControlNumber: [],
      cocFormVersionNumber: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    const url: any = new URL(window.location.href);
    cocItemID = url.searchParams.get("cocItemID");
    Mode = url.searchParams.get("CocMode");
    cocsmode = url.searchParams.get("CocMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar").attr("style", "display: none !important");
    $("#spLeftNav").attr("style", "display: none !important");
    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");
    this.GetEmployeeCOCMasterItems();
    this.GetCurrentUserDetails();
    this.removevalidation()
    $(".cocname").prop('disabled', true);
    $(".cocid").prop('disabled', true);

    if (GlobalFormOpenedMode == "View") {
      this.GetEmployeeCOCEthicsViewItem(GlobalSessionIDValue);
      this.GetEmployeeCOCEthicsViewItemForPrint(GlobalSessionIDValue);
    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetEmployeeCOCEthicsEditItem(GlobalSessionIDValue);
    }

  }

  public GetEmployeeCOCEthicsViewItemForPrint(ID) {

    $(`#print-cocimgitem`).show();
    $(".print-btncoc").show()
    $(`.print-dynamicocoimg`).hide();
    $(".print-cocname").show();
    $(".print-cocname").prop('disabled', true);
    $(".print-cocid").prop('disabled', true);

    newweb.lists.getByTitle("Employee Coc Transaction")
      .items.select("ID", "Date", "EmployeeName", "UnitLogo", "EmployeeId", "Status", "ONBSessionID", "ControlNumber", "VersionNumber")
      .filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
        if (result.length != 0) {

          $(".print-cocimg").show();
          $(".print-cocname").text(result[0].EmployeeName)
          $(".print-cocid").text(result[0].EmployeeId);
          $("#print-coc-Control-Number").text(result[0].ControlNumber)
          $("#print-coc-Version-Number").text(result[0].VersionNumber);
          cocimgsrc = result[0].UnitLogo;
        }
      });
  }

  public async GetCurrentUserONBSessionID(currentuseremailid, FormMode) {

    if (FormMode == "New") {
      newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("Name/EMail eq '" + currentuseremailid + "'").orderBy("Created", false).top(1).get().then((response) => {
        if (response.length != 0) {
          this.setState({
            ONBSessionID: response[0].ONBSessionID
          });
          this.CheckIndividualFomSubmissionStatusofEmployee(response[0].ONBSessionID, "New");
        }
      });
    }
    else {
      newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("ONBSessionID eq '" + GlobalSessionIDValue + "' and UnitHr/EMail eq '" + currentuseremailid + "' or HrHead/EMail eq '" + currentuseremailid + "' or HrManager/EMail eq '" + currentuseremailid + "'").get().then((response) => {
        if (response.length != 0) {
          this.setState({
            ONBSessionID: response[0].ONBSessionID
          });
          this.CheckIndividualFomSubmissionStatusofEmployee(response[0].ONBSessionID, "Edit-View");
        }
      });
    }
    newweb.lists.getByTitle("Employee Initiation Onboarding Master").items
      .filter(`StatusbyUnitHR eq 'Completed' and ONBSessionID eq '${GlobalSessionIDValue}'`).get().then((resp) => {
        if (resp.length != 0) {
          this.setState({ HrCompleteStatus: true })
        }
      })
  }

  public CheckIndividualFomSubmissionStatusofEmployee(ONBSessionID, FormMode) {
    this.getPersonalInfodata(ONBSessionID);
    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'CONFLICT OF INTEREST' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });
    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'EMPLOYEE CODE OF CONDUCT & ETHICS'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "EMPLOYEE CODE OF CONDUCT & ETHICS") {
          this.setState({
            COCSubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.Getcocitem(ONBSessionID, FormMode);
          }
        }
      }
    });
  }

  public removevalidation() {

    $("#CocEmployeeId").keyup(function () {
      $("#err-employeeid").hide();
    });
  }

  public GetEmployeeCOCEthicsViewItem(GlobalSessionIDValue) {

    $(`.cocimgitem`).show();
    // $(".print-btncoc").show()
    $(`#cocupdateuserbtn`).hide();
    $(`.coc-submit`).hide();
    $(`.dynamicocoimg`).hide();
    $(".cocname").prop('disabled', true);
    $(".cocid").prop('disabled', true);

    newweb.lists.getByTitle("Employee Coc Transaction")
      .items.select("ID", "Date", "EmployeeName", "UnitLogo", "EmployeeId", "Status", "ONBSessionID")
      .filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
        if (result.length != 0) {
          $(".coc_tickimg").show()
          // $('.coctitle').attr("style", "color:#00A36C");
          $(".cocimg").show();
          $(".cocname").val(result[0].EmployeeName)
          $(".cocid").val(result[0].EmployeeId);
          cocimgsrc = result[0].UnitLogo;
        }
      });
  }

  public GetEmployeeCOCEthicsEditItem(GlobalSessionIDValue) {

    $(`.cocimgitem`).show();
    $(`#cocupdateuserbtn`).show();
    $(`.coc-submit`).hide();
    $(`.dynamicocoimg`).hide();
    $(".cocname").prop('disabled', true);
    $(".cocid").prop('disabled', true);

    newweb.lists.getByTitle("Employee Coc Transaction")
      .items.select("ID", "UnitLogo", "Date", "EmployeeName", "EmployeeId",
        "Status", "ONBSessionID", "VersionNumber", "ControlNumber",)
      .filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
        if (result.length != 0) {
          coclistid = result[0].ID;
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber
          $(".coc_tickimg").show()
          // $('.coctitle').attr("style", "color:#00A36C");
          $(".cocimg").show();
          $(".cocname").val(result[0].EmployeeName)
          $(".cocid").val(result[0].EmployeeId);
          cocimgsrc = result[0].UnitLogo;
        }
      });
  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }

  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
  }

  public UpdateValidation() {
    var status = true;
    var Eid = $("#CocEmployeeId").val();

    if (Eid == "") {
      $("#err-employeeid").show();
      $("#CocEmployeeId").focus();
      status = false;
    } else {
      $("#err-employeeid").hide();
    }
    return status;
  }

  public Validation() {
    var status = true;
    var Empid = $("#CocEmployeeId").val();

    if (Empid == "") {
      $("#err-employeeid").show();
      $("#CocEmployeeId").focus();
      status = false;
    } else {
      $("#err-employeeid").hide();
    }
    return status;
  }

  public GetEmployeeCOCMasterItems() {
    newweb.lists.getByTitle("Employee Coc Master").items.select("ID", "COC").orderBy("OrderNo", true)
      .get().then((result) => {
        this.setState({
          Master: result,
        });
      });
  }

  public GetCurrentUserDetails() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;
        reacthandler.setState({
          CurrentUserName: Name,
          CurrentUserDesignation: Designation,
        });
        if (GlobalFormOpenedMode == "New") {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "New");
        }
        else if (GlobalFormOpenedMode == "Edit") {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "Edit");
        }
        else {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "View");
        }
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var fcname = properties[i].Value;
            setTimeout(() => {
              reacthandler.DynamicUnitLogo(fcname);
              reacthandler.GetContolandVersionNumber(fcname)
              reacthandler.GetControlNumberAccordingtoformname(fcname)
            }, 500);
            break;
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) { },
    });
  }
  public GetContolandVersionNumber(ofcs) {
    if (GlobalFormOpenedMode == "New") {
      newweb.lists
        .getByTitle("Business Unit Master")
        .items.select("ID", "Controlnumber", "VersionNumber")
        .filter(`Title eq '${ofcs}'`)
        .get()
        .then((results) => {
          this.setState({
            ControlNumber: results[0].Controlnumber,
            VersionNumber: results[0].VersionNumber
          })


        });
    }
  }


  public async GetControlNumberAccordingtoformname(ofcname) {
    if (GlobalFormOpenedMode == "New") {
      const fieldname1: IFieldInfo = await newweb.lists.getByTitle("Onboarding Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Control Number")();

      const fieldname2: IFieldInfo = await newweb.lists.getByTitle("Onboarding Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Version Number")();


      await newweb.lists.getByTitle("Onboarding Form Name Master").items.select("*", "Title")
        .filter(`Title eq 'EMPLOYEE CODE OF CONDUCT & ETHICS'`)
        .get()
        .then((results) => {
          this.setState({
            cocFormControlNumber: results[0][fieldname1.InternalName],
            cocFormVersionNumber: results[0][fieldname2.InternalName]
          })

          //alert(this.state.ControlNumber+"-"+this.state.cocFormControlNumber)
        });

    }
  }
  public SaveListItem() {
    //  if (this.Validation()) {
    var EmployeeName = $("#CocEmployeeName").val();
    var EmployeeId = $("#CocEmployeeId").val();
    swal({
      title: "Are you sure?",
      text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    } as any).then((willadd) => {
      if (willadd) {
        newweb.lists
          .getByTitle("Employee Coc Transaction")
          .items.add({
            Title: "EMPLOYEE CODE OF CONDUCT & ETHICS",
            EmployeeName: EmployeeName,
            EmployeeId: EmployeeId,
            Status: "Submitted by employee",
            UnitLogo: LogoUrl,
            BusinessUnit: officename,
            ONBSessionID: this.state.ONBSessionID,
            ControlNumber: this.state.ControlNumber + "/" + this.state.cocFormControlNumber,
            VersionNumber: this.state.cocFormVersionNumber,
          })
          .then((results: any) => {
            newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'EMPLOYEE CODE OF CONDUCT & ETHICS'").orderBy("Created", false).get().then((response) => {
              if (response.length != 0) {
                newweb.lists.getByTitle("Onboarding Transaction Master").items.getById(response[0].Id).update({
                  Status: "Completed",
                  CompletedOn: moment().format("MM/DD/YYYY")
                });
              }
            }).then(() => {
              swal({
                title: "The Form has been submitted successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              } as any).then(async () => {
                location.reload()
              });
            });
          });
      }
    }
    )
    // };
  }

  public DynamicUnitLogo(ofc) {
    if (GlobalFormOpenedMode == "New") {
      newweb.lists.getByTitle("Business Unit Master").items.select("ID", "UnitLogo")
        .filter(`Title eq '${ofc}'`)
        .get().then((results) => { //serverRelativeUrl
          var img = results[0].UnitLogo;
          LogoUrl = JSON.parse(img).serverRelativeUrl;
          this.setState({
            Dynamiclogo: results,
          });
        });
    }
  }

  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Employee Joining Report Transaction").items.select("Name", "EmployeeIDNumber", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $("#CocEmployeeName").val(result[0].Name)
          $("#CocEmployeeId").val(result[0].EmployeeIDNumber)
        }
      })
  }

  public async Getcocitem(ONBSessionID, FormMode) {

    // if (cocsmode == null) {
    await newweb.lists.getByTitle("Employee Coc Transaction")
      .items.select("ID", "Date", "EmployeeName", "EmployeeId", "Status", "ONBSessionID", "Author/Title")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get().then((response) => {
        if (response.length != 0) {
          $(".coc_tickimg").show()

          $("#CocEmployeeName").val(response[0].EmployeeName);
          $("#CocEmployeeId").val(response[0].EmployeeId);
          $(".policy-declearation-idno").val(response[0].EmployeeId)
          // $(".coctitle").attr("style", "color:#00A36C");
          $(".cocid").attr("disabled");
          $(".cocdate").attr("disabled");
          $(".cocimg").show();
          $(".coc-submit").hide();
          $(".cocname").prop('disabled', true);
          $(".cocid").prop('disabled', true);
          $(".bankepmloyeeid").val(response[0].EmployeeId);
          $("#Employeeid-ack-covid").val(response[0].EmployeeId)
          $("#Employeeid-ack-covid1").val(response[0].EmployeeId)
          $("#Employeeid-ack-covid2").val(response[0].EmployeeId)

        }
      });

    // }
  }

  public Updatecoclist() {
    //if (this.UpdateValidation()) {
    var EmployeeName = $("#CocEmployeeName").val();
    var EmployeeId = $("#CocEmployeeId").val();
    newweb.lists.getByTitle("Employee Coc Transaction").items.getById(coclistid).update(
      {
        Title: "EMPLOYEE CODE OF CONDUCT & ETHICS",
        EmployeeName: EmployeeName,
        EmployeeId: EmployeeId,
        Status: "Updated by Unit HR"
      }
    )
      .then((results: any) => {
        if (this.state.HrCompleteStatus == true) {
          subweb.lists.getByTitle("Employee Coc HR Update History").items.add({
            Title: "EMPLOYEE CODE OF CONDUCT & ETHICS",
            EmployeeName: EmployeeName,
            EmployeeId: EmployeeId,
            Status: "Updated by Unit HR",
            ONBSessionID: GlobalSessionIDValue,
            BusinessUnit: officename,
            VersionNumber: VersionNumber,
            ControlNumber: ControlNumber,
          }
          )
        }
        swal({
          title: "The Form has been updated successfully",
          icon: 'success'
        }).then(() => {
          location.reload()
        });
      });
    // }
  }

  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-coc').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;


  }

  public render(): React.ReactElement<IcocProps> {
    var handler = this;
    const Ethics: JSX.Element[] = this.state.Master.map(function (item, key) {

      return (
        <li className={`cocparagraph-${key + 1}`}>{item.COC}</li>
      )
    });

    return (
      <>
        <div >
          <div className="dashboard_right_heading">

            {handler.state.Dynamiclogo && GlobalFormOpenedMode == "New" &&
              handler.state.Dynamiclogo.map(function (imgitem, Index) {
                var img = imgitem.UnitLogo;
                var Dynamiclogo = JSON.parse(img);
                // LogoUrl=img.serverRelativeUrl
                return (
                  <img
                    id="Dynamicimgpersonal"
                    className="currentuseimg"
                    style={{ height: "50px" }}
                    src={`${Dynamiclogo.serverRelativeUrl}`}
                    alt="error"
                  ></img>
                );
              })}

            {GlobalFormOpenedMode != "New" &&
              <LogoMaster
                description={""}
                siteurl={this.props.siteurl}
              />
            }
            <span>Employee code of coducts & ethics</span>
          </div>
          <div className="dashboard_right_ffamily">
            <div className="personal_info_part">
              <div className="emp_code_conduct_top">
                <div className="dashboard_right_text">
                  <ol type="1" id="desc">{Ethics}
                    {/* <li className="coc_last paragraph">Always behave with courtesy, respect, dignity, discretion in dealing with patients, families and staff</li> */}
                  </ol>
                  <ul>
                    <li className="last_coc_para">I have read and will adhere to the hospital Code of Conduct and Code of Ethics
                    </li>
                  </ul>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="currentuseecocname form-group relative">
                      <input type="text"
                        id="CocEmployeeName"
                        name="EmployeeName"
                        className="form-control cocname"
                        autoComplete="off" disabled />
                      <span className="floating-label">
                        Employee Name<i className="required">*</i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input type="text"
                        id="CocEmployeeId"
                        name="EmployeeId"
                        className="form-control cocid"
                        autoComplete="off" disabled />
                      <span className="floating-label">
                        Employee ID
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeeid"
                      style={{ color: "red", display: "none" }} >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4 signature_part">
                    {/* <div className="form-group relative">
                      <input
                        type="date"
                        id="txt-current-date"
                        className="form-control cocdate cocviewmode"
                        autoComplete="off"
                        disabled />
                      <span className="floating-label">
                        Date
                      </span>
                    </div> 
                 <span
                      className="error-validation"
                      id="err-currentdate"
                      style={{ color: "red", display: "none" }} >
                      This field is mandatory.
                    </span> */}
                    <p> Signature </p>
                  </div>
                </div>
                <div className="row form signature_part">
                  <div className="col-md-4">
                    <p> Date </p>
                  </div>
                </div>

                {/* <div className='dashboard_btn employe_code_conduct_button'>


                  {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                    <button
                      className="btn btn-primary form-btn btn-submit coc-submit"
                      type="submit"
                      onClick={() => this.SaveListItem()} >
                      Submit
                    </button>
                    :
                    <button style={{ cursor: "no-drop" }}
                      className="btn btn-primary form-btn btn-submit coc-submit"
                      type="submit">
                      Submit
                    </button>
                  }

                  <button id="cocupdateuserbtn" style={{ display: "none" }}
                    className="btn btn-primary form-btn btn-submit"
                    type="submit"
                    onClick={() => this.Updatecoclist()} >
                    Update
                  </button>

                  <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btncoc" type="submit" onClick={() => this.Printthis()}>Print</button>
                  {GlobalFormOpenedMode == "New" &&
                    <button id="btn-sign-cocbtn" className="dashboard_submit_btn btn-cancel" type="reset">
                      <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                        Cancel
                      </a>
                    </button>
                  }

                  {GlobalFormOpenedMode == "Edit" &&
                    <button id="btn-hr-cocbtn" className="dashboard_submit_btn btn-cancel" type="reset">
                      <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`">
                        Cancel
                      </a>
                    </button>
                  }
                </div> */}
              </div>
            </div>
            <div>
              <div className="personal_info_part">
                <div className="preexisiting_part">
                  <div className="personal_emp_sign">
                    <h3> Employee Signature Validation </h3>
                    <p>I here by confirm that all the above Employee signature(s) are validated and verified:</p>
                    <div className="emp_text">Employee signature validation is done by

                      <div className="signature-new-wrap">
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">
                                HR Name
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">
                                Emp ID
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="signature-new-wrap">
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">
                                Signature
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">
                                Date(DD/MM/YYYY)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dashboard_btn employe_code_conduct_button'>


                {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                  <button
                    className="btn btn-primary form-btn btn-submit coc-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()} >
                    Submit
                  </button>
                  :
                  <button style={{ cursor: "no-drop" }}
                    className="btn btn-primary form-btn btn-submit coc-submit"
                    type="submit">
                    Submit
                  </button>
                }

                <button id="cocupdateuserbtn" style={{ display: "none" }}
                  className="btn btn-primary form-btn btn-submit"
                  type="submit"
                  onClick={() => this.Updatecoclist()} >
                  Update
                </button>

                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btncoc" type="submit" onClick={() => this.Printthis()}>Print</button>
                {GlobalFormOpenedMode == "New" &&
                  <button id="btn-sign-cocbtn" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="btn-hr-cocbtn" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/HRFORM/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }
              </div>
            </div>
          </div>

        </div>

        <div id="dashboard_right-print-coc" style={{ display: "none" }}>
          <div className="dashboard_right_heading">

            {handler.state.Dynamiclogo && GlobalFormOpenedMode == "New" &&
              handler.state.Dynamiclogo.map(function (imgitem, Index) {
                var img = imgitem.UnitLogo;
                var Dynamiclogo = JSON.parse(img);
                // LogoUrl=img.serverRelativeUrl
                return (
                  <img
                    id="print-Dynamicimgpersonal"
                    className="currentuseimg"
                    style={{ height: "50px" }}
                    src={`${Dynamiclogo.serverRelativeUrl}`}
                    alt="error"
                  ></img>
                );
              })}

            {GlobalFormOpenedMode != "New" &&
              <LogoMaster
                description={""}
                siteurl={this.props.siteurl}
              />
            }


            <div className="header-title-units">
              <span>Employee code of coducts & ethics</span>
              <ul>
                <li>Control Number: <b id="print-coc-Control-Number"></b></li>
                <li>Version: <b id="print-coc-Version-Number"></b></li>
              </ul>

            </div>
          </div>
          <div className="dashboard_right_ffamily print-top-line">
            {/* <div className="personal_info_part">
        
        <div className="row form row_top">
               <div className="col-md-4">
                 <div className="form-group relative">
                 <span  id="print-coc-Control-Number"  className="print-control">
              </span>
                   <span className="floating-label ">
                   Control Number
                   </span>
                 </div>
               </div>
               <div className="col-md-4">
                 <div className="form-group relative">
                   <span  id="print-coc-Version-Number"  className="print-control">
              
                 </span>
                   <span className="floating-label">
                    Version Number
                   </span>
                 </div>
               </div>
             </div>
         </div> */}
            <div className="personal_info_part print-bb">
              <div className="emp_code_conduct_top">

                <div className="dashboard_right_text">
                  <ol type="1" id="desc">{Ethics}
                    {/* <li className="coc_last paragraph">Always behave with courtesy, respect, dignity, discretion in dealing with patients, families and staff</li> */}
                  </ol>
                  <ul >
                    <li className="last_coc_para">I have read and will adhere to the hospital Code of Conduct and Code of Ethics
                    </li>
                  </ul>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="print-currentuseecocname form-group relative" style={{ paddingTop: "20px" }}>
                      <span
                        // type="text"
                        id="print-CocEmployeeName"
                        // name="EmployeeName"
                        className="print-control-bottom print-cocname"
                      //  autoComplete="off" 
                      />
                      <span className="floating-label">
                        Employee Name<i className="required">*</i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative" style={{ paddingTop: "20px" }}>
                      <span
                        //  type="text"
                        id="CocEmployeeId"
                        // name="EmployeeId"
                        className="print-control-bottom print-cocid"
                      // autoComplete="off" 
                      />
                      <span className="floating-label">
                        Employee ID<i className="required">*</i>
                      </span>
                    </div>
                    {/* <span
                    className="error-validation"
                    id="err-employeeid"
                    style={{ color: "red", display: "none" }} >
                    This field is mandatory.
                  </span> */}
                  </div>

                </div>
                {/* <div className="row form">
                <div className="col-md-6 signature_part">
                  <p> Date </p>
                </div>
                <div className="col-md-6 signature_part">

                  <p> Signature </p>
                </div>
              </div> */}
                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Signature</span>
                        </div>
                      </div>
                    </div>
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="personal_info_part">
                  <div className="preexisiting_part">
                    <div className="personal_emp_sign">
                      <h3> Employee Signature Validation </h3>
                      <p>I here by confirm that all the above Employee signature(s) are validated and verified:</p>
                      <div className="emp_text">Employee signature validation is done by

                        <div className="signature-new-wrap print-jr-sign">
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div className="form-check">
                                <span className="form-check-label">
                                  HR Name
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div className="form-check">
                                <span className="form-check-label">
                                  Emp ID
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="signature-new-wrap print-jr-sign">
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div className="form-check">
                                <span className="form-check-label">
                                  Signature
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div className="form-check">
                                <span className="form-check-label">
                                  Date(DD/MM/YYYY)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pageborder"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
