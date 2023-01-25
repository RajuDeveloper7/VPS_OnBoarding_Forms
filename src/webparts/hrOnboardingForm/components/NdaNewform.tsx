import * as React from "react";
// import styles from "./EmployeeNdaNewForm.module.scss";
import { IndaformProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as moment from "moment";
import swal from "sweetalert";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";


export interface IEmployeeNdaNewFormState {
  Date: any;
  Name: string;
  National: string;
  PassportNo: string;
  IdentificationNo: string;
  Address: string;
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  Agreement: any[];
  rawHtmlNDA: any;
  NdaMasterList: any[];
  Dynamiclogo: any[];
  DynamicAddress: any[];
  Titlesurnamenda: any[];
  Titlesurname1: any[];
  Titlesurname2: any[];
  Ndacountryname: any[];
  ONBSessionID: string;
  NDASubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  VersionNumber: any[];
  ControlNumber: any[];
  NdaFormControlNumber: any[];
  NdaFromVersionNumber: any[];
  HrCompleteStatus: boolean;
}
var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var officename;
var LogoUrl;
let NDaItemID;
var ndaImageSrc = "";
var Mode;
var ndamode;
var ndalistid;
var dynamicusername = "";
var Addressbusiness: any = [];
var BusinessUnitAddressName = '';
var DynamicAddressnda = "";

var ListItemId: number
var VersionNumber;
var ControlNumber;

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class EmployeeNdaNew extends React.Component<
  IndaformProps,
  IEmployeeNdaNewFormState,
  {}
> {
  constructor(props: IndaformProps) {
    super(props);

    this.state = {
      Date: "",
      Name: "",
      National: "",
      PassportNo: "",
      IdentificationNo: "",
      Address: "",
      CurrentUserName: [],
      CurrentUserDesignation: [],
      Agreement: [],
      rawHtmlNDA: "",
      NdaMasterList: [],
      Dynamiclogo: [],
      DynamicAddress: [],
      Titlesurnamenda: [],
      Titlesurname1: [],
      Titlesurname2: [],
      Ndacountryname: [],
      ONBSessionID: "",
      NDASubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      VersionNumber: [],
      ControlNumber: [],
      NdaFormControlNumber: [],
      NdaFromVersionNumber: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    this.Getsurenamenda();
    this.Getsurename1();
    this.Getsurename2();
    const url: any = new URL(window.location.href);
    NDaItemID = url.searchParams.get("NDaItemID");
    Mode = url.searchParams.get("NDAMode");
    ndamode = url.searchParams.get("NDAMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    this.GetCountryNamesign()
    $(".ndaaddress").prop('disabled', true)
    $("#IndentificationNo").val("784");
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

    $(".ndadate").val(moment().format("YYYY-MM-DD"));
    $(".endc_top_date_field").val(moment().format("YYYY-MM-DD"));
    $("#surenmaenda1").prop("disabled", true);
    $(".ndaname-one").prop("disabled", true);
    $(".ndavaluename").prop("disabled", true);
    $(".ndanational").prop("disabled", true);
    $(".ndapassportno").prop("disabled", true);


    $(".nda-surename").prop("disabled", true);
    $(".empnda-name").prop("disabled", true);
    $("#Authorized-signatory").prop("disabled", true);

    if (GlobalFormOpenedMode == "View") {
      $("#show-edit-authorized").show()

      $("#hide-authorized").hide()
      $(".nda-list-date").show()
      $(".ndadate").hide()
      this.GetEmployeeNdaViewItem(GlobalSessionIDValue);
      this.GetEmployeeNdaViewItemForPrint(GlobalSessionIDValue);
      $(`#Ndaitemidbtn`).hide();
      $(`.nda-submit`).hide();
      $(`.Imgedynamic`).hide();
      $(`.Iamgenndaitemid`).show();
      $(`#ndadescriptionitem`).hide();
      $(`.ndadescitem`).show();
      $("input").attr("disabled", "disabled");
      $(".dropdownviewcommon").prop("disabled", true);
      $(".ndaviewmodecommon").prop("disabled", true);
      $("#surenmaenda1").prop("disabled", true);
      $(".ndaname-one").prop("disabled", true);
      $(".ndavaluename").prop("disabled", true);
      $(".ndanational").prop("disabled", true);
      $(".ndapassportno").prop("disabled", true);
    } else if (GlobalFormOpenedMode == "Edit") {
      $(".ndadate").prop("disabled", false);
      $(".nda-list-date").show()
      $(".ndadate").hide()
      $("#show-edit-authorized").show()
      $("#hide-authorized").hide()
      this.GetEmployeeNdaViewItem(GlobalSessionIDValue);
      $(`#Ndaitemidbtn`).show();
      $(`.nda-submit`).hide();
      $(`.Imgedynamic`).hide();
      $(`.Iamgenndaitemid`).show();
      $(`#ndadescriptionitem`).hide();
      $(`.ndadescitem`).show();
      $("#surenmaenda1").prop("disabled", true);
      $(".ndaname-one").prop("disabled", true);
      $(".ndavaluename").prop("disabled", true);
      $(".ndanational").prop("disabled", true);
      $(".ndapassportno").prop("disabled", true);

      $("#Authorized-signatory-edit").prop("disabled", false);

    }


    this.Removevalidationnda();
    this.GetCurrentUserDetails();
    // this.GetEmployeeNdaItems();


  }

  public GetEmployeeNdaViewItemForPrint(ID) {
    $(".print-btnnda").show();
    $(".print-dynamicbussinessndauint").show();
    $(".print-bussinessndauint").hide();
    $(`.print-ndnamewithoutedit`).hide();
    $(`.print-ndnameeditd`).show();
    newweb.lists
      .getByTitle("Emp NDA Transaction")
      .items.select(
        "ID",
        "Date",
        "Name",
        "National",
        "PassportNo",
        "IndentificationNo",
        "Address",
        "Status",
        "SurName",
        "SurName1",
        "SurName2",
        "ONBSessionID",
        "BusinessUnit",
        "BusinessUnit",
        "UnitLogo",
        "Authorizedsignatory",
        "ControlNumber",
        "VersionNumber"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $('#print-nda-Version-Number').text(result[0].VersionNumber);
          $('#print-nda-Control-Number').text(result[0].ControlNumber);
          $("#print-Ndawithoutdynamicname").show();
          $("#print-Ndawithoutdynamicnametwo").show();

          $("#print-dynamicaddress-business-unit").show();
          $("#print-address-business-unit").hide();
          $(".print-ndavaluename").text(result[0].Name);
          //    $(".print-ndadate").text(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".print-ndanational").text(result[0].National);
          $(".print-ndapassportno").text(result[0].PassportNo);
          $(".print-ndaifno").text(result[0].IndentificationNo);
          $(".print-ndaaddress").text(result[0].Address);
          $('#print-surenmaenda').text(result[0].SurName);
          $(".print-nda-list-date").text(" ");
          $('#print-surenmaenda').text(result[0].SurName);
          $('#print-surenmaenda1').text(result[0].SurName1);
          $('#print-surenmaenda2').text(result[0].SurName2);
          $("#print-Authorized-signatory").text(result[0].Authorizedsignatory)
          ndaImageSrc = result[0].UnitLogo;
          dynamicusername = result[0].BusinessUnit;
          DynamicAddressnda = result[0].BusinessUnitAddress
        }
      });




  }

  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-nda').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    //document.title = moment().format("YYYY-MM-DD");

    window.print();

    location.reload();

    document.body.innerHTML = originalContents;

  }

  public async GetCurrentUserONBSessionID(currentuseremailid, FormMode) {

    if (FormMode == "New") {
      newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("Name/EMail eq '" + currentuseremailid + "'").orderBy("Created", false).top(1).get().then((response) => {
        if (response.length != 0) {
          this.setState({
            ONBSessionID: response[0].ONBSessionID
          });
          this.GetUsernamefromspeciman(response[0].ONBSessionID)
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'SPECIMEN SIGNATURE FORM' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "EMPLOYEE NON-DISCLOSURE AGREEMENT") {
          this.setState({
            NDASubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.GetNdalistdata(ONBSessionID, FormMode);
          }
        }
      }
    });
  }
  public GetUsernamefromspeciman(ONBSessionID) {
    newweb.lists
      .getByTitle("Specimen Signature Transaction")
      .items.select(
        "Address",
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".ndaaddress").val(result[0].Address);
          $(".ndaaddress").prop("disabled", true);
        }
      })

  }

  public GetEmployeeNdaViewItem(GlobalSessionIDValue) {

    $(".dynamicbussinessndauint").show();
    $(".bussinessndauint").hide();
    $(`.ndnamewithoutedit`).hide();
    $(`.ndnameeditd`).show();
    $("#userupdatetn").hide();
    newweb.lists
      .getByTitle("Emp NDA Transaction")
      .items.select(
        "ID",
        "Date",
        "Name",
        "National",
        "PassportNo",
        "IndentificationNo",
        "Address",
        "Status",
        "SurName",
        "SurName1",
        "SurName2",
        "ONBSessionID",
        "BusinessUnit",
        "BusinessUnit",
        "UnitLogo",
        "Authorizedsignatory",
        "VersionNumber",
        "ControlNumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".nda_tickimg").show();
          ndalistid = result[0].ID;
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber
          $("#Ndawithoutdynamicname").show();
          $("#Ndawithoutdynamicnametwo").show();

          $("#dynamicaddress-business-unit").show();
          $("#address-business-unit").hide();
          $(".ndaimg").show();
          $(".nda-submit").hide();
          // $(".ndatitle").attr("style", "color:#00A36C");
          $(".ndavaluename").val(result[0].Name);
          $(".nda-list-date").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".ndanational").val(result[0].National);
          $(".ndapassportno").val(result[0].PassportNo);
          $(".ndaifno").val(result[0].IndentificationNo);
          $(".ndaaddress").val(result[0].Address);
          setTimeout(() => {
            $('#surenmaenda').val(result[0].SurName);
            $('#surenmaenda1').val(result[0].SurName1);
            $('#surenmaenda2').val(result[0].SurName2);
          }, 1000);

          setTimeout(() => {
            $("#Authorized-signatory-edit").val(result[0].Authorizedsignatory)
            if (GlobalFormOpenedMode == "Edit") {
              $("#Authorized-signatory-edit").val(this.state.CurrentUserName)
            }
          }, 2000);

          ndaImageSrc = result[0].UnitLogo;
          dynamicusername = result[0].BusinessUnit;
          DynamicAddressnda = result[0].BusinessUnitAddress;
        }
      });
  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/SitePages/MasterDashboardForm.aspx?env=WebView&Mode=Dashboard`;
  }

  public dashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
  }

  public GetCurrentUserDetails() {
    var reacthandler = this;

    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,

      type: "GET",

      headers: { Accept: "application/json; odata=verbose;" },

      success: function (resultData) {
        // var email = resultData.d.Email;
        //(resultData);
        var Name = resultData.d.DisplayName;
        // $(".empnda-name").val("Name")
        var Designation = resultData.d.Title;

        var properties = resultData.d.UserProfileProperties.results;

        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcname = properties[i].Value;
            setTimeout(() => {
              reacthandler.DynamicUnitLogo(ofcname);
              reacthandler.DynamicBusinessAddrsss(ofcname);
              reacthandler.GetUnitHrName(ofcname);
              reacthandler.GetContolandVersionNumber(ofcname)
              reacthandler.GetControlNumberAccordingtoformname(ofcname)
            }, 500);
            break;
          }
        }

        reacthandler.setState({
          CurrentUserName: Name,
          CurrentUserDesignation: Designation,
          // CurrentUserProfilePic: `${reacthandler.props.siteurl}/_layouts/15/userphoto.aspx?size=l&username=${email}`
        });
        if (GlobalFormOpenedMode == "New") {

          // debugger;
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
        .filter(`Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT'`).get()
        .then((results) => {
          this.setState({
            NdaFormControlNumber: results[0][fieldname1.InternalName],
            NdaFromVersionNumber: results[0][fieldname2.InternalName]
          })

          //alert(this.state.ControlNumber+"-"+this.state.cocFormControlNumber)
        });

    }
  }
  public async GetUnitHrName(ofcname) {

    await newweb.lists.getByTitle('UNIT HR MASTER').items

      .select('Name/Id', 'Name/Title', 'Business/Id', 'Business/Title').expand('Business', 'Name')

      .filter(`Business/Title eq '${ofcname}'`)

      .get().then((items) => {

        //  $("#Authorized-signatory").val(items[0].Name.Title)
      })

  }

  // public GetEmployeeNdaItems() {
  //   newweb.lists
  //     .getByTitle("Emp NDA Master")
  //     .items.orderBy("OrderNo", true)
  //     .filter(`IsActive eq 1`)
  //     .get()
  //     .then((result) => {
  //       this.setState({
  //         Agreement: result,
  //         rawHtmlNDA: result[0].Desc,
  //       });
  //       //(result);
  //     });
  // }

  public DynamicUnitLogo(ofc) {
    if (GlobalFormOpenedMode == "New") {
      // $(`.Imgedynamic`).show();
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
  public surnamevalidation() {
    var status = true;
    if (status == true && $("#surenmaenda").val() == "Select") {
      $("#err-ndatitlesurename").show();
      $("#surenmaenda").focus();
      status = false;
    } else {
      $("#err-ndatitlesurename").hide();
    }
    return status;
  }

  public surnamevalidation1() {
    var status = true;
    if (status == true && $("#surenmaenda1").val() == "Select") {
      $("#err-ndatitlesurename1").show();
      $("#surenmaenda1").focus();
      status = false;
    } else {
      $("#err-ndatitlesurename1").hide();
    }
    return status;
  }

  public surnamevalidation2() {
    var status = true;
    if (status == true && $("#surenmaenda2").find(":selected").text() == "Select") {
      $("#err-ndatitlesurename2").show();
      $("#surenmaenda2").focus();
      status = false;
    } else {
      $("#err-ndatitlesurename2").hide();
    }
    return status;
  }
  // public Mobilenovaliduae() {
  //   var status = true;
  //   var numbers = /^[0-9]+$/;
  //   var phone = $.trim(($(".MobileNos") as any).val());
  //   if (status == true && phone != "") {
  //     if (status == true && phone.match(numbers)) {
  //       $(".err-mobilenouae").hide();
  //     } else {
  //       $(".err-mobilenouae").show();
  //       $(".MobileNos").focus();
  //       status = false;
  //     }
  //   }
  //   return status;
  // }
  public ValidateEmiratesIDFormat() {
    var numbers = /^[0-9]+$/;
    var status = true;
    if (status == true && $("#IndentificationNo").val() != "") {
      var emrid: any = $("#IndentificationNo").val().toString();
      var phone = $.trim(($("#IndentificationNo") as any).val());

      if (emrid.length == 15) {
        if (phone.match(numbers)) {


          if (emrid.startsWith("784")) {
            $("#err-emirate-wrong-format-nda").hide();
          } else {
            $("#err-emirate-wrong-format-nda").show();
            $("#IndentificationNo").focus();
            status = false;


          }
        } else {
          $("#err-emirate-wrong-format-nda").show();
          $("#IndentificationNo").focus();
          status = false;
        }
      } else {
        $("#err-emirate-wrong-format-nda").show();
        $("#IndentificationNo").focus();
        status = false;
      }
    }
    return status;

  }

  public Senatoryeditform() {
    var status = true;
    if (status == true && $("#Authorized-signatory-edit").val() != "") {
      $("#err-signatory").hide();
    } else {
      $("#err-signatory").show();
      $("#Authorized-signatory-edit").focus();
      status = false;
    }
    return status
  }
  public updatelistitemnda() {
    if (

      this.surnamevalidation() &&
      this.surnamevalidation1() &&
      this.surnamevalidation2() &&
      this.Validation3() &&
      this.Validation4() &&
      this.Validation6() &&
      this.Senatoryeditform()

    ) {
      var CurrentDate = $(".nda-list-date").val();
      var Name = $(".ndavaluename").val();
      var Nation = $("#National").val();
      var Passport = $("#PassportNo").val();
      var Identity = $("#IndentificationNo").val();
      var Add = $("#Address").val();
      // var NDA = $("#dynamicnda").html();

      newweb.lists
        .getByTitle("Emp NDA Transaction")
        .items.getById(ndalistid)
        .update({
          Title: "Employee NDA Agreement",
          Date: CurrentDate,
          Name: Name,
          National: Nation,
          PassportNo: Passport,
          IndentificationNo: Identity,
          Address: Add,
          SurName: $('#surenmaenda').val(),
          SurName1: $('#surenmaenda1').val(),
          SurName2: $('#surenmaenda2').val(),
          Status: "Updated by Unit HR",
          Authorizedsignatory: $('#Authorized-signatory-edit').val(),
          // NdaMasterList:NDA,
        })
        .then((results: any) => {
          if (this.state.HrCompleteStatus == true) {
            subweb.lists
              .getByTitle("Emp NDA HR Update History").items
              .add({
                Title: "Employee NDA Agreement",
                Date: CurrentDate,
                Name: Name,
                National: Nation,
                PassportNo: Passport,
                IndentificationNo: Identity,
                Address: Add,
                SurName: $('#surenmaenda').val(),
                SurName1: $('#surenmaenda1').val(),
                SurName2: $('#surenmaenda2').val(),
                Status: "Updated by Unit HR",
                Authorizedsignatory: $('#Authorized-signatory-edit').val(),
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
            location.reload()
          });
        });
    }
  }

  public Validation3() {
    var FormStatus = true;
    if (FormStatus == true && $("#National").find(":selected").text() == "Select") {
      $("#err-emp-national").show();
      $("#National").focus();

      FormStatus = false;
    } else {
      $("#err-emp-national").hide();
    }
    return FormStatus;
  }

  public Validation4() {
    var FormStatus = true;
    if (FormStatus == true && $("#PassportNo").val() != "") {
      $("#err-passportNonda").hide();
    } else {
      $("#err-passportNonda").show();
      $("#PassportNo").focus();
      FormStatus = false;
    }
    return FormStatus;
  }
  public Validation5() {
    var FormStatus = true;
    if (FormStatus == true && $("#IndentificationNo").val() != "") {
      $("#err-indentificationnonda").hide();
    } else {
      $("#err-indentificationnonda").show();
      $("#IndentificationNo").focus();
      FormStatus = false;
    }
    return FormStatus;
  }
  public Validation6() {
    var FormStatus = true;
    if (FormStatus == true && $("#Address").val() != "") {
      $("#err-address").hide();
    } else {
      $("#err-address").show();
      $("#Address").focus();
      FormStatus = false;
    }
    return FormStatus;
  }
  public Senatory() {
    var status = true;
    if (status == true && $("#Authorized-signatory").val() != "") {
      $("#err-signatory").hide();
    } else {
      $("#err-signatory").show();
      $("#Authorized-signatory").focus();
      status = false;
    }
    return status
  }
  public SaveListItem() {
    if (
      this.surnamevalidation() &&
      this.surnamevalidation1() &&
      this.surnamevalidation2() &&
      this.Validation3() &&
      this.Validation4() &&
      this.Validation6() &&
      this.Senatory()


    ) {
      var CurrentDate = $("#txt-current-date").val();
      var Name = $("#Name").val();
      var Nation = $("#National").val();
      var Passport = $("#PassportNo").val();
      var Identity = $("#IndentificationNo").val();
      var Add = $("#Address").val();
      //  var Desc = $("#dynamicnda").html();
      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          newweb.lists
            .getByTitle("Emp NDA Transaction")
            .items.add({
              Title: "EMPLOYEE NON-DISCLOSURE AGREEMENT",
              Date: moment(CurrentDate, "YYYY-MM-DD").format("M/D/YYYY"),
              Name: Name,
              National: Nation,
              PassportNo: Passport,
              IndentificationNo: Identity,
              Address: Add,
              // NdaMasterList:Desc,
              Status: "Submitted by employee",
              BusinessUnit: officename,
              UnitLogo: LogoUrl,
              BusinessUnitAddress: BusinessUnitAddressName,
              SurName: $('#surenmaenda').val(),
              SurName1: $('#surenmaenda1').val(),
              SurName2: $('#surenmaenda2').val(),
              ONBSessionID: this.state.ONBSessionID,
              Authorizedsignatory: $('#Authorized-signatory').val(),
              VersionNumber: this.state.NdaFromVersionNumber,
              ControlNumber: this.state.ControlNumber + "/" + this.state.NdaFormControlNumber
            })
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT'").orderBy("Created", false).get().then((response) => {
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
  public dashboardnda() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
  }
  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?env=WebView`;
  }

  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Personal Information Master").items.select("SurName", "FullName", "DocumentNo", "CurrentNationality", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $("#surenmaenda").val(result[0].SurName);
          $("#surenmaenda1").val(result[0].SurName);
          //  $("#surenmaenda2").val(result[0].SurName); for hr do not take surename employee manaually fill the inpuy
          $(".ndaname-one").val(result[0].FullName);
          $(".ndavaluename").val(result[0].FullName);
          $(".empnda-name").val(result[0].FullName);
          $(".ndanational").val(result[0].CurrentNationality);
          $(".ndapassportno").val(result[0].DocumentNo);

        }
      })

    await newweb.lists.getByTitle("COI Transaction").items.select("WitnessName", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $("#Authorized-signatory").val(result[0].WitnessName)

        }
      })
  }


  public async GetNdalistdata(ONBSessionID, FormMode) {
    // if (Mode == null) {
    await newweb.lists
      .getByTitle("Emp NDA Transaction")
      .items.select(
        "ID",
        "Date",
        "Name",
        "National",
        "PassportNo",
        "IndentificationNo",
        "Address",
        "Status",
        "SurName",
        "SurName1",
        "SurName2",
        "ONBSessionID",
        "Authorizedsignatory",
        "Author/Title"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then((response) => {
        if (response.length != 0) {
          $(".nda_tickimg").show();

          $("#Ndawithoutdynamicname").show();
          $(`.ndnamewithoutedit`).hide();
          $("#Ndawithoutdynamicnametwo").show();

          $(".namevaluenda").prop("disabled", true);
          $('.namevaluenda').val(response[0].Name);
          $(".ndaimg").show();
          $(".dropdownviewcommon").prop("disabled", true);
          $(".ndaviewmodecommon").prop("disabled", true);
          $(".nda-submit").hide();
          $("#userupdatetn").hide();
          $(".nda-list-date").val(response[0].date)
          $('#surenmaenda').val(response[0].SurName);
          $('#surenmaenda1').val(response[0].SurName1);
          $('#surenmaenda2').val(response[0].SurName2);
          $(".nda-list-date").val(moment(response[0].Date).format("YYYY-MM-DD"));
          $(".ndanational").val(response[0].National);
          $(".ndapassportno").val(response[0].PassportNo);
          $(".ndaifno").val(response[0].IndentificationNo);
          $(".ndaaddress").val(response[0].Address);
          setTimeout(() => {
            $("#Authorized-signatory-edit").val(response[0].Authorizedsignatory)
          }, 1000);

          $("#show-edit-authorized").show()
          $("#hide-authorized").hide()
          $(".nda-list-date").show()
          $(".ndadate").hide()
        }
      });
    // }
  }



  public DynamicBusinessAddrsss(ofce) {
    newweb.lists
      .getByTitle("Business Unit Master")
      .items.select("ID", "Address")
      .filter(`Title eq '${ofce}'`)
      .get()
      .then((results) => {
        //(results);
        BusinessUnitAddressName = results[0].Address;
        this.setState({
          DynamicAddress: results,
        });
      });
  }
  public Getsurenamenda() {

    newweb.lists
      .getByTitle("SurName")
      .items.select("ID", "SurName")
      .get()
      .then((results) => {

        //(results);

        this.setState({
          Titlesurnamenda: results,
        });
      });

  }

  public Getsurename1() {
    newweb.lists
      .getByTitle("SurName")
      .items.select("ID", "SurName1")
      .get()
      .then((results) => {
        //(results);
        this.setState({
          Titlesurname1: results,
        });

      });
  }

  public Getsurename2() {
    newweb.lists
      .getByTitle("SurName")
      .items.select("ID", "SurName2")
      .get()
      .then((results) => {
        //(results);
        this.setState({
          Titlesurname2: results,
        });

      });
  }


  public Removevalidationnda() {




    $(".ndaname-one").keyup(function () {
      var value = $(this).val();
      $(".ndaname-two").val(value);

    });
    $(".ndaname-two").keyup(function () {
      var value = $(this).val();
      $(".ndaname-one").val(value);

    });
    $('#surenmaenda').on('change', function () {
      $("#err-ndatitlesurename").hide();
    })
    $('#surenmaenda1').on('change', function () {
      $("#err-ndatitlesurename1").hide();
    })
    $('#surenmaenda2').on('change', function () {
      $("#err-ndatitlesurename2").hide();
    })

    $(".ndanational").on('change', function () {

      $("#err-emp-national").hide();
    });

    $(".ndapassportno").keyup(function () {

      $("#err-passportNonda").hide();
    });
    $("#IndentificationNo").keyup(function () {

      $("#err-emirate-wrong-format-nda").hide();
    });



    $(".ndaifno").keyup(function () {

      $("#err-indentificationnonda").hide();
    });

    $("#Authorized-signatory").keyup(function () {

      $("#err-signatory").hide();
    });

    $("#Authorized-signatory-edit").keyup(function () {

      $("#err-signatory").hide();
    });


    $(".ndaaddress").keyup(function () {

      $("#err-address").hide();
    });
  }


  public async GetCountryNamesign() {
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
          Ndacountryname: items,
        });
      });
  }
  public render(): React.ReactElement<IndaformProps> {

    const Allcountryname: JSX.Element[] = this.state.Ndacountryname.map(function (
      item,
      key
    ) {
      ////(item);

      return <option value={item.CountryName}>{item.CountryName}</option>;
    });
    var handler = this;
    // const NDA: JSX.Element[] = this.state.Agreement.map(function (item, key) {
    //   var rawhtml = "";
    //   rawhtml = item.Description;
    //   var dynamicName = rawhtml.replace("UnitName", officename);
    //   return (
    //     <p className="ndaagreement" id="dynamicnda">
    //       <Markup content={dynamicName} />
    //     </p>
    //   );
    // });
    const Surenamenda: JSX.Element[] = this.state.Titlesurnamenda.map(function (item, key) {
      //  //(item);

      return (
        <option value={item.SurName}>{item.SurName}</option>

      )
    })

    const Surname1: JSX.Element[] = this.state.Titlesurname1.map(function (item, key) {
      //(item);

      return (
        <option value={item.SurName1}>{item.SurName1}</option>

      )
    })

    const Surname2: JSX.Element[] = this.state.Titlesurname2.map(function (item, key) {
      //(item);

      return (
        <option value={item.SurName2}>{item.SurName2}</option>

      )
    })

    const DynamicAddress: JSX.Element[] = this.state.DynamicAddress.map(
      function (item, key) {
        return <span>{item.Address}</span>;
      }
    );

    return (
      <>
        <div className="all-item">
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

            <span> Employee non-disclosure agreement </span>
          </div>
          <div className="emp_nondis_top">
            <div className="personal_info_part">
              <div className="endc_top_text">
                <p> This Employee Non-Disclosure Agreement (the <span className="endc_agreement"> “Agreement” </span>) is dated
                  <input type="date" id="txt-current-date" className="form-control ndadate ndaviewmodecommon" autoComplete="off" disabled />
                  <input style={{ display: "none" }} type="date" className="form-control nda-list-date ndaviewmodecommon" autoComplete="off" />
                </p>
              </div>
              <h3>  Parties </h3>
              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="form-group relative">

                    <select
                      id="surenmaenda"
                      className="form-control nda-surename dropdownviewcommon"
                    >
                      <option value="Select">Select</option>
                      {Surenamenda}
                    </select>
                    <span className="floating-label ">Title <i className="required">*</i></span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-ndatitlesurename"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="ndnamewithoutedit form-group relative">
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      className="form-control empnda-name ndaviewmodecommon common_fullname_disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Name<i className="required">*</i>
                    </span>
                  </div>

                  <div id="Ndawithoutdynamicname"
                    style={{ display: "none" }}
                    className="form-group relative"
                  >
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      className="form-control ndaname-one ndaname ndavaluename namevaluenda"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Name<i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-emp-name"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="form-group relative">
                    {/* <select
                    id="National"
                    className="form-control ndanational ndaviewmodecommon"
                  >
                    <option value="Select">Select</option>
                    {Allcountryname}
                  </select> */}

                    <input
                      type="text"
                      id="National"
                      name="National"
                      className="form-control ndanational ndaviewmodecommon"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Nationality <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-emp-national"
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
                      className="form-control ndapassportno ndaviewmodecommon"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Passport No <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-passportNonda"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="IndentificationNo"
                      name="IndentificationNo"
                      className="form-control ndaifno ndaviewmodecommon"
                      autoComplete="off"
                      maxLength={15}

                    />
                    <span className="floating-label ">
                      Emirates ID No
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-indentificationnonda"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                  <span
                    className="error-validation"
                    id="err-emirate-wrong-format-nda"
                    style={{ color: "red", display: "none" }}
                  >
                    Please enter valid emirate id.
                  </span>
                </div>
              </div>
              <div className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <input
                      type="textarea"
                      id="Address"
                      name="Address"
                      className="form-control ndaaddress ndaviewmodecommon"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Address <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-address"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <p className="nda-address-wrap">

                <span id="bussiness-text-size" className="bussinessndauint"><b>{officename}</b></span><span style={{ display: "none" }} className="dynamicbussinessndauint"> <b>{dynamicusername}</b></span> an entity  incorporated and registered in the United Arab Emirates whose registered office is at
                <span id="address-business-unit">{DynamicAddress}</span>
                <span style={{ display: "none" }} id="dynamicaddress-business-unit">{DynamicAddressnda}</span>
                , for itself and on behalf of its Affiliates (the “Company”).{" "}
              </p>
            </div>
            <div className="emp-interest dashboard_right_text" id="NDAMaster">
              {/* <p id="ndadescriptionitem">{NDA}</p>
                      <div className="ndadescitem" style={{display:"none"}} id="alldendaitem"></div> */}
              <div className="dashboard_right_text employee_non_disclosure_part">
                <div className="padding_bottom_para">

                  <div className="emp_nondis_agree_background personal_info_part">
                    <h5> Background </h5>
                    <p className="padding_bottom_para">

                      Employee in the course of engagement, advisory or employment
                      with the Company, has, had or may continue to become aware of
                      and have access to certain proprietary and confidential
                      information belonging to the Company.
                    </p>
                    <p>
                      {" "}
                      Employee agrees that it may receive from Company the
                      Confidential Information (as defined below) in connection with
                      performance of its employment with the Company, which will
                      remain confidential according to the following terms and
                      conditions.{" "}
                    </p>
                  </div>
                  <div className="emp_nondis_agree_teams personal_info_part">

                    <h5>  Agreed Terms </h5>
                    <div className="emp_nondis_agree_list">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 1. </p>
                          <p className="heading_text"> Interpretation  </p>
                        </li>
                      </ul>

                      <div className="padding_left_text">
                        <ul>
                          <li className="emp_li padding_bottom_para">
                            <p className="number span_bold_text"> 1.1. </p>
                            <p className="text">
                              {" "}
                              The definitions and rules of interpretation in this clause
                              apply in this Agreement{" "}
                            </p>
                          </li>
                        </ul>
                        <p className="padding_bottom_para">
                          {" "}
                          <span className="span_bold_text">Affiliate(s):</span> means in
                          relation to the Comany, companies or entities in which
                          shareholder of Comany has shareholding or interest, directly
                          or indirectly of 49% or more, or has the right to exercise,
                          directly or indirectly 49% or more of the control, voting
                          rights, the power to direct or cause the direction of the
                          management and policies of such affiliate whether through the
                          ownership of voting securities, by agreement, power of
                          attorney or otherwise or the power to act as or elect the
                          manager, partners or other individuals exercising similar
                          authority.{" "}
                        </p>
                        <p className="span_bold_text padding_bottom_para">
                          {" "}
                          Confidential Information: has the meaning given in Clause 2.3.{" "}
                        </p>
                        <p className="padding_bottom_para">
                          {" "}
                          <span className="span_bold_text"> Data Room:</span> means the
                          electronic data room that the Company or one of its Affiliate
                          may make available to the Employee for the purpose of
                          disclosing certain Confidential Information under the terms of
                          this Agreement.
                        </p>
                        <p className="padding_bottom_para">
                          {" "}
                          <span className="span_bold_text">
                            Permitted Purpose:
                          </span>{" "}
                          means Employee evaluating the Confidential Information in
                          course of performance of its employment with the Company and
                          for a specific task assigned by its line manager{" "}
                        </p>
                        <p>
                          {" "}
                          <span className="span_bold_text">Personal Data:</span> means
                          any information relating to an identified or identifiable
                          natural person.{" "}
                        </p>
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 1.2. </p>
                            <p className="text">
                              {" "}
                              Clause and schedule headings do not affect the
                              interpretation of this agreement.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 1.3. </p>
                            <p className="text">
                              {" "}
                              A person includes an entity or a corporate or
                              unincorporated body.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 1.4. </p>
                            <p className="text">
                              {" "}
                              A reference to a law is a reference to it as it is in
                              force for the time being, taking account of any amendment,
                              extension, application or re-enactment and includes any
                              subordinate legislation for the time being in force made
                              under it.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 1.5. </p>
                            <p className="text">
                              <b>Writing </b>or <b>written</b> includes faxes and e-mail.
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 1.6. </p>
                            <p className="text">
                              {" "}
                              Words in the singular include the plural and in plural
                              include the singular.{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="padding_bottom_para emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 2. </p>
                        <p className="heading_text"> Employee Obligations  </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <p>
                        {" "}
                        From time to time, the Company may disclose Confidential
                        Information to the Employee. The Employee will: (a) not
                        disclose any of the Confidential Information to any third
                        party whatsoever, unless directed to do so in writing by an
                        authorized representative of the Company; and (b) shall keep
                        all Confidential Information strictly confidential.{" "}
                      </p>
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 2.1. </p>
                          <p className="text">
                            {" "}
                            In return for the Company making Confidential Information
                            available to the Employee, the Employee undertakes to keep
                            the Confidential Information confidential and shall not
                            except as otherwise expressly provided herein:{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding3">
                          <p className="number"> 2.1.1. </p>
                          <p className="text">
                            {" "}
                            use or exploit the Confidential Information except in
                            connection with the Permitted Purpose; or{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding3">
                          <p className="number"> 2.1.2. </p>
                          <p className="text"> disclose to any person: </p>
                        </li>
                        <li className="emp_li emp_padding4">
                          <p className="number"> 2.1.2.1. </p>
                          <p className="text">
                            {" "}
                            in whole or in part any portion of the Confidential
                            Information;{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding4">
                          <p className="number"> 2.1.2.2. </p>
                          <p className="text">
                            {" "}
                            any terms of the Permitted Purpose;{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding4">
                          <p className="number"> 2.1.2.3. </p>
                          <p className="text">
                            {" "}
                            not copy, reduce to writing or otherwise record the
                            Confidential Information except as strictly necessary for
                            the Permitted Purpose. All Confidential Information and
                            any such copies, reductions to writing and records shall
                            be the property of the Company and its Affiliates; or{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding4">
                          <p className="number"> 2.1.2.4. </p>
                          <p className="text">
                            {" "}
                            the fact that the Confidential Information has been made
                            available.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 2.2. </p>
                          <p className="text">
                            {" "}
                            The Employee shall establish and maintain adequate
                            security measures (including any reasonable security
                            measures proposed by the Company from time to time) to
                            safeguard the Confidential Information from unauthorized
                            access or use, which the Employee warrants as providing
                            adequate protection from theft, damage, loss, unauthorized
                            disclosure, copying or use.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 2.3. </p>
                          <p className="text">

                            <p className="span_bold_text">

                              Confidential Information Means:{" "}
                            </p>
                            All information in whatever form (including, without
                            limitation, in written, oral, visual or electronic form,
                            or any other way of representing or recording information
                            which contains or is derived or copied from such
                            information in each case which is confidential or
                            proprietary in nature) that is made available in the Data
                            Room or disclosed to the Employee or on behalf of the
                            Company, including without limitation any trade secret,
                            technique, strategy, component, concept, program, report,
                            study, memorandum, correspondence, documentation,
                            information, manual, record, data, technology, product,
                            plan, design, procedure, method, invention, operations,
                            processes, know-how, sample, notes, summaries, analyses,
                            compilations, Personal Data and other writings, cell lines
                            and procedures and formulations for producing any such
                            sample, medium, and / or cell line, process, formula or
                            test data relating to any research project, work in
                            progress, future development, engineering, manufacturing,
                            marketing, pricing, billing, servicing, financing,
                            personnel matter, its present or future products, sales,
                            suppliers, clients, customers, employees, investors, or
                            any other information which the Company has previously
                            provided or provides to the Employee, whether or not such
                            information is identified as such by an appropriate stamp
                            or marking and whether in existence at the date hereof or
                            hereafter to come into existence, or any information
                            obtained by the Employee through inspection or observation
                            of the properties, facilities or operations of Company.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 2.4. </p>
                          <p className="text">
                            <p>
                              Use of Confidential Information
                            </p>
                            The Employee agrees to use
                            the Confidential Information solely in connection with the
                            Permitted Purpose and not for any purpose other than as
                            authorized by this Agreement without the prior written
                            consent of an authorized representative of the Company. No
                            other right or license, whether expressed or implied, in
                            the Confidential Information is granted to the Employee
                            hereunder. Title to the Confidential Information and its
                            consequential work product will remain solely in the
                            Company. All use of Confidential Information by the
                            Employee shall be for the benefit of the Company and any
                            modifications and improvements thereof by the Employee
                            shall be the sole property of the Company.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 3. </p>
                        <p className="heading_text">Continuting Obligations </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <p>
                        The Obligations contained in this Agreement shall continue endlessly after the employee has ceased to be an employee with the company ("Term")
                      </p>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 4. </p>
                        <p className="heading_text">
                          {" "}
                          Non-Circumvention And Non-Solicitation
                        </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 4.1. </p>
                          <p className="text">
                            {" "}
                            During the Term of this Agreement, it is expressly agreed
                            that opportunities identified by the Company or its
                            Affiliates and disclosed to the Employee as well as the
                            identities of an individual or entity and any other third
                            parties made available by Company to the Employee shall
                            constitute Confidential Information and Employee shall not
                            (without the prior written consent of the Company):{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding3">
                          <p className="number"> 4.1.1. </p>
                          <p className="text">
                            {" "}
                            directly or indirectly engage with, initiate, solicit,
                            negotiate, contract or enter into any business
                            transactions, agreements or undertakings with any such
                            third party identified and introduced by Company or its
                            Affiliates; or{" "}
                          </p>
                        </li>
                        <li className="emp_li emp_padding3">
                          <p className="number"> 4.1.2. </p>
                          <p className="text">
                            {" "}
                            seek to by-pass, compete, avoid or circumvent Company or
                            its Affiliates to pursue similar opportunities by
                            utilising any Confidential Information or by otherwise
                            exploiting or deriving any benefit from the Confidential
                            Information.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 5. </p>
                        <p className="heading_text"> Whole Agreement And Conduct  </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <p>
                        {" "}
                        This Agreement is the whole agreement between the Parties and
                        supersedes any arrangements, understanding or previous
                        agreement between them relating to the subject matter covered
                        by this Agreement.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 6. </p>
                        <p className="heading_text">
                          {" "}
                          Third Party Rights And Intellectual Property
                        </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <p>
                        {" "}
                        Company reserves all rights in its Confidential Information
                        and none of the Confidential Information or any derivative
                        work product or compilation is the property of the Employee.
                        The disclosure to the Employee of any Confidential Information
                        shall not give the Employee any license or other rights
                        whatsoever in respect of any part of such Confidential
                        Information.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 7. </p>
                        <p className="heading_text"> Servance  </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 7.1. </p>
                          <p className="text">
                            {" "}
                            If any court or administrative body of competent
                            jurisdiction finds any provision of this agreement to be
                            invalid, unenforceable or illegal, the other provisions of
                            this Agreement shall remain in force.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 7.2. </p>
                          <p className="text">
                            {" "}
                            If any invalid, unenforceable or illegal provision would
                            be valid, enforceable or legal if some part of it were
                            deleted, the provision shall apply with whatever
                            modification is necessary to make it valid, enforceable
                            and legal.{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 8. </p>
                        <p className="heading_text"> Variation And Waiver </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 8.1. </p>
                          <p className="text">
                            {" "}
                            Any variation, amendment or modification of this Agreement
                            shall be in writing and signed by or on behalf of Parties.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 8.2. </p>
                          <p className="text">
                            {" "}
                            No failure to exercise or delay in exercising any right or
                            remedy provided under this Agreement or by law constitutes
                            a waiver of such right or remedy or will prevent any
                            future exercise in whole or in part thereof.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 8.3. </p>
                          <p className="text">
                            {" "}
                            No single or partial exercise of any right or remedy under
                            this Agreement shall preclude or restrict the further
                            exercise of any such right or remedy{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 9. </p>
                        <p className="heading_text"> Counterparts  </p>
                      </li>
                    </ul>
                    <div className="padding_left_text">
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 9.1. </p>
                          <p className="text">
                            {" "}
                            This Agreement may be entered into in any number of
                            counterparts, and by the Parties on different
                            counterparts, each of which, when executed and delivered,
                            shall be an original, but all the counterparts shall
                            together constitute one and the same agreement.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 9.2. </p>
                          <p className="text">
                            {" "}
                            Transmission of an executed counterpart of this Agreement
                            or the executed signature page of a counterpart of this
                            Agreement by email shall take effect as delivery of an
                            executed counterpart of this Agreement.{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 10. </p>
                        <p className="heading_text"> Language </p>
                      </li>
                    </ul>
                    <div className="padding_left_text padding_left_txt">
                      <ul>
                        <li className="emp_li">
                          <p className="number"> 10.1. </p>
                          <p className="text">
                            {" "}
                            If this Agreement is translated, the English language text
                            shall prevail.{" "}
                          </p>
                        </li>
                        <li className="emp_li">
                          <p className="number"> 10.2. </p>
                          <p className="text">
                            {" "}
                            Any other document provided in connection with this
                            Agreement shall be in English, or there shall be a
                            properly prepared translation into English and the English
                            translation shall prevail in the case of any conflict
                            between them.{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part">
                    <ul>
                      <li className="heading_li">
                        <p className="heading_number"> 11. </p>
                        <p className="heading_text">
                          {" "}
                          Governing Law And Jurisdiction
                        </p>
                      </li>
                    </ul>
                    <div className="padding_left_text padding_left_txt">
                      <p>
                        {" "}
                        Any dispute arising out of the formation, performance,
                        interpretation, nullification, termination or invalidation of
                        this Agreement or arising therefrom or related thereto in any
                        manner whatsoever including the validity of this Agreement,
                        shall be resolved by Dubai International Arbitration Centre
                        (DIAC Rules) and the laws of England and Wales shall be
                        applicable to all such arbitrations. The Parties to the
                        dispute shall mutually appoint a sole arbitrator. In the event
                        the Parties fail to appoint the sole arbitrator within 30 days
                        from the date of referral of the dispute to arbitration, then
                        the sole arbitrator shall be appointed in accordance with the
                        DIAC Rules. The seat of arbitration shall be at Dubai
                        International Financial Center (DIFC-DIAC), Any judgement or
                        order reserved by the DIAC shall be final and binding upon the
                        Parties, without raising any conflicts or discrepancies over
                        its enforceability in a foreign jurisdiction. Each Party
                        waives any objection which it may have based on lack of
                        personal jurisdiction, improper venue or forum non convenience
                        to the conduct of any proceeding in any such court and waives
                        personal service of any and all process upon it..
                      </p>
                    </div>
                    <div>
                      <p>This Agreement has been entered into on the date stated at the beginning of it.</p>
                    </div>

                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <select
                            id="surenmaenda1"
                            className="form-control nda-surename dropdownviewcommon"
                          >
                            <option value="Select">Select</option>
                            {Surname1}
                          </select>
                          <span className="floating-label ">Title <i className="required">*</i></span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-ndatitlesurename1"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="ndnamewithoutedit form-group relative">
                          <input
                            type="text"
                            id="Name"
                            name="Name"

                            className="form-control empnda-name ndaviewmodecommon common_fullname_disable"
                            autoComplete="off"
                            disabled
                          />
                          <span className="floating-label ">
                            Employee Name<i className="required">*</i>
                          </span>
                        </div>

                        <div id="Ndawithoutdynamicnametwo"
                          style={{ display: "none" }}
                          className="form-group relative"
                        >
                          <input
                            type="text"
                            id="Name"
                            name="Name"
                            className="form-control ndaname-two ndavaluename namevaluenda"
                            autoComplete="off"
                            disabled
                          />
                          <span className="floating-label ">
                            Employee Name<i className="required">*</i>
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 signature_part">
                        <p> Employee Signature </p>
                      </div>
                    </div>

                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">

                          <select
                            id="surenmaenda2"
                            className=" form-control dropdownviewcommon"
                          >
                            <option value="Select">Select</option>
                            {Surname2}
                          </select>
                          <span className="floating-label ">Title <i className="required">*</i></span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-ndatitlesurename2"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>
                      <div className="col-md-4">

                        <div id="hide-authorized" className="form-group relative">
                          <input
                            type="text"
                            id="Authorized-signatory"
                            name="Name"

                            className="form-control  ndaviewmodecommon"
                            autoComplete="off"
                            disabled
                          />
                          <span className="floating-label ">
                            Authorized By <i className="required">*</i>
                          </span>
                        </div>


                        <div style={{ display: "none" }} id="show-edit-authorized" className="form-group relative">
                          <input
                            type="text"
                            id="Authorized-signatory-edit"
                            name="Name"

                            className="form-control  ndaviewmodecommon"
                            autoComplete="off"
                            disabled
                          />
                          <span className="floating-label ">
                            Authorized By <i className="required">*</i>
                          </span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-signatory"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        {/* <p> Authorized signatory for Company </p> */}
                      </div>
                      <div className="col-md-4 signature_part">
                        <p> Authorized signatory for company </p>
                      </div>
                    </div>
                  </div>
                  <div >
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
                          className="dashboard_submit_btn nda-submit"
                          type="submit"
                          onClick={() => this.SaveListItem()}
                        >
                          Submit
                        </button>
                        :

                        <button style={{ cursor: "no-drop" }}
                          className="dashboard_submit_btn nda-submit"
                          type="submit"
                        >
                          Submit
                        </button>
                      }


                      <button
                        id="Ndaitemidbtn"
                        style={{ display: "none" }}
                        className="dashboard_submit_btn "
                        type="submit"
                        onClick={() => this.updatelistitemnda()}
                      >
                        Update
                      </button>
                      <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnnda" type="submit" onClick={() => this.Printthis()}>Print</button>
                      {GlobalFormOpenedMode == "New" &&
                        <button id="btn-sign-nda" className="dashboard_submit_btn btn-cancel" type="reset">
                          <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                            Cancel
                          </a>
                        </button>
                      }

                      {GlobalFormOpenedMode == "Edit" &&
                        <button id="btn-hr-nda" className="dashboard_submit_btn btn-cancel" type="reset">
                          <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                            Cancel
                          </a>
                        </button>
                      }

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        <div id="dashboard_right-print-nda" style={{ display: "none" }}>
          <div className="all-item">
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
                <span> Employee non-disclosure agreement </span>
                <ul>
                  <li>Control Number: <b id="print-nda-Control-Number"></b></li>
                  <li>Version: <b id="print-nda-Version-Number"></b></li>
                </ul>

              </div>
            </div>
            <div className="emp_nondis_top">
              <div className="personal_info_part">
                <div className="endc_top_text print_report_jr">
                  <p className="print-topborder"> This Employee Non-Disclosure Agreement (the <span className="endc_agreement"> “Agreement” </span>) is dated
                    <span
                      style={{ display: "inline", marginLeft: "5px" }}
                      className="print-control print-nda-list-date ndaviewmodecommon"
                    />
                  </p>
                </div>
                <h3>  Parties </h3>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">

                      <span
                        id="print-surenmaenda"
                        className="print-control dropdownviewcommon"
                      >
                        {/* <option value="Select">Select</option>
                      {Surenamenda} */}
                      </span>
                      <span className="floating-label ">Title <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-ndatitlesurename"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="ndnamewithoutedit form-group relative">
                      <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={this.state.CurrentUserName}
                        className="form-control  ndaviewmodecommon common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Name<i className="required">*</i>
                      </span>
                    </div>

                    <div id="print-Ndawithoutdynamicname"
                      style={{ display: "none" }}
                      className="form-group relative"
                    >
                      <span
                        //    type="text"
                        id="Name"
                        //   name="Name"
                        className="print-control ndaname-one ndaname print-ndavaluename namevaluenda"
                      //  autoComplete="off"
                      />
                      <span className="floating-label ">
                        Name<i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-emp-name"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="National"
                        className="print-control print-ndanational ndaviewmodecommon"
                      >
                        {/* <option value="Select">Select</option>
                      {Allcountryname} */}
                      </span>
                      <span className="floating-label ">
                        Nationality <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-emp-national"
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
                        //   type="text"
                        id="PassportNo"
                        //   name="PassportNo"
                        className="print-control print-ndapassportno ndaviewmodecommon"
                      //  autoComplete="off"
                      />
                      <span className="floating-label ">
                        Passport No <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-passportNonda"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //type="text"
                        id="IndentificationNo"
                        // name="IndentificationNo"
                        className="print-control print-ndaifno ndaviewmodecommon"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Emirates ID No
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-indentificationnonda"
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
                        //  type="textarea"
                        id="Address"
                        //  name="Address"
                        className="print-control print-ndaaddress ndaviewmodecommon"
                      //  autoComplete="off"
                      />
                      <span className="floating-label ">
                        Address <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-address"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <p>

                  <span id="bussiness-text-size" className="print-bussinessndauint"><b>{officename}</b></span><span style={{ display: "none" }} className="print-dynamicbussinessndauint"> <b>{dynamicusername}</b></span> an entity  incorporated and registered in the United Arab Emirates whose registered office is at
                  <span id="print-address-business-unit">{DynamicAddress}</span>
                  <span style={{ display: "none" }} id="print-dynamicaddress-business-unit">{DynamicAddressnda}</span>
                  , for itself and on behalf of its Affiliates (the “Company”).{" "}
                </p>
              </div>
              <div className="emp-interest dashboard_right_text" id="NDAMaster">
                {/* <p id="ndadescriptionitem">{NDA}</p>
  <div className="ndadescitem" style={{display:"none"}} id="alldendaitem"></div> */}
                <div className="dashboard_right_text employee_non_disclosure_part">
                  <div className="padding_bottom_para">

                    <div className="emp_nondis_agree_background personal_info_part nda-print-section print-nda-background">
                      <h5> Background </h5>
                      <p className="padding_bottom_para">

                        Employee in the course of engagement, advisory or employment
                        with the Company, has, had or may continue to become aware of
                        and have access to certain proprietary and confidential
                        information belonging to the Company.
                      </p>
                      <p>
                        {" "}
                        Employee agrees that it may receive from Company the
                        Confidential Information (as defined below) in connection with
                        performance of its employment with the Company, which will
                        remain confidential according to the following terms and
                        conditions.{" "}
                      </p>
                    </div>
                    <div className="emp_nondis_agree_teams personal_info_part nda-print-section">

                      <h5 className="print-agreed-nda">  Agreed Terms </h5>
                      <div className="emp_nondis_agree_list">
                        <ul>
                          <li className="heading_li">
                            <p className="heading_number"> 1. </p>
                            <p className="heading_text"> Interpretation  </p>
                          </li>
                        </ul>

                        <div className="padding_left_text">
                          <ul>
                            <li className="emp_li padding_bottom_para">
                              <p className="number span_bold_text"> 1.1. </p>
                              <p className="text">
                                {" "}
                                The definitions and rules of interpretation in this clause
                                apply in this Agreement{" "}
                              </p>
                            </li>
                          </ul>
                          <p className="padding_bottom_para">
                            {" "}
                            <span className="span_bold_text">Affiliate(s):</span> means in
                            relation to the Comany, companies or entities in which
                            shareholder of Comany has shareholding or interest, directly
                            or indirectly of 49% or more, or has the right to exercise,
                            directly or indirectly 49% or more of the control, voting
                            rights, the power to direct or cause the direction of the
                            management and policies of such affiliate whether through the
                            ownership of voting securities, by agreement, power of
                            attorney or otherwise or the power to act as or elect the
                            manager, partners or other individuals exercising similar
                            authority.{" "}
                          </p>
                          <p className="span_bold_text padding_bottom_para">
                            {" "}
                            Confidential Information: has the meaning given in Clause 2.3.{" "}
                          </p>
                          <p className="padding_bottom_para">
                            {" "}
                            <span className="span_bold_text"> Data Room:</span> means the
                            electronic data room that the Company or one of its Affiliate
                            may make available to the Employee for the purpose of
                            disclosing certain Confidential Information under the terms of
                            this Agreement.
                          </p>
                          <p className="padding_bottom_para">
                            {" "}
                            <span className="span_bold_text">
                              Permitted Purpose:
                            </span>{" "}
                            means Employee evaluating the Confidential Information in
                            course of performance of its employment with the Company and
                            for a specific task assigned by its line manager{" "}
                          </p>
                          <p>
                            {" "}
                            <span className="span_bold_text">Personal Data:</span> means
                            any information relating to an identified or identifiable
                            natural person.{" "}
                          </p>
                          <ul>
                            <li className="emp_li">
                              <p className="number"> 1.2. </p>
                              <p className="text">
                                {" "}
                                Clause and schedule headings do not affect the
                                interpretation of this agreement.{" "}
                              </p>
                            </li>
                            <li className="emp_li">
                              <p className="number"> 1.3. </p>
                              <p className="text">
                                {" "}
                                A person includes an entity or a corporate or
                                unincorporated body.{" "}
                              </p>
                            </li>
                            <li className="emp_li print-inter-nga">
                              <p className="number"> 1.4. </p>
                              <p className="text">
                                {" "}
                                A reference to a law is a reference to it as it is in
                                force for the time being, taking account of any amendment,
                                extension, application or re-enactment and includes any
                                subordinate legislation for the time being in force made
                                under it.{" "}
                              </p>
                            </li>
                            <li className="emp_li">
                              <p className="number"> 1.5. </p>
                              <p className="text">
                                <b>Writing</b> or <b>written</b> includes faxes and e-mail.{" "}
                              </p>
                            </li>
                            <li className="emp_li">
                              <p className="number"> 1.6. </p>
                              <p className="text">
                                {" "}
                                Words in the singular include the plural and in plural
                                include the singular.{" "}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="padding_bottom_para emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li print-obli-nda">
                          <p className="heading_number"> 2. </p>
                          <p className="heading_text"> Employee Obligations  </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <p>
                          {" "}
                          From time to time, the Company may disclose Confidential
                          Information to the Employee. The Employee will: (a) not
                          disclose any of the Confidential Information to any third
                          party whatsoever, unless directed to do so in writing by an
                          authorized representative of the Company; and (b) shall keep
                          all Confidential Information strictly confidential.{" "}
                        </p>
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 2.1. </p>
                            <p className="text">
                              {" "}
                              In return for the Company making Confidential Information
                              available to the Employee, the Employee undertakes to keep
                              the Confidential Information confidential and shall not
                              except as otherwise expressly provided herein:{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding3">
                            <p className="number"> 2.1.1. </p>
                            <p className="text">
                              {" "}
                              use or exploit the Confidential Information except in
                              connection with the Permitted Purpose; or{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding3">
                            <p className="number"> 2.1.2. </p>
                            <p className="text"> disclose to any person: </p>
                          </li>
                          <li className="emp_li emp_padding4">
                            <p className="number"> 2.1.2.1. </p>
                            <p className="text">
                              {" "}
                              in whole or in part any portion of the Confidential
                              Information;{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding4">
                            <p className="number"> 2.1.2.2. </p>
                            <p className="text">
                              {" "}
                              any terms of the Permitted Purpose;{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding4">
                            <p className="number"> 2.1.2.3. </p>
                            <p className="text">
                              {" "}
                              not copy, reduce to writing or otherwise record the
                              Confidential Information except as strictly necessary for
                              the Permitted Purpose. All Confidential Information and
                              any such copies, reductions to writing and records shall
                              be the property of the Company and its Affiliates; or{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding4">
                            <p className="number"> 2.1.2.4. </p>
                            <p className="text">
                              {" "}
                              the fact that the Confidential Information has been made
                              available.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 2.2. </p>
                            <p className="text">
                              {" "}
                              The Employee shall establish and maintain adequate
                              security measures (including any reasonable security
                              measures proposed by the Company from time to time) to
                              safeguard the Confidential Information from unauthorized
                              access or use, which the Employee warrants as providing
                              adequate protection from theft, damage, loss, unauthorized
                              disclosure, copying or use.{" "}
                            </p>
                          </li>
                          <li className="emp_li emp-span">
                            <p className="number"> 2.3. </p>
                            <p className="text">

                              <span className="span_bold_text">

                                Confidential Information Means:{" "}
                              </span>
                              All information in whatever form (including, without
                              limitation, in written, oral, visual or electronic form,
                              or any other way of representing or recording information
                              which contains or is derived or copied from such
                              information in each case which is confidential or
                              proprietary in nature) that is made available in the Data
                              Room or disclosed to the Employee or on behalf of the
                              Company, including without limitation any trade secret,
                              technique, strategy, component, concept, program, report,
                              study, memorandum, correspondence, documentation,
                              information, manual, record, data, technology, product,
                              plan, design, procedure, method, invention, operations,
                              processes, know-how, sample, notes, summaries, analyses,
                              compilations, Personal Data and other writings, cell lines
                              and procedures and formulations for producing any such
                              sample, medium, and / or cell line, process, formula or
                              test data relating to any research project, work in
                              progress, future development, engineering, manufacturing,
                              marketing, pricing, billing, servicing, financing,
                              personnel matter, its present or future products, sales,
                              suppliers, clients, customers, employees, investors, or
                              any other information which the Company has previously
                              provided or provides to the Employee, whether or not


                              <span className="print-info-nda">such information is identified as such by an appropriate stamp
                                or marking and whether in existence at the date hereof or
                                hereafter to come into existence, or any information
                                obtained by the Employee through inspection or observation
                                of the properties, facilities or operations of Company.</span>{" "}
                            </p>
                          </li>
                          <li className="emp_li emp-conf-span" >
                            <p className="number print-nda-confidential"> 2.4. </p>
                            <p className="text">
                              <span>
                                Use of Confidential Information
                              </span>
                              The Employee agrees to use
                              the Confidential Information solely in connection with the
                              Permitted Purpose and not for any purpose other than as
                              authorized by this Agreement without the prior written
                              consent of an authorized representative of the Company. No
                              other right or license, whether expressed or implied, in
                              the Confidential Information is granted to the Employee
                              hereunder. Title to the Confidential Information and its
                              consequential work product will remain solely in the
                              Company. All use of Confidential Information by the
                              Employee shall be for the benefit of the Company and any
                              modifications and improvements thereof by the Employee
                              shall be the sole property of the Company.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 3. </p>
                          <p className="heading_text">Continuting Obligations </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <p>
                          The Obligations contained in this Agreement shall continue endlessly after the employee has ceased to be an employee with the company ("Term")
                        </p>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 4. </p>
                          <p className="heading_text">
                            {" "}
                            Non-Circumvention And Non-Solicitation
                          </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 4.1. </p>
                            <p className="text">
                              {" "}
                              During the Term of this Agreement, it is expressly agreed
                              that opportunities identified by the Company or its
                              Affiliates and disclosed to the Employee as well as the
                              identities of an individual or entity and any other third
                              parties made available by Company to the Employee shall
                              constitute Confidential Information and Employee shall not
                              (without the prior written consent of the Company):{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding3">
                            <p className="number"> 4.1.1. </p>
                            <p className="text">
                              {" "}
                              directly or indirectly engage with, initiate, solicit,
                              negotiate, contract or enter into any business
                              transactions, agreements or undertakings with any such
                              third party identified and introduced by Company or its
                              Affiliates; or{" "}
                            </p>
                          </li>
                          <li className="emp_li emp_padding3">
                            <p className="number"> 4.1.2. </p>
                            <p className="text">
                              {" "}
                              seek to by-pass, compete, avoid or circumvent Company or
                              its Affiliates to pursue similar opportunities by
                              utilising any Confidential Information or by otherwise
                              exploiting or deriving any benefit from the Confidential
                              Information.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 5. </p>
                          <p className="heading_text"> Whole Agreement And Conduct  </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <p>
                          {" "}
                          This Agreement is the whole agreement between the Parties and
                          supersedes any arrangements, understanding or previous
                          agreement between them relating to the subject matter covered
                          by this Agreement.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 6. </p>
                          <p className="heading_text">
                            {" "}
                            Third Party Rights And Intellectual Property
                          </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <p>
                          {" "}
                          Company reserves all rights in its Confidential Information
                          and none of the Confidential Information or any derivative
                          work product or compilation is the property of the Employee.
                          The disclosure to the Employee of any Confidential Information
                          shall not give the Employee any license or other rights
                          whatsoever in respect of any part of such Confidential
                          Information.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 7. </p>
                          <p className="heading_text"> Servance  </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 7.1. </p>
                            <p className="text">
                              {" "}
                              If any court or administrative body of competent
                              jurisdiction finds any provision of this agreement to be
                              invalid, unenforceable or illegal, the other provisions of
                              this Agreement shall remain in force.{" "}
                            </p>
                          </li>
                          <li className="emp_li print-servance">
                            <p className="number"> 7.2. </p>
                            <p className="text">
                              {" "}
                              If any invalid, unenforceable or illegal provision would
                              be valid, enforceable or legal if some part of it were
                              deleted, the provision shall apply with whatever
                              modification is necessary to make it valid, enforceable
                              and legal.{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part  nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 8. </p>
                          <p className="heading_text"> Variation And Waiver </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 8.1. </p>
                            <p className="text">
                              {" "}
                              Any variation, amendment or modification of this Agreement
                              shall be in writing and signed by or on behalf of Parties.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 8.2. </p>
                            <p className="text">
                              {" "}
                              No failure to exercise or delay in exercising any right or
                              remedy provided under this Agreement or by law constitutes
                              a waiver of such right or remedy or will prevent any
                              future exercise in whole or in part thereof.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 8.3. </p>
                            <p className="text">
                              {" "}
                              No single or partial exercise of any right or remedy under
                              this Agreement shall preclude or restrict the further
                              exercise of any such right or remedy{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 9. </p>
                          <p className="heading_text"> Counterparts  </p>
                        </li>
                      </ul>
                      <div className="padding_left_text">
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 9.1. </p>
                            <p className="text">
                              {" "}
                              This Agreement may be entered into in any number of
                              counterparts, and by the Parties on different
                              counterparts, each of which, when executed and delivered,
                              shall be an original, but all the counterparts shall
                              together constitute one and the same agreement.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 9.2. </p>
                            <p className="text">
                              {" "}
                              Transmission of an executed counterpart of this Agreement
                              or the executed signature page of a counterpart of this
                              Agreement by email shall take effect as delivery of an
                              executed counterpart of this Agreement.{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 10. </p>
                          <p className="heading_text"> Language </p>
                        </li>
                      </ul>
                      <div className="padding_left_text padding_left_txt">
                        <ul>
                          <li className="emp_li">
                            <p className="number"> 10.1. </p>
                            <p className="text">
                              {" "}
                              If this Agreement is translated, the English language text
                              shall prevail.{" "}
                            </p>
                          </li>
                          <li className="emp_li">
                            <p className="number"> 10.2. </p>
                            <p className="text">
                              {" "}
                              Any other document provided in connection with this
                              Agreement shall be in English, or there shall be a
                              properly prepared translation into English and the English
                              translation shall prevail in the case of any conflict
                              between them.{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="padding_bottom_para  emp_nondis_agree_list personal_info_part nda-print-section">
                      <ul>
                        <li className="heading_li">
                          <p className="heading_number"> 11. </p>
                          <p className="heading_text">
                            {" "}
                            Governing Law And Jurisdiction
                          </p>
                        </li>
                      </ul>
                      <div className="padding_left_text padding_left_txt">
                        <p>
                          {" "}
                          Any dispute arising out of the formation, performance,
                          interpretation, nullification, termination or invalidation of
                          this Agreement or arising therefrom or related thereto in any
                          manner whatsoever including the validity of this Agreement,
                          shall be resolved by Dubai International Arbitration Centre
                          (DIAC Rules) and the laws of England and Wales shall be
                          applicable to all such arbitrations. The Parties to the
                          dispute shall mutually appoint a sole arbitrator. In the event
                          the Parties fail to appoint the sole arbitrator within 30 days
                          from the date of referral of the dispute to arbitration, then
                          the sole arbitrator shall be appointed in accordance with the
                          DIAC Rules. The seat of arbitration shall be at Dubai
                          International Financial Center (DIFC-DIAC), Any judgement or
                          order reserved by the DIAC shall be final and binding upon the
                          Parties, without raising any conflicts or discrepancies over
                          its enforceability in a foreign jurisdiction. Each Party
                          waives any objection which it may have based on lack of
                          personal jurisdiction, improper venue or forum non convenience
                          to the conduct of any proceeding in any such court and waives
                          personal service of any and all process upon it..
                        </p>
                        <p className="print-nda-row">This Agreement has been entered into on the date stated at the beginning of it.</p>


                      </div>

                      <div className="row form">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <span
                              id="print-surenmaenda1"
                              className="print-control dropdownviewcommon"
                            >
                              {/* <option value="Select">Select</option>
                            {Surname1} */}
                            </span>
                            <span className="floating-label ">Title <i className="required">*</i></span>
                          </div>
                          {/* <span
                            className="error-validation"
                            id="err-ndatitlesurename1"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                        </div>
                        <div className="col-md-4">
                          <div className="print-ndnamewithoutedit form-group relative">
                            <input
                              type="text"
                              id="Name"
                              name="Name"

                              className="form-control empnda-name ndaviewmodecommon common_fullname_disable"
                              autoComplete="off"
                            />
                            <span className="floating-label ">
                              Employee Name<i className="required">*</i>
                            </span>
                          </div>

                          <div id="print-Ndawithoutdynamicnametwo"
                            style={{ display: "none" }}
                            className="form-group relative"
                          >
                            <span
                              // type="text"
                              id="Name"
                              // name="Name"
                              className="print-control ndaname-two print-ndavaluename namevaluenda"
                            // autoComplete="off"
                            />
                            <span className="floating-label ">
                              Employee Name<i className="required">*</i>
                            </span>
                          </div>
                        </div>
                        {/* <div className="col-md-4 signature_part">
                          <p> Employee Signature </p>
                        </div> */}
                      </div>

                      <div className="row form">
                        <div className="signature-new-wrap">
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div className="form-check" style={{ border: "0px" }}>
                                <span className="form-check-label">Signature of Employeee</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row form print-nda-form">
                        <div className="col-md-4">
                          <div className="form-group  relative">

                            <span
                              id="print-surenmaenda2"
                              className="print-control dropdownviewcommon"
                            >
                              {/* <option value="Select">Select</option>
                            {Surname2} */}
                            </span>
                            <span className="floating-label ">Title <i className="required">*</i></span>
                          </div>
                          {/* <span
                            className="error-validation"
                            id="err-ndatitlesurename2"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                        </div>
                        <div className="col-md-4">

                          <div className="form-group relative">
                            <span
                              // type="text"
                              id="print-Authorized-signatory"
                              //  name="Name"

                              className="print-control  ndaviewmodecommon"
                            // autoComplete="off"
                            />
                            <span className="floating-label ">
                              Authorized By <i className="required">*</i>
                            </span>
                          </div>
                          {/* <span
                            className="error-validation"
                            id="err-signatory"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}

                        </div>

                      </div>
                      <div className="row form">
                        <div className="signature-new-wrap">
                          <div className="employee-signature">
                            <div className="form-group relative">
                              <div style={{ border: "0px" }} className="form-check">
                                <span style={{ whiteSpace: "nowrap" }} className="form-check-label">Authorized signatory for company</span>
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
            </div>

          </div>
        </div>
      </>
    );
  }
}
