import * as React from "react";
// import styles from "./SpecimenSignatureNewForm.module.scss";
import { IsignProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import * as moment from "moment";
import swal from "sweetalert";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";


export interface ISpecimenSignatureNewFormState {
  CurrentDate: any;
  // Undersigned: string;
  // FullName: string;
  // Designation: string;
  // DateofJoining: string;
  // NameofUnit: string;
  // EmployeeNo: string;
  // Nationality: string;
  // PassportNo: string;
  // Address: string;
  // MobileNo: string;
  // EmailAddress: string;
  // Date: string;
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  Dynamiclogo: any[];
  phonecode: any[];
  Signcountrynames: any[];
  ONBSessionID: string;
  SpecimenSubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  signFormControlNumber: any[];
  signFormVersionNumber: any[];
  HrCompleteStatus: boolean;
}

const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Hrform"
);
var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var officename = "";
var LogoUrl;
let signItemID;
let Mode;
let signmode;
var SignImgsrc = "";
var Signlistid;
var listitemid: number
var VersionNumber;
var ControlNumber;
const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class SpecimenSignatureNewForm extends React.Component<
  IsignProps,
  ISpecimenSignatureNewFormState,
  {}
> {
  constructor(props: IsignProps) {
    super(props);
    this.state = {
      CurrentDate: "",
      Signcountrynames: [],
      CurrentUserName: [],
      CurrentUserDesignation: [],
      Dynamiclogo: [],
      phonecode: [],
      ONBSessionID: "",
      SpecimenSubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      signFormControlNumber: [],
      signFormVersionNumber: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    $(".viewmode-allauto-pupulating-field").prop("disabled", true)
    const url: any = new URL(window.location.href);
    signItemID = url.searchParams.get("signItemID");
    Mode = url.searchParams.get("SignMode");
    signmode = url.searchParams.get("SignMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    this.GetCountryName();
    this.autofieldvalue();
    this.Getcountrycode();
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
    $(".signdate").val(moment().format("YYYY-MM-DD"));
    // $("#Date-item").val(moment().format("YYYY-MM-DD"));
    // $(".signdoj").val(moment().format("YYYY-MM-DD"));
    $(".sign-username").prop("disabled", true);
    $(".signdesc1").prop("disabled", true);
    $(".desc2").prop("disabled", true);
    $(".sign-unit_name").prop("disabled", true);
    $(".signempno").prop("disabled", true);
    $(".signpasspoartno").prop("disabled", true);
    $(".signnational").prop("disabled", true);
    $(".contactcode").prop("disabled", true);
    $(".signmobileno").prop("disabled", true);
    $(".signemailid").prop("disabled", true);


    this.RemoveValidationSpiceman();


    if (GlobalFormOpenedMode == "Edit") {

      $(".sign-username").prop("disabled", true);
      $(".signdesc1").prop("disabled", true);
      $(".desc2").prop("disabled", true);
      $(".sign-unit_name").prop("disabled", true);
      $(".signempno").prop("disabled", true);
      $(".signpasspoartno").prop("disabled", true);
      $(".signnational").prop("disabled", true);
      $(".contactcode").prop("disabled", true);
      $(".signmobileno").prop("disabled", true);
      $(".signemailid").prop("disabled", true);

      $(".signdate").prop("disabled", false);
      $(".signdoj").prop("disabled", true);
      //  $("#Date-item").prop("disabled", false);
      $(`.signitemimg`).show();
      $(`#signitemidbtn`).show();
      $(`.sign-submit`).hide();
      $(`.Dynmicndimg`).hide();
      $(".signediwithoutname").hide();
      $(".namevaluesign").prop("disabled", true);
      $(".signdesc1").prop("disabled", true);
      $(".desc2").prop("disabled", true);
      $("#dynamic-unitname").prop("disabled", true);
      $("#EmployeeNo").prop("disabled", true);
      $(".signnational").prop("disabled", true);
      $(".signpasspoartno").prop("disabled", true);
      $("#signcountry-codes").prop("disabled", true);

      $(".signmobileno").prop("disabled", true);

      $(".signemailid").prop("disabled", true);
      this.GetSpecimenSignatureViewItem(GlobalSessionIDValue);
    }

    else if (GlobalFormOpenedMode == "View") {
      $(".print-btn").show()
      this.GetSpecimenSignatureViewItem(GlobalSessionIDValue);
      this.GetSpecimenSignatureViewItemForPrint(GlobalSessionIDValue);
      $(".sign-username").prop("disabled", true);
      $(".signdesc1").prop("disabled", true);
      $(".desc2").prop("disabled", true);
      $(".sign-unit_name").prop("disabled", true);
      $(".signempno").prop("disabled", true);
      $(".signpasspoartno").prop("disabled", true);
      $(".signnational").prop("disabled", true);
      $(".contactcode").prop("disabled", true);
      $(".signmobileno").prop("disabled", true);
      $(".signemailid").prop("disabled", true);
      $(`.signitemimg`).show();
      $(`#signitemidbtn`).hide();
      $(`.sign-submit`).hide();
      $(`.Dynmicndimg`).hide();
      $(".signediwithoutname").hide();
      $(".viewclasscommom").prop("disabled", true);
      $("#Nationality").prop("disabled", true);
      $("input").attr("disabled", "disabled");
    }
    this.GetCurrentUserDetails();

  }

  public GetSpecimenSignatureViewItemForPrint(ID) {

    $(".print-btnss").show();
    newweb.lists
      .getByTitle("Specimen Signature Transaction")
      .items.select(
        "ID",
        "FullName",
        "Designation",
        "DateofJoining",
        "NameofUnit",
        "EmployeeNo",
        "Nationality",
        "PassportNo",
        "Address",
        "CountryCode",
        "MobileNo",
        "EmailAddress",
        "Date",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "ControlNumber",
        "VersionNumber"

      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#print-SignNameofunitdynamic").hide()
          $("#print-Sign-unitnamewithoutdynamic").show()
          $(".print-signediwithoutname").hide();
          $(".print-signediname").show();
          $("#print-usersignupdate").hide();

          $("#print-sign-Version-Number").text(result[0].VersionNumber);
          $("#print-sign-Control-Number").text(result[0].ControlNumber);
          setTimeout(() => {
            $(`.print-signmobileno`).text(result[0].MobileNo);
            $("#print-signcountry-codes").text(result[0].CountryCode);
          }, 3000);

          $(".print-signdesc1").text(result[0].Designation);
          $("#print-arabicword").hide();
          $("#print-Dynamicnamearbic").show();
          $("#print-Dynamicnamearbic").text(result[0].FullName);
          $(".print-namevaluesign").text(result[0].FullName);
          // $print-(".signtitle").attr("style", "color:#00A36C");
          $(".print-signimg").show();
          $(".print-sign-submit").hide();
          $(".print-signdesc1").text(result[0].Designation);
          // $(".print-signdoj").text(moment(result[0].DateofJoining).format("DD-MM-YYYY"));
          $("#print-dynamic-unitname").text(result[0].NameofUnit);
          $(".print-signempno").text(result[0].EmployeeNo);
          $(".print-signnational").text(result[0].Nationality);
          $(".print-signpasspoartno").text(result[0].PassportNo);
          $(".print-signaddress").text(result[0].Address);
          // $print-(".signmobileno").val(result.MobileNo);
          $(".print-signemailid").text(result[0].EmailAddress);
          $(".print-signdate").text(" ");
          $("#print-Designationitem").text(result[0].Designation);
          SignImgsrc = result[0].UnitLogo;

        }
      });
  }

  public GetSpecimenSignatureViewItem(ID) {


    newweb.lists
      .getByTitle("Specimen Signature Transaction")
      .items.select(
        "ID",
        "FullName",
        "Designation",
        "DateofJoining",
        "NameofUnit",
        "EmployeeNo",
        "Nationality",
        "PassportNo",
        "Address",
        "CountryCode",
        "MobileNo",
        "EmailAddress",
        "Date",
        "Status",
        "ONBSessionID",
        "UnitLogo",
        "VersionNumber",
        "ControlNumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".sign_tickimg").show();
          listitemid = result[0].ID
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber
          $("#SignNameofunitdynamic").hide()
          $("#Sign-unitnamewithoutdynamic").show()
          $(".signediwithoutname").hide();
          $(".signediname").show();
          $("#usersignupdate").hide();


          setTimeout(() => {
            $(`.signmobileno`).val(result[0].MobileNo);
            $("#signcountry-codes").val(result[0].CountryCode);//.change();
          }, 3000);

          $(".desc2").val(result[0].Designation);
          $("#arabicword").hide();
          $("#Dynamicnamearbic").show();
          $("#Dynamicnamearbic").val(result[0].FullName);
          $(".namevaluesign").val(result[0].FullName);
          // $(".signtitle").attr("style", "color:#00A36C");
          $(".signimg").show();
          $(".sign-submit").hide();
          $(".signdesc1").val(result[0].Designation);
          $(".signdoj").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
          $("#dynamic-unitname").val(result[0].NameofUnit);
          $(".signempno").val(result[0].EmployeeNo);
          $(".signnational").val(result[0].Nationality);
          $(".signpasspoartno").val(result[0].PassportNo);
          $(".signaddress").val(result[0].Address);
          // $(".signmobileno").val(result[0].MobileNo);
          $(".signemailid").val(result[0].EmailAddress);
          $(".signdate").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $("#Designationitem").val(result[0].Designation);
          SignImgsrc = result[0].UnitLogo;
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'LETTER OF AUTHORIZATION' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'SPECIMEN SIGNATURE FORM'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "SPECIMEN SIGNATURE FORM") {
          this.setState({
            SpecimenSubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.Getusersingaturelistitem(ONBSessionID, FormMode);
          }
        }
      }
    });
  }

  public UpdateListItemsign() {
    if (

      this.validation2() &&
      this.validation3() &&
      this.validationCountrynational() &&
      this.Passportnosign() &&
      this.validation7() &&
      this.validation8() &&
      this.validationmobileno() &&
      this.numberonly() &&
      this.validation9() &&
      this.validation_email()
    ) {
      var CurrentDate = $("#txt-current-date").val();
      var Undersigned = $("#Undersigned").val();
      var FullName = $(".namevaluesign").val();
      var Desg = $(".signdesc1").val();
      var DateofJoining = $("#DateofJoining").val();
      var NameofUnit = $("#NameofUnit").val();
      var EmployeeNo = $("#EmployeeNo").val();
      var Nationality = $("#Nationality").val();
      var PassportNo = $(".signpasspoartno").val();
      var Address = $(".signaddress").val();

      var MobileNo = $("#MobileNo").val();
      var contactcodes = $(`#signcountry-codes`).val();//.find(":selected").text();
      var finalcontactno = contactcodes + "-" + MobileNo;
      var EmailAddress = $("#EmailAddress").val();
      var Date = $("#Date").val();
      //var cust = $(".custom-table").html();

      newweb.lists
        .getByTitle("Specimen Signature Transaction")
        .items.getById(listitemid)
        .update({
          Title: "SPECIMEN SIGNATURE FORM",
          FullName: FullName,
          Designation: Desg,
          DateofJoining: moment(DateofJoining),
          NameofUnit: NameofUnit,
          EmployeeNo: EmployeeNo,
          Nationality: Nationality,
          PassportNo: PassportNo,
          Address: Address,
          MobileNo: $("#MobileNo").val(),
          EmailAddress: EmailAddress,
          Date: moment(Date),
          CountryCode: $(`#signcountry-codes`).val(),
          Status: "Updated by Unit HR",
        })
        .then((results: any) => {
          this.UpdateOtherForms(GlobalSessionIDValue)
          // this.AddTableToList(results.data.ID);
          if (this.state.HrCompleteStatus == true) {
            subweb.lists
              .getByTitle("Specimen Signature HR Update History").items
              .add({
                Title: "SPECIMEN SIGNATURE FORM",
                FullName: FullName,
                Designation: Desg,
                DateofJoining: moment(DateofJoining),
                NameofUnit: NameofUnit,
                EmployeeNo: EmployeeNo,
                Nationality: Nationality,
                PassportNo: PassportNo,
                Address: Address,
                MobileNo: $("#MobileNo").val(),
                EmailAddress: EmailAddress,
                Date: moment(Date),
                CountryCode: $(`#signcountry-codes`).val(),
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

  public UpdateOtherForms(ONBSessionID) {

    newweb.lists.getByTitle("Emp NDA Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${ONBSessionID}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Emp NDA Transaction").items.getById(result[0].ID)
          .update({
            Address: $(".signaddress").val()
          })
      })

  }
  public landingpage() {

    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;

  }

  public GetCurrentUserDetails() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        // var email = resultData.d.Email;
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;
        // $(".sign-username").val(Name)
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcename = properties[i].Value;
            $(".sign-unit_name").val(ofcename)
            setTimeout(() => {
              reacthandler.LogoUnitDynamic(ofcename);
              reacthandler.GetContolandVersionNumber(ofcename)
              reacthandler.GetControlNumberAccordingtoformname(ofcename)
            }, 500);
            break;
          }
        }
        // $("#arbicname").val(resultData.d.DisplayName);

        // $("#arabicword").val(resultData.d.DisplayName);
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
        .filter(`Title eq 'SPECIMEN SIGNATURE FORM'`).get()
        .then((results) => {

          this.setState({
            signFormControlNumber: results[0][fieldname1.InternalName],
            signFormVersionNumber: results[0][fieldname2.InternalName]
          })

        });

    }
  }
  public async Getcountrycode() {
    var reactHandler = this;

    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryCode")
      .top(5000)
      .get()
      .then((items) => {
        for (var i = 0; i < items.length; i++) { }
        reactHandler.setState({
          phonecode: items,
        });
      });
  }
  public autofieldvalue() {
    $(".signdesc1").keyup(function () {
      var value = $(this).val();
      $("#Designationitem").val(value);
    });
    $("#Designationitem").keyup(function () {
      var value = $(this).val();
      $(".signdesc1").val(value);
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
          //(results);
          var img = results[0].UnitLogo;
          LogoUrl = JSON.parse(img).serverRelativeUrl;
          this.setState({
            Dynamiclogo: results,
          });
        });
    }
  }

  public validation() {
    var status = true;
    if ((status == true && $(".signdoj").val() != "")) {
      $(".err-signdoj").hide();
    } else {
      $(".err-signdoj").show();
      status = false;
    }
    return status;
  }
  public validation2() {
    var status = true;
    if ((status == true && $(".signdesc1").val() != "")) {
      $(".err-desc1").hide();
    } else {
      $(".err-desc1").show();
      status = false;
    }
    return status;
  }

  public validation3() {
    var status = true;
    if ((status == true && $("#NameofUnit").val() != "")) {
      $("#err-nameofunit").hide();
    } else {
      $("#err-nameofunit").show();
      status = false;
    }
    return status;
  }

  public validation4() {
    var status = true;
    if ((status == true && $("#EmployeeNo").val() != "")) {
      $("#err-employeeno").hide();
    } else {
      $("#err-employeeno").show();
      status = false;
    }
    return status;
  }

  public validationCountrynational() {
    var status = true;
    if ((status == true && $(".signnational").find(":selected").text() == "Select")) {
      $("#signerrnational").show();
      status = false;
    } else {
      $("#signerrnational").hide();
    }
    return status;
  }

  public Passportnosign() {
    var status = true;
    if ((status == true && $(".signpasspoartno").val() != "")) {
      $("#err-passportnoSign").hide();

    } else {
      $("#err-passportnoSign").show();
      status = false;

    }
    return status;
  }

  public validation7() {
    var status = true;
    if ((status == true && $(".signaddress").val() != "")) {
      $("#err-signaddresssignature").hide();
    } else {
      $("#err-signaddresssignature").show();
      $(".signaddress").focus();
      status = false;
    }
    return status;
  }

  public validation8() {
    var status = true;
    if ((status == true && $(".signemailid").val() != "")) {
      $(".err-emaisign").hide();
    } else {
      $(".err-emaisign").show();
      status = false;
    }
    return status;
  }
  public validation9() {
    var status = true;
    //if ((status == true && $("#signcountry-codes").find(":selected").text() == "Select")) {
    if ((status == true && $("#signcountry-codes").val() == "")) {
      $("#err-countrycodes").show();
      status = false;
    } else {
      $("#err-countrycodes").hide();

    }
    return status;
  }

  public validationmobileno() {
    var status = true;


    if ((status == true && $(".signmobileno").val() != "")) {
      $(".err-mobilenosign").hide();
    }
    else {
      $(".err-mobilenosign").show();
      status = false;
    }
    return status;

  }

  public numberonly() {
    var status = true
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".signmobileno") as any).val());

    if (status == true && phone.match(numbers)) {
      $(".err-formatphonenumber").hide();
    } else {
      $(".err-formatphonenumber").show();
      status = false;
    }
    return status;
  }


  public validation_email() {
    var email_status = true;
    var email = $(".signemailid ").val();
    var emailregex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email_status == true && email != "") {
      if (emailregex.test(email.toString())) {
        $("#email-formatsign").hide();
        email_status = true;
      } else {
        $("#email-formatsign").show();
        email_status = false;
      }
    }

    return email_status;
  }

  // public contactcodethreevalid() {
  //   var status = true;
  //   if (
  //     status == true &&
  //     $("#signcountry-codes").find(":selected").text() == "Select") {
  //     $("#err-countrycodes").show();
  //     status = false;
  //   } else {
  //     $("#err-countrycodes").hide();
  //   }
  //   return status;
  // }

  public SaveListItem() {

    if (

      // this.validation2() &&
      // this.validation3() &&
      // this.validation4() &&
      // this.validationCountrynational() &&
      // this.Passportnosign() &&
      this.validation7()
      // this.validation8() &&
      // this.validationmobileno() &&
      // this.numberonly() &&
      // this.validation9() &&
      // this.validation_email()

    ) {

      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          newweb.lists.getByTitle("Specimen Signature Transaction").items.add({
            Title: "Specimen Signature Form",
            FullName: $(".sign-username").val(),
            Designation: $(".signdesc1").val(),
            DateofJoining: moment($(".signdoj").val(), "YYYY-MM-DD").format("M/D/YYYY"),
            NameofUnit: $(".sign-unit_name").val(),
            EmployeeNo: $(".signempno").val(),
            Nationality: $(".signnational").val(),
            PassportNo: $(".signpasspoartno").val(),
            Address: $(".signaddress").val(),
            CountryCode: $(`#signcountry-codes`).val(),
            MobileNo: $(`#MobileNo`).val(),
            EmailAddress: $(".signemailid").val(),
            Date: moment($(".signdate").val(), "YYYY-MM-DD").format("M/D/YYYY"),
            BusinessUnit: officename,
            Status: "Created by Employee",
            ONBSessionID: this.state.ONBSessionID,
            UnitLogo: LogoUrl,
            VersionNumber: this.state.signFormVersionNumber,
            ControlNumber: this.state.ControlNumber + "/" + this.state.signFormControlNumber,
          })
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'SPECIMEN SIGNATURE FORM'").orderBy("Created", false).get().then((response) => {
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

  public RemoveValidationSpiceman() {
    $(".namevaluesign").keyup(function () {

      $("#err-fullname").hide();

    });
    $(".signdesc1").keyup(function () {

      $("#err-designation").hide();

    });
    $(".signdoj").keyup(function () {

      $("#err-dateofjoining").hide();

    });
    $(".signnmaeofunit").keyup(function () {

      $("#err-nameofunit").hide();

    });
    $(".signempno").keyup(function () {

      $("#err-employeeno").hide();

    });
    $(".signnational").keyup(function () {

      $("#signerrnational").hide();

    });
    $(".signpasspoartno").keyup(function () {

      $("#err-passportnoSign").hide();

    });
    $(".signaddress").keyup(function () {

      $("#err-signaddresssignature").hide();

    });
    $(".signemailid").keyup(function () {

      $("#err-emailaddresssign").hide();

    });
    $("#signcountry-codes").keyup(function () {

      $("#err-countrycodes").hide();

    });
    $(".signmobileno").keyup(function () {

      $("#err-mobileno").hide();
      $(".err-formatphonenumber").hide();

    });
    // $(".signdate").keyup(function () {

    //   $("#err-date-item").hide();

    // });
    $(".namevaluesign").keyup(function () {

      $("#err-fullname").hide();

    });
    $(".desc2").keyup(function () {

      $("#err-designation2").hide();

    });
    $(".date2").keyup(function () {
      $("#err-date").hide();

    });

    $(".signemailid").keyup(function () {
      $("#err-emailaddresssign").hide();

    });


    $("#signcountry-codes").on("change", function () {
      $("#err-countrycodes").hide();
    });


    $(".signnational").on("change", function () {
      $("#signerrnational").hide();
    });
  }
  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }

  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Employee Joining Report Transaction").items.select("DateofJoining", "Name", "Designation", "BusinessUnit", "EmployeeIDNumber", "Passport_x0020_No", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $(".sign-username").val(result[0].Name);
          $(".signdesc1").val(result[0].Designation);
          $(".desc2").val(result[0].Designation);
          $(".signempno").val(result[0].EmployeeIDNumber);
          $(".signpasspoartno").val(result[0].Passport_x0020_No);
          $(".signdoj").val(result[0].DateofJoining).val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));

        }
      })

    await newweb.lists.getByTitle("Personal Information Master").items.select("Countrycodefirstsection", "CurrentNationality", "ContactNumber", "EmailID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $(".signnational").val(result[0].CurrentNationality);
          $("#signcountry-codes").val(result[0].Countrycodefirstsection);
          $(".signmobileno").val(result[0].ContactNumber);
          $(".signemailid").val(result[0].EmailID);

        }
      })
  }

  public async Getusersingaturelistitem(ONBSessionID, FormMode) {
    // if (Mode == null) {
    await newweb.lists
      .getByTitle("Specimen Signature Transaction")
      .items.select(
        "ID",
        "FullName",
        "Designation",
        "DateofJoining",
        "NameofUnit",
        "EmployeeNo",
        "Nationality",
        "PassportNo",
        "Address",
        "CountryCode",
        "MobileNo",
        "EmailAddress",
        "Date",
        "Status",
        "ONBSessionID",
        "Author/Title"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".sign_tickimg").show();
          $(".spicemansignatureviewmodecommon").prop('disabled', true)
          $(".viewclasscommom").prop("disabled", true);
          Signlistid = result[0].ID;
          // $(".signtitle").attr("style", "color:#00A36C");
          $(".signimg").show();
          $(".sign-submit").hide();
          $("#usersignupdate").hide();
          $(".signaturedropdowncommon").prop("disabled", true);

          $(".signaturevieweditpart").prop('disabled', true);


          setTimeout(() => {
            $("#Full-Name").val(result[0].FullName);
            $("#Name-item").val(result[0].FullName);
            $(`.signmobileno`).val(result[0].MobileNo);
            $("#signcountry-codes").val(result[0].CountryCode);
          }, 2000);

          // $(".signmobileno").val(result[0].MobileNo);

          $(".signdesc1").val(result[0].Designation);
          $("#Designationitem").val(result[0].Designation);
          $(".signdoj").val(
            moment(result[0].DateofJoining).format("YYYY-MM-DD")
          );
          $(".signnmaeofunit").val(result[0].NameofUnit);
          $(".signempno").val(result[0].EmployeeNo);
          $(".signnational").val(result[0].Nationality);
          $(".signpasspoartno").val(result[0].PassportNo);
          $(".signaddress").val(result[0].Address);
          $(".ndaaddress").val(result[0].Address);

          $(".signemailid").val(result[0].EmailAddress);
          $(".signdate").val(moment(result[0].Date).format("YYYY-MM-DD"));
        }
      });
    // }
  }

  // public updaatecusersignatureitem() {
  //   // if (this.Validation()) {
  //   var CurrentDate = $("#txt-current-date").val();
  //   var Undersigned = $("#Undersigned").val();
  //   var FullName = $(".namevaluesign").val();
  //   var Desg = $(".signdesc1").val();
  //   var DateofJoining = $("#DateofJoining").val();
  //   var NameofUnit = $("#NameofUnit").val();
  //   var EmployeeNo = $("#EmployeeNo").val();
  //   var Nationality = $("#Nationality").val();
  //   var PassportNo = $(".signpasspoartno").val();
  //   var Address = $(".signaddress").val();

  //   var MobileNo = $("#MobileNo").val();
  //   var EmailAddress = $("#EmailAddress").val();
  //   var Date = $("#Date").val();
  //   //var cust = $(".custom-table").html();

  //   newweb.lists
  //     .getByTitle("Specimen Signature Transaction")
  //     .items.getById(Signlistid)
  //     .update({
  //       Title: "SPECIMEN SIGNATURE FORM",
  //       FullName: FullName,
  //       Designation: Desg,
  //       DateofJoining: moment(DateofJoining),
  //       NameofUnit: NameofUnit,
  //       EmployeeNo: EmployeeNo,
  //       Nationality: Nationality,
  //       PassportNo: PassportNo,
  //       Address: Address,
  //       MobileNo: MobileNo,
  //       EmailAddress: EmailAddress,
  //       Date: moment(Date),
  //       Status: "Created by Employee",
  //     })
  //     .then((results: any) => {
  //       swal({
  //         title: "The Form has been updated successfully",

  //         icon: "success",
  //       }).then(() => { });
  //     });
  //   // }
  // }

  public async GetCountryName() {
    var reactHandler = this;

    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryName")
      .top(5000)
      .get()
      .then((items) => {
        for (var i = 0; i < items.length; i++) {
          //   AvailableCountries.push(items[i].CountryName)
        }
        reactHandler.setState({
          Signcountrynames: items,
        });
      });
  }


  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-ss').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;


  }

  public render(): React.ReactElement<IsignProps> {
    const Allcountryname: JSX.Element[] = this.state.Signcountrynames.map(function (
      item,
      key
    ) {
      ////(item);

      return <option value={item.CountryName}>{item.CountryName}</option>;
    });
    var handler = this;
    const Countrycodesitem: JSX.Element[] = this.state.phonecode.map(function (
      item,
      key
    ) {
      // //(item);
      return <option value={item.CountryCode}>{item.CountryCode}</option>;
    });
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
            <span>Specimen signature form</span>

          </div>
          <div className="dashboard_right_ffamily">
            <div className="personal_info_part">
              <div className="specimen_sign_form_top">
                <div className="dashboard_right_text">
                  <p>
                    {" "}
                    I, the undersigned{" "}
                    <input
                      type="text"

                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: " 1px solid rgb(128 128 128/30%)",
                      }}
                      id="arabicword"
                      className="arbic-inputfield sign-username spicemansignatureviewmodecommon viewmode-allauto-pupulating-field"
                      autoComplete="off"
                      disabled />
                    <input
                      type="text"
                      style={{
                        display: "none",
                        textAlign: "center",
                        border: "none",
                        borderBottom: " 1px solid rgb(128 128 128/30%)",
                      }}
                      id="Dynamicnamearbic"
                      className="arbic-inputfield spicemansignatureviewmodecommon viewmode-allauto-pupulating-field"
                      disabled autoComplete="off"
                    />
                    do affirm, warrant, certify and declare that the signature and
                    short form initial specimen below is my true, correct and
                    accurate signature and initial, and confirm that the signature
                    represents and can be used for personal identification purpose.
                  </p>
                </div>

                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="signediwithoutname  form-group relative">
                      <input
                        type="text"
                        id="Full-Name"
                        name="FullName"
                        className="form-control viewmode-allauto-pupulating-field sign-username signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">Full Name</span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="signediname form-group relative"
                    >
                      <input
                        type="text"
                        id="Full-Name"
                        name="FullName"
                        className="form-control viewmode-allauto-pupulating-field namevaluesign signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">Full Name</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-fullname"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Designation"
                        name="Designation"
                        className="form-control viewmode-allauto-pupulating-field signdesc1 signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label signdescn">Designation <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-desc1"
                      id="err-designation"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="DateofJoining"
                        name="DateofJoining"
                        className="form-control  viewmode-allauto-pupulating-field signdoj signaturevieweditpart spicemansignatureviewmodecommon"
                        disabled
                      />
                      <span className="floating-label "> Date of Joining </span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation  err-signdoj"
                      id="err-dateofjoining"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div id="SignNameofunitdynamic" className="form-group relative">
                      <input
                        type="text"
                        id="NameofUnit"
                        name="NameofUnit"
                        className="form-control  viewmode-allauto-pupulating-field sign-unit_name signnmaeofunit signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label ">Name of Unit/Facility <i className="required">*</i></span>

                    </div>

                    <div style={{ display: "none" }} id="Sign-unitnamewithoutdynamic" className="form-group relative">
                      <input
                        type="text"
                        id="dynamic-unitname"
                        name="NameofUnit"
                        className="form-control viewmode-allauto-pupulating-field  signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label ">Name of Unit/Facility <i className="required">*</i></span>

                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofunit"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="EmployeeNo"
                        name="EmployeeNo"
                        className="form-control  viewmode-allauto-pupulating-field signempno signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label ">Employee ID </span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeeno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">



                      <input
                        id="Nationality"
                        disabled className="form-control viewmode-allauto-pupulating-field signnational signaturevieweditpart spicemansignatureviewmodecommon"
                      />
                      {/* <option value="Select">Select</option>
                    {Allcountryname}
                  </select> */}
                      <span className="floating-label ">Nationality <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="signerrnational"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PassportNo"
                        name="PassportNo"
                        className="form-control viewmode-allauto-pupulating-field signpasspoartno signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled />
                      <span className="floating-label ">Passport No <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-passportnoSign"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input disabled
                        id="signcountry-codes"
                        className="form-control viewclasscommom contactcode viewmode-allauto-pupulating-field"
                      />
                      {/* <option value="Select">Select</option>
                    {Countrycodesitem}
                  </select> */}
                      <span className="floating-label ">Country Code <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycodes"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="MobileNo"
                        name="MobileNo"
                        className="form-control v signmobileno signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled />
                      <span className="floating-label ">Mobile Phone <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-mobilenosign"
                      id="err-mobileno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation err-formatphonenumber"

                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>




                </div>
                <div className="row form">

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="EmailAddress"
                        name="EmailAddress"
                        className="form-control viewmode-allauto-pupulating-field signemailid signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled />
                      <span className="floating-label ">Email Address <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-emaisign"
                      id="err-emailaddresssign"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <p id="email-formatsign" style={{ color: "red", display: "none" }}>
                      Email should be in correct format
                    </p>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="Date"
                        name="Date"
                        className="form-control signdate signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label ">Date</span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-date-item"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                </div>
                <div className="row form">

                  <div className="col-md-12">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Address"
                        name="Address"
                        className="form-control  signaddress signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Address <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-signaddresssignature"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div className="specimen_part clearfix">
                  <div className="specimen_left">
                    <div> Specimen Signature </div>

                    <div className="specimen_passport_sign">
                      {" "}
                      Specimen signature should be the same as Passport signature{" "}
                    </div>
                  </div>

                  <div className="specimen_right">
                    <div> Specimen Initial </div>

                    <div className="specimen_passport_sign">
                      {" "}
                      Specimen initial may not be the same as Passport signature{" "}
                    </div>
                  </div>
                </div>

                <div className="term_condition">
                  <p>
                    {" "}
                    Further, I undertake to notify the HR department in writing of
                    any modification to my foregoing specimen signature or initial.{" "}
                  </p>
                </div>

                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className=" signediwithoutname form-group relative">
                      <input
                        type="text"
                        id="Name-item"
                        name="FullName"

                        className="form-control viewmode-allauto-pupulating-field sign-username signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Name <i className="required">*</i></span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="signediname form-group relative"
                    >
                      <input
                        type="text"
                        id="Full-Name"
                        name="FullName"
                        className="form-control viewmode-allauto-pupulating-field namevaluesign signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label">Name <i className="required">*</i></span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-fullname"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Designationitem"
                        name="Designation"
                        className="form-control viewmode-allauto-pupulating-field  desc2 signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Designation <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-designation2"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>
                  <div className="col-md-4 signature_part">
                    <p> Signature </p>
                  </div>

                </div>
                <div className="row form ">




                  <div className="col-md-4 signature_part">
                    {/* <div className="form-group relative">
                  <input
                    type="date"
                    id="Date-item"
                    name="Date"
                    className="form-control date2 signaturevieweditpart spicemansignatureviewmodecommon"
                    autoComplete="off"
                    disabled
                  />
                  <span className="floating-label ">Date</span>
                </div>
                <span
                  className="error-validation"
                  id="err-date"
                  style={{ color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span> */}
                    <p>Date</p>
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
                <div className="submit-btn-wrap">


                  {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                    <button
                      className="dashboard_submit_btn sign-submit"
                      type="submit"
                      onClick={() => this.SaveListItem()}
                    >
                      Submit
                    </button>
                    :
                    <button style={{ cursor: "no-drop" }}
                      className="dashboard_submit_btn sign-submit"
                      type="submit"
                    >
                      Submit
                    </button>
                  }


                  <button
                    id="signitemidbtn"
                    style={{ display: "none" }}
                    className="dashboard_submit_btn "
                    type="submit"
                    onClick={() => this.UpdateListItemsign()}
                  >
                    Update
                  </button>

                  <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnss" type="submit" onClick={() => this.Printthis()}>Print</button>
                  {GlobalFormOpenedMode == "New" &&
                    <button id="btn-sign-newpage" className="dashboard_submit_btn btn-cancel" type="reset">
                      <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB//SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                        Cancel
                      </a>
                    </button>
                  }

                  {GlobalFormOpenedMode == "Edit" &&
                    <button id="btn-hr-sign" className="dashboard_submit_btn btn-cancel" type="reset">
                      <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB//SitePages/Dashboard.aspx?env=WebView`">
                        Cancel
                      </a>
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="dashboard_right-print-ss" style={{ display: "none" }}>
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
              <span>Specimen signature form</span>
              <ul>
                <li>Control Number: <b id="print-sign-Control-Number"></b></li>
                <li>Version: <b id="print-sign-Version-Number"></b></li>
              </ul>

            </div>
          </div>
          <div className="dashboard_right_ffamily print-top-line">
            <div className="personal_info_part print-bb" >
              {/* style={{ borderBottom: "none" }}> */}
              <div className="specimen_sign_form_top">
                <div className="dashboard_right_text">
                  <p className="print_report_jr print-topborder">
                    {" "}
                    I, the undersigned{" "}
                    <span
                      style={{
                        fontWeight: "bold"
                      }}
                      id="print-arabicword"
                      className="arbic-inputfield sign-username spicemansignatureviewmodecommon"
                    />
                    <span
                      style={{
                        display: "none",
                        fontWeight: "bold"
                      }}
                      id="print-Dynamicnamearbic"
                      className="arbic-inputfield spicemansignatureviewmodecommon"
                    />{" "}
                    do affirm, warrant, certify and declare that the signature and
                    short form initial specimen below is my true, correct and
                    accurate signature and initial, and confirm that the signature
                    represents and can be used for personal identification purpose.
                  </p>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="print-signediwithoutname  form-group relative">
                      <input
                        type="text"
                        id="Full-Name"
                        name="FullName"

                        className="form-control sign-username signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label">Full Name</span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="print-signediname form-group relative"
                    >
                      <span
                        //  type="text"
                        id="Full-Name"
                        //   name="FullName"
                        className="print-control print-namevaluesign signaturevieweditpart spicemansignatureviewmodecommon"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">Full Name</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-fullname"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="Designation"
                        //  name="Designation"
                        className="print-control print-signdesc1 signaturevieweditpart spicemansignatureviewmodecommon"
                      //  autoComplete="off"
                      />
                      <span className="floating-label signdescn">Designation <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-desc1"
                      id="err-designation"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //    type="date"
                        id="DateofJoining"
                        //    name="DateofJoining"
                        className="print-control print-signdoj signaturevieweditpart spicemansignatureviewmodecommon"
                      //   disabled
                      />
                      <span className="floating-label "> Date of Joining </span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation  err-signdoj"
                      id="err-dateofjoining"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div id="print-SignNameofunitdynamic" className="form-group relative">
                      <input
                        type="text"
                        id="NameofUnit"
                        name="NameofUnit"
                        className="form-control sign-unit_name signnmaeofunit signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"

                      />
                      <span className="floating-label ">Name of Unit/Facility <i className="required">*</i></span>

                    </div>

                    <div style={{ display: "none" }} id="print-Sign-unitnamewithoutdynamic" className="form-group relative">
                      <span
                        //  type="text"
                        id="print-dynamic-unitname"
                        //     name="NameofUnit"
                        className="print-control  signaturevieweditpart spicemansignatureviewmodecommon"
                      //   autoComplete="off"

                      />
                      <span className="floating-label ">Name of Unit/Facility <i className="required">*</i></span>

                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofunit"
                      style={{ color: "red", display: "none" }}
                    >
                      {" "}
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="EmployeeNo"
                        //name="EmployeeNo"
                        className="print-control print-signempno signaturevieweditpart spicemansignatureviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Employee ID </span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeeno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
          type="text"
          id="Nationality"
          name="Nationality"
          className="form-control signnational signaturevieweditpart spicemansignatureviewmodecommon"
          autoComplete="off"
        /> */}

                      <span
                        id="Nationality"
                        className="print-control print-signnational signaturevieweditpart spicemansignatureviewmodecommon"
                      >
                        {/* <option value="Select">Select</option>
            {Allcountryname} */}
                      </span>
                      <span className="floating-label ">Nationality <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="signerrnational"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="PassportNo"
                        // name="PassportNo"
                        className="print-control print-signpasspoartno signaturevieweditpart spicemansignatureviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Passport No <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-passportnoSign"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-signcountry-codes"
                        className="print-control viewclasscommom contactcode"
                      >
                        {/* <option value="Select">Select</option>
            {Countrycodesitem} */}
                      </span>
                      <span className="floating-label ">Contact Code <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycodes"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //    type="text"
                        id="MobileNo"
                        //   name="MobileNo"
                        className="print-control print-signmobileno signaturevieweditpart spicemansignatureviewmodecommon"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Mobile Phone <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-mobilenosign"
                      id="err-mobileno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation err-formatphonenumber"

                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>




                </div>
                <div className="row form">

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="EmailAddress"
                        // name="EmailAddress"
                        className="print-control print-signemailid signaturevieweditpart spicemansignatureviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Email Address <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation err-emaisign"
                      id="err-emailaddresssign"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <p id="email-formatsign" style={{ color: "red", display: "none" }}>
                      Email should be in correct format
                    </p>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="date"
                        id="Date"
                        // name="Date"
                        className="print-control print-signdate signaturevieweditpart spicemansignatureviewmodecommon"
                      //  autoComplete="off"
                      //  disabled
                      />
                      <span className="floating-label ">Date</span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-date-item"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                </div>
                <div className="row form">

                  <div className="col-md-12">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Address"
                        //  name="Address"
                        className="print-control print-signaddress signaturevieweditpart spicemansignatureviewmodecommon"
                      //  autoComplete="off"
                      />
                      <span className="floating-label ">Address <i className="required">*</i></span>
                      {/* <p className="floatinglabel">اإلسم الكامل</p> */}
                    </div>
                    <span
                      className="error-validation"
                      id="err-signaddresssignature"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>




                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label"> Specimen Signature </span>
                        </div>
                      </div>
                    </div>
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label"> Specimen Initial  </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="specimen_part clearfix">
                  <div className="specimen_left">
                    {/* <div> Specimen Signature </div> */}

                    <div className="specimen_passport_sign">
                      {" "}
                      Specimen signature should be the same as Passport signature{" "}
                    </div>
                  </div>

                  <div className="specimen_right">
                    {/* <div> Specimen Initial </div> */}

                    <div className="specimen_passport_sign">
                      {" "}
                      Specimen initial may not be the same as Passport <span><br />signature</span>
                    </div>
                  </div>
                </div>

                <div className="term_condition">
                  <p>
                    {" "}
                    Further, I undertake to notify the HR department in writing of
                    any modification to my foregoing specimen signature or initial.{" "}
                  </p>
                </div>

                <div className="row form print-sign-row">
                  <div className="col-md-4">
                    <div className="print-signediwithoutname form-group relative">
                      <input
                        type="text"
                        id="Name-item"
                        name="FullName"

                        className="form-control sign-username signaturevieweditpart spicemansignatureviewmodecommon"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Name <i className="required">*</i></span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="print-signediname form-group relative"
                    >
                      <span
                        // type="text"
                        id="Full-Name"
                        // name="FullName"
                        className="print-control print-namevaluesign signaturevieweditpart spicemansignatureviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label">Name <i className="required">*</i></span>
                    </div>

                    {/* <span
                    className="error-validation"
                    id="err-fullname"
                    style={{ color: "red", display: "none" }}
                  >
                    {" "}
                    This field is mandatory.{" "}
                  </span> */}
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="print-Designationitem"
                        //  name="Designation"
                        className="print-control  print-desc2 signaturevieweditpart spicemansignatureviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Designation <i className="required">*</i></span>
                    </div>
                    {/* <span
                    className="error-validation"
                    id="err-designation2"
                    style={{ color: "red", display: "none" }}
                  >
                    {" "}
                    This field is mandatory.{" "}
                  </span> */}
                  </div>

                </div>
                {/* <div className="row form ">
                <div className="col-md-6 signature_part">

                  <p>Date</p>
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
              </div>
              <div className="pageborder"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
