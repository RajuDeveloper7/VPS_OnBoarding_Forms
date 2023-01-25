import * as React from "react";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { escape, random } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import LogoMaster from "./LogoMaster";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import * as moment from "moment";
import swal from "sweetalert";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { IFieldInfo } from "@pnp/sp/fields/types";

var AttachmentUploaderStatusArray = [];
var AttachmentUploaderStatusArrayValidator = [];
var AttachmentEditUserfullName = "";
var EditSessionid: string;
var GlobalSessionIDValue = "";
let Childrencounter = 2;
var qualificationcounter = 2;
var EmploymentHistorycounter = 2;
var ResearchPublicationDetailscounter = 2;
var EmployeeReferenceDetailscounter = 2;
var EmergencyContactPersonInUAEcounter = 2;
var EmergencyContactPersonOutsideUAE = 2;
var AttachmentURL = "";
var imgsrcpersonalimg = "";
var personallistid: number;
// var ParentID=12;
var resumeurl = "";
var photourl = "";
var passportfronturl = "";
var passportbackurl = "";
var Previousvisaurl = "";
var PreviousemiratesIDurl = "";
var Insurancecontinuityletterurl = "";
var Sponsorpassportvisaurl = "";
var PGdegreeurl = "";
var UGdegreeurl = "";
var Highersecondaryurl = "";
var Highschoolurl = "";
var allexpurl = "";
var Currentdisplaynames = "";
var licencefile = "";
var FormID1: number;
var FormID2: number;
var FormID3: number;
var FormID4: number;
var FilterPerosnalitemid: number;

var norelativestatus = ''
var LicenseTypeprint = ''
var Relative1 = ''
var Relative2 = ''
var Relative3 = ''
var Relative4 = ''
var Relative5 = ''
var Relative6 = ''
var Relative7 = ''


export interface IPersonalDataFormNewState {
  childrenRequested: any;
  CustomTableData: any;
  CustomTableData2: any;
  CustomTableData3: any;
  CustomTableData4: any;
  CustomTableData5: any;
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  Dynamiclogo: any[];
  countrynames: any[];
  countrycode: any[];
  selectedOption1: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  BloodGroupitem: any[];
  lastname: any[];
  firstname: any[];
  Titlesurname: any[];
  IsEmployee: boolean;
  IsUnitHR: boolean;
  IsGroupHR: boolean;
  IsHeadHR: boolean;
  UnitHrUnitDetails: string;
  GroupHRUnitDetails: string;
  EmployeeCategory: any[];
  Religiondata: any[];
  SponserNamesData: any[];
  ONBSessionID: string;

  LOASubmissionStatus: string;
  COCSubmissionStatus: string;
  NDASubmissionStatus: string;
  SpecimenSubmissionStatus: string;
  COISubmissionStatus: string;
  PersonalInfoSubmissionStatus: string;
  JoiningReportSubmissionStatus: string;
  PolicyAckandDeclarationSubmissionStatus: string;
  AckPolicyGeneralITSubmissionStatus: string;
  UniformBankReqSubmissionStatus: string;
  EphyProfileSubmissionStatus: string;
  isloadingdone: boolean;
  Globalmode: string;
  AttachmentUploaderStatusArray: any[];
  HrCompleteStatus: boolean;
}
var GlobalModes = "";
var GlobalFormOpenedMode = "New";
var officename = "";
var officlelastname = "";
var officeFirstname = "";
var LogoUrl;
let PersonalItemId;
var ImageSrcpersonal = "";
var Mode;
var personalMode;
var coutryoptionname;
var previousoptionname;
var academiccountry;
var maritalnationality;
var fathernationality;
var mothernationality;
var AvailableCountries;
var EmployeeEditviewName;
var businessdynamicuserunit = "";
var TotalProfessionalRowlength = 5;
var RemainingProfessionallength = 0;
var nationalfile;

var printallexpurl = "";
var printlicencefile = "";
var printHighschoolurl = "";
var printHighersecondaryurl = "";
var printUGdegreeurl = "";
var printPGdegreeurl = "";
var printSponsorpassportvisaurl = "";
var printInsurancecontinuityletterurl = "";
var printPreviousemiratesIDurl = "";
var printPreviousvisaurl = "";
var printpassportbackurl = "";
var printpassportfronturl = '';
var printresumeurl = "";
var printphotourl = "";

var ControlNumber: any[]
var VersionNumber: any[]
var FormControlNumber: any[]
var FormVersionNumber: any[]
var personlVersionNumber;
var personalControlNumber;

const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class PersonalDataFormNew extends React.Component<
  IHrOnboardingFormProps,
  IPersonalDataFormNewState,
  {}
> {
  constructor(props: IHrOnboardingFormProps) {
    super(props);

    this.state = {
      childrenRequested: [],
      CustomTableData: "",
      CustomTableData2: "",
      CustomTableData3: "",
      CustomTableData4: "",
      CustomTableData5: "",
      CurrentUserName: [],
      lastname: [],
      firstname: [],
      CurrentUserDesignation: [],
      Dynamiclogo: [],
      countrynames: [],
      countrycode: [],
      selectedOption1: null,
      selectedOption2: null,
      selectedOption3: null,
      selectedOption4: null,
      selectedOption5: null,
      selectedOption6: null,
      BloodGroupitem: [],
      Titlesurname: [],
      IsEmployee: true,
      IsUnitHR: false,
      IsGroupHR: false,
      IsHeadHR: false,
      UnitHrUnitDetails: "",
      GroupHRUnitDetails: "",
      EmployeeCategory: [],
      Religiondata: [],
      SponserNamesData: [],
      ONBSessionID: "",
      isloadingdone: false,
      Globalmode: "",

      LOASubmissionStatus: "Inprogress",
      COCSubmissionStatus: "Inprogress",
      NDASubmissionStatus: "Inprogress",
      SpecimenSubmissionStatus: "Inprogress",
      COISubmissionStatus: "Inprogress",
      PersonalInfoSubmissionStatus: "Inprogress",
      JoiningReportSubmissionStatus: "Inprogress",
      PolicyAckandDeclarationSubmissionStatus: "Inprogress",
      AckPolicyGeneralITSubmissionStatus: "Inprogress",
      UniformBankReqSubmissionStatus: "Inprogress",
      EphyProfileSubmissionStatus: "Inprogress",
      AttachmentUploaderStatusArray: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    const url: any = new URL(window.location.href);
    PersonalItemId = url.searchParams.get("PersonalItemID");
    Mode = url.searchParams.get("PIFMode");
    personalMode = url.searchParams.get("PIFMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalModes = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");
    this.GetCurrentUserDetails();
    this.LoadSPListSupportingDatas();
    $("#tble-txt-child-emirate-no").val("784");

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
    $("#txt-current-date").val(moment().format("YYYY-MM-DD"));

    // $(".currentdate").val(moment().format("YYYY-MM-DD"));
    $("#Employeename1").prop("disabled", true);

    if (GlobalFormOpenedMode == "View") {
      $("btn-hr-editviewpage-personal").show();
      $("btn-employe-newpage").show();
      $(".print-btnpersonal").show();
      $(".personalviewclasscommom").prop("disabled", true);
      $("#Cousin").prop("disabled", true);
      $(".hr-dashboard-nextlink").show();
      $(`.personal-Update`).hide();
      $("input").prop("disabled", true);
      $("textarea").prop("disabled", true);
      $(".Add-new-personal").hide();
      $(`.personal-submit`).hide();
      $("#password-show").show();
      $("#password-hide").hide();
      this.GetpersonalviewidItem(PersonalItemId);
      this.GetpersonalviewidItemForPrint(PersonalItemId);
    } else if (GlobalFormOpenedMode == "Edit") {
      $("btn-hr-editviewpage-personal").show();
      $("btn-employe-newpage").show();
      $(".hr-dashboard-nextlink").show();
      $(`.personal-Update`).show();
      $("#txt-current-date").prop("disabled", false);
      //$("input").prop("disabled", false);
      $(`.personal-submit`).hide();
      $("#password-show").show();
      $("#password-hide").hide();
      this.GetpersonaleditidItem(PersonalItemId);
    }
    setTimeout(() => {
      $("html").css("visibility", "visible");
    }, 1000);
  }

  public async GetpersonalviewidItemForPrint(ID) {

    $(`#print-Dynamicimgpersonal`).hide();
    $(`#print-imgpersonalitemid`).show();

    await newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "ID",
        "FullName",
        "PlaceofBirth",
        "DateofBirth",
        "CurrentNationality",
        "PreviousNationality",
        "Religion",
        "Section",
        "Entered",
        "MiddleName",
        "Port",
        "ContactNumber",
        "SponsorName",
        "DocumentNo",
        "PlaceofIssue ",
        "DateofIssue ",
        "DateofExpiry",
        "ResidenceNo",
        "Academic ",
        "Qualification",
        "DateofQualification ",
        "Country",
        "Languages",
        "MaritalStatus",
        "BloodGroup",
        "NameofSpouse",
        "Nationality21",
        "PlaceofBirth2",
        "DateofBirth2",
        "PlaceofWork",
        "FathersName",
        "Nationality4",
        "PlaceofBirth3",
        "DateofBirth3",
        "HomeAddress3",
        "Occupation2",
        "Occupation3",
        "MothersName",
        "Nationality4",
        "PlaceofBirth4",
        "DateofBirth4",
        "HomeAddress4",
        "Occupation4",
        "CountryNumber",
        "EmailID",
        "jobappliedfor",
        "NameofCompany",
        "Position",
        "WorkLocation",
        "Emirate",
        "Street",
        "Owner",
        "FlatNo",
        "Plot",
        "PostBox",
        "TelephoneNo",
        "MobileNo",
        "LicenseNo",
        "IssueDate",
        "ExpiryDate",
        "NewRegistration",
        "UserName",
        "Password",
        "DrivingLicenseNo",
        "PlateNo",
        "dataflowNO",
        "Friend",
        "AnyOtherCloseRelative",
        "NoRelative",
        "Cousin",
        "Sister",
        "Borther",
        "LastName",
        "FirstName",
        "SurName",
        "Category",
        "HaveyoueverApplied",
        "LicenseType",
        "Author",
        "Gender",
        "Nationality3",
        "RelativeName",
        "Author/Id",
        "countrycodemobileno",
        "Countrycodesecondsection",
        "Countrycodefirstsection",
        "Spouse",
        "Provethesame",
        "AttachmentEmployeeFullName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber",
        "NewUserBloodGroup",
        "EmployeeStatus"
      )
      .filter(`ONBSessionID eq '${GlobalSessionIDValue}'`)
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {

          if ($(".dataflowYes").is(":checked")) {
            $(".ifdataflow-yes").show();
          } else {
            $(".ifdataflow-yes").hide();
          }
          this.GetPersonaldocumentlibrarydataforprint(result[0].AttachmentEmployeeFullName);
          Relative1 = result[0].Spouse
          Relative2 = result[0].Sister
          Relative3 = result[0].Borther
          Relative4 = result[0].Friend
          Relative6 = result[0].AnyOtherCloseRelative
          Relative5 = result[0].Cousin
          norelativestatus = result[0].NoRelative
          $("#print-childlist-tr").hide();
          $("#print-Universityqualification-tr").hide();
          $("#print-employmenthistory-tr").hide();
          $("#print-Research-tr").hide();
          $("#print-empreference-tr").hide();
          $("#print-emergency-tr").hide();
          $("#print-outside-tr").hide();
          $("#print-friend-relative-tr").hide();
          // $(".firstnamecurrent").hide();
          // $(".Lastnamenamecurrent").hide();
          // $(".firstnamedynamic").show();
          // $(".Lastnamenamedynamic").show();
          $("#print-provide-the-same").text(result[0].Provethesame);

          $("#print-RelativeName").text(result[0].RelativeName),

            EmployeeEditviewName = result[0].FullName;
          businessdynamicuserunit = result[0].BusinessUnit;

          $("#print-Control-Number").text(result[0].ControlNumber);
          $("#print-Version-Number").text(result[0].VersionNumber),

            $("#print-personal-blood-group").text(result[0].NewUserBloodGroup);

          $(".print-empnamepersonal111").text(result[0].FullName);
          $("#print-PersonalGender").text(result[0].Gender),
            $(".print-empfirstname").text(result[0].FirstName);
          $(".print-personalLastname").text(result[0].LastName);
          setTimeout(() => {
            $(".print-surename-personal").text(result[0].SurName);
            $(`.print-Current-Nationality`).text(result[0].CurrentNationality);
            $(`.print-Previous-Nationality`).text(result[0].PreviousNationality);
            $("#print-EmployeeCategory").text(result[0].Category);
          }, 2500);


          var value1 = result[0].ContactNumber;
          // var contactall = value1.split("-");

          $(`.print-contactnumbers`).text(result[0].ContactNumber);
          $("#print-country-code").text(result[0].Countrycodefirstsection);


          var value3 = result[0].CountryNumber;
          // var contactall2 = value3.split("-");

          $(`.print-CountrysNumbers`).text(result[0].CountryNumber);
          $("#print-country-codehomecountry").text(result[0].Countrycodesecondsection);


          if (result[0].countrycodemobileno == "" || result[0].countrycodemobileno == "null" || result[0].countrycodemobileno == null || result[0].countrycodemobileno == undefined) {
            $(`#print-country-codeMobileNo`).text("-");
          } else {
            $(`#print-country-codeMobileNo`).text(result[0].countrycodemobileno);
          }


          if (result[0].MobileNo == "" || result[0].MobileNo == "null" || result[0].MobileNo == null || result[0].MobileNo == undefined) {
            $(`.print-MobileNos`).text("-");
          } else {
            $(`.print-MobileNos`).text(result[0].MobileNo);
          }
          //$("#EmployeeCategory").val(result.Category);
          //$(`.Current-Nationality`).val(result.CurrentNationality);
          //$(`.Previous-Nationality`).val(result.PreviousNationality);
          setTimeout(() => {
            // if (result[0].MaritalStatus == "Single") {
            //   $("#print-MaritalStatus option[value='Single']").attr("selected", "selected")
            // } else if (result[0].MaritalStatus == "Married") {
            //   $("#print-MaritalStatus option[value='Married']").attr("selected", "selected")
            // } else {
            //   $("#print-MaritalStatus option[value='Seperated']").attr("selected", "selected")
            // }
            $("#print-MaritalStatus").text(result[0].MaritalStatus);
          }, 3000);


          var newreg = result[0].NewRegistration;
          if (newreg == "Yes") {

            // $("#print-NewRegistration").attr('checked', 'checked');
            $("#print-NewRegistration").text("New Registration");
          } else {
            $("#Print-new-reg").remove()
          }

          if (result[0].HaveyoueverApplied == "Yes") {
            //  $(".print-YesHaveyoueverapplied").attr('checked', 'checked');
            $(".print-YesHaveyoueverapplied").text("Yes");
            $(`.print-Company-name-position`).show();
          } else {
            // $(".print-noHaveyoueverapplied").attr('checked', 'checked');
            $(".print-YesHaveyoueverapplied").text("No");;
            $(`.print-Company-name-position`).hide();

          }
          // I hereby declare the following employees that are related to me who are working with Burjeel Holdings
          if (result[0].Spouse == "Yes") {

            // $("#print-spouse").attr('checked', 'checked');
            $("#print-spouse").text("Spouse");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-spouse-div").hide()
          }

          if (result[0].Sister == "Yes") {

            //  $("#print-Sister").attr('checked', 'checked');
            $("#print-Sister").text("Sister");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-Sister-div").hide()
          }

          if (result[0].Borther == "Yes") {

            //  $("#print-Brother").attr('checked', 'checked');
            $("#print-Brother").text("Brother");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-Borther-div").hide()
          }

          if (result[0].Friend == "Yes") {

            // $("#print-Friend").attr('checked', 'checked');
            $("#print-Friend").text("Friend");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-Friend-div").hide()
          }
          if (result[0].Cousin == "Yes") {
            //$("#print-Cousin").attr('checked', 'checked');

            $("#print-Cousin").text("Cousin");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-Cousin-div").hide()
          }

          if (result[0].AnyOtherCloseRelative == "Yes") {

            // $("#print-AnyOtherCloseRelative").attr('checked', 'checked');
            $("#print-AnyOtherCloseRelative").text("Any Other Close Relative");
            $("#if-no-relative-hide").show();
          } else {
            $("#print-AnyOtherCloseRelative-div").hide()
          }
          if (result[0].NoRelative == "Yes") {
            //$("#print-NoRelative").attr('checked', 'checked');
            $("#print-NoRelative").text("No Relative");


            //  $("#if-no-relative-hide").hide()
            $("#if-no-relative-hide").remove()
            $(".Dynamic-add-class").addClass(".print-ifrelativetableisnotpresent-attachments")
          }


          if (result[0].Spouse != "Yes" && result[0].Sister != "Yes" && result[0].Borther != "Yes" && result[0].Friend != "Yes" && result[0].Cousin != "Yes" && result[0].AnyOtherCloseRelative != "Yes" && result[0].NoRelative != "Yes") {
            $("#if-no-relative-hide").remove()
          }
          if (result[0].dataflowNO == "Yes") {
            // $(".print-dataflowYes").attr('checked', 'checked');
            $(".print-dataflowYes").text("Yes");
            $(".ifdataflow-yes").show();
          } else if (result[0].dataflowNO == "No") {
            // Nothing is Selected $(".print-dataflowno").attr('checked', 'checked');
            $(".print-dataflowYes").text("No");
          } else {
            $(".print-dataflowYes").text("-");
          }
          LicenseTypeprint = result[0].LicenseType
          if (result[0].LicenseType == "DOH") {
            // $("#print-Doh-license").attr('checked', 'checked');
            $(".dohpasskey-kindaly-provide").show()
            $(".moh-dha-Attachment-hide-show").hide()
            // $("#dha-mha-remove").remove()
            $("#print-Doh-license").text("DOH");
          } else if (result[0].LicenseType == "MOH") {
            //$("#print-Moh-license").attr('checked', 'checked');
            $("#print-Doh-license").text("MOH");
            $("#doh-remove").remove()
            $(".dohpasskey-kindaly-provide").hide()
            $(".moh-dha-Attachment-hide-show").show()
          } else if (result[0].LicenseType == "DHA") {
            $("#doh-remove").remove()
            $("#print-Dha-license").attr('checked', 'checked');
            $("#print-Doh-license").text("DHA");
            $(".dohpasskey-kindaly-provide").hide()
            $(".moh-dha-Attachment-hide-show").show()
          } else if (result[0].LicenseType == "No") {
            $("#print-Doh-license").text(" ");
            $(".dohpasskey-kindaly-provide").hide()
            $(".moh-dha-Attachment-hide-show").hide()
            $("#doh-remove").remove()
            $("#dha-mha-remove").remove()
          }


          if (result[0].SponsorName == "Select") {
            $(`.print-SponsorNames`).text("-");
          } else {
            $(`.print-SponsorNames`).text(result[0].SponsorName);
          }
          if (result[0].BloodGroup == "" || result[0].BloodGroup == 'null' || result[0].BloodGroup == null || result[0].BloodGroup == undefined) {
            $(`.print-bloodgroups`).text("-");

          } else {
            $(`.print-bloodgroups`).text(result[0].BloodGroup);
          }
          setTimeout(() => {
            $(`.print-religions`).text(result[0].Religion);
          }, 3000);

          if (result[0].Nationality21 == "" || result[0].Nationality21 == 'null' || result[0].Nationality21 == null || result[0].Nationality21 == undefined) {
            $(`.print-Nationalitys2`).text("-");

          } else {
            $(`.print-Nationalitys2`).text(result[0].Nationality21);
          }

          // $(".personaltitleitemid").attr("style", "color:#00A36C");
          $(".print-personalvalue").text(result[0].FullName),
            $(`.print-pob`).text(result[0].PlaceofBirth);
          $(`.print-dob`).text(result[0].DateofBirth != 'Invalid date' ? moment(result[0].DateofBirth).format("DD-MM-YYYY") : "");
          $("#print-PersonalMiddleName").text(result[0].MiddleName);

          $(`.print-sections`).text(result[0].Section);
          $(`.print-entereds`).text(result[0].Entered != 'Invalid date' ? moment(result[0].Entered).format("DD-MM-YYYY") : "");
          $(`.print-ports`).text(result[0].Port);

          $(`.print-documentnos`).text(result[0].DocumentNo);
          $(`.print-pos`).text(result[0].PlaceofIssue);
          $(`#print-DateofIssue`).text(result[0].DateofIssue != 'Invalid date' ? moment(result[0].DateofIssue).format("DD-MM-YYYY") : "");
          //  $(`#print-DateofExpiry`).text(result[0].DateofExpiry != 'Invalid date' ? moment(result[0].DateofExpiry).format("DD-MM-YYYY"):"");
          $(`.print-residenceNos`).text(result[0].ResidenceNo);
          if (result[0].DateofExpiry == 'Invalid date' || result[0].DateofExpiry == '' || result[0].DateofExpiry == 'null' || result[0].DateofExpiry == null || result[0].DateofExpiry == undefined) {
            $(`#print-DateofExpiry`).text("-")
          } else {
            $(`#print-DateofExpiry`).text(moment(result[0].DateofExpiry).format("DD-MM-YYYY"))
          }
          if (result[0].NameofSpouse == '' || result[0].NameofSpouse == 'null' || result[0].NameofSpouse == null || result[0].NameofSpouse == undefined) {
            $(`.print-nos`).text("-")
          } else {
            $(`.print-nos`).text(result[0].NameofSpouse)
          }
          // $(`.print-nos`).text(result[0].NameofSpouse),
          if (result[0].PlaceofBirth2 == "" || result[0].PlaceofBirth2 == 'null' || result[0].PlaceofBirth2 == null || result[0].PlaceofBirth2 == undefined) {
            $(`.print-pob2`).text("-")
          } else {
            $(`.print-pob2`).text(result[0].PlaceofBirth2)
          }

          if (result[0].DateofBirth2 == 'Invalid date' || result[0].DateofBirth2 == "" || result[0].DateofBirth2 == 'null' || result[0].DateofBirth2 == null || result[0].DateofBirth2 == undefined) {
            $(`.print-dob2`).text("-")
          } else {

            $(`.print-dob2`).text(moment(result[0].DateofBirth2).format("DD-MM-YYYY"));
          }
          if (result[0].PlaceofWork == "" || result[0].PlaceofWork == 'null' || result[0].PlaceofWork == null || result[0].PlaceofWork == undefined) {
            $(`.print-pow`).text("-")
          } else {
            $(`.print-pow`).text(result[0].PlaceofWork)
          }

          if (result[0].Occupation2 == "" || result[0].Occupation2 == 'null' || result[0].Occupation2 == null || result[0].Occupation2 == undefined) {
            $(`.print-Occupations2`).text("-")
          } else {
            $(`.print-Occupations2`).text(result[0].Occupation2)
          }

          $(`.print-FathersNames`).text(result[0].FathersName),
            //$(`.Nationalitys3`).val(result.Nationality3),
            $(`.print-pobs3`).text(result[0].PlaceofBirth3),
            $(`.print-dobs3`).text(result[0].DateofBirth3 != 'Invalid date' ? moment(result[0].DateofBirth3).format("DD-MM-YYYY") : "");

          setTimeout(() => {
            $(`.print-Nationalitys3`).text(result[0].Nationality3);
            $("#print-Nationalityfour").text(result[0].Nationality4);
          }, 2500);

          $(`.print-homeaddress3`).text(result[0].HomeAddress3),
            $(`.print-Occupations3`).text(result[0].Occupation3),
            $(`.print-MothersNames`).text(result[0].MothersName),
            //$("#Nationalityfour").val(result.Nationality4),
            $(`.print-pobs4`).text(result[0].PlaceofBirth4),
            $(`.print-dobs4`).text(result[0].DateofBirth4 != 'Invalid date' ? moment(result[0].DateofBirth4).format("DD-MM-YYYY") : "");
          $(`.print-HomeAddresss4`).text(result[0].HomeAddress4),
            $(`.print-Occupations4`).text(result[0].Occupation4),

            $(`.print-emailsids`).text(result[0].EmailID),
            //$(`.print-jobappliedfors`).text(result[0].jobappliedfor),
            $(`.print-NameofCompanys`).text(result[0].NameofCompany),
            $(`.print-positions`).text(result[0].Position),
            $(`.print-WorkLocations`).text(result[0].WorkLocation);
          // $(`.print-Emirates`).text(result[0].Emirate != "Select" ? result[0].Emirate: ""),
          if (result[0].Emirate == "Select" || result[0].Emirate == "null" || result[0].Emirate == null || result[0].Emirate == undefined || result[0].Emirate == "") {
            $(`.print-Emirates`).text("-")
          } else {
            $(`.print-Emirates`).text(result[0].Emirate)
          }

          $(`.print-Streets`).text(result[0].Street),
            $(`.print-Owners`).text(result[0].Owner),
            $(`.print-FlatNos`).text(result[0].FlatNo),
            $(`.print-plots`).text(result[0].Plot),
            $(`.print-PostBoxs`).text(result[0].PostBox),

            $(`.print-LicenseNos`).text(result[0].LicenseNo);
          //   $(`.print-IssueDates`).text(result[0].IssueDate != 'Invalid date' ? moment(result[0].IssueDate).format("DD-MM-YYYY"):"");

          // $(`.print-ExpiryDates`).text(result[0].ExpiryDate != 'Invalid date' ? moment(result[0].ExpiryDate).format("DD-MM-YYYY"): "");
          if (result[0].TelephoneNo == "" || result[0].TelephoneNo == 'null' || result[0].TelephoneNo == null || result[0].TelephoneNo == undefined) {
            $(`.print-telephonenos`).text("-")
          } else {
            $(`.print-telephonenos`).text(result[0].TelephoneNo)
          }


          if (result[0].IssueDate == 'Invalid date' || result[0].IssueDate == '' || result[0].IssueDate == 'null' || result[0].IssueDate == null || result[0].IssueDate == undefined) {
            $(`.print-IssueDates`).text("-")
          } else {
            $(`.print-IssueDates`).text(moment(result[0].IssueDate).format("DD-MM-YYYY"))
          }


          if (result[0].ExpiryDate == 'Invalid date' || result[0].ExpiryDate == '' || result[0].ExpiryDate == 'null' || result[0].ExpiryDate == null || result[0].ExpiryDate == undefined) {
            $(`.print-ExpiryDates`).text("-")
          } else {
            $(`.print-ExpiryDates`).text(moment(result[0].ExpiryDate).format("DD-MM-YYYY"))
          }
          if (result[0].PlateNo == '' || result[0].PlateNo == 'null' || result[0].PlateNo == null || result[0].PlateNo == undefined) {
            $(`.print-PlateNoss`).text("-");
          } else {
            $(`.print-PlateNoss`).text(result[0].PlateNo);
          }

          if (result[0].DrivingLicenseNo == '' || result[0].DrivingLicenseNo == 'null' || result[0].DrivingLicenseNo == null || result[0].DrivingLicenseNo == undefined) {
            $(`.print-drivinglicenselos`).text("-");
          } else {
            $(`.print-drivinglicenselos`).text(result[0].DrivingLicenseNo);
          }
          $(`#print-UserName`).text(result[0].UserName);
          $(`#print-Password`).text(result[0].Password);


          ImageSrcpersonal = result[0].UnitLogo;

          $("#print-emp-work-status").text(result[0].EmployeeStatus)
          if (result[0].EmployeeStatus == "Fresher") {
            $(".print-professional-qual,.print_emphistory,.print-emp-reference-det").hide()
            $(".print-martial,.print_research").attr("style", "margin-top:25px !important");
          } else if (result[0].EmployeeStatus == "Experienced") {
            $(".print-professional-qual,.print_emphistory,.print-emp-reference-det").show()
          }
        }
        setTimeout(() => {
          $(".print-noHaveyoueverapplied").removeAttr('disabled');
          $(".print-YesHaveyoueverapplied").removeAttr('disabled');
          $("#print-spouse").removeAttr('disabled');
          $("#print-Brother").removeAttr('disabled');
          $("#print-Sister").removeAttr('disabled');
          $("#print-Cousin").removeAttr('disabled');
          $("#print-AnyOtherCloseRelative").removeAttr('disabled');
          $("#print-NoRelative").removeAttr('disabled');
          $("#print-Friend").removeAttr('disabled');

          $("#print-Doh-license").removeAttr('disabled');
          $("#print-Moh-license").removeAttr('disabled');
          $("#print-Dha-license").removeAttr('disabled');
          $("#print-NewRegistration").removeAttr('disabled');
          $("#print-Yes").removeAttr('disabled');
          $("#print-No").removeAttr('disabled');
        }, 2000);

      });

    newweb.lists
      .getByTitle("Children Table Transaction")
      .items.select("ID", "Requested", "PersonalItemid", "Gender", "DOB", "PassportNo", "EmiratesNo", "OrderNo")
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          console.log(result);

          for (var i = 0; i < result.length; i++) {


            var newrow = $("<tr>");
            var cols = "";

            cols +=
              '<td><span id="print-tble-txt-requested">' +
              result[i].Requested +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-ChildGender" class="personalview">' + result[i].Gender + '<span></td>';
            cols +=
              '<td><span id="print-tble-child-dob" class="personalview"> ' +
              moment(result[i].DOB).format("DD-MM-YYYY") +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-child-passport-no" class="personalview"> ' +
              result[i].PassportNo +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-child-emirate-no" class="personalview" >' +
              result[i].EmiratesNo +
              '</span></td>';
            newrow.append(cols);
            $("table #print-tble-tbody-dynamic").append(newrow);
            // $(".print-tble-ChildGender-" + i + "").text(result[i].Gender);

          }
          if (result.length < 5) {
            var childrenremainingrow: number = 5 - result.length


            for (var i = 0; i < childrenremainingrow; i++) {


              var newrow = $("<tr>");
              var cols = "";

              cols +=
                '<td><span id="print-tble-txt-requested">' +
                "-" +
                '</span></td>';
              cols +=
                '<td><span id="print-tble-ChildGender" class="personalview">' + "-" + '<span></td>';
              cols +=
                '<td><span id="print-tble-child-dob" class="personalview"> ' +
                "-" +
                '</span></td>';
              cols +=
                '<td><span id="print-tble-txt-child-passport-no" class="personalview"> ' +
                "-" +
                '</span></td>';
              cols +=
                '<td><span id="print-tble-txt-child-emirate-no" class="personalview" >' +
                "-" +
                '</span></td>';
              newrow.append(cols);
              $("table #print-tble-tbody-dynamic").append(newrow);
              // $(".print-tble-ChildGender-" + i + "").text(result[i].Gender);

            }
          }
        } else {
          for (var i = 0; i < 5; i++) {

            var newrow = $("<tr>");
            var cols = "";

            cols +=
              '<td><span id="print-tble-txt-requested">' +
              "-" +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-ChildGender" class="personalview print-tble-ChildGender-' + i + '"><span></td>';
            cols +=
              '<td><span id="print-tble-child-dob" class="personalview"> ' +
              "-" +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-child-passport-no" class="personalview"> ' +
              "-" +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-child-emirate-no" class="personalview" >' +
              "-" +
              '</span></td>';
            newrow.append(cols);
            $("table #print-tble-tbody-dynamic").append(newrow);
            $(".print-tble-ChildGender-" + i + "").text("-");
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("Personal Emergency Contact Person InUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonInUAEcounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><span id="print-tble-txt-name2" >' +
              result[i].Name2 +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-worklocation2" >' +
              result[i].WorkLocation2 +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-contactnumber2"> ' +
              result[i].ContactNumber2 +
              '</span></td>';
            newrow.append(cols);
            $("table #print-tble-tbody-dynamicEmergencyContact").append(newrow);
          }

          if (result.length < 4) {
            var insideremainingrow: number = 4 - result.length;
            for (var i = 0; i < insideremainingrow; i++) {

              var newrow = $("<tr>");
              var cols = "";

              cols +=
                '<td><span id="print-tble-txt-name2" >' +
                "-" +
                '</span></td>';
              cols +=
                '<td><span id="print-tble-txt-worklocation2" >' +
                "-" +
                '</span></td>';
              cols +=
                '<td><span id="print-tble-txt-contactnumber2"> ' +
                "-" +
                '</span></td>';
              newrow.append(cols);
              $("table #print-tble-tbody-dynamicEmergencyContact").append(newrow);
            }

          }


        }
        else {
          for (var i = 0; i < 4; i++) {

            var newrow = $("<tr>");
            var cols = "";

            cols +=
              '<td><span id="print-tble-txt-name2" >' +
              "-" +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-worklocation2" >' +
              "-" +
              '</span></td>';
            cols +=
              '<td><span id="print-tble-txt-contactnumber2"> ' +
              "-" +
              '</span></td>';
            newrow.append(cols);
            $("table #print-tble-tbody-dynamicEmergencyContact").append(newrow);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonOutsideUAE = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><span id="print-tble-txt-name3" >' +
              result[i].Name3 +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-relation3" >' +
              result[i].Relation3 +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-contactnumber3"> ' +
              result[i].ContactNumber3 +
              '</span></td>';

            newrows.append(colss);
            $(
              "table #print-tble-tbody-dynamicemergencycontactpepersonoutside"
            ).append(newrows);
          }


          if (result.length < 4) {
            var outsideremainingrow: number = 4 - result.length;
            for (var i = 0; i < outsideremainingrow; i++) {

              var newrows = $("<tr>");
              var colss = "";

              colss +=
                '<td><span id="print-tble-txt-name3" >' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-relation3" >' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-contactnumber3"> ' +
                "-" +
                '</span></td>';

              newrows.append(colss);
              $(
                "table #print-tble-tbody-dynamicemergencycontactpepersonoutside"
              ).append(newrows);
            }
          }




        }

        else {
          for (var i = 0; i < 4; i++) {

            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><span id="print-tble-txt-name3" >' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-relation3" >' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-contactnumber3"> ' +
              "-" +
              '</span></td>';

            newrows.append(colss);
            $(
              "table #print-tble-tbody-dynamicemergencycontactpepersonoutside"
            ).append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Professional Qualification")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Qualification",
        "YearofGraducation",
        "University"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {


          for (var i = 0; i < result.length; i++) {
            qualificationcounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><span id="print-tble-txt-Name-qualification">' +
              result[i].Qualification +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-University">' +
              result[i].University +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-year_of_grt">' +
              result[i].YearofGraducation +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamic3").append(newrows);
          }


          if (result.length < TotalProfessionalRowlength) {

            var RemainingProfessionallength = TotalProfessionalRowlength - result.length



            for (var i = 0; i < RemainingProfessionallength; i++) {

              var newrows = $("<tr>");
              var colss = "";

              colss +=
                '<td><span id="print-tble-txt-Name-qualification">' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-University">' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-year_of_grt">' +
                "-" +
                '</span></td>';

              newrows.append(colss);
              $("table #print-tble-tbody-dynamic3").append(newrows);
            }

          }

        }

        else {
          for (var i = 0; i < 5; i++) {

            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><span id="print-tble-txt-Name-qualification">' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-University">' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-year_of_grt">' +
              "-" +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamic3").append(newrows);
          }

        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "To",
        "Experience",
        "Reason",
        "From",
        "Organizationdesc"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");

            var colss = "";

            console.log(result[i].From);

            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><span class="print_org_table" id="print-tble-txt-OrganizationName"> ' +
              result[i].OrganizationName +
              '</span></td>';
            colss +=
              '<td><span class="print_designation_table" id="print-tble-txt-OrganizationDesignation" class"personalview" >' +
              result[i].Organizationdesc +
              '</span></td>';
            colss +=
              '<td><span class="print_yoe_table" id="print-tble-txt-tble-txt-Years_of_Experience" >' +
              result[i].Experience +
              '</span></td>';
            colss +=
              '<td><span clss="print_fromto_table" id="print-tble-txt-Organization-date-From" >' +
              moment(result[i].From).format("MM-YYYY") + ' - ' + moment(result[i].To).format("MM-YYYY") +
              '</span></td>';

            colss +=
              '<td colSpan="4"><span  class="print_reason_table" id="print-tble-txt-Reason_for_leaving" >' +
              result[i].Reason +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamic3_Employment_History").append(newrows);


          }

          if (result.length < 5) {

            var remainingrow: number = 5 - result.length

            for (var i = 0; i < remainingrow; i++) {

              var newrows = $("<tr>");
              var colss = "";

              colss +=
                '<td><span class="print_org_table" id="print-tble-txt-OrganizationName"> ' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span class="print_designation_table" id="print-tble-txt-OrganizationDesignation" class"personalview" >' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span class="print_yoe_table" id="print-tble-txt-tble-txt-Years_of_Experience" >' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span clss="print_fromto_table" id="print-tble-txt-Organization-date-From" >' +
                "-" +
                '</span></td>';

              colss +=
                '<td><span class="print_reason_table" id="print-tble-txt-Reason_for_leaving" >' +
                "-" +
                '</span></td>';

              newrows.append(colss);
              $("table #print-tble-tbody-dynamic3_Employment_History").append(newrows);
            }

          }
        }

        else {
          for (var i = 0; i < 5; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><span class="print_org_table" id="print-tble-txt-OrganizationName"> ' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span class="print_designation_table" id="print-tble-txt-OrganizationDesignation" class"personalview" >' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span class="print_yoe_table" id="print-tble-txt-tble-txt-Years_of_Experience" >' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span class="print_fromto_table" id="print-tble-txt-Organization-date-From" >' +
              "-" +
              '</span></td>';

            colss +=
              '<td><span class="print_reason_table" id="print-tble-txt-Reason_for_leaving" >' +
              "-" +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamic3_Employment_History").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Research Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            ResearchPublicationDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><span id="print-tble-txt-name-Research"> ' +
              result[i].ResearchName +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-Category-Research"> ' +
              result[i].Researchcategory +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-year-Research" >' +
              result[i].year +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamicResearch").append(newrows);
          }

          if (result.length < 5) {
            var remainResearchgrow: number = 5 - result.length

            for (var i = 0; i < remainResearchgrow; i++) {

              var newrows = $("<tr>");
              var colss = "";
              colss +=
                '<td><span id="print-tble-txt-name-Research"> ' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-Category-Research"> ' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-year-Research" >' +
                "-" +
                '</span></td>';

              newrows.append(colss);
              $("table #print-tble-tbody-dynamicResearch").append(newrows);
            }
          }


        }

        else {
          for (var i = 0; i < 5; i++) {

            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><span id="print-tble-txt-name-Research"> ' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-Category-Research"> ' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-year-Research" >' +
              "-" +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-dynamicResearch").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("personal Reference Details")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Email",
        "Contact"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmployeeReferenceDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><span id="print-tble-txt-Name-ResearchDetails" >' +
              result[i].Name +
              '</span></td>';

            colss +=
              '<td><span id="print-tble-txt-Email-ResearchDetails" >' +
              result[i].Email +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-contactno-ResearchDetails" >' +
              result[i].Contact +
              '</span></td>';
            newrows.append(colss);
            $("table #print-tble-tbody-dynamicemployreference").append(newrows);
          }

          if (result.length < 5) {
            var Referenceremainingrow: number = 5 - result.length;
            for (var i = 0; i < Referenceremainingrow; i++) {

              var newrows = $("<tr>");
              var colss = "";

              colss +=
                '<td><span id="print-tble-txt-Name-ResearchDetails" >' +
                "-" +
                '</span></td>';

              colss +=
                '<td><span id="print-tble-txt-Email-ResearchDetails" >' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-tble-txt-contactno-ResearchDetails" >' +
                "-" +
                '</span></td>';
              newrows.append(colss);
              $("table #print-tble-tbody-dynamicemployreference").append(newrows);
            }

          }

        }
        else {
          for (var i = 0; i < 5; i++) {

            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><span id="print-tble-txt-Name-ResearchDetails" >' +
              "-" +
              '</span></td>';

            colss +=
              '<td><span id="print-tble-txt-Email-ResearchDetails" >' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-tble-txt-contactno-ResearchDetails" >' +
              "-" +
              '</span></td>';
            newrows.append(colss);
            $("table #print-tble-tbody-dynamicemployreference").append(newrows);
          }
        }



      });




    newweb.lists
      .getByTitle("Personal Relative friend Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Worklocation",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".Dynamic-add-class").removeClass(".print-ifrelativetableisnotpresent-attachments")

          $(".Dynamic-add-class-address").addClass(".dynamic_addr_print")
          $(".Dynamic-add-class").removeClass(".dynamic_attachement_print")
          for (var i = 0; i < result.length; i++) {
            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><span id="print-relative-friend-name" class"personalview table-border-only">' +
              result[i].Name +
              '</span></td>';
            colss +=
              '<td><span id="print-relative-friend-worklocation"  class"personalview table-border-only" >' +
              result[i].Worklocation +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-relative-friend").append(newrows);
          }

          if (result.length < 2) {
            var relativeremainingrow: number = 2 - result.length

            for (var i = 0; i < relativeremainingrow; i++) {
              var newrows = $("<tr>");
              var colss = "";
              colss +=
                '<td><span id="print-relative-friend-name" class"personalview table-border-only">' +
                "-" +
                '</span></td>';
              colss +=
                '<td><span id="print-relative-friend-worklocation"  class"personalview table-border-only" >' +
                "-" +
                '</span></td>';

              newrows.append(colss);
              $("table #print-tble-tbody-relative-friend").append(newrows);
            }
          }


        }

        else {
          for (var i = 0; i < 2; i++) {
            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><span id="print-relative-friend-name" class"personalview table-border-only">' +
              "-" +
              '</span></td>';
            colss +=
              '<td><span id="print-relative-friend-worklocation"  class"personalview table-border-only" >' +
              "-" +
              '</span></td>';

            newrows.append(colss);
            $("table #print-tble-tbody-relative-friend").append(newrows);
          }
        }
      });
  }

  public LoadSPListSupportingDatas() {
    this.GetReligiondata();
    this.GetSponserNamedata();
    this.GetCountries();

    this.GetBloodgroup();
    this.checkboxchecking();
    this.Getsurename();
    this.Hidevalidationonkeytyping();
    this.GetEmployeeCategoryItem();
    this.Autochangefieldnameduringtyping();

  }

  public async GetCurrentUserONBSessionID(currentuseremailid, FormMode) {
    if (FormMode == "New") {
      newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.filter("Name/EMail eq '" + currentuseremailid + "'")
        .orderBy("Created", false)
        .top(1)
        .get()
        .then((response) => {
          if (response.length != 0) {
            this.setState({
              ONBSessionID: response[0].ONBSessionID,
            });

            this.CheckIndividualFomSubmissionStatusofEmployee(
              response[0].ONBSessionID,
              // "BHL1212023307",
              "New"
            );
          }
        });
    } else {
      newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.filter(
          "ONBSessionID eq '" +
          GlobalSessionIDValue +
          "' and UnitHr/EMail eq '" +
          currentuseremailid +
          "' or HrHead/EMail eq '" +
          currentuseremailid +
          "' or HrManager/EMail eq '" +
          currentuseremailid +
          "'"
        )
        .get()
        .then((response) => {
          if (response.length != 0) {
            this.setState({
              ONBSessionID: response[0].ONBSessionID,
            });

            this.CheckIndividualFomSubmissionStatusofEmployee(
              response[0].ONBSessionID,
              "Edit-View"
            );
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
    newweb.lists
      .getByTitle("Onboarding Transaction Master")
      .items.filter(
        "ONBSessionID eq '" + ONBSessionID + "' and Title eq 'PERSONAL INFORMATION FORM'"
      )
      .orderBy("Created", false)
      .get()
      .then((response) => {
        if (response.length != 0) {
          if (response[0].Title == "PERSONAL INFORMATION FORM") {
            this.setState({
              PersonalInfoSubmissionStatus: response[0].Status,
            });

            if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {

              this.GetCurrenthireuserdocumentlibraryitem(this.state.CurrentUserName, ONBSessionID);
              this.GETcurrentuserlistdata(ONBSessionID, FormMode);
            }
          }

          //for (var i = 0; i < response.length; i++) {
          // if (response[i].Title == "LETTER OF AUTHORIZATION") {
          //   this.setState({
          //     LOASubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "EMPLOYEE CODE OF CONDUCT & ETHICS") {
          //   this.setState({
          //     COCSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "EMPLOYEE NON-DISCLOSURE AGREEMENT") {
          //   this.setState({
          //     NDASubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "SPECIMEN SIGNATURE FORM") {
          //   this.setState({
          //     SpecimenSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "CONFLICT OF INTEREST") {
          //   this.setState({
          //     COISubmissionStatus: response[0].Status
          //   });
          // }

          // else if (response[i].Title == "JOINING REPORT") {
          //   this.setState({
          //     JoiningReportSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "POLICY ACKNOWLEDGMENT AND DECLARATION") {
          //   this.setState({
          //     PolicyAckandDeclarationSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT") {
          //   this.setState({
          //     AckPolicyGeneralITSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "UNIFORM REQUEST BANK DETAILS") {
          //   this.setState({
          //     UniformBankReqSubmissionStatus: response[0].Status
          //   });
          // }
          // else if (response[i].Title == "EPHYSICAN PROFILE") {
          //   this.setState({
          //     EphyProfileSubmissionStatus: response[0].Status
          //   });
          // }
          //}
        }
      });
  }

  public async GetpersonalviewidItem(ID) {
    $(".Action-columnviewmode").hide();
    $("#show-bussiness-unitname").show();
    // $(".personaltitleitemid").attr("style", "color:#00A36C");
    $(".personalinformationimg").show();
    $(`#Dynamicimgpersonal`).hide();
    $(`#imgpersonalitemid`).show();
    $("#bussiness-unit-name").hide();
    $(".Dynamicbussiness-unit-name").show();
    $(".Updatebycurrentuser").hide();
    $(`.personalwithoutedit`).hide();
    $(`.prsonalwithedit`).show();
    $(`.personal-submit`).hide();
    $(".empnamepersonal1").hide();
    $(".empnamepersonal11").show();
    $(".personalview").prop("disabled", true);
    await newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "ID",
        "FullName",
        "PlaceofBirth",
        "DateofBirth",
        "CurrentNationality",
        "PreviousNationality",
        "Religion",
        "Section",
        "Entered",
        "MiddleName",
        "Port",
        "ContactNumber",
        "SponsorName",
        "DocumentNo",
        "PlaceofIssue ",
        "DateofIssue ",
        "DateofExpiry",
        "ResidenceNo",
        "Academic ",
        "Qualification",
        "DateofQualification ",
        "Country",
        "Languages",
        "MaritalStatus",
        "BloodGroup",
        "NameofSpouse",
        "Nationality21",
        "PlaceofBirth2",
        "DateofBirth2",
        "PlaceofWork",
        "FathersName",
        "Nationality4",
        "PlaceofBirth3",
        "DateofBirth3",
        "HomeAddress3",
        "Occupation2",
        "Occupation3",
        "MothersName",
        "Nationality4",
        "PlaceofBirth4",
        "DateofBirth4",
        "HomeAddress4",
        "Occupation4",
        "CountryNumber",
        "EmailID",
        "jobappliedfor",
        "NameofCompany",
        "Position",
        "WorkLocation",
        "Emirate",
        "Street",
        "Owner",
        "FlatNo",
        "Plot",
        "PostBox",
        "TelephoneNo",
        "MobileNo",
        "LicenseNo",
        "IssueDate",
        "ExpiryDate",
        "NewRegistration",
        "UserName",
        "Password",
        "DrivingLicenseNo",
        "PlateNo",
        "dataflowNO",
        "Friend",
        "AnyOtherCloseRelative",
        "NoRelative",
        "Cousin",
        "Sister",
        "Borther",
        "LastName",
        "FirstName",
        "SurName",
        "Category",
        "HaveyoueverApplied",
        "LicenseType",
        "Author",
        "Gender",
        "Nationality3",
        "RelativeName",
        "Author/Id",
        "countrycodemobileno",
        "Countrycodesecondsection",
        "Countrycodefirstsection",
        "Spouse",
        "Provethesame",
        "AttachmentEmployeeFullName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber",
        "NewUserBloodGroup",
        "EmployeeStatus"
      )
      .filter(`ONBSessionID eq '${GlobalSessionIDValue}'`)
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {

          this.GetPersonaldocumentlibrarydataView(
            result[0].AttachmentEmployeeFullName
          );
          $("#childlist-tr").hide();
          $("#Universityqualification-tr").hide();
          $("#employmenthistory-tr").hide();
          $("#Research-tr").hide();
          $("#empreference-tr").hide();
          $("#friend-relative-tr").hide();
          $("#emergency-tr").hide();
          $("#outside-tr").hide();
          $(".firstnamecurrent").hide();
          $(".Lastnamenamecurrent").hide();
          $(".firstnamedynamic").show();
          $(".Lastnamenamedynamic").show();


          setTimeout(() => {

            $("#personal-blood-group").val(result[0].NewUserBloodGroup);

          }, 2000);


          $("#RelativeName").val(result[0].RelativeName),
            $("#provide-the-same").val(result[0].Provethesame);

          EmployeeEditviewName = result[0].FullName;
          businessdynamicuserunit = result[0].BusinessUnit;

          $(".empnamepersonal111").val(result[0].FullName);
          $("#PersonalGender").val(result[0].Gender),
            $(".empfirstname").val(result[0].FirstName);
          $(".personalLastname").val(result[0].LastName);
          setTimeout(() => {
            $(".surename-personal").val(result[0].SurName);
            $(`.Current-Nationality`).val(result[0].CurrentNationality);
            $(`.Previous-Nationality`).val(result[0].PreviousNationality);
            $("#EmployeeCategory").val(result[0].Category);
          }, 2500);

          var value1 = result[0].ContactNumber;
          // var contactall = value1.split("-");

          $(`.contactnumbers`).val(result[0].ContactNumber);
          $("#country-code").val(result[0].Countrycodefirstsection);

          var value3 = result[0].CountryNumber;
          // var contactall2 = value3.split("-");

          $(`.CountrysNumbers`).val(result[0].CountryNumber);
          $("#country-codehomecountry").val(result[0].Countrycodesecondsection);
          $(`#country-codeMobileNo`).val(result[0].countrycodemobileno);

          //$("#EmployeeCategory").val(result.Category);
          //$(`.Current-Nationality`).val(result.CurrentNationality);
          //$(`.Previous-Nationality`).val(result.PreviousNationality);
          //setTimeout(() => {
          //   if (result[0].MaritalStatus == "Single") {
          //     $("#MaritalStatus option[value='Single']").prop("selected", true);
          //   } else if (result[0].MaritalStatus == "Married") {
          //     $("#MaritalStatus option[value='Married']").prop("selected", true);
          //   } else if (result[0].MaritalStatus == "Seperated") {
          //     $("#MaritalStatus option[value='Seperated']").prop("selected", true);
          //   }

          // }, 3000);
          $("#MaritalStatus").val(result[0].MaritalStatus);

          var newreg = result[0].NewRegistration;
          if (newreg == "Yes") {
            $("#NewRegistration").prop("checked", true);
          }

          if (result[0].HaveyoueverApplied == "Yes") {
            $(".YesHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).show();

          } else {
            $(".noHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).hide();
          }

          if (result[0].Spouse == "Yes") {
            $("#spouse").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Sister == "Yes") {
            $("#Sister").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Borther == "Yes") {
            $("#Brother").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Friend == "Yes") {
            $("#Friend").prop("checked", true);
            $("#if-no-relative-hide").show()
          }
          if (result[0].Cousin == "Yes") {
            $("#Cousin").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].AnyOtherCloseRelative == "Yes") {
            $("#AnyOtherCloseRelative").prop("checked", true);
            $("#if-no-relative-hide").show()
          } else {
            $("#AnyOtherCloseRelative").prop("checked", false);
          }
          if (result[0].NoRelative == "Yes") {
            $("#NoRelative").prop("checked", true);
            $("#if-no-relative-hide").hide();
          }

          if (result[0].dataflowNO == "Yes") {
            $(".dataflowYes").prop("checked", true);
            $(".ifdataflow-yes").show();
          } else if (result[0].dataflowNO == "No") {
            $(".dataflowno").prop("checked", true);
            $(".ifdataflow-yes").hide();
          } else {
            $(".dataflowYes").prop("checked", false);
            $(".dataflowno").prop("checked", true);
            $(".ifdataflow-yes").hide();
          }

          if (result[0].LicenseType == "DOH") {
            $("#Doh-license").prop("checked", true);
            $(".dohpasskey-kindaly-provide").show();
          } else if (result[0].LicenseType == "MOH") {
            $("#Moh-license").prop("checked", true);
            $(".moh-dha-Attachment-hide-show").show();
          } else if (result[0].LicenseType == "DHA") {
            $("#Dha-license").prop("checked", true);
            $(".moh-dha-Attachment-hide-show").show();
          }

          setTimeout(() => {
            $(`.bloodgroups`).val(result[0].BloodGroup);
            $(`.religions`).val(result[0].Religion);
            $(`.SponsorNames`).val(result[0].SponsorName);
            $(`.Nationalitys2`).val(result[0].Nationality21);
          }, 3000);

          // $(".personaltitleitemid").attr("style", "color:#00A36C");
          $(".personalvalue").val(result[0].FullName),
            $(`.pob`).val(result[0].PlaceofBirth);
          $(`.dob`).val(moment(result[0].DateofBirth).format("YYYY-MM-DD"));
          $("#PersonalMiddleName").val(result[0].MiddleName);

          $(`.sections`).val(result[0].Section);
          $(`.entereds`).val(moment(result[0].Entered).format("YYYY-MM-DD"));
          $(`.ports`).val(result[0].Port);

          $(`.documentnos`).val(result[0].DocumentNo);
          $(`.pos`).val(result[0].PlaceofIssue);
          $(`#DateofIssue`).val(
            moment(result[0].DateofIssue).format("YYYY-MM-DD")
          ),
            $(`#DateofExpiry`).val(
              moment(result[0].DateofExpiry).format("YYYY-MM-DD")
            ),
            $(`.residenceNos`).val(result[0].ResidenceNo),
            $(`.nos`).val(result[0].NameofSpouse),
            $(`.pob2`).val(result[0].PlaceofBirth2),
            $(`.dob2`).val(moment(result[0].DateofBirth2).format("YYYY-MM-DD")),
            $(`.pow`).val(result[0].PlaceofWork),
            $(`.Occupations2`).val(result[0].Occupation2),
            $(`.FathersNames`).val(result[0].FathersName),
            //$(`.Nationalitys3`).val(result.Nationality3),
            $(`.pobs3`).val(result[0].PlaceofBirth3),
            $(`.dobs3`).val(
              moment(result[0].DateofBirth3).format("YYYY-MM-DD")
            );

          setTimeout(() => {
            $(`.Nationalitys3`).val(result[0].Nationality3);
            $("#Nationalityfour").val(result[0].Nationality4);
          }, 2500);

          $(`.homeaddress3`).val(result[0].HomeAddress3),
            $(`.Occupations3`).val(result[0].Occupation3),
            $(`.MothersNames`).val(result[0].MothersName),
            //$("#Nationalityfour").val(result.Nationality4),
            $(`.pobs4`).val(result[0].PlaceofBirth4),
            $(`.dobs4`).val(
              moment(result[0].DateofBirth4).format("YYYY-MM-DD")
            );
          $(`.HomeAddresss4`).val(result[0].HomeAddress4),
            $(`.Occupations4`).val(result[0].Occupation4),
            $(`.emailsids`).val(result[0].EmailID),
            //$(`.jobappliedfors`).val(result[0].jobappliedfor),
            $(`.NameofCompanys`).val(result[0].NameofCompany),
            $(`.positions`).val(result[0].Position),
            $(`.WorkLocations`).val(result[0].WorkLocation),
            $(`.Emirates`).val(result[0].Emirate),
            $(`.Streets`).val(result[0].Street),
            $(`.Owners`).val(result[0].Owner),
            $(`.FlatNos`).val(result[0].FlatNo),
            $(`.plots`).val(result[0].Plot),
            $(`.PostBoxs`).val(result[0].PostBox)

          if (result[0].MobileNo == 'null' || result[0].MobileNo == null || result[0].MobileNo == "" || result[0].MobileNo == undefined) {
            $(`.MobileNos`).val("-");
          } else {
            $(`.MobileNos`).val(result[0].MobileNo);
          }
          if (result[0].TelephoneNo == 'null' || result[0].TelephoneNo == null || result[0].TelephoneNo == "" || result[0].TelephoneNo == undefined) {
            $(`.telephonenos`).val("-");
          } else {
            $(`.telephonenos`).val(result[0].TelephoneNo);
          }
          $(`.LicenseNos`).val(result[0].LicenseNo),
            $(`.IssueDates`).val(
              moment(result[0].IssueDate).format("YYYY-MM-DD")
            );

          $(`.ExpiryDates`).val(
            moment(result[0].ExpiryDate).format("YYYY-MM-DD")
          );
          $(`.usersnames`).val(result[0].UserName);
          $("#Password-dynamic").val(result[0].Password);
          $(`.drivinglicenselos`).val(result[0].DrivingLicenseNo);
          $(`.PlateNoss`).val(result[0].PlateNo);
          ImageSrcpersonal = result[0].UnitLogo;

          $("#emp-work-status").val(result[0].EmployeeStatus)
          if (result[0].EmployeeStatus == "Fresher") {
            $(".professional-qual,.Employment_history,.emp-reference-det").hide()
            $("#tble-tbody-dynamic3,#tble-tbody-dynamic3_Employment_History,#tble-tbody-dynamicemployreference").empty();
          } else if (result[0].EmployeeStatus == "Experienced") {
            $(".professional-qual,.Employment_history,.emp-reference-det").show()
          }
        }
      });

    newweb.lists
      .getByTitle("Children Table Transaction")
      .items.select(
        "ID",
        "Requested",
        "PersonalItemid",
        "Gender",
        "DOB",
        "PassportNo",
        "EmiratesNo",
        "OrderNo"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            if (result[i].Requested != "-" || result[i].EmiratesNo != "-") {
              var newrow = $("<tr>");
              var cols = "";
              // cols +=
              //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
              //   result[i].OrderNo +
              //   '"></input></td>';
              cols +=
                '<td><input type="hidden" id="hdn-personaltab-itm-id" value="' +
                result[i].ID +
                '"></input><input type="text" id="tble-txt-requested" class="form-control" autoComplete="off"value="' +
                result[i].Requested +
                '" disabled></input></td>';
              cols +=
                '<td><select id="tble-ChildGender" class="form-control personalview tble-ChildGender-' +
                i +
                '"><option value="-">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>';
              cols +=
                '<td><input type="date" id="tble-child-dob"  max="' +
                moment().format("YYYY-MM-DD") +
                '" class="form-control personalview" autoComplete="off"value="' +
                result[i].DOB +
                '" disabled></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-passport-no" class="form-control personalview" autoComplete="off"value="' +
                result[i].PassportNo +
                '" disabled></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-emirate-no"  class="form-control personalview" autoComplete="off"value="' +
                result[i].EmiratesNo +
                '" disabled></input></td>';
              newrow.append(cols);
              $("table #tble-tbody-dynamic").append(newrow);
              $(".tble-ChildGender-" + i + "").val(result[i].Gender);
            }
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("Personal Emergency Contact Person InUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonInUAEcounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><input type="hidden" id="hdn-personalcontactperson-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name2" autoComplete="off"value="' +
              result[i].Name2 +
              '"disabled></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-worklocation2" autoComplete="off"value="' +
              result[i].WorkLocation2 +
              '"disabled></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-contactnumber2" autoComplete="off"value="' +
              result[i].ContactNumber2 +
              '"disabled></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicEmergencyContact").append(newrow);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonOutsideUAE = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personalcontperson-out-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name3" autoComplete="off"value="' +
              result[i].Name3 +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-relation3" autoComplete="off"value="' +
              result[i].Relation3 +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-contactnumber3" autoComplete="off"value="' +
              result[i].ContactNumber3 +
              '"disabled></input></td>';

            newrows.append(colss);
            $(
              "table #tble-tbody-dynamicemergencycontactpepersonoutside"
            ).append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Professional Qualification")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Qualification",
        "YearofGraducation",
        "University"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            qualificationcounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-qualif-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"  id="tble-txt-Name-qualification"  autoComplete="off"value="' +
              result[i].Qualification +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-University"  autoComplete="off"value="' +
              result[i].University +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt" max="4" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '"disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "To",
        "Experience",
        "Reason",
        "From",
        "Organizationdesc"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"  id="tble-txt-OrganizationName" autoComplete="off"value="' +
              result[i].OrganizationName +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-OrganizationDesignation" class"personalview" autoComplete="off"value="' +
              result[i].Organizationdesc +
              '"disabled></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" autoComplete="off"value="' +
              result[i].From +
              '" max="' +
              moment().format("YYYY-MM") +
              '"></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"value="' +
              result[i].To +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-tble-txt-Years_of_Experience" autoComplete="off"value="' +
              result[i].Experience +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-Reason_for_leaving" autoComplete="off"value="' +
              result[i].Reason +
              '"disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3_Employment_History").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Research Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            ResearchPublicationDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personaltab-reserch-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-name-Research" autoComplete="off"value="' +
              result[i].ResearchName +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text"  maxlength="4" id="tble-txt-year-Research" autoComplete="off"value="' +
              result[i].year +
              '"disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamicResearch").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("personal Reference Details")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Email",
        "Contact"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmployeeReferenceDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-ref-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-Name-ResearchDetails" autoComplete="off"value="' +
              result[i].Name +
              '"disabled></input></td>';

            colss +=
              '<td><input type="text"  id="tble-txt-Email-ResearchDetails"  autoComplete="off"value="' +
              result[i].Email +
              '"disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-contactno-ResearchDetails"  autoComplete="off"value="' +
              result[i].Contact +
              '"disabled></input></td>';
            newrows.append(colss);
            $("table #tble-tbody-dynamicemployreference").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Relative friend Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Worklocation",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><input type="hidden" id="hdn-personal-relativefriend-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="relative-friend-name" class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Name +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="relative-friend-worklocation"  class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Worklocation +
              '" disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-relative-friend").append(newrows);
          }
        }
      });



    setTimeout(() => {
      $("input").attr("disabled", "disabled");
      $("textarea").attr("disabled", "disabled");
      $("select").attr("disabled", "disabled");
    }, 2000);
  }

  public async GetpersonaleditidItem(ID) {
    $("#show-bussiness-unitname").show();
    $("#Universityqualification-tr").remove()
    $("#employmenthistory-tr").remove()
    $("#Research-tr").remove()
    $("#empreference-tr").remove()
    $("#childlist-tr").remove()
    $("#emergency-tr").remove()
    $("#outside-tr").remove()
    $("#friend-relative-tr").remove()
    //$(".personaltitleitemid").attr("style", "color:#00A36C");
    $(".personalinformationimg").show();
    $(`#Dynamicimgpersonal`).hide();
    $(`#imgpersonalitemid`).show();
    $("#bussiness-unit-name").hide();
    $("#Dynamicbussiness-unit-name").show();
    $(".Updatebycurrentuser").hide();
    $(`.personalwithoutedit`).hide();
    $(`.prsonalwithedit`).show();
    $(`.personal-submit`).hide();
    $(".empnamepersonal1").hide();
    $(".empnamepersonal11").show();
    $(".firstnamecurrent").hide();
    $(".Lastnamenamecurrent").hide();
    $(".firstnamedynamic").show();
    $(".Lastnamenamedynamic").show();
    await newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "ID",
        "FullName",
        "PlaceofBirth",
        "DateofBirth",
        "CurrentNationality",
        "PreviousNationality",
        "Religion",
        "Section",
        "Entered",
        "MiddleName",
        "Port",
        "ContactNumber",
        "SponsorName",
        "DocumentNo",
        "PlaceofIssue ",
        "DateofIssue ",
        "DateofExpiry",
        "ResidenceNo",
        "Academic ",
        "Qualification",
        "DateofQualification ",
        "Country",
        "Languages",
        "MaritalStatus",
        "BloodGroup",
        "NameofSpouse",
        "Nationality21",
        "PlaceofBirth2",
        "DateofBirth2",
        "PlaceofWork",
        "FathersName",
        "Nationality4",
        "PlaceofBirth3",
        "DateofBirth3",
        "HomeAddress3",
        "Occupation2",
        "Occupation3",
        "MothersName",
        "Nationality4",
        "PlaceofBirth4",
        "DateofBirth4",
        "HomeAddress4",
        "Occupation4",
        "CountryNumber",
        "EmailID",
        "jobappliedfor",
        "NameofCompany",
        "Position",
        "WorkLocation",
        "Emirate",
        "Street",
        "Owner",
        "FlatNo",
        "Plot",
        "PostBox",
        "TelephoneNo",
        "MobileNo",
        "LicenseNo",
        "IssueDate",
        "ExpiryDate",
        "NewRegistration",
        "UserName",
        "Password",
        "DrivingLicenseNo",
        "PlateNo",
        "dataflowNO",
        "Friend",
        "AnyOtherCloseRelative",
        "NoRelative",
        "Cousin",
        "Sister",
        "Borther",
        "LastName",
        "FirstName",
        "SurName",
        "Category",
        "HaveyoueverApplied",
        "LicenseType",
        "Author",
        "Gender",
        "Nationality3",
        "RelativeName",
        "Author/Id",
        "countrycodemobileno",
        "Countrycodesecondsection",
        "Countrycodefirstsection",
        "Spouse",
        "Provethesame",
        "AttachmentEmployeeFullName",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber",
        "NewUserBloodGroup",
        "EmployeeStatus"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {
          FilterPerosnalitemid = result[0].ID;
          personalControlNumber = result[0].ControlNumber
          personlVersionNumber = result[0].VersionNumber
          this.GetPersonaldocumentlibrarydataEdit(
            result[0].AttachmentEmployeeFullName
          );
          AttachmentEditUserfullName = result[0].AttachmentEmployeeFullName;
          $("#provide-the-same").val(result[0].Provethesame);
          $("#childlist-tr").hide();
          $("#Universityqualification-tr").hide();
          $("#employmenthistory-tr").hide();
          $("#Research-tr").hide();
          $("#empreference-tr").hide();
          $("#friend-relative-tr").hide();
          $("#emergency-tr").hide();
          $("#outside-tr").hide();
          $(".firstnamecurrent").hide();
          $(".Lastnamenamecurrent").hide();
          $(".firstnamedynamic").show();
          $(".Lastnamenamedynamic").show();

          $(`.dobpersonal`).val(
            moment(result[0].DateofBirth).format("YYYY-MM-DD")
          );

          //$('#surenmaepersonal [value="' + result.SurName + '"]').attr('selected', 'true');
          $("#RelativeName").val(result[0].RelativeName);

          setTimeout(() => {

            $("#personal-blood-group").val(result[0].NewUserBloodGroup);

          }, 2000);
          EmployeeEditviewName = result[0].FullName;
          businessdynamicuserunit = result[0].BusinessUnit;
          $("#PersonalGender").val(result[0].Gender);
          $(".empnamepersonal111").val(result[0].FullName);
          $("#PersonalGender").val(result[0].Gender),
            $(".empfirstname").val(result[0].FirstName);
          $(".personalLastname").val(result[0].LastName);
          setTimeout(() => {
            $(".surename-personal").val(result[0].SurName);
            $(`.Current-Nationality`).val(result[0].CurrentNationality);
            $(`.Previous-Nationality`).val(result[0].PreviousNationality);
            $("#EmployeeCategory").val(result[0].Category);
          }, 2500);

          setTimeout(() => {
            $(`.contactnumbers`).val(result[0].ContactNumber);
            $("#country-code").val(result[0].Countrycodefirstsection);
          }, 2500);

          setTimeout(() => {
            $(`.CountrysNumbers`).val(result[0].CountryNumber);
            $("#country-codehomecountry").val(
              result[0].Countrycodesecondsection
            );
            $(`#country-codeMobileNo`).val(result[0].countrycodemobileno),
              $(`.MobileNos`).val(result[0].MobileNo);
          }, 2500);

          setTimeout(() => {
            // if (result[0].MaritalStatus == "Single") {
            //   $("#MaritalStatus option[value='Single']").prop("selected", true);
            // } else if (result[0].MaritalStatus == "Married") {
            //   $("#MaritalStatus option[value='Married']").prop("selected", true);
            // } else if(result[0].MaritalStatus == "Separated") {
            //   $("#MaritalStatus option[value='Separated']").prop("selected", true);
            // }
            $("#MaritalStatus").val(result[0].MaritalStatus);
          }, 3000);

          var newreg = result[0].NewRegistration;
          if (newreg == "Yes") {
            $("#NewRegistration").prop("checked", true);
          }

          if (result[0].HaveyoueverApplied == "Yes") {
            $(".YesHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).show();
          } else {
            $(".noHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).hide();
          }

          if (result[0].Spouse == "Yes") {
            $("#spouse").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Sister == "Yes") {
            $("#Sister").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Borther == "Yes") {
            $("#Brother").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].Friend == "Yes") {
            $("#Friend").prop("checked", true);
            $("#if-no-relative-hide").show()
          }
          if (result[0].Cousin == "Yes") {
            $("#Cousin").prop("checked", true);
            $("#if-no-relative-hide").show()
          }

          if (result[0].AnyOtherCloseRelative == "Yes") {
            $("#AnyOtherCloseRelative").prop("checked", true);
            $("#if-no-relative-hide").show()
          } else {
            $("#AnyOtherCloseRelative").prop("checked", false);
          }

          if (result[0].NoRelative == "Yes") {
            $("#NoRelative").prop("checked", true);
            $("#if-no-relative-hide").hide();
          }

          if (result[0].dataflowNO == "Yes") {
            $(".dataflowYes").prop("checked", true);
            $(".ifdataflow-yes").show();
          } else if (result[0].dataflowNO == "No") {
            $(".dataflowno").prop("checked", true);
          } else {
            $(".dataflowYes").prop("checked", false);
            $(".dataflowno").prop("checked", true);
          }

          if (result[0].LicenseType == "DOH") {
            $("#Doh-license").prop("checked", true);
            $(".dohpasskey-kindaly-provide").show();
          } else if (result[0].LicenseType == "MOH") {
            $("#Moh-license").prop("checked", true);
            $(".moh-dha-Attachment-hide-show").show();
          } else if (result[0].LicenseType == "DHA") {
            $("#Dha-license").prop("checked", true);
            $(".moh-dha-Attachment-hide-show").show();
          }

          setTimeout(() => {
            $(`.bloodgroups`).val(result[0].BloodGroup);
            $(`.religions`).val(result[0].Religion);
            $(`.SponsorNames`).val(result[0].SponsorName);
            $(`.Nationalitys2`).val(result[0].Nationality21);
          }, 3000);
          // $(".personaltitleitemid").attr("style", "color:#00A36C");
          $(".personalvalue").val(result[0].FullName),
            $(`.pob`).val(result[0].PlaceofBirth);
          $(`.dob`).val(moment(result[0].DateofBirth).format("YYYY-MM-DD"));
          $("#PersonalMiddleName").val(result[0].MiddleName);

          $(`.sections`).val(result[0].Section);
          $(`.entereds`).val(moment(result[0].Entered).format("YYYY-MM-DD"));
          $(`.ports`).val(result[0].Port);

          $(`.documentnos`).val(result[0].DocumentNo);
          $(`.pos`).val(result[0].PlaceofIssue);
          $(`#DateofIssue`).val(
            moment(result[0].DateofIssue).format("YYYY-MM-DD")
          ),
            $(`#DateofExpiry`).val(
              moment(result[0].DateofExpiry).format("YYYY-MM-DD")
            ),
            $(`.residenceNos`).val(result[0].ResidenceNo),
            $(`.nos`).val(result[0].NameofSpouse),
            $(`.pob2`).val(result[0].PlaceofBirth2),
            $(`.dob2`).val(moment(result[0].DateofBirth2).format("YYYY-MM-DD")),
            $(`.pow`).val(result[0].PlaceofWork),
            $(`.Occupations2`).val(result[0].Occupation2),
            $(`.FathersNames`).val(result[0].FathersName),
            setTimeout(() => {
              $(`.Nationalitys3`).val(result[0].Nationality3);
              $("#Nationalityfour").val(result[0].Nationality4);
            }, 2500);

          $(`.pobs3`).val(result[0].PlaceofBirth3),
            $(`.dobs3`).val(
              moment(result[0].DateofBirth3).format("YYYY-MM-DD")
            );

          $(`.homeaddress3`).val(result[0].HomeAddress3),
            $(`.Occupations3`).val(result[0].Occupation3),
            $(`.MothersNames`).val(result[0].MothersName),
            $(`.pobs4`).val(result[0].PlaceofBirth4),
            $(`.dobs4`).val(
              moment(result[0].DateofBirth4).format("YYYY-MM-DD")
            );
          $(`.HomeAddresss4`).val(result[0].HomeAddress4),
            $(`.Occupations4`).val(result[0].Occupation4),
            $(`.emailsids`).val(result[0].EmailID),
            // $(`.jobappliedfors`).val(result[0].jobappliedfor),
            $(`.NameofCompanys`).val(result[0].NameofCompany),
            $(`.positions`).val(result[0].Position),
            $(`.WorkLocations`).val(result[0].WorkLocation),
            $(`.Emirates`).val(result[0].Emirate),
            $(`.Streets`).val(result[0].Street),
            $(`.Owners`).val(result[0].Owner),
            $(`.FlatNos`).val(result[0].FlatNo),
            $(`.plots`).val(result[0].Plot),
            $(`.PostBoxs`).val(result[0].PostBox),
            $(`.telephonenos`).val(result[0].TelephoneNo),
            $(`.LicenseNos`).val(result[0].LicenseNo),
            $(`.IssueDates`).val(
              moment(result[0].IssueDate).format("YYYY-MM-DD")
            );

          $(`.ExpiryDates`).val(
            moment(result[0].ExpiryDate).format("YYYY-MM-DD")
          );

          $(`.usersnames`).val(result[0].UserName);
          $("#Password-dynamic").val(result[0].Password);
          $(`.drivinglicenselos`).val(result[0].DrivingLicenseNo);
          $(`.PlateNoss`).val(result[0].PlateNo);

          ImageSrcpersonal = result[0].UnitLogo;

          $("#emp-work-status").val(result[0].EmployeeStatus)

          if (result[0].EmployeeStatus == "Fresher") {
            $(".professional-qual,.Employment_history,.emp-reference-det").hide()
          } else if (result[0].EmployeeStatus == "Experienced") {
            $(".professional-qual,.Employment_history,.emp-reference-det").show()
          }
        }
      });

    newweb.lists
      .getByTitle("Children Table Transaction")
      .items.select(
        "ID",
        "ONBSessionID",
        "Gender",
        "EmiratesNo",
        "PassportNo",
        "DOB",
        "Requested",
        "PersonalItemid",
        "OrderNo"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            if (result[i].Requested != "-" || result[i].EmiratesNo != "-") {
              var newrow = $("<tr>");
              var cols = "";
              // cols +=
              //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
              //   result[i].OrderNo +
              //   '"></input></td>';
              cols +=
                '<td><input type="hidden" id="hdn-personaltab-itm-id" value="' +
                result[i].ID +
                '"></input><input type="text" class="form-control" id="tble-txt-requested" autoComplete="off"value="' +
                result[i].Requested +
                '" ></input></td>';
              cols +=
                '<td><select id="tble-ChildGender" class="form-control personalview tble-ChildGender-' +
                i +
                '"><option value="-">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>';
              cols +=
                '<td><input type="date" id="tble-child-dob"  max="' +
                moment().format("YYYY-MM-DD") +
                '" class="form-control personalview" autoComplete="off"value="' +
                result[i].DOB +
                '" ></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-passport-no" class="form-control personalview" autoComplete="off"value="' +
                result[i].PassportNo +
                '" ></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-emirate-no"  maxlength="15" class="form-control personalview" autoComplete="off"value="' +
                result[i].EmiratesNo +
                '" ></input></td>';
              newrow.append(cols);
              $("table #tble-tbody-dynamic").append(newrow);
              //setTimeout(() => {
              $(".tble-ChildGender-" + i + "").val(result[i].Gender);
              //}, 2500);
            }
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("Personal Emergency Contact Person InUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonInUAEcounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><input type="hidden" id="hdn-personalcontactperson-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name2" autoComplete="off"value="' +
              result[i].Name2 +
              '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-worklocation2" autoComplete="off"value="' +
              result[i].WorkLocation2 +
              '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-contactnumber2" autoComplete="off"value="' +
              result[i].ContactNumber2 +
              '"></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicEmergencyContact").append(newrow);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonOutsideUAE = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personalcontperson-out-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name3" autoComplete="off"value="' +
              result[i].Name3 +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-relation3" autoComplete="off"value="' +
              result[i].Relation3 +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-contactnumber3" autoComplete="off"value="' +
              result[i].ContactNumber3 +
              '"></input></td>';

            newrows.append(colss);
            $(
              "table #tble-tbody-dynamicemergencycontactpepersonoutside"
            ).append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Professional Qualification")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Qualification",
        "YearofGraducation",
        "University",
        "ONBSessionID"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            qualificationcounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-qualif-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-Name-qualification"   autoComplete="off"value="' +
              result[i].Qualification +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-University"  autoComplete="off"value="' +
              result[i].University +
              '"></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt"  maxlength="4" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "To",
        "Experience",
        "Reason",
        "From",
        "Organizationdesc",
        "ONBSessionID"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"  id="tble-txt-OrganizationName" autoComplete="off"value="' +
              result[i].OrganizationName +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-OrganizationDesignation" class"personalview" autoComplete="off"value="' +
              result[i].Organizationdesc +
              '"></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" autoComplete="off"value="' +
              result[i].From +
              '" max="' +
              moment().format("YYYY-MM") +
              '"></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"value="' +
              result[i].To +
              '"></input></td>';
            colss +=
              '<td><input type="text"  maxlength="4"  id="tble-txt-tble-txt-Years_of_Experience" autoComplete="off"value="' +
              result[i].Experience +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-Reason_for_leaving" autoComplete="off"value="' +
              result[i].Reason +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3_Employment_History").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Research Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year",
        "ONBSessionID"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            ResearchPublicationDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personaltab-reserch-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-name-Research" autoComplete="off"value="' +
              result[i].ResearchName +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '"></input></td>';
            colss +=
              '<td><input type="text"  maxlength="4" id="tble-txt-year-Research" autoComplete="off"value="' +
              result[i].year +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamicResearch").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("personal Reference Details")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Email",
        "Contact",
        "ONBSessionID"
      )

      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmployeeReferenceDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-ref-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-Name-ResearchDetails" autoComplete="off"value="' +
              result[i].Name +
              '"></input></td>';

            colss +=
              '<td><input type="text"  id="tble-txt-Email-ResearchDetails"  autoComplete="off"value="' +
              result[i].Email +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-contactno-ResearchDetails"  autoComplete="off"value="' +
              result[i].Contact +
              '"></input></td>';
            newrows.append(colss);
            $("table #tble-tbody-dynamicemployreference").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Relative friend Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Worklocation",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><input type="hidden" id="hdn-personal-relativefriend-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="relative-friend-name" class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Name +
              '" ></input></td>';
            colss +=
              '<td><input type="text" id="relative-friend-worklocation"  class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Worklocation +
              '" ></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-relative-friend").append(newrows);
          }
        }
      });
  }

  // for Edit
  public GetPersonaldocumentlibrarydataEdit(Name) {
    if (GlobalFormOpenedMode == "Edit") {
      //"jj1")
      var allitem = [];
      var allitem3 = [];
      var allitem32 = [];
      var allitem33 = [];
      var allitem34 = [];
      var allitem35 = [];
      var allitem36 = [];
      var allitem37 = [];
      var allitem38 = [];
      var allitem39 = [];
      var allitem310 = [];
      var allitem311 = [];
      var allitem312 = [];
      var allitem313 = [];
      var allitem314 = [];
      var licencefileurl = [];
      var nationalfileurl = [];

      var str = Name;
      //str)
      var AttachmentEmployeeFullName = str.split(" ").join("");
      //FullName)
      newweb
        .getFolderByServerRelativeUrl(
          `PersonalAttachments/${AttachmentEmployeeFullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          const Temparr = [];
          for (var i = 0; i < files.length; i++) {
            Temparr.push(files[i]);
          }
          for (var i = 0; i < Temparr.length; i++) {
            if (Temparr[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {
              allitem.push(Temparr[i]);
            }
          }
          var number1, number2, number3, number4, number5, number6, number7, number8, number9, number10, number11, number12, number13, number14;
          number1 = number2 = number3 = number4 = number5 = number6 = number7 = number8 = number9 = number10 = number11 = number12 = number13 = number14 = 1;

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").show();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");
            }

            if (allitem[i].ListItemAllFields.Tags == "All experience certificate") {
              var allexperience_fileurl = allitem[i].ServerRelativeUrl;

              $(".allexperience_get_filesList").append(`
              <div class="allexperience-edit allfiles_view">${number1++}.
              <a href=${allexperience_fileurl} id="allexperience_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_allexperience">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#allexperience").attr("style", "width:100px");
              $("#allexperience-yes").show();
              $("#allexperience-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              var Highschool_fileurl = allitem[i].ServerRelativeUrl;

              $(".Highschool_get_filesList").append(`
              <div class="Highschool-edit allfiles_view">${number2++}.
              <a href=${Highschool_fileurl} id="Highschool_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Highschool">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Highschool").attr("style", "width:100px");
              $("#Highschool-yes").show();
              $("#Highschool-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              var Highersecondary_fileurl = allitem[i].ServerRelativeUrl;


              $(".Highersecondary_get_filesList").append(`
              <div class="Highersecondary-edit allfiles_view">${number3++}.
              <a href=${Highersecondary_fileurl} id="Highersecondary_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Highersecondary">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Highersecondary").attr("style", "width:100px");
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              var UG_degree_fileurl = allitem[i].ServerRelativeUrl;


              $(".UG-degree_get_filesList").append(`
              <div class="UG-degree-edit allfiles_view">${number4++}.
              <a href=${UG_degree_fileurl} id="UG-degree_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_UG-degree">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#HBachelor-UG-degree").attr("style", "width:100px");
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              var PG_degree_fileurl = allitem[i].ServerRelativeUrl;

              $(".PG-degree_get_filesList").append(`
              <div class="PG_degree-edit allfiles_view">${number5++}.
              <a href=${PG_degree_fileurl} id="PG_degree_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_PG-degree">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#PG-degree").attr("style", "width:100px");
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              var Sponsors_passportvisa_fileurl = allitem[i].ServerRelativeUrl;


              $(".Sponsors_passportvisa_get_filesList").append(`
              <div class="Sponsors_passportvisa-edit allfiles_view">${number6++}.
              <a href=${Sponsors_passportvisa_fileurl} id="Sponsors_passportvisa_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Sponsors_passportvisa">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Sponsors_passportvisa").attr("style", "width:100px");
              $("#Sponsors_passportvisa-yes").show();
              $("#Sponsors_passportvisa-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Insurance continuity letter") {
              var Insurance_continuity_fileurl = allitem[i].ServerRelativeUrl;

              $(".Insurance_continuity_letter_get_filesList").append(`
              <div class="Insurance_continuity-edit allfiles_view">${number7++}.
              <a href=${Insurance_continuity_fileurl} id="Insurance_continuity_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Insurance_continuity_letter">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Insurance_continuity_letter").attr("style", "width:100px");
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              var previous_emiratesid_fileurl = allitem[i].ServerRelativeUrl;

              $(".previous-emiratesid_get_filesList").append(`
              <div class="previous-emiratesid_-edit allfiles_view">${number8++}.
              <a href=${previous_emiratesid_fileurl} id="previous-emiratesid_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_previous-emiratesid">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#previous-emiratesid").attr("style", "width:100px");
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              var Previousvisa_fileurl = allitem[i].ServerRelativeUrl;

              $(".Previousvisa_get_filesList").append(`
              <div class="Previousvisa-edit allfiles_view">${number9++}.
              <a href=${Previousvisa_fileurl} id="Previousvisa_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Previousvisa">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Previousvisa").attr("style", "width:100px");
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              var passportbackpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportbackpage_get_filesList").append(`
              <div class="passportbackpage-edit allfiles_view">${number10++}.
              <a href=${passportbackpage_fileurl} id="passportbackpage_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_passportbackpage">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#passportbackpage").attr("style", "width:100px");
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              var passportcopy_frontpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportcopy-frontpage_get_filesList").append(`
              <div class="passportcopy-frontpage-edit allfiles_view">${number11++}.
              <a href=${passportcopy_frontpage_fileurl} id="passportcopy_frontpage_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_passportcopy-frontpage">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#passportcopy-frontpage").attr("style", "width:100px");
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              var Updated_Resumefileurl = allitem[i].ServerRelativeUrl;

              $(".Updated_Resume_get_filesList").append(`
              <div class="Updated_Resume-edit allfiles_view">${number12++}.
              <a href=${Updated_Resumefileurl} id="Updated_Resume_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_Updated_Resume">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#Updated_Resume").attr("style", "width:100px");
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {

              var HighQualityPhotofileurl = allitem[i].ServerRelativeUrl;


              $(".High-QualityPhoto_get_filesList").append(`
              <div class="High-QualityPhoto-edit allfiles_view">${number13++}.
              <a href=${HighQualityPhotofileurl} id="High-QualityPhoto_files"  target="_blank" data-interception="off">click here</a>

              <span class="file_High-QualityPhoto">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>
              </div>
              `)

              $("#High-QualityPhoto").attr("style", "width:100px");
              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "National ID Attachments") {

              var nationalfilesurl = allitem[i].ServerRelativeUrl

              $(".nationalid_get_filesList").append(`
              <div class="national-edit">${number14++}.
              <a href=${nationalfilesurl} id="nat_files" target="_blank" data-interception="off">click here</a>

              <span class="file_national">
              <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
              alt="image" class="delete_document_item" ></img></span>

              </div>
              `)

              $("#nationalid").attr("style", "width:100px");
              $("#nationalid-yes").show();
              $("#nationalid-no").hide();

            }

          }

          //click  functions.....

          this.DeleteAttachment();
          this.Attachmentchecking();
        });
    }
  }
  public DeleteAttachment() {
    if ($(".nationalid_get_filesList").children().length == 0) {
      $("#nationalid").attr("style", "width:200px");
    }

    $(`.file_national`).on('click', function () {
      var url = $(this).parent().find("#nat_files").attr("href")

      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".nationalid_get_filesList").children().length == 0) {
            $("#nationalid-yes").hide();
            $("#nationalid-no").show();
            $("#nationalid").attr("style", "width:200px");
          }
        }
      })



    })

    if ($(".allexperience_get_filesList").children().length == 0) {
      $("#allexperience").attr("style", "width:200px");
    }
    $(`.file_allexperience`).on('click', function () {
      var url = $(this).parent().find("#allexperience_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".allexperience_get_filesList").children().length == 0) {
            $("#allexperience-yes").hide();
            $("#allexperience-no").show();
            $("#allexperience").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Highschool_get_filesList").children().length == 0) {
      $("#Highschool").attr("style", "width:200px");
    }
    $(`.file_Highschool`).on('click', function () {
      var url = $(this).parent().find("#Highschool_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Highschool_get_filesList").children().length == 0) {
            $("#Highschool-yes").hide();
            $("#Highschool-no").show();
            $("#Highschool").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Highersecondary_get_filesList").children().length == 0) {
      $("#Highersecondary").attr("style", "width:200px");
    }
    $(`.file_Highersecondary`).on('click', function () {
      var url = $(this).parent().find("#Highersecondary_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Highersecondary_get_filesList").children().length == 0) {
            $("#Highersecondary-yes").hide();
            $("#Highersecondary-no").show();
            $("#Highersecondary").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".UG-degree_get_filesList").children().length == 0) {
      $("#HBachelor-UG-degree").attr("style", "width:200px");
    }
    $(`.file_UG-degree`).on('click', function () {
      var url = $(this).parent().find("#UG-degree_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".UG-degree_get_filesList").children().length == 0) {
            $("#HBachelor-UG-degree-yes").hide();
            $("#HBachelor-UG-degree-no").show();
            $("#HBachelor-UG-degree").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".PG-degree_get_filesList").children().length == 0) {
      $("#PG-degree").attr("style", "width:200px");
    }
    $(`.file_PG-degree`).on('click', function () {
      var url = $(this).parent().find("#PG_degree_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".PG-degree_get_filesList").children().length == 0) {
            $("#PG-degree-yes").hide();
            $("#PG-degree-no").show();
            $("#PG-degree").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Sponsors_passportvisa_get_filesList").children().length == 0) {
      $("#Sponsors_passportvisa").attr("style", "width:200px");
    }
    $(`.file_Sponsors_passportvisa`).on('click', function () {
      var url = $(this).parent().find("#Sponsors_passportvisa_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Sponsors_passportvisa_get_filesList").children().length == 0) {
            $("#Sponsors_passportvisa-yes").hide();
            $("#Sponsors_passportvisa-no").show();
            $("#Sponsors_passportvisa").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Insurance_continuity_letter_get_filesList").children().length == 0) {
      $("#Insurance_continuity_letter").attr("style", "width:200px");
    }
    $(`.file_Insurance_continuity_letter`).on('click', function () {
      var url = $(this).parent().find("#Insurance_continuity_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Insurance_continuity_letter_get_filesList").children().length == 0) {
            $("#Insurance_continuity_letter-yes").hide();
            $("#Insurance_continuity_letter-no").show();
            $("#Insurance_continuity_letter").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".previous-emiratesid_get_filesList").children().length == 0) {
      $("#previous-emiratesid").attr("style", "width:200px");
    }
    $(`.file_previous-emiratesid`).on('click', function () {
      var url = $(this).parent().find("#previous-emiratesid_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".previous-emiratesid_get_filesList").children().length == 0) {
            $("#emiratesid-yes").hide();
            $("#emiratesid-no").show();
            $("#previous-emiratesid").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Previousvisa_get_filesList").children().length == 0) {
      $("#Previousvisa").attr("style", "width:200px");
    }
    $(`.file_Previousvisa`).on('click', function () {
      var url = $(this).parent().find("#Previousvisa_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Previousvisa_get_filesList").children().length == 0) {
            $("#Previousvisa-yes").hide();
            $("#Previousvisa-no").show();
            $("#Previousvisa").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".passportbackpage_get_filesList").children().length == 0) {
      $("#passportbackpage").attr("style", "width:200px");
    }
    $(`.file_passportbackpage`).on('click', function () {
      var url = $(this).parent().find("#passportbackpage_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".passportbackpage_get_filesList").children().length == 0) {
            $("#passportbackpage-yes").hide();
            $("#passportbackpage-no").show();
            $("#passportbackpage").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".passportcopy-frontpage_get_filesList").children().length == 0) {
      $("#passportcopy-frontpage").attr("style", "width:200px");
    }
    $(`.file_passportcopy-frontpage`).on('click', function () {
      var url = $(this).parent().find("#passportcopy_frontpage_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".passportcopy-frontpage_get_filesList").children().length == 0) {
            $("#passportcopy-yes").hide();
            $("#passportcopy-no").show();
            $("#passportcopy-frontpage").attr("style", "width:200px");
          }
        }
      })

    })

    if ($(".Updated_Resume_get_filesList").children().length == 0) {
      $("#Updated_Resume").attr("style", "width:200px");
    }
    $(`.file_Updated_Resume`).on('click', function () {
      var url = $(this).parent().find("#Updated_Resume_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".Updated_Resume_get_filesList").children().length == 0) {
            $("#Updated_Resume-yes").hide();
            $("#Updated_Resume-no").show();
            $("#Updated_Resume").attr("style", "width:200px");
          }
        }
      })

    })


    if ($(".High-QualityPhoto_get_filesList").children().length == 0) {
      $("#High-QualityPhoto").attr("style", "width:200px");
    }
    $(`.file_High-QualityPhoto`).on('click', function () {
      var url = $(this).parent().find("#High-QualityPhoto_files").attr("href")
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        if (willdelete) {

          newweb.getFileByServerRelativeUrl(url).recycle()
          $(this).parent().remove();
          if ($(".High-QualityPhoto_get_filesList").children().length == 0) {
            $("#QualityPhoto-yes").hide();
            $("#QualityPhoto-no").show();
            $("#High-QualityPhoto").attr("style", "width:200px");
          }
        }
      })

    })


  }
  //for view

  public GetPersonaldocumentlibrarydataView(Name) {
    if (GlobalFormOpenedMode == "View") {
      //"jj1")
      var allitem = [];
      var allitem3 = [];
      var allitem32 = [];
      var allitem33 = [];
      var allitem34 = [];
      var allitem35 = [];
      var allitem36 = [];
      var allitem37 = [];
      var allitem38 = [];
      var allitem39 = [];
      var allitem310 = [];
      var allitem311 = [];
      var allitem312 = [];
      var allitem313 = [];
      var allitem314 = [];
      var licencefileurl = [];
      var nationalfileurl = [];
      var str = Name;
      //str)
      var AttachmentEmployeeFullName = str.split(" ").join("");
      //FullName)
      newweb
        .getFolderByServerRelativeUrl(
          `PersonalAttachments/${AttachmentEmployeeFullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          const Temparr = [];
          for (var i = 0; i < files.length; i++) {
            Temparr.push(files[i]);
          }
          for (var i = 0; i < Temparr.length; i++) {
            if (Temparr[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {
              allitem.push(Temparr[i]);
            }
          }
          var number1, number2, number3, number4, number5, number6, number7, number8, number9, number10, number11, number12, number13, number14;
          number1 = number2 = number3 = number4 = number5 = number6 = number7 = number8 = number9 = number10 = number11 = number12 = number13 = number14 = 1;
          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").show();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");
            }

            //table attachments....

            if (allitem[i].ListItemAllFields.Tags == "All experience certificate") {
              var allexperience_fileurl = allitem[i].ServerRelativeUrl;

              $(".allexperience_get_filesList").append(`
              <div class="allexperience-view allfiles_view">${number1++}.
              <a href=${allexperience_fileurl} id="allexperience_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#allexperience").hide();
              $("#allexperience-yes").show();
              $("#allexperience-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              var Highschool_fileurl = allitem[i].ServerRelativeUrl;

              $(".Highschool_get_filesList").append(`
              <div class="Highschool-view allfiles_view">${number2++}.
              <a href=${Highschool_fileurl} id="Highschool_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Highschool").hide();
              $("#Highschool-yes").show();
              $("#Highschool-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              var Highersecondary_fileurl = allitem[i].ServerRelativeUrl;


              $(".Highersecondary_get_filesList").append(`
              <div class="Highersecondary-view allfiles_view">${number3++}.
              <a href=${Highersecondary_fileurl} id="Highersecondary_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Highersecondary").hide();
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              var UG_degree_fileurl = allitem[i].ServerRelativeUrl;


              $(".UG-degree_get_filesList").append(`
              <div class="UG-degree-view allfiles_view">${number4++}.
              <a href=${UG_degree_fileurl} id="UG-degree_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#HBachelor-UG-degree").hide();
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              var PG_degree_fileurl = allitem[i].ServerRelativeUrl;

              $(".PG-degree_get_filesList").append(`
              <div class="PG_degree-view allfiles_view">${number5++}.
              <a href=${PG_degree_fileurl} id="PG_degree_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#PG-degree").hide();
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              var Sponsors_passportvisa_fileurl = allitem[i].ServerRelativeUrl;


              $(".Sponsors_passportvisa_get_filesList").append(`
              <div class="Sponsors_passportvisa-view allfiles_view">${number6++}.
              <a href=${Sponsors_passportvisa_fileurl} id="Sponsors_passportvisa_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Sponsors_passportvisa").hide();
              $("#Sponsors_passportvisa-yes").show();
              $("#Sponsors_passportvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Insurance continuity letter") {
              var Insurance_continuity_fileurl = allitem[i].ServerRelativeUrl;

              $(".Insurance_continuity_letter_get_filesList").append(`
              <div class="Insurance_continuity-view allfiles_view">${number7++}.
              <a href=${Insurance_continuity_fileurl} id="Insurance_continuity_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Insurance_continuity_letter").hide();
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              var previous_emiratesid_fileurl = allitem[i].ServerRelativeUrl;

              $(".previous-emiratesid_get_filesList").append(`
              <div class="previous-emiratesid_-view allfiles_view">${number8++}.
              <a href=${previous_emiratesid_fileurl} id="previous-emiratesid_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#previous-emiratesid").hide();
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              var Previousvisa_fileurl = allitem[i].ServerRelativeUrl;

              $(".Previousvisa_get_filesList").append(`
              <div class="Previousvisa-view allfiles_view">${number9++}.
              <a href=${Previousvisa_fileurl} id="Previousvisa_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Previousvisa").hide();
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              var passportbackpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportbackpage_get_filesList").append(`
              <div class="passportbackpage-view allfiles_view">${number10++}.
              <a href=${passportbackpage_fileurl} id="passportbackpage_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#passportbackpage").hide();
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              var passportcopy_frontpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportcopy-frontpage_get_filesList").append(`
              <div class="passportcopy-frontpage-view allfiles_view">${number11++}.
              <a href=${passportcopy_frontpage_fileurl} id="passportcopy_frontpage_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#passportcopy-frontpage").hide();
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              var Updated_Resumefileurl = allitem[i].ServerRelativeUrl;


              $(".Updated_Resume_get_filesList").append(`
              <div class="Updated_Resume-view allfiles_view">${number12++}.
              <a href=${Updated_Resumefileurl} id="Updated_Resume_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Updated_Resume").hide();
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              var HighQualityPhotofileurl = allitem[i].ServerRelativeUrl;


              $(".High-QualityPhoto_get_filesList").append(`
              <div class="High-QualityPhoto-view allfiles_view">${number13++}.
              <a href=${HighQualityPhotofileurl} id="High-QualityPhoto_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#High-QualityPhoto").hide();
              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "National ID Attachments") {
              var nationalfileurl = allitem[i].ServerRelativeUrl;

              $(".nationalid_get_filesList").append(`
              <div class="national-view allfiles_view">${number14++}.
              <a href=${nationalfileurl} id="nat_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)
              $("#nationalid").hide();
              $("#nationalid-yes").show();
              $("#nationalid-no").hide();
            }


          }

        });
    }
  }



  //for print
  public GetPersonaldocumentlibrarydataforprint(names) {



    if (GlobalFormOpenedMode == "View") {
      var allitem = [];
      var allitem3 = [];
      var allitem32 = [];
      var allitem33 = [];
      var allitem34 = [];
      var allitem35 = [];
      var allitem36 = [];
      var allitem37 = [];
      var allitem38 = [];
      var allitem39 = [];
      var allitem310 = [];
      var allitem311 = [];
      var allitem312 = [];
      var allitem313 = [];
      var allitem314 = [];
      var licencefileurl = [];
      var nationalfileurl = [];
      var str = names;
      var AttachmentEmployeeFullName = str.split(" ").join("");
      //FullName)
      newweb
        .getFolderByServerRelativeUrl(
          `PersonalAttachments/${AttachmentEmployeeFullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          const Temparr = [];
          for (var i = 0; i < files.length; i++) {
            Temparr.push(files[i]);
          }
          for (var i = 0; i < Temparr.length; i++) {
            if (Temparr[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {
              allitem.push(Temparr[i]);
            }
          }
          var number1, number2, number3, number4, number5, number6, number7, number8, number9, number10, number11, number12, number13, number14;
          number1 = number2 = number3 = number4 = number5 = number6 = number7 = number8 = number9 = number10 = number11 = number12 = number13 = number14 = 1;
          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);

              printlicencefile = licencefileurl[0].Name;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").hide();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();

              $("#print-uploadedlicence-yes").show();
              $("#print-uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");
            }

            //table attachments....

            if (allitem[i].ListItemAllFields.Tags == "All experience certificate") {
              var allexperience_fileurl = allitem[i].Name;

              $(".print-allexperience_get_filesList").append(`
              <div class="allexperience-view allfiles_view">${number1++}.
              <a href=${allexperience_fileurl} id="allexperience_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-allexperience").hide();
              $("#print-allexperience-yes").show();
              $("#print-allexperience-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              var Highschool_fileurl = allitem[i].Name;

              $(".print-Highschool_get_filesList").append(`
              <div class="Highschool-view allfiles_view">${number2++}.
              <a href=${Highschool_fileurl} id="Highschool_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Highschool").hide();
              $("#print-Highschool-yes").show();
              $("#print-Highschool-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              var Highersecondary_fileurl = allitem[i].Name;


              $(".print-Highersecondary_get_filesList").append(`
              <div class="Highersecondary-view allfiles_view">${number3++}.
              <a href=${Highersecondary_fileurl} id="Highersecondary_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Highersecondary").hide();
              $("#print-Highersecondary-yes").show();
              $("#print-Highersecondary-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              var UG_degree_fileurl = allitem[i].Name;


              $(".print-UG-degree_get_filesList").append(`
              <div class="UG-degree-view allfiles_view">${number4++}.
              <a href=${UG_degree_fileurl} id="UG-degree_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-HBachelor-UG-degree").hide();
              $("#print-HBachelor-UG-degree-yes").show();
              $("#print-HBachelor-UG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              var PG_degree_fileurl = allitem[i].Name;

              $(".print-PG-degree_get_filesList").append(`
              <div class="PG_degree-view allfiles_view">${number5++}.
              <a href=${PG_degree_fileurl} id="PG_degree_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-PG-degree").hide();
              $("#print-PG-degree-yes").show();
              $("#print-PG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              var Sponsors_passportvisa_fileurl = allitem[i].Name;


              $(".print-Sponsors_passportvisa_get_filesList").append(`
              <div class="Sponsors_passportvisa-view allfiles_view">${number6++}.
              <a href=${Sponsors_passportvisa_fileurl} id="Sponsors_passportvisa_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Sponsors_passportvisa").hide();
              $("#print-Sponsors_passportvisa-yes").show();
              $("#print-Sponsors_passportvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Insurance continuity letter") {
              var Insurance_continuity_fileurl = allitem[i].Name;

              $(".print-Insurance_continuity_letter_get_filesList").append(`
              <div class="Insurance_continuity-view allfiles_view">${number7++}.
              <a href=${Insurance_continuity_fileurl} id="Insurance_continuity_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Insurance_continuity_letter").hide();
              $("#print-Insurance_continuity_letter-yes").show();
              $("#print-Insurance_continuity_letter-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              var previous_emiratesid_fileurl = allitem[i].Name;

              $(".print-previous-emiratesid_get_filesList").append(`
              <div class="previous-emiratesid_-view allfiles_view">${number8++}.
              <a href=${previous_emiratesid_fileurl} id="previous-emiratesid_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-previous-emiratesid").hide();
              $("#print-emiratesid-yes").show();
              $("#print-emiratesid-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              var Previousvisa_fileurl = allitem[i].Name;

              $(".print-Previousvisa_get_filesList").append(`
              <div class="Previousvisa-view allfiles_view">${number9++}.
              <a href=${Previousvisa_fileurl} id="Previousvisa_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Previousvisa").hide();
              $("#print-Previousvisa-yes").show();
              $("#print-Previousvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              var passportbackpage_fileurl = allitem[i].Name;


              $(".print-passportbackpage_get_filesList").append(`
              <div class="passportbackpage-view allfiles_view">${number10++}.
              <a href=${passportbackpage_fileurl} id="passportbackpage_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-passportbackpage").hide();
              $("#print-passportbackpage-yes").show();
              $("#print-passportbackpage-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              var passportcopy_frontpage_fileurl = allitem[i].Name;


              $(".print-passportcopy-frontpage_get_filesList").append(`
              <div class="passportcopy-frontpage-view allfiles_view">${number11++}.
              <a href=${passportcopy_frontpage_fileurl} id="passportcopy_frontpage_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-passportcopy-frontpage").hide();
              $("#print-passportcopy-yes").show();
              $("#print-passportcopy-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              var Updated_Resumefileurl = allitem[i].Name;


              $(".print-Updated_Resume_get_filesList").append(`
              <div class="Updated_Resume-view allfiles_view">${number12++}.
              <a href=${Updated_Resumefileurl} id="Updated_Resume_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-Updated_Resume").hide();
              $("#print-Updated_Resume-yes").show();
              $("#print-Updated_Resume-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              var HighQualityPhotofileurl = allitem[i].Name;


              $(".print-High-QualityPhoto_get_filesList").append(`
              <div class="High-QualityPhoto-view allfiles_view">${number13++}.
              <a href=${HighQualityPhotofileurl} id="High-QualityPhoto_files"  target="_blank" data-interception="off"></a>
              </div>
              `)

              $("#print-High-QualityPhoto").hide();
              $("#print-QualityPhoto-yes").show();
              $("#print-QualityPhoto-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "National ID Attachments") {
              var nationalfileurl = allitem[i].Name;

              $(".print-nationalid_get_filesList").append(`
              <div class="national-view allfiles_view">${number14++}.
              <a href=${nationalfileurl} id="nat_files"  target="_blank" data-interception="off"></a>
              </div>
              `)
              $("#print-nationalid").hide();
              $("#print-nationalid-yes").show();
              $("#print-nationalid-no").hide();
            }


          }

        });
    }

  }

  public Dynamicnamevalid() {
    var status = true;

    if (status == true && $("#dynamicFullName").val() != "") {
      $(".err-fullname-err").hide();
    } else {
      $(".err-fullname-err").show();
      status = false;
      $("#dynamicFullName").focus();
    }
    return status;
  }
  public Dynamicfirst_name() {
    var status = true;

    if (status == true && $("#FirstNames").val() != "") {
      $("#err-FirstName").hide();
    } else {
      $("#err-FirstName").show();
      status = false;
      $("#FirstNames").focus();
    }
    return status;
  }

  public Dynamiclast_name() {
    var status = true;

    if (status == true && $(".personalLastname").val() != "") {
      $("#err-Lastname").hide();
    } else {
      $("#err-Lastname").show();
      status = false;
      $(".personalLastname").focus();
    }
    return status;
  }

  public Password_dynamicvalidation() {
    var status = true;
    if (status == true && $("#Doh-license").is(":checked")) {
      if (status == true && $("#Password-dynamic").val() != "") {
        $("#err-password").hide();
      } else {
        $("#err-password").show();
        $("#Password-dynamic").focus();
        status = false;
      }
    }
    return status;
  }
  public UpdateOtherForms(ONBSessionID) {
    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Employee Joining Report Transaction")
            .items.getById(result[0].ID)
            .update({
              Name: $("#dynamicFullName").val(),
              Passport_x0020_No: $(`.documentnos`).val(),
              SponsorName: $(`.SponsorNames`).val(),
            });
        }
      });
    newweb.lists
      .getByTitle("COI Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("COI Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("Employee Coc Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Employee Coc Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("LetterAuthorization")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("LetterAuthorization")
            .items.getById(result[0].ID)
            .update({
              FirstName: $(".empfirstname").val(),
              LastName: $(".personalLastname").val(),
              MiddleName: $("#PersonalMiddleName").val(),
            });
        }
      });
    newweb.lists
      .getByTitle("Emp NDA Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Emp NDA Transaction")
            .items.getById(result[0].ID)
            .update({
              Name: $("#dynamicFullName").val(),
              PassportNo: $(".documentnos").val(),
              National: $("#CurrentNationality").val(),
              SurName: $("#surenmaepersonal").val(),
              SurName1: $("#surenmaepersonal").val(),
            });
        }
      });
    newweb.lists
      .getByTitle("Specimen Signature Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Specimen Signature Transaction")
            .items.getById(result[0].ID)
            .update({
              FullName: $("#dynamicFullName").val(),
              Nationality: $(`.Current-Nationality`).val(),
              MobileNo: $(`.contactnumbers`).val(),
              EmailAddress: $(`.emailsids`).val(),
              CountryCode: $("#country-code").val(),
              PassportNo: $(`.documentnos`).val(),
            });
        }
      });

    newweb.lists
      .getByTitle("Acknowledgement And Policy Declarations Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Acknowledgement And Policy Declarations Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
              ContactNumber: $(".contactnumbers").val(),
              Countrycode: $("#country-code").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("Employee Stamp Acknowledgement Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Employee Stamp Acknowledgement Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeePrintedName: $("#dynamicFullName").val(),
            });
        }
      });
    newweb.lists
      .getByTitle("Employee Dosimeter Acknowledgement Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Employee Dosimeter Acknowledgement Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("PhotoVideo Consent and Release Form Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("PhotoVideo Consent and Release Form Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("Physician Profile for PR Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("Physician Profile for PR Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
              EmployeeNationality: $("#CurrentNationality").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("EmployeeBankDetailsMaster")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("EmployeeBankDetailsMaster")
            .items.getById(result[0].ID)
            .update({
              NameofEmployee: $("#dynamicFullName").val(),
            });
        }
      });

    newweb.lists
      .getByTitle("UniformRequest")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("UniformRequest")
            .items.getById(result[0].ID)
            .update({
              NameofRequestor: $("#dynamicFullName").val(),
              Sex: $("#PersonalGender").val(),
            });
        }
      });
    newweb.lists
      .getByTitle("HR IT Privilege Transaction")
      .items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          newweb.lists
            .getByTitle("HR IT Privilege Transaction")
            .items.getById(result[0].ID)
            .update({
              EmployeeName: $("#dynamicFullName").val(),
              EmployeeCategory: $("#EmployeeCategory").val(),

            });
        }
      });

    newweb.lists.getByTitle("Pre Existing Medical Condition Transaction").items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`).get().then((item) => {
        if (item.length != 0) {
          newweb.lists.getByTitle("Pre Existing Medical Condition Transaction").items.getById(item[0].ID)
            .update({
              FirstName: $(".empfirstname").val(),
              LastName: $(".personalLastname").val(),
              Nationality: $(`.Current-Nationality`).val(),
              DateofBirth: moment($(".dobpersonal").val()).format("MM-DD-YYYY"),
              Gender: $("#PersonalGender").val(),
            })
        }

      })
    newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction").items.select("ID", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`).get().then((item) => {
        if (item.length != 0) {
          newweb.lists.getByTitle("Integrity And Benefit Disclosure Transaction").items.getById(item[0].ID)
            .update({
              FullName: $("#dynamicFullName").val(),
            })
        }

      })
  }

  public Updatepersonalinformationdata() {
    if (


      this.Dynamicnamevalid() &&
      this.Dynamicfirst_name() &&
      this.Dynamiclast_name() &&
      this.surNamevalidation() &&
      this.Validationofempcategory() &&
      this.gendervalidation() &&
      this.PlaceofBirth() &&
      this.DateofBirth() &&
      this.CurrentNationality() &&
      this.PreviousNationality() &&
      this.Religion() &&
      // this.Entereds() &&
      // this.Portss() &&
      this.countrycode() &&
      this.ContactNumber() &&
      this.mobilenumberonly() &&
      this.BlooodGroupnewhirevalidation() &&
      this.EmployeeStatus() &&
      this.DocumentNo() &&
      this.PlaceofIssue() &&
      this.DateofIssue() &&
      this.DateofExpiry() &&
      //  this.QualificationValidation() &&
      //   this.EmploymentHistoryValidation() &&
      // this.EmployeeReferenceDetailsValidation() &&
      this.maritalstatusvalidation() &&

      this.FathersName() &&
      this.Nationality3() &&
      this.PlaceofBirththree() &&
      this.DateofBirththree() &&
      this.Occupationthree() &&
      this.HomeAddresshree() &&
      this.MotherName() &&
      this.Nationalityfour() &&
      this.PlaceofBirthfour() &&
      this.DateofBirthfour() &&
      this.Occupationfour() &&
      this.HomeAddressfour() &&
      this.contactcodethreevalid() &&
      this.HomeCountrysNumbers() &&
      this.homecontactnoformat() &&
      this.validation_email() &&
      this.Homeemailsids() &&
      this.YesnoApplid() &&
      this.EmergencyContactPersonInUAEValidation() &&
      //  this.EmergencyContactPersonOutsideValidation() &&
      this.Yesnoapplidthenfieldvalidation() &&
      this.YesnoapplidthenPositionfieldvalidation() &&
      this.telephonenumberuae() &&
      this.Mobilenovaliduae() &&
      this.ifdataflowcompleted() &&
      this.username_validation() &&
      this.Password_dynamicvalidation() &&
      this.Licence_AttachmentvalidationEDIT()
    ) {


      var malefemle = $("#MaritalStatus").find(":selected").text();

      if ($(".YesHaveyoueverapplied").is(":checked")) {
        var YesHaveyoueverapplied = "Yes";
      } else {
        YesHaveyoueverapplied = "No";
      }

      if ($("#spouse").is(":checked")) {
        var spouse = "Yes";
      } else {
        spouse = "No";
      }

      if ($("#Sister").is(":checked")) {
        var Sister = "Yes";
      } else {
        Sister = "No";
      }

      if ($("#Brother").is(":checked")) {
        var Brother = "Yes";
      } else {
        Brother = "No";
      }

      if ($("#Friend").is(":checked")) {
        var Friend = "Yes";
      } else {
        Friend = "No";
      }

      if ($("#Cousin").is(":checked")) {
        // //Cousin);
        var Cousin = "Yes";
      } else {
        Cousin = "No";
      }

      if ($("#AnyOtherCloseRelative").is(":checked")) {
        var AnyOtherCloseRelative = "Yes";
      } else {
        AnyOtherCloseRelative = "No";
      }

      if ($("#NoRelative").is(":checked")) {
        var NoRelative = "Yes";
      } else {
        NoRelative = "No";
      }

      if ($("#NewRegistration").is(":checked")) {
        var newregstation = "Yes";
      } else {
        newregstation = "No";
      }

      if ($(".dataflowYes").is(":checked")) {
        var dataflowYes = "Yes";
      } else if ($(".dataflowno").is(":checked")) {
        dataflowYes = "No";
      } else {
        dataflowYes = "Nothing is selected";
      }
      if ($("#Doh-license").is(":checked")) {
        var Licensetype = "DOH";
      } else if ($("#Moh-license").is(":checked")) {
        Licensetype = "MOH";
      } else if ($("#Dha-license").is(":checked")) {
        Licensetype = "DHA";
      } else {
        Licensetype = "NO";

      }
      swal({
        text: "Please wait!",
        button: false,
        closeOnClickOutside: false,
      } as any);
      newweb.lists
        .getByTitle("Personal Information Master")
        .items.getById(FilterPerosnalitemid)
        .update({
          Title: "PERSONAL INFORMATION FORM",
          FullName: $(`.personalvalue`).val(),
          FirstName: $(".empfirstname").val(),
          LastName: $(".personalLastname").val(),
          MiddleName: $("#PersonalMiddleName").val() == "" ? "-" : $("#PersonalMiddleName").val(),
          SurName: $("#surenmaepersonal").val(),
          PlaceofBirth: $(`.pob`).val(),
          Gender: $("#PersonalGender").val(),
          NewUserBloodGroup: $("#personal-blood-group").val(),
          DateofBirth: moment($(`.dob`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          CurrentNationality: $(`.Current-Nationality`).val(),
          PreviousNationality: $(`.Previous-Nationality`).val(),
          Religion: $(`.religions`).val(),
          Section: $(`.sections`).val() == "" ? "-" : $(".sections").val(),
          Entered: moment($(`.entereds`).val()).format("MM-DD-YYYY"),
          Port: $(`.ports`).val(),
          ContactNumber: $(`.contactnumbers`).val(),
          Countrycodefirstsection: $(`#country-code`).val(),
          SponsorName: $(`.SponsorNames`).val(),
          DocumentNo: $(`.documentnos`).val(),
          PlaceofIssue: $(`.pos`).val(),
          DateofIssue: moment($(`#DateofIssue`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          DateofExpiry: moment($(`#DateofExpiry`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          ResidenceNo: $(`.residenceNos`).val() == "" ? "-" : $(".residenceNos").val(),

          MaritalStatus: malefemle,
          BloodGroup: $(`.bloodgroups`).val(),
          NameofSpouse: $(`.nos`).val(),

          Nationality21: $(`.Nationalitys2`).val(),
          PlaceofBirth2: $(`.pob2`).val(),
          DateofBirth2: moment($(`.dob2`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          PlaceofWork: $(`.pow`).val(),
          Occupation2: $(`.Occupations2`).val(),
          FathersName: $(`.FathersNames`).val(),
          Nationality3: $(`.Nationalitys3`).val(),

          PlaceofBirth3: $(`.pobs3`).val(),
          DateofBirth3: moment($(`.dobs3`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          HomeAddress3: $(`.homeaddress3`).val(),
          Occupation3: $(`.Occupations3`).val(),

          MothersName: $(`.MothersNames`).val(),

          Nationality4: $(`.Nationalitys4`).val(),
          PlaceofBirth4: $(`.pobs4`).val(),
          DateofBirth4: moment($(`.dobs4`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          HomeAddress4: $(`.HomeAddresss4`).val(),
          Occupation4: $(`.Occupations4`).val(),

          CountryNumber: $(`.CountrysNumbers`).val(),
          Countrycodesecondsection: $(`#country-codehomecountry`).val(),
          EmailID: $(`.emailsids`).val(),

          NameofCompany: $(`.NameofCompanys`).val(),

          Position: $(`.positions`).val(),
          //  WorkLocation: $(`.WorkLocations`).val(),
          Emirate: $(`.Emirates`).val(),
          Street: $(`.Streets`).val() == "" ? "-" : $(".Streets").val(),
          Owner: $(`.Owners`).val() == "" ? "-" : $(".Owners").val(),
          FlatNo: $(`.FlatNos`).val() == "" ? "-" : $(".FlatNos").val(),
          Plot: $(`.plots`).val() == "" ? "-" : $(".plots").val(),

          TelephoneNo: $(`.telephonenos`).val(),
          countrycodemobileno: $(`#country-codeMobileNo`).val(),
          MobileNo: $(`.MobileNos`).val(),
          LicenseNo: $(`.LicenseNos`).val() == "" ? "-" : $(".LicenseNos").val(),
          IssueDate: moment($(`.IssueDates`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          ExpiryDate: moment($(`.ExpiryDates`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
          LicenseType: Licensetype,
          NewRegistration: newregstation,
          UserName: $(`.usersnames`).val(),
          Password: $("#Password-dynamic").val(),
          DrivingLicenseNo: $(`.drivinglicenselos`).val(),
          PlateNo: $(`.PlateNoss`).val(),
          dataflowNO: dataflowYes,
          Friend: Friend,
          AnyOtherCloseRelative: AnyOtherCloseRelative,
          NoRelative: NoRelative,
          Cousin: Cousin,
          Sister: Sister,

          Borther: Brother,
          Spouse: spouse,
          HaveyoueverApplied: YesHaveyoueverapplied,
          Category: $("#EmployeeCategory").val(),
          Status: "Updated by Unit HR",
          Provethesame: $("#provide-the-same").val(),
          EmployeeStatus: $("#emp-work-status").val()
        })
        .then(() => {
          this.UpdateOtherForms(GlobalSessionIDValue);
          this.AddTableToListasanHR(PersonalItemId, GlobalSessionIDValue);

          if (this.state.HrCompleteStatus == true) {
            subweb.lists
              .getByTitle("Personal Information HR Update History").items
              .add({
                Title: "PERSONAL INFORMATION FORM",
                FullName: $(`.personalvalue`).val(),
                FirstName: $(".empfirstname").val(),
                LastName: $(".personalLastname").val(),
                MiddleName: $("#PersonalMiddleName").val() == "" ? "-" : $("#PersonalMiddleName").val(),
                SurName: $("#surenmaepersonal").val(),
                PlaceofBirth: $(`.pob`).val(),
                Gender: $("#PersonalGender").val(),
                NewUserBloodGroup: $("#personal-blood-group").val(),
                DateofBirth: moment($(`.dob`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                CurrentNationality: $(`.Current-Nationality`).val(),
                PreviousNationality: $(`.Previous-Nationality`).val(),
                Religion: $(`.religions`).val(),
                Section: $(`.sections`).val() == "" ? "-" : $(".sections").val(),
                Entered: moment($(`.entereds`).val()).format("MM-DD-YYYY"),
                Port: $(`.ports`).val(),
                ContactNumber: $(`.contactnumbers`).val(),
                Countrycodefirstsection: $(`#country-code`).val(),
                SponsorName: $(`.SponsorNames`).val(),
                DocumentNo: $(`.documentnos`).val(),
                PlaceofIssue: $(`.pos`).val(),
                DateofIssue: moment($(`#DateofIssue`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                DateofExpiry: moment($(`#DateofExpiry`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                ResidenceNo: $(`.residenceNos`).val() == "" ? "-" : $(".residenceNos").val(),

                MaritalStatus: malefemle,
                BloodGroup: $(`.bloodgroups`).val(),
                NameofSpouse: $(`.nos`).val(),

                Nationality21: $(`.Nationalitys2`).val(),
                PlaceofBirth2: $(`.pob2`).val(),
                DateofBirth2: moment($(`.dob2`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                PlaceofWork: $(`.pow`).val(),
                Occupation2: $(`.Occupations2`).val(),
                FathersName: $(`.FathersNames`).val(),
                Nationality3: $(`.Nationalitys3`).val(),

                PlaceofBirth3: $(`.pobs3`).val(),
                DateofBirth3: moment($(`.dobs3`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                HomeAddress3: $(`.homeaddress3`).val(),
                Occupation3: $(`.Occupations3`).val(),

                MothersName: $(`.MothersNames`).val(),

                Nationality4: $(`.Nationalitys4`).val(),
                PlaceofBirth4: $(`.pobs4`).val(),
                DateofBirth4: moment($(`.dobs4`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                HomeAddress4: $(`.HomeAddresss4`).val(),
                Occupation4: $(`.Occupations4`).val(),

                CountryNumber: $(`.CountrysNumbers`).val(),
                Countrycodesecondsection: $(`#country-codehomecountry`).val(),
                EmailID: $(`.emailsids`).val(),

                NameofCompany: $(`.NameofCompanys`).val(),

                Position: $(`.positions`).val(),
                //  WorkLocation: $(`.WorkLocations`).val(),
                Emirate: $(`.Emirates`).val(),
                Street: $(`.Streets`).val() == "" ? "-" : $(".Streets").val(),
                Owner: $(`.Owners`).val() == "" ? "-" : $(".Owners").val(),
                FlatNo: $(`.FlatNos`).val() == "" ? "-" : $(".FlatNos").val(),
                Plot: $(`.plots`).val() == "" ? "-" : $(".plots").val(),

                TelephoneNo: $(`.telephonenos`).val(),
                countrycodemobileno: $(`#country-codeMobileNo`).val(),
                MobileNo: $(`.MobileNos`).val(),
                LicenseNo: $(`.LicenseNos`).val() == "" ? "-" : $(".LicenseNos").val(),
                IssueDate: moment($(`.IssueDates`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                ExpiryDate: moment($(`.ExpiryDates`).val(), "YYYY-MM-DD").format("MM-DD-YYYY"),
                LicenseType: Licensetype,
                NewRegistration: newregstation,
                UserName: $(`.usersnames`).val(),
                Password: $("#Password-dynamic").val(),
                DrivingLicenseNo: $(`.drivinglicenselos`).val(),
                PlateNo: $(`.PlateNoss`).val(),
                dataflowNO: dataflowYes,
                Friend: Friend,
                AnyOtherCloseRelative: AnyOtherCloseRelative,
                NoRelative: NoRelative,
                Cousin: Cousin,
                Sister: Sister,

                Borther: Brother,
                Spouse: spouse,
                HaveyoueverApplied: YesHaveyoueverapplied,
                Category: $("#EmployeeCategory").val(),
                Status: "Updated by Unit HR",
                Provethesame: $("#provide-the-same").val(),
                ONBSessionID: GlobalSessionIDValue,
                BusinessUnit: officename,
                ControlNumber: personalControlNumber,
                VersionNumber: personlVersionNumber,
                EmployeeStatus: $("#emp-work-status").val()
              })
            this.AddTableToListasanHRUpdateHist(PersonalItemId, GlobalSessionIDValue);
            if (AttachmentUploaderStatusArrayValidator.length != 0) {
              this.Add_To_HR_Update_Attach1();
              this.Add_To_HR_Update_Attach2();
              this.Add_To_HR_Update_Attach6();
              this.Add_To_HR_Update_Attach5();
              this.Add_To_HR_Update_Attach3();
              this.Add_To_HR_Update_Attach4();
              this.Add_To_HR_Update_Attach7();
              this.Add_To_HR_Update_Attach8();
              this.Add_To_HR_Update_Attach9();
              this.Add_To_HR_Update_Attach81();
              this.Add_To_HR_Update_Attach12();
              this.Add_To_HR_Update_Attach13();
              this.Add_To_HR_Update_Attach11();
              this.Add_To_HR_Update_LicenceAttachment();
              this.Add_To_HR_Update_Attach14();
            }
          }

        });
      if (AttachmentUploaderStatusArrayValidator.length != 0) {
        this.UpdationAttach1();
        this.UpdationAttach2();
        this.UpdationAttach6();
        this.UpdationAttach5();
        this.UpdationAttach3();
        this.UpdationAttach4();
        this.UpdationAttach7();
        this.UpdationAttach8();
        this.UpdationAttach9();
        this.UpdationAttach81();
        this.UpdationAttach12();
        this.UpdationAttach13();
        this.UpdationAttach11();
        this.UpdationLicenceAttachment();
        this.UpdationAttach14()
      } else {
        setTimeout(() => {
          swal({
            title: "The Form has been updated successfully",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        }, 4000);
      }
    }
  }


  public async Add_To_HR_Update_Attach1() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //for 1Updated_Resume

    var fileArr = [];
    var FileNameGenerated: string;
    var CurrentTime;
    let myfile = (document.querySelector("#Updated_Resume") as HTMLInputElement)
      .files.length;
    ////("my file"+myfile);
    //file is available
    if (myfile != 0) {
      for (var j = 0; j < myfile; j++) {
        let fileVal = (
          document.querySelector("#Updated_Resume") as HTMLInputElement
        ).files[j];
        fileArr.push(fileVal);
        // AttachmentUploaderStatusArrayValidator.push("Resume");
        //(fileArr.push(fileVal));
      }
      for (var i = 0; i < fileArr.length; i++) {
        CurrentTime = moment().format("DMYYYYHMS"); //1110202191045
        var NameofTable = "Updated-Resume";
        var tempfilename = fileArr[i].name.split(".");
        var fname = tempfilename[0].split(" ").join("");
        FileNameGenerated = fname + "-" + NameofTable + "." + tempfilename[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated, fileArr[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Updated Resume",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach2() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //2High-QualityPhoto
    var fileArr1 = [];
    var FileNameGenerated1: string;

    let myfile1 = (
      document.querySelector("#High-QualityPhoto") as HTMLInputElement
    ).files.length;

    if (myfile1 != 0) {
      for (var j = 0; j < myfile1; j++) {
        let fileVal1 = (
          document.querySelector("#High-QualityPhoto") as HTMLInputElement
        ).files[j];
        fileArr1.push(fileVal1);
        //  AttachmentUploaderStatusArrayValidator.push("Photo");
        //(fileArr1.push(fileVal1));
      }
      for (var i = 0; i < fileArr1.length; i++) {
        var NameofTable1 = "High-QualityPhoto";
        var tempfilename1 = fileArr1[i].name.split(".");
        var fname = tempfilename1[0].split(" ").join("");
        FileNameGenerated1 = fname + "-" + NameofTable1 + "." + tempfilename1[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated1, fileArr1[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High Quality Photo",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach3() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //passportcopy-frontpage
    var fileArr2 = [];
    var FileNameGenerated2: string;

    let myfile2 = (
      document.querySelector("#passportcopy-frontpage") as HTMLInputElement
    ).files.length;

    if (myfile2 != 0) {
      for (var j = 0; j < myfile2; j++) {
        let fileVal2 = (
          document.querySelector("#passportcopy-frontpage") as HTMLInputElement
        ).files[j];
        fileArr2.push(fileVal2);

        //(fileArr2.push(fileVal2));
      }
      for (var i = 0; i < fileArr2.length; i++) {
        var NameofTable2 = "passportcopy-frontpage";
        var tempfilename2 = fileArr2[i].name.split(".");
        var fname = tempfilename2[0].split(" ").join("");
        FileNameGenerated2 = fname + "-" + NameofTable2 + "." + tempfilename2[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated2, fileArr2[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Frontpart",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach4() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    // passportcopy-backpage
    var fileArrpassport = [];
    var FileNameGeneratedpassport: string;

    let myfilepassport = (
      document.querySelector("#passportbackpage") as HTMLInputElement
    ).files.length;

    if (myfilepassport != 0) {
      for (var j = 0; j < myfilepassport; j++) {
        let fileValpassport = (
          document.querySelector("#passportbackpage") as HTMLInputElement
        ).files[j];
        fileArrpassport.push(fileValpassport);
      }
      for (var i = 0; i < fileArrpassport.length; i++) {
        var NameofTablepassport = "passport-backpage";
        var tempfilenamepassport = fileArrpassport[i].name.split(".");
        var fname = tempfilenamepassport[0].split(" ").join("");
        FileNameGeneratedpassport = fname + "-" + NameofTablepassport + "." + tempfilenamepassport[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGeneratedpassport, fileArrpassport[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Backpart",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach5() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Previousvisa
    var fileArr4 = [];
    var FileNameGenerated4: string;

    let myfile4 = (document.querySelector("#Previousvisa") as HTMLInputElement)
      .files.length;

    if (myfile4 != 0) {
      for (var j = 0; j < myfile4; j++) {
        let fileVal4 = (
          document.querySelector("#Previousvisa") as HTMLInputElement
        ).files[j];
        fileArr4.push(fileVal4);
      }
      for (var i = 0; i < fileArr4.length; i++) {
        var NameofTable4 = "Previousvisa";
        var tempfilename4 = fileArr4[i].name.split(".");
        var fname = tempfilename4[0].split(" ").join("");
        FileNameGenerated4 = fname + "-" + NameofTable4 + "." + tempfilename4[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated4, fileArr4[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous Visa",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach6() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //previous-emiratesid
    var fileArr5 = [];
    var FileNameGenerated5: string;

    let myfile5 = (
      document.querySelector("#previous-emiratesid") as HTMLInputElement
    ).files.length;

    if (myfile5 != 0) {
      for (var j = 0; j < myfile5; j++) {
        let fileVal5 = (
          document.querySelector("#previous-emiratesid") as HTMLInputElement
        ).files[j];
        fileArr5.push(fileVal5);

        //(fileArr5.push(fileVal5));
      }
      for (var i = 0; i < fileArr5.length; i++) {
        var NameofTable5 = "previous-emiratesid";
        var tempfilename5 = fileArr5[i].name.split(".");
        var fname = tempfilename5[0].split(" ").join("");
        FileNameGenerated5 = fname + "-" + NameofTable5 + "." + tempfilename5[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated5, fileArr5[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous EmiratesId",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach7() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Insurance_continuity_letter
    var fileArr6 = [];
    var FileNameGenerated6: string;

    let myfile6 = (
      document.querySelector("#Insurance_continuity_letter") as HTMLInputElement
    ).files.length;

    if (myfile6 != 0) {
      for (var j = 0; j < myfile6; j++) {
        let fileVal6 = (
          document.querySelector(
            "#Insurance_continuity_letter"
          ) as HTMLInputElement
        ).files[j];
        fileArr6.push(fileVal6);

        //(fileArr6.push(fileVal6));
      }
      for (var i = 0; i < fileArr6.length; i++) {
        var NameofTable6 = "Insurance-continuity-letter";
        var tempfilename6 = fileArr6[i].name.split(".");
        var fname = tempfilename6[0].split(" ").join("");
        FileNameGenerated6 = fname + "-" + NameofTable6 + "." + tempfilename6[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated6, fileArr6[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Insurance continuity letter",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach8() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Sponsors_passportvisa
    var fileArr7 = [];
    var FileNameGenerated7: string;

    let myfile7 = (
      document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
    ).files.length;

    if (myfile7 != 0) {
      for (var j = 0; j < myfile7; j++) {
        let fileVal7 = (
          document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
        ).files[j];
        fileArr7.push(fileVal7);

        //(fileArr7.push(fileVal7));
      }
      for (var i = 0; i < fileArr7.length; i++) {
        var NameofTable7 = "Sponsors-passportvisa";
        var tempfilename7 = fileArr7[i].name.split(".");
        var fname = tempfilename7[0].split(" ").join("");
        FileNameGenerated7 = fname + "-" + NameofTable7 + "." + tempfilename7[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated7, fileArr7[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Sponsors-passport visa",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach81() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Academic details Attachments Required
    //PG-degree
    var fileArr9 = [];
    var FileNameGenerated9: string;

    let myfile9 = (document.querySelector("#PG-degree") as HTMLInputElement)
      .files.length;

    if (myfile9 != 0) {
      for (var j = 0; j < myfile9; j++) {
        let fileVal9 = (
          document.querySelector("#PG-degree") as HTMLInputElement
        ).files[j];
        fileArr9.push(fileVal9);

        //(fileArr9.push(fileVal9));
      }
      for (var i = 0; i < fileArr9.length; i++) {
        var NameofTable9 = "PG-degree";
        var tempfilename9 = fileArr9[i].name.split(".");
        var fname = tempfilename9[0].split(" ").join("");
        FileNameGenerated9 = fname + "-" + NameofTable9 + "." + tempfilename9[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated9, fileArr9[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PG Degree",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach9() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //HBachelor-UG-degree
    var fileArr10 = [];
    var FileNameGenerated10: string;

    let myfile10 = (
      document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
    ).files.length;

    if (myfile10 != 0) {
      for (var j = 0; j < myfile10; j++) {
        let fileVal10 = (
          document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
        ).files[j];
        fileArr10.push(fileVal10);

        //(fileArr10.push(fileVal10));
      }
      for (var i = 0; i < fileArr10.length; i++) {
        var NameofTable10 = "HBachelor-UG-degree";
        var tempfilename10 = fileArr10[i].name.split(".");
        var fname = tempfilename10[0].split(" ").join("");
        FileNameGenerated10 = fname + "-" + NameofTable10 + "." + tempfilename10[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated10, fileArr10[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "UG Degree",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach11() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArr11 = [];
    var FileNameGenerated11: string;

    let myfile11 = (
      document.querySelector("#Highersecondary") as HTMLInputElement
    ).files.length;

    if (myfile11 != 0) {
      for (var j = 0; j < myfile11; j++) {
        let fileVal11 = (
          document.querySelector("#Highersecondary") as HTMLInputElement
        ).files[j];
        fileArr11.push(fileVal11);

        //(fileArr11.push(fileVal11));
      }

      for (var i = 0; i < fileArr11.length; i++) {
        var NameofTable11 = "Highersecondary";
        var tempfilename11 = fileArr11[i].name.split(".");
        var fname = tempfilename11[0].split(" ").join("");
        FileNameGenerated11 = fname + "-" + NameofTable11 + "." + tempfilename11[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated11, fileArr11[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Higher Secondary",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach12() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Highschool
    var fileArr12 = [];
    var FileNameGenerated12: string;

    let myfile12 = (document.querySelector("#Highschool") as HTMLInputElement)
      .files.length;

    if (myfile12 != 0) {
      for (var j = 0; j < myfile12; j++) {
        let fileVal12 = (
          document.querySelector("#Highschool") as HTMLInputElement
        ).files[j];
        fileArr12.push(fileVal12);

        //(fileArr12.push(fileVal12));
      }
      for (var i = 0; i < fileArr12.length; i++) {
        var NameofTable12 = "Highschool";
        var tempfilename12 = fileArr12[i].name.split(".");
        var fname = tempfilename12[0].split(" ").join("");
        FileNameGenerated12 = fname + "-" + NameofTable12 + "." + tempfilename12[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated12, fileArr12[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High School",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Add_To_HR_Update_Attach13() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //allexperience
    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#allexperience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#allexperience") as HTMLInputElement
        ).files[j];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "All-experience-certificates";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "All experience certificate",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_LicenceAttachment() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#moh_dha_lience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#moh_dha_lience") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "MOHDHALICENCE";
        var tempfilename13 = fileArr13[i].name.split(".");
        FileNameGenerated13 =
          tempfilename13[0] +
          "-" +
          NameofTable13 +
          "." +
          tempfilename13[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Licence DHA OR MOH",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_To_HR_Update_Attach14() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#nationalid") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (document.querySelector("#nationalid") as HTMLInputElement).files[j];
        fileArr13.push(fileVal13);
      }

      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "nationalid";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Attachments HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "National ID Attachments",
                  ONBSessionID: EditSessionid,
                })

            });
          })
          .catch((error) => { });
      }
    }
  }


  public AddTableToListasanHRUpdateHist(id, ONBSessionID) {

    $("#cust-table-block tbody tr.edit-hr-chil-personal-form-tr").each(function (index) {
      var currentrow = $(this);
      var Requested = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-requested']")
        .val();
      var gender = currentrow
        .find("td:eq(1)")
        .find("select[id='tble-ChildGender']")
        .val();
      var childDOB = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-child-dob']")
        .val();
      var childPassNo = currentrow
        .find("td:eq(3)")
        .find("input[id*='tble-txt-child-passport-no']")
        .val();
      var childEmirateNo = currentrow
        .find("td:eq(4)")
        .find("input[id*='tble-txt-child-emirate-no']")
        .val();

      if (
        Requested != "" ||
        gender != "-" ||
        childPassNo != "" ||
        childEmirateNo != "784"
      ) {
        Requested =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-requested']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-requested']")
              .val()
            : "-";
        gender =
          currentrow
            .find("td:eq(1)")
            .find("select[id='tble-ChildGender']")
            .val() != "-"
            ? currentrow
              .find("td:eq(1)")
              .find("select[id='tble-ChildGender']")
              .val()
            : "-";
        childPassNo =
          currentrow
            .find("td:eq(3)")
            .find("input[id*='tble-txt-child-passport-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(3)")
              .find("input[id*='tble-txt-child-passport-no']")
              .val()
            : "-";
        childEmirateNo =
          currentrow
            .find("td:eq(4)")
            .find("input[id*='tble-txt-child-emirate-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-child-emirate-no']")
              .val()
            : "-";


        subweb.lists.getByTitle("Children Table HR Update History").items.add({
          PersonalItemid: id,
          Requested: Requested,
          Gender: gender,
          DOB: moment(childDOB).format("MM-DD-YYYY"),
          PassportNo: childPassNo,
          EmiratesNo: childEmirateNo,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });

      }
    });

    $("#cust-table-block2 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name2 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name2']")
        .val();
      var WorkLocation2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-worklocation2']")
        .val();
      var ContactNumber2 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber2']")
        .val();

      if (Name2 != "" || WorkLocation2 != "" || ContactNumber2 != "") {
        Name2 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name2']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name2']")
              .val()
            : "-";
        WorkLocation2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-worklocation2']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-worklocation2']")
              .val()
            : "-";
        ContactNumber2 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber2']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber2']")
              .val()
            : "-";


        subweb.lists
          .getByTitle("Personal Emergency Contact Person InUAE HR Update History")
          .items.add({
            Name2: Name2,
            WorkLocation2: WorkLocation2,
            ContactNumber2: ContactNumber2,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });

      }
    });

    $("#cust-table-block3 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name3 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name3']")
        .val();
      var Relation3 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-relation3']")
        .val();
      var ContactNumber3 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber3']")
        .val();

      if (Name3 != "" || Relation3 != "" || ContactNumber3 != "") {
        Name3 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name3']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name3']")
              .val()
            : "-";
        Relation3 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-relation3']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-relation3']")
              .val()
            : "-";
        ContactNumber3 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber3']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber3']")
              .val()
            : "-";


        subweb.lists
          .getByTitle("Personal Emergency Contact Person OutsideUAE HR Update History")
          .items.add({
            Name3: Name3,
            Relation3: Relation3,
            ContactNumber3: ContactNumber3,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });

      }
    });

    $("#cust-table-block4qualification tbody tr").each(function (index) {
      var currentrow = $(this);
      var QualificationName = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-Name-qualification']")
        .val();
      var PraUniversitycticedPosition = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-University']")
        .val();
      var yearofgraducation = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-year_of_grt']")
        .val();

      if (
        QualificationName != "" ||
        PraUniversitycticedPosition != "" ||
        yearofgraducation != ""
      ) {
        QualificationName =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-Name-qualification']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-qualification']")
              .val()
            : "-";
        PraUniversitycticedPosition =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-University']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-University']")
              .val()
            : "-";
        yearofgraducation =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-year_of_grt']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year_of_grt']")
              .val()
            : "-";


        subweb.lists
          .getByTitle("Personal Professional Qualification HR Update History")
          .items.add({
            Qualification: QualificationName,
            University: PraUniversitycticedPosition,
            YearofGraducation: yearofgraducation,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });

      }
    });

    $("#cust-table-block-employmentHistory tbody tr").each(function (index) {
      var currentrow = $(this);
      var OrganizationName = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-OrganizationName']")
        .val();
      var OrganizationDesignation = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-OrganizationDesignation']")
        .val();
      var from = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-Organization-date-From']")
        .val();
      var to = currentrow
        .find("td:eq(3)")
        .find("input[id*='tble-txt-Organization-date-To']")
        .val();
      var exp = currentrow
        .find("td:eq(4)")
        .find("input[id*='tble-txt-Years_of_Experience']")
        .val();
      var Reason = currentrow
        .find("td:eq(5)")
        .find("input[id*='tble-txt-Reason_for_leaving']")
        .val();

      if (
        OrganizationName != "" ||
        OrganizationDesignation != "" ||
        exp != "" ||
        Reason != ""
      ) {
        OrganizationName =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-OrganizationName']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-OrganizationName']")
              .val()
            : "-";
        OrganizationDesignation =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-OrganizationDesignation']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-OrganizationDesignation']")
              .val()
            : "-";
        exp =
          currentrow
            .find("td:eq(4)")
            .find("input[id*='tble-txt-Years_of_Experience']")
            .val() != ""
            ? currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-Years_of_Experience']")
              .val()
            : "-";
        Reason =
          currentrow
            .find("td:eq(5)")
            .find("input[id*='tble-txt-Reason_for_leaving']")
            .val() != ""
            ? currentrow
              .find("td:eq(5)")
              .find("input[id*='tble-txt-Reason_for_leaving']")
              .val()
            : "-";


        subweb.lists.getByTitle("Personal Employment History HR Update History").items.add({
          OrganizationName: OrganizationName,
          Organizationdesc: OrganizationDesignation,
          From: from,
          To: to,
          Experience: exp,
          Reason: Reason,
          PersonalItemid: id,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });

      }
    });

    $("#cust-table-blockResearch tbody tr").each(function (index) {
      var currentrow = $(this);
      var Researchname = currentrow
        .find("td:eq(0)")
        .find("input[id='tble-txt-name-Research']")
        .val();
      var Researchcategory = currentrow
        .find("td:eq(1)")
        .find("input[id='tble-txt-Category-Research']")
        .val();
      var year = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-txt-year-Research']")
        .val();

      if (Researchname != "" || Researchcategory != "" || year != "") {
        Researchname =
          currentrow
            .find("td:eq(0)")
            .find("input[id='tble-txt-name-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name-Research']")
              .val()
            : "-";
        Researchcategory =
          currentrow
            .find("td:eq(1)")
            .find("input[id='tble-txt-Category-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Category-Research']")
              .val()
            : "-";
        year =
          currentrow
            .find("td:eq(2)")
            .find("input[id='tble-txt-year-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year-Research']")
              .val()
            : "-";


        subweb.lists.getByTitle("Personal Research HR Update History").items.add({
          ResearchName: Researchname,
          Researchcategory: Researchcategory,
          year: year,
          PersonalItemid: id,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });

      }
    });

    $("#cust-table-relattivefriend-table tbody tr").each(function (index) {
      var currentrow = $(this);
      var column1 = currentrow
        .find("td:eq(0)")
        .find("input[id*='relative-friend-name']")
        .val();
      var column2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='relative-friend-worklocation']")
        .val();

      if (column1 != "" || column2 != "") {
        column1 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='relative-friend-name']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='relative-friend-name']")
              .val()
            : "-";
        column2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='relative-friend-worklocation']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='relative-friend-worklocation']")
              .val()
            : "-";


        subweb.lists
          .getByTitle("Personal Relative Friend HR Update History")
          .items.add({
            Name: column1,
            Worklocation: column2,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });

      }
    });

    $("#cust-table-blockEmployeeReference tbody tr").each(function (index) {
      var currentrow = $(this);
      var column1 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-Name-ResearchDetails']")
        .val();
      var column2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-Email-ResearchDetails']")
        .val();
      var column3 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactno-ResearchDetails']")
        .val();

      if (column1 != "" || column2 != "" || column3 != "") {
        column1 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-Name-ResearchDetails']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-ResearchDetails']")
              .val()
            : "-";
        column2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-Email-ResearchDetails']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Email-ResearchDetails']")
              .val()
            : "-";
        column3 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactno-ResearchDetails']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactno-ResearchDetails']")
              .val()
            : "-";


        subweb.lists.getByTitle("Personal Reference Details HR Update History").items.add({
          Name: column1,
          Email: column2,
          Contact: column3,
          PersonalItemid: id,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });

      }
    });


  }


  public AddTableToListasanHR(id, ONBSessionID) {
    $("#cust-table-block tbody tr.edit-hr-chil-personal-form-tr").each(function (index) {
      var currentrow = $(this);
      var Requested = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-requested']")
        .val();
      var gender = currentrow
        .find("td:eq(1)")
        .find("select[id='tble-ChildGender']")
        .val();
      var childDOB = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-child-dob']")
        .val();
      var childPassNo = currentrow
        .find("td:eq(3)")
        .find("input[id*='tble-txt-child-passport-no']")
        .val();
      var childEmirateNo = currentrow
        .find("td:eq(4)")
        .find("input[id*='tble-txt-child-emirate-no']")
        .val();

      if (
        Requested != "" ||
        gender != "-" ||
        childPassNo != "" ||
        childEmirateNo != "784"
      ) {
        Requested =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-requested']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-requested']")
              .val()
            : "-";
        gender =
          currentrow
            .find("td:eq(1)")
            .find("select[id='tble-ChildGender']")
            .val() != "-"
            ? currentrow
              .find("td:eq(1)")
              .find("select[id='tble-ChildGender']")
              .val()
            : "-";
        childPassNo =
          currentrow
            .find("td:eq(3)")
            .find("input[id*='tble-txt-child-passport-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(3)")
              .find("input[id*='tble-txt-child-passport-no']")
              .val()
            : "-";
        childEmirateNo =
          currentrow
            .find("td:eq(4)")
            .find("input[id*='tble-txt-child-emirate-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-child-emirate-no']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personaltab-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists.getByTitle("Children Table Transaction").items.add({
            PersonalItemid: id,
            Requested: Requested,
            Gender: gender,
            DOB: moment(childDOB).format("MM-DD-YYYY"),
            PassportNo: childPassNo,
            EmiratesNo: childEmirateNo,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });
        } else {
          newweb.lists
            .getByTitle("Children Table Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              PersonalItemid: id,
              Requested: Requested,
              Gender: gender,
              DOB: moment(childDOB).format("MM-DD-YYYY"),
              PassportNo: childPassNo,
              EmiratesNo: childEmirateNo,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });

    $("#cust-table-block2 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name2 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name2']")
        .val();
      var WorkLocation2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-worklocation2']")
        .val();
      var ContactNumber2 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber2']")
        .val();

      if (Name2 != "" || WorkLocation2 != "" || ContactNumber2 != "") {
        Name2 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name2']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name2']")
              .val()
            : "-";
        WorkLocation2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-worklocation2']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-worklocation2']")
              .val()
            : "-";
        ContactNumber2 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber2']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber2']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personalcontactperson-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Personal Emergency Contact Person InUAE Transaction")
            .items.add({
              Name2: Name2,
              WorkLocation2: WorkLocation2,
              ContactNumber2: ContactNumber2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        } else {
          newweb.lists
            .getByTitle("Personal Emergency Contact Person InUAE Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              Name2: Name2,
              WorkLocation2: WorkLocation2,
              ContactNumber2: ContactNumber2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });

    $("#cust-table-block3 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name3 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name3']")
        .val();
      var Relation3 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-relation3']")
        .val();
      var ContactNumber3 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber3']")
        .val();

      if (Name3 != "" || Relation3 != "" || ContactNumber3 != "") {
        Name3 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name3']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name3']")
              .val()
            : "-";
        Relation3 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-relation3']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-relation3']")
              .val()
            : "-";
        ContactNumber3 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber3']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber3']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personalcontperson-out-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
            .items.add({
              Name3: Name3,
              Relation3: Relation3,
              ContactNumber3: ContactNumber3,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        } else {
          newweb.lists
            .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              Name3: Name3,
              Relation3: Relation3,
              ContactNumber3: ContactNumber3,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });

    if ($("#emp-work-status").val() == "Experienced") {

      $("#cust-table-block4qualification tbody tr").each(function (index) {
        var currentrow = $(this);
        var QualificationName = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-Name-qualification']")
          .val();
        var PraUniversitycticedPosition = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-University']")
          .val();
        var yearofgraducation = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-year_of_grt']")
          .val();

        if (
          QualificationName != "" ||
          PraUniversitycticedPosition != "" ||
          yearofgraducation != ""
        ) {
          QualificationName =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-qualification']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-Name-qualification']")
                .val()
              : "-";
          PraUniversitycticedPosition =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-University']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-University']")
                .val()
              : "-";
          yearofgraducation =
            currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year_of_grt']")
              .val() != ""
              ? currentrow
                .find("td:eq(2)")
                .find("input[id*='tble-txt-year_of_grt']")
                .val()
              : "-";

          var TempTableChildItemID: any = currentrow
            .find("td:eq(0)")
            .find("input[id*='hdn-personal-qualif-itm-id']")
            .val();
          //var TableChildItemID = parseInt(TempTableChildItemID);

          if (TempTableChildItemID == "null") {
            newweb.lists
              .getByTitle("Personal Professional Qualification")
              .items.add({
                Qualification: QualificationName,
                University: PraUniversitycticedPosition,
                YearofGraducation: yearofgraducation,
                PersonalItemid: id,
                ONBSessionID: ONBSessionID,
                OrderNo: index,
              });
          } else {
            newweb.lists
              .getByTitle("Personal Professional Qualification")
              .items.getById(parseInt(TempTableChildItemID))
              .update({
                Qualification: QualificationName,
                University: PraUniversitycticedPosition,
                YearofGraducation: yearofgraducation,
                PersonalItemid: id,
                ONBSessionID: ONBSessionID,
                OrderNo: index,
              });
          }
        }
      });

      $("#cust-table-block-employmentHistory tbody tr").each(function (index) {
        var currentrow = $(this);
        var OrganizationName = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-OrganizationName']")
          .val();
        var OrganizationDesignation = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-OrganizationDesignation']")
          .val();
        var from = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-Organization-date-From']")
          .val();
        var to = currentrow
          .find("td:eq(3)")
          .find("input[id*='tble-txt-Organization-date-To']")
          .val();
        var exp = currentrow
          .find("td:eq(4)")
          .find("input[id*='tble-txt-Years_of_Experience']")
          .val();
        var Reason = currentrow
          .find("td:eq(5)")
          .find("input[id*='tble-txt-Reason_for_leaving']")
          .val();

        if (
          OrganizationName != "" ||
          OrganizationDesignation != "" ||
          exp != "" ||
          Reason != ""
        ) {
          OrganizationName =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-OrganizationName']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-OrganizationName']")
                .val()
              : "-";
          OrganizationDesignation =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-OrganizationDesignation']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-OrganizationDesignation']")
                .val()
              : "-";
          exp =
            currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-Years_of_Experience']")
              .val() != ""
              ? currentrow
                .find("td:eq(4)")
                .find("input[id*='tble-txt-Years_of_Experience']")
                .val()
              : "-";
          Reason =
            currentrow
              .find("td:eq(5)")
              .find("input[id*='tble-txt-Reason_for_leaving']")
              .val() != ""
              ? currentrow
                .find("td:eq(5)")
                .find("input[id*='tble-txt-Reason_for_leaving']")
                .val()
              : "-";

          var TempTableChildItemID: any = currentrow
            .find("td:eq(0)")
            .find("input[id*='hdn-personaltab-emp-history-itm-id']")
            .val();
          //var TableChildItemID = parseInt(TempTableChildItemID);

          if (TempTableChildItemID == "null") {
            newweb.lists.getByTitle("Personal Employment History Transaction").items.add({
              OrganizationName: OrganizationName,
              Organizationdesc: OrganizationDesignation,
              From: from,
              To: to,
              Experience: exp,
              Reason: Reason,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
          } else {
            newweb.lists
              .getByTitle("Personal Employment History Transaction")
              .items.getById(parseInt(TempTableChildItemID))
              .update({
                OrganizationName: OrganizationName,
                Organizationdesc: OrganizationDesignation,
                From: from,
                To: to,
                Experience: exp,
                Reason: Reason,
                PersonalItemid: id,
                ONBSessionID: ONBSessionID,
                OrderNo: index,
              });
          }
        }
      });

      $("#cust-table-blockEmployeeReference tbody tr").each(function (index) {
        var currentrow = $(this);
        var column1 = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-Name-ResearchDetails']")
          .val();
        var column2 = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-Email-ResearchDetails']")
          .val();
        var column3 = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-contactno-ResearchDetails']")
          .val();

        if (column1 != "" || column2 != "" || column3 != "") {
          column1 =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-Name-ResearchDetails']")
                .val()
              : "-";
          column2 =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Email-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-Email-ResearchDetails']")
                .val()
              : "-";
          column3 =
            currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactno-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(2)")
                .find("input[id*='tble-txt-contactno-ResearchDetails']")
                .val()
              : "-";

          var TempTableChildItemID: any = currentrow
            .find("td:eq(0)")
            .find("input[id*='hdn-personal-ref-itm-id']")
            .val();

          if (TempTableChildItemID == "null") {
            newweb.lists.getByTitle("personal Reference Details").items.add({
              Name: column1,
              Email: column2,
              Contact: column3,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
          } else {
            newweb.lists
              .getByTitle("personal Reference Details")
              .items.getById(parseInt(TempTableChildItemID))
              .update({
                Name: column1,
                Email: column2,
                Contact: column3,
                PersonalItemid: id,
                ONBSessionID: ONBSessionID,
                OrderNo: index,
              });
          }
        }
      });

    }

    $("#cust-table-blockResearch tbody tr").each(function (index) {
      var currentrow = $(this);
      var Researchname = currentrow
        .find("td:eq(0)")
        .find("input[id='tble-txt-name-Research']")
        .val();
      var Researchcategory = currentrow
        .find("td:eq(1)")
        .find("input[id='tble-txt-Category-Research']")
        .val();
      var year = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-txt-year-Research']")
        .val();

      if (Researchname != "" || Researchcategory != "" || year != "") {
        Researchname =
          currentrow
            .find("td:eq(0)")
            .find("input[id='tble-txt-name-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name-Research']")
              .val()
            : "-";
        Researchcategory =
          currentrow
            .find("td:eq(1)")
            .find("input[id='tble-txt-Category-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Category-Research']")
              .val()
            : "-";
        year =
          currentrow
            .find("td:eq(2)")
            .find("input[id='tble-txt-year-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year-Research']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personaltab-reserch-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists.getByTitle("Personal Research Transaction").items.add({
            ResearchName: Researchname,
            Researchcategory: Researchcategory,
            year: year,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });
        } else {
          newweb.lists
            .getByTitle("Personal Research Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              ResearchName: Researchname,
              Researchcategory: Researchcategory,
              year: year,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });

    $("#cust-table-relattivefriend-table tbody tr").each(function (index) {
      var currentrow = $(this);
      var column1 = currentrow
        .find("td:eq(0)")
        .find("input[id*='relative-friend-name']")
        .val();
      var column2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='relative-friend-worklocation']")
        .val();

      if (column1 != "" || column2 != "") {
        column1 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='relative-friend-name']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='relative-friend-name']")
              .val()
            : "-";
        column2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='relative-friend-worklocation']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='relative-friend-worklocation']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personal-relativefriend-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Personal Relative friend Transaction")
            .items.add({
              Name: column1,
              Worklocation: column2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        } else {
          newweb.lists
            .getByTitle("Personal Relative friend Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              Name: column1,
              Worklocation: column2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });



    this.AllAttachmentUpdation("Edit");
  }
  public AllAttachmentUpdation(FormMode) {
    // this.UpdationAttach1();
    // this.UpdationAttach2();
    // this.UpdationAttach6();
    // this.UpdationAttach5();
    // this.UpdationAttach3();
    // this.UpdationAttach4();
    // this.UpdationAttach7();
    // this.UpdationAttach8();
    // this.UpdationAttach9();
    // this.UpdationAttach81();
    // this.UpdationAttach12();
    // this.UpdationAttach13();
    // this.UpdationAttach11();
    // this.UpdationLicenceAttachment();

    if (FormMode == "New") {
      // if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
      //setTimeout(() => {

      swal({
        title: "The form has been submitted successfully",
        icon: "success",
      }).then(() => {
        window.open(
          "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
          "_self"
        );
      });
      //}, 5000);
      // }
    } else {
    }
  }

  public async UpdationAttach1() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //for 1Updated_Resume

    var fileArr = [];
    var FileNameGenerated: string;
    var CurrentTime;
    let myfile = (document.querySelector("#Updated_Resume") as HTMLInputElement)
      .files.length;
    ////("my file"+myfile);
    //file is available
    if (myfile != 0) {
      for (var j = 0; j < myfile; j++) {
        let fileVal = (
          document.querySelector("#Updated_Resume") as HTMLInputElement
        ).files[j];
        fileArr.push(fileVal);
        // AttachmentUploaderStatusArrayValidator.push("Resume");
        //(fileArr.push(fileVal));
      }
      for (var i = 0; i < fileArr.length; i++) {
        CurrentTime = moment().format("DMYYYYHMS"); //1110202191045
        var NameofTable = "Updated-Resume";
        var tempfilename = fileArr[i].name.split(".");
        var fname = tempfilename[0].split(" ").join("");
        FileNameGenerated = fname + "-" + NameofTable + "." + tempfilename[1] + "";


        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated, fileArr[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Updated Resume",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Resume") == -1) {
                    AttachmentUploaderStatusArray.push("Resume");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "Edit") {

                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                    }
                    //   }, 1000);
                  }
                  //}
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach2() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //2High-QualityPhoto
    var fileArr1 = [];
    var FileNameGenerated1: string;

    let myfile1 = (
      document.querySelector("#High-QualityPhoto") as HTMLInputElement
    ).files.length;

    if (myfile1 != 0) {
      for (var j = 0; j < myfile1; j++) {
        let fileVal1 = (
          document.querySelector("#High-QualityPhoto") as HTMLInputElement
        ).files[j];
        fileArr1.push(fileVal1);
        //  AttachmentUploaderStatusArrayValidator.push("Photo");
        //(fileArr1.push(fileVal1));
      }
      for (var i = 0; i < fileArr1.length; i++) {
        var NameofTable1 = "High-QualityPhoto";
        var tempfilename1 = fileArr1[i].name.split(".");
        var fname = tempfilename1[0].split(" ").join("");
        FileNameGenerated1 = fname + "-" + NameofTable1 + "." + tempfilename1[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated1, fileArr1[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High Quality Photo",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Photo") == -1) {
                    AttachmentUploaderStatusArray.push("Photo");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "Edit") {
                    // setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach3() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //passportcopy-frontpage
    var fileArr2 = [];
    var FileNameGenerated2: string;

    let myfile2 = (
      document.querySelector("#passportcopy-frontpage") as HTMLInputElement
    ).files.length;

    if (myfile2 != 0) {
      for (var j = 0; j < myfile2; j++) {
        let fileVal2 = (
          document.querySelector("#passportcopy-frontpage") as HTMLInputElement
        ).files[j];
        fileArr2.push(fileVal2);

        //(fileArr2.push(fileVal2));
      }
      for (var i = 0; i < fileArr2.length; i++) {
        var NameofTable2 = "passportcopy-frontpage";
        var tempfilename2 = fileArr2[i].name.split(".");
        var fname = tempfilename2[0].split(" ").join("");
        FileNameGenerated2 = fname + "-" + NameofTable2 + "." + tempfilename2[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated2, fileArr2[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Frontpart",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("passportcopyfrontpage") == -1) {
                    AttachmentUploaderStatusArray.push("passportcopyfrontpage");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach4() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    // passportcopy-backpage
    var fileArrpassport = [];
    var FileNameGeneratedpassport: string;

    let myfilepassport = (
      document.querySelector("#passportbackpage") as HTMLInputElement
    ).files.length;

    if (myfilepassport != 0) {
      for (var j = 0; j < myfilepassport; j++) {
        let fileValpassport = (
          document.querySelector("#passportbackpage") as HTMLInputElement
        ).files[j];
        fileArrpassport.push(fileValpassport);
      }
      for (var i = 0; i < fileArrpassport.length; i++) {
        var NameofTablepassport = "passport-backpage";
        var tempfilenamepassport = fileArrpassport[i].name.split(".");
        var fname = tempfilenamepassport[0].split(" ").join("");
        FileNameGeneratedpassport = fname + "-" + NameofTablepassport + "." + tempfilenamepassport[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGeneratedpassport, fileArrpassport[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Backpart",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("passportbackpage") == -1) {
                    AttachmentUploaderStatusArray.push("passportbackpage");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach5() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Previousvisa
    var fileArr4 = [];
    var FileNameGenerated4: string;

    let myfile4 = (document.querySelector("#Previousvisa") as HTMLInputElement)
      .files.length;

    if (myfile4 != 0) {
      for (var j = 0; j < myfile4; j++) {
        let fileVal4 = (
          document.querySelector("#Previousvisa") as HTMLInputElement
        ).files[j];
        fileArr4.push(fileVal4);
      }
      for (var i = 0; i < fileArr4.length; i++) {
        var NameofTable4 = "Previousvisa";
        var tempfilename4 = fileArr4[i].name.split(".");
        var fname = tempfilename4[0].split(" ").join("");
        FileNameGenerated4 = fname + "-" + NameofTable4 + "." + tempfilename4[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated4, fileArr4[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous Visa",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Previousvisa") == -1) {
                    AttachmentUploaderStatusArray.push("Previousvisa");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach6() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //previous-emiratesid
    var fileArr5 = [];
    var FileNameGenerated5: string;

    let myfile5 = (
      document.querySelector("#previous-emiratesid") as HTMLInputElement
    ).files.length;

    if (myfile5 != 0) {
      for (var j = 0; j < myfile5; j++) {
        let fileVal5 = (
          document.querySelector("#previous-emiratesid") as HTMLInputElement
        ).files[j];
        fileArr5.push(fileVal5);

        //(fileArr5.push(fileVal5));
      }
      for (var i = 0; i < fileArr5.length; i++) {
        var NameofTable5 = "previous-emiratesid";
        var tempfilename5 = fileArr5[i].name.split(".");
        var fname = tempfilename5[0].split(" ").join("");
        FileNameGenerated5 = fname + "-" + NameofTable5 + "." + tempfilename5[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated5, fileArr5[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous EmiratesId",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("previousemiratesid") == -1) {
                    AttachmentUploaderStatusArray.push("previousemiratesid");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach7() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Insurance_continuity_letter
    var fileArr6 = [];
    var FileNameGenerated6: string;

    let myfile6 = (
      document.querySelector("#Insurance_continuity_letter") as HTMLInputElement
    ).files.length;

    if (myfile6 != 0) {
      for (var j = 0; j < myfile6; j++) {
        let fileVal6 = (
          document.querySelector(
            "#Insurance_continuity_letter"
          ) as HTMLInputElement
        ).files[j];
        fileArr6.push(fileVal6);

        //(fileArr6.push(fileVal6));
      }
      for (var i = 0; i < fileArr6.length; i++) {
        var NameofTable6 = "Insurance-continuity-letter";
        var tempfilename6 = fileArr6[i].name.split(".");
        var fname = tempfilename6[0].split(" ").join("");
        FileNameGenerated6 = fname + "-" + NameofTable6 + "." + tempfilename6[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated6, fileArr6[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Insurance continuity letter",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Insurance_continuity_letter") == -1) {
                    AttachmentUploaderStatusArray.push(
                      "Insurance_continuity_letter"
                    );
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach8() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Sponsors_passportvisa
    var fileArr7 = [];
    var FileNameGenerated7: string;

    let myfile7 = (
      document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
    ).files.length;

    if (myfile7 != 0) {
      for (var j = 0; j < myfile7; j++) {
        let fileVal7 = (
          document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
        ).files[j];
        fileArr7.push(fileVal7);

        //(fileArr7.push(fileVal7));
      }
      for (var i = 0; i < fileArr7.length; i++) {
        var NameofTable7 = "Sponsors-passportvisa";
        var tempfilename7 = fileArr7[i].name.split(".");
        var fname = tempfilename7[0].split(" ").join("");
        FileNameGenerated7 = fname + "-" + NameofTable7 + "." + tempfilename7[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated7, fileArr7[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Sponsors-passport visa",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Sponsorspassportvisa") == -1) {
                    AttachmentUploaderStatusArray.push("Sponsorspassportvisa");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach81() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Academic details Attachments Required
    //PG-degree
    var fileArr9 = [];
    var FileNameGenerated9: string;

    let myfile9 = (document.querySelector("#PG-degree") as HTMLInputElement)
      .files.length;

    if (myfile9 != 0) {
      for (var j = 0; j < myfile9; j++) {
        let fileVal9 = (
          document.querySelector("#PG-degree") as HTMLInputElement
        ).files[j];
        fileArr9.push(fileVal9);

        //(fileArr9.push(fileVal9));
      }
      for (var i = 0; i < fileArr9.length; i++) {
        var NameofTable9 = "PG-degree";
        var tempfilename9 = fileArr9[i].name.split(".");
        var fname = tempfilename9[0].split(" ").join("");
        FileNameGenerated9 = fname + "-" + NameofTable9 + "." + tempfilename9[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated9, fileArr9[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PG Degree",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("PGdegree") == -1) {
                    AttachmentUploaderStatusArray.push("PGdegree");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach9() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //HBachelor-UG-degree
    var fileArr10 = [];
    var FileNameGenerated10: string;

    let myfile10 = (
      document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
    ).files.length;

    if (myfile10 != 0) {
      for (var j = 0; j < myfile10; j++) {
        let fileVal10 = (
          document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
        ).files[j];
        fileArr10.push(fileVal10);

        //(fileArr10.push(fileVal10));
      }
      for (var i = 0; i < fileArr10.length; i++) {
        var NameofTable10 = "HBachelor-UG-degree";
        var tempfilename10 = fileArr10[i].name.split(".");
        var fname = tempfilename10[0].split(" ").join("");
        FileNameGenerated10 = fname + "-" + NameofTable10 + "." + tempfilename10[1] + "";


        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated10, fileArr10[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "UG Degree",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("HBachelorUGdegree") == -1) {
                    AttachmentUploaderStatusArray.push("HBachelorUGdegree");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach11() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArr11 = [];
    var FileNameGenerated11: string;

    let myfile11 = (
      document.querySelector("#Highersecondary") as HTMLInputElement
    ).files.length;

    if (myfile11 != 0) {
      for (var j = 0; j < myfile11; j++) {
        let fileVal11 = (
          document.querySelector("#Highersecondary") as HTMLInputElement
        ).files[j];
        fileArr11.push(fileVal11);

        //(fileArr11.push(fileVal11));
      }

      for (var i = 0; i < fileArr11.length; i++) {
        var NameofTable11 = "Highersecondary";
        var tempfilename11 = fileArr11[i].name.split(".");
        var fname = tempfilename11[0].split(" ").join("");
        FileNameGenerated11 = fname + "-" + NameofTable11 + "." + tempfilename11[1] + "";


        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated11, fileArr11[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Higher Secondary",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Highersecondary") == -1) {
                    AttachmentUploaderStatusArray.push("Highersecondary");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    // setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach12() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //Highschool
    var fileArr12 = [];
    var FileNameGenerated12: string;

    let myfile12 = (document.querySelector("#Highschool") as HTMLInputElement)
      .files.length;

    if (myfile12 != 0) {
      for (var j = 0; j < myfile12; j++) {
        let fileVal12 = (
          document.querySelector("#Highschool") as HTMLInputElement
        ).files[j];
        fileArr12.push(fileVal12);

        //(fileArr12.push(fileVal12));
      }
      for (var i = 0; i < fileArr12.length; i++) {
        var NameofTable12 = "Highschool";
        var tempfilename12 = fileArr12[i].name.split(".");
        var fname = tempfilename12[0].split(" ").join("");
        FileNameGenerated12 = fname + "-" + NameofTable12 + "." + tempfilename12[1] + "";


        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated12, fileArr12[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High School",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Highschool") == -1) {
                    AttachmentUploaderStatusArray.push("Highschool");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async UpdationAttach13() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");
    //allexperience
    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#allexperience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#allexperience") as HTMLInputElement
        ).files[j];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "All-experience-certificates";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";


        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "All experience certificate",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("allexperience") == -1) {
                    AttachmentUploaderStatusArray.push("allexperience");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    // }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  // moh_dha_lience
  public async UpdationLicenceAttachment() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#moh_dha_lience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#moh_dha_lience") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "MOHDHALICENCE";
        var tempfilename13 = fileArr13[i].name.split(".");
        FileNameGenerated13 =
          tempfilename13[0] +
          "-" +
          NameofTable13 +
          "." +
          tempfilename13[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Licence DHA OR MOH",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("mohdhalience");
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (
                        AttachmentUploaderStatusArrayValidator.length ==
                        this.state.AttachmentUploaderStatusArray.length
                      ) {
                        // setTimeout(() => {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload();
                        });
                        //  }, 15000);
                      }
                    }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async UpdationAttach14() {
    var str = AttachmentEditUserfullName;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#nationalid") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (document.querySelector("#nationalid") as HTMLInputElement).files[j];
        fileArr13.push(fileVal13);
      }

      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "nationalid";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "National ID Attachments",
                  ONBSessionID: EditSessionid,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("nationalid") == -1) {
                    AttachmentUploaderStatusArray.push("nationalid");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray,
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    //setTimeout(() => {
                    if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                      // setTimeout(() => {
                      swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                      }).then(() => {
                        location.reload();
                      });
                      //  }, 15000);
                    }
                    // }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }


  public PlaceofBirth() {
    var status = true;
    if (status == true && $("#PlaceofBirth").val() != "") {
      $("#err-placeofbirth").hide();
    } else {
      $("#err-placeofbirth").show();
      $("#PlaceofBirth").focus();
      status = false;
    }
    return status;
  }

  public DateofBirth() {
    var status = true;
    if (status == true && $(".dobpersonal").val() != "") {
      $(".errpresonalbirth").hide();
    } else {
      $(".errpresonalbirth").show();
      $(".dob-personal-user").focus();
      status = false;
    }
    return status;
  }
  public CurrentNationality() {
    var status = true;
    if (
      status == true &&
      $("#CurrentNationality").find(":selected").text() == "Select"
    ) {
      $("#err-currentnationality").show();
      $("#CurrentNationality").focus();
      status = false;
    } else {
      $("#err-currentnationality").hide();
    }
    return status;
  }
  public PreviousNationality() {
    var status = true;
    if (
      status == true &&
      $("#PreviousNationality").find(":selected").text() == "Select"
    ) {
      $("#err-PreviousNationality").show();
      $("#PreviousNationality").focus();
      status = false;
    } else {
      $("#err-PreviousNationality").hide();
    }
    return status;
  }
  public Religion() {
    var status = true;
    if (status == true && $("#Religion").find(":selected").text() == "Select") {
      $("#err-religion").show();
      $("#Religion").focus();
      status = false;
    } else {
      $("#err-religion").hide();
    }
    return status;
  }

  public Section() {
    var status = true;
    if (status == true && $("#Section").val() != "") {
      $("#err-section").hide();
    } else {
      $("#err-section").show();
      $("#Section").focus();
      status = false;
    }
    return status;
  }

  public Entereds() {
    var status = true;
    if (status == true && $("#Entered").val() != "") {
      $("#err-entered").hide();
    } else {
      $("#err-entered").show();
      $("#Entered").focus();
      status = false;
    }
    return status;
  }
  public Portss() {
    var status = true;
    if (status == true && $("#Port").val() != "") {
      $("#err-port").hide();
    } else {
      $("#err-port").show();
      $("#Port").focus();
      status = false;
    }
    return status;
  }

  public ContactNumber() {
    var status = true;
    if (status == true && $("#ContactNumber").val() != "") {
      $("#err-contactnumber").hide();
    } else {
      $("#err-contactnumber").show();
      $("#ContactNumber").focus();
      status = false;
    }
    return status;
  }
  public SponsorName() {
    var status = true;
    if (
      status == true &&
      $("#SponsorName").find(":selected").text() == "Select"
    ) {
      $("#err-sponsorname").show();
      $("#SponsorName").focus();
      status = false;
    } else {
      $("#err-sponsorname").hide();
    }
    return status;
  }

  //Passport & Residence Particulars
  public DocumentNo() {
    var status = true;
    if (status == true && $("#DocumentNo").val() != "") {
      $("#err-documentno").hide();
    } else {
      $("#err-documentno").show();
      $("#DocumentNo").focus();
      status = false;
    }
    return status;
  }

  public PlaceofIssue() {
    var status = true;
    if (status == true && $("#PlaceofIssue").val() != "") {
      $("#err-placeofissue").hide();
    } else {
      $("#err-placeofissue").show();
      $("#PlaceofIssue").focus();
      status = false;
    }
    return status;
  }

  public DateofExpiry() {
    var status = true;
    if (status == true && $("#DateofExpiry").val() != "") {
      $("#err-dateofexpiry").hide();
    } else {
      $("#err-dateofexpiry").show();
      $("#DateofExpiry").focus();
      status = false;
    }
    return status;
  }
  public ResidenceNo() {
    var status = true;
    if (status == true && $("#ResidenceNo").val() != "") {
      $("#err-residenceno").hide();
    } else {
      $("#err-residenceno").show();
      $("#ResidenceNo").focus();
      status = false;
    }
    return status;
  }

  public DateofIssue() {
    var status = true;
    if (status == true && $("#DateofIssue").val() != "") {
      $("#err-dateofissue").hide();
    } else {
      $("#err-dateofissue").show();
      $("#DateofIssue").focus();
      status = false;
    }
    return status;
  }

  //ACADEMIC QUALIFICATIONS

  public Qualifications() {
    var status = true;
    if (status == true && $("#Qualification").val() != "") {
      $("#err-qualification").hide();
    } else {
      $("#err-qualification").show();
      $("#Qualification").focus();
      status = false;
    }
    return status;
  }
  public DateofQualification() {
    var status = true;
    if (status == true && $("#DateofQualification").val() != "") {
      $("#err-dateofqualification").hide();
    } else {
      $("#err-dateofqualification").show();
      $("#DateofQualification").focus();
      status = false;
    }
    return status;
  }
  // public Countrys() {
  //   var status = true;
  //   if (status == true && $("#countrys").val() != "") {
  //     $(".errcountrys").hide();
  //   } else {
  //     $(".errcountrys").show();
  //     status = false;
  //   }
  //   return status;
  // }

  public Languages() {
    var status = true;
    if (status == true && $("#Languages").val() != "") {
      $("#err-languages").hide();
    } else {
      $("#err-languages").show();
      $("#Languages").focus();
      status = false;
    }
    return status;
  }

  //

  public NameofSpouse() {
    var status = true;
    if (status == true && $("#NameofSpouse").val() != "") {
      $("#err-nameofspouse").hide();
    } else {
      $("#err-nameofspouse").show();
      $("#NameofSpouse").focus();
      status = false;
    }
    return status;
  }

  public Nationalitytwo() {
    var status = true;
    if (status == true && $("#Nationality2").val() != "") {
      $("#err-nationality2").hide();
    } else {
      $("#err-nationality2").show();
      $("#Nationality2").focus();
      status = false;
    }
    return status;
  }

  public PlaceofBirthtwo() {
    var status = true;
    if (status == true && $("#PlaceofBirth2").val() != "") {
      $("#err-placeofbirth2").hide();
    } else {
      $("#err-placeofbirth2").show();
      $("#PlaceofBirth2").focus();
      status = false;
    }
    return status;
  }

  public DateofBirthtwo() {
    var status = true;
    if (status == true && $("#DateofBirth2").val() != "") {
      $("#err-DateofBirth2").hide();
    } else {
      $("#err-DateofBirth2").show();
      $("#DateofBirth2").focus();
      status = false;
    }
    return status;
  }

  public PlaceofWork() {
    var status = true;
    if (status == true && $("#PlaceofWork").val() != "") {
      $("#err-placeofwork").hide();
    } else {
      $("#err-placeofwork").show();
      $("#PlaceofWork").focus();
      status = false;
    }
    return status;
  }

  public Occupationtwo() {
    var status = true;
    if (status == true && $("#Occupation2").val() != "") {
      $("#err-occupation2").hide();
    } else {
      $("#err-occupation2").show();
      $("#Occupation2").focus();
      status = false;
    }
    return status;
  }

  //Father information
  public FathersName() {
    var status = true;
    if (status == true && $("#FathersName").val() != "") {
      $("#err-fathersname").hide();
    } else {
      $("#err-fathersname").show();
      $("#FathersName").focus();
      status = false;
    }
    return status;
  }

  public PlaceofBirththree() {
    var status = true;
    if (status == true && $("#PlaceofBirth3").val() != "") {
      $("#err-placeofbirth3").hide();
    } else {
      $("#err-placeofbirth3").show();
      $("#PlaceofBirth3").focus();
      status = false;
    }
    return status;
  }

  public DateofBirththree() {
    var status = true;
    if (status == true && $("#DateofBirth3").val() != "") {
      $("#err-dateofbirth3").hide();
    } else {
      $("#err-dateofbirth3").show();
      $("#DateofBirth3").focus();
      status = false;
    }
    return status;
  }

  public Occupationthree() {
    var status = true;
    if (status == true && $("#Occupation3").val() != "") {
      $("#err-occupation3").hide();
    } else {
      $("#err-occupation3").show();
      $("#Occupation3").focus();
      status = false;
    }
    return status;
  }

  public HomeAddresshree() {
    var status = true;
    if (status == true && $("#HomeAddress3").val() != "") {
      $("#err-homeaddress3").hide();
    } else {
      $("#err-homeaddress3").show();
      $("#HomeAddress3").focus();
      status = false;
    }
    return status;
  }

  //mother info

  public MotherName() {
    var status = true;
    if (status == true && $("#MothersName").val() != "") {
      $("#err-mothersname").hide();
    } else {
      $("#err-mothersname").show();
      $("#MothersName").focus();
      status = false;
    }
    return status;
  }

  public PlaceofBirthfour() {
    var status = true;
    if (status == true && $("#PlaceofBirth4").val() != "") {
      $("#err-placeofbirth4").hide();
    } else {
      $("#err-placeofbirth4").show();
      $("#PlaceofBirth4").focus();
      status = false;
    }
    return status;
  }

  public DateofBirthfour() {
    var status = true;
    if (status == true && $("#DateofBirth4").val() != "") {
      $("#err-dateofbirth4").hide();
    } else {
      $("#err-dateofbirth4").show();
      $("#DateofBirth4").focus();
      status = false;
    }
    return status;
  }

  public Occupationfour() {
    var status = true;
    if (status == true && $("#Occupation4").val() != "") {
      $("#err-occupation4").hide();
    } else {
      $("#err-occupation4").show();
      $("#Occupation4").focus();
      status = false;
    }
    return status;
  }

  public HomeAddressfour() {
    var status = true;
    if (status == true && $("#HomeAddress4").val() != "") {
      $("#err-homeaddress4").hide();
    } else {
      $("#err-homeaddress4").show();
      $("#HomeAddress4").focus();
      status = false;
    }
    return status;
  }
  //Home Country Address
  public HomeCountrysNumbers() {
    var status = true;
    if (status == true && $(".CountrysNumbers").val() != "") {
      $("#err-countrynumber").hide();
    } else {
      $("#err-countrynumber").show();
      $(".CountrysNumbers").focus();
      status = false;
    }
    return status;
  }

  public Homeemailsids() {
    var status = true;
    if (status == true && $(".emailsids").val() != "") {
      $("#erremailpersonal").hide();
    } else {
      $("#erremailpersonal").show();
      $(".emailsids").focus();
      status = false;
    }
    return status;
  }

  // public JobAppliedFor() {
  //   var status = true;
  //   if (status == true && $("#Job_Applied_For").val() != "") {
  //     $("#err-JobAppliedFor").hide();
  //   } else {
  //     $("#err-JobAppliedFor").show();
  //     $("#Job_Applied_For").focus();
  //     status = false;
  //   }
  //   return status;
  // }

  public WorkLocation() {
    var status = true;
    if (status == true && $("#WorkLocation").val() != "") {
      $("#err-worklocation").hide();
    } else {
      $("#err-worklocation").show();
      $("#WorkLocation").focus();
      status = false;
    }
    return status;
  }

  public countrycode() {
    var status = true;
    if ($("#country-code").find(":selected").text() == "Select") {
      $("#err-countrycode").show();
      $("#country-code").focus();
      status = false;
    } else {
      $("#err-countrycode").hide();
    }
    return status;
  }
  public gendervalidation() {
    var status = true;
    if ($("#PersonalGender").find(":selected").text() == "Select") {
      $("#err-Genderpersonal").show();
      $("#PersonalGender").focus();
      status = false;
    } else {
      $("#err-Genderpersonal").hide();
    }
    return status;
  }

  public Hidevalidationonkeytyping() {
    $("#personal-blood-group").on("change", function () {
      $("#err-Newhirebloodgroup-personal").hide();
    })
    $("#DateofBirth4").on('change', function () {
      $("#err-dateofbirth4").hide();
    })

    $("#DateofBirth").on('change', function () {
      $("#err-dateofbirth").hide();
    })
    $("#DateofBirth3").on('change', function () {
      $("#err-dateofbirth3").hide();
    })

    $("#TelephoneNo").keyup(function () {
      $("#err-personaltelephoneformat").hide();
    });
    $("#Religion").on("change", function () {
      $("#err-religion").hide();
    });
    $(".SponsorNames").on("change", function () {
      $("#err-sponsorname").hide();
    });
    $("#provide-the-same").keyup(function () {
      $("#err-provide-the-same").hide();
    });

    $("#NameofCompany").keyup(function () {
      $("#err-nameofcompany").hide();
    });
    $("#Position").keyup(function () {
      $("#err-position").hide();
    });

    $(".MobileNos").keyup(function () {
      $(".err-mobilenouae").hide();
    });
    $(".pob").keyup(function () {
      $("#err-placeofbirth").hide();
    });
    $(".telephonenos").keyup(function () {
      $(".err-personaltelephoneformat").hide();
    });

    $("#Religion").keyup(function () {
      $("#err-religion").hide();
    });

    $("#sections").keyup(function () {
      $("#err-section").hide();
    });
    $("#Entered").keyup(function () {
      $("#err-entered").hide();
    });

    $(".ports").keyup(function () {
      $("#err-port").hide();
    });

    $(".contactnumbers").keyup(function () {
      $("#err-contactnumber").hide();
    });

    $("#country-code").on("change", function () {
      $("#err-countrycode").hide();
    });

    $(".SponsorNames").keyup(function () {
      $("#err-sponsorname").hide();
    });
    $("#PersonalGender").on("change", function () {
      $("#err-Genderpersonal").hide();
    });
    //passport

    $("#surenmaepersonal").on("change", function () {
      $("#err-Titlesurename").hide();
    });

    $(".documentnos").keyup(function () {
      $("#err-documentno").hide();
    });

    $(".pos").keyup(function () {
      $("#err-placeofissue").hide();
    });

    $(".residenceNos").keyup(function () {
      $("#err-residenceno").hide();
    });

    $("#DateofIssue").keyup(function () {
      $("#err-dateofissue").hide();
    });

    $("#PlaceofBirthtwo").keyup(function () {
      $("#err-placeofbirth2").hide();
    });

    $("#NameofSpouse").keyup(function () {
      $("#err-nameofspouse").hide();
    });

    $("#Nationality2").keyup(function () {
      $("#err-nationality2").hide();
    });

    $("#PlaceofWork").keyup(function () {
      $("#err-placeofwork").hide();
    });

    $("#Occupation2").keyup(function () {
      $("#err-occupation2").hide();
    });

    $("#FathersName").keyup(function () {
      $("#err-fathersname").hide();
    });
    $("#PlaceofBirth3").keyup(function () {
      $("#err-placeofbirth3").hide();
    });

    $("#Occupation3").keyup(function () {
      $("#err-occupation3").hide();
    });

    $("#HomeAddress3").keyup(function () {
      $("#err-homeaddress3").hide();
    });

    $("#Nationality3").on("change", function () {
      $("#err-Nationality3").hide();
    });
    $("#Nationalityfour").on("change", function () {
      $("#err-Nationalityfour").hide();
    });
    $("#PlaceofBirth4").keyup(function () {
      $("#err-placeofbirth4").hide();
    });

    $("#Occupation4").keyup(function () {
      $("#err-occupation4").hide();
    });
    $("#HomeAddress4").keyup(function () {
      $("#err-homeaddress4").hide();
    });

    $("#country-codehomecountry").on("change", function () {
      $("#err-countrycode2").hide();
    });

    $(".CountrysNumbers").keyup(function () {
      $("#err-countrynumber").hide();
    });

    $(".emailsids").keyup(function () {
      $("#erremailpersonal").hide();
    });

    $(".contactnumbers").keyup(function () {
      $("#err-contactnumber").hide();
    });

    $("#EmployeeCategory").on("change", function () {
      $("#err-countrycode2").hide();
    });

    $("#surenmaepersonal").on("change", function () {
      $("#err-Titlesurename").hide();
    });

    $("#PersonalMiddleName").keyup(function () {
      $("#err-Middlename").hide();
    });

    $("#CurrentNationality").on("change", function () {
      $("#err-currentnationality").hide();
    });

    $("#PreviousNationality").on("change", function () {
      $("#err-PreviousNationality").hide();
    });
    $("#Entered").on("change", function () {
      $("#err-entered").hide();
    });

    $("#Section").keyup(function () {
      $("#err-section").hide();
    });

    $("#ContactNumber").keyup(function () {
      $("#err-formatphonenumberpersonalContactNumber").hide();
    });

    $("#EmployeeCategory").on("change", function () {
      $("#err-EmployeeCategory").hide();
    });
    $("#DateofIssue").on("change", function () {
      $("#err-dateofissue").hide();
    });

    $("#PlaceofBirth2").keyup(function () {
      $("#err-placeofbirth2").hide();
    });

    $(".emailsids").keyup(function () {
      $("#invalid-email").hide();
    });

    $(".YesHaveyoueverapplied").on("change", function () {
      $("#err-Yes-applied").hide();
    });

    $("#MaritalStatus").on("change", function () {
      $("#err-maritalstatus").hide();
    });

    $("#BloodGroup").on("change", function () {
      $("#err-bloodgroup").hide();
    });

    $("#DateofExpiry").on("change", function () {
      $("#err-dateofexpiry").hide();
    });

    $("#CountryNumber").keyup(function () {
      $(".err-homecountry-err-format").hide();
    });

    $("#ContactNumber").keyup(function () {
      $(".err-formatphonenumberpersonalContactNumber").hide();
    });

    $("#dynamicFullName").keyup(function () {
      $(".err-fullname-err").hide();
    });

    $("#FirstNames").keyup(function () {
      $("#err-FirstName").hide();
    });

    $(".personalLastname").keyup(function () {
      $("#err-Lastname").hide();
    });
    $("#MothersName").keyup(function () {
      $("#err-mothersname").hide();
    });
    $("#MothersName").keyup(function () {
      $("#err-mothersname").hide();
    });

    $("#moh_dha_lience").on("change", function () {
      $("#err-moh-err-file").hide();
    });

    $("#UserName").keyup(function () {
      $("#err-username").hide();
    });

    $("#Password-dynamic").keyup(function () {
      $("#err-password").hide();
    });

    $("#Password").keyup(function () {
      $("#err-password").hide();
    });

    $("#tble-tbody-dynamic3 tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-qualification").hide();
      }

    })
    $("#tble-tbody-dynamic3_Employment_History tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(3) input').val();
      var val4 = $(this).find('td:eq(4) input').val();
      var val5 = $(this).find('td:eq(5) input').val();
      var val6 = $(this).find('td:eq(6) input').val();

      if (val1 != "" && val2 != "" && val3 != "" && val4 != "" && val5 != "" && val6 != "") {
        $("#err-table-employmenthistory").hide();
      }

    })
    $("#tble-tbody-dynamicemployreference tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-employeereferencedetails").hide();
      }

    })
    $("#tble-tbody-dynamicEmergencyContact tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-EmergencyContactPersonInUAE").hide();
      }

    })
    $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-EmergencyContactPersonOutside").hide();
      }

    })
  }

  public maritalstatusvalidation() {
    var status = true;
    if (
      status == true &&
      $("#MaritalStatus").find(":selected").text() == "Select"
    ) {
      $("#err-maritalstatus").show();
      $("#MaritalStatus").focus();
      status = false;
    } else {
      $("#err-maritalstatus").hide();
    }
    return status;
  }

  public BloodGroupvalidation() {
    var status = true;
    if (
      status == true &&
      $("#BloodGroup").find(":selected").text() == "Select"
    ) {
      $("#err-bloodgroup").show();
      $("#BloodGroup").focus();
      status = false;
    } else {
      $("#err-bloodgroup").hide();
    }
    return status;
  }

  public contactcodethreevalid() {
    var status = true;
    if (
      status == true &&
      $("#country-codehomecountry").find(":selected").text() == "Select"
    ) {
      $("#err-countrycode2").show();
      $("#country-codehomecountry").focus();
      status = false;
    } else {
      $("#err-countrycode2").hide();
    }
    return status;
  }

  public Nationality3() {
    var status = true;
    if (
      status == true &&
      $(".Nationalitys3").find(":selected").text() == "Select"
    ) {
      $("#err-Nationality3").show();
      $(".Nationalitys3").focus();
      status = false;
    } else {
      $("#err-Nationality3").hide();
    }
    return status;
  }

  public Nationalityfour() {
    var status = true;
    if (
      status == true &&
      $("#Nationalityfour").find(":selected").text() == "Select"
    ) {
      $("#err-Nationalityfour").show();
      $("#Nationalityfour").focus();
      status = false;
    } else {
      $("#err-Nationalityfour").hide();
    }
    return status;
  }

  public Validationofempcategory() {
    var status = true;
    if (
      status == true &&
      $("#EmployeeCategory").find(":selected").text() == "Select"
    ) {
      $("#err-EmployeeCategory").show();
      $("#EmployeeCategory").focus();
      status = false;
    } else {
      $("#err-EmployeeCategory").hide();
    }
    return status;
  }

  public homenumbervalidationofcharactor() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".home_countrynumbers") as any).val());
    if (status == true && phone.match(numbers)) {
      $(".err-homecountry-err-format").hide();
    } else {
      $(".err-homecountry-err-format").show();
      $(".home_countrynumbers").focus();
      status = false;
    }
    return status;
  }

  public surNamevalidation() {
    var status = true;
    if (
      status == true &&
      $("#surenmaepersonal").find(":selected").text() == "Select"
    ) {
      $("#err-Titlesurename").show();
      $("#surenmaepersonal").focus();
      status = false;
    } else {
      $("#err-Titlesurename").hide();
    }
    return status;
  }

  public MiddleNmae() {
    var status = true;

    if (status == true && $("#PersonalMiddleName").val() != "") {
      $("#err-Middlename").hide();
    } else {
      $("#err-Middlename").show();
      $("#PersonalMiddleName").focus();
      status = false;
    }
    return status;
  }

  public mobilenumberonly() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".contactnumbers") as any).val());
    if (status == true && phone.match(numbers)) {
      $(".err-formatphonenumberpersonalContactNumber").hide();
    } else {
      $(".err-formatphonenumberpersonalContactNumber").show();
      $(".contactnumbers").focus();
      status = false;
    }
    return status;
  }

  public homecontactnoformat() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".home_countrynumbers") as any).val());
    if (status == true && phone.match(numbers)) {
      $(".err-homecountry-err-format").hide();
    } else {
      $(".err-homecountry-err-format").show();
      $(".home_countrynumbers").focus();
      status = false;
    }
    return status;
  }

  public validation_email() {
    var email_status = true;
    var email = $(".emailsids").val();
    var emailregex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email_status == true && email != "") {
      if (emailregex.test(email.toString())) {
        $("#invalid-email").hide();
        email_status = true;
      } else {
        $("#invalid-email").show();
        $(".emailsids").focus();
        email_status = false;
      }
    }

    return email_status;
  }

  public Mobilenovaliduae() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".MobileNos") as any).val());
    if (status == true && phone != "") {
      if (status == true && phone.match(numbers)) {
        $(".err-mobilenouae").hide();
      } else {
        $(".err-mobilenouae").show();
        $(".MobileNos").focus();
        status = false;
      }
    }
    return status;
  }

  public telephonenumberuae() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var telephone = $.trim(($(".telephonenos") as any).val());
    if (status == true && telephone != "") {
      if (status == true && telephone.match(numbers)) {
        $("#err-personaltelephoneformat").hide();
      } else {
        $("#err-personaltelephoneformat").show();
        $(".telephonenos").focus();
        status = false;
      }
    }
    return status;
  }

  public YesnoApplid() {
    var status = true;

    if (status == true && $(".YesHaveyoueverapplied").is(":checked")) {
      $("#err-Yes-applied").hide();
    } else if (status == true && $(".noHaveyoueverapplied").is(":checked")) {
      $("#err-Yes-applied").hide();
    } else {
      $("#err-Yes-applied").show();
      $(".YesHaveyoueverapplied").focus();
      status = false;
    }
    return status;
  }

  public Yesnoapplidthenfieldvalidation() {
    var status = true;
    if (status == true && $(".YesHaveyoueverapplied").is(":checked")) {
      if (status == true && $("#NameofCompany").val() != "") {
        $("#err-nameofcompany").hide();
      } else {
        $("#err-nameofcompany").show();
        $("#NameofCompany").focus();
        status = false;
      }
    }

    return status;
  }

  public YesnoapplidthenPositionfieldvalidation() {
    var status = true;
    if (status == true && $(".YesHaveyoueverapplied").is(":checked")) {
      if (status == true && $("#Position").val() != "") {
        $("#err-position").hide();
      } else {
        $("#err-position").show();
        $("#Position").focus();
        status = false;
      }
    }
    return status;
  }

  public ValidateEmiratesIDFormat() {
    var status = true;

    if (status == true && $("#Emirate").val() != "") {
      var emrid: any = $("#Emirate").val().toString();
      if (emrid.length == 15) {
        if (emrid.startsWith("784")) {
          $("#err-emirate-wrong-format").hide();
        } else {
          $("#err-emirate-wrong-format").show();
          $("#Emirate").focus();
          status = false;
        }
      } else {
        $("#err-emirate-wrong-format").show();
        $("#Emirate").focus();
        status = false;
      }
    }

    return status;
  }

  public fullname() {
    var status = true;

    if (status == true && $("#FullName").val() != "") {
      $(".err-fullname-err").hide();
    } else {
      $(".err-fullname-err").show();
      $("#FullName").focus();

      status = false;
    }

    return status;
  }

  public firstname() {
    var status = true;

    if (status == true && $("#PersonalFirstName").val() != "") {
      $("#err-FirstName").hide();
    } else {
      $("#err-FirstName").show();
      $("#PersonalFirstName").focus();
      status = false;
    }

    return status;
  }

  public lastname() {
    var status = true;

    if (status == true && $("#empLastname").val() != "") {
      $("#err-Lastname").hide();
    } else {
      $("#err-Lastname").show();
      $("#empLastname").focus();
      status = false;
    }

    return status;
  }

  public ifdataflowcompleted() {
    var status = true;
    if (status == true && $(".dataflowYes").is(":checked")) {
      if (status == true && $("#provide-the-same").val() != "") {
        $("#err-provide-the-same").hide();
      } else {
        $("#err-provide-the-same").show();
        $("#provide-the-same").focus();
        status = false;
      }
    }
    return status;
  }

  public ValidateEmiratesIDFormatforchildrentable() {
    var status = true;
    if (status == true && $("#tble-txt-child-emirate-no").val() != "") {
      var emrid: any = $("#tble-txt-child-emirate-no").val().toString();
      if (emrid.length == 15) {
        if (emrid.startsWith("784")) {
          $("#err-table-children-format-emirate-id").hide();
        } else {
          $("#err-table-children-format-emirate-id").show();
          status = false;
        }
      } else {
        $("#err-table-children-format-emirate-id").show();
        status = false;
      }
    }

    return status;
  }

  public Password_validation() {
    var status = true;
    if (status == true && $("#Doh-license").is(":checked")) {
      if (status == true && $("#Password").val() != "") {
        $("#err-password").hide();
      } else {
        $("#err-password").show();
        $("#Password").focus();
        status = false;
      }
    }
    return status;
  }

  public username_validation() {
    var status = true;
    if (status == true && $("#Doh-license").is(":checked")) {
      if (status == true && $("#UserName").val() != "") {
        $("#err-username").hide();
      } else {
        $("#err-username").show();
        $("#UserName").focus();
        status = false;
      }
    }
    return status;
  }

  public Licence_Attachmentvalidation() {
    var status = true;
    let myfile = (document.querySelector("#moh_dha_lience") as HTMLInputElement)
      .files.length;
    if (status == true && $("#Moh-license").prop("checked") == true) {
      if (status == true && myfile != 0) {
        $("#err-moh-err-file").hide();
      } else {
        $("#err-moh-err-file").show();
        $("#moh_dha_lience").focus();
        status = false;
      }
    } else if (status == true && $("#Dha-license").prop("checked") == true) {
      if (status == true && myfile != 0) {
        $("#err-moh-err-file").hide();
      } else {
        $("#err-moh-err-file").show();
        $("#moh_dha_lience").focus();
        status = false;
      }
    }
    return status;
  }
  public Licence_AttachmentvalidationEDIT() {
    var status = true;
    let myfile = (document.querySelector("#moh_dha_lience") as HTMLInputElement)
      .files.length;
    if (licencefile == "") {
      if (status == true && $("#Moh-license").prop("checked") == true) {
        if (status == true && myfile != 0) {
          $("#err-moh-err-file").hide();
        } else {
          $("#err-moh-err-file").show();
          $("#moh_dha_lience").focus();
          status = false;
        }
      } else if (status == true && $("#Dha-license").prop("checked") == true) {
        if (status == true && myfile != 0) {
          $("#err-moh-err-file").hide();
        } else {
          $("#err-moh-err-file").show();
          $("#moh_dha_lience").focus();
          status = false;
        }
      }
    }
    return status;
  }


  public BlooodGroupnewhirevalidation() {
    var status = true;
    if (status == true && $("#personal-blood-group").find(":selected").text() == "Select") {
      $("#err-Newhirebloodgroup-personal").show();
      $("#personal-blood-group").focus();
      status = false;
    } else {
      $("#err-Newhirebloodgroup-personal").hide();
    }
    return status;
  }
  public EmployeeStatus() {
    var status = true;
    if (status == true && $("#emp-work-status").find(":selected").text() == "Select") {
      $("#err-emp-work").show();
      $("#emp-work-status").focus();
      status = false;
    } else {
      $("#err-emp-work").hide();
    }
    return status;
  }
  public QualificationValidation() {
    var Status = true;

    var personal_qf_last_input1 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(1).val();
    var personal_qf_last_input2 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(2).val();
    var personal_qf_last_input3 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(3).val();

    if (Status == true && personal_qf_last_input1 != "" && personal_qf_last_input2 != "" && personal_qf_last_input3 != "") {
      $("#err-table-qualification").hide();
    } else {

      $("#err-table-qualification").show();
      $("#tble-tbody-dynamic3 tr:last").find("input").eq(1).focus();
      Status = false;
    }
    return Status;
  }
  public EmploymentHistoryValidation() {
    var status = true;
    var emphistory_last_input1 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(1).val();
    var emphistory_last_input2 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(2).val();
    var emphistory_last_input3 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(3).val();
    var emphistory_last_input4 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(4).val();
    var emphistory_last_input5 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(5).val();
    var emphistory_last_input6 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(6).val();

    if (status == true &&
      emphistory_last_input1 != "" &&
      emphistory_last_input2 != "" &&
      emphistory_last_input3 != "" &&
      emphistory_last_input4 != "" &&
      emphistory_last_input5 != "" &&
      emphistory_last_input6 != ""
    ) {
      $("#err-table-employmenthistory").hide();
    } else {
      $("#err-table-employmenthistory").show();
      $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(1).focus();
      status = false;
    }
    return status;
  }
  public EmployeeReferenceDetailsValidation() {
    var Status = true;

    var empreference_last_input1 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(1).val();
    var empreference_last_input2 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(2).val();
    var empreference_last_input3 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(3).val();

    if (Status == true && empreference_last_input1 != "" && empreference_last_input2 != "" && empreference_last_input3 != "") {
      $("#err-table-employeereferencedetails").hide();
    } else {

      $("#err-table-employeereferencedetails").show();
      $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(1).focus();
      Status = false;
    }
    return Status;
  }
  public EmergencyContactPersonInUAEValidation() {
    var Status = true;

    var em_contactperson_inuae_last_input1 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(1).val();
    var em_contactperson_inuae_last_input2 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(2).val();
    var em_contactperson_inuae_last_input3 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(3).val();

    if (Status == true && em_contactperson_inuae_last_input1 != "" && em_contactperson_inuae_last_input2 != "" && em_contactperson_inuae_last_input3 != "") {
      $("#err-table-EmergencyContactPersonInUAE").hide();
    } else {

      $("#err-table-EmergencyContactPersonInUAE").show();
      $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(1).focus();
      Status = false;
    }
    return Status;
  }
  public EmergencyContactPersonOutsideValidation() {
    var Status = true;

    var em_contactperson_outuae_last_input1 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(1).val();
    var em_contactperson_outuae_last_input2 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(2).val();
    var em_contactperson_outuae_last_input3 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(3).val();

    if (Status == true && em_contactperson_outuae_last_input1 != "" && em_contactperson_outuae_last_input2 != "" && em_contactperson_outuae_last_input3 != "") {
      $("#err-table-EmergencyContactPersonOutside").hide();
    } else {

      $("#err-table-EmergencyContactPersonOutside").show();
      $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(1).focus();
      Status = false;
    }
    return Status;
  }


  public SaveListItem() {
    if (

      this.fullname() &&
      this.firstname() &&
      this.lastname() &&
      this.surNamevalidation() &&
      this.gendervalidation() &&
      this.Validationofempcategory() &&
      this.PlaceofBirth() &&
      this.DateofBirth() &&
      this.CurrentNationality() &&
      this.PreviousNationality() &&
      this.Religion() &&
      // this.Entereds() &&
      // this.Portss() &&
      this.countrycode() &&
      this.ContactNumber() &&
      this.mobilenumberonly() &&
      this.BlooodGroupnewhirevalidation() &&
      this.EmployeeStatus() &&
      this.DocumentNo() &&
      this.PlaceofIssue() &&
      this.DateofIssue() &&
      this.DateofExpiry() &&
      //    this.QualificationValidation() &&
      //    this.EmploymentHistoryValidation() &&
      //    this.EmployeeReferenceDetailsValidation() &&

      this.maritalstatusvalidation() &&
      this.FathersName() &&
      this.Nationality3() &&
      this.PlaceofBirththree() &&
      this.DateofBirththree() &&
      this.Occupationthree() &&
      this.HomeAddresshree() &&
      this.MotherName() &&
      this.Nationalityfour() &&
      this.PlaceofBirthfour() &&
      this.DateofBirthfour() &&
      this.Occupationfour() &&
      this.HomeAddressfour() &&
      this.contactcodethreevalid() &&
      this.HomeCountrysNumbers() &&
      this.homecontactnoformat() &&
      this.validation_email() &&
      this.Homeemailsids() &&
      this.YesnoApplid() &&
      this.EmergencyContactPersonInUAEValidation() &&
      //   this.EmergencyContactPersonOutsideValidation() &&
      this.telephonenumberuae() &&
      this.Mobilenovaliduae() &&
      this.Yesnoapplidthenfieldvalidation() &&
      this.YesnoapplidthenPositionfieldvalidation() &&
      this.ifdataflowcompleted() &&
      this.username_validation() &&
      this.Password_validation() &&
      this.Licence_Attachmentvalidation()
      //  this.ValidateEmiratesIDFormatforchildrentable()
    ) {
      var malefemle = $("#MaritalStatus").find(":selected").text();

      if ($(".YesHaveyoueverapplied").is(":checked")) {
        var YesHaveyoueverapplied = "Yes";
      } else {
        YesHaveyoueverapplied = "No";
      }

      if ($("#spouse").is(":checked")) {
        var spouse = "Yes";
      } else {
        spouse = "No";
      }

      if ($("#Sister").is(":checked")) {
        var Sister = "Yes";
      } else {
        Sister = "No";
      }

      if ($("#Brother").is(":checked")) {
        var Brother = "Yes";
      } else {
        Brother = "No";
      }

      if ($("#Friend").is(":checked")) {
        var Friend = "Yes";
      } else {
        Friend = "No";
      }

      if ($("#Cousin").is(":checked")) {
        // //Cousin);
        var Cousin = "Yes";
      } else {
        Cousin = "No";
      }

      if ($("#AnyOtherCloseRelative").is(":checked")) {
        var AnyOtherCloseRelative = "Yes";
      } else {
        AnyOtherCloseRelative = "No";
      }

      if ($("#NoRelative").is(":checked")) {
        var NoRelative = "Yes";
      } else {
        NoRelative = "No";
      }

      if ($("#NewRegistration").is(":checked")) {
        var newregstation = "Yes";
      } else {
        newregstation = "No";
      }
      if ($(".dataflowYes").is(":checked")) {
        var dataflowYes = "Yes";
      } else if ($(".dataflowno").is(":checked")) {
        dataflowYes = "No";
      } else {
        dataflowYes = "Nothing is Selected"
      }

      if ($("#Doh-license").is(":checked")) {
        var Licensetype = "DOH";
      } else if ($("#Moh-license").is(":checked")) {
        Licensetype = "MOH";
      } else if ($("#Dha-license").is(":checked")) {
        Licensetype = "DHA";
      } else {
        Licensetype == "NO";
      }

      var contactno = $(`.contactnumbers`).val();
      var contactcode = $(`#country-code`).find(":selected").text();
      var finalcontactno = contactcode + "-" + contactno;

      var contactcode2 = $(`#country-codehomecountry`).find(":selected").text();
      var value2 = $(`.CountrysNumbers`).val();
      var finalcontactno2 = contactcode2 + "-" + value2;

      //var mobileno = $(`.MobileNos`).val();
      //  var contactcodem = $(`#country-codeMobileNo`).find(":selected").text();
      // var allnos = contactcodem + "-" + mobileno;

      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          swal({
            text: "Please wait!",
            button: false,
            closeOnClickOutside: false,
          } as any);

          newweb.lists
            .getByTitle("Personal Information Master")
            .items.add({
              Title: "PERSONAL INFORMATION FORM",
              ControlNumber: ControlNumber + "/" + FormControlNumber,
              VersionNumber: FormVersionNumber,
              MobileNo: $(`.MobileNos`).val(),
              countrycodemobileno: $(`#country-codeMobileNo`).val(),
              FullName: $(`.full-nameitem`).val(),
              FirstName: $("#PersonalFirstName").val(),
              LastName: $("#empLastname").val(),
              MiddleName: $("#PersonalMiddleName").val() == "" ? "-" : $("#PersonalMiddleName").val(),
              SurName: $("#surenmaepersonal").val(),
              PlaceofBirth: $(`.pob`).val(),
              DateofBirth: moment($(`.dob`).val()).format("MM-DD-YYYY"),
              CurrentNationality: $(`.Current-Nationality`).val(),
              PreviousNationality: $(`.Previous-Nationality`).val(),
              Religion: $(`.religions`).val(),
              Section: $(`.sections`).val() == "" ? "-" : $(".sections").val(),
              Entered: moment($(`.entereds`).val()).format("MM-DD-YYYY"),
              Port: $(`.ports`).val(),
              ContactNumber: $(`.contactnumbers`).val(),
              Countrycodefirstsection: $(`#country-code`).val(),
              SponsorName: $(`.SponsorNames`).val(),
              Gender: $("#PersonalGender").val(),
              NewUserBloodGroup: $("#personal-blood-group").val(),
              DocumentNo: $(`.documentnos`).val(),
              PlaceofIssue: $(`.pos`).val(),
              DateofIssue: moment($(`#DateofIssue`).val()).format("MM-DD-YYYY"),
              DateofExpiry: moment($(`#DateofExpiry`).val()).format("MM-DD-YYYY"),
              ResidenceNo: $(`.residenceNos`).val() == "" ? "-" : $(".residenceNos").val(),
              MaritalStatus: malefemle,
              BloodGroup: $(`.bloodgroups`).val(),
              NameofSpouse: $(`.nos`).val(),
              Nationality21: $(`.Nationalitys2`).val(),
              PlaceofBirth2: $(`.pob2`).val(),
              DateofBirth2: moment($(`.dob2`).val()).format("MM-DD-YYYY"),
              PlaceofWork: $(`.pow`).val(),
              Occupation2: $(`.Occupations2`).val(),
              FathersName: $(`.FathersNames`).val(),
              Nationality3: $(`.Nationalitys3`).val(),
              PlaceofBirth3: $(`.pobs3`).val(),
              DateofBirth3: moment($(`.dobs3`).val()).format("MM-DD-YYYY"),
              HomeAddress3: $(`.homeaddress3`).val(),
              Occupation3: $(`.Occupations3`).val(),
              MothersName: $(`.MothersNames`).val(),
              Nationality4: $(`.Nationalitys4`).val(),
              PlaceofBirth4: $(`.pobs4`).val(),
              DateofBirth4: moment($(`.dobs4`).val()).format("MM-DD-YYYY"),
              HomeAddress4: $(`.HomeAddresss4`).val(),
              Occupation4: $(`.Occupations4`).val(),
              CountryNumber: $(`.CountrysNumbers`).val(),
              Countrycodesecondsection: $(`#country-codehomecountry`).val(),
              EmailID: $(`.emailsids`).val(),
              NameofCompany: $(`.NameofCompanys`).val(),
              Position: $(`.positions`).val(),
              // WorkLocation: $(`.WorkLocations`).val(),
              Emirate: $(`.Emirates`).val(),
              Street: $(`.Streets`).val() == "" ? "-" : $(".Streets").val(),
              Owner: $(`.Owners`).val() == "" ? "-" : $(".Owners").val(),
              FlatNo: $(`.FlatNos`).val() == "" ? "-" : $(".FlatNos").val(),
              Plot: $(`.plots`).val() == "" ? "-" : $(".plots").val(),
              PostBox: $(`.PostBoxs`).val() == "" ? "-" : $(".PostBoxs").val(),
              TelephoneNo: $(`.telephonenos`).val(),
              LicenseNo: $(`.LicenseNos`).val() == "" ? "-" : $(".LicenseNos").val(),
              IssueDate: moment($(`.IssueDates`).val()).format("MM-DD-YYYY"),
              ExpiryDate: moment($(`.ExpiryDates`).val()).format("MM-DD-YYYY"),
              NewRegistration: newregstation,
              UserName: $(`.usersnames`).val(),
              Password: $("#Password").val(),
              DrivingLicenseNo: $(`.drivinglicenselos`).val(),
              PlateNo: $(`.PlateNoss`).val(),
              dataflowNO: dataflowYes,
              Friend: Friend,
              AnyOtherCloseRelative: AnyOtherCloseRelative,
              NoRelative: NoRelative,
              Cousin: Cousin,
              Sister: Sister,
              Borther: Brother,
              HaveyoueverApplied: YesHaveyoueverapplied,
              UnitLogo: LogoUrl,
              LicenseType: Licensetype,
              // RelativeName: $("#RelativeName").val(),
              Status: "Created by Employee",
              BusinessUnit: officename,
              Category: $("#EmployeeCategory").val(),
              Spouse: spouse,
              ONBSessionID: this.state.ONBSessionID,
              AttachmentEmployeeFullName: this.state.CurrentUserName,
              Provethesame: $("#provide-the-same").val(),
              EmployeeStatus: $("#emp-work-status").val()
            })
            .then((results: any) => {
              //(results.data.ID);
              newweb.lists
                .getByTitle("Onboarding Transaction Master")
                .items.filter(
                  "ONBSessionID eq '" +
                  this.state.ONBSessionID +
                  "' and Title eq 'PERSONAL INFORMATION FORM'"
                )
                .orderBy("Created", false)
                .get()
                .then((response) => {
                  if (response.length != 0) {
                    newweb.lists
                      .getByTitle("Onboarding Transaction Master")
                      .items.getById(response[0].Id)
                      .update({
                        Status: "Completed",
                        CompletedOn: moment().format("MM/DD/YYYY"),
                      });
                  }
                })
                .then(() => {
                  this.AddTableToList(results.data.ID, this.state.ONBSessionID);
                });
            });
        }
      });
    }
  }

  public AllAttachment(FormMode) {
    if (AttachmentUploaderStatusArrayValidator.length != 0) {
      this.Attach1();
      this.Attach2();
      this.Attach6();
      this.Attach5();
      this.Attach3();
      this.Attach4();
      this.Attach7();
      this.Attach8();
      this.Attach9();
      this.Attach81();
      this.Attach12();
      this.Attach13();
      this.Attach11();
      this.LicenceAttachment();
      this.Attach14();
    } else {
      setTimeout(() => {
        swal({
          title: "The form has been submitted successfully",
          icon: "success",
        }).then(() => {
          window.open(
            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
            "_self"
          );
        });
      }, 15000);
    }
    // if (FormMode == "New") {
    //   setTimeout(() => {
    //     swal({
    //       title: "The form has been submitted successfully",
    //       icon: "success",
    //     }).then(() => {
    //       window.open("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New", "_self");
    //     });
    //   }, 15000);
    // }
    // else {
    //   swal({
    //     title: "The Form has been updated successfully",
    //     icon: "success",
    //   }).then(() => {
    //     location.reload()
    //   });
    // }
  }

  public AddTableToList(id, ONBSessionID) {
    $("#cust-table-block tbody tr").each(function (index) {
      var currentrow = $(this);
      var Requested = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-requested']")
        .val();
      var gender = currentrow
        .find("td:eq(1)")
        .find("select[id='tble-ChildGender']")
        .val();
      var childDOB = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-child-dob']")
        .val();
      var childPassNo = currentrow
        .find("td:eq(3)")
        .find("input[id*='tble-txt-child-passport-no']")
        .val();
      var childEmirateNo = currentrow
        .find("td:eq(4)")
        .find("input[id*='tble-txt-child-emirate-no']")
        .val();

      if (Requested != "" || gender != "-" || childPassNo != "" || childEmirateNo != "784"
        || gender != undefined || gender != null) {

        Requested = currentrow.find("td:eq(0)").find("input[id*='tble-txt-requested']").val() != ""
          ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-requested']")
            .val() : "-";
        gender =
          currentrow
            .find("td:eq(1)")
            .find("select[id='tble-ChildGender']")
            .val() != "-"
            ? currentrow
              .find("td:eq(1)")
              .find("select[id='tble-ChildGender']")
              .val()
            : "-";
        childPassNo =
          currentrow
            .find("td:eq(3)")
            .find("input[id*='tble-txt-child-passport-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(3)")
              .find("input[id*='tble-txt-child-passport-no']")
              .val()
            : "-";
        childEmirateNo =
          currentrow
            .find("td:eq(4)")
            .find("input[id*='tble-txt-child-emirate-no']")
            .val() != ""
            ? currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-child-emirate-no']")
              .val()
            : "-";

        newweb.lists.getByTitle("Children Table Transaction").items.add({
          PersonalItemid: id,
          Requested: Requested,
          Gender: gender,
          DOB: moment(childDOB).format("MM-DD-YYYY"),
          PassportNo: childPassNo,
          EmiratesNo: childEmirateNo,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });
      }
    });

    $("#cust-table-block2 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name2 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name2']")
        .val();
      var WorkLocation2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-worklocation2']")
        .val();
      var ContactNumber2 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber2']")
        .val();

      if (Name2 != "" || WorkLocation2 != "" || ContactNumber2 != "") {
        Name2 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name2']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name2']")
              .val()
            : "-";
        WorkLocation2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-worklocation2']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-worklocation2']")
              .val()
            : "-";
        ContactNumber2 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber2']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber2']")
              .val()
            : "-";

        newweb.lists
          .getByTitle("Personal Emergency Contact Person InUAE Transaction")
          .items.add({
            Name2: Name2,
            WorkLocation2: WorkLocation2,
            ContactNumber2: ContactNumber2,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });
      }
    });

    $("#cust-table-block3 tbody tr").each(function (index) {
      var currentrow = $(this);
      var Name3 = currentrow
        .find("td:eq(0)")
        .find("input[id*='tble-txt-name3']")
        .val();
      var Relation3 = currentrow
        .find("td:eq(1)")
        .find("input[id*='tble-txt-relation3']")
        .val();
      var ContactNumber3 = currentrow
        .find("td:eq(2)")
        .find("input[id*='tble-txt-contactnumber3']")
        .val();

      if (Name3 != "" || Relation3 != "" || ContactNumber3 != "") {
        Name3 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='tble-txt-name3']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name3']")
              .val()
            : "-";
        Relation3 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='tble-txt-relation3']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-relation3']")
              .val()
            : "-";
        ContactNumber3 =
          currentrow
            .find("td:eq(2)")
            .find("input[id*='tble-txt-contactnumber3']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactnumber3']")
              .val()
            : "-";

        newweb.lists.getByTitle("Personal Emergency Contact Person OutsideUAE Transaction").items.add({
          Name3: Name3,
          Relation3: Relation3,
          ContactNumber3: ContactNumber3,
          PersonalItemid: id,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });
      }
    });

    if ($("#emp-work-status").val() == "Experienced") {

      $("#cust-table-block4qualification tbody tr").each(function (index) {
        var currentrow = $(this);
        var QualificationName = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-Name-qualification']")
          .val();
        var PraUniversitycticedPosition = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-University']")
          .val();
        var yearofgraducation = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-year_of_grt']")
          .val();

        if (
          QualificationName != "" ||
          PraUniversitycticedPosition != "" ||
          yearofgraducation != ""
        ) {
          QualificationName =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-qualification']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-Name-qualification']")
                .val()
              : "-";
          PraUniversitycticedPosition =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-University']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-University']")
                .val()
              : "-";
          yearofgraducation =
            currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year_of_grt']")
              .val() != ""
              ? currentrow
                .find("td:eq(2)")
                .find("input[id*='tble-txt-year_of_grt']")
                .val()
              : "-";

          newweb.lists
            .getByTitle("Personal Professional Qualification")
            .items.add({
              Qualification: QualificationName,
              University: PraUniversitycticedPosition,
              YearofGraducation: yearofgraducation,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      });

      $("#cust-table-block-employmentHistory tbody tr").each(function (index) {
        var currentrow = $(this);
        var OrganizationName = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-OrganizationName']")
          .val();
        var OrganizationDesignation = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-OrganizationDesignation']")
          .val();
        var from = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-Organization-date-From']")
          .val();
        var to = currentrow
          .find("td:eq(3)")
          .find("input[id*='tble-txt-Organization-date-To']")
          .val();
        var exp = currentrow
          .find("td:eq(4)")
          .find("input[id*='tble-txt-Years_of_Experience']")
          .val();
        var Reason = currentrow
          .find("td:eq(5)")
          .find("input[id*='tble-txt-Reason_for_leaving']")
          .val();

        if (
          OrganizationName != "" ||
          OrganizationDesignation != "" ||
          exp != "" ||
          Reason != ""
        ) {
          OrganizationName =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-OrganizationName']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-OrganizationName']")
                .val()
              : "-";
          OrganizationDesignation =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-OrganizationDesignation']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-OrganizationDesignation']")
                .val()
              : "-";
          exp =
            currentrow
              .find("td:eq(4)")
              .find("input[id*='tble-txt-Years_of_Experience']")
              .val() != ""
              ? currentrow
                .find("td:eq(4)")
                .find("input[id*='tble-txt-Years_of_Experience']")
                .val()
              : "-";
          Reason =
            currentrow
              .find("td:eq(5)")
              .find("input[id*='tble-txt-Reason_for_leaving']")
              .val() != ""
              ? currentrow
                .find("td:eq(5)")
                .find("input[id*='tble-txt-Reason_for_leaving']")
                .val()
              : "-";

          newweb.lists.getByTitle("Personal Employment History Transaction").items.add({
            OrganizationName: OrganizationName,
            Organizationdesc: OrganizationDesignation,
            From: from,
            To: to,
            Experience: exp,
            Reason: Reason,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });
        }
      });

      $("#cust-table-blockEmployeeReference tbody tr").each(function (index) {
        var currentrow = $(this);
        var column1 = currentrow
          .find("td:eq(0)")
          .find("input[id*='tble-txt-Name-ResearchDetails']")
          .val();
        var column2 = currentrow
          .find("td:eq(1)")
          .find("input[id*='tble-txt-Email-ResearchDetails']")
          .val();
        var column3 = currentrow
          .find("td:eq(2)")
          .find("input[id*='tble-txt-contactno-ResearchDetails']")
          .val();

        if (column1 != "" || column2 != "" || column3 != "") {
          column1 =
            currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-Name-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(0)")
                .find("input[id*='tble-txt-Name-ResearchDetails']")
                .val()
              : "-";
          column2 =
            currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Email-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(1)")
                .find("input[id*='tble-txt-Email-ResearchDetails']")
                .val()
              : "-";
          column3 =
            currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-contactno-ResearchDetails']")
              .val() != ""
              ? currentrow
                .find("td:eq(2)")
                .find("input[id*='tble-txt-contactno-ResearchDetails']")
                .val()
              : "-";

          newweb.lists.getByTitle("personal Reference Details").items.add({
            Name: column1,
            Email: column2,
            Contact: column3,
            PersonalItemid: id,
            ONBSessionID: ONBSessionID,
            OrderNo: index,
          });
        }
      });
    }

    $("#cust-table-blockResearch tbody tr").each(function (index) {
      var currentrow = $(this);
      var Researchname = currentrow
        .find("td:eq(0)")
        .find("input[id='tble-txt-name-Research']")
        .val();
      var Researchcategory = currentrow
        .find("td:eq(1)")
        .find("input[id='tble-txt-Category-Research']")
        .val();
      var year = currentrow
        .find("td:eq(2)")
        .find("input[id='tble-txt-year-Research']")
        .val();

      if (Researchname != "" || Researchcategory != "" || year != "") {
        Researchname =
          currentrow
            .find("td:eq(0)")
            .find("input[id='tble-txt-name-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='tble-txt-name-Research']")
              .val()
            : "-";
        Researchcategory =
          currentrow
            .find("td:eq(1)")
            .find("input[id='tble-txt-Category-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='tble-txt-Category-Research']")
              .val()
            : "-";
        year =
          currentrow
            .find("td:eq(2)")
            .find("input[id='tble-txt-year-Research']")
            .val() != ""
            ? currentrow
              .find("td:eq(2)")
              .find("input[id*='tble-txt-year-Research']")
              .val()
            : "-";

        newweb.lists.getByTitle("Personal Research Transaction").items.add({
          ResearchName: Researchname,
          Researchcategory: Researchcategory,
          year: year,
          PersonalItemid: id,
          ONBSessionID: ONBSessionID,
          OrderNo: index,
        });
      }
    });


    $("#cust-table-relattivefriend-table tbody tr").each(function (index) {
      var currentrow = $(this);
      var column1 = currentrow
        .find("td:eq(0)")
        .find("input[id*='relative-friend-name']")
        .val();
      var column2 = currentrow
        .find("td:eq(1)")
        .find("input[id*='relative-friend-worklocation']")
        .val();

      if (column1 != "" || column2 != "") {
        column1 =
          currentrow
            .find("td:eq(0)")
            .find("input[id*='relative-friend-name']")
            .val() != ""
            ? currentrow
              .find("td:eq(0)")
              .find("input[id*='relative-friend-name']")
              .val()
            : "-";
        column2 =
          currentrow
            .find("td:eq(1)")
            .find("input[id*='relative-friend-worklocation']")
            .val() != ""
            ? currentrow
              .find("td:eq(1)")
              .find("input[id*='relative-friend-worklocation']")
              .val()
            : "-";

        var TempTableChildItemID: any = currentrow
          .find("td:eq(0)")
          .find("input[id*='hdn-personal-relativefriend-itm-id']")
          .val();
        //var TableChildItemID = parseInt(TempTableChildItemID);

        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Personal Relative friend Transaction")
            .items.add({
              Name: column1,
              Worklocation: column2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        } else {
          newweb.lists
            .getByTitle("Personal Relative friend Transaction")
            .items.getById(parseInt(TempTableChildItemID))
            .update({
              Name: column1,
              Worklocation: column2,
              PersonalItemid: id,
              ONBSessionID: ONBSessionID,
              OrderNo: index,
            });
        }
      }
    });

    this.AllAttachment("New");
  }

  public norelativecheckbox() {
    if ($("#NoRelative").is(":checked")) {
      $("#if-no-relative-hide").hide();
      $("#Friend").prop("checked", false) &&
        $("#Cousin").prop("checked", false) &&
        $("#Brother").prop("checked", false) &&
        $("#Sister").prop("checked", false) &&
        $("#spouse").prop("checked", false) &&
        $("#AnyOtherCloseRelative").prop("checked", false);
    }
  }

  public relativefriendchecking(mod) {
    if (mod == "Spouse") {
      if ($("#spouse").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#Brother").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {
          $("#if-no-relative-hide").show();
        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }

      }
    } else if (mod == "Brother") {
      if ($("#Brother").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {
          $("#if-no-relative-hide").show();
        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else if (mod == "Sister") {
      if ($("#Sister").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#Brother").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {
          $("#if-no-relative-hide").show();
        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else if (mod == "Brother") {
      if ($("#Brother").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {
          $("#if-no-relative-hide").show();
        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else if (mod == "Cousin") {
      if ($("#Cousin").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#Brother").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();
        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else if (mod == "AnyOtherCloseRelative") {
      if ($("#AnyOtherCloseRelative").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#Brother").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {

        } else if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Friend").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else if (mod == "Friend") {
      if ($("#Friend").is(":checked")) {
        $("#if-no-relative-hide").show();
        $("#NoRelative").prop("checked", false);
      } else {
        if ($("#Brother").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Sister").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#Cousin").is(":checked")) {

        } else if ($("#AnyOtherCloseRelative").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else if ($("#spouse").is(":checked")) {
          $("#if-no-relative-hide").show();

        } else {
          $("#if-no-relative-hide").hide();
        }
      }
    } else {
      $("#if-no-relative-hide").hide();
    }
  }

  public LogoUnitDynamicpersonal(ofcs) {
    if (GlobalFormOpenedMode == "New") {
      newweb.lists
        .getByTitle("Business Unit Master")
        .items.select("ID", "UnitLogo")
        .filter(`Title eq '${ofcs}'`)
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
        .filter(`Title eq 'PERSONAL INFORMATION FORM'`).get()
        .then((results) => {

          FormControlNumber = results[0][fieldname1.InternalName]
          FormVersionNumber = results[0][fieldname2.InternalName]


        });

    }
  }

  public Getsurename() {
    newweb.lists
      .getByTitle("SurName")
      .items.select("ID", "SurName")
      .get()
      .then((results) => {
        //(results);

        this.setState({
          Titlesurname: results,
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

        reacthandler.createfolder(Name);

        Currentdisplaynames = resultData.d.DisplayName;
        //(resultData.d.UserProfileProperties.results);
        $(".fullname_personal").val(resultData.d.DisplayName);
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcname = properties[i].Value;
            // officename = "LLH Hospital, Abu Dhabi";
            // var ofcname = "LLH Hospital, Abu Dhabi";

            setTimeout(() => {
              reacthandler.LogoUnitDynamicpersonal(ofcname);
              reacthandler.GetContolandVersionNumber(ofcname)
              reacthandler.GetControlNumberAccordingtoformname(ofcname)
            }, 500);
          }
        }
        //for first name lastname
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "FirstName") {
            officeFirstname = properties[i].Value;
            var firstofficename = properties[i].Value;
            $(".personal_firstname").val(firstofficename);
            reacthandler.setState({
              lastname: firstofficename,
            });
          }
          if (properties[i].Key == "LastName") {
            officlelastname = properties[i].Value;
            var lastofficename = properties[i].Value;
            $(".personal_lastname").val(lastofficename);
            reacthandler.setState({
              firstname: lastofficename,
            });
          }
        }
        if (GlobalFormOpenedMode == "New") {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "New");
          // reacthandler.GetCurrentUserONBSessionID('selvana.sedhom@burjeel.com', "New");
        } else if (GlobalFormOpenedMode == "Edit") {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "Edit");
        } else {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "View");
        }
      },

      error: function (jqXHR, textStatus, errorThrown) { },
    });
  }

  public ONkeytypinghidedynamictabledaerrrortext() {
    // alert("hi")
    $("#tble-tbody-dynamic3 tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-qualification").hide();
      }

    })
    $("#tble-tbody-dynamic3_Employment_History tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(3) input').val();
      var val4 = $(this).find('td:eq(4) input').val();
      var val5 = $(this).find('td:eq(5) input').val();
      var val6 = $(this).find('td:eq(6) input').val();

      if (val1 != "" && val2 != "" && val3 != "" && val4 != "" && val5 != "" && val6 != "") {
        $("#err-table-employmenthistory").hide();
      }

    })
    $("#tble-tbody-dynamicemployreference tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-employeereferencedetails").hide();
      }

    })
    $("#tble-tbody-dynamicEmergencyContact tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-EmergencyContactPersonInUAE").hide();
      }

    })
    $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").on("keyup", function () {

      var val1 = $(this).find('td:eq(0) input:eq(1)').val();
      var val2 = $(this).find('td:eq(1) input').val();
      var val3 = $(this).find('td:eq(2) input').val();
      if (val1 != "" && val2 != "" && val3 != "") {
        $("#err-table-EmergencyContactPersonOutside").hide();
      }

    })
  }
  public AddNewRow(e) {
    //  <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${Childrencounter}"></input></td>
    e.preventDefault();
    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-block");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {

        $("#tble-tbody-dynamic").append(`<tr class="edit-hr-chil-personal-form-tr">
   
        <td><input type="hidden" id="hdn-personaltab-itm-id" value="null"></input><input class="form-control" type="text" id="tble-txt-requested" autoComplete="off"></input></td>
        <td>
        <select id="tble-ChildGender"
        class="form-control personalviewclasscommom">
        <option value="-">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
       </td>
        <td><input type="date"  class="form-control" id="tble-child-dob"  max="${moment().format(
          "YYYY-MM-DD"
        )}" autoComplete="off"></input></td>
        <td><input type="text" class="form-control"  id="tble-txt-child-passport-no" autoComplete="off"></input></td>
        <td><input type="text" class="form-control" value="${784}"   maxlength="15" id="tble-txt-child-emirate-no" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel children_delete_icon"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);


      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-block");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {

        $("#tble-tbody-dynamic").append(`<tr class="edit-hr-chil-personal-form-tr">
   
        <td><input type="hidden" id="hdn-personaltab-itm-id" value="null"></input><input class="form-control" type="text" id="tble-txt-requested" autoComplete="off"></input></td>
        <td>
        <select id="tble-ChildGender"
        class="form-control personalviewclasscommom">
        <option value="-">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
       </td>
        <td><input type="date"  class="form-control" id="tble-child-dob"  max="${moment().format(
          "YYYY-MM-DD"
        )}" autoComplete="off"></input></td>
        <td><input type="text" class="form-control"  id="tble-txt-child-passport-no" autoComplete="off"></input></td>
        <td><input type="text" class="form-control" value="${784}"   maxlength="15" id="tble-txt-child-emirate-no" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel children_delete_icon"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);


      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }

    Childrencounter = Childrencounter + 1;
    $("table #tble-tbody-dynamic").on("click", ".ibtnDel", function (event) {
      // $(this).closest("tr").remove();
      // Childrencounter = Childrencounter - 1 + 2;
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        //(willdelete);
        if (willdelete) {
          $(this).closest("tr").remove();
          Childrencounter = Childrencounter - 1 + 2;
          swal({
            title: "Deleted Successfully",
            icon: "success",
          });
        }
      });
    });
  }

  public QualificationAddNewRow(e) {

    e.preventDefault();

    var personal_qf_last_input1 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(1).val();
    var personal_qf_last_input2 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(2).val();
    var personal_qf_last_input3 = $("#tble-tbody-dynamic3 tr:last").find("input").eq(3).val();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-block4qualification");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {

        if (personal_qf_last_input1 != "" && personal_qf_last_input2 != "" && personal_qf_last_input3 != "") {

          $("#tble-tbody-dynamic3").append(`<tr>
       
        <td><input type="hidden" id="hdn-personal-qualif-itm-id" value="null"></input><input type="text" id="tble-txt-Name-qualification" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-University" autoComplete="off"></input></td>
       
        <td><input type="text" id="tble-txt-year_of_grt" maxlength="4" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }





    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-block4qualification");
      var Editrows: number = table.getElementsByTagName("tr").length

      // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${qualificationcounter}"></input></td>
      if (Editrows < 6) {

        if (personal_qf_last_input1 != "" && personal_qf_last_input2 != "" && personal_qf_last_input3 != "") {
          $("#tble-tbody-dynamic3").append(`<tr>
     
      <td><input type="hidden" id="hdn-personal-qualif-itm-id" value="null"></input><input type="text" id="tble-txt-Name-qualification" autoComplete="off"></input></td>
      <td><input type="text" id="tble-txt-University" autoComplete="off"></input></td>
     
      <td><input type="text" id="tble-txt-year_of_grt" maxlength="4" autoComplete="off"></input></td>
      <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
    </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }

    qualificationcounter = qualificationcounter + 1;
    $("table #tble-tbody-dynamic3").on("click", ".ibtnDel2", function (event) {
      // $(this).closest("tr").remove();
      // qualificationcounter = qualificationcounter - 1 + 2;
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willdelete) => {
        //(willdelete);
        if (willdelete) {
          $(this).closest("tr").remove();
          qualificationcounter = qualificationcounter - 1 + 2;
          swal({
            title: "Deleted Successfully",
            icon: "success",
          });
        }
      });
    });
  }

  public EmploymentHistoryAddNewRow(e) {

    e.preventDefault();

    var emphistory_last_input1 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(1).val();
    var emphistory_last_input2 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(2).val();
    var emphistory_last_input3 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(3).val();
    var emphistory_last_input4 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(4).val();
    var emphistory_last_input5 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(5).val();
    var emphistory_last_input6 = $("#tble-tbody-dynamic3_Employment_History tr:last").find("input").eq(6).val();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-block-employmentHistory");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {
        if (emphistory_last_input1 != "" && emphistory_last_input2 != "" && emphistory_last_input3 != "" && emphistory_last_input4 != "" && emphistory_last_input5 != "" && emphistory_last_input6 != "") {
          $("#tble-tbody-dynamic3_Employment_History").append(`<tr>
   
        <td><input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="null"></input><input type="text" id="tble-txt-OrganizationName" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-OrganizationDesignation" autoComplete="off"></input></td>
        <td><input type="month" id="tble-txt-Organization-date-From"  max="${moment().format(
            "YYYY-MM"
          )}" autoComplete="off"></input></td>
       
        <td><input type="month" id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-tble-txt-Years_of_Experience" maxlength="4" autoComplete="off"></input></td>
        
        <td><input type="text" id="tble-txt-Reason_for_leaving" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel3"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-block-employmentHistory");
      var editrows: number = table.getElementsByTagName("tr").length
      if (editrows < 6) {

        if (emphistory_last_input1 != "" && emphistory_last_input2 != "" && emphistory_last_input3 != "" && emphistory_last_input4 != "" && emphistory_last_input5 != "" && emphistory_last_input6 != "") {

          $("#tble-tbody-dynamic3_Employment_History").append(`<tr>
   
        <td><input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="null"></input><input type="text" id="tble-txt-OrganizationName" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-OrganizationDesignation" autoComplete="off"></input></td>
        <td><input type="month" id="tble-txt-Organization-date-From"  max="${moment().format(
            "YYYY-MM"
          )}" autoComplete="off"></input></td>
       
        <td><input type="month" id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-tble-txt-Years_of_Experience" maxlength="4" autoComplete="off"></input></td>
        
        <td><input type="text" id="tble-txt-Reason_for_leaving" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel3"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }



    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmploymentHistorycounter}"></input></td>

    EmploymentHistorycounter = EmploymentHistorycounter + 1;
    $("table #tble-tbody-dynamic3_Employment_History").on(
      "click",
      ".ibtnDel3",
      function (event) {
        // $(this).closest("tr").remove();
        // EmploymentHistorycounter = EmploymentHistorycounter - 1 + 2;
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          //(willdelete);
          if (willdelete) {
            $(this).closest("tr").remove();
            EmploymentHistorycounter = EmploymentHistorycounter - 1 + 2;
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }

  public ResearchPublicationDetailsAddNewRow(e) {

    e.preventDefault();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-blockResearch");
      var rows: number = table.getElementsByTagName("tr").length
      if (rows < 6) {

        $("#tble-tbody-dynamicResearch").append(`<tr>
  
        <td><input type="hidden" id="hdn-personaltab-reserch-itm-id" value="null"></input><input type="text" id="tble-txt-name-Research" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-Category-Research" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-year-Research"  maxlength="4" autoComplete="off"></input></td>
    
        <td class="delete_icon_td"><a href="#" class="ibtnDel4"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr >`);

        this.ONkeytypinghidedynamictabledaerrrortext()
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-blockResearch");
      var rows: number = table.getElementsByTagName("tr").length
      if (rows < 6) {

        $("#tble-tbody-dynamicResearch").append(`<tr>
    
          <td><input type="hidden" id="hdn-personaltab-reserch-itm-id" value="null"></input><input type="text" id="tble-txt-name-Research" autoComplete="off"></input></td>
          <td><input type="text" id="tble-txt-Category-Research" autoComplete="off"></input></td>
          <td><input type="text" id="tble-txt-year-Research"  maxlength="4" autoComplete="off"></input></td>
      
          <td class="delete_icon_td"><a href="#" class="ibtnDel4"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
        </tr >`);
        this.ONkeytypinghidedynamictabledaerrrortext()

      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }

    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${ResearchPublicationDetailscounter}"></input></td>

    ResearchPublicationDetailscounter = ResearchPublicationDetailscounter + 1;
    $("table #tble-tbody-dynamicResearch").on(
      "click",
      ".ibtnDel4",
      function (event) {
        // ResearchPublicationDetailscounter =
        //   ResearchPublicationDetailscounter - 1 + 2;
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          //(willdelete);
          if (willdelete) {
            $(this).closest("tr").remove();
            ResearchPublicationDetailscounter =
              ResearchPublicationDetailscounter - 1 + 2;
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }

  public EmployeeReferenceDetailsAddNewRow(e) {

    e.preventDefault();

    var empreference_last_input1 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(1).val();
    var empreference_last_input2 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(2).val();
    var empreference_last_input3 = $("#tble-tbody-dynamicemployreference tr:last").find("input").eq(3).val();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-blockEmployeeReference");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {

        if (empreference_last_input1 != "" && empreference_last_input2 != "" && empreference_last_input3 != "") {

          $("#tble-tbody-dynamicemployreference").append(`<tr>
      <td><input type="hidden" id="hdn-personal-ref-itm-id" value="null"></input><input type="text" id="tble-txt-Name-ResearchDetails" autoComplete="off"></input></td>
      <td><input type="text" id="tble-txt-Email-ResearchDetails" autoComplete="off"></input></td>
      <td><input type="text" id="tble-txt-contactno-ResearchDetails" autoComplete="off"></input></td>
  
      <td class="delete_icon_td"><a href="#" class="ibtnDel5"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
    </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-blockEmployeeReference");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {
        if (empreference_last_input1 != "" && empreference_last_input2 != "" && empreference_last_input3 != "") {
          $("#tble-tbody-dynamicemployreference").append(`<tr>
      <td><input type="hidden" id="hdn-personal-ref-itm-id" value="null"></input><input type="text" id="tble-txt-Name-ResearchDetails" autoComplete="off"></input></td>
      <td><input type="text" id="tble-txt-Email-ResearchDetails" autoComplete="off"></input></td>
      <td><input type="text" id="tble-txt-contactno-ResearchDetails" autoComplete="off"></input></td>
  
      <td class="delete_icon_td"><a href="#" class="ibtnDel5"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
    </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 5 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }



    EmployeeReferenceDetailscounter = EmployeeReferenceDetailscounter + 1;
    $("table #tble-tbody-dynamicemployreference").on(
      "click",
      ".ibtnDel5",
      function (event) {
        // EmployeeReferenceDetailscounter =
        //   EmployeeReferenceDetailscounter - 1 + 2;
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          //(willdelete);
          if (willdelete) {
            $(this).closest("tr").remove();
            EmployeeReferenceDetailscounter =
              EmployeeReferenceDetailscounter - 1 + 2;
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }



  public EmergencyContactPersonInUAEAddNewRow(e) {

    e.preventDefault();

    var em_contactperson_inuae_last_input1 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(1).val();
    var em_contactperson_inuae_last_input2 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(2).val();
    var em_contactperson_inuae_last_input3 = $("#tble-tbody-dynamicEmergencyContact tr:last").find("input").eq(3).val();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-block2");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 5) {
        if (em_contactperson_inuae_last_input1 != "" && em_contactperson_inuae_last_input2 != "" && em_contactperson_inuae_last_input3 != "") {
          $("#tble-tbody-dynamicEmergencyContact").append(`<tr>
   
        <td><input type="hidden" id="hdn-personalcontactperson-itm-id" value="null"></input><input type="text" id="tble-txt-name2" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-worklocation2" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-contactnumber2" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel6"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 4 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-block2");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 5) {
        if (em_contactperson_inuae_last_input1 != "" && em_contactperson_inuae_last_input2 != "" && em_contactperson_inuae_last_input3 != "") {
          $("#tble-tbody-dynamicEmergencyContact").append(`<tr>
   
        <td><input type="hidden" id="hdn-personalcontactperson-itm-id" value="null"></input><input type="text" id="tble-txt-name2" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-worklocation2" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-contactnumber2" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel6"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 4 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }
    //<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmergencyContactPersonInUAEcounter}"></input></td>

    EmergencyContactPersonInUAEcounter = EmergencyContactPersonInUAEcounter + 1;
    $("table #tble-tbody-dynamicEmergencyContact").on(
      "click",
      ".ibtnDel6",
      function (event) {
        // EmergencyContactPersonInUAEcounter =
        //   EmergencyContactPersonInUAEcounter - 1 + 2;
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          //(willdelete);
          if (willdelete) {
            $(this).closest("tr").remove();
            EmergencyContactPersonInUAEcounter =
              EmergencyContactPersonInUAEcounter - 1 + 2;
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }

  public EmergencyContactPersonOutsideAddNewRow(e) {

    e.preventDefault();
    var em_contactperson_outuae_last_input1 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(1).val();
    var em_contactperson_outuae_last_input2 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(2).val();
    var em_contactperson_outuae_last_input3 = $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").find("input").eq(3).val();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-block3");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 5) {
        if (em_contactperson_outuae_last_input1 != "" && em_contactperson_outuae_last_input2 != "" && em_contactperson_outuae_last_input3 != "") {

          $("#tble-tbody-dynamicemergencycontactpepersonoutside").append(`<tr>
   
    <td><input type="hidden" id="hdn-personalcontperson-out-itm-id" value="null"></input><input type="text" id="tble-txt-name3" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-relation3" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-contactnumber3" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel7"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 4 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-block3");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 5) {
        if (em_contactperson_outuae_last_input1 != "" && em_contactperson_outuae_last_input2 != "" && em_contactperson_outuae_last_input3 != "") {
          $("#tble-tbody-dynamicemergencycontactpepersonoutside").append(`<tr>
   
        <td><input type="hidden" id="hdn-personalcontperson-out-itm-id" value="null"></input><input type="text" id="tble-txt-name3" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-relation3" autoComplete="off"></input></td>
        <td><input type="text" id="tble-txt-contactnumber3" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel7"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
          this.ONkeytypinghidedynamictabledaerrrortext()
        } else {
          swal({
            title: "Values are empty in last row",
            icon: "warning",
            showConfirmButton: false,
            timer: 1500,
          } as any);
        }
      } else {
        swal({
          title: " Only 4 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }

    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmergencyContactPersonOutsideUAE}"></input></td>

    EmergencyContactPersonOutsideUAE = EmergencyContactPersonOutsideUAE + 1;
    $("table #tble-tbody-dynamicemergencycontactpepersonoutside").on(
      "click",
      ".ibtnDel7",
      function (event) {
        // EmergencyContactPersonOutsideUAE =
        //   EmergencyContactPersonOutsideUAE - 1 + 2;
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          //(willdelete);
          if (willdelete) {
            $(this).closest("tr").remove();
            EmergencyContactPersonOutsideUAE =
              EmergencyContactPersonOutsideUAE - 1 + 2;
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }

  public addreletivefriendrow(e) {
    e.preventDefault();
    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-relattivefriend-table");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 3) {

        $("#tble-tbody-relative-friend").append(`<tr>
        <td><input type="hidden" id="hdn-personal-relativefriend-itm-id" value="null"></input><input type="text" id="relative-friend-name" class="table-border-only" autoComplete="off"></input></td>
        <td><input type="text" id="relative-friend-worklocation" class="table-border-only" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel8"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

      } else {
        swal({
          title: " Only 2 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-relattivefriend-table");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 3) {

        $("#tble-tbody-relative-friend").append(`<tr>
    <td><input type="hidden" id="hdn-personal-relativefriend-itm-id" value="null"></input><input type="text" id="relative-friend-name" class="table-border-only" autoComplete="off"></input></td>
    <td><input type="text" id="relative-friend-worklocation" class="table-border-only" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel8"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);

      } else {
        swal({
          title: " Only 2 rows can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }

    EmergencyContactPersonOutsideUAE = EmergencyContactPersonOutsideUAE + 1;
    $("table #tble-tbody-relative-friend").on(
      "click",
      ".ibtnDel8",
      function (event) {
        swal({
          title: "Are you sure?",
          text: "Do you want to delete this!",
          icon: "warning",
          buttons: ["No", "Yes"],
          dangerMode: true,
        } as any).then((willdelete) => {
          if (willdelete) {
            $(this).closest("tr").remove();
            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });
      }
    );
  }

  public async createfolder(Username) {
    if (GlobalFormOpenedMode != "Edit") {
      this.Attachmentchecking();
    }
    // var   str="this is the item";
    var str = Username;
    var FullName = str.split(" ").join("");

    const folder = newweb
      .getFolderByServerRelativePath(`PersonalAttachments/${FullName}`)
      .select("Exists")
      .get();
    if (!(await folder).Exists) {
      newweb.folders
        .add(`PersonalAttachments/${FullName}`)
        .then(function (data) {
          //("Folder is created at " + data.data.ServerRelativeUrl);
        })
        .catch(function (data) {
          //(data);
        });
    }
    const fol = subweb.getFolderByServerRelativePath(`Personal Attachments HR Update History/${FullName}`)
      .select("Exists").get();
    if (!(await fol).Exists) {
      subweb.folders.add(`Personal Attachments HR Update History/${FullName}`)
    }

  }

  // public Attachmentfiles() {
  //   this.Attach1();
  //   this.Attach2();
  //   this.Attach6();
  //   this.Attach5();
  //   this.Attach3();
  //   this.Attach4();
  //   this.Attach7();
  //   this.Attach8();
  //   this.Attach9();
  //   this.Attach81();
  //   this.Attach12();
  //   this.Attach13();
  //   //this.Attach11();

  // }

  public Attachmentlengthcheck1() {
    var status = true;
    let myfile = (document.querySelector("#Updated_Resume") as HTMLInputElement)
      .files.length;

    if (status == true && myfile != 0) {
      $("#err-Updated_Resume").hide();
    } else {
      $("#err-Updated_Resume").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck13() {
    var status = true;
    let myfile = (document.querySelector("#allexperience") as HTMLInputElement)
      .files.length;

    if (status == true && myfile != 0) {
      $("#err-allexperience").hide();
    } else {
      $("#err-allexperience").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck12() {
    var status = true;
    let myfile = (document.querySelector("#Highschool") as HTMLInputElement)
      .files.length;

    if (status == true && myfile != 0) {
      $("#err-Highschool").hide();
    } else {
      $("#err-Highschool").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck11() {
    var status = true;
    let myfile = (
      document.querySelector("#Highersecondary") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-Highersecondary").hide();
    } else {
      $("#err-Highersecondary").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck10() {
    var status = true;
    let myfile = (
      document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-HBachelor-UG-degree").hide();
    } else {
      $("#err-HBachelor-UG-degree").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck9() {
    var status = true;
    let myfile = (document.querySelector("#PG-degree") as HTMLInputElement)
      .files.length;

    if (status == true && myfile != 0) {
      $("#err-PG-degree").hide();
    } else {
      $("#err-PG-degree").show();
      status = false;
    }
    return status;
  }

  public Attachmentlengthcheck8() {
    var status = true;
    let myfile = (
      document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-Sponsors_passportvisa").hide();
    } else {
      $("#err-Sponsors_passportvisa").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck7() {
    var status = true;
    let myfile = (
      document.querySelector("#Insurance_continuity_letter") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-Insurance_continuity_letter").hide();
    } else {
      $("#err-Insurance_continuity_letter").show();
      status = false;
    }
    return status;
  }

  public Attachmentlengthcheck6() {
    var status = true;
    let myfile = (
      document.querySelector("#previous-emiratesid") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-previous-emiratesid").hide();
    } else {
      $("#err-previous-emiratesid").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck5() {
    var status = true;
    let myfile = (document.querySelector("#Previousvisa") as HTMLInputElement)
      .files.length;

    if (status == true && myfile != 0) {
      $("#err-Previousvisa").hide();
    } else {
      $("#err-Previousvisa").show();
      status = false;
    }
    return status;
  }

  public Attachmentlengthcheck4() {
    var status = true;
    let myfile = (
      document.querySelector("#passportbackpage") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-passportbackpage").hide();
    } else {
      $("#err-passportbackpage").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck3() {
    var status = true;
    let myfile = (
      document.querySelector("#passportcopy-frontpage") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-passportcopy").hide();
    } else {
      $("#err-passportcopy").show();
      status = false;
    }
    return status;
  }
  public Attachmentlengthcheck2() {
    var status = true;
    let myfile = (
      document.querySelector("#High-QualityPhoto") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-High-QualityPhoto").hide();
    } else {
      $("#err-High-QualityPhoto").show();
      status = false;
    }
    return status;
  }

  public dohcheckoxchecking() {
    if ($("#Doh-license").is(":checked")) {
      $(".dohpasskey-kindaly-provide").show();
      $(".moh-dha-Attachment-hide-show").hide();
    } else {
      $(".dohpasskey-kindaly-provide").hide();
    }
  }

  public Dhamhacheckboxchecking(mod) {
    if (mod == "MOH") {
      if ($("#Moh-license").is(":checked")) {
        $(".dohpasskey-kindaly-provide").hide();
        $(".moh-dha-Attachment-hide-show").show();
      } else {
        $(".moh-dha-Attachment-hide-show").hide();
      }
    } else if (mod == "DHA") {
      if ($("#Dha-license").is(":checked")) {
        $(".dohpasskey-kindaly-provide").hide();
        $(".moh-dha-Attachment-hide-show").show();
      } else {
        $(".moh-dha-Attachment-hide-show").hide();
      }
    }
  }

  public dataflowchecknoxchecking() {
    if ($(".dataflowYes").is(":checked")) {
      $(".ifdataflow-yes").show();
    } else {
      $(".ifdataflow-yes").hide();
    }
  }

  public checkboxchecking() {
    $(".dataflowno").on("change", function () {
      $(".ifdataflow-yes").hide();
    });

    $("input.dataflowYes").on("change", function () {
      $("input.dataflowno").prop("checked", false);
    });

    $("input.dataflowno").on("change", function () {
      $("input.dataflowYes").prop("checked", false);
    });
    // $("input.YesHaveyoueverapplied").on("change", function () {
    //   $("input.noHaveyoueverapplied").prop("checked", false);

    //   $(`.Company-name-position`).show();
    // });

    // $("input.noHaveyoueverapplied").on("change", function () {
    //   $("input.YesHaveyoueverapplied").prop("checked", false);

    //   $(`.Company-name-position`).hide();
    // });

    $("#Doh-license").on("change", function () {
      $("#Moh-license").prop("checked", false);
      $("#Dha-license").prop("checked", false);
    });
    $("#Moh-license").on("change", function () {
      $("#Doh-license").prop("checked", false);
      $("#Dha-license").prop("checked", false);
    });
    $("#Dha-license").on("change", function () {
      $("#Doh-license").prop("checked", false);
      $("#Moh-license").prop("checked", false);
    });
  }

  public async GETcurrentuserlistdata(ONBSessionID, FormMode) {

    await newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "ID",
        "FullName",
        "PlaceofBirth",
        "DateofBirth",
        "CurrentNationality",
        "PreviousNationality",
        "Religion",
        "Section",
        "Entered",
        "MiddleName",
        "Port",
        "ContactNumber",
        "SponsorName",
        "DocumentNo",
        "PlaceofIssue ",
        "DateofIssue ",
        "DateofExpiry",
        "ResidenceNo",
        "Academic ",
        "Qualification",
        "DateofQualification ",
        "Country",
        "Languages",
        "MaritalStatus",
        "BloodGroup",
        "NameofSpouse",
        "Nationality21",
        "PlaceofBirth2",
        "DateofBirth2",
        "PlaceofWork",
        "FathersName",
        "Nationality4",
        "PlaceofBirth3",
        "DateofBirth3",
        "HomeAddress3",
        "Occupation2",
        "Occupation3",
        "MothersName",
        "Nationality4",
        "PlaceofBirth4",
        "DateofBirth4",
        "HomeAddress4",
        "Occupation4",
        "CountryNumber",
        "EmailID",
        "jobappliedfor",
        "NameofCompany",
        "Position",
        "WorkLocation",
        "Emirate",
        "Street",
        "Owner",
        "FlatNo",
        "Plot",
        "PostBox",
        "TelephoneNo",
        "MobileNo",
        "LicenseNo",
        "IssueDate",
        "ExpiryDate",
        "NewRegistration",
        "UserName",
        "Password",
        "DrivingLicenseNo",
        "PlateNo",
        "dataflowNO",
        "Friend",
        "AnyOtherCloseRelative",
        "NoRelative",
        "Cousin",
        "Sister",
        "Borther",
        "LastName",
        "FirstName",
        "SurName",
        "Category",
        "HaveyoueverApplied",
        "LicenseType",
        "Author",
        "Gender",
        "Nationality3",
        "RelativeName",
        "Author/Id",
        "countrycodemobileno",
        "Countrycodesecondsection",
        "Countrycodefirstsection",
        "Spouse",
        "Provethesame",
        "ONBSessionID",
        "ControlNumber",
        "VersionNumber",
        "NewUserBloodGroup",
        "EmployeeStatus"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#provide-the-same").val(result[0].Provethesame);
          $(".Action-columnviewmode").hide();
          personallistid = result[0].ID;
          this.Gettabledata(result[0].ID, ONBSessionID);

          $(".personalwithoutedit").hide();
          $(".prsonalwithedit").show();
          $("#dynamicFullName").val(result[0].FullName);
          $("#dynamicFullName").prop("disabled", true);
          $(".filedisablemode").prop("disabled", true);

          $(".firstnamecurrent").hide();
          $(".firstnamedynamic").show();
          $(".empfirstname").val(result[0].FirstName);
          $(".empfirstname").prop("disabled", true);
          //   "LastName",
          //   "FirstName",

          $(".Lastnamenamecurrent").hide();
          $(".Lastnamenamedynamic").show();
          $(".personalLastname").val(result[0].LastName);
          //   "LastName",
          //   "FirstName",
          $(".personalLastname").prop("disabled", true);

          $(".empnamepersonal1").hide();
          $(".empnamepersonal11").show();
          $("#Employeename1").val(result[0].FullName);
          //   "LastName",
          //   "FirstName",

          $("#Employeename1").prop("disabled", true);
          $("#Cousin").prop("disabled", true);
          $("#childlist-tr").hide();
          $("#Universityqualification-tr").hide();
          $("#employmenthistory-tr").hide();
          $("#Research-tr").hide();
          $("#empreference-tr").hide();
          $("#friend-relative-tr").hide();
          $("#emergency-tr").hide();
          $("#outside-tr").hide();
          $("#Cousin").prop("disabled", true);

          $(".Add-new-personal").hide();
          $("#RelativeName").val(result[0].RelativeName),
            $(".personalviewclasscommom").prop("disabled", true);
          $(".personalview").prop("disabled", true);

          $(".empfirstname").val(result[0].FirstName);
          $(".personalLastname").val(result[0].LastName);
          $("#surenmaepersonalnda2").val(result[0].SurName);

          // $("#PassportNojoining").val(result[0].DocumentNo);
          // $("#surenmaepersonalnda1").val(result[0].SurName);
          // $("#surenmaepersonalnda").val(result[0].SurName);

          if (result[0].LicenseType == "DOH") {
            $("#Doh-license").prop("checked", true);
            $(".dohpasskey-kindaly-provide").show();
          } else if (result[0].LicenseType == "MOH") {
            $(".moh-dha-Attachment-hide-show").show();
            $("#Moh-license").prop("checked", true);
          } else if (result[0].LicenseType == "DHA") {
            $("#Dha-license").prop("checked", true);
            $(".moh-dha-Attachment-hide-show").show();
          }
          ///date is binding form this form to other
          // $(".signnational").val(result[0].CurrentNationality);
          // $(".ndanational").val(result[0].CurrentNationality);
          // $("#phypolicyempationality").val(result[0].CurrentNationality);
          // $("#IdentityCardNo").val(result[0].DocumentNo);

          // $(".signpasspoartno").val(result[0].DocumentNo);
          // $(".signemailid").val(result[0].EmailID);

          // $("#Bankunifromset").val(result[0].Gender)

          // $(".ndapassportno").val(result[0].DocumentNo);

          //  $(".personaltitleitemid").attr("style", "color:#00A36C");

          $(".Updatebycurrentuser").hide();
          $(".personalinformationimg").show();
          $(".personal-submit").hide();

          $("#MaritalStatus").val(result[0].MaritalStatus);

          var value1 = result[0].ContactNumber;
          var contactall = value1.split("-");

          // $("#EmployeeNouniform").val(result[0].ContactNumber)

          // $("#EmployNumber-ack-covid").val(result[0].ContactNumber);

          ///other phone
          //   $("#covide-country-codes").val(result[0].Countrycodefirstsection);

          //   $("#Employeenumber-ack-covid").val(result[0].ContactNumber);
          //   $("#Employcontact-ack-covid").val(result[0].ContactNumber);

          //   $(".signcountry-codes").val(result[0].Countrycodefirstsection);
          //   $(".signmobileno").val(result[0].ContactNumber);
          //   $("#covide-country-codes").val(result[0].Countrycodefirstsection);
          //   $("#Employcontact-ack-covid").val(result[0].ContactNumber);
          //


          setTimeout(() => {

            $("#personal-blood-group").val(result[0].NewUserBloodGroup);

          }, 2000);

          setTimeout(() => {
            $(`.contactnumbers`).val(result[0].ContactNumber);
            $("#country-code").val(result[0].Countrycodefirstsection);
          }, 2500);

          var value3 = result[0].CountryNumber;
          var contactall2 = value3.split("-");

          setTimeout(() => {
            $(`.CountrysNumbers`).val(result[0].CountryNumber);
            $("#country-codehomecountry").val(
              result[0].Countrycodesecondsection
            );
          }, 2500);

          // var value4 = result[0].MobileNo;
          // //var mob1 = value4.split("-");

          if (result[0].MobileNo == 'null' || result[0].MobileNo == null || result[0].MobileNo == "" || result[0].MobileNo == undefined) {
            $(`.MobileNos`).val("-");
          } else {
            $(`.MobileNos`).val(result[0].MobileNo);
          }
          if (result[0].TelephoneNo == 'null' || result[0].TelephoneNo == null || result[0].TelephoneNo == "" || result[0].TelephoneNo == undefined) {
            $(`.telephonenos`).val("-");
          } else {
            $(`.telephonenos`).val(result[0].TelephoneNo);
          }
          setTimeout(() => {
            // $(`.MobileNos`).val(value4);
            $(`#country-codeMobileNo`).val(result[0].countrycodemobileno);
          }, 2500);
          var newreg = result[0].NewRegistration;
          if (newreg == "Yes") {
            $("#NewRegistration").prop("checked", true);
          } else {
            $("#NewRegistration").prop("checked", false);
          }

          if (result[0].HaveyoueverApplied == "Yes") {
            $(".YesHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).show();
          } else {
            $(".noHaveyoueverapplied").prop("checked", true);
            $(`.Company-name-position`).hide();
          }

          if (result[0].Spouse == "Yes") {
            $("#spouse").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#spouse").prop("checked", false);
          }

          if (result[0].Sister == "Yes") {
            $("#Sister").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#Sister").prop("checked", false);
          }

          if (result[0].Borther == "Yes") {
            $("#Brother").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#Brother").prop("checked", false);
          }

          if (result[0].Friend == "Yes") {
            $("#Friend").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#Friend").prop("checked", false);
          }
          if (result[0].Cousin == "Yes") {
            $("#Cousin").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#Cousin").prop("checked", false);
          }

          if (result[0].AnyOtherCloseRelative == "Yes") {
            $("#AnyOtherCloseRelative").prop("checked", true);
            $("#if-no-relative-hide").show();
          } else {
            $("#AnyOtherCloseRelative").prop("checked", false);
          }
          if (result[0].NoRelative == "Yes") {
            $("#NoRelative").prop("checked", true);
            $("#if-no-relative-hide").hide();
          } else {
            $("#NoRelative").prop("checked", false);
          }

          if (result[0].dataflowNO == "Yes") {
            $(".dataflowYes").prop("checked", true);
            $(".ifdataflow-yes").show();
          } else {
            $(".dataflowno").prop("checked", true);
          }
          $("#PersonalMiddleName").val(result[0].MiddleName);
          $("#EmployeeCategory").val(result[0].Category);
          // $(".personaltitleitemid").attr("style", "color:#00A36C");
          $(`.personalvalue`).val(result[0].FullName),
            $(`.pob`).val(result[0].PlaceofBirth);
          $(`.dob`).val(moment(result[0].DateofBirth).format("YYYY-MM-DD"));
          $("#CurrentNationality").val(result[0].CurrentNationality);
          $("#PreviousNationality").val(result[0].PreviousNationality);

          $(`.sections`).val(result[0].Section);
          $(`.entereds`).val(moment(result[0].Entered).format("YYYY-MM-DD"));
          $(`.ports`).val(result[0].Port);
          $("#PersonalGender").val(result[0].Gender);
          $(`.religions`).val(result[0].Religion);
          $(`.SponsorNames`).val(result[0].SponsorName);
          $(`.documentnos`).val(result[0].DocumentNo);
          $(`.pos`).val(result[0].PlaceofIssue);
          $(`#DateofIssue`).val(
            moment(result[0].DateofIssue).format("YYYY-MM-DD")
          ),
            $(`#DateofExpiry`).val(
              moment(result[0].DateofExpiry).format("YYYY-MM-DD")
            ),
            $(`.residenceNos`).val(result[0].ResidenceNo),
            // $(`.academics`).val(result[0].Academic),
            // $(`.Qualifications`).val(result[0].Qualification),
            // $(`.doq`).val(result[0].DateofQualification),
            // $(`.countrys`).val(result[0].Country),
            // $(`.Languagess`).val(result[0].Languages),
            // MaritalStatus:malefemle,
            // //(result[0].BloodGroup)
            $('#surenmaepersonal [value="' + result[0].SurName + '"]').attr(
              "selected",
              "true"
            );
          //$("#surenmaepersonal").val(result[0].SurName);
          setTimeout(() => {
            $(`.bloodgroups`).val(result[0].BloodGroup);
          }, 3000);

          $(`.nos`).val(result[0].NameofSpouse);
          $(`.Nationalitys2`).val(result[0].Nationality21);
          $(`.pob2`).val(result[0].PlaceofBirth2);
          $(`.dob2`).val(moment(result[0].DateofBirth2).format("YYYY-MM-DD")),
            $(`.pow`).val(result[0].PlaceofWork),
            $(`.Occupations2`).val(result[0].Occupation2),
            $(`.FathersNames`).val(result[0].FathersName),
            $(`.Nationalitys3`).val(result[0].Nationality3),
            $(`.pobs3`).val(result[0].PlaceofBirth3),
            $(`.dobs3`).val(
              moment(result[0].DateofBirth3).format("YYYY-MM-DD")
            );

          $(`.homeaddress3`).val(result[0].HomeAddress3),
            $(`.Occupations3`).val(result[0].Occupation3),
            $(`.MothersNames`).val(result[0].MothersName),
            $(`.Nationalitys4`).val(result[0].Nationality4),
            $(`.pobs4`).val(result[0].PlaceofBirth4),
            $(`.dobs4`).val(
              moment(result[0].DateofBirth4).format("YYYY-MM-DD")
            );
          $(`.HomeAddresss4`).val(result[0].HomeAddress4),
            $(`.Occupations4`).val(result[0].Occupation4),
            // $(`.CountrysNumbers`).val(result[0].CountryNumber),
            $(`.emailsids`).val(result[0].EmailID),

            $(`.NameofCompanys`).val(result[0].NameofCompany),
            $(`.positions`).val(result[0].Position),
            $(`.WorkLocations`).val(result[0].WorkLocation),
            $(`.Emirates`).val(result[0].Emirate),
            $(`.Streets`).val(result[0].Street),
            $(`.Owners`).val(result[0].Owner),
            $(`.FlatNos`).val(result[0].FlatNo),
            $(`.plots`).val(result[0].Plot),
            $(`.PostBoxs`).val(result[0].PostBox),

            $(`.LicenseNos`).val(result[0].LicenseNo),
            $(`.IssueDates`).val(
              moment(result[0].IssueDate).format("YYYY-MM-DD")
            );

          $(`.ExpiryDates`).val(
            moment(result[0].ExpiryDate).format("YYYY-MM-DD")
          );

          $(`.usersnames`).val(result[0].UserName);
          $("#Password").val(result[0].Password);
          $(`.drivinglicenselos`).val(result[0].DrivingLicenseNo);
          $(`.PlateNoss`).val(result[0].PlateNo);
        }
        //$(`.telephonenos`).val(result[0].TelephoneNo),
        //Disable loader

        $("#emp-work-status").val(result[0].EmployeeStatus)

        if (result[0].EmployeeStatus == "Fresher") {
          $(".professional-qual,.Employment_history,.emp-reference-det").hide()
        } else if (result[0].EmployeeStatus == "Experienced") {
          $(".professional-qual,.Employment_history,.emp-reference-det").show()
        }

      });
  }

  public async Gettabledata(id, ONBSessionID) {
    newweb.lists
      .getByTitle("Children Table Transaction")
      .items.select(
        "ID",
        "Requested",
        "PersonalItemid",
        "Gender",
        "DOB",
        "PassportNo",
        "EmiratesNo",
        "OrderNo",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")


          for (var i = 0; i < result.length; i++) {
            if (result[i].Requested != "-" || result[i].EmiratesNo != "-") {


              var newrow = $("<tr>");
              var cols = "";

              cols +=
                '<td><input type="hidden" id="hdn-personaltab-itm-id" value="' +
                result[i].ID +
                '"></input><input type="text" id="tble-txt-requested" class="form-control personalview" autoComplete="off"value="' +
                result[i].Requested +
                '" disabled></input></td>';
              cols +=
                '<td><input type="text" id="tble-ChildGender" class="form-control personalview" autoComplete="off"value="' +
                result[i].Gender +
                '" disabled></input></td>';
              cols +=
                '<td><input type="date" max="' +
                moment().format("YYYY-MM-DD") +
                '" id="tble-child-dob" class="personalview" autoComplete="off"value="' +
                result[i].DOB +
                '" disabled></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-passport-no" class="form-control personalview" autoComplete="off"value="' +
                result[i].PassportNo +
                '" disabled></input></td>';
              cols +=
                '<td><input type="text" id="tble-txt-child-emirate-no"  class="form-control personalview" autoComplete="off"value="' +
                result[i].EmiratesNo +
                '" disabled></input></td>';
              newrow.append(cols);
              $("table #tble-tbody-dynamic").append(newrow);
              // $(".tble-ChildGender-" + i + "").val(result[i].Gender);
            }
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("Personal Emergency Contact Person InUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><input type="hidden" id="hdn-personalcontactperson-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name2" class"personalview" autoComplete="off"value="' +
              result[i].Name2 +
              '" disabled></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-worklocation2" class"personalview" autoComplete="off"value="' +
              result[i].WorkLocation2 +
              '" disabled></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-contactnumber2" class"personalview" autoComplete="off"value="' +
              result[i].ContactNumber2 +
              '" disabled></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicEmergencyContact").append(newrow);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Emergency Contact Person OutsideUAE Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            EmergencyContactPersonOutsideUAE = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personalcontperson-out-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text" id="tble-txt-name3" class"personalview" autoComplete="off"value="' +
              result[i].Name3 +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-relation3" class"personalview" autoComplete="off"value="' +
              result[i].Relation3 +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-contactnumber3" class"personalview" autoComplete="off"value="' +
              result[i].ContactNumber3 +
              '" disabled></input></td>';

            newrows.append(colss);
            $(
              "table #tble-tbody-dynamicemergencycontactpepersonoutside"
            ).append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Professional Qualification")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Qualification",
        "YearofGraducation",
        "University",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            qualificationcounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-qualif-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-Name-qualification" class"personalview" autoComplete="off"value="' +
              result[i].Qualification +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-University"  class"personalview" autoComplete="off"value="' +
              result[i].University +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt" class"personalview" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '" disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "Organizationdesc",
        "To",
        "Experience",
        "Reason",
        "From",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"  id="tble-txt-OrganizationName" class"personalview" autoComplete="off"value="' +
              result[i].OrganizationName +
              '" disabled></input></td>';

            colss +=
              '<td><input type="text"  id="tble-txt-OrganizationDesignation" class"personalview" autoComplete="off"value="' +
              result[i].Organizationdesc +
              '" disabled></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" class"personalview" autoComplete="off"value="' +
              result[i].From +
              '" max="' +
              moment().format("YYYY-MM") +
              '" disabled></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" class"personalview" autoComplete="off"value="' +
              result[i].To +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-tble-txt-Years_of_Experience" class"personalview" autoComplete="off"value="' +
              result[i].Experience +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-Reason_for_leaving" class"personalview" autoComplete="off"value="' +
              result[i].Reason +
              '" disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3_Employment_History").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Research Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year",
        "ONBSessionID"
      )

      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            ResearchPublicationDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" class"personalview" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personaltab-reserch-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-name-Research" class"personalview" autoComplete="off"value="' +
              result[i].ResearchName +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research" class"personalview"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-year-Research" class"personalview" autoComplete="off"value="' +
              result[i].year +
              '" maxlength="4" disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamicResearch").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("personal Reference Details")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Email",
        "Contact",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmployeeReferenceDetailscounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";
            // colss +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" class"personalview" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            colss +=
              '<td><input type="hidden" id="hdn-personal-ref-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="tble-txt-Name-ResearchDetails" class"personalview" autoComplete="off"value="' +
              result[i].Name +
              '" disabled></input></td>';

            colss +=
              '<td><input type="text"  id="tble-txt-Email-ResearchDetails" class"personalview"  autoComplete="off"value="' +
              result[i].Email +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-contactno-ResearchDetails" class"personalview"  autoComplete="off"value="' +
              result[i].Contact +
              '" disabled></input></td>';
            newrows.append(colss);
            $("table #tble-tbody-dynamicemployreference").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Relative friend Transaction")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name",
        "Worklocation",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .orderBy("OrderNo", true)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            var newrows = $("<tr>");
            var colss = "";
            colss +=
              '<td><input type="hidden" id="hdn-personal-relativefriend-itm-id" value="' +
              result[i].ID +
              '"></input><input type="text"   id="relative-friend-name" class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Name +
              '" disabled></input></td>';
            colss +=
              '<td><input type="text" id="relative-friend-worklocation"  class"personalview table-border-only" autoComplete="off"value="' +
              result[i].Worklocation +
              '" disabled></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-relative-friend").append(newrows);
          }
        }
      });

    setTimeout(() => {
      //  $(".personalview").attr("disabled", "disabled");
      $(".personalview").prop("disabled", true);
    }, 2000);
  }

  public AddedAttachments(e, domid, from) {
    if (from == "resume") {
      let resumefile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (resumefile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Resume") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Resume");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "photo") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Photo") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Photo");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "passportcopyfrontpage") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("passportcopyfrontpage") == -1) {
          AttachmentUploaderStatusArrayValidator.push("passportcopyfrontpage");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "passportbackpage") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("passportbackpage") == -1) {
          AttachmentUploaderStatusArrayValidator.push("passportbackpage");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Previousvisa") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Previousvisa") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Previousvisa");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "previousemiratesid") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("previousemiratesid") == -1) {
          AttachmentUploaderStatusArrayValidator.push("previousemiratesid");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Insurancecontinuityletter") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Insurance_continuity_letter") == -1) {
          AttachmentUploaderStatusArrayValidator.push(
            "Insurance_continuity_letter"
          );
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Sponsorspassportvisa") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Sponsorspassportvisa") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Sponsorspassportvisa");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "PGdegree") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("PGdegree") == -1) {
          AttachmentUploaderStatusArrayValidator.push("PGdegree");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "HBachelorUGdegree") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("HBachelorUGdegree") == -1) {
          AttachmentUploaderStatusArrayValidator.push("HBachelorUGdegree");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Highersecondary") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Highersecondary") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Highersecondary");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Highschool") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("Highschool") == -1) {
          AttachmentUploaderStatusArrayValidator.push("Highschool");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "allexperience") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        if (AttachmentUploaderStatusArrayValidator.indexOf("allexperience") == -1) {
          AttachmentUploaderStatusArrayValidator.push("allexperience");
        }
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "mohdhalience") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("mohdhalience");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "nationalid") {
      let profilepicfile = (
        document.querySelector("#" + domid + "") as HTMLInputElement
      ).files.length;
      if (profilepicfile != 0) {

        if (AttachmentUploaderStatusArrayValidator.indexOf("nationalid") == -1) {
          AttachmentUploaderStatusArrayValidator.push("nationalid");
        }

      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    }
  }

  public async Attach1() {
    var names = Currentdisplaynames;
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //for 1Updated_Resume

    var fileArr = [];
    var FileNameGenerated: string;
    var CurrentTime;
    let myfile = (document.querySelector("#Updated_Resume") as HTMLInputElement)
      .files.length;
    ////("my file"+myfile);
    //file is available
    if (myfile != 0) {
      for (var j = 0; j < myfile; j++) {
        let fileVal = (
          document.querySelector("#Updated_Resume") as HTMLInputElement
        ).files[j];
        fileArr.push(fileVal);

        //(fileArr.push(fileVal));
      }
      for (var i = 0; i < fileArr.length; i++) {
        CurrentTime = moment().format("DMYYYYHMS"); //1110202191045
        var NameofTable = "Updated-Resume";
        var tempfilename = fileArr[i].name.split(".");
        var fname = tempfilename[0].split(" ").join("");
        FileNameGenerated = fname + "-" + NameofTable + "." + tempfilename[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated, fileArr[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Updated Resume",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Resume") == -1) {
                    AttachmentUploaderStatusArray.push("Resume");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    // }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach2() {
    var names = Currentdisplaynames;
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //2High-QualityPhoto
    var fileArr1 = [];
    var FileNameGenerated1: string;

    let myfile1 = (
      document.querySelector("#High-QualityPhoto") as HTMLInputElement
    ).files.length;

    if (myfile1 != 0) {
      for (var j = 0; j < myfile1; j++) {
        let fileVal1 = (
          document.querySelector("#High-QualityPhoto") as HTMLInputElement
        ).files[j];
        fileArr1.push(fileVal1);

        //(fileArr1.push(fileVal1));
      }
      for (var i = 0; i < fileArr1.length; i++) {
        var NameofTable1 = "High-QualityPhoto";
        var tempfilename1 = fileArr1[i].name.split(".");
        var fname = tempfilename1[0].split(" ").join("");
        FileNameGenerated1 = fname + "-" + NameofTable1 + "." + tempfilename1[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated1, fileArr1[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High Quality Photo",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Photo") == -1) {
                    AttachmentUploaderStatusArray.push("Photo");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (
                        AttachmentUploaderStatusArrayValidator.length ==
                        this.state.AttachmentUploaderStatusArray.length
                      ) {
                        // setTimeout(() => {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        })
                          .then(() => {
                            window.open(
                              "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                              "_self"
                            );
                          })
                          .then(() => {
                            location.reload();
                          });
                        //  }, 15000);
                      }
                    }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach3() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //passportcopy-frontpage
    var fileArr2 = [];
    var FileNameGenerated2: string;

    let myfile2 = (
      document.querySelector("#passportcopy-frontpage") as HTMLInputElement
    ).files.length;

    if (myfile2 != 0) {
      for (var j = 0; j < myfile2; j++) {
        let fileVal2 = (
          document.querySelector("#passportcopy-frontpage") as HTMLInputElement
        ).files[j];
        fileArr2.push(fileVal2);

        //(fileArr2.push(fileVal2));
      }
      for (var i = 0; i < fileArr2.length; i++) {
        var NameofTable2 = "passportcopy-frontpage";
        var tempfilename2 = fileArr2[i].name.split(".");
        var fname = tempfilename2[0].split(" ").join("");
        FileNameGenerated2 = fname + "-" + NameofTable2 + "." + tempfilename2[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated2, fileArr2[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Frontpart",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("passportcopyfrontpage") == -1) {
                    AttachmentUploaderStatusArray.push("passportcopyfrontpage");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //      setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach4() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    // passportcopy-backpage
    var fileArrpassport = [];
    var FileNameGeneratedpassport: string;

    let myfilepassport = (
      document.querySelector("#passportbackpage") as HTMLInputElement
    ).files.length;

    if (myfilepassport != 0) {
      for (var j = 0; j < myfilepassport; j++) {
        let fileValpassport = (
          document.querySelector("#passportbackpage") as HTMLInputElement
        ).files[j];
        fileArrpassport.push(fileValpassport);
      }
      for (var i = 0; i < fileArrpassport.length; i++) {
        var NameofTablepassport = "passport-backpage";
        var tempfilenamepassport = fileArrpassport[i].name.split(".");
        var fname = tempfilenamepassport[0].split(" ").join("");
        FileNameGeneratedpassport = fname + "-" + NameofTablepassport + "." + tempfilenamepassport[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGeneratedpassport, fileArrpassport[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Passport Backpart",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("passportbackpage") == -1) {
                    AttachmentUploaderStatusArray.push("passportbackpage");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach5() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Previousvisa
    var fileArr4 = [];
    var FileNameGenerated4: string;

    let myfile4 = (document.querySelector("#Previousvisa") as HTMLInputElement)
      .files.length;

    if (myfile4 != 0) {
      for (var j = 0; j < myfile4; j++) {
        let fileVal4 = (
          document.querySelector("#Previousvisa") as HTMLInputElement
        ).files[j];
        fileArr4.push(fileVal4);
      }
      for (var i = 0; i < fileArr4.length; i++) {
        var NameofTable4 = "Previousvisa";
        var tempfilename4 = fileArr4[i].name.split(".");
        var fname = tempfilename4[0].split(" ").join("");
        FileNameGenerated4 = fname + "-" + NameofTable4 + "." + tempfilename4[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated4, fileArr4[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous Visa",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Previousvisa") == -1) {
                    AttachmentUploaderStatusArray.push("Previousvisa");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //    setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach6() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //previous-emiratesid
    var fileArr5 = [];
    var FileNameGenerated5: string;

    let myfile5 = (
      document.querySelector("#previous-emiratesid") as HTMLInputElement
    ).files.length;

    if (myfile5 != 0) {
      for (var j = 0; j < myfile5; j++) {
        let fileVal5 = (
          document.querySelector("#previous-emiratesid") as HTMLInputElement
        ).files[j];
        fileArr5.push(fileVal5);

        //(fileArr5.push(fileVal5));
      }
      for (var i = 0; i < fileArr5.length; i++) {
        var NameofTable5 = "previous-emiratesid";
        var tempfilename5 = fileArr5[i].name.split(".");
        var fname = tempfilename5[0].split(" ").join("");
        FileNameGenerated5 = fname + "-" + NameofTable5 + "." + tempfilename5[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated5, fileArr5[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Perivous EmiratesId",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("previousemiratesid") == -1) {
                    AttachmentUploaderStatusArray.push("previousemiratesid");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach7() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Insurance_continuity_letter
    var fileArr6 = [];
    var FileNameGenerated6: string;

    let myfile6 = (
      document.querySelector("#Insurance_continuity_letter") as HTMLInputElement
    ).files.length;

    if (myfile6 != 0) {
      for (var j = 0; j < myfile6; j++) {
        let fileVal6 = (
          document.querySelector(
            "#Insurance_continuity_letter"
          ) as HTMLInputElement
        ).files[j];
        fileArr6.push(fileVal6);

        //(fileArr6.push(fileVal6));
      }
      for (var i = 0; i < fileArr6.length; i++) {
        var NameofTable6 = "Insurance-continuity-letter";
        var tempfilename6 = fileArr6[i].name.split(".");
        var fname = tempfilename6[0].split(" ").join("");
        FileNameGenerated6 = fname + "-" + NameofTable6 + "." + tempfilename6[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated6, fileArr6[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Insurance continuity letter",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Insurance_continuity_letter") == -1) {
                    AttachmentUploaderStatusArray.push(
                      "Insurance_continuity_letter"
                    );
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach8() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Sponsors_passportvisa
    var fileArr7 = [];
    var FileNameGenerated7: string;

    let myfile7 = (
      document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
    ).files.length;

    if (myfile7 != 0) {
      for (var j = 0; j < myfile7; j++) {
        let fileVal7 = (
          document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
        ).files[j];
        fileArr7.push(fileVal7);

        //(fileArr7.push(fileVal7));
      }
      for (var i = 0; i < fileArr7.length; i++) {
        var NameofTable7 = "Sponsors-passportvisa";
        var tempfilename7 = fileArr7[i].name.split(".");
        var fname = tempfilename7[0].split(" ").join("");
        FileNameGenerated7 = fname + "-" + NameofTable7 + "." + tempfilename7[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated7, fileArr7[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Sponsors-passport visa",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Sponsorspassportvisa") == -1) {
                    AttachmentUploaderStatusArray.push("Sponsorspassportvisa");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach81() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Academic details Attachments Required
    //PG-degree
    var fileArr9 = [];
    var FileNameGenerated9: string;

    let myfile9 = (document.querySelector("#PG-degree") as HTMLInputElement)
      .files.length;

    if (myfile9 != 0) {
      for (var j = 0; j < myfile9; j++) {
        let fileVal9 = (
          document.querySelector("#PG-degree") as HTMLInputElement
        ).files[j];
        fileArr9.push(fileVal9);

        //(fileArr9.push(fileVal9));
      }
      for (var i = 0; i < fileArr9.length; i++) {
        var NameofTable9 = "PG-degree";
        var tempfilename9 = fileArr9[i].name.split(".");
        var fname = tempfilename9[0].split(" ").join("");
        FileNameGenerated9 = fname + "-" + NameofTable9 + "." + tempfilename9[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated9, fileArr9[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PG Degree",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("PGdegree") == -1) {
                    AttachmentUploaderStatusArray.push("PGdegree");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach9() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //HBachelor-UG-degree
    var fileArr10 = [];
    var FileNameGenerated10: string;

    let myfile10 = (
      document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
    ).files.length;

    if (myfile10 != 0) {
      for (var j = 0; j < myfile10; j++) {
        let fileVal10 = (
          document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
        ).files[j];
        fileArr10.push(fileVal10);

        //(fileArr10.push(fileVal10));
      }
      for (var i = 0; i < fileArr10.length; i++) {
        var NameofTable10 = "HBachelor-UG-degree";
        var tempfilename10 = fileArr10[i].name.split(".");
        var fname = tempfilename10[0].split(" ").join("");
        FileNameGenerated10 = fname + "-" + NameofTable10 + "." + tempfilename10[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated10, fileArr10[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "UG Degree",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("HBachelorUGdegree") == -1) {
                    AttachmentUploaderStatusArray.push("HBachelorUGdegree");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //   setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach11() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArr11 = [];
    var FileNameGenerated11: string;

    let myfile11 = (
      document.querySelector("#Highersecondary") as HTMLInputElement
    ).files.length;

    if (myfile11 != 0) {
      for (var j = 0; j < myfile11; j++) {
        let fileVal11 = (
          document.querySelector("#Highersecondary") as HTMLInputElement
        ).files[j];
        fileArr11.push(fileVal11);

        //(fileArr11.push(fileVal11));
      }

      for (var i = 0; i < fileArr11.length; i++) {
        var NameofTable11 = "Highersecondary";
        var tempfilename11 = fileArr11[i].name.split(".");
        var fname = tempfilename11[0].split(" ").join("");
        FileNameGenerated11 = fname + "-" + NameofTable11 + "." + tempfilename11[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated11, fileArr11[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Higher Secondary",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Highersecondary") == -1) {
                    AttachmentUploaderStatusArray.push("Highersecondary");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    // }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach12() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highschool
    var fileArr12 = [];
    var FileNameGenerated12: string;

    let myfile12 = (document.querySelector("#Highschool") as HTMLInputElement)
      .files.length;

    if (myfile12 != 0) {
      for (var j = 0; j < myfile12; j++) {
        let fileVal12 = (
          document.querySelector("#Highschool") as HTMLInputElement
        ).files[j];
        fileArr12.push(fileVal12);

        //(fileArr12.push(fileVal12));
      }
      for (var i = 0; i < fileArr12.length; i++) {
        var NameofTable12 = "Highschool";
        var tempfilename12 = fileArr12[i].name.split(".");
        var fname = tempfilename12[0].split(" ").join("");
        FileNameGenerated12 = fname + "-" + NameofTable12 + "." + tempfilename12[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated12, fileArr12[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "High School",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("Highschool") == -1) {
                    AttachmentUploaderStatusArray.push("Highschool");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }
  public async Attach13() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //allexperience
    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#allexperience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#allexperience") as HTMLInputElement
        ).files[j];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "All-experience-certificates";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "All experience certificate",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("allexperience") == -1) {
                    AttachmentUploaderStatusArray.push("allexperience");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //  }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  // moh_dha_lience
  public async LicenceAttachment() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#moh_dha_lience") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#moh_dha_lience") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "MOHDHALICENCE";
        var tempfilename13 = fileArr13[i].name.split(".");
        FileNameGenerated13 =
          tempfilename13[0] +
          "-" +
          NameofTable13 +
          "." +
          tempfilename13[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Licence DHA OR MOH",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("mohdhalience");
                  this.setState({
                    AttachmentUploaderStatusArray:
                      AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (
                        AttachmentUploaderStatusArrayValidator.length ==
                        this.state.AttachmentUploaderStatusArray.length
                      ) {
                        // setTimeout(() => {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        })
                          .then(() => {
                            window.open(
                              "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                              "_self"
                            );
                          })
                          .then(() => {
                            location.reload();
                          });
                        //  }, 15000);
                      }
                    }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Attach14() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#nationalid") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (document.querySelector("#nationalid") as HTMLInputElement).files[j];
        fileArr13.push(fileVal13);
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "nationalid";
        var tempfilename13 = fileArr13[i].name.split(".");
        var fname = tempfilename13[0].split(" ").join("");
        FileNameGenerated13 = fname + "-" + NameofTable13 + "." + tempfilename13[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "National ID Attachments",
                  ONBSessionID: this.state.ONBSessionID,
                })
                .then((myupdate) => {
                  if (AttachmentUploaderStatusArray.indexOf("nationalid") == -1) {
                    AttachmentUploaderStatusArray.push("nationalid");
                  }
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray,
                  });

                  if (GlobalFormOpenedMode == "New") {
                    //  setTimeout(() => {
                    if (
                      AttachmentUploaderStatusArrayValidator.length ==
                      this.state.AttachmentUploaderStatusArray.length
                    ) {
                      // setTimeout(() => {
                      swal({
                        title: "The form has been submitted successfully",
                        icon: "success",
                      })
                        .then(() => {
                          window.open(
                            "https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/HrOnBoardingForm.aspx?env=WebView&mdeopn=New",
                            "_self"
                          );
                        })
                        .then(() => {
                          location.reload();
                        });
                      //  }, 15000);
                    }
                    //   }, 1000);
                  }
                });
            });
          })
          .catch((error) => { });
      }
    }
  }

  public Attachmentchecking() {
    $("#moh_dha_lience").on("change", function (event) {
      $("#uploadedlicence-yes").show();
      $("#uploaded_licence-no").hide();
      $(".yeslicence").attr("style", "color:#00A36C");
    });

    $("#moh_dha_lience").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#moh_dha_lience") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "licenence-block" }),
        fileName = $("<span/>", {
          class: "licence_file",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="licencecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#upload_licencefile").append(fileBloc);
      $("#moh_dha_lience").hide();
      // };
    });
    $("#upload_licencefile").on("click", ".licencecross", function (event) {
      //("hi");
      $("#moh_dha_lience").show();
      $(".licenence-block").remove();
      $("#moh_dha_lience").val("");

      $("#uploadedlicence-yes").hide();
      $("#uploaded_licence-no").show();
    });



    const inputElement_Updated_Resume = document.getElementById("Updated_Resume");

    inputElement_Updated_Resume.addEventListener("change", handleFiles_Updated_Resume, false);
    const Files1 = new DataTransfer();

    function handleFiles_Updated_Resume() {

      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Updated_Resume_get_filesList").children().length
      var fileslength = Files1.files.length + $(".Updated_Resume_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#Updated_Resume-yes").show();
        $("#Updated_Resume-no").hide();
        $("#Updated_Resume").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Updated_Resumefile-block' }),
            fileName = $('<span/>', { class: 'Updated_Resumeaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="Updated_Resumecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#Updated_ResumefilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files1.items.add(file);
        }

        this.files = Files1.files;

        $("table #tble-tbody-Attachments").on("click", ".Updated_Resumecross", function (event) {
          let name = $(this).parent().next('span.Updated_Resumeaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files1.items.length; i++) {

            if (name === Files1.items[i].getAsFile().name) {
              Files1.items.remove(i);
              continue;
            }
          }

          if ($("#Updated_ResumefilesList").children().length == 0 && $(".Updated_Resume_get_filesList").children().length == 0) {
            $("#Updated_Resume-yes").hide();
            $("#Updated_Resume-no").show();
            $("#Updated_Resume").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Resume")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Updated_Resume') as HTMLInputElement).files = Files1.files
        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Updated_Resume").val("").removeAttr('style');
      }

    }

    const inputElement_QualityPhoto = document.getElementById("High-QualityPhoto");
    inputElement_QualityPhoto.addEventListener("change", handleFiles_QualityPhoto, false);
    const Files2 = new DataTransfer();

    function handleFiles_QualityPhoto() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".High-QualityPhoto_get_filesList").children().length
      var fileslength = Files2.files.length + $(".High-QualityPhoto_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#QualityPhoto-yes").show();
        $("#QualityPhoto-no").hide();
        $("#High-QualityPhoto").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'QualityPhotofile-block' }),
            fileName = $('<span/>', { class: 'QualityPhotoaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="QualityPhotocross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#High-QualityPhotofilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files2.items.add(file);
        }

        this.files = Files2.files;

        $("table #tble-tbody-Attachments").on("click", ".QualityPhotocross", function (event) {
          let name = $(this).parent().next('span.QualityPhotoaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files2.items.length; i++) {

            if (name === Files2.items[i].getAsFile().name) {
              Files2.items.remove(i);
              continue;
            }
          }

          if ($("#High-QualityPhotofilesList").children().length == 0 && $(".High-QualityPhoto_get_filesList").children().length == 0) {
            $("#QualityPhoto-yes").hide();
            $("#QualityPhoto-no").show();
            $("#High-QualityPhoto").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Photo")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('High-QualityPhoto') as HTMLInputElement).files = Files2.files

        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#High-QualityPhoto").val("").removeAttr('style');
      }

    }

    const inputElement_passportcopy = document.getElementById("passportcopy-frontpage");
    inputElement_passportcopy.addEventListener("change", handleFiles_passportcopy, false);
    const Files3 = new DataTransfer();
    function handleFiles_passportcopy() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".passportcopy-frontpage_get_filesList").children().length
      var fileslength = Files3.files.length + $(".passportcopy-frontpage_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#passportcopy-yes").show();
        $("#passportcopy-no").hide();
        $("#passportcopy-frontpage").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'passportcopyfile-block' }),
            fileName = $('<span/>', { class: 'passportcopyaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="passportcopycross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#passportcopy-frontpagefilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files3.items.add(file);
        }

        this.files = Files3.files;

        $("table #tble-tbody-Attachments").on("click", ".passportcopycross", function (event) {
          let name = $(this).parent().next('span.passportcopyaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files3.items.length; i++) {

            if (name === Files3.items[i].getAsFile().name) {
              Files3.items.remove(i);
              continue;
            }
          }

          if ($("#passportcopy-frontpagefilesList").children().length == 0 && $(".passportcopy-frontpage_get_filesList").children().length == 0) {
            $("#passportcopy-yes").hide();
            $("#passportcopy-no").show();
            $("#passportcopy-frontpage").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("passportcopyfrontpage")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('passportcopy-frontpage') as HTMLInputElement).files = Files3.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#passportcopy-frontpage").val("").removeAttr('style');
      }

    }

    const inputElement_passportbackpage = document.getElementById("passportbackpage");
    inputElement_passportbackpage.addEventListener("change", handleFiles_passportbackpage, false);
    const Files4 = new DataTransfer();

    function handleFiles_passportbackpage() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".passportbackpage_get_filesList").children().length
      var fileslength = Files4.files.length + $(".passportbackpage_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#passportbackpage-yes").show();
        $("#passportbackpage-no").hide();
        $("#passportbackpage").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'passportbackpagefile-block' }),
            fileName = $('<span/>', { class: 'passportbackpageaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="passportbackpagecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#passportbackpagefilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files4.items.add(file);
        }

        this.files = Files4.files;

        $("table #tble-tbody-Attachments").on("click", ".passportbackpagecross", function (event) {
          let name = $(this).parent().next('span.passportbackpageaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files4.items.length; i++) {

            if (name === Files4.items[i].getAsFile().name) {
              Files4.items.remove(i);
              continue;
            }
          }

          if ($("#passportbackpagefilesList").children().length == 0 && $(".passportbackpage_get_filesList").children().length == 0) {
            $("#passportbackpage-yes").hide();
            $("#passportbackpage-no").show();
            $("#passportbackpage").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("passportbackpage")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('passportbackpage') as HTMLInputElement).files = Files4.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#passportbackpage").val("").removeAttr('style');
      }
    }

    const inputElement_Previousvisa = document.getElementById("Previousvisa");
    inputElement_Previousvisa.addEventListener("change", handleFiles_Previousvisa, false);
    const Files5 = new DataTransfer();
    function handleFiles_Previousvisa() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Previousvisa_get_filesList").children().length
      var fileslength = Files5.files.length + $(".Previousvisa_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#Previousvisa-yes").show();
        $("#Previousvisa-no").hide();
        $("#Previousvisa").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Previousvisafile-block' }),
            fileName = $('<span/>', { class: 'Previousvisaaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="Previousvisacross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#PreviousvisafilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files5.items.add(file);
        }

        this.files = Files5.files;

        $("table #tble-tbody-Attachments").on("click", ".Previousvisacross", function (event) {
          let name = $(this).parent().next('span.Previousvisaaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files5.items.length; i++) {

            if (name === Files5.items[i].getAsFile().name) {
              Files5.items.remove(i);
              continue;
            }
          }

          if ($("#PreviousvisafilesList").children().length == 0 && $(".Previousvisa_get_filesList").children().length == 0) {
            $("#Previousvisa-yes").hide();
            $("#Previousvisa-no").show();
            $("#Previousvisa").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Previousvisa")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Previousvisa') as HTMLInputElement).files = Files5.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Previousvisa").val("").removeAttr('style');
      }
    }

    const inputElement_previous_emiratesid = document.getElementById("previous-emiratesid");
    inputElement_previous_emiratesid.addEventListener("change", handleFiles_previous_emiratesid, false);
    const Files6 = new DataTransfer();
    function handleFiles_previous_emiratesid() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".previous-emiratesid_get_filesList").children().length
      var fileslength = Files6.files.length + $(".previous-emiratesid_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#previous-emiratesid-yes").show();
        $("#previous-emiratesid-no").hide();
        $("#previous-emiratesid").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'previous-emiratesidfile-block' }),
            fileName = $('<span/>', { class: 'previous-emiratesidaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="previousemiratesidcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#previous-emiratesidfilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files6.items.add(file);
        }

        this.files = Files6.files;

        $("table #tble-tbody-Attachments").on("click", ".previousemiratesidcross", function (event) {
          let name = $(this).parent().next('span.previous-emiratesidaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files6.items.length; i++) {

            if (name === Files6.items[i].getAsFile().name) {
              Files6.items.remove(i);
              continue;
            }
          }

          if ($("#previous-emiratesidfilesList").children().length == 0 && $(".previous-emiratesid_get_filesList").children().length == 0) {
            $("#previous-emiratesid-yes").hide();
            $("#previous-emiratesid-no").show();
            $("#previous-emiratesid").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("previousemiratesid")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('previous-emiratesid') as HTMLInputElement).files = Files6.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#previous-emiratesid").val("").removeAttr('style');
      }

    }

    const inputElement_Insurance_continuity_letter = document.getElementById("Insurance_continuity_letter");
    inputElement_Insurance_continuity_letter.addEventListener("change", handleFiles_Insurance_continuity_letter, false);
    const Files7 = new DataTransfer();
    function handleFiles_Insurance_continuity_letter() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Insurance_continuity_letter_get_filesList").children().length
      var fileslength = Files7.files.length + $(".Insurance_continuity_letter_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#Insurance_continuity_letter-yes").show();
        $("#Insurance_continuity_letter-no").hide();
        $("#Insurance_continuity_letter").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Insurance_continuity_letterfile-block' }),
            fileName = $('<span/>', { class: 'Insurance_continuity_lettername', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="Insurancecontinuitylettercross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#Insurance_continuity_letterfilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files7.items.add(file);
        }

        this.files = Files7.files;

        $("table #tble-tbody-Attachments").on("click", ".Insurancecontinuitylettercross", function (event) {
          let name = $(this).parent().next('span.Insurance_continuity_lettername').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files7.items.length; i++) {

            if (name === Files7.items[i].getAsFile().name) {
              Files7.items.remove(i);
              continue;
            }
          }

          if ($("#Insurance_continuity_letterfilesList").children().length == 0 && $(".Insurance_continuity_letter_get_filesList").children().length == 0) {
            $("#Insurance_continuity_letter-yes").hide();
            $("#Insurance_continuity_letter-no").show();
            $("#Insurance_continuity_letter").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Insurance_continuity_letter")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Insurance_continuity_letter') as HTMLInputElement).files = Files7.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Insurance_continuity_letter").val("").removeAttr('style');
      }
    }

    const inputElement_Sponsors_passportvisa = document.getElementById("Sponsors_passportvisa");
    inputElement_Sponsors_passportvisa.addEventListener("change", handleFiles_Sponsors_passportvisa, false);
    const Files8 = new DataTransfer();
    function handleFiles_Sponsors_passportvisa() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Sponsors_passportvisa_get_filesList").children().length
      var fileslength = Files8.files.length + $(".Sponsors_passportvisa_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#Sponsors_passportvisa-yes").show();
        $("#Sponsors_passportvisa-no").hide();
        $("#Sponsors_passportvisa").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Sponsors_passportvisafile-block' }),
            fileName = $('<span/>', { class: 'Sponsors_passportvisaname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="Sponsorspassportvisacross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#Sponsors_passportvisafilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files8.items.add(file);
        }

        this.files = Files8.files;

        $("table #tble-tbody-Attachments").on("click", ".Sponsorspassportvisacross", function (event) {
          let name = $(this).parent().next('span.Sponsors_passportvisaname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files8.items.length; i++) {

            if (name === Files8.items[i].getAsFile().name) {
              Files8.items.remove(i);
              continue;
            }
          }

          if ($("#Sponsors_passportvisafilesList").children().length == 0 && $(".Sponsors_passportvisa_get_filesList").children().length == 0) {
            $("#Sponsors_passportvisa-yes").hide();
            $("#Sponsors_passportvisa-no").show();
            $("#Sponsors_passportvisa").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Sponsorspassportvisa")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Sponsors_passportvisa') as HTMLInputElement).files = Files8.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Sponsors_passportvisa").val("").removeAttr('style');
      }
    }

    const inputElement_PG_degree = document.getElementById("PG-degree");
    inputElement_PG_degree.addEventListener("change", handleFiles_PG_degree, false);
    const Files9 = new DataTransfer();
    function handleFiles_PG_degree() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".PG-degree_get_filesList").children().length
      var fileslength = Files9.files.length + $(".PG-degree_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#PG-degree-yes").show();
        $("#PG-degree-no").hide();
        $("#PG-degree").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'PG-degreefile-block' }),
            fileName = $('<span/>', { class: 'PG-degreename', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="PGdegreecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#PG-degreefilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files9.items.add(file);
        }

        this.files = Files9.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".PGdegreecross", function (event) {
          let name = $(this).parent().next('span.PG-degreename').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files9.items.length; i++) {

            if (name === Files9.items[i].getAsFile().name) {
              Files9.items.remove(i);
              continue;
            }
          }

          if ($("#PG-degreefilesList").children().length == 0 && $(".PG-degree_get_filesList").children().length == 0) {
            $("#PG-degree-yes").hide();
            $("#PG-degree-no").show();
            $("#PG-degree").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("PGdegree")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('PG-degree') as HTMLInputElement).files = Files9.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#PG-degree").val("").removeAttr('style');
      }
    }

    const inputElement_HBachelor_UG_degree = document.getElementById("HBachelor-UG-degree");
    inputElement_HBachelor_UG_degree.addEventListener("change", handleFiles_HBachelor_UG_degree, false);
    const Files10 = new DataTransfer();
    function handleFiles_HBachelor_UG_degree() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".UG-degree_get_filesList").children().length
      var fileslength = Files10.files.length + $(".UG-degree_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#HBachelor-UG-degree-yes").show();
        $("#HBachelor-UG-degree-no").hide();
        $("#HBachelor-UG-degree").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'UG-degreefile-block' }),
            fileName = $('<span/>', { class: 'UG-degreename', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="UGdegreecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#UG-degreefilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files10.items.add(file);
        }

        this.files = Files10.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".UGdegreecross", function (event) {
          let name = $(this).parent().next('span.UG-degreename').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files10.items.length; i++) {

            if (name === Files10.items[i].getAsFile().name) {
              Files10.items.remove(i);
              continue;
            }
          }

          if ($("#UG-degreefilesList").children().length == 0 && $(".UG-degree_get_filesList").children().length == 0) {
            $("#HBachelor-UG-degree-yes").hide();
            $("#HBachelor-UG-degree-no").show();
            $("#HBachelor-UG-degree").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("HBachelorUGdegree")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('HBachelor-UG-degree') as HTMLInputElement).files = Files10.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#HBachelor-UG-degree").val("").removeAttr('style');
      }
    }

    const inputElement_Highersecondary = document.getElementById("Highersecondary");
    inputElement_Highersecondary.addEventListener("change", handleFiles_Highersecondary, false);
    const Files11 = new DataTransfer();
    function handleFiles_Highersecondary() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Highersecondary_get_filesList").children().length
      var fileslength = Files11.files.length + $(".Highersecondary_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#Highersecondary-yes").show();
        $("#Highersecondary-no").hide();
        $("#Highersecondary").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Highersecondaryfile-block' }),
            fileName = $('<span/>', { class: 'Highersecondaryname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete3"><span class="Highersecondarycross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#HighersecondaryfilesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files11.items.add(file);
        }

        this.files = Files11.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".Highersecondarycross", function (event) {
          let name = $(this).parent().next('span.Highersecondaryname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files11.items.length; i++) {

            if (name === Files11.items[i].getAsFile().name) {
              Files11.items.remove(i);
              continue;
            }
          }

          if ($("#HighersecondaryfilesList").children().length == 0 && $(".Highersecondary_get_filesList").children().length == 0) {
            $("#Highersecondary-yes").hide();
            $("#Highersecondary-no").show();
            $("#Highersecondary").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Highersecondary")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Highersecondary') as HTMLInputElement).files = Files11.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Highersecondary").val("").removeAttr('style');
      }
    }

    const inputElement_Highschoolname = document.getElementById("Highschool");
    inputElement_Highschoolname.addEventListener("change", handleFiles_Highschool, false);
    const Files12 = new DataTransfer();
    function handleFiles_Highschool() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".Highschool_get_filesList").children().length
      var fileslength = Files12.files.length + $(".Highschool_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {


        $("#Highschool-yes").show();
        $("#Highschool-no").hide();
        $("#Highschool").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'Highschoolfile-block' }),
            fileName = $('<span/>', { class: 'Highschoolname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete2"><span class="highschoolcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#Highschoolname_filesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files12.items.add(file);
        }

        this.files = Files12.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".highschoolcross", function (event) {
          let name = $(this).parent().next('span.Highschoolname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files12.items.length; i++) {

            if (name === Files12.items[i].getAsFile().name) {
              Files12.items.remove(i);
              continue;
            }
          }

          if ($("#Highschoolname_filesList").children().length == 0 && $(".Highschool_get_filesList").children().length == 0) {
            $("#Highschool-yes").hide();
            $("#Highschool-no").show();
            $("#Highschool").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("Highschool")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('Highschool') as HTMLInputElement).files = Files12.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#Highschool").val("").removeAttr('style');
      }
    }

    const inputElement_allexperience = document.getElementById("allexperience");
    inputElement_allexperience.addEventListener("change", handleFiles_allexperience, false);
    const Files13 = new DataTransfer();
    function handleFiles_allexperience() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".allexperience_get_filesList").children().length
      var fileslength = Files13.files.length + $(".allexperience_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#allexperience-yes").show();
        $("#allexperience-no").hide();
        $("#allexperience").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'file-block' }),
            fileName = $('<span/>', { class: 'allexpname', text: fileList.item(i).name });
          fileBloc
            .append(
              '<span class="file-delete1"><span class="allexpcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
            )
            .append(fileName);
          $("#allexperience_filesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files13.items.add(file);
        }

        this.files = Files13.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".allexpcross", function (event) {
          let name = $(this).parent().next('span.allexpname').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files13.items.length; i++) {

            if (name === Files13.items[i].getAsFile().name) {
              Files13.items.remove(i);
              continue;
            }
          }

          if ($("#allexperience_filesList").children().length == 0 && $(".allexperience_get_filesList").children().length == 0) {
            $("#allexperience-yes").hide();
            $("#allexperience-no").show();
            $("#allexperience").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("allexperience")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('allexperience') as HTMLInputElement).files = Files13.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#allexperience").val("").removeAttr('style');
      }
    }

    const inputElement = document.getElementById("nationalid");
    inputElement.addEventListener("change", handleFiles_nationalid, false);
    const Files14 = new DataTransfer();
    function handleFiles_nationalid() {
      const fileList = this.files;
      var fileslistlength = fileList.length + $(".nationalid_get_filesList").children().length
      var fileslength = Files14.files.length + $(".nationalid_get_filesList").children().length
      if (fileslength < 5 && fileslistlength <= 5) {

        $("#nationalid-yes").show();
        $("#nationalid-no").hide();
        $("#nationalid").attr("style", "width:100px");

        for (var i = 0; i < fileList.length; i++) {
          let fileBloc = $('<span/>', { class: 'file-block' }),
            fileName = $('<span/>', { class: 'name', text: fileList.item(i).name });
          fileBloc
            .append(
              `<span class="file-delete1"><span class="nationalid_atc attachment_comman_class"><img style="width:20px"  src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>`
            )
            .append(fileName);
          $("#nationalid_filesList").append(fileBloc);

        };

        for (let file of this.files) {
          Files14.items.add(file);
        }

        this.files = Files14.files;

        $("table #tble-tbody-Attachments-academic").on("click", ".nationalid_atc", function (event) {
          let name = $(this).parent().next('span.name').text();
          $(this).parent().parent().remove();

          for (let i = 0; i < Files14.items.length; i++) {

            if (name === Files14.items[i].getAsFile().name) {
              Files14.items.remove(i);
              continue;
            }
          }

          if ($("#nationalid_filesList").has('span').length == 0) {
            $("#nationalid-yes").hide();
            $("#nationalid-no").show();
            $("#nationalid").val("").removeAttr('style');

            var index = AttachmentUploaderStatusArrayValidator.indexOf("nationalid")
            if (index !== -1) {
              AttachmentUploaderStatusArrayValidator.splice(index, 1);
            }
          }
          (document.getElementById('nationalid') as HTMLInputElement).files = Files14.files


        })
      } else {
        swal({
          title: " Only 5 Attachments can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
        !(fileList.length <= 5) && $("#nationalid").val("").removeAttr('style');
      }

    }


  }
  public GetCurrenthireuserdocumentlibraryitem(curentName, ONBSessionID) {
    if (personalMode == null) {
      var allitem = [];
      var allitem3 = [];
      var allitem32 = [];
      var allitem33 = [];
      var allitem34 = [];
      var allitem35 = [];
      var allitem36 = [];
      var allitem37 = [];
      var allitem38 = [];
      var allitem39 = [];
      var allitem310 = [];
      var allitem311 = [];
      var allitem312 = [];
      var allitem313 = [];
      var allitem314 = [];
      var licencefileurl = [];
      var nationalfileurl = [];

      var str = `${this.state.CurrentUserName}`;
      var name = curentName;
      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`PersonalAttachments/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          const Temparr = [];
          for (var i = 0; i < files.length; i++) {
            Temparr.push(files[i]);
          }
          for (var i = 0; i < Temparr.length; i++) {
            if (Temparr[i].ListItemAllFields.ONBSessionID == ONBSessionID) {
              allitem.push(Temparr[i]);
            }
          }
          var number1, number2, number3, number4, number5, number6, number7, number8, number9, number10, number11, number12, number13, number14;
          number1 = number2 = number3 = number4 = number5 = number6 = number7 = number8 = number9 = number10 = number11 = number12 = number13 = number14 = 1;

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").show();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");
            }

            //table attachments....

            if (allitem[i].ListItemAllFields.Tags == "All experience certificate") {
              var allexperience_fileurl = allitem[i].ServerRelativeUrl;

              $(".allexperience_get_filesList").append(`
              <div class="allexperience-view allfiles_view">${number1++}.
              <a href=${allexperience_fileurl} id="allexperience_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#allexperience").hide();
              $("#allexperience-yes").show();
              $("#allexperience-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              var Highschool_fileurl = allitem[i].ServerRelativeUrl;

              $(".Highschool_get_filesList").append(`
              <div class="Highschool-view allfiles_view">${number2++}.
              <a href=${Highschool_fileurl} id="Highschool_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Highschool").hide();
              $("#Highschool-yes").show();
              $("#Highschool-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              var Highersecondary_fileurl = allitem[i].ServerRelativeUrl;


              $(".Highersecondary_get_filesList").append(`
              <div class="Highersecondary-view allfiles_view">${number3++}.
              <a href=${Highersecondary_fileurl} id="Highersecondary_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Highersecondary").hide();
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              var UG_degree_fileurl = allitem[i].ServerRelativeUrl;


              $(".UG-degree_get_filesList").append(`
              <div class="UG-degree-view allfiles_view">${number4++}.
              <a href=${UG_degree_fileurl} id="UG-degree_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#HBachelor-UG-degree").hide();
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              var PG_degree_fileurl = allitem[i].ServerRelativeUrl;

              $(".PG-degree_get_filesList").append(`
              <div class="PG_degree-view allfiles_view">${number5++}.
              <a href=${PG_degree_fileurl} id="PG_degree_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#PG-degree").hide();
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              var Sponsors_passportvisa_fileurl = allitem[i].ServerRelativeUrl;


              $(".Sponsors_passportvisa_get_filesList").append(`
              <div class="Sponsors_passportvisa-view allfiles_view">${number6++}.
              <a href=${Sponsors_passportvisa_fileurl} id="Sponsors_passportvisa_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Sponsors_passportvisa").hide();
              $("#Sponsors_passportvisa-yes").show();
              $("#Sponsors_passportvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Insurance continuity letter") {
              var Insurance_continuity_fileurl = allitem[i].ServerRelativeUrl;

              $(".Insurance_continuity_letter_get_filesList").append(`
              <div class="Insurance_continuity-view allfiles_view">${number7++}.
              <a href=${Insurance_continuity_fileurl} id="Insurance_continuity_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Insurance_continuity_letter").hide();
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              var previous_emiratesid_fileurl = allitem[i].ServerRelativeUrl;

              $(".previous-emiratesid_get_filesList").append(`
              <div class="previous-emiratesid_-view allfiles_view">${number8++}.
              <a href=${previous_emiratesid_fileurl} id="previous-emiratesid_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#previous-emiratesid").hide();
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              var Previousvisa_fileurl = allitem[i].ServerRelativeUrl;

              $(".Previousvisa_get_filesList").append(`
              <div class="Previousvisa-view allfiles_view">${number9++}.
              <a href=${Previousvisa_fileurl} id="Previousvisa_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Previousvisa").hide();
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              var passportbackpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportbackpage_get_filesList").append(`
              <div class="passportbackpage-view allfiles_view">${number10++}.
              <a href=${passportbackpage_fileurl} id="passportbackpage_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#passportbackpage").hide();
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              var passportcopy_frontpage_fileurl = allitem[i].ServerRelativeUrl;


              $(".passportcopy-frontpage_get_filesList").append(`
              <div class="passportcopy-frontpage-view allfiles_view">${number11++}.
              <a href=${passportcopy_frontpage_fileurl} id="passportcopy_frontpage_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#passportcopy-frontpage").hide();
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              var Updated_Resumefileurl = allitem[i].ServerRelativeUrl;


              $(".Updated_Resume_get_filesList").append(`
              <div class="Updated_Resume-view allfiles_view">${number12++}.
              <a href=${Updated_Resumefileurl} id="Updated_Resume_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#Updated_Resume").hide();
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              var HighQualityPhotofileurl = allitem[i].ServerRelativeUrl;


              $(".High-QualityPhoto_get_filesList").append(`
              <div class="High-QualityPhoto-view allfiles_view">${number13++}.
              <a href=${HighQualityPhotofileurl} id="High-QualityPhoto_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)

              $("#High-QualityPhoto").hide();
              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }
            if (allitem[i].ListItemAllFields.Tags == "National ID Attachments") {
              var nationalfileurl = allitem[i].ServerRelativeUrl;

              $(".nationalid_get_filesList").append(`
              <div class="national-view allfiles_view">${number14++}.
              <a href=${nationalfileurl} id="nat_files"  target="_blank" data-interception="off">click here</a>
              </div>
              `)
              $("#nationalid").hide();
              $("#nationalid-yes").show();
              $("#nationalid-no").hide();
            }


          }


        });
    }
  }

  public deletedocumentlibrary(Mod) {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    } as any).then((willadd) => {
      if (willadd) {
        if (Mod == "resume") {
          newweb
            .getFileByServerRelativeUrl(resumeurl)
            .recycle()
            .then(function (data) {
              $("#Updated_Resume").show();
              $(".resumeurlitem").hide();
              $(".resumedelete").hide();
              $("#Updated_Resume-yes").hide();
              $("#Updated_Resume-no").show();
              //(data);
            });
        } else if (Mod == "photo") {
          newweb
            .getFileByServerRelativeUrl(photourl)
            .recycle()
            .then(function (data) {
              $("#High-QualityPhoto").show();
              $(".photourlitem").hide();
              $(".photodelete").hide();

              $("#QualityPhoto-yes").hide();
              $("#QualityPhoto-no").show();
              //(data);
            });
        } else if (Mod == "passportfront") {
          newweb
            .getFileByServerRelativeUrl(passportfronturl)
            .recycle()
            .then(function (data) {
              $("#passportcopy-frontpage").show();
              $(".passportfrontitem").hide();
              $(".passportfrontdelete").hide();
              //(data);
              $("#passportcopy-yes").hide();
              $("#passportcopy-no").show();
            });
        } else if (Mod == "passportback") {
          newweb
            .getFileByServerRelativeUrl(passportbackurl)
            .recycle()
            .then(function (data) {
              $("#passportbackpage").show();
              $(".passportbackitem").hide();
              $(".passportbacktdelete").hide();

              $("#passportbackpage-yes").hide();
              $("#passportbackpage-no").show();
            });
        } else if (Mod == "privousvisa") {
          newweb
            .getFileByServerRelativeUrl(Previousvisaurl)
            .recycle()
            .then(function (data) {
              $("#Previousvisa").show();
              $(".perivousvisaitem").hide();
              $(".perivousvisadelete").hide();
              $("#Previousvisa-yes").hide();
              $("#Previousvisa-no").show();
            });
        } else if (Mod == "emirateid") {
          newweb
            .getFileByServerRelativeUrl(PreviousemiratesIDurl)
            .recycle()
            .then(function (data) {
              $("#previous-emiratesid").show();
              $(".emiratesiditem").hide();
              $(".emiratesiddelete").hide();
              $("#emiratesid-yes").hide();
              $("#emiratesid-no").show();
            });
        } else if (Mod == "Insurancecontinuityletter") {
          newweb
            .getFileByServerRelativeUrl(Insurancecontinuityletterurl)
            .recycle()
            .then(function (data) {
              $("#Insurance_continuity_letter").show();
              $(".Insuranceletteritem").hide();
              $(".Insurance_continuity_letterdelete").hide();

              $("#Insurance_continuity_letter-yes").hide();
              $("#Insurance_continuity_letter-no").show();
            });
        } else if (Mod == "Sponsorspassportvisa") {
          newweb
            .getFileByServerRelativeUrl(Sponsorpassportvisaurl)
            .recycle()
            .then(function (data) {
              $("#Sponsors_passportvisa").show();
              $(".Sponsorspassportvisaitem").hide();
              $(".Sponsorspassportvisadelete").hide();

              $("#Sponsors_passportvisa-yes").hide();
              $("#Sponsors_passportvisa-no").show();
            });
        } else if (Mod == "pg") {
          newweb
            .getFileByServerRelativeUrl(PGdegreeurl)
            .recycle()
            .then(function (data) {
              $("#PG-degree").show();
              $(".PGitem").hide();
              $(".pgdelete").hide();

              $("#PG-degree-yes").hide();
              $("#PG-degree-no").show();
            });
        } else if (Mod == "ug") {
          newweb
            .getFileByServerRelativeUrl(UGdegreeurl)
            .recycle()
            .then(function (data) {
              $("#HBachelor-UG-degree").show();
              $(".ugitem").hide();
              $(".ugdelete").hide();
              $("#HBachelor-UG-degree-yes").hide();
              $("#HBachelor-UG-degree-no").show();
            });
        } else if (Mod == "higher") {
          newweb
            .getFileByServerRelativeUrl(Highersecondaryurl)
            .recycle()
            .then(function (data) {
              $("#Highersecondary").show();
              $(".higheritem").hide();
              $(".higherdelete").hide();

              $("#Highersecondary-yes").hide();
              $("#Highersecondary-no").show();
            });
        } else if (Mod == "highschool") {
          newweb
            .getFileByServerRelativeUrl(Highschoolurl)
            .recycle()
            .then(function (data) {
              $("#Highschool").show();
              $(".highschoolitem").hide();
              $(".highschooldelete").hide();

              $("#Highschool-yes").hide();
              $("#Highschool-no").show();
            });
        } else if (Mod == "allexp") {
          newweb
            .getFileByServerRelativeUrl(allexpurl)
            .recycle()
            .then(function (data) {
              $("#allexperience").show();
              $(".allexpitem").hide();
              $(".allexpdelete").hide();

              $("#allexperience-yes").hide();
              $("#allexperience-no").show();
              //(data);
            });
        } else if (Mod == "dohlicencefile") {
          newweb
            .getFileByServerRelativeUrl(licencefile)
            .recycle()
            .then(function (data) {
              licencefile = "";
              $("#moh_dha_lience").show();

              $(".licenceitem").hide();
              $(".licencefile_delete").hide();

              $("#uploadedlicence-yes").hide();
              $("#uploaded_licence-no").show();
              //(data);
            });
        } else if (Mod == "nationalid") {
          newweb
            .getFileByServerRelativeUrl(nationalfile)
            .recycle()
            .then(function (data) {
              $("#nationalid").show();
              $(".nationalid_item").hide();
              $(".nationalid_delete").hide();

              $("#nationalid-yes").hide();
              $("#nationalid-no").show();
              //(data);
            });
        }
      }
    });
  }

  public async GetBloodgroup() {
    await newweb.lists
      .getByTitle("Blood Group")
      .items.select("Title", "ID")
      .orderBy("Title", true)
      .top(5000)
      .get()
      .then((result) => {
        if (result.length != 0) {
          //"allblodd")
          this.setState({
            BloodGroupitem: result,
          });
        }
      });
  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }

  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
  }

  public GetEmployeeCategoryItem() {
    newweb.lists
      .getByTitle("Employee Category")
      .items.select("Category", "ID")
      .orderBy("Category", true)
      .top(5000)
      .get()
      .then((result) => {
        if (result.length != 0) {
          this.setState({
            EmployeeCategory: result,
          });
        }
      });
  }



  public Autochangefieldnameduringtyping() {
    $("#noHaveyoueverapplied").on("change", function () {
      if ($("noHaveyoueverapplied").is(":checked")) {
        $("#NameofCompany").val("");
        $("#Position").val("");
      }
    });

    $("#Employeename_1").keyup(function () {
      var value = $(this).val();
      $("#FullName").val(value);
    });

    $("#FullName").keyup(function () {
      var value = $(this).val();
      $("#Employeename_1").val(value);
    });

    $("#Employeename1").keyup(function () {
      var value = $(this).val();
      $("#dynamicFullName").val(value);
    });

    $("#dynamicFullName").keyup(function () {
      var value = $(this).val();
      $("#Employeename1").val(value);
    });

    $("#emp-work-status").on('change', function () {
      $("#err-emp-work").hide()
      if ($(this).val() == "Fresher") {
        $(".professional-qual,.Employment_history,.emp-reference-det").hide()
        $("#tble-tbody-dynamic3,#tble-tbody-dynamic3_Employment_History,#tble-tbody-dynamicemployreference").empty();
      } else if ($(this).val() == "Experienced") {
        $(".professional-qual,.Employment_history,.emp-reference-det").show()
      }
    })
  }

  public GetReligiondata() {
    newweb.lists
      .getByTitle("Religion Master")
      .items.select("Title", "ID")
      .orderBy("Title", true)
      .top(5000)
      .get()
      .then((result) => {
        if (result.length != 0) {
          this.setState({
            Religiondata: result,
          });
        }
      });
  }

  public GetSponserNamedata() {
    newweb.lists
      .getByTitle("Sponsers Master")
      .items.select("Title", "ID")
      .orderBy("Title", true)
      .top(5000)
      .get()
      .then((result) => {
        if (result.length != 0) {
          this.setState({
            SponserNamesData: result,
          });
        }
      });
  }

  public async GetCountries() {
    var reactHandler = this;
    this.getCountryName();
    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryName", "CountryCode")
      .orderBy("CountryCode", true)
      .top(5000)
      .get()
      .then((items) => {
        reactHandler.setState({
          countrycode: items,
        });
      });
  }

  public async getCountryName() {
    var reactHandler = this;

    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryName")
      .orderBy("CountryName", true)
      .top(5000)
      .get()
      .then((items) => {
        for (var i = 0; i < items.length; i++) {
          //   AvailableCountries.push(items[i].CountryName)
        }
        reactHandler.setState({
          countrynames: items,
        });
      });
  }

  public haveyoueverApplied(Type) {
    if (Type == "Yes") {
      if ($("#Yes-YesHaveyoueverapplied").prop("checked") == true) {
        $("input.noHaveyoueverapplied").prop("checked", false);
        $(".Company-name-position").show();
      } else {
        $(".Company-name-position").hide();
      }
    } else {
      if ($(".noHaveyoueverapplied").prop("checked") == true) {
        $("input.YesHaveyoueverapplied").prop("checked", false);
        $(".Company-name-position").hide();
      }
    }
  }
  public Printthis() {

    if (norelativestatus == "Yes") {

      $("#if-no-relative-hide").remove();
    } else {
      if (norelativestatus != "Yes" && Relative1 != "Yes" && Relative1 != "Yes" && Relative1 != "Yes" && Relative1 != "Yes" && Relative1 != "Yes" && Relative1 != "Yes") {
        $("#if-no-relative-hide").remove()

      }
    }
    if (LicenseTypeprint == "DOH") {
      $(".dohpasskey-kindaly-provide").show()
      $(".moh-dha-Attachment-hide-show").remove()

    } else if (LicenseTypeprint == "MOH") {
      $(".dohpasskey-kindaly-provide").remove()
      $(".moh-dha-Attachment-hide-show").show()
      $("#print-Moh-license").text("MOH");
    } else if (LicenseTypeprint == "DHA") {
      $(".dohpasskey-kindaly-provide").remove()
      $(".moh-dha-Attachment-hide-show").show()
    } else if (LicenseTypeprint == "No") {
      $(".dohpasskey-kindaly-provide").remove()
      $(".moh-dha-Attachment-hide-show").remove()
    }


    let printContents = $("#dashboard_right-print-pi").html();//document.getElementById('dashboard_right-print').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    location.reload();

    document.body.innerHTML = originalContents;

  }


  public render(): React.ReactElement<IHrOnboardingFormProps> {
    var handler = this;
    // const { selectedOption1 } = this.state;
    // const { selectedOption2 } = this.state;
    // const { selectedOption3 } = this.state;
    // const { selectedOption4 } = this.state;
    // const { selectedOption5 } = this.state;
    // const { selectedOption6 } = this.state;

    const Religionsitem: JSX.Element[] = this.state.Religiondata.map(function (
      item,
      key
    ) {
      // //(item);
      return <option value={item.Title}>{item.Title}</option>;
    });

    const Employeecategorys: JSX.Element[] = this.state.EmployeeCategory.map(
      function (item, key) {
        // //(item);
        return <option value={item.Category}>{item.Category}</option>;
      }
    );
    const AllBloodgrooup: JSX.Element[] = this.state.BloodGroupitem.map(
      function (item, key) {
        // //(item);
        return <option value={item.Title}>{item.Title}</option>;
      }
    );
    const Countrycodesitem: JSX.Element[] = this.state.countrycode.map(
      function (item, key) {
        var addcountrycodetoname = item.CountryCode + "- " + item.CountryName;

        return (
          <option value={item.CountryCode + "-" + item.CountryName}>
            {item.CountryCode}-{item.CountryName}
          </option>
        );
      }
    );

    const Allcountryname: JSX.Element[] = this.state.countrynames.map(function (
      item,
      key
    ) {
      ////(item);

      return <option value={item.CountryName}>{item.CountryName}</option>;
    });

    const Titlesurename: JSX.Element[] = this.state.Titlesurname.map(function (
      item,
      key
    ) {
      //(item);

      return <option value={item.SurName}>{item.SurName}</option>;
    });
    return (
      <>
        <div>
          <div className="dashboard_right_heading">
            {handler.state.Dynamiclogo &&
              GlobalModes == "New" &&
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

            {GlobalModes != "New" && (
              <LogoMaster description={""} siteurl={this.props.siteurl} />
            )}

            <span>Personal information</span>
          </div>

          <div id="isloading-completed" className="dashboard_right_ffamily">
            <div className="personal_info_top">
              <div className="personal_info_part">
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="surenmaepersonal"
                        className="surename form-control surename-personal personalviewclasscommom"
                      >
                        <option value="Select">Select</option>
                        {Titlesurename}
                      </select>
                      <span className="floating-label">
                        Title <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Titlesurename"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="personalwithoutedit form-group relative">
                      <input
                        type="text"
                        id="FullName"
                        name="FullName"
                        className="form-control fullname-officename fullname_personal full-nameitem personalview common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Full Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="prsonalwithedit form-group relative"
                    >
                      <input
                        type="text"
                        id="dynamicFullName"
                        name="FullName"
                        className="form-control  personalvalue"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Full Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation err-fullname-err"
                      id="err-fullname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="EmployeeCategory"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Employeecategorys}
                      </select>
                      <span className="floating-label ">
                        Employee Category <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-EmployeeCategory"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="firstnamecurrent form-group relative">
                      <input
                        type="text"
                        id="PersonalFirstName"
                        name="FirstName"
                        className="form-control personal_firstname personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        First Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="firstnamedynamic form-group relative"
                    >
                      <input
                        type="text"
                        id="FirstNames"
                        name="FirstName"
                        className="form-control empfirstname"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        First Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-FirstName"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PersonalMiddleName"
                        name="MiddleName"
                        className="form-control personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Middle Name</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Middlename"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="Lastnamenamecurrent form-group relative">
                      <input
                        type="text"
                        id="empLastname"
                        name="Lastname"
                        className="form-control  personal_lastname personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Last Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="Lastnamenamedynamic form-group relative"
                    >
                      <input
                        type="text"
                        id="Lastname"
                        name="Lastname"
                        className="form-control personalLastname"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Last Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Lastname"
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
                        id="PlaceofBirth"
                        name="PlaceofBirth"
                        className="form-control pob personalview"
                      />
                      <span className="floating-label ">
                        Place of Birth <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofbirth"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="DateofBirth"
                        name="DateofBirth"
                        max={moment().format("YYYY-MM-DD")}
                        className="form-control dob-personal-user dob dobpersonal personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Date of Birth <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation errpresonalbirth"
                      id="err-dateofbirth"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="PersonalGender"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <span className="floating-label ">
                        Gender <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Genderpersonal"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input 
                    type="text"
                    id="CurrentNationality"
                    name="CurrentNationality"
                    className="form-control Current-Nationality"
                    autoComplete="off"
                  />  */}

                      <select
                        id="CurrentNationality"
                        className="Current-Nationality form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Allcountryname}
                      </select>
                      <span className="floating-label ">
                        Current Nationality <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-currentnationality"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
                    type="text"
                    id="PreviousNationality"
                    name="PreviousNationality"
                    className="form-control Previous-Nationality"
                    autoComplete="off"
                  /> */}
                      <select
                        id="PreviousNationality"
                        className="Previous-Nationality form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Allcountryname}
                      </select>
                      <span className="floating-label ">
                        Previous Nationality <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-PreviousNationality"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
                      type="text"
                      id="Religion"
                      name="Religion"
                      className="form-control religions personalview"
                      autoComplete="off"
                    />
                    <span className="floating-label ">
                      Religion<i className="required">*</i>
                    </span> */}

                      <select
                        id="Religion"
                        className="religions form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Religionsitem}
                      </select>

                      <span className="floating-label ">
                        Religion <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-religion"
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
                        id="Section"
                        name="Section"
                        className="form-control sections personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Section (Religion)
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-section"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="Entered"
                        name="Entered"
                        className="form-control entereds personalview"
                        autoComplete="off"
                        max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">
                        Entered The Country On
                        {/* <i className="required">*</i> */}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-entered"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Port"
                        name="Port"
                        className="form-control ports personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Port of Entry
                        {/* <i className="required">*</i> */}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-port"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="country-code"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Countrycodesitem}
                      </select>
                      <span className="floating-label ">
                        Country Code <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycode"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="ContactNumber"
                        name="ContactNumber"
                        className="form-control contactnumbers personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Contact Number <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation err-formatphonenumberpersonalContactNumber"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                    <span
                      className="error-validation"
                      id="err-contactnumber"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="SponsorName"
                        name="SponsorName"
                        className="form-control SponsorNames personalview personalviewclasscommom"
                      >
                        <option value="Select">Select</option>
                        {this.state.SponserNamesData &&
                          this.state.SponserNamesData.map(function (item, key) {
                            return (
                              <option value={`${item.Title}`}>
                                {item.Title}
                              </option>
                            );
                          })}
                      </select>
                      <span className="floating-label ">
                        Sponsor Name
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-sponsorname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">

                  <div className="col-md-4">
                    <div className="form-group relative">

                      <select
                        id="personal-blood-group"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {AllBloodgrooup}
                      </select>
                      <span className="floating-label ">
                        Blood Group <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Newhirebloodgroup-personal"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">

                      <select
                        id="emp-work-status"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                      </select>
                      <span className="floating-label ">
                        Employee Status <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-emp-work"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div>
              <div className="personal_info_part">
                <div className="passport_heading_title personal_information_title">
                  <h3> Passport & Residence Particulars </h3>
                </div>

                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="DocumentNo"
                        className="form-control documentnos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        Passport/Travel Document No <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-documentno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PlaceofIssue"
                        name="PlaceofIssue"
                        className="form-control pos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Place of Issue <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofissue"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="DateofIssue"
                        name="DateofIssue"
                        className="form-control dos personalview"
                        autoComplete="off"
                        max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">
                        Date of Issue <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateofissue"
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
                        type="date"
                        id="DateofExpiry"
                        className="form-control dos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Date of Expiry <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateofexpiry"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="ResidenceNo"
                        name="ResidenceNo"
                        className="form-control residenceNos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Visa Residence No
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-residenceno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div>

              <div className="professional-qual perfactional_qualification personal_info_part" style={{ display: "none" }}>
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title ">
                      Professional Qualification/Certification Details{" "}
                    </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-block4qualification"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name of the University/Institute</th>
                        <th scope="col">
                          Course/Certification & Specialization{" "}
                        </th>
                        <th scope="col">Year of graduation</th>
                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamic3">
                      <tr id="Universityqualification-tr">
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personal-qualif-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-Name-qualification"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-University"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="tble-txt-year_of_grt"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center" }}><span className="error-validation" id="err-table-qualification" style={{ color: "red", display: "none" }}>This field is mandatory.</span></p>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn  Add-new-personal"
                    onClick={(e) => this.QualificationAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="Employment_history add_new_row_btn personal_info_part" style={{ display: "none" }}>
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">Employment History </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-block-employmentHistory"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th className="emp_history_thname" scope="col">
                          Organization Name & Address{" "}
                        </th>
                        <th className="emp_history_thdesign" scope="col">
                          Designation{" "}
                        </th>
                        <th className="emp_history_thfrom" scope="col">
                          From (mm/yyyy){" "}
                        </th>
                        <th className="emp_history_thto" scope="col">
                          To (mm/yyyy){" "}
                        </th>
                        <th className="emp_history_thyrs" scope="col">
                          Years of Experience{" "}
                        </th>
                        <th className="emp_history_threason" scope="col">
                          Reason For Leaving
                        </th>
                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamic3_Employment_History">
                      <tr id="employmenthistory-tr">
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personaltab-emp-history-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-OrganizationName"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-OrganizationDesignation"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="month"
                            id="tble-txt-Organization-date-From"
                            className="form-control"
                            autoComplete="off"
                            max={moment().format("YYYY-MM")}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="month"
                            id="tble-txt-Organization-date-To"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Years_of_Experience"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Reason_for_leaving"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center" }}><span className="error-validation" id="err-table-employmenthistory" style={{ color: "red", display: "none" }}>This field is mandatory.</span></p>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmploymentHistoryAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="perfactional_qualification add_new_row_btn personal_info_part">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">
                      Research & Publication Details{" "}
                    </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-blockResearch"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th className="pi_reseach_thname" scope="col">Name of Publication </th>
                        <th className="pi_reseach_thcategory" scope="col">Category </th>
                        <th className="pi_reseach_thyear" scope="col">Year </th>

                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicResearch">
                      <tr id="Research-tr">
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personaltab-reserch-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-name-Research"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Category-Research"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-year-Research"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.ResearchPublicationDetailsAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="emp-reference-det perfactional_qualification add_new_row_btn personal_info_part" style={{ display: "none" }}>
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">
                      Employee Reference Details (Last 3 Employers){" "}
                    </h3>
                    <span>
                      Note: References may be used for background verification
                      purpose , please add country code with the contact number
                    </span>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-blockEmployeeReference"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name of Person & Designation</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Contact Number</th>

                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicemployreference">
                      <tr id="empreference-tr">
                        {/* <td>
                        <input
                          id="tble-txt-row-order"
                          className="s_no"
                          type="text"
                          disabled
                          autoComplete="off"
                          value="1"
                        ></input>
                      </td> */}
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personal-ref-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-Name-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Email-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactno-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center" }}><span className="error-validation" id="err-table-employeereferencedetails" style={{ color: "red", display: "none" }}>This field is mandatory.</span></p>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmployeeReferenceDetailsAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="personal_information_title">
                  <h3>Marital Status </h3>
                  <p>(Please enter the below required details of your Spouse, If Applicable)</p>
                </div>
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="MaritalStatus"
                        className="Status form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Separated">Separated</option>
                      </select>
                      <span className="floating-label ">
                        Marital Status <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-maritalstatus"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
                    type="text"
                    id="BloodGroup"
                    name="BloodGroup"
                    className="form-control bloodgroups"
                    autoComplete="off"
                  /> */}
                      <select
                        id="BloodGroup"
                        className="bloodgroups form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {AllBloodgrooup}
                      </select>
                      <span className="floating-label ">
                        Blood Group
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-bloodgroup"
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
                        id="NameofSpouse"
                        className="form-control nos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Name of Spouse </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofspouse"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="Nationality2"
                        className="Nationalitys2 form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Allcountryname}
                      </select>
                      <span className="floating-label ">Nationality </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nationality2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PlaceofBirth2"
                        name="PlaceofBirth2"
                        className="form-control pob2 personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Place of Birth </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofbirth2"
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
                        type="date"
                        id="DateofBirth2"
                        max={moment().format("YYYY-MM-DD")}
                        className="form-control dob2 personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Date of Birth </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-DateofBirth2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PlaceofWork"
                        className="form-control pow personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Place of Work </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofwork"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Occupation2"
                        name="Occupation2"
                        className="form-control Occupations2 personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Occupation </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-occupation2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="add_new_row_btn">
                  <div className="table-wrapper-date clearfix ">
                    <div className="table-search personal_information_title">
                      <h3 className="contact-pg-title">Children</h3>
                      <p>(Please add - Only If applicable)</p>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered" id="cust-table-block">
                      <thead style={{ background: "#0047ab" }}>
                        <tr>
                          <th className="PC_name" scope="col">
                            {" "}
                            Name{" "}
                          </th>
                          <th className="PC_gender" scope="col">
                            {" "}
                            Gender{" "}
                          </th>
                          <th scope="col"> D.O.B </th>
                          <th scope="col"> Passport No </th>
                          <th scope="col"> Emirate ID No </th>
                          <th className="Action-columnviewmode" scope="col"></th>
                        </tr>
                      </thead>

                      <tbody id="tble-tbody-dynamic">
                        <tr id="childlist-tr">
                          <td>
                            <input
                              type="hidden"
                              id="hdn-personaltab-itm-id"
                              value="null"
                            ></input>
                            <input
                              type="text"
                              id="tble-txt-requested"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <select
                              id="tble-ChildGender"
                              className="form-control personalview personalviewclasscommom"
                            >
                              <option value="-">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="date"
                              id="tble-child-dob"
                              max={moment().format("YYYY-MM-DD")}
                              className="form-control dob dobpersonal personalview"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              id="tble-txt-child-passport-no"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              id="tble-txt-child-emirate-no"
                              className="form-control"
                              autoComplete="off"
                              maxLength={15}
                            ></input>

                            <span
                              className="error-validation"
                              id="err-table-children-format-emirate-id"
                              style={{ color: "red", display: "none" }}
                            >
                              Please enter valid emirate id.
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="add-btn-wrap clearfix">
                    <button
                      type="submit"
                      className="Add-new-btn Add-new-personal"
                      onClick={(e) => this.AddNewRow(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="personal_info_parag">
                  <div className="row form row_top">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="FathersName"
                          className="form-control FathersNames personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label">
                          Father's Name <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-fathersname"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select
                          id="Nationality3"
                          className="Nationalitys3 form-control personalview personalviewclasscommom"
                        >
                          <option value="">Select</option>
                          {Allcountryname}
                        </select>
                        <span className="floating-label ">
                          Nationality (Father's)  <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Nationality3"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="PlaceofBirth3"
                          name="PlaceofBirth3"
                          className="form-control pobs3 personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Place of Birth (Father's)  <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-placeofbirth3"
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
                          type="date"
                          id="DateofBirth3"
                          className="form-control dobs3 personalview"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span className="floating-label">Date of Birth (Father's) <i className="required">*</i></span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-dateofbirth3"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="Occupation3"
                          name="Occupation3"
                          className="form-control Occupations3 personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Occupation (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-occupation3"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                  <div className="row form">
                    <div className="col-md-12">
                      <div className="form-group relative">
                        <textarea
                          name="HomeAddress3"
                          id="HomeAddress3"
                          className="form-control homeaddress3 personalview"
                          cols={40}
                          style={{ resize: "none" }}
                        ></textarea>
                        <span className="floating-label ">
                          Home Address (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-homeaddress3"
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
                          id="MothersName"
                          className="form-control MothersNames personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label">
                          Mother's Name <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-mothersname"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select
                          id="Nationalityfour"
                          className="Nationalitys4 form-control personalview personalviewclasscommom"
                        >
                          <option value="">Select</option>
                          {Allcountryname}
                        </select>
                        <span className="floating-label ">
                          Nationality (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Nationalityfour"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="PlaceofBirth4"
                          name="PlaceofBirth4"
                          className="form-control pobs4 personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Place of Birth (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-placeofbirth4"
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
                          type="date"
                          id="DateofBirth4"
                          className="form-control dobs4 personalview"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span className="floating-label">Date of Birth (Mother's) <i className="required">*</i></span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-dateofbirth4"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="Occupation4"
                          name="Occupation4"
                          className="form-control Occupations4 personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Occupation (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-occupation4"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                  <div className="row form">
                    <div className="col-md-12">
                      <div className="form-group relative">
                        <textarea
                          name="HomeAddress4"
                          id="HomeAddress4"
                          className="form-control HomeAddresss4 personalview"
                          cols={40}
                          style={{ resize: "none" }}
                        ></textarea>
                        <span className="floating-label ">
                          Home Address (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-homeaddress4"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="personal_info_parag">
                  <div className="personal_information_title">
                    <h3>Home Country Address</h3>
                  </div>

                  <div className="row form row_top">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select
                          id="country-codehomecountry"
                          className="form-control personalview personalviewclasscommom"
                        >
                          <option value="">Select</option>
                          {Countrycodesitem}
                        </select>
                        <span className="floating-label ">
                          Country Code<i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-countrycode2"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="CountryNumber"
                          className="form-control CountrysNumbers personalview home_countrynumbers"
                          autoComplete="off"
                        />
                        <span className="floating-label">
                          Home Country Number<i className="required">*</i>
                        </span>
                      </div>

                      <span
                        className="error-validation err-homecountry-err-format"
                        style={{ color: "red", display: "none" }}
                      >
                        Characters are not allowed
                      </span>
                      <span
                        className="error-validation home_counteryno-err"
                        id="err-countrynumber"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="EmailID"
                          name="EmailID"
                          className="form-control emailsids personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Email ID <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="erremailpersonal"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>

                      <span
                        className="error-validation"
                        id="invalid-email"
                        style={{ color: "red", display: "none" }}
                      >
                        Please Provide a Valid Email
                      </span>
                    </div>
                  </div>
                  {/* <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="Job_Applied_For"
                          name="JobAppliedFor"
                          className="form-control jobappliedfors personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Job Applied For <i className="required">*</i>{" "}
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-JobAppliedFor"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div> */}

                  <div className="">
                    <p className="personal_info_p country_yesno">
                      {" "}
                      Have you ever applied / worked with{" "}
                      <span id="bussiness-unit-name">{officename}</span>
                      <span
                        id="show-bussiness-unitname"
                        style={{ display: "none" }}
                        className="dynamicbussiness-unit-name"
                      >
                        {" "}
                        {businessdynamicuserunit}
                      </span>{" "}
                      or other units of{" "}
                      <span id="bussiness-unit-name">{officename}</span>
                      <span
                        style={{ display: "none" }}
                        className="dynamicbussiness-unit-name"
                      >
                        {" "}
                        {businessdynamicuserunit}
                      </span>
                      ? <i className="required">*</i>
                    </p>
                  </div>

                  <div className="row form country_checkbox">
                    <div className="col-md-2">
                      <div className="form-group relative">
                        <div className="form-check">
                          <input
                            className="YesHaveyoueverapplied personalview"
                            type="checkbox"
                            id="Yes-YesHaveyoueverapplied"
                            name="Yes"
                            value="Yes"
                            onChange={() => this.haveyoueverApplied("Yes")}
                          />
                          <span className="form-check-label">Yes</span>
                        </div>
                      </div>
                      <p
                        className="errorvalidation"
                        id="err-Yes-applied"
                        style={{
                          whiteSpace: "nowrap",
                          color: "red",
                          display: "none",
                        }}
                      >
                        Select any one of the checkboxes above
                      </p>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group relative">
                        <div className="form-check">
                          <input
                            className="noHaveyoueverapplied personalview"
                            type="checkbox"
                            id="No"
                            name="No"
                            value="something"
                            onChange={() => this.haveyoueverApplied("No")}
                          />
                          <span className="form-check-label">No</span>
                        </div>
                      </div>
                      <span
                        className="error-validation"
                        id="err-no"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div
                      id="company-hide"
                      style={{ display: "none" }}
                      className="col-md-4 Company-name-position"
                    >
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="NameofCompany"
                          name="NameofCompany"
                          className="form-control NameofCompanys personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Name of Company <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-nameofcompany"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div
                      id="position-hide"
                      style={{ display: "none" }}
                      className="col-md-4 Company-name-position"
                    >
                      <div className="form-group relative">
                        <input
                          type="text"
                          id="Position"
                          name="Position"
                          className="form-control positions personalview"
                          autoComplete="off"
                        />
                        <span className="floating-label ">
                          Position <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-position"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row form">
                  <p className="personal_info_p">
                    I hereby declare the following employees that are related to
                    me who are working with{" "}
                    <span id="bussiness-unit-name">{officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="dynamicbussiness-unit-name"
                    >
                      {businessdynamicuserunit}
                    </span>
                  </p>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="personalview"
                          type="checkbox"
                          id="spouse"
                          name="relative"
                          value="Spouse"
                          onClick={() => this.relativefriendchecking("Spouse")}
                        />
                        <span className="form-check-label">Spouse</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-spouse"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="Brothers personalview"
                          type="checkbox"
                          id="Brother"
                          name="relative"
                          value="Brother"
                          onClick={() => this.relativefriendchecking("Brother")}
                        />
                        <span className="form-check-label">Brother</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Brother"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="personalview"
                          type="checkbox"
                          id="Sister"
                          name="relative"
                          value="Sister"
                          onClick={() => this.relativefriendchecking("Sister")}
                        />
                        <span className="form-check-label">Sister</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-sister"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="ersonalview personalview"
                          type="checkbox"
                          id="Cousin"
                          name="relative"
                          value="Cousin"
                          onClick={() => this.relativefriendchecking("Cousin")}
                        />
                        <span className="form-check-label">Cousin</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-cousin"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="personalview"
                          type="checkbox"
                          id="AnyOtherCloseRelative"
                          name="relative"
                          value="AnyOtherCloseRelative"
                          onClick={() =>
                            this.relativefriendchecking("AnyOtherCloseRelative")
                          }
                        />
                        <span className="form-check-label">
                          Any Other Close Relative
                        </span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-anyothercloserelative"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="personalview"
                          type="checkbox"
                          id="NoRelative"
                          name="relative"
                          value="someNoRelativething"
                          onClick={() => this.norelativecheckbox()}
                        />
                        <span className="form-check-label">No Relative</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-norelative"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="personalview"
                          type="checkbox"
                          id="Friend"
                          name="relative"
                          value="Friend"
                          onClick={() => this.relativefriendchecking("Friend")}
                        />
                        <span className="form-check-label">Friend</span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-friend"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                {/* <div className="work_location_div">
                <p className="personal_info_p">
                  Please specify name & work location of relative/friend in the <span id="bussiness-unit-name">{officename}</span> <span style={{ display: "none" }}id="dynamicbussiness-unit-name"> {businessdynamicuserunit}</span> </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="RelativeName"
                        name="RelativeName"
                        className="form-control RelativeName personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Name</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-RelativeName"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="WorkLocation"
                        name="WorkLocation"
                        className="form-control WorkLocations personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Work Location</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-worklocation"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div> */}

                <div style={{ display: "none" }}
                  id="if-no-relative-hide"
                  className="perfactional_qualification add_new_row_btn"
                >
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search personal_information_title">
                      <h3 className="contact-pg-title"></h3>
                      <span>
                        <p className="personal_info_p">
                          Note: Please specify name & work location of
                          relative/friend in the{" "}
                          <span id="bussiness-unit-name">{officename}</span>{" "}
                          <span
                            style={{ display: "none" }}
                            className="dynamicbussiness-unit-name"
                          >
                            {" "}
                            {businessdynamicuserunit}
                          </span>{" "}
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="cust-table-relattivefriend-table"
                    >
                      <thead style={{ background: "#0047ab" }}>
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col">Name </th>
                          <th scope="col">Work Location</th>
                          <th className="Action-columnviewmode" scope="col"></th>
                        </tr>
                      </thead>
                      <tbody id="tble-tbody-relative-friend">
                        <tr id="friend-relative-tr">
                          <td>
                            <input
                              type="hidden"
                              id="hdn-personal-relativefriend-itm-id"
                              value="null"
                            ></input>
                            <input
                              type="text"
                              id="relative-friend-name"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              id="relative-friend-worklocation"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="add-btn-wrap clearfix">
                    <button
                      type="submit"
                      className="Add-new-btn Add-new-personal"
                      onClick={(e) => this.addreletivefriendrow(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="personal_information_title">
                  <h3>Emergency Contact Person In UAE</h3>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="cust-table-block2">
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Work Location</th>
                        <th scope="col">Contact Number</th>
                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicEmergencyContact">
                      <tr id="emergency-tr">
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personalcontactperson-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-name2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-worklocation2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactnumber2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center" }}><span className="error-validation" id="err-table-EmergencyContactPersonInUAE" style={{ color: "red", display: "none" }}>This field is mandatory.</span></p>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmergencyContactPersonInUAEAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="add_new_row_btn personal_info_part personal_info_part">
                <div className="personal_information_title">
                  <h3>Emergency Contact Person Outside UAE</h3>
                  <span>
                    Note: please add country code with the contact number.
                  </span>
                </div>
                <div className="table-wrapper-date clearfix">
                  <div className="table-search"></div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="cust-table-block3">
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Work Location</th>
                        <th scope="col">Contact Number</th>
                        <th className="Action-columnviewmode" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicemergencycontactpepersonoutside">
                      <tr id="outside-tr">
                        <td>
                          <input
                            type="hidden"
                            id="hdn-personalcontperson-out-itm-id"
                            value="null"
                          ></input>
                          <input
                            type="text"
                            id="tble-txt-name3"
                            className="form-control Emergencyname"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-relation3"
                            className="form-control Emergencyrelation"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactnumber3"
                            className="form-control  Emergencycontactno"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ textAlign: "center" }}><span className="error-validation" id="err-table-EmergencyContactPersonOutside" style={{ color: "red", display: "none" }}>This field is mandatory.</span></p>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) =>
                      this.EmergencyContactPersonOutsideAddNewRow(e)
                    }
                  >
                    Add New Row
                  </button>
                </div>
              </div>
              <div className="personal_info_part">
                <div className="personal_information_title add_new_row_btn">
                  <h3>Address: If Currently Living In UAE</h3>
                </div>
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
                      type="text"
                      id="Emirate"
                      className="form-control Emirates personalview"
                      autoComplete="off"
                      min={15}
                      max={15}
                       Abu Dhabi 2. Dubai 3.Sharjah. 4.Ajman 5.Umm Al-Quwain 6.Fujairah

                        7.Ras Al Khaimah
                    /> */}
                      <select
                        id="Emirate"
                        className="form-control Emirates personalview"
                      >
                        <option value="Select">Select</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                        <option value="Fujairah">Fujairah</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      </select>

                      <span className="floating-label">Emirate</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-emirate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation"
                      id="err-emirate-wrong-format"
                      style={{ color: "red", display: "none" }}
                    >
                      Please enter valid emirate id.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Street"
                        name="Street"
                        className="form-control Streets personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Street</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-street"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Owner"
                        name="Owner"
                        className="form-control Owners personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Owner</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Owner"
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
                        id="FlatNo"
                        className="form-control FlatNos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Flat No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-flatno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Plot"
                        name="Plot"
                        className="form-control plots personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Plot</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-plot"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PostBox"
                        name="PostBox"
                        className="form-control PostBoxs personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Post Box</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-postbox"
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
                        id="TelephoneNo"
                        className="form-control telephonenos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">Telephone No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-telephoneNo"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation"
                      id="err-personaltelephoneformat"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="country-codeMobileNo"
                        className="form-control personalview personalviewclasscommom"
                      >
                        <option value="">Select</option>
                        {Countrycodesitem}
                      </select>
                      <span className="floating-label ">Country Code</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycode"
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
                        className="form-control MobileNos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Mobile No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-mobileno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation err-mobilenouae"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="Licence-status">
                  <div className="row form">
                    <h3>License Status</h3>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="checkbox"
                          id="Doh-license"
                          value="DOH"
                          className="personalview"
                          onClick={() => this.dohcheckoxchecking()}
                        />
                        <span className="form-check-label">DOH</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="checkbox"
                          value="MOH"
                          id="Moh-license"
                          className="personalview"
                          onClick={() => this.Dhamhacheckboxchecking("MOH")}
                        />
                        <span className="form-check-label">MOH</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input
                          type="checkbox"
                          value="DHA"
                          id="Dha-license"
                          className="personalview"
                          onClick={() => this.Dhamhacheckboxchecking("DHA")}
                        />
                        <span className="form-check-label">DHA</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="LicenseNo"
                        className="form-control LicenseNos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label">License Number</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-licenseno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="IssueDate"
                        name="IssueDate"
                        className="form-control IssueDates personalview"
                        autoComplete="off"
                        max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">Issue Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-issuedate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="ExpiryDate"
                        name="ExpiryDate"
                        className="form-control ExpiryDates personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Expiry Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-expirydate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div></div>
                </div>

                <div className="new_registration">
                  <ul>
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            <input
                              className="NewRegistrations personalview"
                              type="checkbox"
                              id="NewRegistration"
                              name="new"
                              value="NewRegistration"
                            />
                            <span className="form-check-label">
                              New Registration
                            </span>
                          </div>
                        </div>
                        <span
                          className="error-validation"
                          id="err-newregistration"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>
                    </div>
                    <li>
                      <div className="row form">
                        <h4>
                          {" "}
                          <h4> If Dataflow Completed </h4>
                        </h4>
                      </div>

                      <div className="row form country_checkbox">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <div className="form-check">
                              <input
                                className="dataflowYes personalview"
                                type="checkbox"
                                id="Yes"
                                name="Yes"
                                value="something"
                                onClick={() => this.dataflowchecknoxchecking()}
                              />
                              <span className="form-check-label">Yes</span>
                            </div>
                          </div>
                          <span
                            className="error-validation"
                            id="err-Yes"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <div className="form-check">
                              <input
                                className="dataflowno personalview"
                                type="checkbox"
                                id="No"
                                name="No"
                                value="something"
                              />
                              <span className="form-check-label">No</span>
                              {/* <span className="form-check-label">
                              If Yes provide the same
                            </span> */}
                            </div>
                          </div>
                          <span
                            className="error-validation"
                            id="err-no"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                        <div
                          style={{ display: "none" }}
                          className="col-md-4  ifdataflow-yes"
                        >
                          <div className="form-group relative">
                            <input
                              type="text"
                              id="provide-the-same"
                              name=""
                              className="form-control  personalview"
                              autoComplete="off"
                            />
                            <span className="floating-label ">
                              If Yes provide the same{" "}
                              <i className="required">*</i>
                            </span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-provide-the-same"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                      </div>
                    </li>
                    <li
                      style={{ display: "none" }}
                      className="dohpasskey-kindaly-provide"
                    >
                      <h4 className="doh_passed_key">
                        If DOH Passed Kindly Provide:
                      </h4>
                      <div className="row form">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <input
                              type="text"
                              id="UserName"
                              name="UserName"
                              className="form-control usersnames personalview"
                              autoComplete="off"
                            />
                            <span className="floating-label ">
                              UserName <i className="required">*</i>
                            </span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-username"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                        <div className="col-md-4">
                          <div id="password-hide" className="form-group relative">
                            <input
                              type="password"
                              id="Password"
                              name="Password"
                              className="form-control Passwords personalview"
                              autoComplete="off"
                            />
                            <span className="floating-label ">
                              Password <i className="required">*</i>
                            </span>
                          </div>

                          <div
                            style={{ display: "none" }}
                            id="password-show"
                            className="form-group relative"
                          >
                            <input
                              type="text"
                              id="Password-dynamic"
                              name="Password"
                              className="form-control Passwords-dynamic personalview"
                              autoComplete="off"
                            />
                            <span className="floating-label ">
                              Password <i className="required">*</i>
                            </span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-password"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                      </div>
                    </li>
                    <li
                      style={{ display: "none" }}
                      className="moh-dha-Attachment-hide-show"
                    >
                      <p className="personal_info_p">
                        If MOH or DHA please attach Certificate or Eligibility
                        letter <i className="required">*</i>
                      </p>

                      <div className="row form">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <input
                              type="file"
                              id="moh_dha_lience"
                              name="file"
                              className="form-control  personalview"
                              autoComplete="off"
                              onChange={(e) =>
                                this.AddedAttachments(
                                  e,
                                  "moh_dha_lience",
                                  "mohdhalience"
                                )
                              }
                            />
                            {/* <span className="floating-label ">Licence</span> */}
                          </div>
                          <p
                            className="error-validation"
                            id="err-moh-err-file"
                            style={{
                              marginTop: "20px",
                              color: "red",
                              display: "none",
                            }}
                          >
                            This field is mandatory.
                          </p>

                          <li>
                            <a
                              href={`${licencefile}`}
                              style={{ display: "none" }}
                              className="licenceitem"
                              target="_blank"
                              data-interception="off"
                            >
                              click here
                            </a>
                            <span
                              className="licencefile_delete"
                              style={{ display: "none" }}
                              onClick={() =>
                                this.deletedocumentlibrary("dohlicencefile")
                              }
                            >
                              <img
                                className="delete_document_item"
                                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                                alt="image"
                              />
                            </span>
                            <span id="upload_licencefile"></span>

                            <li
                              style={{ display: "none" }}
                              id="uploadedlicence-yes"
                            >
                              <img
                                className="attactment-img"
                                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                                alt="error"
                              ></img>
                              <span className="yeslicence">YES</span>
                            </li>
                          </li>
                          {/* <div id="uploaded_licence-no">

                          <span>No</span>
                        </div> */}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="vehicle-particulars">
                  <h4> Vehicle Particulars (If In UAE)</h4>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="DrivingLicenseNo"
                        name="DrivingLicenseNo"
                        className="form-control drivinglicenselos personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Driving License No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-drivinglicenseno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="PlateNo"
                        name="PlateNo"
                        className="form-control PlateNoss personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">Plate No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-plateno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <p className="personal_info_p vehicle_parti_para">
                  I hereby certify that all the above information in this
                  application is true and complete. I understand that any false
                  information will result in rejection of the employment
                  application or immediate termination of employment if hired.
                </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative empnamepersonal1">
                      <input
                        type="text"
                        id="Employeename_1"
                        name="EmployeeName-1"
                        className="form-control personalview fullname_personal common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="form-group relative empnamepersonal11"
                    >
                      <input
                        type="text"
                        id="Employeename1"
                        name="EmployeeName1"
                        className="form-control empnamepersonal111"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label ">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-EmployeeName1"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4 signature_part">
                    <p>Signature</p>
                  </div>
                  <div className="col-md-4 signature_part">
                    {/* <div className="form-group relative">
                    <input
                      type="Date"
                      id="Date"
                      name="Date"
                      className="form-control currentdate personalview"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">Date</span>
                  </div> */}
                    {/* <span
                    className="error-validation"
                    id="err-plateno"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span> */}

                    <p>Date</p>
                  </div>
                </div>
              </div>

              <div className="personal_info_part">
                <div className="Attachments">
                  <div className="table-wrapper-Attachments clearfix">
                    <div className="table-search personal_information_form">
                      <h3 className="contact-pg-title">Attachments</h3>
                    </div>
                  </div>
                  <table
                    className="table table-bordered"
                    id="cust-table-Attachments"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        <th className="pesonal_info_sno_th" scope="col">
                          #
                        </th>
                        <th className="pesonal_info_detail_th" scope="col">
                          Personal details Attachments Required
                        </th>
                        <th className="pesonal_info_field_th" scope="col">
                          Field{" "}
                        </th>

                        <th scope="col">Attached (Yes/No)</th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-Attachments">
                      <tr>
                        <td>1</td>
                        <td>
                          {" "}
                          <span>Updated Resume / CV </span>
                        </td>
                        <td>
                          <input
                            id="Updated_Resume"
                            className=" Updated Resume filedisablemode"
                            multiple
                            type="file"
                            autoComplete="off"
                            onChange={(e) =>
                              this.AddedAttachments(e, "Updated_Resume", "resume")
                            }
                          ></input>
                          {/* <span
                            className="error-validation"
                            id="err-Updated_Resume"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}

                          {/* <a
                            href={`${resumeurl}`}
                            style={{ display: "none" }}
                            className="resumeurlitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="resumedelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("resume")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          <span id="Updated_ResumefilesList"></span>
                          <div className="Updated_Resume_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="Updated_Resume-yes">
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Updated_Resumeyes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes1" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Updated_Resume-no">
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Updated_Resumeno"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>High-Quality Photo with white background</td>
                        <td>
                          <input
                            type="file"
                            id="High-QualityPhoto"
                            multiple
                            className="highqui filedisablemode"
                            autoComplete="off"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "High-QualityPhoto",
                                "photo"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${photourl}`}
                            style={{ display: "none" }}
                            className="photourlitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="photodelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("photo")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-QualityPhoto"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="High-QualityPhotofilesList"></span>
                          <div className="High-QualityPhoto_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="QualityPhoto-yes">
                            {/* <input
                            type="checkbox"
                            disabled
                            id="QualityPhotoyes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes2" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="QualityPhoto-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="QualityPhotono"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <span>Passport copy - Front Page </span>
                        </td>
                        <td>
                          <input
                            type="file"
                            id="passportcopy-frontpage"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "passportcopy-frontpage",
                                "passportcopyfrontpage"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${passportfronturl}`}
                            style={{ display: "none" }}
                            className="passportfrontitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="passportfrontdelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("passportfront")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-passportcopy"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="passportcopy-frontpagefilesList"></span>
                          <div className="passportcopy-frontpage_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="passportcopy-yes">
                            {/* <input
                            type="checkbox"
                            disabled
                            id="passportcopyyes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes3" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="passportcopy-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="passportcopyno"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>4</td>
                        <td>
                          {" "}
                          <span>Passport copy - Back (Last page) </span>
                        </td>

                        <td>
                          <input
                            type="file"
                            id="passportbackpage"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "passportbackpage",
                                "passportbackpage"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${passportbackurl}`}
                            style={{ display: "none" }}
                            className="passportbackitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="passportbacktdelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("passportback")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-passportbackpage"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="passportbackpagefilesList"></span>
                          <div className="passportbackpage_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="passportbackpage-yes"
                          >
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes4" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="passportbackpage-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>5</td>
                        <td>
                          {" "}
                          <span>Previous visa (If Applicable) </span>
                        </td>

                        <td>
                          {" "}
                          <input
                            type="file"
                            id="Previousvisa"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "Previousvisa",
                                "Previousvisa"
                              )
                            }
                          ></input>
                          {/* <a
                            href={`${Previousvisaurl}`}
                            style={{ display: "none" }}
                            className="perivousvisaitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="perivousvisadelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("privousvisa")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-Previousvisa"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="PreviousvisafilesList"></span>
                          <div className="Previousvisa_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="Previousvisa-yes">
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Previousvisayes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes5" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Previousvisa-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Previousvisano"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>
                          {" "}
                          <span>Previous emirates ID (If Applicable) </span>
                        </td>

                        <td>
                          {" "}
                          <input
                            type="file"
                            id="previous-emiratesid"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "previous-emiratesid",
                                "previousemiratesid"
                              )
                            }
                          ></input>
                          {/* <a
                            href={`${PreviousemiratesIDurl}`}
                            style={{ display: "none" }}
                            className="emiratesiditem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="emiratesiddelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("emirateid")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-emiratesid"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="previous-emiratesidfilesList"></span>
                          <div className="previous-emiratesid_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="emiratesid-yes">
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes6" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="emiratesid-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>
                          {" "}
                          <span>Insurance continuity letter(If Applicable) </span>
                        </td>
                        <td>
                          <input
                            type="file"
                            id="Insurance_continuity_letter"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "Insurance_continuity_letter",
                                "Insurancecontinuityletter"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${Insurancecontinuityletterurl}`}
                            target="_blank"
                            style={{ display: "none" }}
                            className="Insuranceletteritem"
                            data-interception="off"
                          >
                            click here
                          </a> */}

                          <span
                            className="Insurance_continuity_letterdelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary(
                                "Insurancecontinuityletter"
                              )
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-Insurance_continuity_letter"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="Insurance_continuity_letterfilesList"></span>
                          <div className="Insurance_continuity_letter_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="Insurance_continuity_letter-yes"
                          >
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Insurance_continuity_letteryes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes7" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Insurance_continuity_letter-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Insurance_continuity_letterno"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>8</td>
                        <td>
                          {" "}
                          <span>Sponsor's passport, visa (If Applicable) </span>
                        </td>
                        <td>
                          <input
                            type="file"
                            id="Sponsors_passportvisa"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "Sponsors_passportvisa",
                                "Sponsorspassportvisa"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${Sponsorpassportvisaurl}`}
                            style={{ display: "none" }}
                            className="Sponsorspassportvisaitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="Sponsorspassportvisadelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("Sponsorspassportvisa")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-Sponsors_passportvisa"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="Sponsors_passportvisafilesList"></span>
                          <div className="Sponsors_passportvisa_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="Sponsors_passportvisa-yes"
                          >
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Sponsors_passportvisayes"
                            name="YES"
                            checked
                          /> */}
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes8" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Sponsors_passportvisa-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="Sponsors_passportvisano"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="academic">
                  <div className="table-wrapper-Attachments clearfix">
                    <div className="table-search">
                      {/* <h3 className="contact-pg-title">
                  Attachments
                  </h3> */}
                    </div>
                  </div>
                  <table
                    className="table table-bordered"
                    id="cust-table-Attachmentsacademic"
                  >
                    <thead style={{ background: "#0047ab" }}>
                      <tr>
                        <th className="pesonal_info_sno_th" scope="col">
                          #
                        </th>
                        <th className="pesonal_info_detail_th" scope="col">
                          Academic details Attachments Required{" "}
                        </th>
                        <th className="pesonal_info_field_th" scope="col">
                          Field{" "}
                        </th>
                        <th scope="col">Attached (Yes/No)</th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-Attachments-academic">
                      <tr>
                        <td>9</td>
                        <td>
                          {" "}
                          <span>
                            Master /PG degree certificate(s) (If Applicable){" "}
                          </span>
                        </td>
                        <td>
                          <input
                            id="PG-degree"
                            className="Updated filedisablemode"
                            multiple
                            type="file"
                            autoComplete="off"
                            onChange={(e) =>
                              this.AddedAttachments(e, "PG-degree", "PGdegree")
                            }
                          ></input>

                          {/* <a
                            href={`${PGdegreeurl}`}
                            style={{ display: "none" }}
                            className="PGitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="pgdelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("pg")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-PG-degree"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="PG-degreefilesList"></span>
                          <div className="PG-degree_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="PG-degree-yes">
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes9" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="PG-degree-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Bachelor /UG degree certificate(s) </td>
                        <td>
                          <input
                            type="file"
                            id="HBachelor-UG-degree"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "HBachelor-UG-degree",
                                "HBachelorUGdegree"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${UGdegreeurl}`}
                            style={{ display: "none" }}
                            className="ugitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="ugdelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("ug")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-HBachelor-UG-degree"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="UG-degreefilesList"></span>
                          <div className="UG-degree_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="HBachelor-UG-degree-yes"
                          >
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes10" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="HBachelor-UG-degree-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>
                          <span>Higher secondary certificate(s) </span>
                        </td>
                        <td>
                          <input
                            type="file"
                            id="Highersecondary"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "Highersecondary",
                                "Highersecondary"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${Highersecondaryurl}`}
                            style={{ display: "none" }}
                            className="higheritem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="higherdelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("higher")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-Highersecondary"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="HighersecondaryfilesList"></span>
                          <div className="Highersecondary_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="Highersecondary-yes"
                          >
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes11" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Highersecondary-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>12</td>
                        <td>
                          {" "}
                          <span>High school certificate(s) </span>
                        </td>

                        <td>
                          <input
                            type="file"
                            id="Highschool"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(e, "Highschool", "Highschool")
                            }
                          ></input>

                          {/* <a
                            href={`${Highschoolurl}`}
                            style={{ display: "none" }}
                            className="highschoolitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="highschooldelete"
                            style={{ display: "none" }}
                            onClick={() =>
                              this.deletedocumentlibrary("highschool")
                            }
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-Highschool"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="Highschoolname_filesList"></span>
                          <div className="Highschool_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="Highschool-yes">
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes12" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="Highschool-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>13</td>
                        <td>
                          {" "}
                          <span>
                            Copy of all experience certificates as per CV{" "}
                          </span>
                        </td>
                        <td>
                          <input
                            id="allexperience"
                            type="file"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) =>
                              this.AddedAttachments(
                                e,
                                "allexperience",
                                "allexperience"
                              )
                            }
                          ></input>

                          {/* <a
                            href={`${allexpurl}`}
                            style={{ display: "none" }}
                            className="allexpitem"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="allexpdelete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("allexp")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-allexperience"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="allexperience_filesList"></span>
                          <div className="allexperience_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="allexperience-yes">
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes13" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="allexperience-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="allexperienceno"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>14</td>

                        <td>{" "}<span>National ID attachments{" "}</span></td>
                        <td >
                          <input
                            id="nationalid"
                            type="file"
                            multiple
                            autoComplete="off"
                            className="filedisablemode"
                            onChange={(e) => this.AddedAttachments(e, "nationalid", "nationalid")}
                          ></input>

                          {/* <a
                            href={`${nationalfile}`}
                            style={{ display: "none" }}
                            className="nationalid_item"
                            target="_blank"
                            data-interception="off"
                          >
                            click here
                          </a> */}
                          <span
                            className="nationalid_delete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("nationalid")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          {/* <span
                            className="error-validation"
                            id="err-nationalid"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span> */}
                          <span id="nationalid_filesList"></span>
                          <div className="nationalid_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="nationalid-yes">
                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yes14" style={{ color: "#00A36C" }}>YES</span>
                          </li>

                          <div id="nationalid-no">
                            {" "}
                            {/* <input
                            type="checkbox"
                            disabled
                            id="allexperienceno"
                            name="NO"
                            checked
                          /> */}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                  <button
                    className="dashboard_submit_btn personal-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}
                  >
                    Submit
                  </button>

                  <button
                    style={{ display: "none" }}
                    className="dashboard_submit_btn personal-Update"
                    type="submit"
                    onClick={() => this.Updatepersonalinformationdata()}
                  >
                    Update
                  </button>
                  <button
                    style={{ display: "none" }}
                    className="dashboard_cancel_btn btn-cancel print-btnpersonal"
                    type="submit"
                    onClick={() => this.Printthis()}
                  >
                    Print
                  </button>

                  {GlobalFormOpenedMode == "New" && (
                    <button
                      id="btn-employe-newpage"
                      className="dashboard_submit_btn btn-cancel"
                      type="reset"
                    >
                      <a
                        data-interception="off"
                        target="_self"
                        href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView"
                      >
                        Cancel
                      </a>
                    </button>
                  )}

                  {GlobalModes == "Edit" && (
                    <button
                      id="btn-hr-editviewpagepersonal"
                      className="dashboard_submit_btn btn-cancel"
                      type="reset"
                    >
                      <a
                        data-interception="off"
                        target="_self"
                        href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`"
                      >
                        Cancel
                      </a>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>


        </div>


        <div id="dashboard_right-print-pi" style={{ display: "none" }}>
          <div className="dashboard_right_heading">
            {handler.state.Dynamiclogo &&
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
            <img
              id="print-imgpersonalitemid"
              className="itemidimgpersonal"
              style={{ display: "none", height: "50px" }}
              src={`${ImageSrcpersonal}`}
              alt="error"
            ></img>

            <div className="header-title-units">
              <span>Personal information</span>
              <ul>
                <li>Control Number: <b id="print-Control-Number"></b></li>
                <li>Version: <b id="print-Version-Number"></b></li>
              </ul>

            </div>

          </div>

          <div className="dashboard_right_ffamily">
            <div className="personal_info_top">
              {/* <div className="personal_info_part">
          
          <div className="row form row_top">
                 <div className="col-md-4">
                   <div className="form-group relative">
                   <span  id="print-Control-Number"  className="print-control">
                
                </span>
                     <span className="floating-label ">
                     Control Number
                     </span>
                   </div>
                 </div>
                 <div className="col-md-4">
                   <div className="form-group relative">
                     <span  id="print-Version-Number"  className="print-control">
                
                   </span>
                     <span className="floating-label">
                      Version Number
                     </span>
                   </div>
                 </div>
               </div>
           </div> */}
              <div className="personal_info_part">
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="surenmaepersonal"
                        className="surename print-control print-surename-personal personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Titlesurename} */}
                      </span>
                      <span className="floating-label">
                        Title <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Titlesurename"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="personalwithoutedit form-group relative">
                      <input
                        type="text"
                        id="FullName"

                        name="FullName"
                        className="form-control fullname_personal full-nameitem personalview common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Full Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="prsonalwithedit form-group relative"
                    >
                      <span
                        // type="text"
                        id="dynamicFullName"
                        // name="FullName"
                        className="print-control  print-personalvalue"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Full Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation err-fullname-err"
                      id="err-fullname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-EmployeeCategory"
                        className="print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Employeecategorys} */}
                      </span>
                      <span className="floating-label ">
                        Employee Category <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-EmployeeCategory"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="firstnamecurrent form-group relative">
                      <input
                        type="text"
                        id="PersonalFirstName"

                        name="FirstName"
                        className="form-control personal_firstname personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        First Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="firstnamedynamic form-group relative"
                    >
                      <span
                        //  type="text"
                        id="FirstNames"
                        // name="FirstName"
                        className="print-control print-empfirstname"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        First Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-FirstName"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="print-PersonalMiddleName"
                        //name="MiddleName"
                        className="print-control personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Middle Name
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Middlename"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="Lastnamenamecurrent form-group relative">
                      <input
                        type="text"
                        id="empLastname"

                        name="Lastname"
                        className="form-control  personal_lastname personalview"
                        autoComplete="off"
                      />
                      <span className="floating-label ">
                        Last Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="Lastnamenamedynamic form-group relative"
                    >
                      <span
                        //  type="text"
                        id="Lastname"
                        //  name="Lastname"
                        className="print-control print-personalLastname"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Last Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Lastname"
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
                        id="PlaceofBirth"
                        //  name="PlaceofBirth"
                        className="print-control print-pob personalview"
                      />
                      <span className="floating-label ">
                        Place of Birth <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofbirth"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="date"
                        id="DateofBirth"
                        // name="DateofBirth"
                        // max={moment().format("YYYY-MM-DD")}
                        className="print-control print-dob dobpersonal personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Date of Birth <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation errpresonalbirth"
                      id="err-dateofbirth"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-PersonalGender"
                        className="print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option> */}
                      </span>
                      <span className="floating-label ">
                        Gender <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Genderpersonal"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input 
type="text"
id="CurrentNationality"
name="CurrentNationality"
className="form-control Current-Nationality"
autoComplete="off"
/>  */}

                      <span
                        id="CurrentNationality"
                        className="print-Current-Nationality print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Allcountryname} */}
                      </span>
                      <span className="floating-label ">
                        Current Nationality <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-currentnationality"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
type="text"
id="PreviousNationality"
name="PreviousNationality"
className="form-control Previous-Nationality"
autoComplete="off"
/> */}
                      <span
                        id="PreviousNationality"
                        className="print-Previous-Nationality print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Allcountryname} */}
                      </span>
                      <span className="floating-label ">
                        Previous Nationality <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-PreviousNationality"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
type="text"
id="Religion"
name="Religion"
className="form-control religions personalview"
autoComplete="off"
/>
<span className="floating-label ">
Religion<i className="required">*</i>
</span> */}

                      <span
                        id="Religion"
                        className="print-religions print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Religionsitem} */}
                      </span>


                      <span className="floating-label ">
                        Religion <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-religion"
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
                        //  type="text"
                        id="Section"
                        // name="Section"
                        className="print-control print-sections personalview"
                      //  autoComplete="off"
                      />
                      <span className="floating-label ">
                        Section Section (Religion)
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-section"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="date"
                        id="Entered"
                        //  name="Entered"
                        className="print-control print-entereds personalview"
                      //  autoComplete="off"
                      //max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">
                        Entered The Country On<i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-entered"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="Port"
                        // name="Port"
                        className="print-control print-ports personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Port of Entry<i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-port"
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
                        id="print-country-code"
                        className="print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Countrycodesitem} */}
                      </span>
                      <span className="floating-label ">
                        Country Code <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycode"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="ContactNumber"
                        // name="ContactNumber"
                        className="print-control print-contactnumbers personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Contact Number <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation err-formatphonenumberpersonalContactNumber"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                    <span
                      className="error-validation"
                      id="err-contactnumber"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="SponsorName"
                        //   name="SponsorName"
                        className="print-control print-SponsorNames personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{this.state.SponserNamesData && this.state.SponserNamesData.map(function (item, key) {
return (
<option value={`${item.Title}`}>{item.Title}</option>
)
})} */}
                      </span>
                      <span className="floating-label">
                        Sponsor Name
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-sponsorname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">

                      <span id="print-personal-blood-group"
                        className="print-control personalview personalviewclasscommom">

                      </span>
                      <span className="floating-label ">
                        Blood Group <i className="required">*</i>
                      </span>
                    </div>

                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">

                      <span id="print-emp-work-status"
                        className="print-control personalview personalviewclasscommom">

                      </span>
                      <span className="floating-label ">
                        Employee Status <i className="required">*</i>
                      </span>
                    </div>

                  </div>
                </div>

              </div>
              <div className="personal_info_part">
                <div className="passport_heading_title personal_information_title">
                  <h3> Passport & Residence Particulars </h3>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="DocumentNo"
                        className="print-control print-documentnos personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label">
                        Passport/Travel Document No <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-documentno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="PlaceofIssue"
                        // name="PlaceofIssue"
                        className="print-control print-pos personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">
                        Place of Issue <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofissue"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="date"
                        id="print-DateofIssue"
                        // name="DateofIssue"
                        className="print-control dos personalview"
                      // autoComplete="off"
                      // max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">
                        Date of Issue <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateofissue"
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
                        // type="date"
                        id="print-DateofExpiry"
                        className="print-control dos personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label">Date of Expiry</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateofexpiry"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="ResidenceNo"
                        // name="ResidenceNo"
                        className="print-control print-residenceNos personalview"
                      //autoComplete="off"
                      />
                      <span className="floating-label ">
                        Visa Residence No
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-residenceno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div>

              <div className="print-professional-qual personal_info_part perfactional_qualification ">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title ">
                      Professional Qualification/Certification Details{" "}
                    </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-block4qualification"
                  >
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name of the University/Institute</th>
                        <th scope="col">
                          Course/Certification & Specialization{" "}
                        </th>
                        <th scope="col">Year of graduation</th>
                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamic3">
                      <tr id="print-Universityqualification-tr">
                        <td>
                          <input type="hidden" id="hdn-personal-qualif-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-Name-qualification"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-University"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="tble-txt-year_of_grt"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn  Add-new-personal"
                    onClick={(e) => this.QualificationAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="Employment_history add_new_row_btn personal_info_part print_emphistory">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">Employment History </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-block-employmentHistory"
                  >
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th className="print_org_table" scope="col">Organization Name & Address </th>
                        <th className="print_designation_table" scope="col">Designation </th>
                        <th className="print_yoe_table" scope="col">Year Of Exprience</th>
                        <th className="print_fromto_table" scope="col">From - To (MM-YYYY) </th>
                        {/* <th scope="col">To (mm/yyyy) </th> */}
                        <th className="print_reason_table" scope="col">Reason For Leaving</th>
                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamic3_Employment_History">
                      {/* <tr id="print-employmenthistory-tr">
                        <td>
                          <input type="hidden" id="hdn-personaltab-emp-history-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-OrganizationName"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-OrganizationDesignation"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="month"
                            id="tble-txt-Organization-date-From"
                            className="form-control"
                            autoComplete="off"
                            max={moment().format("YYYY-MM")}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="month"
                            id="tble-txt-Organization-date-To"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Years_of_Experience"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Reason_for_leaving"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmploymentHistoryAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="perfactional_qualification add_new_row_btn personal_info_part page-break-policyack-decleration">
                <div className="table-wrapper-date clearfix print_research">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">
                      Research & Publication Details{" "}
                    </h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-blockResearch"
                  >
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name of Publication </th>
                        <th scope="col">Category </th>
                        <th scope="col">Year </th>

                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamicResearch">
                      {/* <tr id="print-Research-tr">
                        <td>
                          <input type="hidden" id="hdn-personaltab-reserch-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-name-Research"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Category-Research"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-year-Research"
                            className="form-control"
                            autoComplete="off"
                            maxLength={4}
                          ></input>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.ResearchPublicationDetailsAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "30px" }} className="print-emp-reference-det perfactional_qualification add_new_row_btn personal_info_part ">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    <h3 className="contact-pg-title">
                      Employee Reference Details (Last 3 Employers){" "}
                    </h3>
                    <span>
                      Note: References may be used for background verification
                      purpose , please add country code with the contact number
                    </span>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    id="cust-table-blockEmployeeReference"
                  >
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name of Person & Designation</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Contact Number</th>

                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamicemployreference">
                      <tr id="print-empreference-tr">
                        {/* <td>
<input
id="tble-txt-row-order"
className="s_no"
type="text"
disabled
autoComplete="off"
value="1"
></input>
</td> */}
                        <td>
                          <input type="hidden" id="hdn-personal-ref-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-Name-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Email-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactno-ResearchDetails"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmployeeReferenceDetailsAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>
              <div className="personal_info_part print-martial">
                <div className="personal_information_title">
                  <h3>Marital Status </h3>
                  <p>(Please enter the below required details of your Spouse, If Applicable)</p>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-MaritalStatus"
                        className="Status form-control personalview personalviewclasscommom"
                      >

                      </span>
                      <span className="floating-label ">
                        Marital Status <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-maritalstatus"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      {/* <input
type="text"
id="BloodGroup"
name="BloodGroup"
className="form-control bloodgroups"
autoComplete="off"
/> */}
                      <span
                        id="BloodGroup"
                        className="print-bloodgroups print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{AllBloodgrooup} */}
                      </span>
                      <span className="floating-label ">
                        Blood Group
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-bloodgroup"
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
                        id="NameofSpouse"
                        className="print-control print-nos personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label">Name of Spouse </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofspouse"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="Nationality2"
                        className="print-Nationalitys2 print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Allcountryname} */}
                      </span>
                      <span className="floating-label ">Nationality </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nationality2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="text"
                        id="PlaceofBirth2"
                        // name="PlaceofBirth2"
                        className="print-control print-pob2 personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Place of Birth </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofbirth2"
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
                        //type="date"
                        id="DateofBirth2"
                        // max={moment().format("YYYY-MM-DD")}
                        className="print-control print-dob2 personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">Date of Birth</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-DateofBirth2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="PlaceofWork"
                        className="print-control print-pow personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">Place of Work </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-placeofwork"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Occupation2"
                        //   name="Occupation2"
                        className="print-control print-Occupations2 personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Occupation </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-occupation2"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
              </div>

              <div className="personal_info_part page-break-policyack-decleration">
                <div className="add_new_row_btn print-childrentable">
                  <div className="table-wrapper-date clearfix ">
                    <div className="table-search personal_information_title">
                      <h3 className="contact-pg-title">Children</h3>
                      <p>(Please add - Only If applicable)</p>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered" id="cust-table-block">
                      <thead>
                        <tr>
                          <th className="print-name-child" scope="col"> Name </th>
                          <th className="PC_gender" scope="col"> Gender </th>
                          <th className="print-dob-child" scope="col"> D.O.B </th>
                          <th scope="col"> Passport No </th>
                          <th className="print-emirate-child" scope="col"> Emirate ID No </th>
                          {/* <th className="Action-columnviewmode" scope="col"></th> */}
                        </tr>
                      </thead>

                      <tbody id="print-tble-tbody-dynamic">
                        {/* <tr id="print-childlist-tr">

                          <td>
                            <input type="hidden" id="hdn-personaltab-itm-id" value="null"></input>
                            <input
                              type="text"
                              id="tble-txt-requested"
                              className="print-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <select
                              id="print-tble-ChildGender"
                              className="print-control personalview personalviewclasscommom">
                              <option value="-">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="date"
                              id="tble-child-dob"
                              max={moment().format("YYYY-MM-DD")}
                              className="print-control print-dob dobpersonal personalview"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              id="tble-txt-child-passport-no"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              id="tble-txt-child-emirate-no"
                              className="form-control"
                              autoComplete="off"
                            ></input>
                          </td>
                          <td></td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="add-btn-wrap clearfix">
                    <button
                      type="submit"
                      className="Add-new-btn Add-new-personal"
                      onClick={(e) => this.AddNewRow(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>
              </div>

              <div className="personal_info_part print-fatherform">
                <div className="personal_info_parag">
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="FathersName"
                          className="print-control print-FathersNames personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label">
                          Father's Name <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-fathersname"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="Nationality3"
                          className="print-Nationalitys3 print-control personalview personalviewclasscommom"
                        >
                          {/* <option value="">Select</option>
{Allcountryname} */}
                        </span>
                        <span className="floating-label ">
                          Nationality (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Nationality3"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //    type="text"
                          id="PlaceofBirth3"
                          //  name="PlaceofBirth3"
                          className="print-control print-pobs3 personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Place of Birth (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-placeofbirth3"
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
                          // type="date"
                          id="DateofBirth3"
                          className="print-control print-dobs3 personalview"
                        // autoComplete="off"
                        // max={moment().format("YYYY-MM-DD")}
                        />
                        <span className="floating-label">Date of Birth (Father's) <i className="required">*</i></span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-dateofbirth3"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //  type="text"
                          id="Occupation3"
                          //name="Occupation3"
                          className="print-control print-Occupations3 personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Occupation (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-occupation3"
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
                          //     name="HomeAddress3"
                          id="HomeAddress3"
                          className="print-control print-homeaddress3 personalview"
                        //     cols={40}
                        //    style={{ resize: "none" }}
                        ></span>
                        <span className="floating-label ">
                          Home Address (Father's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-homeaddress3"
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
                          id="MothersName"
                          className="print-control print-MothersNames personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label">
                          Mother's Name <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-mothersname"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Nationalityfour"
                          className="Nationalitys4 print-control personalview personalviewclasscommom"
                        >
                          {/* <option value="">Select</option>
{Allcountryname} */}
                        </span>
                        <span className="floating-label ">
                          Nationality (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Nationalityfour"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //  type="text"
                          id="PlaceofBirth4"
                          //name="PlaceofBirth4"
                          className="print-control print-pobs4 personalview"
                        //autoComplete="off"
                        />
                        <span className="floating-label ">
                          Place of Birth (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-placeofbirth4"
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
                          // type="date"
                          id="DateofBirth4"
                          className="print-control print-dobs4 personalview"
                        // autoComplete="off"
                        // max={moment().format("YYYY-MM-DD")}
                        />
                        <span className="floating-label">Date of Birth (Mother's) <i className="required">*</i></span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-dateofbirth4"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="Occupation4"
                          // name="Occupation4"
                          className="print-control print-Occupations4 personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Occupation (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-occupation4"
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
                          //  name="HomeAddress4"
                          id="HomeAddress4"
                          className="print-control print-HomeAddresss4 personalview"
                        //  cols={40}
                        //  style={{ resize: "none" }}
                        ></span>
                        <span className="floating-label ">
                          Home Address (Mother's) <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-homeaddress4"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="personal_info_part print-hca page-break-policyack-decleration">

                <div className="personal_info_parag print_hca_pi">
                  <div className="personal_information_title">
                    <h3>Home Country Address</h3>
                  </div>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-country-codehomecountry"
                          className="print-control personalview personalviewclasscommom"
                        >
                          {/* <option value="">Select</option>
{Countrycodesitem} */}
                        </span>
                        <span className="floating-label ">
                          Country Code<i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-countrycode2"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //type="text"
                          id="CountryNumber"
                          className="print-control print-CountrysNumbers personalview home_countrynumbers"
                        //autoComplete="off"
                        />
                        <span className="floating-label">
                          Home Country Number<i className="required">*</i>
                        </span>
                      </div>

                      <span
                        className="error-validation err-homecountry-err-format"
                        style={{ color: "red", display: "none" }}
                      >
                        Characters are not allowed
                      </span>
                      <span
                        className="error-validation home_counteryno-err"
                        id="err-countrynumber"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="EmailID"
                          // name="EmailID"
                          className="print-control print-emailsids personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Email ID <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="erremailpersonal"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>

                      <span
                        className="error-validation"
                        id="invalid-email"
                        style={{ color: "red", display: "none" }}
                      >
                        Please Provide a Valid Email
                      </span>
                    </div>
                  </div>
                  {/* <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="Job_Applied_For"
                          // name="JobAppliedFor"
                          className="print-control print-jobappliedfors personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Job Applied For <i className="required">*</i>{" "}
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-JobAppliedFor"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div> */}

                  <div className="">
                    <p className="personal_info_p print_question_one">
                      {" "}
                      Have you ever applied / worked with{" "}
                      <span id="dynamicbussiness-unit-name">{businessdynamicuserunit}</span> or other units of <span id="dynamicbussiness-unit-name"> {businessdynamicuserunit}</span>
                      ? <i className="required">*</i>
                    </p>
                  </div>

                  <div className="row form">
                    <div className="col-md-2">
                      <div className="form-group relative">
                        <div className="form-check">
                          {/* <input
                            className="print-YesHaveyoueverapplied"
                            type="checkbox"
                            id="Yes"
                            name="Yes"
                            value="Yes"
                          /> */}
                          <span className="print-YesHaveyoueverapplied"></span>
                          {/* <span className="form-check-label">Yes</span> */}
                        </div>
                      </div>

                    </div>
                    <div className="col-md-2">
                      <div className="form-group relative">
                        <div className="form-check">
                          {/* <input
                            className="print-noHaveyoueverapplied"
                            type="checkbox"
                            id="No"
                            name="No"
                            value="something"
                          /> */}
                          <span className="print-noHaveyoueverapplied"></span>
                          {/* <span className="form-check-label">No</span> */}
                        </div>
                      </div>
                      <span
                        className="error-validation"
                        id="err-no"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="col-md-4 print-Company-name-position"
                    >
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="NameofCompany"
                          // name="NameofCompany"
                          className="print-control print-NameofCompanys personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">
                          Name of Company <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-nameofcompany"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="col-md-4 print-Company-name-position"
                    >
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="Position"
                          // name="Position"
                          className="print-control print-positions personalview"
                        // autoComplete="off"
                        />
                        <span className="floating-label ">Position <i className="required">*</i></span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-position"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row form">
                  <p className="personal_info_p print_question_two">
                    I hereby declare the following employees that are related to
                    me who are working with <span id="dynamicbussiness-unit-name"> {businessdynamicuserunit}</span>
                  </p>
                  <div className="col-md-4" id="print-spouse-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          //   className="personalview"
                          type="checkbox"
                          id="print-spouse"
                          name="Spouse"
                          value="Spouse"
                        /> */}
                        <span id="print-spouse"></span>
                        {/* <span className="form-check-label">Spouse</span> */}
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4" id="print-Brother-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          className="Brothers"
                          type="checkbox"
                          id="print-Brother"
                          name="Brother"
                          value="Brother"
                        /> */}
                        <span id="print-Brother"></span>
                        {/* <span className="form-check-label">Brother</span> */}
                      </div>
                    </div>

                  </div>

                  <div className="col-md-4" id="print-Sister-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          // className="personalview"
                          type="checkbox"
                          id="print-Sister"
                          name="Sister"
                          value="Sister"
                        />
                        <span className="form-check-label">Sister</span> */}
                        <span id="print-Sister"></span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4" id="print-Cousin-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          className="ersonalview"
                          type="checkbox"
                          id="print-Cousin"
                          name="Cousin"
                          value="Cousin"
                        />
                        <span className="form-check-label">Cousin</span> */}
                        <span id="print-Cousin"></span>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4" id="print-AnyOtherCloseRelative-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          //  className="personalview"
                          type="checkbox"
                          id="print-AnyOtherCloseRelative"
                          name="Any Other Close Relative"
                          value="AnyOtherCloseRelative"
                        />
                        <span className="form-check-label">
                          Any Other Close Relative
                        </span> */}
                        <span id="print-AnyOtherCloseRelative"></span>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4" id="print-Friend-div">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          //  className="personalview"
                          type="checkbox"
                          id="print-Friend"
                          name="Friend"
                          value="Friend"
                        />
                        <span className="form-check-label">Friend</span> */}
                        <span id="print-Friend"></span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-friend"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="row form" id="print-row-no-relative">




                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        {/* <input
                          //  className="personalview"
                          type="checkbox"
                          id="print-NoRelative"
                          name="NoRelative"
                          value="someNoRelativething"
                        />
                        <span className="form-check-label">No Relative</span> */}
                        <span id="print-NoRelative"></span>
                      </div>
                    </div>
                    <span
                      className="error-validation"
                      id="err-norelative"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div id="if-no-relative-hide" className="perfactional_qualification add_new_row_btn">
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search personal_information_title">

                      <span>
                        <p className="personal_info_p print-note_pi">
                          Note: Please specify name & work location of relative/friend in the <span id="bussiness-unit-name">{officename}</span> <span style={{ display: "none" }} className="dynamicbussiness-unit-name"> {businessdynamicuserunit}</span> </p>
                      </span>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="cust-table-relattivefriend-table"
                    >
                      <thead style={{ background: "#0047ab" }}>
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col">Name </th>
                          <th scope="col">Work Location</th>
                          <th className="Action-columnviewmode" scope="col"></th>
                        </tr>
                      </thead>
                      <tbody id="print-tble-tbody-relative-friend">
                        <tr id="print-friend-relative-tr">

                          <td>
                            <span id="print-hdn-personal-relativefriend-itm-id" ></span>
                            <span
                              //   type="text"
                              id="relative-friend-name"
                              className="form-control"
                            //  autoComplete="off"
                            ></span>
                          </td>
                          <td>
                            <span
                              //     type="text"
                              id="relative-friend-worklocation"
                              className="form-control"
                            //   autoComplete="off"
                            ></span>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="add-btn-wrap clearfix">
                    <button
                      type="submit"
                      className="Add-new-btn Add-new-personal"
                      onClick={(e) => this.addreletivefriendrow(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>

              </div>

              <div style={{ marginTop: "30px" }} className="personal_info_part">
                <div className="personal_information_title">
                  <h3>Emergency Contact Person In UAE</h3>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="cust-table-block2">
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Work Location</th>
                        <th scope="col">Contact Number</th>
                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamicEmergencyContact">
                      <tr id="print-emergency-tr">
                        <td>
                          <input type="hidden" id="hdn-personalcontactperson-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-name2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-worklocation2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactnumber2"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) => this.EmergencyContactPersonInUAEAddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="add_new_row_btn personal_info_part personal_info_part">
                <div className="personal_information_title">
                  <h3>Emergency Contact Person Outside UAE</h3>
                  <span>Note: please add country code with the contact number.</span>
                </div>
                <div className="table-wrapper-date clearfix">
                  <div className="table-search"></div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="cust-table-block3">
                    <thead>
                      <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Work Location</th>
                        <th scope="col">Contact Number</th>
                        {/* <th className="Action-columnviewmode" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-dynamicemergencycontactpepersonoutside">
                      <tr id="print-outside-tr">
                        <td>
                          <input type="hidden" id="hdn-personalcontperson-out-itm-id" value="null"></input>
                          <input
                            type="text"
                            id="tble-txt-name3"
                            className="form-control Emergencyname"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-relation3"
                            className="form-control Emergencyrelation"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-contactnumber3"
                            className="form-control  Emergencycontactno"
                            autoComplete="off"
                          ></input>

                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="add-btn-wrap clearfix">
                  <button
                    type="submit"
                    className="Add-new-btn Add-new-personal"
                    onClick={(e) =>
                      this.EmergencyContactPersonOutsideAddNewRow(e)
                    }
                  >
                    Add New Row
                  </button>
                </div>
              </div>
              <div className="personal_info_part print-address Dynamic-add-class-address">
                <div className="personal_information_title add_new_row_btn">
                  <h3>Address: If Currently Living In UAE</h3>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Emirate"
                        className="print-control print-Emirates personalview"
                      //   autoComplete="off"
                      //   min={15}
                      //   max={15}
                      />
                      <span className="floating-label">Emirate</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-emirate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation"
                      id="err-emirate-wrong-format"
                      style={{ color: "red", display: "none" }}
                    >
                      Please enter valid emirate id.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Street"
                        //   name="Street"
                        className="print-control print-Streets personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Street</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-street"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Owner"
                        //   name="Owner"
                        className="print-control print-Owners personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Owner</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Owner"
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
                        id="FlatNo"
                        className="print-control print-FlatNos personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">Flat No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-flatno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="Plot"
                        //   name="Plot"
                        className="print-control print-plots personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Plot</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-plot"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="PostBox"
                        //   name="PostBox"
                        className="print-control print-PostBoxs personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Post Box</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-postbox"
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
                        id="TelephoneNo"
                        className="print-control print-telephonenos personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">Telephone No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-telephoneNo"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation"
                      id="err-personaltelephoneformat"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-country-codeMobileNo"
                        className="print-control personalview personalviewclasscommom"
                      >
                        {/* <option value="">Select</option>
{Countrycodesitem} */}
                      </span>
                      <span className="floating-label ">Country Code</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-countrycode"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="MobileNo"
                        // name="MobileNo"
                        className="print-control print-MobileNos personalview"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Mobile No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-mobileno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                    <span
                      className="error-validation err-mobilenouae"
                      style={{ color: "red", display: "none" }}
                    >
                      Characters are not allowed
                    </span>
                  </div>
                </div>
              </div>

              <div className="personal_info_part page-break-policyack-decleration">
                <div className="Licence-status print_ls">
                  <div className="row form">
                    <h3>License Status</h3>
                    <div className="col-md-4">
                      <div className="form-group relative">

                        <span id="print-Doh-license"></span>
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                      <div className="form-group relative">
                       
                          <span  id="print-Moh-license" ></span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                       
                         <span  id="print-Dha-license" ></span>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="LicenseNo"
                        className="print-control print-LicenseNos personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">License Number</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-licenseno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="date"
                        id="IssueDate"
                        //   name="IssueDate"
                        className="print-control print-IssueDates personalview"
                      //   autoComplete="off"
                      //   max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label ">Issue Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-issuedate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="date"
                        id="ExpiryDate"
                        //   name="ExpiryDate"
                        className="print-control print-ExpiryDates personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Expiry Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-expirydate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div></div>
                </div>

                <div className="new_registration">
                  <div className="row form" id="Print-new-reg">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <div className="form-check">
                          {/* <input
                              className="NewRegistrations"
                              type="checkbox"
                              id="print-NewRegistration"
                              name="new"
                              value="NewRegistration"
                            /> */}
                          {/* <span className="form-check-label">
                              New Registration
                            </span> */}
                          <span id="print-NewRegistration"></span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <div className="pag">
                <div className="print-dataflow">
                  <ul>
                    <li>
                      <div className="row form">
                        <h4>  <h4> If Dataflow Completed </h4></h4>
                      </div>

                      <div className="row form country_checkbox">

                        <div className="col-md-4">
                          <div className="form-group relative">
                            <div className="form-check">
                              {/* <input
                                className="print-dataflowYes"
                                type="checkbox"
                                id="print-Yes"
                                name="Yes"
                                value="something"
                                onClick={() => this.dataflowchecknoxchecking()}
                              />
                              <span className="form-check-label">
                                Yes
                              </span> */}
                              <span className="print-dataflowYes"></span>
                              <span className="print-dataflowno"></span>
                            </div>
                            {/* <span className="floating-label">
                            If Dataflow Completed
                            </span> */}
                          </div>

                        </div>
                        {/* <div className="col-md-4">
                          <div className="form-group relative">
                            <div className="form-check">
                              
                             
                            </div>
                          </div>

                        </div> */}
                        <div
                          style={{ display: "none" }}
                          className="col-md-4  ifdataflow-yes"
                        >
                          <div className="form-group relative">
                            <span
                              id="print-provide-the-same"
                              className="print-control"
                            ></span>
                            <span className="floating-label ">
                              If Yes , provide the same <i className="required">*</i>
                            </span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-provide-the-same"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>


                      </div>
                    </li>
                    <li id="doh-remove" style={{ display: "none" }} className="dohpasskey-kindaly-provide">
                      <h4 className="doh_passed_key">
                        If DOH Passed Kindly Provide:
                      </h4>
                      <div className="row form">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            <span
                              // type="text"
                              id="print-UserName"
                              //  name="UserName"
                              className="form-control usersnames personalview"
                            // autoComplete="off"
                            />
                            <span className="floating-label ">UserName  <i className="required">*</i></span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-username"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                        <div className="col-md-4">
                          <div id="password-hide" className="form-group relative">
                            <span
                              //  type="password"
                              id="print-Password"
                              //   name="Password"
                              className="form-control Passwords personalview"
                            // autoComplete="off"
                            />
                            <span className="floating-label ">Password <i className="required">*</i></span>
                          </div>

                          <div style={{ display: "none" }} id="password-show" className="form-group relative">
                            <span
                              id="Password-dynamic"
                              className="form-control Passwords-dynamic personalview"
                            ></span>
                            <span className="floating-label ">Password <i className="required">*</i></span>
                          </div>
                          <span
                            className="error-validation"
                            id="err-password"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                      </div>
                    </li>
                    <li id="dha-mha-remove" style={{ display: "none" }} className="moh-dha-Attachment-hide-show">
                      <p className="personal_info_p">
                        If MOH or DHA please attach Certificate or Eligibility
                        letter <i className="required">*</i>
                      </p>

                      <div className="row form">
                        <div className="col-md-4">
                          <div className="form-group relative">
                            {/* <input
                              type="file"
                              id="print-moh_dha_lience"
                              name="file"
                              className="form-control  personalview"
                              autoComplete="off"
                              onChange={(e) => this.AddedAttachments(e, "moh_dha_lience", "mohdhalience")}
                            /> */}
                            {/* <span className="floating-label ">Licence</span> */}
                          </div>
                          <p
                            className="error-validation"
                            id="err-moh-err-file"
                            style={{ marginTop: "20px", color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </p>

                          <li>

                            <a
                              href={`${printlicencefile}`}
                              style={{ display: "none" }}
                              className="licenceitem"
                              target="_blank"
                              data-interception='off'
                            >
                              {/* click here */}
                            </a>

                            <span id="upload_licencefile"></span>

                            <li style={{ display: "none" }} id="uploadedlicence-yes">

                              {/* <img
                                className="attactment-img"
                                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                                alt="error"
                              ></img> */}
                              <span className="yeslicence">YES</span>
                            </li>
                          </li>
                          {/* <div id="uploaded_licence-no">

                          <span>No</span>
                        </div> */}
                        </div>
                      </div>

                    </li>
                  </ul>
                </div>
                <div className="vehicle-particulars">
                  <h4> Vehicle Particulars (If In UAE)</h4>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="print-DrivingLicenseNo"
                        //   name="DrivingLicenseNo"
                        className="print-control print-drivinglicenselos personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Driving License No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-drivinglicenseno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //   type="text"
                        id="print-PlateNo"
                        //   name="PlateNo"
                        className="print-control print-PlateNoss personalview"
                      //   autoComplete="off"
                      />
                      <span className="floating-label ">Plate No</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-plateno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <p className="personal_info_p">
                  I hereby certify that all the above information in this
                  application is true and complete. I understand that any false
                  information will result in rejection of the employment
                  application or immediate termination of employment if hired.
                </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative empnamepersonal1">
                      <span
                        //   type="text"
                        id="print-Employeename_1"
                        //   name="EmployeeName-1"
                        className="form-control personalview fullname_personal common_fullname_disable"
                      //  autoComplete="off"

                      />
                      <span className="floating-label ">Employee Name</span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="form-group relative empnamepersonal11"
                    >
                      <span
                        //type="text"
                        id="print-Employeename1"
                        // name="EmployeeName1"
                        className="print-control print-empnamepersonal111"
                      // autoComplete="off"
                      />
                      <span className="floating-label ">Employee Name</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-EmployeeName1"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>
                <div className="page-break-policyack-decleration">


                  <div className="row form">
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
                  </div>
                </div>
              </div>



              <div className="personal_info_part">
                <div style={{ marginTop: "30px", pageBreakAfter: "always" }} className="Attachments">
                  <div className="table-wrapper-Attachments clearfix">
                    <div className="table-search personal_information_form">
                      <h3 className="contact-pg-title">Attachments</h3>
                    </div>
                  </div>
                  <table
                    className="table table-bordered"
                    id="cust-table-Attachments"
                  >
                    <thead>
                      <tr>
                        <th className="pesonal_info_sno_th" scope="col">#</th>
                        <th className="pesonal_info_detail_th" scope="col">Personal details Attachments Required</th>
                        <th className="pesonal_info_field_th" scope="col">File Location </th>

                        <th scope="col">Attached (Yes/No)</th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-Attachments">
                      <tr>
                        <td>1</td>
                        <td>
                          {" "}
                          <span>Updated Resume / CV </span>
                        </td>
                        <td>

                          <div className="print-Updated_Resume_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-Updated_Resume-yes">

                            <span className="yes1">YES</span>
                          </li>

                          <div id="print-Updated_Resume-no">
                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>High-Quality Photo with white background</td>
                        <td>
                          <div className="print-High-QualityPhoto_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-QualityPhoto-yes">
                            <span className="yes2">YES</span>
                          </li>

                          <div id="print-QualityPhoto-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <span>Passport copy - Front Page </span>
                        </td>
                        <td>
                          <div className="print-passportcopy-frontpage_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-passportcopy-yes">

                            <span className="yes3">YES</span>
                          </li>

                          <div id="print-passportcopy-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>4</td>
                        <td>
                          {" "}
                          <span>Passport copy - Back (Last page) </span>
                        </td>
                        <td>
                          <div className="print-passportbackpage_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="print-passportbackpage-yes"
                          >

                            <span className="yes4">YES</span>
                          </li>

                          <div id="print-passportbackpage-no">
                            {" "}
                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>5</td>
                        <td>
                          {" "}
                          <span>Previous visa (If Applicable) </span>
                        </td>
                        <td>
                          <div className="print-Previousvisa_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-Previousvisa-yes">

                            <span className="yes5">YES</span>
                          </li>

                          <div id="print-Previousvisa-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>
                          {" "}
                          <span>Previous emirates ID (If Applicable) </span>
                        </td>
                        <td>
                          <div className="print-previous-emiratesid_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-emiratesid-yes">


                            <span className="yes6">YES</span>
                          </li>

                          <div id="print-emiratesid-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>
                          {" "}
                          <span>Insurance continuity letter(If Applicable) </span>
                        </td>
                        <td>
                          <div className="print-Insurance_continuity_letter_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="print-Insurance_continuity_letter-yes"
                          >

                            <span className="yes7">YES</span>
                          </li>

                          <div id="print-Insurance_continuity_letter-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>8</td>
                        <td>
                          {" "}
                          <span>Sponsor's passport, visa (If Applicable) </span>
                        </td>
                        <td>
                          <div className="print-Sponsors_passportvisa_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="print-Sponsors_passportvisa-yes"
                          >

                            <span className="yes8">YES</span>
                          </li>

                          <div id="print-Sponsors_passportvisa-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div> */}
                <div className="academic" style={{ paddingTop: "20px" }}>
                  <div className="table-wrapper-Attachments clearfix">
                    <div className="table-search">
                      {/* <h3 className="contact-pg-title">
Attachments
</h3> */}
                    </div>
                  </div>
                  <table
                    className="table table-bordered"
                    id="cust-table-Attachmentsacademic"

                  >
                    <thead>
                      <tr>
                        <th className="pesonal_info_sno_th" scope="col">#</th>
                        <th className="pesonal_info_detail_th" scope="col">
                          Academic details Attachments Required{" "}
                        </th>
                        <th className="pesonal_info_field_th" scope="col">File Location </th>
                        <th scope="col">Attached (Yes/No)</th>
                      </tr>
                    </thead>
                    <tbody id="print-tble-tbody-Attachments-academic">
                      <tr>
                        <td>9</td>
                        <td>
                          {" "}
                          <span>
                            Master /PG degree certificate(s) (If Applicable){" "}
                          </span>
                        </td>
                        <td>
                          <div className="print-PG-degree_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-PG-degree-yes">

                            <span className="yes9">YES</span>
                          </li>

                          <div id="print-PG-degree-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Bachelor /UG degree certificate(s) </td>
                        <td>
                          <div className="print-UG-degree_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="print-HBachelor-UG-degree-yes"
                          >

                            <span className="yes10">YES</span>
                          </li>

                          <div id="print-HBachelor-UG-degree-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>
                          <span>Higher secondary certificate(s) </span>
                        </td>
                        <td>
                          <div className="print-Highersecondary_get_filesList"></div>
                        </td>

                        <td>
                          <li
                            style={{ display: "none" }}
                            id="print-Highersecondary-yes"
                          >

                            <span className="yes11">YES</span>
                          </li>

                          <div id="print-Highersecondary-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>12</td>
                        <td>
                          {" "}
                          <span>High school certificate(s) </span>
                        </td>

                        <td>
                          <div className="print-Highschool_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-Highschool-yes">

                            <span className="yes12">YES</span>
                          </li>

                          <div id="print-Highschool-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>13</td>
                        <td>
                          {" "}
                          <span>
                            Copy of all experience certificates as per CV{" "}
                          </span>
                        </td>
                        <td>
                          <div className="print-allexperience_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-allexperience-yes">

                            <span className="yes13">YES</span>
                          </li>

                          <div id="print-allexperience-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>14</td>
                        <td>
                          {" "}
                          <span>
                            National ID attachments{" "}
                          </span>
                        </td>
                        <td>

                          <div className="print-nationalid_get_filesList"></div>
                        </td>

                        <td>
                          <li style={{ display: "none" }} id="print-nationalid-yes">

                            <span className="yes14">YES</span>
                          </li>

                          <div id="print-nationalid-no">
                            {" "}

                            <span>No</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>

              <div className="personal_info_part">
                <div className="preexisiting_part" style={{ paddingTop: "15px" }}>
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
      </>
    );
  }
}
