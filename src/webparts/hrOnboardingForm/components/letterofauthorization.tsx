import * as React from "react";
import { IletterofauthorizationProps } from "./IHrOnboardingFormProps";
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


export interface ILetterAuthorizationNewState {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  IndetityCardNo: string;
  Date: string;
  Certificates: string;
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  BusinessMaster: any[];
  TCDescription: any[];
  Alreadysublitted: boolean;
  Dynamiclogo: any[];
  firstname: any[];
  lastname: any[];
  ONBSessionID: string;
  LOASubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  loaFormControlNumber: any[];
  loaFormVersionNumber: any[]
  HrCompleteStatus: boolean;
}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var Description;
var officename = "";
var LogoUrl;
let LoaItemID;
var ImageSrcloa = "";
var Mode;
var lettermode;
var loalistid;
var employeeloabussinessName = "";
var officefirstname;
var officlelastname;

var VersionNumber;
var ControlNumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class LoaNewForm extends React.Component<IletterofauthorizationProps, ILetterAuthorizationNewState, {}> {
  constructor(props: IletterofauthorizationProps, state: ILetterAuthorizationNewState) {
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
      TCDescription: [],
      Alreadysublitted: true,
      Dynamiclogo: [],
      firstname: [],
      lastname: [],
      ONBSessionID: "",
      LOASubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      loaFormControlNumber: [],
      loaFormVersionNumber: [],
      HrCompleteStatus: false
    };

  }
  public componentDidMount() {
    const url: any = new URL(window.location.href);
    LoaItemID = url.searchParams.get("LoaItemID");
    Mode = url.searchParams.get("LoaMode");
    lettermode = url.searchParams.get("LoaMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    this.removevalidationloa();
    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar").attr("style", "display: none !important");
    $("#spLeftNav").attr("style", "display: none !important");
    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");
    $(".loaviewmodedisable").prop("disabled", true)

    if (GlobalFormOpenedMode == "View") {
      this.GetLEtterofAuthViewItem(GlobalSessionIDValue);
      this.GetLEtterofAuthViewItemForPrint(GlobalSessionIDValue);
    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetLEtterofAuthEditItem(GlobalSessionIDValue);
    }
    this.GetCurrentUserDetails();
    this.TCDescription();
  }

  public GetLEtterofAuthViewItemForPrint(ID) {

    // $(`.print-loanameempedit`).show();
    // $(`.print-loanameemp`).hide();
    // $("#print-userupdateitemloa").hide();

    $(".print-loa-submit").hide();
    $(".print-btnloa").show();
    $("#print-dynamicloabusinessunit-name").show();
    $("#print-loabusinessunit-name").hide();
    $(`#print-imgshow`).show();
    $("#Dynamicimg").hide();
    $("#Dynmaicdesc").hide();

    newweb.lists.getByTitle("LetterAuthorization")
      .items.select(
        "ID",
        "Date",
        "FirstName",
        "MiddleName",
        "LastName",
        "IdentityCardNo",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "ControlNumber",
        "VersionNumber",
        "BusinessUnit"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {

          $(".loaimg").show();
          employeeloabussinessName = result[0].BusinessUnit;
          $("#print-FirstName").text(result[0].FirstName);
          $("#print-MiddleName").text(result[0].MiddleName);
          $("#print-LastName").text(result[0].LastName);
          $("#print-IdentityCardNo").text(result[0].IdentityCardNo);
          $("#print-loa-Control-Number").text(result[0].ControlNumber)
          $("#print-loa-Version-Number").text(result[0].VersionNumber);
          ImageSrcloa = result[0].UnitLogo;

        }

      });


  }

  public GetLEtterofAuthViewItem(GlobalSessionIDValue) {
    $(".print-btnloa").show()
    $(".loa-submit").hide();
    $("#update-btn-loa").hide();
    $("#dynamicloabusinessunit-name").show();
    $("#loabusinessunit-name").hide();
    $(`#imgshow`).show();
    $("#Dynamicimg").hide();
    $("#Dynmaicdesc").hide();
    $(".loa-submit").hide();
    newweb.lists.getByTitle("LetterAuthorization")
      .items.select(
        "ID",
        "Date",
        "FirstName",
        "MiddleName",
        "LastName",
        "IdentityCardNo",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {
          $(".loa_tickimg").show()
          employeeloabussinessName = result[0].BusinessUnit;
          $("#FirstName").val(result[0].FirstName);
          $("#MiddleName").val(result[0].MiddleName);
          $("#LastName").val(result[0].LastName);
          $("#IdentityCardNo").val(result[0].IdentityCardNo);
          $(".loaviewmodedisable").prop("disabled", true)
          $("#IdentityCardNo").prop("disabled", true)
          // $(".loatitle").attr("style", "color:#00A36C");
          ImageSrcloa = result[0].UnitLogo;
        }
      });
  }

  public GetLEtterofAuthEditItem(GlobalSessionIDValue) {
    $("#dynamicloabusinessunit-name").show();
    $("#loabusinessunit-name").hide();
    $(`#imgshow`).show();
    $(".loa-submit").hide();
    $("#update-btn-loa").show();
    $("#Dynamicimg").hide();
    $("#Dynmaicdesc").hide();
    $(".loa-submit").hide();
    newweb.lists.getByTitle("LetterAuthorization")
      .items.select(
        "ID",
        "Date",
        "FirstName",
        "MiddleName",
        "LastName",
        "IdentityCardNo",
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
          loalistid = result[0].ID;
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber
          $(".loa_tickimg").show()
          employeeloabussinessName = result[0].BusinessUnit;
          $("#FirstName").val(result[0].FirstName);
          $("#MiddleName").val(result[0].MiddleName);
          $("#LastName").val(result[0].LastName);
          $("#IdentityCardNo").val(result[0].IdentityCardNo);
          $(".loaviewmodedisable").prop("disabled", true)
          // $(".loatitle").attr("style", "color:#00A36C");
          ImageSrcloa = result[0].UnitLogo;
        }
      });
  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }
  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'EMPLOYEE CODE OF CONDUCT & ETHICS' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'LETTER OF AUTHORIZATION'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "LETTER OF AUTHORIZATION") {
          this.setState({
            LOASubmissionStatus: response[0].Status
          });
          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.Getloalistitem(ONBSessionID, FormMode);
          }
        }
      }
    });
  }

  public UpdateListItemloa() {
    if (this.identity()) {
      var FName = $("#FirstName").val();
      var MiddleName = $("#MiddleName").val();
      var LastName = $("#LastName").val();
      var CardNo = $("#IdentityCardNo").val();
      newweb.lists.getByTitle("LetterAuthorization").items.getById(loalistid).update({
        Title: "LETTER OF AUTHORIZATION",
        FirstName: FName,
        MiddleName: MiddleName,
        LastName: LastName,
        IdentityCardNo: CardNo,
        Status: "Updated by Unit HR",
      })
        .then((results: any) => {
          if (this.state.HrCompleteStatus == true) {
            subweb.lists.getByTitle("Letter Authorization HR Update History").items.add({
              Title: "LETTER OF AUTHORIZATION",
              FirstName: FName,
              MiddleName: MiddleName,
              LastName: LastName,
              IdentityCardNo: CardNo,
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
    if (status == true && $("#IdentityCardNo").val() != "") {
      $("#err-identitycard").hide();
    } else {
      $("#err-identitycard").show();
      status = false;
    }
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
        console.log(resultData);

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
            VersionNumber: results[0].VersionNumber
          })


        });
    }
  }


  // public GetControlNumberAccordingtoformname(ofcname) {
  //   if (GlobalFormOpenedMode == "New") {
  //     newweb.lists
  //       .getByTitle("Onboarding Form Name Master")
  //       .items.select("ID", "Title", "FormControlNumber", "FormVersionNumber")
  //       .filter(`Title eq 'LETTER OF AUTHORIZATION'`)
  //       .get()
  //       .then((results) => {
  //         this.setState({
  //           loaFormControlNumber: results[0].FormControlNumber,
  //           loaFormVersionNumber: results[0].FormVersionNumber
  //         })

  //         //alert(this.state.ControlNumber+"-"+this.state.cocFormControlNumber)
  //       });

  //   }
  // }
  public async GetControlNumberAccordingtoformname(ofcname) {
    if (GlobalFormOpenedMode == "New") {


      const fieldname1: IFieldInfo = await newweb.lists.getByTitle("Onboarding Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Control Number")();

      const fieldname2: IFieldInfo = await newweb.lists.getByTitle("Onboarding Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Version Number")();


      await newweb.lists.getByTitle("Onboarding Form Name Master").items.select("*", "Title")
        .filter(`Title eq 'LETTER OF AUTHORIZATION'`).get()
        .then((results) => {

          this.setState({
            loaFormControlNumber: results[0][fieldname1.InternalName],
            loaFormVersionNumber: results[0][fieldname2.InternalName]
          })
        });

    }
  }
  public TCDescription() {
    newweb.lists.getByTitle("LOA Master").items.select("Description", "ID").get().then((results) => {
      this.setState({
        TCDescription: results,
      });
    });
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
      // var FName = ($("#FirstName").val() as any).toUpperCase();
      // var MiddleName = ($("#MiddleName").val() as any).toUpperCase();
      // var LastName = ($("#LastName").val() as any).toUpperCase();
      var FName = $("#FirstName").val();
      var MiddleName = $("#MiddleName").val();
      var LastName = $("#LastName").val();
      var CardNo = $("#IdentityCardNo").val();
      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          let list = newweb.lists.getByTitle("LetterAuthorization");
          list.items
            .add({
              Title: "LETTER OF AUTHORIZATION",
              FirstName: FName,
              MiddleName: MiddleName,
              LastName: LastName,
              IdentityCardNo: CardNo,
              BusinessUnit: officename,
              Status: "Submitted by employee",
              UnitLogo: LogoUrl,
              ONBSessionID: this.state.ONBSessionID,
              VersionNumber: this.state.loaFormVersionNumber,
              ControlNumber: this.state.ControlNumber + "/" + this.state.loaFormControlNumber
            })
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'LETTER OF AUTHORIZATION'").orderBy("Created", false).get().then((response) => {
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

  public dashboardloa() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
  }

  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Personal Information Master").items.select("FirstName", "LastName", "MiddleName", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          if (result[0].MiddleName != "" || result[0].MiddleName != null || result[0].MiddleName != undefined) {
            $("#FirstName").val(result[0].FirstName);
            $("#MiddleName").val(result[0].MiddleName);
            $("#LastName").val(result[0].LastName)
          } else {
            $("#FirstName").val(result[0].FirstName);
            $("#LastName").val(result[0].LastName);
            $("#MiddleName").val("-");
          }
        }
      })
  }

  public async Getloalistitem(ONBSessionID, FormMode) {

    // if (Mode == null) {
    await newweb.lists.getByTitle("LetterAuthorization")
      .items.select(
        "ID",
        "Date",
        "FirstName",
        "MiddleName",
        "LastName",
        "IdentityCardNo",
        "Status",
        "ONBSessionID",
        "Author/Title"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`).expand("Author")
      .get().then((response) => {

        if (response.length != 0) {
          $(".loa_tickimg").show()
          $("#IdentityCardNo").prop("disabled", true)
          $("#FirstName").val(response[0].FirstName);
          $("#MiddleName").val(response[0].MiddleName);
          $("#LastName").val(response[0].LastName);
          $("#IdentityCardNo").val(response[0].IdentityCardNo);
          $(".loaviewmodedisable").prop("disabled", true);
          $(".loa-submit").hide();
          // $(".loatitle").attr("style", "color:#00A36C");

        }
      });
    // }
  }

  public Printthis() {
    let printContents = document.getElementById('dashboard_right-print-la').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;

  }

  public removevalidationloa() {
    $(".idcardnoloa").keyup(function () {
      $("#err-identitycard").hide();
    });
  }

  public render(): React.ReactElement<IletterofauthorizationProps> {
    var handler = this;
    // const LetterDescription: JSX.Element[] = this.state.TCDescription.map(
    //   function (item, key) {
    //     // var rawhtml="";
    //     var rawhtml = item.Description;
    //     var DynamicSiteName = rawhtml.replaceAll("UNITNAME", officename);
    //     // alert(rawhtml)
    //     return (
    //       <p id="DESC" className="fourthgulp-paragraph">
    //         {" "}
    //         <Markup content={DynamicSiteName} />{" "}
    //       </p>
    //     );
    //   }
    // );
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
            <span>Letter of authorization</span>

          </div>
          <div className="dashboard_right_ffamily ">
            <div className="personal_info_part">
              <div className="letter_auth_top">
                <div className="dashboard_right_text">
                  {/* <p id="Dynmaicdesc">{LetterDescription}</p>
            <div className="Descriptionloaitemid" style={{display:"none"}} id="alldescloaitem"></div>
            <p className="personal_details_para">
                      <span className="personal_details">Personal Details </span>
                    </p> */}
                  <div className="dashboard_right_text">
                    <p className="dashboard_right_pg">
                      I hereby authorize the{" "}
                      <span id="loabusinessunit-name">{officename}</span>{" "}
                      <span
                        style={{ display: "none" }}
                        id="dynamicloabusinessunit-name"
                      >
                        {" "}
                        {employeeloabussinessName}{" "}
                      </span>
                      its authorized affiliates, acting on its behalf to verify
                      information, documentation and background verification
                      presented on my application form including but not limiting to
                      education, employment and licenses.
                    </p>
                    <p>
                      I hereby grant the authority for the bearer of this letter,
                      with immediate effect, to release all necessary information to
                      the <span id="loabusinessunit-name">{officename}</span>{" "}
                      <span
                        style={{ display: "none" }}
                        id="dynamicloabusinessunit-name"
                      >
                        {employeeloabussinessName}
                      </span>
                      , its authorized affiliates, agents and subsidiaries
                    </p>
                    <p>
                      This information / documentation may contain but is not
                      limited to grades, dates of attendance, grade point average,
                      degree / diploma certification, employment title, employment
                      tenure, license attained, status of the license, place of
                      issue and any other information deemed necessary to conduct
                      the verification of the information / documentation provided.
                    </p>
                    <p>
                      I hereby release all persons or entities requesting or
                      supplying such information from any liability arising from
                      such disclosure. I am willing that a photocopy of this
                      authorization be accepted with the same authority as the
                      original. I further understand and acknowledge that this
                      Information Release Form will remain valid for a period of two
                      years following its completion.
                    </p>
                    <p className="personal_details_para">
                      <h3 className="personal_details">Personal Details </h3>
                    </p>
                  </div>
                </div>
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative ">
                      <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        className="form-control input-name first-name-loa loaviewmodedisable"
                        autoComplete="off" />
                      <span className="floating-label">
                        First Name <i className="required">*</i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative ">
                      <input
                        type="text"
                        id="MiddleName"
                        name="MiddleName"
                        className="form-control input-name middle-name-loa loaviewmodedisable"
                        autoComplete="off" />
                      <span className="floating-label">
                        Middle Name
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative ">
                      <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        className="form-control input-name lastname-loa loaviewmodedisable"
                        autoComplete="off" />
                      <span className="floating-label">
                        Last Name <i className="required">*</i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="IdentityCardNo"
                        name="IdentityCardNo"
                        className="form-control idcardno idcardnoloa"
                        autoComplete="off" />
                      <span className="floating-label">
                        Passport / Identity Card Number{" "}
                        <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-identitycard"
                      style={{ color: "red", display: "none" }}>
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4 signature_part sign_part">
                    <p> Signature </p>
                  </div>
                  <div className="col-md-4 signature_part ">
                    <p> Date </p>
                  </div>
                </div>

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
              <div className="dashboard_btn">



                {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                  <button
                    id="saveitemid"
                    className="dashboard_submit_btn loa-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}>
                    Submit
                  </button>
                  :
                  <button style={{ cursor: "no-drop" }}
                    id="saveitemid"
                    className="dashboard_submit_btn loa-submit"
                    type="submit">
                    Submit
                  </button>
                }

                <button
                  style={{ display: "none" }}
                  id="update-btn-loa"
                  className="dashboard_submit_btn"
                  type="submit"
                  onClick={() => this.UpdateListItemloa()}>
                  Update
                </button>
                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnloa" type="submit" onClick={() => this.Printthis()}>Print</button>
                {GlobalFormOpenedMode == "New" &&
                  <button id="btn-sign-loa" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="btn-hr-loa" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>

        <div id="dashboard_right-print-la" style={{ display: "none" }}>
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
              <span>Letter of authorization</span>
              <ul>
                <li>Control Number: <b id="print-loa-Control-Number"></b></li>
                <li>Version: <b id="print-loa-Version-Number"></b></li>
              </ul>

            </div>
          </div>
          <div className="dashboard_right_ffamily">
            <div className="letter_auth_top">
              <div className="dashboard_right_text">

                <div className="dashboard_right_text">
                  <p className="dashboard_right_pg">
                    I hereby authorize the{" "}
                    <span id="print-loabusinessunit-name">{officename}</span>{" "}
                    <span
                      style={{ display: "none" }}
                      id="print-dynamicloabusinessunit-name"
                    >
                      {" "}
                      {employeeloabussinessName}{" "}
                    </span>
                    its authorized affiliates, acting on its behalf to verify
                    information, documentation and background verification
                    presented on my application form including but not limiting to
                    education, employment and licenses.
                  </p>
                  <p>
                    I hereby grant the authority for the bearer of this letter,
                    with immediate effect, to release all necessary information to
                    the <span id="print-dynamicloabusinessunit-name"> {employeeloabussinessName}</span>{" "}

                    , its authorized affiliates, agents and subsidiaries
                  </p>
                  <p>
                    This information / documentation may contain but is not
                    limited to grades, dates of attendance, grade point average,
                    degree / diploma certification, employment title, employment
                    tenure, license attained, status of the license, place of
                    issue and any other information deemed necessary to conduct
                    the verification of the information / documentation provided.
                  </p>
                  <p>
                    I hereby release all persons or entities requesting or
                    supplying such information from any liability arising from
                    such disclosure. I am willing that a photocopy of this
                    authorization be accepted with the same authority as the
                    original. I further understand and acknowledge that this
                    Information Release Form will remain valid for a period of two
                    years following its completion.
                  </p>
                  <p className="personal_details_para">
                    <h3 className="personal_details">Personal Details </h3>
                  </p>
                </div>
              </div>
              <div className="row form">

                <div className="col-md-4">
                  <div className="form-group relative ">
                    <span
                      id="print-FirstName"
                      className="print-control input-name first-name-loa loaviewmodedisable"
                    />
                    <span className="floating-label">
                      First Name <i className="required">*</i>
                    </span>
                  </div>

                </div>

                <div className="col-md-4">
                  <div className="form-group relative ">
                    <span
                      id="print-MiddleName"
                      className="print-control input-name middle-name-loa loaviewmodedisable"
                    />
                    <span className="floating-label">
                      Middle Name <i className="optional"></i>
                    </span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative ">
                    <span
                      id="print-LastName"
                      className="print-control input-name lastname-loa loaviewmodedisable"
                    />
                    <span className="floating-label">
                      Last Name <i className="required">*</i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <span
                      // type="text"
                      id="print-IdentityCardNo"
                      // name="IdentityCardNo"
                      className="print-control idcardno print-idcardnoloa loaviewmodedisable"
                    // autoComplete="off"
                    />
                    <span className="floating-label">
                      Passport / Identity Card Number{" "}
                      <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-identitycard"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

              </div>
              {/* <div className="row form">
     <div className="col-md-4 signature_part sign_part">
                <p> Signature </p>
              </div>
              <div className="col-md-4 signature_part ">

                <p> Date </p>
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
      </>
    );
  }
}