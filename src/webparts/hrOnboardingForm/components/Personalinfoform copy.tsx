import * as React from "react";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
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
var licencefile = '';

// SPComponentLoader.loadCss(
//   `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
// );

// SPComponentLoader.loadCss(
//   "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.7"
// );
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
}

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
const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
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
      SponserNamesData: []
    };
  }

  public componentDidMount() {
    const url: any = new URL(window.location.href);
    PersonalItemId = url.searchParams.get("PersonalItemID");
    Mode = url.searchParams.get("PIFMode");
    personalMode = url.searchParams.get("PIFMode");

    this.GetReligiondata();
    this.GetSponserNamedata();
    // this.Hideshowitem()
    setTimeout(() => {
      this.GETcurrentuserlistdata();
    }, 2000);
    this.GetCountries();
    this.GetCurrentUserDetails();
    this.GetBloodgroup();
    this.checkboxchecking();
    this.Getsurename();
    this.Removevalidation();
    this.GetEmployeeCategoryItem();
    this.Autochangefieldnameduringtyping()
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


    if (PersonalItemId != null && personalMode == "View") {
      $(".print-btnpersonal").show()
      $(".personalviewclasscommom").prop("disabled", true);
      $("#Cousin").prop("disabled", true);

      $(`.personal-Update`).hide();
      $("input").prop("disabled", true);
      $("textarea").prop("disabled", true);
      $(".Add-new-personal").hide();
      $(`.personal-submit`).hide();

      this.GetpersonalviewidItem(PersonalItemId);


    } else if (PersonalItemId != null && personalMode == "Edit") {
      $(`.personal-Update`).show();

      //  $(".currentdate").prop("disabled", false);
      $("#txt-current-date").prop("disabled", false);
      $(`.personal-submit`).hide();

      this.GetpersonaleditidItem(PersonalItemId);


    }


  }


  public GetpersonalviewidItem(ID) {

    $(".personaltitleitemid").attr("style", "color:#00A36C");
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
    newweb.lists
      .getByTitle("Personal Information Master")
      .items.getById(ID)
      .get()
      .then((result) => {

        this.GetPersonaldocumentlibrarydata(result.FullName);
        this.GetDocumentlibaraypersonaldata(result.FullName);
        $("#childlist-tr").hide();
        $("#Universityqualification-tr").hide();
        $("#employmenthistory-tr").hide();
        $("#Research-tr").hide();
        $("#empreference-tr").hide();
        $("#emergency-tr").hide();
        $("#outside-tr").hide();
        $(".firstnamecurrent").hide();
        $(".Lastnamenamecurrent").hide();
        $(".firstnamedynamic").show();
        $(".Lastnamenamedynamic").show();


        $("#RelativeName").val(result.RelativeName),

          EmployeeEditviewName = result.FullName;
        businessdynamicuserunit = result.FullName;

        $(".empnamepersonal111").val(result.FullName);
        $("#PersonalGender").val(result.Gender),
          $(".empfirstname").val(result.FirstName);
        $(".personalLastname").val(result.LastName);
        $(".surename-personal").val(result.SurName);


        var value1 = result.ContactNumber;
        var contactall = ([] = value1.split("-"));

        $(`.contactnumbers`).val(contactall[1]);
        $("#country-code").val(contactall[0]);


        var value3 = result.CountryNumber;
        var contactall2 = ([] = value3.split("-"));

        $(`.CountrysNumbers`).val(contactall2[1]);
        $("#country-codehomecountry").val(contactall2[0]);
        $(`#country-codeMobileNo`).val(result.countrycodemobileno),
          $(`.MobileNos`).val(result.MobileNo),
          $("#EmployeeCategory").val(result.Category);
        $(`.Current-Nationality`).val(result.CurrentNationality);
        $(`.Previous-Nationality`).val(result.PreviousNationality);

        if (result.MaritalStatus == "Single") {
          $("#MaritalStatus option[value='Single']").prop("selected", true);
        } else if (result.MaritalStatus == "Married") {
          $("#MaritalStatus option[value='Married']").prop("selected", true);
        }

        var newreg = result.NewRegistration;
        if (newreg == "Yes") {
          $("#NewRegistration").prop("checked", true);
        }

        if (result.HaveyoueverApplied == "Yes") {
          $(".YesHaveyoueverapplied").prop("checked", true);
          $(`.Company-name-position`).hide();
        } else {
          $(".noHaveyoueverapplied").prop("checked", true);
          $(`.Company-name-position`).hide();
        }

        if (result.NewRegistration == "Yes") {
          $("#spouse").prop("checked", true);
        }

        if (result.Sister == "Yes") {
          $("#Sister").prop("checked", true);
        }

        if (result.Borther == "Yes") {
          $("#Brother").prop("checked", true);
        }

        if (result.Friend == "Yes") {
          $("#Friend").prop("checked", true);
        }
        if (result.Cousin == "Yes") {
          $("#Cousin").prop("checked", true);
        }

        if ((result.AnyOtherCloseRelative = "Yes")) {
          $("#AnyOtherCloseRelative").prop("checked", true);
        }
        if (result.NoRelative == "Yes") {
          $("#NoRelative").prop("checked", true);
        }

        if (result.dataflowNO == "Yes") {
          $(".dataflowYes").prop("checked", true);
        } else {
          $(".dataflowno").prop("checked", true);
        }

        if (result.LicenseType == "DOH") {
          $("#Doh-license").prop("checked", true);
        } else if (result.LicenseType == "MOH") {
          $("#Moh-license").prop("checked", true);
        } else if (result.LicenseType == "MOH") {
          $("#Dha-license").prop("checked", true);
        }

        $(`.bloodgroups`).val(result.BloodGroup),
          $(".personaltitleitemid").attr("style", "color:#00A36C");
        $(".personalvalue").val(result.FullName),
          $(`.pob`).val(result.PlaceofBirth);
        $(`.dob`).val(moment(result.DateofBirth).format("YYYY-MM-DD"));
        $("#PersonalMiddleName").val(result.MiddleName);
        $(`.religions`).val(result.Religion);
        $(`.sections`).val(result.Section);
        $(`.entereds`).val(moment(result.Entered).format("YYYY-MM-DD"));
        $(`.ports`).val(result.Port);

        $(`.SponsorNames`).val(result.SponsorName);
        $(`.documentnos`).val(result.DocumentNo);
        $(`.pos`).val(result.PlaceofIssue);
        $(`.dos`).val(moment(result.DateofIssue).format("YYYY-MM-DD")),
          $(`.dos`).val(moment(result.DateofExpiry).format("YYYY-MM-DD")),
          $(`.residenceNos`).val(result.ResidenceNo),


          $(`.nos`).val(result.NameofSpouse),
          $(`.Nationalitys2`).val(result.Nationality21),
          $(`.pob2`).val(result.PlaceofBirth2),
          $(`.dob2`).val(moment(result.DateofBirth2).format("YYYY-MM-DD")),
          $(`.pow`).val(result.PlaceofWork),
          $(`.Occupations2`).val(result.Occupation2),
          $(`.FathersNames`).val(result.FathersName),
          $(`.Nationalitys3`).val(result.Nationality3),
          $(`.pobs3`).val(result.PlaceofBirth3),
          $(`.dobs3`).val(moment(result.DateofBirth3).format("YYYY-MM-DD"));

        $(`.homeaddress3`).val(result.HomeAddress3),
          $(`.Occupations3`).val(result.Occupation3),
          $(`.MothersNames`).val(result.MothersName),
          $("#Nationalityfour").val(result.Nationality4),
          $(`.pobs4`).val(result.PlaceofBirth4),
          $(`.dobs4`).val(moment(result.DateofBirth4).format("YYYY-MM-DD"));
        $(`.HomeAddresss4`).val(result.HomeAddress4),
          $(`.Occupations4`).val(result.Occupation4),

          $(`.emailsids`).val(result.EmailID),
          $(`.jobappliedfors`).val(result.jobappliedfor),
          $(`.NameofCompanys`).val(result.NameofCompany),
          $(`.positions`).val(result.Position),
          $(`.WorkLocations`).val(result.WorkLocation),
          $(`.Emirates`).val(result.Emirate),
          $(`.Streets`).val(result.Street),
          $(`.Owners`).val(result.Owner),
          $(`.FlatNos`).val(result.FlatNo),
          $(`.plots`).val(result.Plot),
          $(`.PostBoxs`).val(result.PostBox),
          $(`.telephonenos`).val(result.TelephoneNo),
          $(`.LicenseNos`).val(result.LicenseNo),
          $(`.IssueDates`).val(moment(result.IssueDate).format("YYYY-MM-DD"));

        $(`.ExpiryDates`).val(moment(result.ExpiryDate).format("YYYY-MM-DD"));

        $(`.usersnames`).val(result.UserName);
        $(`.Passwords`).val(result.Password);
        $(`.drivinglicenselos`).val(result.DrivingLicenseNo);
        $(`.PlateNoss`).val(result.PlateNo);

        ImageSrcpersonal = result.UnitLogo;

        console.log(result);

      });

    newweb.lists
      .getByTitle("PersonalTable Master")
      .items.select("ID", "Requested", "PersonalItemid", "OrderNo")
      .filter(`PersonalItemid eq ${PersonalItemId}`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            Childrencounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-requested" autoComplete="off"value="' +
              result[i].Requested +
              '" ></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamic").append(newrow);
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("PersonalDataFormContactPersonIn Master")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2"
      )
      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text" id="tble-txt-name2" autoComplete="off"value="' +
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
      .getByTitle("PersonalDataFormContactPersonOut")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3"
      )
      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text" id="tble-txt-name3" autoComplete="off"value="' +
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
        "University"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"  id="tble-txt-University" autoComplete="off"value="' +
              result[i].University +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Name-qualification" autoComplete="off"value="' +
              result[i].Qualification +
              '"></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt" max="4" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "To",
        "Experience",
        "Reason",
        "From"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"  id="tble-txt-OrganizationName" autoComplete="off"value="' +
              result[i].OrganizationName +
              '"></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" autoComplete="off"value="' +
              result[i].From +
              '"></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"value="' +
              result[i].To +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-tble-txt-Years_of_Experience" autoComplete="off"value="' +
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
      .getByTitle("Personal Research")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"   id="tble-txt-name-Research" autoComplete="off"value="' +
              result[i].ResearchName +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-year-Research" autoComplete="off"value="' +
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
        "Contact"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"   id="tble-txt-Name-ResearchDetails" autoComplete="off"value="' +
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

    setTimeout(() => {
      $("input").attr("disabled", "disabled");
      $("textarea").attr("disabled", "disabled");
    }, 2000);
  }

  public GetpersonaleditidItem(ID) {

    $(".personaltitleitemid").attr("style", "color:#00A36C");
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
    newweb.lists
      .getByTitle("Personal Information Master")
      .items.getById(ID)
      .get()
      .then((result) => {

        this.GetPersonaldocumentlibrarydata(result.FullName);
        this.GetDocumentlibaraypersonaldata(result.FullName);
        $("#childlist-tr").hide();
        $("#Universityqualification-tr").hide();
        $("#employmenthistory-tr").hide();
        $("#Research-tr").hide();
        $("#empreference-tr").hide();
        $("#emergency-tr").hide();
        $("#outside-tr").hide();
        $(".firstnamecurrent").hide();
        $(".Lastnamenamecurrent").hide();
        $(".firstnamedynamic").show();
        $(".Lastnamenamedynamic").show();


        $("#RelativeName").val(result.RelativeName),

          EmployeeEditviewName = result.FullName;
        businessdynamicuserunit = result.FullName;

        $(".empnamepersonal111").val(result.FullName);
        $("#PersonalGender").val(result.Gender),
          $(".empfirstname").val(result.FirstName);
        $(".personalLastname").val(result.LastName);
        $(".surename-personal").val(result.SurName);


        var value1 = result.ContactNumber;
        var contactall = ([] = value1.split("-"));

        $(`.contactnumbers`).val(contactall[1]);
        $("#country-code").val(contactall[0]);


        var value3 = result.CountryNumber;
        var contactall2 = ([] = value3.split("-"));

        $(`.CountrysNumbers`).val(contactall2[1]);
        $("#country-codehomecountry").val(contactall2[0]);
        $(`#country-codeMobileNo`).val(result.countrycodemobileno),
          $(`.MobileNos`).val(result.MobileNo),
          $("#EmployeeCategory").val(result.Category);
        $(`.Current-Nationality`).val(result.CurrentNationality);
        $(`.Previous-Nationality`).val(result.PreviousNationality);

        if (result.MaritalStatus == "Single") {
          $("#MaritalStatus option[value='Single']").prop("selected", true);
        } else if (result.MaritalStatus == "Married") {
          $("#MaritalStatus option[value='Married']").prop("selected", true);
        }

        var newreg = result.NewRegistration;
        if (newreg == "Yes") {
          $("#NewRegistration").prop("checked", true);
        }

        if (result.HaveyoueverApplied == "Yes") {
          $(".YesHaveyoueverapplied").prop("checked", true);
          $(`.Company-name-position`).hide();
        } else {
          $(".noHaveyoueverapplied").prop("checked", true);
          $(`.Company-name-position`).hide();
        }

        if (result.NewRegistration == "Yes") {
          $("#spouse").prop("checked", true);
        }

        if (result.Sister == "Yes") {
          $("#Sister").prop("checked", true);
        }

        if (result.Borther == "Yes") {
          $("#Brother").prop("checked", true);
        }

        if (result.Friend == "Yes") {
          $("#Friend").prop("checked", true);
        }
        if (result.Cousin == "Yes") {
          $("#Cousin").prop("checked", true);
        }

        if ((result.AnyOtherCloseRelative = "Yes")) {
          $("#AnyOtherCloseRelative").prop("checked", true);
        }
        if (result.NoRelative == "Yes") {
          $("#NoRelative").prop("checked", true);
        }

        if (result.dataflowNO == "Yes") {
          $(".dataflowYes").prop("checked", true);
        } else {
          $(".dataflowno").prop("checked", true);
        }

        if (result.LicenseType == "DOH") {
          $("#Doh-license").prop("checked", true);
        } else if (result.LicenseType == "MOH") {
          $("#Moh-license").prop("checked", true);
        } else if (result.LicenseType == "MOH") {
          $("#Dha-license").prop("checked", true);
        }

        $(`.bloodgroups`).val(result.BloodGroup),
          $(".personaltitleitemid").attr("style", "color:#00A36C");
        $(".personalvalue").val(result.FullName),
          $(`.pob`).val(result.PlaceofBirth);
        $(`.dob`).val(moment(result.DateofBirth).format("YYYY-MM-DD"));
        $("#PersonalMiddleName").val(result.MiddleName);
        $(`.religions`).val(result.Religion);
        $(`.sections`).val(result.Section);
        $(`.entereds`).val(moment(result.Entered).format("YYYY-MM-DD"));
        $(`.ports`).val(result.Port);

        $(`.SponsorNames`).val(result.SponsorName);
        $(`.documentnos`).val(result.DocumentNo);
        $(`.pos`).val(result.PlaceofIssue);
        $(`.dos`).val(moment(result.DateofIssue).format("YYYY-MM-DD")),
          $(`.dos`).val(moment(result.DateofExpiry).format("YYYY-MM-DD")),
          $(`.residenceNos`).val(result.ResidenceNo),


          $(`.nos`).val(result.NameofSpouse),
          $(`.Nationalitys2`).val(result.Nationality21),
          $(`.pob2`).val(result.PlaceofBirth2),
          $(`.dob2`).val(moment(result.DateofBirth2).format("YYYY-MM-DD")),
          $(`.pow`).val(result.PlaceofWork),
          $(`.Occupations2`).val(result.Occupation2),
          $(`.FathersNames`).val(result.FathersName),
          $(`.Nationalitys3`).val(result.Nationality3),
          $(`.pobs3`).val(result.PlaceofBirth3),
          $(`.dobs3`).val(moment(result.DateofBirth3).format("YYYY-MM-DD"));

        $(`.homeaddress3`).val(result.HomeAddress3),
          $(`.Occupations3`).val(result.Occupation3),
          $(`.MothersNames`).val(result.MothersName),
          $("#Nationalityfour").val(result.Nationality4),
          $(`.pobs4`).val(result.PlaceofBirth4),
          $(`.dobs4`).val(moment(result.DateofBirth4).format("YYYY-MM-DD"));
        $(`.HomeAddresss4`).val(result.HomeAddress4),
          $(`.Occupations4`).val(result.Occupation4),

          $(`.emailsids`).val(result.EmailID),
          $(`.jobappliedfors`).val(result.jobappliedfor),
          $(`.NameofCompanys`).val(result.NameofCompany),
          $(`.positions`).val(result.Position),
          $(`.WorkLocations`).val(result.WorkLocation),
          $(`.Emirates`).val(result.Emirate),
          $(`.Streets`).val(result.Street),
          $(`.Owners`).val(result.Owner),
          $(`.FlatNos`).val(result.FlatNo),
          $(`.plots`).val(result.Plot),
          $(`.PostBoxs`).val(result.PostBox),
          $(`.telephonenos`).val(result.TelephoneNo),
          $(`.LicenseNos`).val(result.LicenseNo),
          $(`.IssueDates`).val(moment(result.IssueDate).format("YYYY-MM-DD"));

        $(`.ExpiryDates`).val(moment(result.ExpiryDate).format("YYYY-MM-DD"));

        $(`.usersnames`).val(result.UserName);
        $(`.Passwords`).val(result.Password);
        $(`.drivinglicenselos`).val(result.DrivingLicenseNo);
        $(`.PlateNoss`).val(result.PlateNo);

        ImageSrcpersonal = result.UnitLogo;

        console.log(result);

      });

    newweb.lists
      .getByTitle("PersonalTable Master")
      .items.select("ID", "Requested", "PersonalItemid", "OrderNo")
      .filter(`PersonalItemid eq ${PersonalItemId}`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            Childrencounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";
            // cols +=
            //   '<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="' +
            //   result[i].OrderNo +
            //   '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-requested" autoComplete="off"value="' +
              result[i].Requested +
              '" ></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamic").append(newrow);
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("PersonalDataFormContactPersonIn Master")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2"
      )
      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text" id="tble-txt-name2" autoComplete="off"value="' +
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
      .getByTitle("PersonalDataFormContactPersonOut")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3"
      )
      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text" id="tble-txt-name3" autoComplete="off"value="' +
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
        "University"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"  id="tble-txt-University" autoComplete="off"value="' +
              result[i].University +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Name-qualification" autoComplete="off"value="' +
              result[i].Qualification +
              '"></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt" max="4" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "OrganizationName",
        "To",
        "Experience",
        "Reason",
        "From"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"  id="tble-txt-OrganizationName" autoComplete="off"value="' +
              result[i].OrganizationName +
              '"></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" autoComplete="off"value="' +
              result[i].From +
              '"></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"value="' +
              result[i].To +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-tble-txt-Years_of_Experience" autoComplete="off"value="' +
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
      .getByTitle("Personal Research")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"   id="tble-txt-name-Research" autoComplete="off"value="' +
              result[i].ResearchName +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-year-Research" autoComplete="off"value="' +
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
        "Contact"
      )

      .filter(`PersonalItemid eq ${PersonalItemId}`)
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
              '<td><input type="text"   id="tble-txt-Name-ResearchDetails" autoComplete="off"value="' +
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
  }


  // for Edit
  public GetPersonaldocumentlibrarydata(Name) {
    if (PersonalItemId != null && personalMode == "Edit") {
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
      var licencefileurl = []
      var str = Name;
      //str)
      var FullName = str.split(" ").join("");
      //FullName)
      newweb
        .getFolderByServerRelativeUrl(`PersonalAttachments/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);
          }

          for (var i = 0; i < allitem.length; i++) {
            if (
              allitem[i].ListItemAllFields.Tags == "All experience certificate"
            ) {
              allitem3.push(allitem[i]);
              //(allitem3[i]);
              allexpurl = allitem3[0].ServerRelativeUrl;
              $("#allexperience").hide();
              $(".allexpitem").show();
              $(".allexpdelete").show();
              $("#allexperience-yes").show();
              $(".yes13").attr("style", "color:#00A36C");
              $("#allexperience-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              allitem32.push(allitem[i]);
              Highschoolurl = allitem32[0].ServerRelativeUrl;
              $("#Highschool").hide();
              $(".highschoolitem").show();
              $(".highschooldelete").show();
              $("#Highschool-yes").show();
              $(".yes12").attr("style", "color:#00A36C");
              $("#Highschool-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              allitem33.push(allitem[i]);
              Highersecondaryurl = allitem33[0].ServerRelativeUrl;
              $("#Highersecondary").hide();
              $(".higheritem").show();
              $(".higherdelete").show();
              $(".yes11").attr("style", "color:#00A36C");
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              allitem34.push(allitem[i]);
              UGdegreeurl = allitem34[0].ServerRelativeUrl;
              $("#HBachelor-UG-degree").hide();
              $(".ugitem").show();
              $(".ugdelete").show();
              $(".yes10").attr("style", "color:#00A36C");
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              allitem36.push(allitem[i]);
              PGdegreeurl = allitem36[0].ServerRelativeUrl;
              $("#PG-degree").hide();
              $(".PGitem").show();
              $(".pgdelete").show();
              $(".yes9").attr("style", "color:#00A36C");
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              allitem37.push(allitem[i]);
              Sponsorpassportvisaurl = allitem37[0].ServerRelativeUrl;
              $("#Sponsors_passportvisa").hide();
              $(".Sponsorspassportvisaitem").show();
              $(".Sponsorspassportvisadelete").show();
              $(".yes8").attr("style", "color:#00A36C");
              $("#Sponsors_passportvisa-yes").show();
              $("#Sponsors_passportvisa-no").hide();
            }
            //
            if (
              allitem[i].ListItemAllFields.Tags == "Insurance continuity letter"
            ) {
              allitem38.push(allitem[i]);
              Insurancecontinuityletterurl = allitem38[0].ServerRelativeUrl;
              $("#Insurance_continuity_letter").hide();
              $(".Insuranceletteritem").show();
              $(".Insurance_continuity_letterdelete").show();
              $(".yes7").attr("style", "color:#00A36C");
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              allitem39.push(allitem[i]);
              PreviousemiratesIDurl = allitem39[0].ServerRelativeUrl;
              $("#previous-emiratesid").hide();
              $(".emiratesiditem").show();
              $(".emiratesiddelete").show();
              $(".yes6").attr("style", "color:#00A36C");
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              allitem310.push(allitem[i]);
              Previousvisaurl = allitem310[0].ServerRelativeUrl;
              $("#Previousvisa").hide();
              $(".perivousvisaitem").show();
              $(".perivousvisadelete").show();
              $(".yes5").attr("style", "color:#00A36C");
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              allitem311.push(allitem[i]);
              passportbackurl = allitem311[0].ServerRelativeUrl;
              $("#passportbackpage").hide();
              $(".passportbackitem").show();
              $(".passportbacktdelete").show();
              $(".yes4").attr("style", "color:#00A36C");
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              allitem312.push(allitem[i]);
              passportfronturl = allitem312[0].ServerRelativeUrl;
              $("#passportcopy-frontpage").hide();
              $(".passportfrontitem").show();
              $(".passportfrontdelete").show();
              $(".yes3").attr("style", "color:#00A36C");
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              allitem314.push(allitem[i]);
              resumeurl = allitem314[0].ServerRelativeUrl;
              $("#Updated_Resume").hide();
              $(".resumeurlitem").show();
              $(".resumedelete").show();
              $(".yes1").attr("style", "color:#00A36C");
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").hide();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");


            }
          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              allitem313.push(allitem[i]);
              photourl = allitem313[0].ServerRelativeUrl;
              $("#High-QualityPhoto").hide();
              $(".photourlitem").show();
              $(".photodelete").show();
              $(".yes2").attr("style", "color:#00A36C");
              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }


          }
        });
    }
  }
  //for view
  public GetDocumentlibaraypersonaldata(names) {
    if (PersonalItemId != null && personalMode == "View") {
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
      var licencefileurl = []
      var str = names;
      var FullName = str.split(" ").join("");
      //FullName)
      newweb
        .getFolderByServerRelativeUrl(`PersonalAttachments/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);
          }

          for (var i = 0; i < allitem.length; i++) {

            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").hide();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");


            }


            if (
              allitem[i].ListItemAllFields.Tags == "All experience certificate"
            ) {
              allitem3.push(allitem[i]);
              //(allitem3[i]);
              allexpurl = allitem3[0].ServerRelativeUrl;
              $("#allexperience").hide();
              $(".allexpitem").show();
              $(".allexpdelete").hide();
              $("#allexperience-yes").show();
              $(".yes13").attr("style", "color:#00A36C");
              $("#allexperience-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              allitem32.push(allitem[i]);
              Highschoolurl = allitem32[0].ServerRelativeUrl;
              $("#Highschool").hide();
              $(".highschoolitem").show();
              $(".highschooldelete").hide();
              $("#Highschool-yes").show();
              $(".yes12").attr("style", "color:#00A36C");
              $("#Highschool-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              allitem33.push(allitem[i]);
              Highersecondaryurl = allitem33[0].ServerRelativeUrl;
              $("#Highersecondary").hide();
              $(".higheritem").show();
              $(".higherdelete").hide();
              $(".yes11").attr("style", "color:#00A36C");
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              allitem34.push(allitem[i]);
              UGdegreeurl = allitem34[0].ServerRelativeUrl;
              $("#HBachelor-UG-degree").hide();
              $(".ugitem").show();
              $(".yes10").attr("style", "color:#00A36C");
              $(".ugdelete").hide();
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              allitem36.push(allitem[i]);
              PGdegreeurl = allitem36[0].ServerRelativeUrl;
              $("#PG-degree").hide();
              $(".PGitem").show();
              $(".pgdelete").hide();
              $(".yes9").attr("style", "color:#00A36C");
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              allitem37.push(allitem[i]);
              Sponsorpassportvisaurl = allitem37[0].ServerRelativeUrl;
              $("#Sponsors_passportvisa").hide();
              $(".Sponsorspassportvisaitem").show();
              $(".Sponsorspassportvisadelete").hide();
              $("#Sponsors_passportvisa-yes").show();
              $("#Sponsors_passportvisa-no").hide();
              $(".yes8").attr("style", "color:#00A36C");
            }
            //
            if (
              allitem[i].ListItemAllFields.Tags == "Insurance continuity letter"
            ) {
              allitem38.push(allitem[i]);
              Insurancecontinuityletterurl = allitem38[0].ServerRelativeUrl;
              $("#Insurance_continuity_letter").hide();
              $(".Insuranceletteritem").show();
              $(".Insurance_continuity_letterdelete").hide();
              $(".yes7").attr("style", "color:#00A36C");
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              allitem39.push(allitem[i]);
              PreviousemiratesIDurl = allitem39[0].ServerRelativeUrl;
              $("#previous-emiratesid").hide();
              $(".emiratesiditem").show();
              $(".emiratesiddelete").hide();
              $(".yes6").attr("style", "color:#00A36C");
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              allitem310.push(allitem[i]);
              Previousvisaurl = allitem310[0].ServerRelativeUrl;
              $("#Previousvisa").hide();
              $(".perivousvisaitem").show();
              $(".perivousvisadelete").hide();
              $(".yes5").attr("style", "color:#00A36C");
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              allitem311.push(allitem[i]);
              passportbackurl = allitem311[0].ServerRelativeUrl;
              $("#passportbackpage").hide();
              $(".passportbackitem").show();
              $(".passportbacktdelete").hide();
              $(".yes4").attr("style", "color:#00A36C");
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              allitem312.push(allitem[i]);
              passportfronturl = allitem312[0].ServerRelativeUrl;
              $("#passportcopy-frontpage").hide();
              $(".passportfrontitem").show();
              $(".passportfrontdelete").hide();
              $(".yes3").attr("style", "color:#00A36C");
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              allitem314.push(allitem[i]);
              resumeurl = allitem314[0].ServerRelativeUrl;
              $("#Updated_Resume").hide();
              $(".resumeurlitem").show();
              $(".resumedelete").hide();
              $(".yes1").attr("style", "color:#00A36C");
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
            }
          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              allitem313.push(allitem[i]);
              photourl = allitem313[0].ServerRelativeUrl;
              $("#High-QualityPhoto").hide();
              $(".photourlitem").show();
              $(".yes2").attr("style", "color:#00A36C");
              $(".photodelete").hide();

              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }
          }
        });
    }
  }

  public Dynamicnamevalid() {
    var status = false;

    if ($("#dynamicFullName").val() != '') {
      $("#err-fullname").hide()
    } else {
      $("#err-fullname").show()
    }
    return status;
  }


  public updatelistpersonalforms() {

    if (
      this.Dynamicnamevalid() &&
      this.surNamevalidation() &&
      this.Validationofempcategory() &&
      this.gendervalidation() &&
      this.PlaceofBirth() &&
      this.CurrentNationality() &&
      this.PreviousNationality() &&
      this.Religion() &&
      this.Section() &&
      this.Entereds() &&
      this.Portss() &&
      this.countrycode() &&
      this.ContactNumber() &&
      this.mobilenumberonly() &&
      this.SponsorName() &&
      this.DocumentNo() &&
      this.PlaceofIssue() &&
      this.DateofIssue() &&
      this.ResidenceNo() &&
      this.maritalstatusvalidation() &&
      this.BloodGroupvalidation() &&
      this.FathersName() &&
      this.Nationality3() &&
      this.PlaceofBirththree() &&
      this.Occupationthree() &&
      this.HomeAddresshree() &&
      this.MotherName() &&
      this.Nationalityfour() &&
      this.PlaceofBirthfour() &&
      this.Occupationfour() &&
      this.HomeAddressfour() &&
      this.contactcodethreevalid() &&
      this.homecontactnoformat() &&
      this.HomeCountrysNumbers() &&
      this.validation_email() &&
      this.Homeemailsids() &&
      this.JobAppliedFor() &&
      this.YesnoApplid() &&
      this.Yesnoapplidthenfieldvalidation() &&
      this.YesnoapplidthenPositionfieldvalidation() &&
      this.telephonenumberuae() &&
      this.Mobilenovaliduae() &&
      this.ValidateEmiratesIDFormat()
    ) {
      var malefemle = $("#MaritalStatus").find(":selected").text();

      if ($(".YesHaveyoueverapplied").is(":checked")) {
        var Yes = "Yes";
      } else {
        Yes = "No";
      }

      if ($("#spouse").is(":checked")) {
        var Yes = "Yes";
      } else {
        Yes = "No";
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
      } else {
        dataflowYes = "No";
      }
      if ($("#Doh-license").is(":checked")) {
        var Licensetype = "DOH";
      } else if ($("#Moh-license").is(":checked")) {
        Licensetype = "MOH";
      } else if ($("#Dha-license").is(":checked")) {
        Licensetype = "DHA";
      }

      // debugger;
      newweb.lists
        .getByTitle("Personal Information Master")
        .items.getById(PersonalItemId)
        .update({
          Title: "PERSONAL INFORMATION FORM",
          FullName: $(`.personalvalue`).val(),
          PlaceofBirth: $(`.pob`).val(),
          DateofBirth: moment($(`.dob`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
          CurrentNationality: $(`.Current-Nationality`).val(),
          PreviousNationality: $(`.Previous-Nationality`).val(),
          Religion: $(`.religions`).val(),
          Section: $(`.sections`).val(),
          Entered: $(`.entereds`).val(),
          Port: $(`.ports`).val(),
          ContactNumber: $(`.contactnumbers`).val(),
          SponsorName: $(`.SponsorNames`).val(),
          DocumentNo: $(`.documentnos`).val(),
          PlaceofIssue: $(`.pos`).val(),
          DateofIssue: moment($(`.dos`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
          DateofExpiry: moment($(`.dos`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
          ResidenceNo: $(`.residenceNos`).val(),

          MaritalStatus: malefemle,
          BloodGroup: $(`.bloodgroups`).val(),
          NameofSpouse: $(`.nos`).val(),

          Nationality21: $(`.Nationalitys2`).val(),
          PlaceofBirth2: $(`.pob2`).val(),
          DateofBirth2: moment($(`.dob2`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
          PlaceofWork: $(`.pow`).val(),
          Occupation2: $(`.Occupations2`).val(),
          FathersName: $(`.FathersNames`).val(),
          Nationality3: $(`.Nationalitys3`).val(),

          PlaceofBirth3: $(`.pobs3`).val(),
          DateofBirth3: moment($(`.dobs3`).val(), "YYYY-MM-DD").format(
            "M/D/YYYY"
          ),
          HomeAddress3: $(`.homeaddress3`).val(),
          Occupation3: $(`.Occupations3`).val(),

          MothersName: $(`.MothersNames`).val(),

          Nationality4: $(`.Nationalitys4`).val(),
          PlaceofBirth4: $(`.pobs4`).val(),
          DateofBirth4: moment($(`.dobs4`).val(), "YYYY-MM-DD").format(
            "M/D/YYYY"
          ),
          HomeAddress4: $(`.HomeAddresss4`).val(),
          Occupation4: $(`.Occupations4`).val(),

          CountryNumber: $(`.CountrysNumbers`).val(),
          EmailID: $(`.emailsids`).val(),
          jobappliedfor: $(`.jobappliedfors`).val(),

          NameofCompany: $(`.NameofCompanys`).val(),

          Position: $(`.positions`).val(),
          WorkLocation: $(`.WorkLocations`).val(),
          Emirate: $(`.Emirates`).val(),
          Street: $(`.Streets`).val(),
          Owner: $(`.Owners`).val(),
          FlatNo: $(`.FlatNos`).val(),
          Plot: $(`.plots`).val(),
          PostBox: $(`.PostBoxs`).val(),

          TelephoneNo: $(`.telephonenos`).val(),
          countrycodemobileno: $(`#country-codeMobileNo`),
          MobileNo: $(`.MobileNos`).val(),
          LicenseNo: $(`.LicenseNos`).val(),
          IssueDate: moment($(`.IssueDates`).val(), "YYYY-MM-DD").format(
            "M/D/YYYY"
          ),
          ExpiryDate: moment($(`.ExpiryDates`).val(), "YYYY-MM-DD").format(
            "M/D/YYYY"
          ),
          LicenseType: Licensetype,
          NewRegistration: newregstation,
          UserName: $(`.usersnames`).val(),
          Password: $(`.Passwords`).val(),
          DrivingLicenseNo: $(`.drivinglicenselos`).val(),
          PlateNo: $(`.PlateNoss`).val(),
          dataflowNO: dataflowYes,
          Friend: Friend,
          AnyOtherCloseRelative: AnyOtherCloseRelative,
          NoRelative: NoRelative,
          Cousin: Cousin,
          Sister: Sister,
          RelativeName: $("#RelativeName").val(),
          Borther: Brother,
          HaveyoueverApplied: Yes,

          Status: "Updated by Unit HR",
        })
        .then((results: any) => {
          //(results.data.ID);
          this.AllAttachment()
          swal({
            title: "Item Updated Successfully",

            icon: "success",
          }).then(() => {
            location.reload()
          });
        });

    }
  }

  public PlaceofBirth() {
    var status = true;
    if (status == true && $("#PlaceofBirth").val() != "") {
      $("#err-placeofbirth").hide();
    } else {
      $("#err-placeofbirth").show();
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
      status = false;
    }
    return status;
  }
  public SponsorName() {
    var status = true;
    if (status == true && $("#SponsorName").find(":selected").text() == "Select") {
      $("#err-sponsorname").show();
      status = false;
    } else {
      $("#err-sponsorname").hide();
    }
    return status;
  }

  //PASSPORT & RESIDENCE PARTICULARS
  public DocumentNo() {
    var status = true;
    if (status == true && $("#DocumentNo").val() != "") {
      $("#err-documentno").hide();
    } else {
      $("#err-documentno").show();
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
      status = false;
    }
    return status;
  }

  public JobAppliedFor() {
    var status = true;
    if (status == true && $("#Job_Applied_For").val() != "") {
      $("#err-JobAppliedFor").hide();
    } else {
      $("#err-JobAppliedFor").show();
      status = false;
    }
    return status;
  }

  public WorkLocation() {
    var status = true;
    if (status == true && $("#WorkLocation").val() != "") {
      $("#err-worklocation").hide();
    } else {
      $("#err-worklocation").show();
      status = false;
    }
    return status;
  }

  public countrycode() {
    var status = true;
    if ($("#country-code").find(":selected").text() == "Select") {
      $("#err-countrycode").show();
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
      status = false;
    } else {
      $("#err-Genderpersonal").hide();
    }
    return status;
  }

  public Removevalidation() {

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



    $("#Job_Applied_For").on("change", function () {

      $("#err-JobAppliedFor").hide();

    });



    $("#CountryNumber").keyup(function () {

      $(".err-homecountry-err-format").hide();

    });



    $("#ContactNumber").keyup(function () {

      $(".err-formatphonenumberpersonalContactNumber").hide();

    });
  }

  public maritalstatusvalidation() {
    var status = true;
    if (
      status == true &&
      $("#MaritalStatus").find(":selected").text() == "Select"
    ) {
      $("#err-maritalstatus").show();
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
      status = false;
    } else {
      $("#err-EmployeeCategory").hide();
    }
    return status;
  }

  public homenumbervalidationofcharactor() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($(".home_countrynumbers ") as any).val());
    if (status == true && phone.match(numbers)) {
      $(".err-homecountry-err-format").hide();
    } else {
      $(".err-homecountry-err-format").show();
      status = false;
    }
    return status;
  }

  public surNamevalidation() {
    var status = true;
    if (status == true && $("#surenmaepersonal").find(":selected").text() == "Select") {
      $("#err-Titlesurename").show();
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
        status = false;
      }
    }
    return status;
  }



  // public uaedynamiccontactnovalid() {
  //   var status = true;
  //   var numbers = /^[0-9]+$/;
  //   var telephone = $.trim(($("#tble-txt-contactnumber3") as any).val());
  //   if (status == true && telephone != "") {
  //     if (status == true && telephone.match(numbers)) {
  //       $(".contactnumber3-table-error").hide();
  //       alert('hi+correct')
  //     } else {
  //       $(".contactnumber3-table-error").show();
  //       status = false;
  //       alert('hi+notcorrect')
  //     }
  //   }
  //   return status;
  // }
  public YesnoApplid() {
    var status = true;

    if (status == true && $(".YesHaveyoueverapplied").is(":checked")) {
      $("#err-Yes-applied").hide();
      // alert("hiyes")
    } else if (status == true && $(".noHaveyoueverapplied").is(":checked")) {
      $("#err-Yes-applied").hide();
      // alert("hi-no")
    } else {
      $("#err-Yes-applied").show();
      // alert("hi-choose")
      status = false
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
          status = false;
        }
      } else {
        $("#err-emirate-wrong-format").show();
        status = false;
      }

    }

    return status;
  }



  public fullname() {
    var status = true;

    if (status == true && $("#FullName").val() != "") {
      $("#err-fullname").hide();
    } else {
      $("#err-fullname").show();
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
      status = false;

    }

    return status;

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
      this.CurrentNationality() &&
      this.PreviousNationality() &&
      this.Religion() &&
      this.Section() &&
      this.Entereds() &&
      this.Portss() &&
      this.countrycode() &&
      this.ContactNumber() &&
      this.mobilenumberonly() &&
      this.SponsorName() &&
      this.DocumentNo() &&
      this.PlaceofIssue() &&
      this.DateofIssue() &&
      this.ResidenceNo() &&
      this.maritalstatusvalidation() &&
      this.BloodGroupvalidation() &&
      this.FathersName() &&
      this.Nationality3() &&
      this.PlaceofBirththree() &&
      this.Occupationthree() &&
      this.HomeAddresshree() &&
      this.MotherName() &&
      this.Nationalityfour() &&
      this.PlaceofBirthfour() &&
      this.Occupationfour() &&
      this.HomeAddressfour() &&
      this.contactcodethreevalid() &&
      this.homecontactnoformat() &&
      this.HomeCountrysNumbers() &&
      this.validation_email() &&
      this.Homeemailsids() &&
      this.JobAppliedFor() &&
      this.YesnoApplid() &&
      this.telephonenumberuae() &&
      this.Mobilenovaliduae() &&
      this.Yesnoapplidthenfieldvalidation() &&
      this.YesnoapplidthenPositionfieldvalidation() &&
      this.ValidateEmiratesIDFormat()

    ) {

      swal({
        text: "Please wait!",
        button: false,
        closeOnClickOutside: false,
      } as any);
      var malefemle = $("#MaritalStatus").find(":selected").text();

      if ($(".YesHaveyoueverapplied").is(":checked")) {
        var Yes = "Yes";
      } else {
        Yes = "No";
      }

      if ($("#spouse").is(":checked")) {
        var Yes = "Yes";
      } else {
        Yes = "No";
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
      } else {
        dataflowYes = "No";
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
          newweb.lists
            .getByTitle("Personal Information Master")
            .items.add({
              Title: "PERSONAL INFORMATION FORM",
              MobileNo: $(`.MobileNos`).val(),
              countrycodemobileno: $(`#country-codeMobileNo`).val(),
              FullName: $(`.full-nameitem`).val(),
              FirstName: $("#PersonalFirstName").val(),
              LastName: $("#empLastname").val(),
              MiddleName: $("#PersonalMiddleName").val(),
              SurName: $("#surenmaepersonal").val(),
              PlaceofBirth: $(`.pob`).val(),
              DateofBirth: moment($(`.dob`).val()),
              CurrentNationality: $(`.Current-Nationality`).val(),
              PreviousNationality: $(`.Previous-Nationality`).val(),
              Religion: $(`.religions`).val(),
              Section: $(`.sections`).val(),
              Entered: $(`.entereds`).val(),
              Port: $(`.ports`).val(),
              ContactNumber: finalcontactno,
              SponsorName: $(`.SponsorNames`).val(),
              Gender: $("#PersonalGender").val(),
              DocumentNo: $(`.documentnos`).val(),
              PlaceofIssue: $(`.pos`).val(),
              DateofIssue: moment($(`.dos`).val()),
              DateofExpiry: moment($(`.dos`).val()),
              ResidenceNo: $(`.residenceNos`).val(),
              MaritalStatus: malefemle,
              BloodGroup: $(`.bloodgroups`).val(),
              NameofSpouse: $(`.nos`).val(),
              Nationality21: $(`.Nationalitys2`).val(),
              PlaceofBirth2: $(`.pob2`).val(),
              DateofBirth2: moment($(`.dob2`).val()),
              PlaceofWork: $(`.pow`).val(),
              Occupation2: $(`.Occupations2`).val(),
              FathersName: $(`.FathersNames`).val(),
              Nationality3: $(`.Nationalitys3`).val(),
              PlaceofBirth3: $(`.pobs3`).val(),
              DateofBirth3: moment($(`.dobs3`).val()),
              HomeAddress3: $(`.homeaddress3`).val(),
              Occupation3: $(`.Occupations3`).val(),
              MothersName: $(`.MothersNames`).val(),
              Nationality4: $(`.Nationalitys4`).val(),
              PlaceofBirth4: $(`.pobs4`).val(),
              DateofBirth4: moment($(`.dobs4`).val()),
              HomeAddress4: $(`.HomeAddresss4`).val(),
              Occupation4: $(`.Occupations4`).val(),
              CountryNumber: finalcontactno2,
              EmailID: $(`.emailsids`).val(),
              jobappliedfor: $(`.jobappliedfors`).val(),
              NameofCompany: $(`.NameofCompanys`).val(),
              Position: $(`.positions`).val(),
              WorkLocation: $(`.WorkLocations`).val(),
              Emirate: $(`.Emirates`).val(),
              Street: $(`.Streets`).val(),
              Owner: $(`.Owners`).val(),
              FlatNo: $(`.FlatNos`).val(),
              Plot: $(`.plots`).val(),
              PostBox: $(`.PostBoxs`).val(),
              TelephoneNo: $(`.telephonenos`).val(),
              LicenseNo: $(`.LicenseNos`).val(),
              IssueDate: moment($(`.IssueDates`).val()),
              ExpiryDate: moment($(`.ExpiryDates`).val()),
              NewRegistration: newregstation,
              UserName: $(`.usersnames`).val(),
              Password: $(`.Passwords`).val(),
              DrivingLicenseNo: $(`.drivinglicenselos`).val(),
              PlateNo: $(`.PlateNoss`).val(),
              dataflowNO: dataflowYes,
              Friend: Friend,
              AnyOtherCloseRelative: AnyOtherCloseRelative,
              NoRelative: NoRelative,
              Cousin: Cousin,
              Sister: Sister,
              Borther: Brother,
              HaveyoueverApplied: Yes,
              UnitLogo: LogoUrl,
              LicenseType: Licensetype,
              RelativeName: $("#RelativeName").val(),
              Status: "Created by Employee",
              BusinessUnit: officename,
              Category: $("#EmployeeCategory").val(),
            })
            .then((results: any) => {
              //(results.data.ID);
              this.AddTableToList(results.data.ID);


            });
        }
      });
    }




  }

  public AllAttachment() {
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

    setTimeout(() => {
      swal({
        title: "The Form has been submitted successfully",

        icon: "success",
      }).then(() => {
        location.reload();
      });
    }, 5000);
  }



  public AddTableToList(id) {

    $("#cust-table-block tbody tr").each(function () {
      var currentrow = $(this)
      var Requested = currentrow.find("td:eq(0)").find("input[id*='tble-txt-requested']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-requested']").val() : "-";

      if (Requested != "") {
        newweb.lists.getByTitle("PersonalTable Master").items.add({
          PersonalItemid: id,
          Requested: Requested,
        })
      }
    });

    $("#cust-table-block2 tbody tr").each(function () {
      var currentrow = $(this)
      var Name2 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-name2']").val();
      var WorkLocation2 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-worklocation2']").val();
      var ContactNumber2 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber2']").val();

      if (Name2 != "" || WorkLocation2 != "" || ContactNumber2 != "") {
        Name2 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-name2']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-name2']").val() : "-";
        WorkLocation2 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-worklocation2']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-worklocation2']").val() : "-";
        ContactNumber2 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber2']").val() != "" ? currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber2']").val() : "-";

        newweb.lists
          .getByTitle("PersonalDataFormContactPersonIn Master")
          .items.add({
            Name2: Name2,
            WorkLocation2: WorkLocation2,
            ContactNumber2: ContactNumber2,
            PersonalItemid: id,
          })
      }
    });

    $("#cust-table-block3 tbody tr").each(function () {
      var currentrow = $(this);
      var Name3 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-name3']").val();
      var Relation3 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-relation3']").val();
      var ContactNumber3 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber3']").val();

      if (Name3 != "" || Relation3 != "" || ContactNumber3 != "") {
        Name3 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-name3']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-name3']").val() : "-";
        Relation3 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-relation3']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-relation3']").val() : "-";
        ContactNumber3 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber3']").val() != "" ? currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactnumber3']").val() : "-";

        newweb.lists
          .getByTitle("PersonalDataFormContactPersonOut")
          .items.add({
            Name3: Name3,
            Relation3: Relation3,
            ContactNumber3: ContactNumber3,
            PersonalItemid: id,

          })
      }
    });


    $("#cust-table-block4qualification tbody tr").each(function () {
      var currentrow = $(this)
      var QualificationName = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-qualification']").val();
      var PraUniversitycticedPosition = currentrow.find("td:eq(1)").find("input[id*='tble-txt-University']").val();
      var yearofgraducation = currentrow.find("td:eq(2)").find("input[id*='tble-txt-year_of_grt']").val();

      if (QualificationName != "" || PraUniversitycticedPosition != "" || yearofgraducation != "") {
        QualificationName = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-qualification']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-qualification']").val() : "-";
        PraUniversitycticedPosition = currentrow.find("td:eq(1)").find("input[id*='tble-txt-University']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-University']").val() : "-";
        yearofgraducation = currentrow.find("td:eq(2)").find("input[id*='tble-txt-year_of_grt']").val() != "" ? currentrow.find("td:eq(2)").find("input[id*='tble-txt-year_of_grt']").val() : "-";

        newweb.lists.getByTitle("Personal Professional Qualification").items.add({
          Qualification: QualificationName,
          University: PraUniversitycticedPosition,
          YearofGraducation: yearofgraducation,
          PersonalItemid: id,
        })
      }

    });

    $("#cust-table-block-employmentHistory tbody tr").each(function () {
      var currentrow = $(this)
      var OrganizationName = currentrow.find("td:eq(0)").find("input[id*='tble-txt-OrganizationName']").val();
      var OrganizationDesignation = currentrow.find("td:eq(1)").find("input[id*='tble-txt-OrganizationDesignation']").val();
      var from = currentrow.find("td:eq(2)").find("input[id*='tble-txt-Organization-date-From']").val();
      var to = currentrow.find("td:eq(3)").find("input[id*='tble-txt-Organization-date-To']").val();
      var exp = currentrow.find("td:eq(4)").find("input[id*='tble-txt-Years_of_Experience']").val();
      var Reason = currentrow.find("td:eq(5)").find("input[id*='tble-txt-Reason_for_leaving']").val();

      if (OrganizationName != "" || OrganizationDesignation != "" || exp != "" || Reason != "") {
        OrganizationName = currentrow.find("td:eq(0)").find("input[id*='tble-txt-OrganizationName']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-OrganizationName']").val() : "-";
        OrganizationDesignation = currentrow.find("td:eq(1)").find("input[id*='tble-txt-OrganizationDesignation']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-OrganizationDesignation']").val() : "-";
        exp = currentrow.find("td:eq(4)").find("input[id*='tble-txt-Years_of_Experience']").val() != "" ? currentrow.find("td:eq(4)").find("input[id*='tble-txt-Years_of_Experience']").val() : "-";
        Reason = currentrow.find("td:eq(5)").find("input[id*='tble-txt-Reason_for_leaving']").val() != "" ? currentrow.find("td:eq(5)").find("input[id*='tble-txt-Reason_for_leaving']").val() : "-";

        newweb.lists
          .getByTitle("Personal Employment History")
          .items.add({
            OrganizationName: OrganizationName,
            Organizationdesc: OrganizationDesignation,
            From: from,
            To: to,
            Experience: exp,
            Reason: Reason,
            PersonalItemid: id,

          })
      }

    });

    $("#cust-table-blockResearch tbody tr").each(function () {
      var currentrow = $(this);
      debugger;
      var Researchname = currentrow.find("td:eq(0)").find("input[id='tble-txt-name-Research']").val();
      var Researchcategory = currentrow.find("td:eq(1)").find("input[id='tble-txt-Category-Research']").val();
      var year = currentrow.find("td:eq(2)").find("input[id='tble-txt-year-Research']").val();

      if (Researchname != "" || Researchcategory != "" || year != "") {
        Researchname = currentrow.find("td:eq(0)").find("input[id='tble-txt-name-Research']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-name-Research']").val() : "-";
        Researchcategory = currentrow.find("td:eq(1)").find("input[id='tble-txt-Category-Research']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-Category-Research']").val() : "-";
        year = currentrow.find("td:eq(2)").find("input[id='tble-txt-year-Research']").val() != "" ? currentrow.find("td:eq(2)").find("input[id*='tble-txt-year-Research']").val() : "-";

        newweb.lists
          .getByTitle("Personal Research")
          .items.add({
            ResearchName: Researchname,
            Researchcategory: Researchcategory,
            year: year,
            PersonalItemid: id,

          })
      }

    });

    $("#cust-table-blockEmployeeReference tbody tr").each(function () {
      var currentrow = $(this)
      var column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-ResearchDetails']").val();
      var column2 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-Email-ResearchDetails']").val();
      var column3 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactno-ResearchDetails']").val();

      if (column1 != "" || column2 != "" || column3 != "") {
        column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-ResearchDetails']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-Name-ResearchDetails']").val() : "-";
        column2 = currentrow.find("td:eq(1)").find("input[id*='tble-txt-Email-ResearchDetails']").val() != "" ? currentrow.find("td:eq(1)").find("input[id*='tble-txt-Email-ResearchDetails']").val() : "-";
        column3 = currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactno-ResearchDetails']").val() != "" ? currentrow.find("td:eq(2)").find("input[id*='tble-txt-contactno-ResearchDetails']").val() : "-";

        newweb.lists
          .getByTitle("personal Reference Details")
          .items.add({
            Name: column1,
            Email: column2,
            Contact: column3,
            PersonalItemid: id,
            // OrderNo: RowNumber,
          });
      }

    });

    this.AllAttachment();

  }

  public LogoUnitDynamicpersonal(ofcs) {
    if (PersonalItemId == null && personalMode == null) {
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
        reacthandler.Getfolderitrm(resultData.d.DisplayName);
        Currentdisplaynames = resultData.d.DisplayName;
        //(resultData.d.UserProfileProperties.results);
        $(".fullname_personal").val(resultData.d.DisplayName)
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcname = properties[i].Value;
            setTimeout(() => {
              reacthandler.LogoUnitDynamicpersonal(ofcname);
            }, 500);
          }
        }
        //for first name lastname
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "FirstName") {
            officeFirstname = properties[i].Value;
            var firstofficename = properties[i].Value;
            $(".personal_firstname").val(firstofficename)
            reacthandler.setState({
              lastname: firstofficename,
            });
          }
          if (properties[i].Key == "LastName") {
            officlelastname = properties[i].Value;
            var lastofficename = properties[i].Value;
            $(".personal_lastname").val(lastofficename)
            reacthandler.setState({
              firstname: lastofficename,
            });
          }
        }
      },

      error: function (jqXHR, textStatus, errorThrown) { },
    });
  }

  public AddNewRow(e) {
    //  <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${Childrencounter}"></input></td>
    e.preventDefault();
    $("#tble-tbody-dynamic").append(`<tr>
   
    <td><input type="text" id="tble-txt-requested" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel children_delete_icon"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${qualificationcounter}"></input></td>
    $("#tble-tbody-dynamic3").append(`<tr>
   
    <td><input type="text" id="tble-txt-Name-qualification" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-University" autoComplete="off"></input></td>
   
    <td><input type="text" id="tble-txt-year_of_grt" maxlength="4" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmploymentHistorycounter}"></input></td>
    $("#tble-tbody-dynamic3_Employment_History").append(`<tr>
   
    <td><input type="text" id="tble-txt-OrganizationName" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-OrganizationDesignation" autoComplete="off"></input></td>
    <td><input type="month" id="tble-txt-Organization-date-From" autoComplete="off"></input></td>
   
    <td><input type="month" id="tble-txt-tble-txt-Organization-date-To" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-tble-txt-Years_of_Experience" maxlength="2" autoComplete="off"></input></td>
    
    <td><input type="text" id="tble-txt-Reason_for_leaving" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel3"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${ResearchPublicationDetailscounter}"></input></td>
    $("#tble-tbody-dynamicResearch").append(`<tr>
  
    <td><input type="text" id="tble-txt-name-Research" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-Category-Research" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-year-Research" autoComplete="off"></input></td>

    <td class="delete_icon_td"><a href="#" class="ibtnDel4"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr >`);
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
    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmployeeReferenceDetailscounter}"></input></td>
    $("#tble-tbody-dynamicemployreference").append(`<tr>
   
    <td><input type="text" id="tble-txt-Name-ResearchDetails" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-Email-ResearchDetails" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-contactno-ResearchDetails" autoComplete="off"></input></td>

    <td class="delete_icon_td"><a href="#" class="ibtnDel5"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
    //<td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmergencyContactPersonInUAEcounter}"></input></td>
    $("#tble-tbody-dynamicEmergencyContact").append(`<tr>
   
    <td><input type="text" id="tble-txt-name2" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-worklocation2" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-contactnumber2" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel6"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
    // <td><input id="tble-txt-row-order" class="s_no" type="text" disabled autoComplete="off" value="${EmergencyContactPersonOutsideUAE}"></input></td>
    $("#tble-tbody-dynamicemergencycontactpepersonoutside").append(`<tr>
   
    <td><input type="text" id="tble-txt-name3" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-relation3" autoComplete="off"></input></td>
    <td><input type="text" id="tble-txt-contactnumber3" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel7"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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

  public async createfolder(Username) {
    this.Attachmentchecking();
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
  public checkboxchecking() {
    $("input.YesHaveyoueverapplied").on("change", function () {
      $("input.noHaveyoueverapplied").prop("checked", false);

      $(`.Company-name-position`).show();
    });

    $("input.noHaveyoueverapplied").on("change", function () {
      $("input.YesHaveyoueverapplied").prop("checked", false);

      $(`.Company-name-position`).hide();
    });

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
  public async GETcurrentuserlistdata() {
    debugger;
    if (PersonalItemId == undefined || PersonalItemId == null || PersonalItemId == "") {

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
          " Borther",
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
          "Author/Id"
        )
        .filter(`Author/Id eq ${this.props.UserId}`)
        .expand("Author")
        .get()
        .then((result) => {
          if (result.length != 0) {
            $("#Cousin").prop("disabled", true);
            $("#childlist-tr").hide();
            $("#Universityqualification-tr").hide();
            $("#employmenthistory-tr").hide();
            $("#Research-tr").hide();
            $("#empreference-tr").hide();
            $("#emergency-tr").hide();
            $("#outside-tr").hide();
            $("#Cousin").prop("disabled", true);

            this.Gettabledata(result[0].ID);
            $(".Add-new-personal").hide();
            $("#RelativeName").val(result[0].RelativeName),
              $(".personalviewclasscommom").prop("disabled", true);
            $(".personalview").prop("disabled", true);
            personallistid = result[0].ID;
            $(".empfirstname").val(result[0].FirstName);
            $(".personalLastname").val(result[0].LastName);
            $("#surenmaepersonalnda2").val(result[0].SurName);


            $("#PassportNojoining").val(result[0].DocumentNo);
            $("#surenmaepersonalnda1").val(result[0].SurName);
            $("#surenmaepersonalnda").val(result[0].SurName);
            if (result[0].LicenseType == "DOH") {
              $("#Doh-license").prop("checked", true);
            } else if (result[0].LicenseType == "MOH") {
              $("#Moh-license").prop("checked", true);
            } else if (result[0].LicenseType == "MOH") {
              $("#Dha-license").prop("checked", true);
            }
            ///date is binding form this form to other
            $(".signnational").val(result[0].CurrentNationality);
            $(".ndanational").val(result[0].CurrentNationality);
            $("#phypolicyempationality").val(result[0].CurrentNationality);
            $("#IdentityCardNo").val(result[0].DocumentNo);

            $(".signpasspoartno").val(result[0].DocumentNo);
            $(".signemailid").val(result[0].EmailID);


            $("#Bankunifromset").val(result[0].Gender)




            $(".ndapassportno").val(result[0].DocumentNo);

            $(".personaltitleitemid").attr("style", "color:#00A36C");

            $(".Updatebycurrentuser").hide();
            $(".personalinformationimg").show();
            $(".personal-submit").hide();


            ///for country
            $("#MaritalStatus").val(result[0].MaritalStatus)


            var value1 = result[0].ContactNumber;
            var contactall = ([] = value1.split("-"));

            $("#EmployeeNouniform").val(contactall[1])


            $("#EmployNumber-ack-covid").val(contactall[1]);
            $(`.contactnumbers`).val(contactall[1]);
            $("#country-code").val(contactall[0]);
            ///other phone 
            $("#covide-country-codes").val(contactall[0]);

            $("#Employeenumber-ack-covid").val(contactall[1]);
            $("#Employcontact-ack-covid").val(contactall[1]);

            $(".signcountry-codes").val(contactall[0]);
            $(".signmobileno").val(contactall[1]);
            $("#covide-country-codes").val(contactall[0]);
            $("#Employcontact-ack-covid").val(contactall[1]);
            ///


            var value3 = result[0].CountryNumber;
            var contactall2 = ([] = value3.split("-"));

            $(`.CountrysNumbers`).val(contactall2[1]);
            $("#country-codehomecountry").val(contactall2[0]);

            var value4 = result[0].MobileNo;
            var mob1 = ([] = value4.split("-"));

            $(`.MobileNos`).val(mob1[1]);
            $(`#country-codeMobileNo`).val(mob1[0]);
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

            if (result[0].NewRegistration == "Yes") {
              $("#spouse").prop("checked", true);
            } else {
              $("#spouse").prop("checked", false);
            }

            if (result[0].Sister == "Yes") {
              $("#Sister").prop("checked", true);
            } else {
              $("#Sister").prop("checked", false);
            }

            if (result[0].Borther == "Yes") {
              $("#Brother").prop("checked", true);
            } else {
              $("#Brother").prop("checked", false);
            }

            if (result[0].Friend == "Yes") {
              $("#Friend").prop("checked", true);
            } else {
              $("#Friend").prop("checked", false);
            }
            if (result[0].Cousin == "Yes") {
              $("#Cousin").prop("checked", true);
            } else {
              $("#Cousin").prop("checked", false);
            }

            if (result[0].AnyOtherCloseRelative == "Yes") {
              $("#AnyOtherCloseRelative").prop("checked", true);
            } else {
              $("#AnyOtherCloseRelative").prop("checked", false);
            }
            if (result[0].NoRelative == "Yes") {
              $("#NoRelative").prop("checked", true);
            } else {
              $("#NoRelative").prop("checked", false);
            }

            if (result[0].dataflowNO == "Yes") {
              $(".dataflowYes").prop("checked", true);
            } else {
              $(".dataflowno").prop("checked", false);
            }
            $("#PersonalMiddleName").val(result[0].MiddleName);
            $("#EmployeeCategory").val(result[0].Category);
            $(".personaltitleitemid").attr("style", "color:#00A36C");
            $(`.personalvalue`).val(result[0].FullName),
              $(`.pob`).val(result[0].PlaceofBirth);
            $(`.dob`).val(moment(result[0].DateofBirth).format("YYYY-MM-DD"));
            $("#CurrentNationality").val(result[0].CurrentNationality);
            $("#PreviousNationality").val(result[0].PreviousNationality);
            $(`.religions`).val(result[0].Religion);
            $(`.sections`).val(result[0].Section);
            $(`.entereds`).val(moment(result[0].Entered).format("YYYY-MM-DD"));
            $(`.ports`).val(result[0].Port);
            $("#PersonalGender").val(result[0].Gender),
              $(`.SponsorNames`).val(result[0].SponsorName);
            $(`.documentnos`).val(result[0].DocumentNo);
            $(`.pos`).val(result[0].PlaceofIssue);
            $(`.dos`).val(moment(result[0].DateofIssue).format("YYYY-MM-DD")),
              $(`.dos`).val(
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

              $("#surenmaepersonal").val(result[0].SurName);
            $(`.bloodgroups`).val(result[0].BloodGroup),
              $(`.nos`).val(result[0].NameofSpouse),
              $(`.Nationalitys2`).val(result[0].Nationality21),
              $(`.pob2`).val(result[0].PlaceofBirth2),
              $(`.dob2`).val(
                moment(result[0].DateofBirth2).format("YYYY-MM-DD")
              ),
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
              $(`.jobappliedfors`).val(result[0].jobappliedfor),
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
            $(`.Passwords`).val(result[0].Password);
            $(`.drivinglicenselos`).val(result[0].DrivingLicenseNo);
            $(`.PlateNoss`).val(result[0].PlateNo);
          }
        });
    }
  }

  public async Gettabledata(id) {
    newweb.lists
      .getByTitle("PersonalTable Master")
      .items.select(
        "ID",
        "Requested",
        "PersonalItemid",
        "OrderNo",
      )
      .filter("PersonalItemid eq '" + id + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {
          ////("h")
          for (var i = 0; i < result.length; i++) {
            Childrencounter = result[i].OrderNo + 1;
            var newrow = $("<tr>");
            var cols = "";

            cols +=
              '<td><input type="text" id="tble-txt-requested" class="personalview" autoComplete="off"value="' +
              result[i].Requested +
              '" ></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamic").append(newrow);
          }
        }
      });

    ////

    newweb.lists
      .getByTitle("PersonalDataFormContactPersonIn Master")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name2",
        "WorkLocation2",
        "ContactNumber2",

      )
      .filter("PersonalItemid eq '" + id + "'")
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
              '<td><input type="text" id="tble-txt-name2" class"personalview" autoComplete="off"value="' +
              result[i].Name2 +
              '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-worklocation2" class"personalview" autoComplete="off"value="' +
              result[i].WorkLocation2 +
              '"></input></td>';
            cols +=
              '<td><input type="text" id="tble-txt-contactnumber2" class"personalview" autoComplete="off"value="' +
              result[i].ContactNumber2 +
              '"></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicEmergencyContact").append(newrow);
          }
        }
      });

    newweb.lists
      .getByTitle("PersonalDataFormContactPersonOut")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "Name3",
        "Relation3",
        "ContactNumber3",

      )
      .filter("PersonalItemid eq '" + id + "'")
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
              '<td><input type="text" id="tble-txt-name3" class"personalview" autoComplete="off"value="' +
              result[i].Name3 +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-relation3" class"personalview" autoComplete="off"value="' +
              result[i].Relation3 +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-contactnumber3" class"personalview" autoComplete="off"value="' +
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

      )

      .filter("PersonalItemid eq '" + id + "'")
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
              '<td><input type="text"  id="tble-txt-University" class"personalview" autoComplete="off"value="' +
              result[i].University +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Name-qualification" class"personalview" autoComplete="off"value="' +
              result[i].Qualification +
              '"></input></td>';
            colss +=
              '<td><input type="text"   id="tble-txt-year_of_grt" class"personalview" autoComplete="off"value="' +
              result[i].YearofGraducation +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3").append(newrows);
          }
        }
      });

    //

    newweb.lists
      .getByTitle("Personal Employment History")
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

      )

      .filter("PersonalItemid eq '" + id + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            EmploymentHistorycounter = result[i].OrderNo + 1;
            var newrows = $("<tr>");
            var colss = "";

            colss +=
              '<td><input type="text"  id="tble-txt-OrganizationName" class"personalview" autoComplete="off"value="' +
              result[i].OrganizationName +
              '"></input></td>';

            colss +=

              '<td><input type="text"  id="tble-txt-OrganizationDesignation" class"personalview" autoComplete="off"value="' +

              result[i].Organizationdesc +

              '"></input></td>';
            colss +=
              '<td><input type="month" id="tble-txt-Organization-date-From" class"personalview" autoComplete="off"value="' +
              result[i].From +
              '"></input></td>';
            colss +=
              '<td><input type="month"  id="tble-txt-tble-txt-Organization-date-To" class"personalview" autoComplete="off"value="' +
              result[i].To +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-tble-txt-Years_of_Experience" class"personalview" autoComplete="off"value="' +
              result[i].Experience +
              '"></input></td>';
            colss +=
              '<td><input type="text"  id="tble-txt-Reason_for_leaving" class"personalview" autoComplete="off"value="' +
              result[i].Reason +
              '"></input></td>';

            newrows.append(colss);
            $("table #tble-tbody-dynamic3_Employment_History").append(newrows);
          }
        }
      });

    newweb.lists
      .getByTitle("Personal Research")
      .items.select(
        "ID",
        "PersonalItemid",
        "OrderNo",
        "ResearchName",
        "Researchcategory",
        "year",

      )

      .filter("PersonalItemid eq '" + id + "'")
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
              '<td><input type="text"   id="tble-txt-name-Research" class"personalview" autoComplete="off"value="' +
              result[i].ResearchName +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-Category-Research" class"personalview"  autoComplete="off"value="' +
              result[i].Researchcategory +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-year-Research" class"personalview" autoComplete="off"value="' +
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

      )

      .filter("PersonalItemid eq '" + id + "'")
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
              '<td><input type="text"   id="tble-txt-Name-ResearchDetails" class"personalview" autoComplete="off"value="' +
              result[i].Name +
              '"></input></td>';

            colss +=
              '<td><input type="text"  id="tble-txt-Email-ResearchDetails" class"personalview"  autoComplete="off"value="' +
              result[i].Email +
              '"></input></td>';
            colss +=
              '<td><input type="text" id="tble-txt-contactno-ResearchDetails" class"personalview"  autoComplete="off"value="' +
              result[i].Contact +
              '"></input></td>';
            newrows.append(colss);
            $("table #tble-tbody-dynamicemployreference").append(newrows);
          }
        }
      });
    setTimeout(() => {
      $("input").attr("disabled", "disabled");
      $("textarea").attr("disabled", "disabled");
    }, 2000);

  }

  public Updatepersonallistitembycurentuser() {
    var malefemle = $("#MaritalStatus").find(":selected").text();

    if ($(".YesHaveyoueverapplied").is(":checked")) {
      var Yes = "Yes";
    } else {
      Yes = "No";
    }

    if ($("#spouse").is(":checked")) {
      var Spouse = "Yes";
    } else {
      Spouse = "No";
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
    } else {
      dataflowYes = "No";
    }
    var mobileno = $(`.MobileNos`).val();
    var contactcodem = $(`#country-codeMobileNo`).find(":selected").text();
    var allnos = contactcodem + "-" + mobileno;
    // debugger;
    newweb.lists
      .getByTitle("Personal Information Master")
      .items.getById(PersonalItemId)
      .update({
        Title: "PERSONAL INFORMATION FORM",
        FullName: $(`.full-nameitem`).val(),
        PlaceofBirth: $(`.pob`).val(),
        DateofBirth: moment($(`.dob`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
        CurrentNationality: $(`.Current-Nationality`).val(),
        PreviousNationality: $(`.Previous-Nationality`).val(),
        Religion: $(`.religions`).val(),
        Section: $(`.sections`).val(),
        Entered: $(`.entereds`).val(),
        Port: $(`.ports`).val(),
        ContactNumber: $(`.contactnumbers`).val(),
        SponsorName: $(`.SponsorNames`).val(),
        DocumentNo: $(`.documentnos`).val(),
        PlaceofIssue: $(`.pos`).val(),
        DateofIssue: moment($(`.dos`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
        DateofExpiry: moment($(`.dos`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
        ResidenceNo: $(`.residenceNos`).val(),
        RelativeName: $("#RelativeName").val(),
        // Academic: $(`.academics`).val(),
        // Qualification: $(`.Qualifications`).val(),
        // DateofQualification: $(`.doq`).val(),

        // Country: $(`.countrys`).val(),
        // Languages: $(`.Languagess`).val(),
        MaritalStatus: malefemle,
        BloodGroup: $(`.bloodgroups`).val(),
        NameofSpouse: $(`.nos`).val(),

        Nationality21: $(`.Nationalitys2`).val(),
        PlaceofBirth2: $(`.pob2`).val(),
        DateofBirth2: moment($(`.dob2`).val(), "YYYY-MM-DD").format("M/D/YYYY"),
        PlaceofWork: $(`.pow`).val(),
        Occupation2: $(`.Occupations2`).val(),
        FathersName: $(`.FathersNames`).val(),
        Nationality3: $(`.Nationalitys3`).val(),

        PlaceofBirth3: $(`.pobs3`).val(),
        DateofBirth3: moment($(`.dobs3`).val(), "YYYY-MM-DD").format(
          "M/D/YYYY"
        ),
        HomeAddress3: $(`.homeaddress3`).val(),
        Occupation3: $(`.Occupations3`).val(),

        MothersName: $(`.MothersNames`).val(),

        Nationality4: $(`.Nationalitys4`).val(),
        PlaceofBirth4: $(`.pobs4`).val(),
        DateofBirth4: moment($(`.dobs4`).val(), "YYYY-MM-DD").format(
          "M/D/YYYY"
        ),
        HomeAddress4: $(`.HomeAddresss4`).val(),
        Occupation4: $(`.Occupations4`).val(),

        CountryNumber: $(`.CountrysNumbers`).val(),
        EmailID: $(`.emailsids`).val(),
        jobappliedfor: $(`.jobappliedfors`).val(),

        NameofCompany: $(`.NameofCompanys`).val(),

        Position: $(`.positions`).val(),
        WorkLocation: $(`.WorkLocations`).val(),
        Emirate: $(`.Emirates`).val(),
        Street: $(`.Streets`).val(),
        Owner: $(`.Owners`).val(),
        FlatNo: $(`.FlatNos`).val(),
        Plot: $(`.plots`).val(),
        PostBox: $(`.PostBoxs`).val(),

        TelephoneNo: $(`.telephonenos`).val(),

        MobileNo: allnos,
        LicenseNo: $(`.LicenseNos`).val(),
        IssueDate: moment($(`.IssueDates`).val(), "YYYY-MM-DD").format(
          "M/D/YYYY"
        ),
        ExpiryDate: moment($(`.ExpiryDates`).val(), "YYYY-MM-DD").format(
          "M/D/YYYY"
        ),

        NewRegistration: newregstation,
        UserName: $(`.usersnames`).val(),
        Password: $(`.Passwords`).val(),
        DrivingLicenseNo: $(`.drivinglicenselos`).val(),
        PlateNo: $(`.PlateNoss`).val(),
        dataflowNO: dataflowYes,
        Friend: Friend,
        AnyOtherCloseRelative: AnyOtherCloseRelative,
        NoRelative: NoRelative,
        Cousin: Cousin,
        Sister: Sister,
        Borther: Brother,
        Spouse: Spouse,
        HaveyoueverApplied: Yes,
        UnitLogo: LogoUrl,
        Status: "Updated by Unit HR",
      })
      .then((results: any) => {
        //(results.data.ID);
        //  this.AddTableToList(results.data.ID);
        swal({
          title: "Item Updated Successfully",

          icon: "success",
        }).then(() => {
          location.reload();
        });
      });

    // }
  }

  ///country

  public async GetCountries() {
    var reactHandler = this;
    this.getCountryName();
    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryCode")
      .top(5000)
      .get()
      .then((items) => {
        for (var i = 0; i < items.length; i++) {
          //   AvailableCountries.push(items[i].CountryName)
        }
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
        ).files[0];
        fileArr.push(fileVal);

        //(fileArr.push(fileVal));
      }
      for (var i = 0; i < fileArr.length; i++) {
        CurrentTime = moment().format("DMYYYYHMS"); //1110202191045
        var NameofTable = "Updated-Resume";
        var tempfilename = fileArr[i].name.split(".");
        FileNameGenerated =
          tempfilename[0] + "-" + NameofTable + "." + tempfilename[1] + "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAttachments/VPSSharepoint`
          )
          .files.add(FileNameGenerated, fileArr[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Updated Resume",
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr1.push(fileVal1);

        //(fileArr1.push(fileVal1));
      }
      for (var i = 0; i < fileArr1.length; i++) {
        var NameofTable1 = "High-QualityPhoto";
        var tempfilename1 = fileArr1[i].name.split(".");
        FileNameGenerated1 =
          tempfilename1[0] + "-" + NameofTable1 + "." + tempfilename1[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr2.push(fileVal2);

        //(fileArr2.push(fileVal2));
      }
      for (var i = 0; i < fileArr2.length; i++) {
        var NameofTable2 = "passportcopy-frontpage";
        var tempfilename2 = fileArr2[i].name.split(".");
        FileNameGenerated2 =
          tempfilename2[0] + "-" + NameofTable2 + "." + tempfilename2[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArrpassport.push(fileValpassport);
      }
      for (var i = 0; i < fileArrpassport.length; i++) {
        var NameofTablepassport = "passport-backpage";
        var tempfilenamepassport = fileArrpassport[i].name.split(".");
        FileNameGeneratedpassport =
          tempfilenamepassport[0] +
          "-" +
          NameofTablepassport +
          "." +
          tempfilenamepassport[1] +
          "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr4.push(fileVal4);
      }
      for (var i = 0; i < fileArr4.length; i++) {
        var NameofTable4 = "Previousvisa";
        var tempfilename4 = fileArr4[i].name.split(".");
        FileNameGenerated4 =
          tempfilename4[0] + "-" + NameofTable4 + "." + tempfilename4[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr5.push(fileVal5);

        //(fileArr5.push(fileVal5));
      }
      for (var i = 0; i < fileArr5.length; i++) {
        var NameofTable5 = "previous-emiratesid";
        var tempfilename5 = fileArr5[i].name.split(".");
        FileNameGenerated5 =
          tempfilename5[0] + "-" + NameofTable5 + "." + tempfilename5[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr6.push(fileVal6);

        //(fileArr6.push(fileVal6));
      }
      for (var i = 0; i < fileArr6.length; i++) {
        var NameofTable6 = "Insurance-continuity-letter";
        var tempfilename6 = fileArr6[i].name.split(".");
        FileNameGenerated6 =
          tempfilename6[0] + "-" + NameofTable6 + "." + tempfilename6[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr7.push(fileVal7);

        //(fileArr7.push(fileVal7));
      }
      for (var i = 0; i < fileArr7.length; i++) {
        var NameofTable7 = "Sponsors passportvisa";
        var tempfilename7 = fileArr7[i].name.split(".");
        FileNameGenerated7 =
          tempfilename7[0] + "-" + NameofTable7 + "." + tempfilename7[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr9.push(fileVal9);

        //(fileArr9.push(fileVal9));
      }
      for (var i = 0; i < fileArr9.length; i++) {
        var NameofTable9 = "PG-degree";
        var tempfilename9 = fileArr9[i].name.split(".");
        FileNameGenerated9 =
          tempfilename9[0] + "-" + NameofTable9 + "." + tempfilename9[1] + "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr10.push(fileVal10);

        //(fileArr10.push(fileVal10));
      }
      for (var i = 0; i < fileArr10.length; i++) {
        var NameofTable10 = "HBachelor-UG-degree";
        var tempfilename10 = fileArr10[i].name.split(".");
        FileNameGenerated10 =
          tempfilename10[0] +
          "-" +
          NameofTable10 +
          "." +
          tempfilename10[1] +
          "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr11.push(fileVal11);

        //(fileArr11.push(fileVal11));
      }

      for (var i = 0; i < fileArr11.length; i++) {
        var NameofTable11 = "Highersecondary";
        var tempfilename11 = fileArr11[i].name.split(".");
        FileNameGenerated11 =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr12.push(fileVal12);

        //(fileArr12.push(fileVal12));
      }
      for (var i = 0; i < fileArr12.length; i++) {
        var NameofTable12 = "Highschool";
        var tempfilename12 = fileArr12[i].name.split(".");
        FileNameGenerated12 =
          tempfilename12[0] +
          "-" +
          NameofTable12 +
          "." +
          tempfilename12[1] +
          "";

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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "All-experience-certificates";
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
                  Tags: "All experience certificate",
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
                })
                .then((myupdate) => {
                  //("File uploaded sucessfully : " + i + "");
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
    $("#upload_licencefile").on(
      "click",
      ".licencecross",
      function (event) {
        //("hi");
        $("#moh_dha_lience").show();
        $(".licenence-block").remove();
        $("#moh_dha_lience").val("");

        $("#uploadedlicence-yes").hide();
        $("#uploaded_licence-no").show();
      }
    );











    $("#Updated_Resume").on("change", function (event) {
      $("#Updated_Resume-yes").show();
      $("#Updated_Resume-no").hide();
      $(".yes1").attr("style", "color:#00A36C");
    });

    $("#Updated_Resume").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#Updated_Resume") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "Updated_Resumefile-block" }),
        fileName = $("<span/>", {
          class: "Updated_Resumename",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="UpdatedResumecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Updated_ResumefilesList").append(fileBloc);
      $("#Updated_Resume").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".UpdatedResumecross",
      function (event) {
        //("hi");
        $("#Updated_Resume").show();
        $(".Updated_Resumefile-block").remove();
        $("#Updated_Resume").val("");

        $("#Updated_Resume-yes").hide();
        $("#Updated_Resume-no").show();
      }
    );

    $("#High-QualityPhoto").on("change", function (event) {
      $("#QualityPhoto-yes").show();
      $("#QualityPhoto-no").hide();
      $(".yes2").attr("style", "color:#00A36C");
    });

    $("#High-QualityPhoto").on("change", function (e) {
      var fileArr2 = [];
      let fileVal13 = (
        document.querySelector("#High-QualityPhoto") as HTMLInputElement
      ).files[0];
      fileArr2.push(fileVal13);
      // for(var i = 0; i < fileArr2.length; i++){
      let fileBloc = $("<span/>", { class: "High-QualityPhotofile-block" }),
        fileName = $("<span/>", {
          class: "High-QualityPhotoname",
          text: fileArr2[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete12"><span class="HighQualityPhotocross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#High-QualityPhotofilesList").append(fileBloc);
      $("#High-QualityPhoto").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".HighQualityPhotocross",
      function (event) {
        //("hi");
        $("#High-QualityPhoto").show();
        $(".High-QualityPhotofile-block").remove();
        $("#High-QualityPhoto").val("");

        $("#QualityPhoto-yes").hide();
        $("#QualityPhoto-no").show();
      }
    );

    $("#passportcopy-frontpage").on("change", function (event) {
      $("#passportcopy-yes").show();
      $("#passportcopy-no").hide();
      $(".yes3").attr("style", "color:#00A36C");
    });

    $("#passportcopy-frontpage").on("change", function (e) {
      var fileArr4 = [];
      let fileVal13 = (
        document.querySelector("#passportcopy-frontpage") as HTMLInputElement
      ).files[0];
      fileArr4.push(fileVal13);
      // for(var i = 0; i < fileArr3.length; i++){
      let fileBloc = $("<span/>", {
        class: "passportcopy-frontpagefile-block",
      }),
        fileName = $("<span/>", {
          class: "passportcopy-frontpagename",
          text: fileArr4[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete11"><span class="passportcopyfrontpagecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#passportcopy-frontpagefilesList").append(fileBloc);
      $("#passportcopy-frontpage").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".passportcopyfrontpagecross",
      function (event) {
        //("hi");
        $("#passportcopy-frontpage").show();
        $(".passportcopy-frontpagefile-block").remove();
        $("#passportcopy-frontpage").val("");
        $("#passportcopy-yes").hide();
        $("#passportcopy-no").show();
      }
    );

    $("#passportbackpage").on("change", function (event) {
      $("#passportbackpage-yes").show();
      $("#passportbackpage-no").hide();
      $(".yes4").attr("style", "color:#00A36C");
    });

    $("#passportbackpage").on("change", function (e) {
      var fileArr5 = [];
      let fileVal13 = (
        document.querySelector("#passportbackpage") as HTMLInputElement
      ).files[0];
      fileArr5.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "passportbackpagefile-block" }),
        fileName = $("<span/>", {
          class: "passportbackpagename",
          text: fileArr5[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete8"><span class="passportbackpagecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#passportbackpagefilesList").append(fileBloc);
      $("#passportbackpage").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".passportbackpagecross",
      function (event) {
        //("hi");
        $("#passportbackpage").show();
        $(".passportbackpagefile-block").remove();
        $("#passportbackpage").val("");

        $("#passportbackpage-yes").hide();
        $("#passportbackpage-no").show();
      }
    );

    $("#Previousvisa").on("change", function (event) {
      $("#Previousvisa-yes").show();
      $("#Previousvisa-no").hide();
      $(".yes5").attr("style", "color:#00A36C");
    });

    $("#Previousvisa").on("change", function (e) {
      var fileArr6 = [];
      let fileVal13 = (
        document.querySelector("#Previousvisa") as HTMLInputElement
      ).files[0];
      fileArr6.push(fileVal13);
      // for(var i = 0; i < fileArr6.length; i++){
      let fileBloc = $("<span/>", { class: "Previousvisafile-block" }),
        fileName = $("<span/>", {
          class: "Previousvisaaname",
          text: fileArr6[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete120"><span class="Previousvisacross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#PreviousvisafilesList").append(fileBloc);
      $("#Previousvisa").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".Previousvisacross",
      function (event) {
        //("hi");
        $("#Previousvisa").show();
        $(".Previousvisafile-block").remove();
        $("#Previousvisa").val("");

        $("#Previousvisa-yes").hide();
        $("#Previousvisa-no").show();
      }
    );

    $("#previous-emiratesid").on("change", function (event) {
      $("#emiratesid-yes").show();
      $("#emiratesid-no").hide();
      $(".yes6").attr("style", "color:#00A36C");
    });

    $("#previous-emiratesid").on("change", function (e) {
      var filearr7 = [];
      let fileVal13 = (
        document.querySelector("#previous-emiratesid") as HTMLInputElement
      ).files[0];
      filearr7.push(fileVal13);
      // for(var i = 0; i < filearr7.length; i++){
      let fileBloc = $("<span/>", { class: "previous-emiratesidfile-block" }),
        fileName = $("<span/>", {
          class: "previous-emiratesidaname",
          text: filearr7[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete7"><span class="previousemiratesidcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#previous-emiratesidfilesList").append(fileBloc);
      $("#previous-emiratesid").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".previousemiratesidcross",
      function (event) {
        //("hi");
        $("#previous-emiratesid").show();
        $(".previous-emiratesidfile-block").remove();
        $("#previous-emiratesid").val("");

        $("#emiratesid-yes").hide();
        $("#emiratesid-no").show();
      }
    );

    $("#Insurance_continuity_letter").on("change", function (event) {
      $("#Insurance_continuity_letter-yes").show();
      $("#Insurance_continuity_letter-no").hide();
      $(".yes7").attr("style", "color:#00A36C");
    });

    $("#Insurance_continuity_letter").on("change", function (e) {
      var fileArr8 = [];
      let fileVal13 = (
        document.querySelector(
          "#Insurance_continuity_letter"
        ) as HTMLInputElement
      ).files[0];
      fileArr8.push(fileVal13);
      // for(var i = 0; i < fileArr8.length; i++){
      let fileBloc = $("<span/>", {
        class: "Insurance_continuity_letterfile-block",
      }),
        fileName = $("<span/>", {
          class: "Insurance_continuity_lettername",
          text: fileArr8[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete6"><span class="Insurancecontinuitylettercross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Insurance_continuity_letterfilesList").append(fileBloc);
      $("#Insurance_continuity_letter").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".Insurancecontinuitylettercross",
      function (event) {
        //("hi");
        $("#Insurance_continuity_letter").show();
        $(".Insurance_continuity_letterfile-block").remove();
        $("#Insurance_continuity_letter").val("");

        $("#Insurance_continuity_letter-yes").hide();
        $("#Insurance_continuity_letter-no").show();
      }
    );

    $("#Sponsors_passportvisa").on("change", function (event) {
      $("#Sponsors_passportvisa-yes").show();
      $("#Sponsors_passportvisa-no").hide();
      $(".yes8").attr("style", "color:#00A36C");
    });

    $("#Sponsors_passportvisa").on("change", function (e) {
      var fileArr9 = [];
      let fileVal13 = (
        document.querySelector("#Sponsors_passportvisa") as HTMLInputElement
      ).files[0];
      fileArr9.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "Sponsors_passportvisafile-block" }),
        fileName = $("<span/>", {
          class: "Sponsors_passportvisaname",
          text: fileArr9[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete5"><span class="Sponsorspassportvisacross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Sponsors_passportvisafilesList").append(fileBloc);
      $("#Sponsors_passportvisa").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".Sponsorspassportvisacross",
      function (event) {
        //("hi");
        $("#Sponsors_passportvisa").show();
        $(".Sponsors_passportvisafile-block").remove();
        $("#Sponsors_passportvisa").val("");

        $("#Sponsors_passportvisa-yes").hide();
        $("#Sponsors_passportvisa-no").show();
      }
    );

    $("#PG-degree").on("change", function (event) {
      $("#PG-degree-yes").show();
      $("#PG-degree-no").hide();
      $(".yes9").attr("style", "color:#00A36C");
    });

    $("#PG-degree").on("change", function (e) {
      var fileArr10 = [];
      let fileVal13 = (document.querySelector("#PG-degree") as HTMLInputElement)
        .files[0];
      fileArr10.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "PG-degreefile-block" }),
        fileName = $("<span/>", {
          class: "PG-degreename",
          text: fileArr10[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete4"><span class="PGdegreecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#PG-degreefilesList").append(fileBloc);
      $("#PG-degree").hide();
      // };
    });
    $("table #tble-tbody-Attachments-academic").on(
      "click",
      ".PGdegreecross",
      function (event) {
        //("hi");
        $("#PG-degree").show();
        $(".PG-degreefile-block").remove();
        $("#PG-degree").val("");

        $("#PG-degree-yes").hide();
        $("#PG-degree-no").show();
      }
    );

    $("#HBachelor-UG-degree").on("change", function (event) {
      $("#HBachelor-UG-degree-yes").show();
      $("#HBachelor-UG-degree-no").hide();
      $(".yes10").attr("style", "color:#00A36C");
    });

    $("#HBachelor-UG-degree").on("change", function (e) {
      var fileArr13 = [];
      let fileVal13 = (
        document.querySelector("#HBachelor-UG-degree") as HTMLInputElement
      ).files[0];
      fileArr13.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "UG-degreefile-block" }),
        fileName = $("<span/>", {
          class: "UG-degreename",
          text: fileArr13[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete4"><span class="UGdegreecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#UG-degreefilesList").append(fileBloc);
      $("#HBachelor-UG-degree").hide();
      // };
    });
    $("table #tble-tbody-Attachments-academic").on(
      "click",
      ".UGdegreecross",
      function (event) {
        //("hi");
        $("#HBachelor-UG-degree").show();
        $(".UG-degreefile-block").remove();
        $("#HBachelor-UG-degree").val("");

        $("#HBachelor-UG-degree-yes").hide();
        $("#HBachelor-UG-degree-no").show();
      }
    );

    $("#Highersecondary").on("change", function (event) {
      $("#Highersecondary-yes").show();
      $("#Highersecondary-no").hide();
      $(".yes11").attr("style", "color:#00A36C");
    });

    $("#Highersecondary").on("change", function (e) {
      var fileArr13 = [];
      let fileVal13 = (
        document.querySelector("#Highersecondary") as HTMLInputElement
      ).files[0];
      fileArr13.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "Highersecondaryfile-block" }),
        fileName = $("<span/>", {
          class: "Highersecondaryname",
          text: fileArr13[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete3"><span class="Highersecondarycross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#HighersecondaryfilesList").append(fileBloc);
      $("#Highersecondary").hide();
      // };
    });
    $("table #tble-tbody-Attachments-academic").on(
      "click",
      ".Highersecondarycross",
      function (event) {
        //("hi");
        $("#Highersecondary").show();
        $(".Highersecondaryfile-block").remove();
        $("#Highersecondary").val("");

        $("#Highersecondary-yes").hide();
        $("#Highersecondary-no").show();
      }
    );

    $("#Highschool").on("change", function (event) {
      $("#Highschool-yes").show();
      $("#Highschool-no").hide();
      $(".yes12").attr("style", "color:#00A36C");
    });

    $("#Highschool").on("change", function (e) {
      var fileArr13 = [];
      let fileVal13 = (
        document.querySelector("#Highschool") as HTMLInputElement
      ).files[0];
      fileArr13.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "Highschoolfile-block" }),
        fileName = $("<span/>", {
          class: "Highschoolname",
          text: fileArr13[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete2"><span class="highschoolcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#HighschoolfilesList").append(fileBloc);
      $("#Highschool").hide();
      // };
    });
    $("table #tble-tbody-Attachments-academic").on(
      "click",
      ".highschoolcross",
      function (event) {
        //("hi");
        $("#Highschool").show();
        $(".Highschoolfile-block").remove();
        $("#Highschool").val("");

        $("#Highschool-yes").hide();
        $("#Highschool-no").show();
      }
    );

    $("#allexperience").on("change", function (event) {
      $("#allexperience-yes").show();
      $("#allexperience-no").hide();
      $(".yes13").attr("style", "color:#00A36C");
    });

    $("#allexperience").on("change", function (e) {
      var fileArr13 = [];
      let fileVal13 = (
        document.querySelector("#allexperience") as HTMLInputElement
      ).files[0];
      fileArr13.push(fileVal13);
      // for(var i = 0; i < fileArr13.length; i++){
      let fileBloc = $("<span/>", { class: "file-block" }),
        fileName = $("<span/>", {
          class: "allexpname",
          text: fileArr13[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete1"><span class="allexpcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#filesList").append(fileBloc);
      $("#allexperience").hide();
      // };
    });
    $("table #tble-tbody-Attachments-academic").on(
      "click",
      ".allexpcross",
      function (event) {
        let name = $("span.allexpname").text();
        $(this).closest(name).remove();
        //("h");
        $("#allexperience").show();
        $(".file-block").remove();
        $("#allexperience").val("");

        $("#allexperience-yes").hide();
        $("#allexperience-no").show();
      }
    );
  }
  public Getfolderitrm(curentName) {
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
      var licencefileurl = []

      var str = `${this.state.CurrentUserName}`;
      var name = curentName;
      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`PersonalAttachments/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          console.log(files);

          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);
          }

          for (var i = 0; i < allitem.length; i++) {
            if (
              allitem[i].ListItemAllFields.Tags == "All experience certificate"
            ) {
              allitem3.push(allitem[i]);
              //(allitem3[i]);
              allexpurl = allitem3[0].ServerRelativeUrl;
              $("#allexperience").hide();
              $(".allexpitem").show();
              $(".allexpdelete").hide();
              $("#allexperience-yes").show();
              $(".yes13").attr("style", "color:#00A36C");
              $("#allexperience-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "High School") {
              allitem32.push(allitem[i]);
              Highschoolurl = allitem32[0].ServerRelativeUrl;
              $("#Highschool").hide();
              $(".highschoolitem").show();
              $(".highschooldelete").hide();
              $(".yes12").attr("style", "color:#00A36C");
              $("#Highschool-yes").show();
              $("#Highschool-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Higher Secondary") {
              allitem33.push(allitem[i]);
              Highersecondaryurl = allitem33[0].ServerRelativeUrl;
              $("#Highersecondary").hide();
              $(".higheritem").show();
              $(".higherdelete").hide();
              $(".yes11").attr("style", "color:#00A36C");
              $("#Highersecondary-yes").show();
              $("#Highersecondary-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "UG Degree") {
              allitem34.push(allitem[i]);
              UGdegreeurl = allitem34[0].ServerRelativeUrl;
              $("#HBachelor-UG-degree").hide();
              $(".ugitem").show();
              $(".ugdelete").hide();
              $(".yes10").attr("style", "color:#00A36C");
              $("#HBachelor-UG-degree-yes").show();
              $("#HBachelor-UG-degree-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "PG Degree") {
              allitem36.push(allitem[i]);
              PGdegreeurl = allitem36[0].ServerRelativeUrl;
              $("#PG-degree").hide();
              $(".PGitem").show();
              $(".pgdelete").hide();
              $(".yes9").attr("style", "color:#00A36C");
              $("#PG-degree-yes").show();
              $("#PG-degree-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Sponsors-passport visa") {
              allitem37.push(allitem[i]);
              Sponsorpassportvisaurl = allitem37[0].ServerRelativeUrl;
              $("#Sponsors_passportvisa").hide();
              $(".Sponsorspassportvisaitem").show();
              $(".Sponsorspassportvisadelete").hide();
              $("#Sponsors_passportvisa-yes").show();
              $(".yes8").attr("style", "color:#00A36C");
              $("#Sponsors_passportvisa-no").hide();
            }
            //
            if (
              allitem[i].ListItemAllFields.Tags == "Insurance continuity letter"
            ) {
              allitem38.push(allitem[i]);
              Insurancecontinuityletterurl = allitem38[0].ServerRelativeUrl;
              $("#Insurance_continuity_letter").hide();
              $(".Insuranceletteritem").show();
              $(".Insurance_continuity_letterdelete").hide();
              $(".yes7").attr("style", "color:#00A36C");
              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
            }
            //
            if (allitem[i].ListItemAllFields.Tags == "Perivous EmiratesId") {
              allitem39.push(allitem[i]);
              PreviousemiratesIDurl = allitem39[0].ServerRelativeUrl;
              $("#previous-emiratesid").hide();
              $(".emiratesiditem").show();
              $(".emiratesiddelete").hide();
              $(".yes6").attr("style", "color:#00A36C");
              $("#emiratesid-yes").show();
              $("#emiratesid-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Perivous Visa") {
              allitem310.push(allitem[i]);
              Previousvisaurl = allitem310[0].ServerRelativeUrl;
              $("#Previousvisa").hide();
              $(".perivousvisaitem").show();
              $(".perivousvisadelete").hide();
              $(".yes5").attr("style", "color:#00A36C");
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Backpart") {
              allitem311.push(allitem[i]);
              passportbackurl = allitem311[0].ServerRelativeUrl;
              $("#passportbackpage").hide();
              $(".passportbackitem").show();
              $(".passportbacktdelete").hide();
              $(".yes4").attr("style", "color:#00A36C");
              $("#passportbackpage-yes").show();
              $("#passportbackpage-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Passport Frontpart") {
              allitem312.push(allitem[i]);
              passportfronturl = allitem312[0].ServerRelativeUrl;
              $("#passportcopy-frontpage").hide();
              $(".passportfrontitem").show();
              $(".passportfrontdelete").hide();
              $(".yes3").attr("style", "color:#00A36C");
              $("#passportcopy-yes").show();
              $("#passportcopy-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Updated Resume") {
              allitem314.push(allitem[i]);
              resumeurl = allitem314[0].ServerRelativeUrl;
              $("#Updated_Resume").hide();
              $(".resumeurlitem").show();
              $(".resumedelete").hide();
              $("#Updated_Resume-yes").show();
              $("#Updated_Resume-no").hide();
              $(".yes1").attr("style", "color:#00A36C");
            }


            if (allitem[i].ListItemAllFields.Tags == "Licence DHA OR MOH") {
              licencefileurl.push(allitem[i]);
              licencefile = licencefileurl[0].ServerRelativeUrl;
              $("#moh_dha_lience").hide();
              $(".licenceitem").show();
              $(".licencefile_delete").hide();
              $("#uploadedlicence-yes").show();
              $("#uploaded_licence-no").hide();
              $(".yeslicence").attr("style", "color:#00A36C");


            }
          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "High Quality Photo") {
              allitem313.push(allitem[i]);
              photourl = allitem313[0].ServerRelativeUrl;
              $("#High-QualityPhoto").hide();
              $(".photourlitem").show();
              $(".photodelete").hide();
              $(".yes2").attr("style", "color:#00A36C");
              $("#QualityPhoto-yes").show();
              $("#QualityPhoto-no").hide();
            }
          }
        });
    }
  }

  public deletedocumentlibrary(Mod) {

    swal({
      title: "Are you sure?",
      text: "You Want Delete This Item",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    } as any).then((willadd) => {

      if (willadd) {


        if




          (Mod == "resume") {
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
              $("#Previousvisa-yes").show();
              $("#Previousvisa-no").hide();
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
        } else if (Mod == "Insurance_continuity_letter") {
          newweb
            .getFileByServerRelativeUrl(Insurancecontinuityletterurl)
            .recycle()
            .then(function (data) {
              $("#Insurance_continuity_letter").show();
              $(".Insuranceletteritem").hide();
              $(".Insurance_continuity_letterdelete").hide();

              $("#Insurance_continuity_letter-yes").show();
              $("#Insurance_continuity_letter-no").hide();
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
              $("#moh_dha_lience").show();

              $(".licenceitem").hide();
              $(".licencefile_delete").hide();

              $("#uploadedlicence-yes").hide();
              $("#uploaded_licence-no").show();
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

  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

  }


  public Autochangefieldnameduringtyping() {
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

  }


  public GetReligiondata() {


    newweb.lists
      .getByTitle("Religion Master")
      .items.select("Title", "ID")
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
      .items.select("Title", "ID").orderBy("Title", true)
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




  // public Hideshowitem(){


  //   $("#Doh-license").on("change", function () {
  //     $("#err-countrycode").hide();
  //   });
  // }


  public render(): React.ReactElement<IHrOnboardingFormProps> {
    var handler = this;
    // const { selectedOption1 } = this.state;
    // const { selectedOption2 } = this.state;
    // const { selectedOption3 } = this.state;
    // const { selectedOption4 } = this.state;
    // const { selectedOption5 } = this.state;
    // const { selectedOption6 } = this.state;

    const Religionsitem: JSX.Element[] = this.state.Religiondata.map(
      function (item, key) {
        // //(item);
        return <option value={item.Title}>{item.Title}</option>;
      }
    );

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
        // //(item);
        return <option value={item.CountryCode}>{item.CountryCode}</option>;
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
      <div>
        <div className="dashboard_right_heading">
          {handler.state.Dynamiclogo &&
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
          <img
            id="imgpersonalitemid"
            className="itemidimgpersonal"
            style={{ display: "none", height: "50px" }}
            src={`${ImageSrcpersonal}`}
            alt="error"
          ></img>

          <span>Personal information</span>
        </div>

        <div className="dashboard_right_ffamily">
          <div className="personal_info_top">
            <div className="personal_info_part">
              <div className="row form">
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
                    className="error-validation"
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
                      className="form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                      className="form-control dob dobpersonal personalview"
                      autoComplete="off"
                    />
                    <span className="floating-label ">Date of Birth</span>
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
                      className="form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                      className="Current-Nationality form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                      className="Previous-Nationality form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                      <option value="Select">Select</option>
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
                      Section<i className="required">*</i>
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
                    <input
                      type="text"
                      id="Port"
                      name="Port"
                      className="form-control ports personalview"
                      autoComplete="off"
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
                    <select
                      id="country-code"
                      className="form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
                      {Countrycodesitem}
                    </select>
                    <span className="floating-label ">
                      Contact Code <i className="required">*</i>
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
                      <option value="-">Select</option>
                      {this.state.SponserNamesData && this.state.SponserNamesData.map(function (item, key) {
                        return (
                          <option value={`${item.Title}`}>{item.Title}</option>
                        )
                      })}
                    </select>
                    <span className="floating-label ">
                      Sponsor Name <i className="required">*</i>
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
            </div>
            <div className="personal_info_part">
              <div className="passport_heading_title personal_information_title">
                <h3> Passport & residence particulars </h3>
              </div>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="DocumentNo"
                      className="form-control documentnos personalview"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      Pass/Travel Document No <i className="required">*</i>
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
                    <input
                      type="text"
                      id="ResidenceNo"
                      name="ResidenceNo"
                      className="form-control residenceNos personalview"
                      autoComplete="off"
                    />
                    <span className="floating-label ">
                      Residence No <i className="required">*</i>
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

            <div className="perfactional_qualification personal_info_part">
              <div className="table-wrapper-date clearfix">
                <div className="table-search personal_information_title">
                  <h3 className="contact-pg-title ">
                    Professional qualification/certification details{" "}
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
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-dynamic3">
                    <tr id="Universityqualification-tr">
                      <td>
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

            <div className="Employment_history add_new_row_btn personal_info_part">
              <div className="table-wrapper-date clearfix">
                <div className="table-search personal_information_title">
                  <h3 className="contact-pg-title">Employment history </h3>
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
                      <th scope="col">Organization Name & Address </th>
                      <th scope="col">Designation </th>
                      <th scope="col">From (mm/yyyy) </th>
                      <th scope="col">To (mm/yyyy) </th>
                      <th scope="col">Years of Experience </th>
                      <th scope="col">Reason for leaving</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-dynamic3_Employment_History">
                    <tr id="employmenthistory-tr">
                      <td>
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
                          maxLength={2}
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
                    Research & publication details{" "}
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

                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-dynamicResearch">
                    <tr id="Research-tr">
                      <td>
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

            <div className="perfactional_qualification add_new_row_btn personal_info_part">
              <div className="table-wrapper-date clearfix">
                <div className="table-search personal_information_title">
                  <h3 className="contact-pg-title">
                    Employee reference details (last 3 employers){" "}
                  </h3>
                  <span>
                    Note: References may be used for background verification
                    purpose{" "}
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

                      <th scope="col"></th>
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
            <div className="personal_info_part">
              <div className="personal_information_title">
                <h3>Marital status </h3>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <select
                      id="MaritalStatus"
                      className="Status form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                      className="bloodgroups form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
                      {AllBloodgrooup}
                    </select>
                    <span className="floating-label ">
                      Blood Group <i className="required">*</i>
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
                      className="Nationalitys2 form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
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
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered" id="cust-table-block">
                    <thead>
                      <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Gender </th>
                        <th scope="col"> D.O.B </th>
                        <th scope="col"> Passport no </th>
                        <th scope="col"> Emirate no </th>
                      </tr>
                    </thead>

                    <tbody id="tble-tbody-dynamic">
                      <tr id="childlist-tr">
                        <td>
                          <input
                            type="text"
                            id="tble-txt-requested"
                            className="form-control"
                            autoComplete="off"
                          ></input>
                        </td>
                        <td>
                        <select
                      id="PersonalGender"
                      className="form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="tble-txt-child-dob"
                            className="form-control"
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
                <div className="row form">
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
                        className="Nationalitys3 form-control personalviewclasscommom"
                      >
                        <option value="Select">Select</option>
                        {Allcountryname}
                      </select>
                      <span className="floating-label ">
                        Nationality <i className="required">*</i>
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
                        Place of Birth <i className="required">*</i>
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
                      <span className="floating-label">Date of Birth</span>
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
                        Occupation <i className="required">*</i>
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
                        Home Address <i className="required">*</i>
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
                        className="Nationalitys4 form-control personalviewclasscommom"
                      >
                        <option value="Select">Select</option>
                        {Allcountryname}
                      </select>
                      <span className="floating-label ">
                        Nationality <i className="required">*</i>
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
                        Place of Birth <i className="required">*</i>
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
                      <span className="floating-label">Date of Birth</span>
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
                        Occupation <i className="required">*</i>
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
                        Home Address <i className="required">*</i>
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

              <div className="personal_info_parag">
                <div className="personal_information_title">
                  <h3>Home country address</h3>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="country-codehomecountry"
                        className="form-control personalviewclasscommom"
                      >
                        <option value="Select">Select</option>
                        {Countrycodesitem}
                      </select>
                      <span className="floating-label ">
                        Contact Code<i className="required">*</i>
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
                <div className="row form">
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
                </div>

                <div className="">
                  <p className="personal_info_p">
                    {" "}
                    Have you ever applied/ worked with{" "}
                    <span id="bussiness-unit-name">{officename}</span>
                    <span
                      style={{ display: "none" }}
                      id="dynamicbussiness-unit-name"
                    >
                      {" "}
                      {businessdynamicuserunit}
                    </span>{" "}
                    or other units of{" "}
                    <span id="bussiness-unit-name">{officename}</span>
                    <span
                      style={{ display: "none" }}
                      id="dynamicbussiness-unit-name"
                    >
                      {" "}
                      {businessdynamicuserunit}
                    </span>
                    ?{" "}
                  </p>
                </div>

                <div className="row form">
                  <div className="col-md-2">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="YesHaveyoueverapplied personalview"
                          type="checkbox"
                          id="Yes"
                          name="Yes"
                          value="Yes"
                        />
                        <span className="form-check-label">Yes</span>
                      </div>
                    </div>
                    <p
                      className="errorvalidation"
                      id="err-Yes-applied"
                      style={{ whiteSpace: "nowrap", color: "red", display: "none" }}
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
                        If Yes , Name of Company
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
                      <span className="floating-label ">Position</span>
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
                    id="dynamicbussiness-unit-name"
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
                        name="Spouse"
                        value="Spouse"
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
                        name="Brother"
                        value="Brother"
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
                        name="Sister"
                        value="Sister"
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
                        className="ersonalview"
                        type="checkbox"
                        id="Cousin"
                        name="Cousin"
                        value="Cousin"
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
                        name="Any Other Close Relative"
                        value="AnyOtherCloseRelative"
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
                        name="NoRelative"
                        value="someNoRelativething"
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
                        name="Friend"
                        value="Friend"
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

              <div className="work_location_div">
                <p className="personal_info_p">
                  Please specify name & work location of relative/friend in the <span id="bussiness-unit-name">{officename}</span>{" "}
                  <span
                    style={{ display: "none" }}
                    id="dynamicbussiness-unit-name"
                  >
                    {businessdynamicuserunit}
                  </span>
                </p>
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
              </div>
            </div>

            <div className="personal_info_part">
              <div className="personal_information_title">
                <h3>Emergency contact person in UAE</h3>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered" id="cust-table-block2">
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Work Location</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-dynamicEmergencyContact">
                    <tr id="emergency-tr">
                      <td>
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
                <h3>Emergency contact person outside UAE</h3>
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
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-dynamicemergencycontactpepersonoutside">
                    <tr id="outside-tr">
                      <td>
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
            <div className="personal_info_part">
              <div className="personal_information_title add_new_row_btn">
                <h3>Address: if currently living in UAE</h3>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Emirate"
                      className="form-control Emirates personalview"
                      autoComplete="off"
                      min={15}
                      max={15}
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
                      className="form-control personalviewclasscommom"
                    >
                      <option value="Select">Select</option>
                      {Countrycodesitem}
                    </select>
                    <span className="floating-label ">Contact Code</span>
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
                  <h3>License status</h3>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="checkbox"
                        id="Doh-license"
                        value="DOH"
                        className="personalview"
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
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            <input
                              className="dataflowYes personalview"
                              type="checkbox"
                              id="Yes"
                              name="Yes"
                              value="something"
                            />
                            <span className="form-check-label">
                              If Dataflow Completed - Yes
                            </span>
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
                            <span className="form-check-label">
                              If Yes provide the same
                            </span>
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
                    </div>
                  </li>
                  <li>
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
                          <span className="floating-label ">UserName</span>
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
                        <div className="form-group relative">
                          <input
                            type="text"
                            id="Password"
                            name="Password"
                            className="form-control Passwords personalview"
                            autoComplete="off"
                          />
                          <span className="floating-label ">Password</span>
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
                  <li>
                    <p className="personal_info_p">
                      If MOH or DHA please attach Certificate or Eligibility
                      letter{" "}
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
                          />
                          {/* <span className="floating-label ">Licence</span> */}
                        </div>
                        <span
                          className="error-validation"
                          id="err-moh-err-file"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <li>

                          <a
                            href={`${licencefile}`}
                            style={{ display: "none" }}
                            className="licenceitem"
                            target="_blank"
                          >
                            click here
                          </a>
                          <span
                            className="licencefile_delete"
                            style={{ display: "none" }}
                            onClick={() => this.deletedocumentlibrary("dohlicencefile")}
                          >
                            <img
                              className="delete_document_item"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                              alt="image"
                            />
                          </span>
                          <span id="upload_licencefile"></span>

                          <li style={{ display: "none" }} id="uploadedlicence-yes">

                            <img
                              className="attactment-img"
                              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                              alt="error"
                            ></img>
                            <span className="yeslicence">YES</span>
                          </li>
                        </li>
                        <div id="uploaded_licence-no">

                          <span>No</span>
                        </div>
                      </div>
                    </div>

                  </li>
                </ul>
              </div>
              <div className="vehicle-particulars">
                <h4> Vehicle particulars (If In UAE)</h4>
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

              <p className="personal_info_p">
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
                    <span className="floating-label ">Employee Name</span>
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
                  <thead>
                    <tr>
                      <th className="pesonal_info_sno_th" scope="col">#</th>
                      <th className="pesonal_info_detail_th" scope="col">Personal details Attachments Required</th>
                      <th className="pesonal_info_field_th" scope="col">Field </th>

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
                          className=" Updated Resume"
                          type="file"
                          autoComplete="off"
                        ></input>
                        <span
                          className="error-validation"
                          id="err-Updated_Resume"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <a
                          href={`${resumeurl}`}
                          style={{ display: "none" }}
                          className="resumeurlitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                          <span className="yes1">YES</span>
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
                          className="highqui"
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${photourl}`}
                          style={{ display: "none" }}
                          className="photourlitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-QualityPhoto"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="High-QualityPhotofilesList"></span>
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
                          <span className="yes2">YES</span>
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${passportfronturl}`}
                          style={{ display: "none" }}
                          className="passportfrontitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-passportcopy"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="passportcopy-frontpagefilesList"></span>
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
                          <span className="yes3">YES</span>
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${passportbackurl}`}
                          style={{ display: "none" }}
                          className="passportbackitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-passportbackpage"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="passportbackpagefilesList"></span>
                      </td>

                      <td>
                        <li
                          style={{ display: "none" }}
                          id="passportbackpage-yes"
                        >
                          {/* <input
                            type="checkbox"
                            disabled
                            id="passportbackpageyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes4">YES</span>
                        </li>

                        <div id="passportbackpage-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            checked
                            disabled
                            id="passportbackpageno"
                            name="NO"
                          /> */}
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
                          autoComplete="off"
                        ></input>
                        <a
                          href={`${Previousvisaurl}`}
                          style={{ display: "none" }}
                          className="perivousvisaitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-Previousvisa"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="PreviousvisafilesList"></span>
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
                          <span className="yes5">YES</span>
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
                          autoComplete="off"
                        ></input>
                        <a
                          href={`${PreviousemiratesIDurl}`}
                          style={{ display: "none" }}
                          className="emiratesiditem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-emiratesid"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="previous-emiratesidfilesList"></span>
                      </td>

                      <td>
                        <li style={{ display: "none" }} id="emiratesid-yes">
                          {/* <input
                            type="checkbox"
                            disabled
                            id="emiratesidyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes6">YES</span>
                        </li>

                        <div id="emiratesid-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            disabled
                            id="emiratesidno"
                            name="NO"
                            checked
                          /> */}
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${Insurancecontinuityletterurl}`}
                          target="_blank"
                          style={{ display: "none" }}
                          className="Insuranceletteritem"
                        >
                          click here
                        </a>

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
                        <span
                          className="error-validation"
                          id="err-Insurance_continuity_letter"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="Insurance_continuity_letterfilesList"></span>
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
                          <span className="yes7">YES</span>
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${Sponsorpassportvisaurl}`}
                          style={{ display: "none" }}
                          className="Sponsorspassportvisaitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-Sponsors_passportvisa"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="Sponsors_passportvisafilesList"></span>
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
                          <span className="yes8">YES</span>
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
                  <thead>
                    <tr>
                      <th className="pesonal_info_sno_th" scope="col">#</th>
                      <th className="pesonal_info_detail_th" scope="col">
                        Academic details Attachments Required{" "}
                      </th>
                      <th className="pesonal_info_field_th" scope="col">Field </th>
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
                          className="Updated"
                          type="file"
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${PGdegreeurl}`}
                          style={{ display: "none" }}
                          className="PGitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-PG-degree"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="PG-degreefilesList"></span>
                      </td>

                      <td>
                        <li style={{ display: "none" }} id="PG-degree-yes">
                          {/* <input
                            type="checkbox"
                            disabled
                            id="PG-degreeyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes9">YES</span>
                        </li>

                        <div id="PG-degree-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            disabled
                            id="PG-degreeno"
                            name="NO"
                            checked
                          /> */}
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${UGdegreeurl}`}
                          style={{ display: "none" }}
                          className="ugitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-HBachelor-UG-degree"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="UG-degreefilesList"></span>
                      </td>

                      <td>
                        <li
                          style={{ display: "none" }}
                          id="HBachelor-UG-degree-yes"
                        >
                          {/* <input
                            type="checkbox"
                            disabled
                            id="HBachelor-UG-degreeyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes10">YES</span>
                        </li>

                        <div id="HBachelor-UG-degree-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            disabled
                            id="HBachelor-UG-degreeno"
                            name="NO"
                            checked
                          /> */}
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${Highersecondaryurl}`}
                          style={{ display: "none" }}
                          className="higheritem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-Highersecondary"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="HighersecondaryfilesList"></span>
                      </td>

                      <td>
                        <li
                          style={{ display: "none" }}
                          id="Highersecondary-yes"
                        >
                          {/* <input
                            type="checkbox"
                            disabled
                            id="Highersecondaryyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes11">YES</span>
                        </li>

                        <div id="Highersecondary-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            disabled
                            id="Highersecondaryno"
                            name="NO"
                            checked
                          /> */}
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${Highschoolurl}`}
                          style={{ display: "none" }}
                          className="highschoolitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-Highschool"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="HighschoolfilesList"></span>
                      </td>

                      <td>
                        <li style={{ display: "none" }} id="Highschool-yes">
                          {/* <input
                            type="checkbox"
                            disabled
                            id="Highschoolyes"
                            name="YES"
                            checked
                          /> */}
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes12">YES</span>
                        </li>

                        <div id="Highschool-no">
                          {" "}
                          {/* <input
                            type="checkbox"
                            disabled
                            id="Highschoolno"
                            name="NO"
                            checked
                          /> */}
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
                          autoComplete="off"
                        ></input>

                        <a
                          href={`${allexpurl}`}
                          style={{ display: "none" }}
                          className="allexpitem"
                          target="_blank"
                        >
                          click here
                        </a>
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
                        <span
                          className="error-validation"
                          id="err-allexperience"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                        <span id="filesList"></span>
                      </td>

                      <td>
                        <li style={{ display: "none" }} id="allexperience-yes">
                          <img
                            className="attactment-img"
                            src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
                            alt="error"
                          ></img>
                          <span className="yes13">YES</span>
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
                  </tbody>
                </table>
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
                  onClick={() => this.updatelistpersonalforms()}
                >
                  Update
                </button>
                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnpersonal" type="submit" onClick={() => this.Printthis()}>Print</button>
                <button
                  id="cancelbtn-newhire"
                  className="dashboard_submit_btn btn-cancel"
                  type="reset"
                  onClick={() => this.landingpage()}
                >
                  {" "}
                  Cancel
                </button>

                <button
                  id="cancelbtn-hr"
                  className="dashboard_submit_btn btn-cancel"
                  type="reset"
                  onClick={() => this.Redirectodashboard()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
