import * as React from "react";
import { IIntegrityAndBenefitProps } from "./IHrOnboardingFormProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/fields";
import { IField, IFieldInfo } from "@pnp/sp/fields/types";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import swal from "sweetalert";
import { escape } from "@microsoft/sp-lodash-subset";
import { Log } from "@microsoft/sp-core-library";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";
import { IViewFields } from "@pnp/sp/views";


export interface IIntegrityAndBenefitState {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  IndetityCardNo: string;
  Date: string;
  Certificates: string;
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  BusinessMaster: any[];
  Alreadysublitted: boolean;
  Dynamiclogo: any[];
  firstname: any[];
  lastname: any[];
  ONBSessionID: string;
  IntegritySubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  IntegrityFormControlNumber: any[];
  IntegrityFormVersionNumber: any[]
  HrCompleteStatus: boolean;
}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var Description;
var officename = "";
var LogoUrl;
let IntegrityItemID;
var ImageSrcIntegrity = "";
var Mode;
var Integritymode;
var IntegrityID;
var employeeloabussinessName = "";
var officefirstname;
var officlelastname;

var VersionNumber;
var ControlNumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class IntegrityAndBenefit extends React.Component<IIntegrityAndBenefitProps, IIntegrityAndBenefitState, {}> {
  constructor(props: IIntegrityAndBenefitProps, state: IIntegrityAndBenefitState) {
    super(props);
    this.state = {
      FirstName: "",
      MiddleName: "",
      LastName: "",
      IndetityCardNo: "",
      Date: "",
      Certificates: "",
      CurrentUserName: [],
      CurrentUserDesignation: [],
      BusinessMaster: [],
      Alreadysublitted: true,
      Dynamiclogo: [],
      firstname: [],
      lastname: [],
      ONBSessionID: "",
      IntegritySubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      IntegrityFormControlNumber: [],
      IntegrityFormVersionNumber: [],
      HrCompleteStatus: false
    };

  }
  public componentDidMount() {
    const url: any = new URL(window.location.href);
    IntegrityItemID = url.searchParams.get("IntegrityItemID");
    Mode = url.searchParams.get("IntegrityMode");
    Integritymode = url.searchParams.get("IntegrityMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar").attr("style", "display: none !important");
    $("#spLeftNav").attr("style", "display: none !important");
    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");

    if (GlobalFormOpenedMode == "View") {
      this.GetIntegrityViewItem(GlobalSessionIDValue);
      this.GetIntegrityItemForPrint(GlobalSessionIDValue);
    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetIntegrityEditItem(GlobalSessionIDValue);
    }
    this.GetCurrentUserDetails();
  }

  public GetIntegrityItemForPrint(ID) {

    newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction")
      .items.select(
        "ID",
        "FullName",
        "DOHLicenseNo",
        "IntegrityDeclare",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {

          $(".print-btn-integrity").show()
          $("#print-IntegrityFullName").text(result[0].FullName);
          $("#print-DOH-License-No").text(result[0].DOHLicenseNo);
          $("#print-Integrity-Declare").text(result[0].IntegrityDeclare);

          $("#print-Integrity-Control-Number").text(result[0].ControlNumber)
          $("#print-Integrity-Version-Number").text(result[0].VersionNumber);

        }
      });
  }

  public GetIntegrityViewItem(GlobalSessionIDValue) {

    newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction")
      .items.select(
        "ID",
        "FullName",
        "DOHLicenseNo",
        "IntegrityDeclare",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {

          $(".integrity-img").show()
          $(".integrity-submit").hide()

          $("#IntegrityFullName").val(result[0].FullName);
          $("#DOH-License-No").val(result[0].DOHLicenseNo);
          $("#Integrity-Declare").val(result[0].IntegrityDeclare);

          $(".integrity-disabled").css('cursor', 'not-allowed');
          ImageSrcIntegrity = result[0].UnitLogo;
        }
      });
  }

  public GetIntegrityEditItem(GlobalSessionIDValue) {

    newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction")
      .items.select(
        "ID",
        "FullName",
        "DOHLicenseNo",
        "IntegrityDeclare",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "VersionNumber",
        "ControlNumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {

          $(".integrity-img").show()
          $(".integrity-submit").hide()
          $("#update-btn-integrity").show();

          IntegrityID = result[0].Id
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber

          $("#IntegrityFullName").val(result[0].FullName);
          $("#DOH-License-No").val(result[0].DOHLicenseNo);
          $("#Integrity-Declare").val(result[0].IntegrityDeclare);


          ImageSrcIntegrity = result[0].UnitLogo;
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'PRE EXISTING MEDICAL CONDITION FORM' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE") {
          this.setState({
            IntegritySubmissionStatus: response[0].Status
          });
          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.GetIntegritylistitem(ONBSessionID, FormMode);
          }
        }
      }
    });
  }

  public UpdateListItem() {
    if (this.identity()) {

      newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction").items.getById(IntegrityID).update({
        FullName: $("#IntegrityFullName").val(),
        DOHLicenseNo: $("#DOH-License-No").val(),
        IntegrityDeclare: $("#Integrity-Declare").val(),
        Status: "Updated by Unit HR",
      })
        .then((results: any) => {
          if (this.state.HrCompleteStatus == true) {
            subweb.lists.getByTitle("Integrity And Benefit Disclosure HR Update History").items.add({
              Title: "DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE",
              FullName: $("#IntegrityFullName").val(),
              DOHLicenseNo: $("#DOH-License-No").val(),
              IntegrityDeclare: $("#Integrity-Declare").val(),
              Status: "Updated by Unit HR",
              ONBSessionID: GlobalSessionIDValue,
              BusinessUnit: officename,
              VersionNumber: VersionNumber,
              ControlNumber: ControlNumber,
            })
          }
          swal({
            title: "The Form has been updated successfully",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        });
    }
  }

  public identity() {
    var status = true;

    return status;
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
          // CurrentUserProfilePic: `${reacthandler.props.siteurl}/_layouts/15/userphoto.aspx?size=l&username=${email}`
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
            var ofcname = properties[i].Value;

            setTimeout(() => {
              reacthandler.LogoUnitDynamic(ofcname);
              reacthandler.GetContolandVersionNumber(ofcname)
              reacthandler.GetControlNumberAccordingtoformname(ofcname)

            }, 500);
          }
          if (properties[i].Key == "LastName") {
            officefirstname = properties[i].Value;
            var firstofficename = properties[i].Value;
            reacthandler.setState({
              lastname: firstofficename,
            });
          }
          if (properties[i].Key == "FirstName") {
            officlelastname = properties[i].Value;
            var lastofficename = properties[i].Value;
            reacthandler.setState({
              firstname: lastofficename,
            });
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
        .filter(`Title eq 'DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE'`).get()
        .then((results) => {

          this.setState({
            IntegrityFormControlNumber: results[0][fieldname1.InternalName],
            IntegrityFormVersionNumber: results[0][fieldname2.InternalName]
          })
        });

    }
  }


  public LogoUnitDynamic(ofc) {
    if (GlobalFormOpenedMode == "New") {
      newweb.lists.getByTitle("Business Unit Master").items.select("ID", "UnitLogo").filter(`Title eq '${ofc}'`).get().then((results) => {
        var img = results[0].UnitLogo;
        LogoUrl = JSON.parse(img).serverRelativeUrl;
        this.setState({
          Dynamiclogo: results,
        });
      });
    }
  }

  public SaveListItem() {
    if (this.identity()) {


      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          let list = newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction");
          list.items
            .add({
              Title: "DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE",
              FullName: $("#IntegrityFullName").val(),
              DOHLicenseNo: $("#DOH-License-No").val(),
              IntegrityDeclare: $("#Integrity-Declare").val(),
              BusinessUnit: officename,
              Status: "Submitted by employee",
              UnitLogo: LogoUrl,
              ONBSessionID: this.state.ONBSessionID,
              VersionNumber: this.state.IntegrityFormVersionNumber,
              ControlNumber: this.state.ControlNumber + "/" + this.state.IntegrityFormControlNumber
            })
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items
                .filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE'")
                .orderBy("Created", false).get().then((response) => {
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
                    setTimeout(() => {
                      location.reload();
                    }, 2500);
                  });
                });
            });
        }
      });
    }
  }


  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Personal Information Master").items.select("FullName", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $("#IntegrityFullName").val(result[0].FullName)
        }
      })
  }

  public async GetIntegritylistitem(ONBSessionID, FormMode) {

    await newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction")
      .items.select(
        "ID",
        "FullName",
        "DOHLicenseNo",
        "IntegrityDeclare",
        "Status",
        "ONBSessionID",
        "Author/Title"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`).expand("Author")
      .get().then((response) => {

        if (response.length != 0) {

          $("#IntegrityFullName").val(response[0].FullName);
          $("#DOH-License-No").val(response[0].DOHLicenseNo);
          $("#Integrity-Declare").val(response[0].IntegrityDeclare);

          $(".integrity-img").show()
          $(".integrity-submit").hide()
          $(".integrity-disabled").prop("disabled", true);
          $(".integrity-disabled").css('cursor', 'not-allowed');
        }
      });
  }

  public Printthis() {
    let printContents = document.getElementById('dashboard_right-print-integrity').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;

  }

  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
  }


  public render(): React.ReactElement<IIntegrityAndBenefitProps> {
    var handler = this;

    return (
      <>
        <div>
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
            <span>DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE</span>

          </div>
          <div className="dashboard_right_ffamily ">
            <div className="personal_info_part">
              <div className="integrity_part">
                <div className="integrity_first_para">
                  <p>I

                    <input type="text"
                      id="IntegrityFullName"
                      className="integrity-disabled"
                      style={{ width: "30%" }}
                      disabled />

                    having DOH license No.
                    <input type="text"
                      id="DOH-License-No"
                      className="integrity-disabled" />

                    as
                    <input type="text"
                      id="Integrity-Declare"
                      className="declare integrity-disabled" />

                    declares that I have read and understood the responsibilities assigned to me under the Policy on Integrity & Benefit Disclosure
                    ( <a href={`${this.props.siteurl}/DOH%20Policy%20Integrity%20%20Benefit%20Disclosure/`} target="_blank">
                      DOH/ Policy/IBD/1</a> ) as
                    a licensed healthcare professional. And I assure to comply with the Code of Conduct and Conflict of
                    interest outlined by Department of Health and Burjeel Holdings at present or in future for my license
                    category.
                  </p>
                  <p>
                    I also acknowledge that I take responsibility to attend all the awareness program related to the Policy on
                    Integrity & Benefit Disclosure organized by Department of Health, Abu Dhabi.
                  </p>
                </div>
              </div>
              <div className="integrity_part">
                <div className="integrity_part_sign_part_head">
                  <p style={{ float: "left", width: "60%" }}>Signed By Employee</p>
                  <p>Validated By HR</p>
                  <div className="integrity_part_sign_part">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Name</span>
                          </div>
                        </div>
                      </div>
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Name</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            <span className="form-check-label">Signature</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Date</span>
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
                </div>
              </div>
            </div>
            <div>
              <div className="dashboard_btn">

                {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                  <button
                    id="saveitemid"
                    className="dashboard_submit_btn integrity-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}>
                    Submit
                  </button>
                  :
                  <button style={{ cursor: "no-drop" }}
                    id="saveitemid"
                    className="dashboard_submit_btn integrity-submit"
                    type="submit">
                    Submit
                  </button>
                }

                <button
                  style={{ display: "none" }}
                  id="update-btn-integrity"
                  className="dashboard_submit_btn"
                  type="submit"
                  onClick={() => this.UpdateListItem()}>
                  Update
                </button>
                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btn-integrity" type="submit" onClick={() => this.Printthis()}>Print</button>

                {GlobalFormOpenedMode == "New" &&
                  <button id="btn-sign-integrity" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="btn-hr-integrity" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>

        <div id="dashboard_right-print-integrity" style={{ display: "none" }}>
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

            <div className="header-title-units">
              <span>DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE</span>
              <ul>
                <li>Control Number: <b id="print-Integrity-Control-Number"></b></li>
                <li>Version: <b id="print-Integrity-Version-Number"></b></li>
              </ul>

            </div>

          </div>
          <div className="dashboard_right_ffamily ">
            <div className="personal_info_part">
              <div className="integrity_part_top">
                <div className="integrity_first_para">
                  <p>
                    I{" "}<span id="print-IntegrityFullName" className="integrity-disabled" />

                    {" "}having DOH license No.{" "}
                    <span id="print-DOH-License-No" className="integrity-disabled" />
                    {" "}as{" "}
                    <span id="print-Integrity-Declare" className="declare integrity-disabled" />
                    {" "}
                    declares that I have read and understood the responsibilities assigned to me under the Policy on Integrity & Benefit Disclosure
                    ( <a
                    // href={`${this.props.siteurl}/DOH%20Policy%20Integrity%20%20Benefit%20Disclosure/`}
                    //  target="_blank"
                    >
                      DOH/ Policy/IBD/1</a> ) as
                    a licensed healthcare professional. And I assure to comply with the Code of Conduct and Conflict of
                    interest outlined by Department of Health and Burjeel Holdings at present or in future for my license
                    category.
                  </p>
                  <p>
                    I also acknowledge that I take responsibility to attend all the awareness program related to the Policy on
                    Integrity & Benefit Disclosure organized by Department of Health, Abu Dhabi.
                  </p>
                </div>
              </div>
              <div className="integrity_part">
                <div className="integrity_part_sign_part_head">
                  <p style={{ float: "left", width: "60%" }}>Signed By Employee</p>
                  <p>Validated By HR</p>
                  <div className="integrity_part_sign_part">
                    <div className="signature-new-wrap print-jr-sign">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Name</span>
                          </div>
                        </div>
                      </div>
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Name</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="signature-new-wrap print-jr-sign">
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
                            <span className="form-check-label">Signature</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="signature-new-wrap print-jr-sign">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Date</span>
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
                  <div className="pageborder"></div>
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </>
    );
  }
}