import * as React from "react";
import { IletterofauthorizationProps } from "./IHrOnboardingFormProps";
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
import { escape } from "@microsoft/sp-lodash-subset";
import { Log } from "@microsoft/sp-core-library";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";
import { PermissionKind } from "@pnp/sp/security";
import { IFieldInfo } from "@pnp/sp/fields/types";



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
  ONBSessionID: string;
  JoiningReportSubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  HrCompleteStatus: boolean;
}
const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var Description;
var officename = "";
var LogoUrl;
let JoiningItemID;
var ImageSrcloajoin = "";
var Mode;
var joinmode;
var listitemidjoinid;
var Dynamiofficenamejoining = '';
var getsponname = "";
var FormID1: number;
var joiningreportlistID: number;

var joiningVersionNumber;
var joiningControlNumber;

var ControlNumber: any[]
var VersionNumber: any[]
var JoiningFormControlNumber: any[]
var JoiningFormVersionNumber: any[]

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
      ONBSessionID: "",
      JoiningReportSubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      HrCompleteStatus: false
    };

  }
  public componentDidMount() {
    // this.Getcurrentuserpermission()
    const url: any = new URL(window.location.href);
    JoiningItemID = url.searchParams.get("JoiningItemId");
    Mode = url.searchParams.get("JoiningreportMode");
    joinmode = url.searchParams.get("JoiningreportMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar").attr("style", "display: none !important");
    $("#spLeftNav").attr("style", "display: none !important");
    $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
    $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");
    $(".joinreportndate").val(moment().format("YYYY-MM-DD"));
    $("#JoiningDate").val(moment().format("YYYY-MM-DD"));
    $("#Namejoining").prop('disabled', true);
    $("#SponsorsNamejoining").prop('disabled', true);
    $("#PassportNojoining").prop('disabled', true);

    if (GlobalFormOpenedMode == "View") {
      this.GetJoiningReportItemView(GlobalSessionIDValue);
      this.GetJoiningReportItemViewForPrint(GlobalSessionIDValue);
    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetJoiningReportItemEdit(GlobalSessionIDValue);
    }
    this.GetCurrentUserDetails();
    this.checkboxchecking();
    this.removevalidationjoiningreport();

  }


  // public Getcurrentuserpermission(){
  //   debugger
  //   var targetRoleDefinitionName = 'Contribute';
  //     $.ajax({
  //       url: `${this.props.siteurl} + '/_api/web/roledefinitions/getbyname(\''
  //           + targetRoleDefinitionName + '\')/id`,
  //       type: 'GET',
  //       headers: { 'accept':'application/json;odata=verbose' },
  //       success: function(responseData) {
  //         var targetRoleDefinitionId = responseData.d.Id;
  //         //this.breakRoleInheritanceOfList();
  //         console.log(targetRoleDefinitionId);

  //       },
  //       error: function (jqXHR, textStatus, errorThrown) { },
  //     });

  // }



  public GetJoiningReportItemViewForPrint(ID) {

    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "ID",
        "VisaType",
        "Name",
        "Designation",
        "EmployeeIDNumber",
        "DateofJoining",
        "Date",
        "Passport_x0020_No",
        "Department",
        "Location",
        "SponsorName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {

          setTimeout(() => {
            if (result[0].VisaType == "Sponsorship") {
              // $(`#print-Sponsorshiptype`).attr("checked", "checked");
              // $(`#print-Sponsorshiptype`).removeAttr("disabled");
              $(`#print-Sponsorshiptype-visa`).text("Sponsorship");
            } else if (result[0].VisaType == "Employment") {
              // $(`#print-Employmenttype`).attr("checked", "checked");
              // $(`#print-Employmenttype`).removeAttr("disabled");
              $(`#print-Sponsorshiptype-visa`).text("Employment");
            }
          }, 2000);

          $(".print-dynaminamejoin").text(result[0].Name);
          $(".print-joiningreportname").text(result[0].Name);
          //  $('.print-joiningreporttitle').attr("style", "color:#00A36C");
          $(".print-joiningreportpassportno").text(result[0].Passport_x0020_No);
          $(".print-joiningreportdoj").text("  ");//date of joining
          $(".print-joiningreportloc").text(result[0].Location);
          $(".print-joiningreportdesi").text(result[0].Designation);
          $(".print-joiningreportdept").text(result[0].Department);

          $(".print-joiningreportempidno").text(result[0].EmployeeIDNumber);
          $(".print-joinreportndate").text(" ");
          $("#print-Joining-Control-Number").text(result[0].ControlNumber);
          $("#print-Joining-Version-Number").text(result[0].VersionNumber);
          ImageSrcloajoin = result[0].UnitLogo;
          Dynamiofficenamejoining = result[0].BusinessUnit
          if (result[0].SponsorName == "Select") {
            $(".print-joiningreportsponname").text("-");
          } else {
            $(".print-joiningreportsponname").text(result[0].SponsorName);
          }
        }
      });
    $(".print-unitsnamejoining").hide();
    $(".print-dynamicoficenamejoin").show();


  }

  public GetCurrentUserDetails() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        var Name = resultData.d.DisplayName;
        // $(".joining_currentusername").val(Name)
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
        }
      },
      error: function (jqXHR, textStatus, errorThrown) { },
    });
  }

  public LogoUnitDynamic(ofc) {
    if (GlobalFormOpenedMode == "New") {
      newweb.lists
        .getByTitle("Business Unit Master")
        .items.select("ID", "UnitLogo")
        .filter(`Title eq '${ofc}'`)
        .get()
        .then((results) => {
          //serverRelativeUrl

          var img = results[0].UnitLogo;
          LogoUrl = JSON.parse(img).serverRelativeUrl;
          this.setState({
            Dynamiclogo: results,
          });
        });
    }
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


    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'PERSONAL INFORMATION FORM' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'JOINING REPORT'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "JOINING REPORT") {
          this.setState({
            JoiningReportSubmissionStatus: response[0].Status
          });
          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.Getuserlistitemjoin(ONBSessionID, FormMode);
          } else if (GlobalFormOpenedMode == "New" && response[0].Status == "Inprogress") {

            $(".joinreportndate").val(moment().format("YYYY-MM-DD"));

          }
        }
      }
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

          ControlNumber = results[0].Controlnumber
          VersionNumber = results[0].VersionNumber

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
        .filter(`Title eq 'JOINING REPORT'`).get()
        .then((results) => {

          JoiningFormControlNumber = results[0][fieldname1.InternalName]
          JoiningFormVersionNumber = results[0][fieldname2.InternalName]

        });

    }
  }
  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Personal Information Master")
      .items.select("FullName", "SponsorName", "DocumentNo", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $(".joining_currentusername").val(result[0].FullName);
          $(".joiningreportpassportno").val(result[0].DocumentNo);
          $(".joiningreportsponname").val(result[0].SponsorName);
        }
      })
  }

  public async Getuserlistitemjoin(ONBSessionID, FormMode) {

    await newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "ID",
        "VisaType",
        "Name",
        "Designation",
        "EmployeeIDNumber",
        "DateofJoining",
        "Date",
        "Passport_x0020_No",
        "Department",
        "Location",
        "SponsorName",
        "ONBSessionID",
        "Author/Title"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get().then((result) => {
        if (result.length != 0) {
          listitemidjoinid = result[0].ID;
          $(".joiningreport_tickimg").show()
          $(".joiningreportupdateunit").hide();
          $(".joiningreportviewmode").prop('disabled', true)
          // $(".joiningreporttitle").attr("style", "color:#00A36C");
          $("#saveitemidjoinss").hide();
          $(".joiningreportname").val(result[0].Name);
          $("#PassportNojoining").val(result[0].Passport_x0020_No);
          $("#JoiningDate").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
          $(".joinreportndate").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $("#Designationjoining").val(result[0].Designation);
          $("#Departmentjoining").val(result[0].Department);
          $("#Locationjoining").val(result[0].Location);
          $("#SponsorsNamejoining").val(result[0].SponsorName)
          $("#EmployeeIDNumberjoining").val(result[0].EmployeeIDNumber);

          if (result[0].VisaType == "Sponsorship") {
            $(`#Sponsorshiptype`).prop("checked", true);
          } else if (result[0].VisaType == "Employment") {
            $(`#Employmenttype`).prop("checked", true);
          }
        }
      });
  }

  public checkboxchecking() {

    $("#Sponsorshiptype").on("change", function (event) {
      $("#Employmenttype").prop('checked', false);
    });

    $("#Employmenttype").on("change", function (event) {
      $("#Sponsorshiptype").prop('checked', false);
    });

  }

  public removevalidationjoiningreport() {

    $("#Sponsorshiptype").on("change", function () {
      $("#err-Sponsorshiptypejoining").hide();
    });

    $("#Employmenttype").on("change", function () {
      $("#err-Sponsorshiptypejoining").hide();
    });

    $("#PassportNojoining").keyup(function () {
      $("#err-passportnojoining").hide();
    });

    $("#Designationjoining").keyup(function () {
      $("#err-designationjoining").hide();
    });

    $("#Departmentjoining").keyup(function () {
      $("#err-departmentjoining").hide();
    });

    $("#Locationjoining").keyup(function () {
      $("#err-locationjoining").hide();
    });

    $("#Designationjoining").keyup(function () {
      $("#err-designationjoining").hide();
    });

    $("#SponsorsNamejoining").keyup(function () {
      $("#err-Sponsorsnamejoining").hide();
    });

    $("#EmployeeIDNumberjoining").keyup(function () {
      $("#err-EmployeeIDjoining").hide();
    });
  }

  public GetJoiningReportItemView(GlobalSessionIDValue) {
    $(".print-btnjoin").show()
    $(".joiningreportupdateunit").hide();
    $(".joiningreportviewmode").prop('disabled', true)
    $("#saveitemidjoinss").hide();
    $(".unitsnamejoining").hide();
    $(".dynamicoficenamejoin").show();
    $(`#imgshowjoinjoin`).show();
    $("#saveitemidjoinss").hide();
    $("#dynamicimgjoin").hide();
    $("#IamgeJoiningItemIDjoin").show();

    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "ID",
        "VisaType",
        "Name",
        "Designation",
        "EmployeeIDNumber",
        "DateofJoining",
        "Date",
        "Passport_x0020_No",
        "Department",
        "Location",
        "SponsorName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {
          $(".joiningreport_tickimg").show()
          if (result[0].VisaType == "Sponsorship") {
            $(`#Sponsorshiptype`).prop("checked", true);
          } else if (result[0].VisaType == "Employment") {
            $(`#Employmenttype`).prop("checked", true);
          }
          $(".joiningreportname").val(result[0].Name);
          $(".joinreportndate").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".joiningreportpassportno").val(result[0].Passport_x0020_No);
          $(".joiningreportdoj").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
          $(".joiningreportloc").val(result[0].Location);
          $(".joiningreportdesi").val(result[0].Designation);
          $(".joiningreportdept").val(result[0].Department);
          $(".joiningreportsponname").val(result[0].SponsorName);
          $(".joiningreportempidno").val(result[0].EmployeeIDNumber);
          ImageSrcloajoin = result[0].UnitLogo;
          Dynamiofficenamejoining = result[0].BusinessUnit;
          $("#Namejoining").prop('disabled', true);
          $("#SponsorsNamejoining").prop('disabled', true);
          $("#PassportNojoining").prop('disabled', true);
        }
      });

  }

  public GetJoiningReportItemEdit(GlobalSessionIDValue) {
    $("#JoiningDate").prop('disabled', false);
    $(".joinreportndate").prop('disabled', false);
    $(".joiningreportupdateunit").show();
    $("#saveitemidjoinss").hide();
    $(".unitsnamejoining").hide();
    $(".dynamicoficenamejoin").show();
    $(`#imgshowjoinjoin`).show();
    $("#saveitemidjoinss").hide();
    $("#dynamicimgjoin").hide();
    $("#IamgeJoiningItemIDjoin").show();
    // $(".joiningreporttitle").attr("style", "color:#00A36C");
    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "ID",
        "VisaType",
        "Name",
        "Designation",
        "EmployeeIDNumber",
        "DateofJoining",
        "Date",
        "Passport_x0020_No",
        "Department",
        "Location",
        "SponsorName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "VersionNumber",
        "ControlNumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((result) => {
        if (result.length != 0) {
          joiningreportlistID = result[0].ID
          joiningVersionNumber = result[0].VersionNumber
          joiningControlNumber = result[0].ControlNumber
          $(".joiningreport_tickimg").show()
          if (result[0].VisaType == "Sponsorship") {
            $(`#Sponsorshiptype`).prop("checked", true);
          } else if (result[0].VisaType == "Employment") {
            $(`#Employmenttype`).prop("checked", true);
          }
          $(".joiningreportname").val(result[0].Name);
          $(".joinreportndate").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".joiningreportpassportno").val(result[0].Passport_x0020_No);
          $(".joiningreportdoj").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
          $(".joiningreportloc").val(result[0].Location);
          $(".joiningreportdesi").val(result[0].Designation);
          $(".joiningreportdept").val(result[0].Department);
          $(".joiningreportsponname").val(result[0].SponsorName);
          $(".joiningreportempidno").val(result[0].EmployeeIDNumber);
          ImageSrcloajoin = result[0].UnitLogo;
          Dynamiofficenamejoining = result[0].BusinessUnit;
          $("#Namejoining").prop('disabled', true);
          $("#SponsorsNamejoining").prop('disabled', true);
          $("#PassportNojoining").prop('disabled', true);
        }
      });

  }

  public UpdateOtherForms(ONBSessionID) {

    newweb.lists.getByTitle("COI Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("COI Transaction").items.getById(result[0].ID)
          .update({
            EmployeeDesignation: $("#Designationjoining").val(),
          })
      })

    newweb.lists.getByTitle("Employee Coc Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Employee Coc Transaction").items.getById(result[0].ID)
          .update({
            EmployeeId: $("#EmployeeIDNumberjoining").val(),
          })
      })

    newweb.lists.getByTitle("Specimen Signature Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Specimen Signature Transaction").items.getById(result[0].ID)
          .update({
            Designation: $("#Designationjoining").val(),
            EmployeeNo: $("#EmployeeIDNumberjoining").val(),
            PassportNo: $("#PassportNojoining").val(),
            DateofJoining: $("#JoiningDate").val(),
          })
      })

    newweb.lists.getByTitle("Emp NDA Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Emp NDA Transaction").items.getById(result[0].ID)
          .update({
            PassportNo: $("#PassportNojoining").val(),
          })
      })


    newweb.lists.getByTitle("Acknowledgement And Policy Declarations Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("Acknowledgement And Policy Declarations Transaction").items.getById(result[0].ID)
            .update({
              EmployeeId: $("#EmployeeIDNumberjoining").val(),
              EmployeeDepartment: $("#Departmentjoining").val(),
              EmployeeDesignation: $("#Designationjoining").val(),
              DateofJoining: $("#JoiningDate").val(),
              EmployeeJobTitle: $("#Designationjoining").val()
            })
        }
      })
    newweb.lists.getByTitle("Employee Stamp Acknowledgement Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("Employee Stamp Acknowledgement Transaction").items.getById(result[0].ID)
            .update({
              EmployeeIDNumber: $("#EmployeeIDNumberjoining").val(),
            })
        }
      })
    newweb.lists.getByTitle("Employee Dosimeter Acknowledgement Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("Employee Dosimeter Acknowledgement Transaction").items.getById(result[0].ID)
            .update({
              EmployeeIDNumber: $("#EmployeeIDNumberjoining").val(),
            })
        }
      })


    newweb.lists.getByTitle("PhotoVideo Consent and Release Form Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("PhotoVideo Consent and Release Form Transaction").items.getById(result[0].ID)
            .update({
              EmployeeIDNumber: $("#EmployeeIDNumberjoining").val(),
            })
        }
      })



    newweb.lists.getByTitle("EmployeeBankDetailsMaster").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("EmployeeBankDetailsMaster").items.getById(result[0].ID)
            .update({
              EmployeeId: $("#EmployeeIDNumberjoining").val(),
              Department: $("#Departmentjoining").val(),

            })
        }
      })

    newweb.lists.getByTitle("UniformRequest").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists.getByTitle("UniformRequest").items.getById(result[0].ID)
            .update({
              Department: $("#Departmentjoining").val(),
              EmployeeNo: $("#EmployeeIDNumberjoining").val(), //id no
              JoiningDate: $("#JoiningDate").val(),
              JobTitle: $("#Designationjoining").val(),
            })
        }
      })
    newweb.lists.getByTitle("HR IT Privilege Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get().then((result) => {
      newweb.lists.getByTitle("HR IT Privilege Transaction").items.getById(result[0].Id)
        .update({
          DateofJoining: $("#JoiningDate").val(),
          Designation: $("#Designationjoining").val(),
          Department: $("#Departmentjoining").val(),
          EmployeeID: $("#EmployeeIDNumberjoining").val(),

        })
    })

  }

  public UpdateListItemjr() {

    var Name = $("#Namejoining").val();
    var curntdate = $(".joinreportndate").val() != "" ? $(".joinreportndate").val() : "-";

    var PpNo = $("#PassportNojoining").val();
    var DOJ = $("#JoiningDate").val();
    var Desi = $("#Designationjoining").val();
    var Dept = $("#Departmentjoining").val();
    var loc = $("#Locationjoining").val();
    var spontype = $("#Sponsorshiptype").is(":checked");
    var emptype = $("#Employmenttypejoining").is(":checked");
    var sponname = $("#SponsorsNamejoining").val();
    var Empidno = $("#EmployeeIDNumberjoining").val();
    if (spontype) {
      var Sponsorshiptype = "Sponsorship"
    }
    else {
      Sponsorshiptype = "Employment"
    }

    if (this.joiningdesignation()
      && this.joiningdepartment()
      && this.joiningloc()
      && this.validationcheckbox()
    ) {
      newweb.lists.getByTitle("Employee Joining Report Transaction").items.getById(joiningreportlistID).update({
        //  Title: "JOINING REPORT",
        Name: Name,
        Passport_x0020_No: PpNo,
        DateofJoining: DOJ,
        Designation: Desi,
        Department: Dept,
        Location: loc,
        Date: curntdate,
        Status: "Updated by Unit HR",
        // UnitLogo: LogoUrl,
        VisaType: Sponsorshiptype,
        SponsorName: sponname,
        EmployeeIDNumber: $("#EmployeeIDNumberjoining").val() == "" ? "-" : $("#EmployeeIDNumberjoining").val(),

      })
        .then((results: any) => {
          this.UpdateOtherForms(GlobalSessionIDValue);
          if (this.state.HrCompleteStatus == true) {
            subweb.lists.getByTitle("Employee Joining Report HR Update History").items.add({
              //  Title: "JOINING REPORT",
              Name: Name,
              Passport_x0020_No: PpNo,
              DateofJoining: DOJ,
              Designation: Desi,
              Department: Dept,
              Location: loc,
              Date: curntdate,
              Status: "Updated by Unit HR",
              // UnitLogo: LogoUrl,
              VisaType: Sponsorshiptype,
              SponsorName: sponname,
              EmployeeIDNumber: $("#EmployeeIDNumberjoining").val() == "" ? "-" : $("#EmployeeIDNumberjoining").val(),
              ONBSessionID: GlobalSessionIDValue,
              BusinessUnit: officename,
              VersionNumber: joiningVersionNumber,
              ControlNumber: joiningControlNumber,
            })
          }
          swal({
            title: "The Form has been updated successfully",
            icon: "success",
          }).then(() => {
            location.reload()
          });
        });
    }
  }
  public CheckDate() {

  }
  public joiningdate() {

  }

  public joiningdesignation() {
    var status = true;
    if (status == true && $(".joiningreportdesi").val() != "") {
      $("#err-designationjoining").hide();
    } else {
      $("#err-designationjoining").show();
      $(".joiningreportdesi").focus()
      status = false;
    }
    return status;
  }

  public joiningdepartment() {
    var status = true;
    if (status == true && $(".joiningreportdept").val() != "") {
      $("#err-departmentjoining").hide();
    } else {
      $("#err-departmentjoining").show();
      $(".joiningreportdept").focus()
      status = false;
    }
    return status;
  }

  public joiningloc() {
    var status = true;
    if (status == true && $(".joiningreportloc").val() != "") {
      $("#err-locationjoining").hide();
    } else {
      $("#err-locationjoining").show();
      $(".joiningreportloc").focus()
      status = false;
    }
    return status;
  }

  public joiningempidname() {
    var status = true;
    if (status == true && $(".joiningreportempidno").val() != "") {
      $("#err-EmployeeIDjoining").hide();
    } else {
      $("#err-EmployeeIDjoining").show();
      $(".joiningreportempidno").focus()
      status = false;
    }
    return status;
  }

  public validationcheckbox() {

    var status = true;
    var spontype = $("#Sponsorshiptype").is(":checked");
    var emptype = $("#Employmenttype").is(":checked");

    if (status == true && $("#Sponsorshiptype").is(":checked")) {
      $("#err-Sponsorshiptypejoining").hide();
    }
    else if (status == true && $("#Employmenttype").is(":checked")) {
      $("#err-Sponsorshiptypejoining").hide();
    }
    else {
      $("#err-Sponsorshiptypejoining").show();
      $("#Employmenttype").focus()
      status = false;
    }
    return status;
  }

  public SaveListItem() {

    if (
      //   this.CheckDate() 
      // && this.joiningdate()
      this.joiningdesignation()
      && this.joiningdepartment()
      && this.joiningloc()
      && this.validationcheckbox()
    ) {

      // var Name = ($("#Namejoining").val() as any).toUpperCase();
      var Name = $("#Namejoining").val();
      var PpNo = $("#PassportNojoining").val();
      var DOJ = $("#JoiningDate").val();
      var curntdate = $(".joinreportndate").val() != "" ? $(".joinreportndate").val() : "-";
      var Desi = $("#Designationjoining").val();
      var Dept = $("#Departmentjoining").val();
      var loc = $("#Locationjoining").val();
      var spontype = $("#Sponsorshiptype").is(":checked");
      var emptype = $("#Employmenttypejoining").is(":checked");
      var sponname = $("#SponsorsNamejoining").val();
      var Empidno = $("#EmployeeIDNumberjoining").val();

      if (spontype) {
        var Sponsorshiptype = "Sponsorship"
      }
      else {
        Sponsorshiptype = "Employment"
      }
      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          let list = newweb.lists.getByTitle("Employee Joining Report Transaction");
          list.items
            .add({
              Title: "JOINING REPORT",
              Name: Name,
              Passport_x0020_No: PpNo,
              Date: moment(curntdate),
              DateofJoining: moment(DOJ),
              Designation: Desi,
              Department: Dept,
              Location: loc,
              Status: "Submitted by Employee",
              UnitLogo: LogoUrl,
              VisaType: Sponsorshiptype,
              SponsorName: sponname,
              EmployeeIDNumber: $("#EmployeeIDNumberjoining").val() == "" ? "-" : $("#EmployeeIDNumberjoining").val(),
              ONBSessionID: this.state.ONBSessionID,
              BusinessUnit: officename,
              ControlNumber: ControlNumber + "/" + JoiningFormControlNumber,
              VersionNumber: JoiningFormVersionNumber
            })
            .then(() => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'JOINING REPORT'").orderBy("Created", false).get().then((response) => {
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
      });
    }
  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }

  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
  }

  public Printthis() {
    let printContents = document.getElementById('dashboard_right-print-jr').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;
  }

  public render(): React.ReactElement<IletterofauthorizationProps> {
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
            <span>Joining Report</span>
          </div>
          <div className="dashboard_right_ffamily">
            <div className="personal_info_part">
              <div className="joining_report_top">
                <div className="form row row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span className="error-validation" id="err-date" style={{ color: "red", display: "none" }}>This field is mandatory.
                      </span>
                      <input type="date" id="date" className="form-control joinreportndate joiningreportviewmode" autoComplete="off" disabled />
                      <span style={{ top: "2px" }} className="floating-label Date-field" >
                        Date
                        {/* <i className="required">*</i> */}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="dept_join_report dept_join_report_pt">
                  <p className="tohrdept">To: HR Department</p>
                  <p className="unitsnamejoining">{officename}
                  </p>
                  <p style={{ display: "none" }} className="dynamicoficenamejoin">{Dynamiofficenamejoining}</p>
                </div>

                <div className="join_report_form">
                  <p> I,  Mr./Mrs./Ms. </p> <span id="mainempnamejoin"> <input id="Namejoining" className="input_b_holder joiningreportname viewmodejoiningreport joiningreportviewmode common_fullname_disable joining_currentusername" type="text" />, </span>
                  <p> holder of passport no. </p><span> <input id="PassportNojoining" type="text" className="input_b_wish joiningreportpassportno joiningreportviewmode" /> </span>
                  <p> wish to inform you that I am joining on (date in MM/DD/YYYY) </p><span> <input id="JoiningDate" type="date" className="input_b_design joiningreportdoj joiningreportviewmode" disabled />, </span>
                  <p> as (designation) </p> <span> <input id="Designationjoining" type="text" className="input_b_dept joiningreportdesi joiningreportviewmode" />, </span>
                  <span className="errorvalidation" id="err-designationjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                  <p> in the department of </p> <span> <input id="Departmentjoining" type="text" className="input_b_at joiningreportdept joiningreportviewmode" /> </span>
                  <span className="errorvalidation" id="err-departmentjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                  <p> at </p> <span> <input id="Locationjoining" type="text" className="input_b_today joiningreportloc joiningreportviewmode" /> </span>
                  <span className="errorvalidation" id="err-locationjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                  <p> today. </p>
                </div>
                <div className="dept_join_report dept_join_report_pt">
                  <p className="joining_report_parag">The address and information provided in my personal data form is correct and I take responsibility in communicating
                    with the HR department, if there are any changes in my communication address and contact details. I also take the
                    responsibility of my personal belongings and the office equipment issued to me (purse, handbags, mobile phones,
                    laptops etc.)</p>
                </div>
                <div className="Joint_report_sign_part_one">
                  <p>Yours truly,</p>
                  <div className="Joint_report_sign_part_two">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Signature of Employeee</span>
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

                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Signature of HR</span>
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
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Head of Department</span>
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

                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Head of Human Resources</span>
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

                <div>
                  <h4>Visa type <i className="required">*</i></h4>
                  <div className="form row row_top">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <div className="form-check">
                          <input
                            className=" sponsorship-type joiningreportviewmode"
                            type="checkbox"
                            id="Sponsorshiptype"
                            name="Sponsorship"
                            value="Sponsorship" />
                          <span className="form-check-label">Sponsorship</span>
                        </div>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Sponsorshiptypejoining"
                        style={{ color: "red", display: "none" }}>
                        Select any one of the checkboxes above
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <div className="form-check">
                          <input className="Employmenttype joiningreportviewmode"
                            type="checkbox"
                            id="Employmenttype"
                            name="Employment"
                            value="Employment" />
                          <span className="form-check-label">Employment</span>
                        </div>
                      </div>
                      <span className="error-validation" id="err-Employmenttypejoining"
                        style={{ color: "red", display: "none" }}>
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                  <div className="form row">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="SponsorsNamejoining" name="SponsorName" className="form-control joiningreportsponname joiningreportviewmode" />
                        <span className="floating-label ">Sponsor’s Name </span>
                      </div>
                      <span className="error-validation" id="err-Sponsorsnamejoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="EmployeeIDNumberjoining" name="EmployeeIDNumber" className="form-control joiningreportempidno joiningreportviewmode" autoComplete="off" />
                        <span className="floating-label ">Employee ID </span>
                      </div>
                      <span className="error-validation" id="err-EmployeeIDjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
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
                  <button id="saveitemidjoinss" className="dashboard_submit_btn joining-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}>
                    Submit
                  </button>
                  :
                  <button id="saveitemidjoinss" style={{ cursor: "no-drop" }} className="dashboard_submit_btn joining-submit"
                    type="submit">
                    Submit
                  </button>
                }

                <button style={{ display: "none" }} className="dashboard_submit_btn joiningreportupdateunit"
                  type="submit"
                  onClick={() => this.UpdateListItemjr()}>
                  Update
                </button>

                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnjoin" type="submit"
                  onClick={() => this.Printthis()}>
                  Print
                </button>

                {GlobalFormOpenedMode == "New" &&
                  <button id="join-btn-employe-newpage" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="jpin-btn-hr-editviewpage" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }

              </div>

            </div>
          </div>
        </div>

        <div id="dashboard_right-print-jr" style={{ display: "none" }}>
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
              <span>Joining Report</span>
              <ul>
                <li>Control Number: <b id="print-Joining-Control-Number"></b></li>
                <li>Version: <b id="print-Joining-Version-Number"></b></li>
              </ul>

            </div>
          </div>
          <div className="dashboard_right_ffamily">
            <div className="joining_report_top">
              {/* <div className="personal_info_part">
        
        <div className="row form row_top">
               <div className="col-md-4">
                 <div className="form-group relative">
                 <span  id="print-Joining-Control-Number"  className="print-control">
              
              </span>
                   <span className="floating-label ">
                   Control Number
                   </span>
                 </div>
               </div>
               <div className="col-md-4">
                 <div className="form-group relative">
                   <span  id="print-Joining-Version-Number"  className="print-control">
              
                 </span>
                   <span className="floating-label">
                    Version Number
                   </span>
                 </div>
               </div>
             </div>
         </div> */}
              <div className="form row">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <span className="error-validation" id="err-date" style={{ color: "red", display: "none" }}>This field is mandatory.
                    </span>
                    <span className="print-control print-joinreportndate" />
                    <span style={{ top: "2px" }} className="floating-label Date-field" >
                      Date <i className="required">*</i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="dept_join_report dept_join_report_pt">
                <p className="tohrdept">To: HR Department</p>
                <p className="print-unitsnamejoining">{officename}
                </p>
                <p style={{ display: "none" }} className="print-dynamicoficenamejoin">{Dynamiofficenamejoining}</p>
              </div>

              <div className="join_report_form print_report_jr">
                <p> I,  Mr./Mrs./Ms. </p> <span id="mainempnamejoin"> <span id="Namejoining" className="input_b_holder print-joiningreportname viewmodejoiningreport joiningreportviewmode common_fullname_disable joining_currentusername" />, </span>
                <p> holder of passport no. </p><span> <span id="PassportNojoining" className="input_b_wish print-joiningreportpassportno joiningreportviewmode" /> </span>
                <p> wish to inform you that I am joining on </p><span> <span style={{ padding: "40px" }} id="JoiningDate" className="input_b_design print-joiningreportdoj joiningreportviewmode" />, </span>
                <p> as  </p> <span> <span id="Designationjoining" className="input_b_dept print-joiningreportdesi joiningreportviewmode" />, </span>
                <span className="errorvalidation" id="err-designationjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                <p> in the </p> <span> <span id="Departmentjoining" className="input_b_at print-joiningreportdept joiningreportviewmode" /> </span>
                <span className="errorvalidation" id="err-departmentjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                <p> at </p> <span> <span id="Locationjoining" className="input_b_today print-joiningreportloc joiningreportviewmode" /> </span>
                <span className="errorvalidation" id="err-locationjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                <p> today. </p>
              </div>
              <div className="dept_join_report dept_join_report_pt">
                <p className="joining_report_parag">The address and information provided in my personal data form is correct and I take responsibility in communicating
                  with the HR department, if there are any changes in my communication address and contact details. I also take the
                  responsibility of my personal belongings and the office equipment issued to me (purse, handbags, mobile phones,
                  laptops etc.)</p>
              </div>
              <div className="Joint_report_sign_part_one">
                <p>Yours truly,</p>
                <div className="Joint_report_sign_part_two">
                  <div className="signature-new-wrap print-jr-sign">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Signature of Employeee</span>
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

                  <div className="signature-new-wrap print-jr-sign">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Signature of HR</span>
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
                  <div className="signature-new-wrap print-jr-sign">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Head of Department</span>
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

                  <div className="signature-new-wrap print-jr-sign">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Head of Human Resources</span>
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

              <div className="print_visatype">
                <h4 style={{ marginBottom: "8px" }}>Visa type <i className="required">*</i></h4>
                <div className="form row" style={{ paddingTop: "0px" }}>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                        className="form-check-input"
                        type="checkbox"
                        id="print-Sponsorshiptype"
                        name="Sponsorship"
                        value="Sponsorship"
                      />
                      <span className="form-check-label">Sponsorship</span> */}
                        <span id="print-Sponsorshiptype-visa"></span>
                      </div>
                    </div>

                  </div>
                  {/* <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="print-Employmenttype"
                        name="Employment"
                        value="Employment"
                      />
                      <span className="form-check-label">Employment</span>
                    </div>
                  </div>
                 
                </div> */}
                </div>
                <div className="form row">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span id="SponsorsNamejoining" className="print-control print-joiningreportsponname" />
                      <span className="floating-label ">Sponsor’s Name </span>
                    </div>
                    <span className="error-validation" id="err-Sponsorsnamejoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span id="EmployeeIDNumberjoining" className="print-control print-joiningreportempidno" />
                      <span className="floating-label ">Employee ID Number <i className="required">*</i></span>
                    </div>
                    <span className="error-validation" id="err-EmployeeIDjoining" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                  </div>
                </div>

                <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>
                <div className="personal_info_part" style={{ marginTop: "20px" }}>
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