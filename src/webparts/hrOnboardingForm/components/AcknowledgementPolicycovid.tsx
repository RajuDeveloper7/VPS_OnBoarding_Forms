import * as React from "react";
// import styles from "./EmployeeNdaNewForm.module.scss";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { Web } from "@pnp/sp/webs";
import * as moment from "moment";
import swal from "sweetalert";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";

export interface IEmployeeNdaNewFormState {
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  Agreement: any[];
  rawHtmlNDA: any;
  NdaMasterList: any[];
  Dynamiclogo: any[];
  Gdescription: any[];
  InformationSecurityManagements: any[];
  ConfidentialInformations: any[];
  EquipmentHandles: any[];
  PhysicalSecuritys: any[];

  PasswordsUsages: any[];
  AccessControls: any[];
  ClearDesks: any[];
  RemovableMedias: any[];

  Antiviruss: any[];
  DesktopLaptopusages: any[];

  EmailUsess: any[];
  InternetUsages: any[];
  phonecode: any[];
  AckPolicyGeneralITSubmissionStatus: string;
  ONBSessionID: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  covidFormControlNumber: any[];
  HrCompleteStatus: boolean;
}
var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var officename;
var LogoUrl;
var Mode;
var ackitmode;
var AckpolicyackItemId;
var ackImageSrc = "";
var Gdescriptionss = [];
var tableitemid;
var tableitemidtwo;
var Covidmainlistid;
var Doselistid;
var Doselistid2;
var dynamicUnitnamecovid = "";
var EmployeeUnitName;
var EditSessionid: string;
var Acklistitemid: number;
var covidcertificate = "";
var AttachmentName = "";
var printcovidfilename = "";

var EmployeeVaccinationcontrolno;
var EmployeeAccommodationcontrolno;
var EmployeeIDCardAcknowledgementcontrolno;
var EmployeeHandbookAcknowledgementcontrolno;
var EmployeeGiftsAcceptancePolicycontrolno;
var EmployeeUseOfCellPhonecontrolno;
var ITSecurityPolicyAcknowledgementcontrolno;
var ITAcceptableUsagePolicycontrolno;
var EmployeeConfidentialityStatementcontrolno;

var EmployeeVaccinationVersionno;
var EmployeeAccommodationVersionno;
var EmployeeIDCardAcknowledgementVersionno;
var EmployeeHandbookAcknowledgementVersionno;
var EmployeeGiftsAcceptancePolicyVersionno;
var EmployeeUseOfCellPhoneVersionno;
var ITSecurityPolicyAcknowledgementVersionno;
var ITAcceptableUsagePolicyVersionno;
var EmployeeConfidentialityStatementVersionno;

var CovidControlNumber;
var AccommodationControlNo;
var IDCardcontrolnumber;
var Handbookcontrolnumber;
var Giftscontrolno;
var CellPhonecontrolNumber;
var ITSecuritycontrolno;
var ITAcceptablecontrolnumber;
var covidversionnumber;
var Accommodationversionnumber;
var IDCardversionnumber;
var Handbookversionno;
var Giftsversionnumber;
var CellPhoneversionnumber;
var ITSecurityversionnumber;
var ITAcceptableversionnumber;


const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");
const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class EmployeeNdaNew extends React.Component<
  IHrOnboardingFormProps,
  IEmployeeNdaNewFormState,
  {}
> {
  constructor(props: IHrOnboardingFormProps) {
    super(props);

    this.state = {
      CurrentUserName: [],
      CurrentUserDesignation: [],
      Agreement: [],
      rawHtmlNDA: "",
      NdaMasterList: [],
      Dynamiclogo: [],
      Gdescription: [],
      InformationSecurityManagements: [],
      ConfidentialInformations: [],
      EquipmentHandles: [],
      PhysicalSecuritys: [],
      PasswordsUsages: [],
      AccessControls: [],
      ClearDesks: [],
      RemovableMedias: [],
      Antiviruss: [],
      DesktopLaptopusages: [],
      EmailUsess: [],
      InternetUsages: [],
      phonecode: [],
      AckPolicyGeneralITSubmissionStatus: "Inprogress",
      ONBSessionID: "",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      covidFormControlNumber: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    this.Getcountrycode();
    $(".common_fullname-dept-id-deg-disable").prop("disabled", true);
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

    // $(".currentdatecovid").val(moment().format("YYYY-MM-DD"));
    //  $("#Employdoj-ack-covid").val(moment().format("YYYY-MM-DD"));

    const url: any = new URL(window.location.href);

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");
    AckpolicyackItemId = url.searchParams.get("AckpolicyackItemId");
    Mode = url.searchParams.get("AckMode");
    ackitmode = url.searchParams.get("AckMode");
    if (GlobalFormOpenedMode == "View") {
      $(".print-btnpolicycovid").show();
      this.GetEmployeepolicyViewItem(AckpolicyackItemId);
      this.GetEmployeepolicyViewItemForPrint(AckpolicyackItemId);
      $("input").attr("disabled", "disabled");
      $("#pcrresult").prop("disabled", true);
      $("#covidsublitbtn").hide();
      $(".covidsub_submit").hide();

      $(".employeename2").prop("disabled", true);
      $(".employeename3").prop("disabled", true);
      $(".employeename4").prop("disabled", true);
      $(".employeename5").prop("disabled", true);
      $(".employeename6").prop("disabled", true);
      $(".employeename1").prop("disabled", true);
      $(".employeename7").prop("disabled", true);
      $(".employeename8").prop("disabled", true);
      $(".employeename9").prop("disabled", true);
      $(".employeename10").prop("disabled", true);
      $(".employeename11").prop("disabled", true);
      $(".employeename1").prop("disabled", true);

      $("#dynamiclistusername").prop("disabled", true);
      $(".covidviewdisable").prop("disabled", true);
    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetEmployeepolicyEdititem(AckpolicyackItemId);
      //  $(".currentdatecovid").prop("disabled", false);
      //$("#Employdoj-ack-covid").prop("disabled", false);

      $("#covidsublitbtn").show();
      $(".covidsub_submit").hide();
    }

    this.Gdescription();

    this.covidtypechecking();
    this.GetCurrentUserDetails();
    this.RemoveValidationcovid();
    //  setTimeout(() => {
    //   this.acknowledgemtuserlistcoviddata();
    //  }, 2000);
    this.tableinputsvalidate();
  }
  public tableinputsvalidate() {
    $("#chiekbpox-name").on("change", function () {
      if ($(this).val() == "No") {
        $("#chiekbpox-date ,#chiekbpox-exposed ,#chiekbpox-infaction").val("");
        $("#chiekbpox-date ,#chiekbpox-exposed ,#chiekbpox-infaction").prop(
          "disabled",
          true
        );
      } else if ($(this).val() == "Yes") {
        $("#chiekbpox-date ,#chiekbpox-exposed ,#chiekbpox-infaction").prop(
          "disabled",
          false
        );
      } else if ($(this).val() == "Select") {
        $("#chiekbpox-date ,#chiekbpox-exposed ,#chiekbpox-infaction").val("");
        $("#chiekbpox-date ,#chiekbpox-exposed ,#chiekbpox-infaction").prop(
          "disabled",
          true
        );
      }
    });
    $("#Hepatitis-name").on("change", function () {
      if ($(this).val() == "No") {
        $("#Hepatitis-date,#Hepatitis-exposed,#Hepatitis-infaction").val("");
        $("#Hepatitis-date,#Hepatitis-exposed,#Hepatitis-infaction").prop(
          "disabled",
          true
        );
      } else if ($(this).val() == "Yes") {
        $("#Hepatitis-date,#Hepatitis-exposed,#Hepatitis-infaction").prop(
          "disabled",
          false
        );
      } else if ($(this).val() == "Select") {
        $("#Hepatitis-date,#Hepatitis-exposed,#Hepatitis-infaction").val("");
        $("#Hepatitis-date,#Hepatitis-exposed,#Hepatitis-infaction").prop(
          "disabled",
          true
        );
      }
    });
    $("#MMR-name").on("change", function () {
      if ($(this).val() == "No") {
        $("#MMR-date,#MMR-exposed,#MMR-infaction").val("");
        $("#MMR-date,#MMR-exposed,#MMR-infaction").prop("disabled", true);
      } else if ($(this).val() == "Yes") {
        $("#MMR-date,#MMR-exposed,#MMR-infaction").prop("disabled", false);
      } else if ($(this).val() == "Select") {
        $("#MMR-date,#MMR-exposed,#MMR-infaction").val("");
        $("#MMR-date,#MMR-exposed,#MMR-infaction").prop("disabled", true);
      }
    });
    $("#Influenza-name").on("change", function () {
      if ($(this).val() == "No") {
        $("#Influenza-date,#Influenza-exposed,#Influenza-infaction").val("");
        $("#Influenza-date,#Influenza-exposed,#Influenza-infaction").prop(
          "disabled",
          true
        );
      } else if ($(this).val() == "Yes") {
        $("#Influenza-date,#Influenza-exposed,#Influenza-infaction").prop(
          "disabled",
          false
        );
      } else if ($(this).val() == "Select") {
        $("#Influenza-date,#Influenza-exposed,#Influenza-infaction").val("");
        $("#Influenza-date,#Influenza-exposed,#Influenza-infaction").prop(
          "disabled",
          true
        );
      }
    });
    $("#Meningococcal-name").on("change", function () {
      if ($(this).val() == "No") {
        $(
          "#Meningococcal-date,#Meningococcal-exposed,#Meningococcal-infaction"
        ).val("");
        $(
          "#Meningococcal-date,#Meningococcal-exposed,#Meningococcal-infaction"
        ).prop("disabled", true);
      } else if ($(this).val() == "Yes") {
        $(
          "#Meningococcal-date,#Meningococcal-exposed,#Meningococcal-infaction"
        ).prop("disabled", false);
      } else if ($(this).val() == "Select") {
        $(
          "#Meningococcal-date,#Meningococcal-exposed,#Meningococcal-infaction"
        ).val("");
        $(
          "#Meningococcal-date,#Meningococcal-exposed,#Meningococcal-infaction"
        ).prop("disabled", true);
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
            this.GetUsernamefrompersonalinfo(response[0].ONBSessionID);
            this.CheckIndividualFomSubmissionStatusofEmployee(
              response[0].ONBSessionID,
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
        "ONBSessionID eq '" +
        ONBSessionID +
        "' and Title eq 'EMPLOYEE NON-DISCLOSURE AGREEMENT' and Status eq 'Completed'"
      )
      .orderBy("Created", false)
      .get()
      .then((response) => {
        if (response.length != 0) {
          this.setState({
            isPrevFormSubmitted: true,
          });
        }
      });

    newweb.lists
      .getByTitle("Onboarding Transaction Master")
      .items.filter(
        "ONBSessionID eq '" +
        ONBSessionID +
        "' and Title eq 'ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT'"
      )
      .orderBy("Created", false)
      .get()
      .then((response) => {
        if (response.length != 0) {
          if (
            response[0].Title ==
            "ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT"
          ) {
            this.setState({
              AckPolicyGeneralITSubmissionStatus: response[0].Status,
            });
            if (
              GlobalFormOpenedMode == "New" &&
              response[0].Status == "Completed"
            ) {
              this.Getcurrentuser_documentlibrary(this.state.CurrentUserName);
              this.acknowledgemtuserlistcoviddata(ONBSessionID, FormMode);
            }
          }
        }
      });
  }

  public GetEmployeepolicyViewItem(itemID) {
    $("#hr-name-dynamic").hide();
    $("#hr-name-listdata").show();
    $("#dynamicemp-uniname-covid").show();
    $("#emp-uniname-covid").hide();
    $(".dynamic_name_username_emp").hide();
    $(".dynamiclistusername").show();
    $(".dynamic_name_username").hide();
    $(".DynamicCovidform_unitname").show();
    $(".Covidform_unitname").hide();
    $(".coviedackicon").show();
    $("#covideicondynamic").show();
    $("#covidimg").hide();
    $(".coviedackimg").hide();
    $(".covidsub_submit").hide();

    newweb.lists
      .getByTitle("Acknowledgement And Policy Declarations Transaction")
      .items.select(
        "EmployeeId",
        "EmployeeName",
        "Date",
        "EmployeeDepartment",
        "EmployeeDesignation",
        "DateofJoining",
        "Covid_x002d_19positive",
        "directcontactCovid_x002d_19posit",
        "PCRresult",
        "EmployeeNumber",
        "EmployeeJobTitle",
        "SignedDate",
        "ContactNumber",
        "Empoyee_x0020_UnitName",
        "Countrycode",
        "PCRtakendate",
        "HRNAME",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "Attachmentusername"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#EmployeeUnitNameit").val(result[0].BusinessUnit)
          $(".ackcovid_tickimg").show();
          AttachmentName = result[0].Attachmentusername;
          this.Getfolderitemviewmode(result[0].Attachmentusername);
          $("#hr-name-listdata").val(result[0].HRNAME);
          setTimeout(() => {
            $("#covide-country-codes").val(result[0].Countrycode);
          }, 1500);

          if (result[0].Covid_x002d_19positive != null) {
            $(".covidtextfield1").show();

            $(".Yescovidpositive").prop("checked", true);
          } else {
            $(".nocovidpositive").prop("checked", true);
          }

          if (result[0].directcontactCovid_x002d_19posit != null) {
            $(".covidtextfield2").show();

            $(".Yescovidpositive2").prop("checked", true);
          } else {
            $(".nocovidpositive2").prop("checked", true);
          }

          // $(".currentdatecovid").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".Employeename_covid_ack_ploicy").val(result[0].EmployeeName);
          $(".empidcovid").val(result[0].EmployeeId);
          $(".employeedegs").val(result[0].EmployeeDesignation);
          $("#Employdoj-ack-covid").val(result[0].DateofJoining);
          $("#textareaone").val(result[0].Covid_x002d_19positive);
          $("#textareatwo").val(result[0].directcontactCovid_x002d_19posit);
          $("#pcrresult").val(result[0].PCRresult);
          $("#EmployNumber-ack-covid").val(result[0].EmployeeNumber);
          $(".job_title_covid").val(result[0].EmployeeJobTitle);
          $("#covide-country-codes").val(result[0].Countrycode);
          $("#Employcontact-ack-covid").val(result[0].ContactNumber);

          $("#pcrdate").val(
            moment(result[0].PCRtakendate).format("YYYY-MM-DD")
          );

          $(".employeedeptcovid").val(result[0].EmployeeDepartment);

          $("#Unitname-ackcoviddynamic").val(result[0].Empoyee_x0020_UnitName);
          dynamicUnitnamecovid = result[0].BusinessUnit;
          ackImageSrc = result[0].UnitLogo;
        }
      });
    newweb.lists
      .getByTitle("Covid Vaccination")
      .items.select(
        "ID",
        "SecondboosterDate",
        "FirstBoosterDate",
        "SecondDate",
        "FirstDate",
        "SecondBoosterPlace",
        "FirstboosterPlace",
        "SecondPlace",
        "FirstPlace",
        "FirstDoseName",
        "SecondDoseName",
        "BoosterDoseName",
        "SecondBoosterDoseName",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((response) => {
        tableitemidtwo = response[0].ID;
        //  alert("thh" + tableitemidtwo);
        $("#FirstDose-name").val(response[0].FirstDoseName);
        $("#SecondDose-name").val(response[0].SecondDoseName);
        $("#BoosterDose-name").val(response[0].BoosterDoseName);
        $("#SecondBoosterDose-name").val(response[0].SecondBoosterDoseName);

        $("#FirstDose-place").val(response[0].FirstPlace);
        $("#SecondDose-place").val(response[0].SecondPlace);
        $("#BoosterDose-place").val(response[0].FirstboosterPlace);
        $("#SecondBoosterDose-place").val(response[0].SecondBoosterPlace);

        $("#FirstDose-date").val(
          moment(response[0].FirstDate).format("YYYY-MM-DD")
        ),
          $("#SecondDose-date").val(
            moment(response[0].SecondDate).format("YYYY-MM-DD")
          ),
          $("#BoosterDose-date").val(
            moment(response[0].FirstBoosterDate).format("YYYY-MM-DD")
          ),
          $("#SecondBoosterDose-date").val(
            moment(response[0].SecondboosterDate).format("YYYY-MM-DD")
          );
      });

    newweb.lists
      .getByTitle("Employee Vaccination")
      .items.select(
        "ChickenPoxVaccinated",
        "Hepatitis_x002d_BVaccinated",
        "MMRVaccinated",
        "InfluenzaVaccinated",
        "MeningococcalMicrobiologyStaffVa",

        "ChikenpoxVaccinatedDate",
        "HepatitisBVaccinatedDate",
        "MMRVaccinatedDate",
        "InfluenzaVaccinatedDate",
        "MeningococcalVaccinatedDate",

        "ChikenpoxDescription",
        "HepatitisBDescription",
        "MMRDescription",
        "InfluenzaDescription",
        "MeningococcalDescription",

        "InfectionControl1",
        "InfectionControl2",
        "InfectionControl3",
        "InfectionControl4",
        "InfectionControl5",
        "ID",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((res) => {
        tableitemid = res[0].ID;
        // alert("hh" + tableitemid);
        $("#chiekbpox-name").val(res[0].ChickenPoxVaccinated),
          $("#Hepatitis-name").val(res[0].Hepatitis_x002d_BVaccinated),
          $("#MMR-name").val(res[0].MMRVaccinated),
          $("#Influenza-name").val(res[0].InfluenzaVaccinated),
          $("#Meningococcal-name").val(res[0].MeningococcalMicrobiologyStaffVa),
          $("#chiekbpox-date").val(
            moment(res[0].ChikenpoxVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Hepatitis-date").val(
            moment(res[0].HepatitisBVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#MMR-date").val(
            moment(res[0].MMRVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Influenza-date").val(
            moment(res[0].InfluenzaVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Meningococcal-date").val(
            moment(res[0].MeningococcalVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#chiekbpox-exposed").val(res[0].ChikenpoxDescription),
          $("#Hepatitis-exposed").val(res[0].HepatitisBDescription),
          $("#MMR-exposed").val(res[0].MMRDescription),
          $("#Influenza-exposed").val(res[0].InfluenzaDescription),
          $("#Meningococcal-exposed").val(res[0].MeningococcalDescription),
          $("#chiekbpox-infaction").val(res[0].InfectionControl1);
        $("#Hepatitis-infaction").val(res[0].InfectionControl2);
        $("#MMR-infaction").val(res[0].InfectionControl3);
        $("#Influenza-infaction").val(res[0].InfectionControl4);
        $("#Meningococcal-infaction").val(res[0].InfectionControl5);
      });
  }

  public GetEmployeepolicyViewItemForPrint(itemID) {
    // $(".print-btnpolicycovid").show();

    // $("#print-hr-name-dynamic").hide()
    $("#print-hr-name-listdata").show();
    $("#print-dynamicemp-uniname-covid").show();
    $("#print-emp-uniname-covid").hide();
    $(".print-dynamic_name_username_emp").hide();
    $(".print-dynamiclistusername").show();
    $(".print-dynamic_name_username").hide();
    $(".print-DynamicCovidform_unitname").show();
    $(".print-Covidform_unitname").hide();
    // alert(itemID);
    $(".print-coviedackicon").show();
    $("#print-covideicondynamic").show();
    $("#print-covidimg").hide();
    $(".print-coviedackimg").hide();
    newweb.lists
      .getByTitle("Acknowledgement And Policy Declarations Transaction")
      .items.select(
        "EmployeeId",
        "EmployeeName",
        "Date",
        "EmployeeDepartment",
        "EmployeeDesignation",
        "DateofJoining",
        "Covid_x002d_19positive",
        "directcontactCovid_x002d_19posit",
        "PCRresult",
        "EmployeeNumber",
        "EmployeeJobTitle",
        "SignedDate",
        "ContactNumber",
        "Empoyee_x0020_UnitName",
        "Countrycode",
        "PCRtakendate",
        "HRNAME",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ControlNumber",
        "VersionNumber",
        "CovidControlNumber",
        "AccommodationControlNo",
        "IDCardcontrolnumber",
        "Handbookcontrolnumber",
        "Giftscontrolno",
        "CellPhonecontrolNumber",
        "ITSecuritycontrolno",
        "ITAcceptablecontrolnumber",
        "ITAcceptableversionnumber",
        "ITSecurityversionnumber",
        "CellPhoneversionnumber",
        "Giftsversionnumber",
        "Handbookversionno",
        "IDCardversionnumber",
        "Accommodationversionnumber",
        "covidversionnumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {

          $("#print-Covid-Control-Number").text(result[0].CovidControlNumber);
          $("#print-Covid-Version-Number").text(result[0].covidversionnumber);

          $("#print-Accommodation-Control-Number").text(result[0].AccommodationControlNo);
          $("#print-Accommodation-Version-Number").text(result[0].Accommodationversionnumber);

          $("#print-IDCard-Control-Number").text(result[0].IDCardcontrolnumber);
          $("#print-IDCard-Version-Number").text(result[0].IDCardversionnumber);

          $("#print-Handbook-Control-Number").text(result[0].Handbookcontrolnumber);
          $("#print-Handbook-Version-Number").text(result[0].Handbookversionno);

          $("#print-Gifts-Control-Number").text(result[0].Giftscontrolno);
          $("#print-Gifts-Version-Number").text(result[0].Giftsversionnumber);

          $("#print-CellPhone-Control-Number").text(result[0].CellPhonecontrolNumber);
          $("#print-CellPhone-Version-Number").text(result[0].CellPhoneversionnumber);

          $("#print-ITSecurity-Control-Number").text(result[0].ITSecuritycontrolno);
          $("#print-ITSecurity-Version-Number").text(result[0].ITSecurityversionnumber);

          $("#print-ITAcceptable-Control-Number").text(result[0].ITAcceptablecontrolnumber);
          $("#print-ITAcceptable-Version-Number").text(result[0].ITAcceptableversionnumber);

          $("#print-EmployeeUnitNameit").text(result[0].BusinessUnit)
          $("#print-hr-name-listdata").text(result[0].HRNAME);


          // setTimeout(() => {
          // $("#Employeenumber-ack-covid").val(result.EmployeeNumber);
          $("#print-covide-country-codes").text(result[0].Countrycode);
          //}, 1500);
          setTimeout(() => {
            if (result[0].Covid_x002d_19positive != null) {
              $(".print-covidtextfield1").show();
              $(".print-Yescovidpositive").text("Yes");
              // $(".print-Yescovidpositive").attr("checked", "checked");
              // $(".print-Yescovidpositive").prop("disabled", false);
            } else {
              // $(".print-nocovidpositive").attr("checked", "checked");
              // $(".print-nocovidpositive").prop("disabled", false);
              $(".print-Yescovidpositive").text("No");
            }

            if (result[0].directcontactCovid_x002d_19posit != null) {
              $(".print-covidtextfield2").show();
              $(".print-Yescovidpositive2").text("Yes");
              // $(".print-Yescovidpositive2").attr("checked", "checked");
              // $(".print-Yescovidpositive2").prop("disabled", false);
            } else {
              // $(".print-nocovidpositive2").attr("checked", "checked");
              // $(".print-nocovidpositive2").prop("disabled", false);
              $(".print-Yescovidpositive2").text("No");
            }
          }, 2000);

          $(".print-currentdatecovid").text(
            moment(result[0].Date).format("DD-MM-YYYY")
          );

          setTimeout(() => {
            $(
              "#print-dynamiclistusername,#print-Employeename-ack-covid,#print-Employeename-ack-covid2,#print-Employeename-ack-covid3,#print-Employeename-ack-covid4,#print-Employeename-ack-covid5,#print-Employeename-ack-covid6,#print-Employeename-ack-covid7,#print-Employeename-ack-covid8,#print-Employeename-ack-covid9,#print-Employeename-ack-covid10,#print-dynamiclistusername11"
            ).text(result[0].EmployeeName);
          }, 500);

          $(".print-empidcovid").text(result[0].EmployeeId);

          $(".print-employeedegs").text(result[0].EmployeeDesignation);
          // $("#print-Employdoj-ack-covid").text(
          //   moment(result[0].DateofJoining).format("DD-MM-YYYY")
          // );
          $("#print-textareaone").text(result[0].Covid_x002d_19positive);
          $("#print-textareatwo").text(
            result[0].directcontactCovid_x002d_19posit
          );
          $("#print-pcrresult").text(result[0].PCRresult);
          $("#print-EmployNumber-ack-covid").text(result[0].EmployeeNumber);
          $(".print-job_title_covid").text(result[0].EmployeeJobTitle);
          // $("#signeddate").val(moment(result.SignedDate).format("YYYY-MM-DD"));
          $("#print-Employcontact-ack-covid").text(result[0].ContactNumber);

          $("#print-pcrdate").text(
            moment(result[0].PCRtakendate).format("DD-MM-YYYY")
          );

          $(".print-employeedeptcovid").text(result[0].EmployeeDepartment);

          $("#print-Unitname-ackcoviddynamic").text(
            result[0].Empoyee_x0020_UnitName
          );
          dynamicUnitnamecovid = result[0].BusinessUnit;
          ackImageSrc = result[0].UnitLogo;
          // $("#Unitname-ackcoviddynamic").val(result.BusinessUnit);
          newweb.lists
            .getByTitle("Covid Vaccination")
            .items.select(
              "ID",
              "SecondboosterDate",
              "FirstBoosterDate",
              "SecondDate",
              "FirstDate",
              "SecondBoosterPlace",
              "FirstboosterPlace",
              "SecondPlace",
              "FirstPlace",
              "FirstDoseName",
              "SecondDoseName",
              "BoosterDoseName",
              "SecondBoosterDoseName",
              "ONBSessionID"
            )
            .filter("ONBSessionID eq '" + EditSessionid + "'")
            .get()
            .then((response) => {
              tableitemidtwo = response[0].ID;
              //  alert("thh" + tableitemidtwo);
              $("#print-FirstDose-name").text(response[0].FirstDoseName);
              $("#print-SecondDose-name").text(response[0].SecondDoseName);
              $("#print-BoosterDose-name").text(response[0].BoosterDoseName);
              $("#print-SecondBoosterDose-name").text(
                response[0].SecondBoosterDoseName
              );

              $("#print-FirstDose-place").text(response[0].FirstPlace);
              $("#print-SecondDose-place").text(response[0].SecondPlace);
              $("#print-BoosterDose-place").text(response[0].FirstboosterPlace);
              $("#print-SecondBoosterDose-place").text(
                response[0].SecondBoosterPlace
              );

              // $("#print-FirstDose-date").text(
              //   moment(response[0].FirstDate).format("DD-MM-YYYY")
              // ),
              //   $("#print-SecondDose-date").text(
              //     moment(response[0].SecondDate).format("DD-MM-YYYY")
              //   ),

              // $("#print-BoosterDose-date").text(
              //   moment(response[0].FirstBoosterDate).format("DD-MM-YYYY")
              // );

              // $("#print-SecondBoosterDose-date").text(
              //   moment(response[0].SecondboosterDate).format("DD-MM-YYYY")
              // );
              if (
                response[0].FirstDate == null ||
                response[0].FirstDate == "null" ||
                response[0].FirstDate == "" ||
                response[0].FirstDate == undefined
              ) {
                $("#print-FirstDose-date").text("dd-mm-yyy");
              } else {
                $("#print-FirstDose-date").text(
                  moment(response[0].FirstDate).format("DD-MM-YYYY")
                );
              }

              if (
                response[0].SecondDate == null ||
                response[0].SecondDate == "null" ||
                response[0].SecondDate == "" ||
                response[0].SecondDate == undefined
              ) {
                $("#print-SecondDose-date").text("DD-MM-YYYY");
              } else {
                $("#print-SecondDose-date").text(
                  moment(response[0].SecondDate).format("DD-MM-YYYY")
                );
              }

              if (
                response[0].FirstBoosterDate == null ||
                response[0].FirstBoosterDate == "null" ||
                response[0].FirstBoosterDate == "" ||
                response[0].FirstBoosterDate == undefined
              ) {
                $("#print-BoosterDose-date").text("dd-mm-yyy");
              } else {
                $("#print-BoosterDose-date").text(
                  moment(response[0].FirstBoosterDate).format("DD-MM-YYYY")
                );
              }

              if (
                response[0].SecondboosterDate == null ||
                response[0].SecondboosterDate == "null" ||
                response[0].SecondboosterDate == "" ||
                response[0].SecondboosterDate == undefined
              ) {
                $("#print-SecondBoosterDose-date").text("dd-mm-yyy");
              } else {
                $("#print-SecondBoosterDose-date").text(
                  moment(response[0].SecondboosterDate).format("DD-MM-YYYY")
                );
              }
            });

          newweb.lists
            .getByTitle("Employee Vaccination")
            .items.select(
              "ChickenPoxVaccinated",
              "Hepatitis_x002d_BVaccinated",
              "MMRVaccinated",
              "InfluenzaVaccinated",
              "MeningococcalMicrobiologyStaffVa",

              "ChikenpoxVaccinatedDate",
              "HepatitisBVaccinatedDate",
              "MMRVaccinatedDate",
              "InfluenzaVaccinatedDate",
              "MeningococcalVaccinatedDate",

              "ChikenpoxDescription",
              "HepatitisBDescription",
              "MMRDescription",
              "InfluenzaDescription",
              "MeningococcalDescription",

              "InfectionControl1",
              "InfectionControl2",
              "InfectionControl3",
              "InfectionControl4",
              "InfectionControl5",
              "ID",
              "ONBSessionID"
            )
            .filter("ONBSessionID eq '" + EditSessionid + "'")
            .get()
            .then((res) => {
              tableitemid = res[0].ID;
              // alert("hh" + tableitemid);
              $("#print-chiekbpox-name").text(res[0].ChickenPoxVaccinated),
                $("#print-Hepatitis-name").text(
                  res[0].Hepatitis_x002d_BVaccinated
                ),
                $("#print-MMR-name").text(res[0].MMRVaccinated),
                $("#print-Influenza-name").text(res[0].InfluenzaVaccinated),
                $("#print-Meningococcal-name").text(
                  res[0].MeningococcalMicrobiologyStaffVa
                );
              if (
                res[0].ChikenpoxVaccinatedDate == null ||
                res[0].ChikenpoxVaccinatedDate == "null" ||
                res[0].ChikenpoxVaccinatedDate == "" ||
                res[0].ChikenpoxVaccinatedDate == undefined
              ) {
                $("#print-chiekbpox-date").text("dd-mm-yyy");
              } else {
                $("#print-chiekbpox-date").text(
                  moment(res[0].ChikenpoxVaccinatedDate).format("DD-MM-YYYY")
                );
              }

              if (
                res[0].HepatitisBVaccinatedDate == null ||
                res[0].HepatitisBVaccinatedDate == "null" ||
                res[0].HepatitisBVaccinatedDate == "" ||
                res[0].HepatitisBVaccinatedDate == undefined
              ) {
                $("#print-Hepatitis-date").text("dd-mm-yyy");
              } else {
                $("#print-Hepatitis-date").text(
                  moment(res[0].HepatitisBVaccinatedDate).format("DD-MM-YYYY")
                );
              }

              if (
                res[0].MMRVaccinatedDate == null ||
                res[0].MMRVaccinatedDate == "null" ||
                res[0].MMRVaccinatedDate == "" ||
                res[0].MMRVaccinatedDate == undefined
              ) {
                $("#print-MMR-date").text("dd-mm-yyy");
              } else {
                $("#print-MMR-date").text(
                  moment(res[0].MMRVaccinatedDate).format("DD-MM-YYYY")
                );
              }

              if (
                res[0].InfluenzaVaccinatedDate == null ||
                res[0].InfluenzaVaccinatedDate == "null" ||
                res[0].InfluenzaVaccinatedDate == "" ||
                res[0].InfluenzaVaccinatedDate == undefined
              ) {
                $("#print-Influenza-date").text("dd-mm-yyy");
              } else {
                $("#print-Influenza-date").text(
                  moment(res[0].InfluenzaVaccinatedDate).format("DD-MM-YYYY")
                );
              }

              if (
                res[0].MeningococcalVaccinatedDate == null ||
                res[0].MeningococcalVaccinatedDate == "null" ||
                res[0].MeningococcalVaccinatedDate == "" ||
                res[0].MeningococcalVaccinatedDate == undefined
              ) {
                $("#print-Meningococcal-date").text("dd-mm-yyy");
              } else {
                $("#print-Meningococcal-date").text(
                  moment(res[0].MeningococcalVaccinatedDate).format(
                    "DD-MM-YYYY"
                  )
                );
              }

              // $("#print-chiekbpox-date").text(
              //   moment(res[0].ChikenpoxVaccinatedDate).format("DD-MM-YYYY")
              // ),
              // $("#print-Hepatitis-date").text(
              //   moment(res[0].HepatitisBVaccinatedDate).format("DD-MM-YYYY")
              // ),
              // $("#print-MMR-date").text(
              //   moment(res[0].MMRVaccinatedDate).format("DD-MM-YYYY")
              // ),

              // $("#print-Influenza-date").text(
              //   moment(res[0].InfluenzaVaccinatedDate).format("DD-MM-YYYY")
              // ),
              // $("#print-Meningococcal-date").text(
              //   moment(res[0].MeningococcalVaccinatedDate).format("DD-MM-YYYY")
              // ),
              $("#print-chiekbpox-exposed").text(res[0].ChikenpoxDescription),
                $("#print-Hepatitis-exposed").text(
                  res[0].HepatitisBDescription
                ),
                $("#print-MMR-exposed").text(res[0].MMRDescription),
                $("#print-Influenza-exposed").text(res[0].InfluenzaDescription),
                $("#print-Meningococcal-exposed").text(
                  res[0].MeningococcalDescription
                ),
                $("#print-chiekbpox-infaction").text(res[0].InfectionControl1);
              $("#print-Hepatitis-infaction").text(res[0].InfectionControl2);
              $("#print-MMR-infaction").text(res[0].InfectionControl3);
              $("#print-Influenza-infaction").text(res[0].InfectionControl4);
              $("#print-Meningococcal-infaction").text(
                res[0].InfectionControl5
              );
            });
        }
      });
  }

  public GetEmployeepolicyEdititem(itemID) {
    $("#hr-name-dynamic").hide();
    $("#hr-name-listdata").show();
    $("#dynamicemp-uniname-covid").show();
    $("#emp-uniname-covid").hide();
    $(".dynamic_name_username_emp").hide();
    $(".dynamiclistusername").show();
    $(".dynamic_name_username").hide();
    $(".DynamicCovidform_unitname").show();
    $(".Covidform_unitname").hide();

    $(".coviedackicon").show();
    $("#covideicondynamic").show();
    $("#covidimg").hide();
    $(".coviedackimg").hide();

    $(".covidsub_submit").hide(); //submit

    newweb.lists
      .getByTitle("Acknowledgement And Policy Declarations Transaction")
      .items.select(
        "EmployeeId",
        "EmployeeName",
        "Date",
        "EmployeeDepartment",
        "EmployeeDesignation",
        "DateofJoining",
        "Covid_x002d_19positive",
        "directcontactCovid_x002d_19posit",
        "PCRresult",
        "EmployeeNumber",
        "EmployeeJobTitle",
        "SignedDate",
        "ContactNumber",
        "Empoyee_x0020_UnitName",
        "Countrycode",
        "PCRtakendate",
        "HRNAME",
        "ONBSessionID",
        "UnitLogo",
        "BusinessUnit",
        "ID",
        "Attachmentusername",
        "CovidControlNumber",
        "AccommodationControlNo",
        "IDCardcontrolnumber",
        "Handbookcontrolnumber",
        "Giftscontrolno",
        "CellPhonecontrolNumber",
        "ITSecuritycontrolno",
        "ITAcceptablecontrolnumber",
        "covidversionnumber",
        "Accommodationversionnumber",
        "IDCardversionnumber",
        "Handbookversionno",
        "Giftsversionnumber",
        "CellPhoneversionnumber",
        "ITSecurityversionnumber",
        "ITAcceptableversionnumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#EmployeeUnitNameit").val(result[0].BusinessUnit)
          $(".ackcovid_tickimg").show();
          AttachmentName = result[0].Attachmentusername;
          CovidControlNumber = result[0].CovidControlNumber;
          AccommodationControlNo = result[0].AccommodationControlNo;
          IDCardcontrolnumber = result[0].IDCardcontrolnumber;
          Handbookcontrolnumber = result[0].Handbookcontrolnumber;
          Giftscontrolno = result[0].Giftscontrolno;
          CellPhonecontrolNumber = result[0].CellPhonecontrolNumber;
          ITSecuritycontrolno = result[0].ITSecuritycontrolno;
          ITAcceptablecontrolnumber = result[0].ITAcceptablecontrolnumber;
          covidversionnumber = result[0].covidversionnumber;
          Accommodationversionnumber = result[0].Accommodationversionnumber;
          IDCardversionnumber = result[0].IDCardversionnumber;
          Handbookversionno = result[0].Handbookversionno;
          Giftsversionnumber = result[0].Giftsversionnumber;
          CellPhoneversionnumber = result[0].CellPhoneversionnumber;
          ITSecurityversionnumber = result[0].ITSecurityversionnumber;
          ITAcceptableversionnumber = result[0].ITAcceptableversionnumber;

          this.Getfolderiteditwmode(result[0].Attachmentusername);
          Acklistitemid = result[0].ID;
          $(".ackcovid_tickimg").show();
          $("#hr-name-listdata").val(result[0].HRNAME);

          if (result[0].Covid_x002d_19positive != null) {
            $(".covidtextfield1").show();

            $(".Yescovidpositive").prop("checked", true);
          } else {
            $(".nocovidpositive").prop("checked", true);
          }

          if (result[0].directcontactCovid_x002d_19posit != null) {
            $(".covidtextfield2").show();

            $(".Yescovidpositive2").prop("checked", true);
          } else {
            $(".nocovidpositive2").prop("checked", true);
          }

          // $(".currentdatecovid").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".Employeename_covid_ack_ploicy").val(result[0].EmployeeName);
          $(".empidcovid").val(result[0].EmployeeId);

          $(".employeedegs").val(result[0].EmployeeDesignation);
          $("#Employdoj-ack-covid").val(result[0].DateofJoining);
          $("#textareaone").val(result[0].Covid_x002d_19positive);
          $("#textareatwo").val(result[0].directcontactCovid_x002d_19posit);
          $("#pcrresult").val(result[0].PCRresult);
          $("#EmployNumber-ack-covid").val(result[0].EmployeeNumber);
          $(".job_title_covid").val(result[0].EmployeeJobTitle);
          // $("#signeddate").val(moment(result.SignedDate).format("YYYY-MM-DD"));
          $("#Employcontact-ack-covid").val(result[0].ContactNumber);
          $("#covide-country-codes").val(result[0].Countrycode);
          $("#pcrdate").val(
            moment(result[0].PCRtakendate).format("YYYY-MM-DD")
          );

          $(".employeedeptcovid").val(result[0].EmployeeDepartment);

          $("#Unitname-ackcoviddynamic").val(result[0].Empoyee_x0020_UnitName);
          dynamicUnitnamecovid = result[0].BusinessUnit;
          ackImageSrc = result[0].UnitLogo;
        }
      });
    // $("#Unitname-ackcoviddynamic").val(result.BusinessUnit);
    newweb.lists
      .getByTitle("Covid Vaccination")
      .items.select(
        "ID",
        "SecondboosterDate",
        "FirstBoosterDate",
        "SecondDate",
        "FirstDate",
        "SecondBoosterPlace",
        "FirstboosterPlace",
        "SecondPlace",
        "FirstPlace",
        "FirstDoseName",
        "SecondDoseName",
        "BoosterDoseName",
        "SecondBoosterDoseName",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((response) => {
        tableitemidtwo = response[0].ID;

        $("#FirstDose-name").val(response[0].FirstDoseName);
        $("#SecondDose-name").val(response[0].SecondDoseName);
        $("#BoosterDose-name").val(response[0].BoosterDoseName);
        $("#SecondBoosterDose-name").val(response[0].SecondBoosterDoseName);

        $("#FirstDose-place").val(response[0].FirstPlace);
        $("#SecondDose-place").val(response[0].SecondPlace);
        $("#BoosterDose-place").val(response[0].FirstboosterPlace);
        $("#SecondBoosterDose-place").val(response[0].SecondBoosterPlace);

        $("#FirstDose-date").val(
          moment(response[0].FirstDate).format("YYYY-MM-DD")
        ),
          $("#SecondDose-date").val(
            moment(response[0].SecondDate).format("YYYY-MM-DD")
          ),
          $("#BoosterDose-date").val(
            moment(response[0].FirstBoosterDate).format("YYYY-MM-DD")
          ),
          $("#SecondBoosterDose-date").val(
            moment(response[0].SecondboosterDate).format("YYYY-MM-DD")
          );
      });

    newweb.lists
      .getByTitle("Employee Vaccination")
      .items.select(
        "ChickenPoxVaccinated",
        "Hepatitis_x002d_BVaccinated",
        "MMRVaccinated",
        "InfluenzaVaccinated",
        "MeningococcalMicrobiologyStaffVa",

        "ChikenpoxVaccinatedDate",
        "HepatitisBVaccinatedDate",
        "MMRVaccinatedDate",
        "InfluenzaVaccinatedDate",
        "MeningococcalVaccinatedDate",

        "ChikenpoxDescription",
        "HepatitisBDescription",
        "MMRDescription",
        "InfluenzaDescription",
        "MeningococcalDescription",

        "InfectionControl1",
        "InfectionControl2",
        "InfectionControl3",
        "InfectionControl4",
        "InfectionControl5",
        "ID",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((res) => {
        tableitemid = res[0].ID;

        $("#chiekbpox-name").val(res[0].ChickenPoxVaccinated),
          $("#Hepatitis-name").val(res[0].Hepatitis_x002d_BVaccinated),
          $("#MMR-name").val(res[0].MMRVaccinated),
          $("#Influenza-name").val(res[0].InfluenzaVaccinated),
          $("#Meningococcal-name").val(res[0].MeningococcalMicrobiologyStaffVa),
          $("#chiekbpox-date").val(
            moment(res[0].ChikenpoxVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Hepatitis-date").val(
            moment(res[0].HepatitisBVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#MMR-date").val(
            moment(res[0].MMRVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Influenza-date").val(
            moment(res[0].InfluenzaVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Meningococcal-date").val(
            moment(res[0].MeningococcalVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#chiekbpox-exposed").val(res[0].ChikenpoxDescription),
          $("#Hepatitis-exposed").val(res[0].HepatitisBDescription),
          $("#MMR-exposed").val(res[0].MMRDescription),
          $("#Influenza-exposed").val(res[0].InfluenzaDescription),
          $("#Meningococcal-exposed").val(res[0].MeningococcalDescription),
          $("#chiekbpox-infaction").val(res[0].InfectionControl1);
        $("#Hepatitis-infaction").val(res[0].InfectionControl2);
        $("#MMR-infaction").val(res[0].InfectionControl3);
        $("#Influenza-infaction").val(res[0].InfectionControl4);
        $("#Meningococcal-infaction").val(res[0].InfectionControl5);
      });
  }

  public GetCurrentUserDetails() {
    this.Autofieldvalue();

    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        // var email = resultData.d.Email;
        //(resultData);
        reacthandler.createfolder(resultData.d.DisplayName);
        var Name = resultData.d.DisplayName;
        // $(".currentuser_name").val(Name);
        // reacthandler.Getcurrentuser_documentlibrary(resultData.d.DisplayName);
        var Designation = resultData.d.Title;
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcname = properties[i].Value;
            $(".currentuer_unitname").val(ofcname);
            setTimeout(() => {
              reacthandler.DynamicUnitLogo(ofcname);
              reacthandler.GetUnitHrName(ofcname);
              reacthandler.GetContolandVersionNumber(ofcname);
              reacthandler.GetControlNumberAccordingtoformname(ofcname);
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
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "New");
        } else if (GlobalFormOpenedMode == "Edit") {
          reacthandler.GetCurrentUserONBSessionID(resultData.d.Email, "Edit");
        } else {
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
            VersionNumber: results[0].VersionNumber,
          });
        });
    }
  }

  public async GetControlNumberAccordingtoformname(ofcname) {
    if (GlobalFormOpenedMode == "New") {

      const fieldname1: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Control Number")();

      const fieldname2: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Version Number")();


      await newweb.lists.getByTitle("Onboarding Subsection Form Name Master").items.select("*", "Title")

        .get()
        .then((results) => {

          if (results.length != 0) {


            for (var i = 0; i < results.length; i++) {
              if (results[i].Title == "Employee Vaccination Declaration") {
                EmployeeVaccinationcontrolno = results[i][fieldname1.InternalName]
                EmployeeVaccinationVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Employee Accommodation Guidelines") {
                EmployeeAccommodationcontrolno = results[i][fieldname1.InternalName]
                EmployeeAccommodationVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Employee ID Card Acknowledgement") {
                EmployeeIDCardAcknowledgementcontrolno = results[i][fieldname1.InternalName]
                EmployeeIDCardAcknowledgementVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Employee Handbook Acknowledgement") {
                EmployeeHandbookAcknowledgementcontrolno = results[i][fieldname1.InternalName]
                EmployeeHandbookAcknowledgementVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Employee Gifts Acceptance Policy") {
                EmployeeGiftsAcceptancePolicycontrolno = results[i][fieldname1.InternalName]
                EmployeeGiftsAcceptancePolicyVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Employee Use Of Cell Phone And Personal Gadgets At Workplace Policy") {
                EmployeeUseOfCellPhonecontrolno = results[i][fieldname1.InternalName]
                EmployeeUseOfCellPhoneVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "IT Security Policy - Acknowledgement") {
                ITSecurityPolicyAcknowledgementcontrolno = results[i][fieldname1.InternalName]
                ITSecurityPolicyAcknowledgementVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "IT Acceptable Usage Policy – Acknowledgement") {
                ITAcceptableUsagePolicycontrolno = results[i][fieldname1.InternalName]
                ITAcceptableUsagePolicyVersionno = results[i][fieldname2.InternalName]


              }


            }

          }


        });

    }
  }
  public GetUsernamefrompersonalinfo(ONBSessionID) {
    newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "FullName",
        "ContactNumber",
        "Countrycodefirstsection",
        "ONBSessionID",
        "jobappliedfor"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {
          // $("#Jobtitle-ack-covid").val(result[0].jobappliedfor);
          // $("#Jobtitle-ack-covid1").val(result[0].jobappliedfor);
          $(".currentuser_name").val(result[0].FullName);
          $("#Employcontact-ack-covid").val(result[0].ContactNumber);
          $("#covide-country-codes").val(result[0].Countrycodefirstsection);
        }
      });

    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "Designation",
        "Department",
        "ONBSessionID",
        "EmployeeIDNumber",
        "DateofJoining"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#Jobtitle-ack-covid").val(result[0].Designation);
          $("#Jobtitle-ack-covid1").val(result[0].Designation);

          $("#Employdoj-ack-covid").val(
            moment(result[0].DateofJoining).format("YYYY-MM-DD")
          );

          $("#EmployDesignation-ack-covid,#EmployDesignation-ack-covid1").val(
            result[0].Designation
          );
          //$("#EmployDesignation-ack-covid1").val(result[0].Designation);
          $(
            "#Employdept-ack-covid2,#Employdept-ack-covid,#Employdept-ack-covid3,#Employdept-ack-covid4"
          ).val(result[0].Department);
          // $("#Employdept-ack-covid").val(result[0].Department);
          // $("#Employdept-ack-covid3").val(result[0].Department)
          // $("#Employdept-ack-covid4").val(result[0].Department)

          $(
            "#Employeeid-ack-covid,#Employeeid-ack-covid1,#Employeeid-ack-covid2,#Employeeid-ack-covid4,#Employeeid-ack-covid5"
          ).val(result[0].EmployeeIDNumber);
          // $("#Employeeid-ack-covid1").val(result[0].EmployeeIDNumber)
          // $("#Employeeid-ack-covid2").val(result[0].EmployeeIDNumber)
          // $("#Employeeid-ack-covid4").val(result[0].EmployeeIDNumber)
          // $("#Employeeid-ack-covid5").val(result[0].EmployeeIDNumber)
        }
      });

    newweb.lists
      .getByTitle("COI Transaction")
      .items.select("WitnessName", "Hospital", "ONBSessionID",)
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((response) => {
        if (response.length != 0) {
          $("#hr-name-dynamic,#hr-name-listdata").val(response[0].WitnessName);
          $("#EmployeeUnitNameit").val(response[0].Hospital)
        }
      });
  }

  public DynamicUnitLogo(ofc) {
    if (GlobalFormOpenedMode == "New") {
      $(`.Imgedynamic`).show();
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

  public Gdescription() {
    var InformationSecurityManagement = [];
    var ConfidentialInformation = [];
    var EquipmentHandle = [];
    var PhysicalSecurity = [];

    var PasswordsUsage = [];
    var AccessControl = [];
    var ClearDesk = [];
    var RemovableMedia = [];

    var Antivirus = [];
    var DesktopLaptopusage = [];

    var EmailUses = [];
    var InternetUsage = [];
    newweb.lists
      .getByTitle("AcknowledgmentCovid Master")
      .items.select(
        "InformationSecurityManagement",
        "ConfidentialInformation",
        "EquipmentHandle",
        "PhysicalSecurity",
        "PasswordsUsage",
        "AccessControl",
        "ClearDesk",
        "RemovableMedia",
        "ID",
        "Antivirus",
        "DesktopLaptopusage",
        "Gdescription",
        "EmailUses",
        "InternetUsage"
      )
      .get()
      .then((results) => {
        if (results.length != 0) {
          for (var i = 0; i < results.length; i++) {
            Gdescriptionss.push(results[i].Gdescription);
            InformationSecurityManagement.push(
              results[i].InformationSecurityManagement
            );
            InternetUsage.push(results[i].InternetUsage);
            EmailUses.push(results[i].EmailUses);
            DesktopLaptopusage.push(results[i].DesktopLaptopusage);
            Antivirus.push(results[i].Antivirus);
            RemovableMedia.push(results[i].RemovableMedia);
            ClearDesk.push(results[i].ClearDesk);
            AccessControl.push(results[i].AccessControl);
            PasswordsUsage.push(results[i].PasswordsUsage);
            PhysicalSecurity.push(results[i].PhysicalSecurity);
            EquipmentHandle.push(results[i].EquipmentHandle);
            ConfidentialInformation.push(results[i].ConfidentialInformation);
          }

          this.setState({
            Gdescription: Gdescriptionss,
          });
          this.setState({
            ConfidentialInformations: ConfidentialInformation,
          });
          this.setState({
            EquipmentHandles: EquipmentHandle,
          });
          this.setState({
            PhysicalSecuritys: PhysicalSecurity,
          });
          this.setState({
            PasswordsUsages: PasswordsUsage,
          });
          this.setState({
            AccessControls: AccessControl,
          });
          this.setState({
            ClearDesks: ClearDesk,
          });
          this.setState({
            RemovableMedias: RemovableMedia,
          });
          this.setState({
            Antiviruss: Antivirus,
          });
          this.setState({
            DesktopLaptopusages: DesktopLaptopusage,
          });
          this.setState({
            EmailUsess: EmailUses,
          });
          this.setState({
            InternetUsages: InternetUsage,
          });
          this.setState({
            InformationSecurityManagements: InformationSecurityManagement,
          });
        }
      });
  }
  // this.tableitemvalidation() &&
  // this.tableitemvalidation2() &&
  // this.tableitemvalidation3() &&
  // this.tableitemvalidation4() &&
  // this.tableitemvalidation5() &&
  // this.tableitemvalidation6() &&
  // this.tableitemvalidation7() &&
  // this.tableitemvalidation8() &&
  // this.tableitemvalidation9() &&
  // this.tableitemvalidation10() &&
  // this.tableitemvalidation11() &&
  // this.tableitemvalidation12() &&
  // this.tableitemvalidation13() &&
  // this.tableitemvalidation14() &&
  // this.tableitemvalidation15() &&
  // this.tableitemvalidation16() &&
  // this.tableitemvalidation17() &&
  // this.tableitemvalidation18() &&
  // this.tableitemvalidation19() &&
  // this.tableitemvalidation20() &&

  // this.tablevalidation1() &&
  // this.tablevalidation2() &&
  // this.tablevalidation3() &&
  // this.tablevalidation4() &&
  // this.tablevalidation5() &&
  // this.tablevalidation6() &&
  // this.tablevalidation7() &&
  // this.tablevalidation8() &&
  // this.tablevalidation9() &&
  // this.tablevalidation10() &&
  // this.tablevalidation11() &&
  // this.tablevalidation12() &&

  public EmployeeNameValidationdynamic() {
    var status = true;
    if (status == true && $(".employeename1").val() != "") {
      $("#err-Employeename-ackcovid").hide();
    } else {
      $("#err-Employeename-ackcovid").show();
      $(".employeename1").focus();
      status = false;
    }
    return status;
  }

  public updatelistitemcovid() {
    if (
      this.EmployeeNameValidationdynamic() &&
      this.Emplyeedept() &&
      this.checkbox() &&
      this.Emplyeedeg() &&
      this.PcrDate() &&
      this.PcrResult() &&
      this.EmplyeeNo() &&
      this.checkyesnovalidation2() &&
      this.checkyesnovalidation() &&
      this.pcrvaliddate() &&
      this.covidnegpositivevalidation() &&
      this.Jobtitlecovid() &&
      // this.Countrycodecovide() &&
      // this.Mobilenovalidation() &&
      // this.numberonlycovid() &&
      // this.dynamichrnamevalidation() &&
      this.tableitemvalidation() &&
      this.tableitemvalidation2() &&
      this.tableitemvalidation3() &&
      // this.tableitemvalidation4() &&
      this.tableitemvalidation5() &&
      this.tableitemvalidation6() &&
      this.tableitemvalidation7() &&
      // this.tableitemvalidation8() &&
      this.tableitemvalidation9() &&
      this.tableitemvalidation10() &&
      this.tableitemvalidation11() &&
      // this.tableitemvalidation12() &&
      this.tableitemvalidation13() &&
      this.tableitemvalidation14() &&
      this.tableitemvalidation15() &&
      // this.tableitemvalidation16() &&
      this.tableitemvalidation17() &&
      this.tableitemvalidation18() &&
      this.tableitemvalidation19() &&
      // this.tableitemvalidation20() &&
      this.tablevalidation1() &&
      this.tablevalidation2() &&
      this.tablevalidation3() &&
      this.tablevalidation4() &&
      this.tablevalidation5() &&
      this.tablevalidation6() &&
      // this.tablevalidation7() &&
      // this.tablevalidation8() &&
      // this.tablevalidation9() &&
      // this.tablevalidation10() &&
      // this.tablevalidation11() &&
      // this.tablevalidation12() &&
      this.Attachmentvalidation_for_Covid_Cert_update()
    ) {
      // if($(".Yescovidpositive").is(":checked")){
      //   var textquestionone=   $("#textareaone").val()
      //    }else{
      //      textquestionone= "-"
      //    }

      //    if($(".Yescovidpositive").is(":checked")){
      //      var textquestiontwo= $("#textareatwo").val()
      //       }else{
      //        textquestiontwo= "-"
      //       }

      this.CovidCertificateUpdate();
      newweb.lists
        .getByTitle("Acknowledgement And Policy Declarations Transaction")
        .items.getById(Acklistitemid)
        .update({
          Title: "ACKNOWLEDGMENT POLICY AND DECLEARATION",
          Status: "Updated by Unit HR",

          EmployeeName: $(".empallnameemp").val(),
          EmployeeId:
            $("#Employeeid-ack-covid").val() == ""
              ? "-"
              : $("#Employeeid-ack-covid").val(),
          EmployeeDepartment: $("#Employdept-ack-covid").val(),
          EmployeeDesignation: $(".employeedegack").val(),
          DateofJoining: $("#Employdoj-ack-covid").val(),
          Covid_x002d_19positive: $("#textareaone").val(),
          directcontactCovid_x002d_19posit: $("#textareatwo").val(),
          PCRtakendate: $("#pcrdate").val(),
          PCRresult: $("#pcrresult").val(),
          EmployeeNumber: $("#EmployNumber-ack-covid").val(),
          EmployeeJobTitle: $("#Jobtitle-ack-covid").val(),

          ContactNumber: $("#Employcontact-ack-covid").val(),
          Empoyee_x0020_UnitName: $("#Unitname-ackcoviddynamic").val(),
          Countrycode: $("#covide-country-codes").val(),
          HRNAME: $("#hr-name-listdata").val(),

          //Attachmentusername: this.state.CurrentUserName
        })

      if (tableitemid != undefined || tableitemid != null || tableitemid != "null") {
        newweb.lists
          .getByTitle("Employee Vaccination")
          .items.getById(tableitemid)
          .update({
            Status: "Update by Unit HR",
            ChickenPoxVaccinated: $("#chiekbpox-name").val(),
            Hepatitis_x002d_BVaccinated: $("#Hepatitis-name").val(),
            MMRVaccinated: $("#MMR-name").val(),
            InfluenzaVaccinated: $("#Influenza-name").val(),
            MeningococcalMicrobiologyStaffVa: $("#Meningococcal-name").val(),

            ChikenpoxVaccinatedDate: $("#chiekbpox-date").val(),
            HepatitisBVaccinatedDate: $("#Hepatitis-date").val(),
            MMRVaccinatedDate: $("#MMR-date").val(),
            InfluenzaVaccinatedDate: $("#Influenza-date").val(),
            MeningococcalVaccinatedDate: $("#Meningococcal-date").val(),

            ChikenpoxDescription:
              $("#chiekbpox-exposed").val() == ""
                ? "-"
                : $("#chiekbpox-exposed").val(),
            HepatitisBDescription:
              $("#Hepatitis-exposed").val() == ""
                ? "-"
                : $("#Hepatitis-exposed").val(),
            MMRDescription:
              $("#MMR-exposed").val() == "" ? "-" : $("#MMR-exposed").val(),
            InfluenzaDescription:
              $("#Influenza-exposed").val() == ""
                ? "-"
                : $("#Influenza-exposed").val(),
            MeningococcalDescription:
              $("#Meningococcal-exposed").val() == ""
                ? "-"
                : $("#Meningococcal-exposed").val(),

            InfectionControl1:
              $("#chiekbpox-infaction").val() == ""
                ? "-"
                : $("#chiekbpox-infaction").val(),
            InfectionControl2:
              $("#Hepatitis-infaction").val() == ""
                ? "-"
                : $("#Hepatitis-infaction").val(),
            InfectionControl3:
              $("#MMR-infaction").val() == "" ? "-" : $("#MMR-infaction").val(),
            InfectionControl4:
              $("#Influenza-infaction").val() == ""
                ? "-"
                : $("#Influenza-infaction").val(),
            InfectionControl5:
              $("#Meningococcal-infaction").val() == ""
                ? "-"
                : $("#Meningococcal-infaction").val(),
            ONBSessionID: GlobalSessionIDValue,
          });
      } else {
        newweb.lists.getByTitle("Employee Vaccination").items.add({
          Status: "Update by Unit HR",
          ChickenPoxVaccinated: $("#chiekbpox-name").val(),
          Hepatitis_x002d_BVaccinated: $("#Hepatitis-name").val(),
          MMRVaccinated: $("#MMR-name").val(),
          InfluenzaVaccinated: $("#Influenza-name").val(),
          MeningococcalMicrobiologyStaffVa: $("#Meningococcal-name").val(),

          ChikenpoxVaccinatedDate: $("#chiekbpox-date").val(),
          HepatitisBVaccinatedDate: $("#Hepatitis-date").val(),
          MMRVaccinatedDate: $("#MMR-date").val(),
          InfluenzaVaccinatedDate: $("#Influenza-date").val(),
          MeningococcalVaccinatedDate: $("#Meningococcal-date").val(),

          ChikenpoxDescription:
            $("#chiekbpox-exposed").val() == ""
              ? "-"
              : $("#chiekbpox-exposed").val(),
          HepatitisBDescription:
            $("#Hepatitis-exposed").val() == ""
              ? "-"
              : $("#Hepatitis-exposed").val(),
          MMRDescription:
            $("#MMR-exposed").val() == "" ? "-" : $("#MMR-exposed").val(),
          InfluenzaDescription:
            $("#Influenza-exposed").val() == ""
              ? "-"
              : $("#Influenza-exposed").val(),
          MeningococcalDescription:
            $("#Meningococcal-exposed").val() == ""
              ? "-"
              : $("#Meningococcal-exposed").val(),

          InfectionControl1:
            $("#chiekbpox-infaction").val() == ""
              ? "-"
              : $("#chiekbpox-infaction").val(),
          InfectionControl2:
            $("#Hepatitis-infaction").val() == ""
              ? "-"
              : $("#Hepatitis-infaction").val(),
          InfectionControl3:
            $("#MMR-infaction").val() == "" ? "-" : $("#MMR-infaction").val(),
          InfectionControl4:
            $("#Influenza-infaction").val() == ""
              ? "-"
              : $("#Influenza-infaction").val(),
          InfectionControl5:
            $("#Meningococcal-infaction").val() == ""
              ? "-"
              : $("#Meningococcal-infaction").val(),
          ONBSessionID: GlobalSessionIDValue,
        });
      }

      if (tableitemidtwo != undefined || tableitemidtwo != null || tableitemidtwo != "null") {
        newweb.lists
          .getByTitle("Covid Vaccination")
          .items.getById(tableitemidtwo)
          .update({
            Status: "Update by Unit HR",

            FirstDoseName:
              $("#FirstDose-name").val() == ""
                ? "-"
                : $("#FirstDose-name").val(),
            SecondDoseName:
              $("#SecondDose-name").val() == ""
                ? "-"
                : $("#SecondDose-name").val(),
            BoosterDoseName:
              $("#BoosterDose-name").val() == ""
                ? "-"
                : $("#BoosterDose-name").val(),
            SecondBoosterDoseName:
              $("#SecondBoosterDose-name").val() == ""
                ? "-"
                : $("#SecondBoosterDose-name").val(),

            FirstPlace:
              $("#FirstDose-place").val() == ""
                ? "-"
                : $("#FirstDose-place").val(),
            SecondPlace:
              $("#SecondDose-place").val() == ""
                ? "-"
                : $("#SecondDose-place").val(),
            FirstboosterPlace:
              $("#BoosterDose-place").val() == ""
                ? "-"
                : $("#BoosterDose-place").val(),
            SecondBoosterPlace:
              $("#SecondBoosterDose-place").val() == ""
                ? "-"
                : $("#SecondBoosterDose-place").val(),

            FirstDate: $("#FirstDose-date").val(),
            SecondDate: $("#SecondDose-date").val(),
            FirstBoosterDate: $("#BoosterDose-date").val(),
            SecondboosterDate: $("#SecondBoosterDose-date").val(),
            ONBSessionID: GlobalSessionIDValue,
          });
      } else {
        newweb.lists.getByTitle("Covid Vaccination").items.add({
          Status: "Update by Unit HR",

          FirstDoseName:
            $("#FirstDose-name").val() == "" ? "-" : $("#FirstDose-name").val(),
          SecondDoseName:
            $("#SecondDose-name").val() == ""
              ? "-"
              : $("#SecondDose-name").val(),
          BoosterDoseName:
            $("#BoosterDose-name").val() == ""
              ? "-"
              : $("#BoosterDose-name").val(),
          SecondBoosterDoseName:
            $("#SecondBoosterDose-name").val() == ""
              ? "-"
              : $("#SecondBoosterDose-name").val(),

          FirstPlace:
            $("#FirstDose-place").val() == ""
              ? "-"
              : $("#FirstDose-place").val(),
          SecondPlace:
            $("#SecondDose-place").val() == ""
              ? "-"
              : $("#SecondDose-place").val(),
          FirstboosterPlace:
            $("#BoosterDose-place").val() == ""
              ? "-"
              : $("#BoosterDose-place").val(),
          SecondBoosterPlace:
            $("#SecondBoosterDose-place").val() == ""
              ? "-"
              : $("#SecondBoosterDose-place").val(),

          FirstDate: $("#FirstDose-date").val(),
          SecondDate: $("#SecondDose-date").val(),
          FirstBoosterDate: $("#BoosterDose-date").val(),
          SecondboosterDate: $("#SecondBoosterDose-date").val(),
          ONBSessionID: GlobalSessionIDValue,
        });
      }

      if (this.state.HrCompleteStatus == true) {
        this.CovidCertificateUpdateHRUpdateHist();
        subweb.lists
          .getByTitle("Acknowledgement And Policy Declarations HR Update History").items
          .add({
            Title: "ACKNOWLEDGMENT POLICY AND DECLEARATION",
            Status: "Updated by Unit HR",

            EmployeeName: $(".empallnameemp").val(),
            EmployeeId:
              $("#Employeeid-ack-covid").val() == ""
                ? "-"
                : $("#Employeeid-ack-covid").val(),
            EmployeeDepartment: $("#Employdept-ack-covid").val(),
            EmployeeDesignation: $(".employeedegack").val(),
            DateofJoining: $("#Employdoj-ack-covid").val(),
            Covid_x002d_19positive: $("#textareaone").val(),
            directcontactCovid_x002d_19posit: $("#textareatwo").val(),
            PCRtakendate: $("#pcrdate").val(),
            PCRresult: $("#pcrresult").val(),
            EmployeeNumber: $("#EmployNumber-ack-covid").val(),
            EmployeeJobTitle: $("#Jobtitle-ack-covid").val(),
            BusinessUnit: officename,
            ContactNumber: $("#Employcontact-ack-covid").val(),
            Empoyee_x0020_UnitName: $("#Unitname-ackcoviddynamic").val(),
            Countrycode: $("#covide-country-codes").val(),
            HRNAME: $("#hr-name-listdata").val(),
            ONBSessionID: GlobalSessionIDValue,
            //Attachmentusername: this.state.CurrentUserName
            CovidControlNumber: CovidControlNumber,
            AccommodationControlNo: AccommodationControlNo,
            IDCardcontrolnumber: IDCardcontrolnumber,
            Handbookcontrolnumber: Handbookcontrolnumber,
            Giftscontrolno: Giftscontrolno,
            CellPhonecontrolNumber: CellPhonecontrolNumber,
            ITSecuritycontrolno: ITSecuritycontrolno,
            ITAcceptablecontrolnumber: ITAcceptablecontrolnumber,
            covidversionnumber: covidversionnumber,
            Accommodationversionnumber: Accommodationversionnumber,
            IDCardversionnumber: IDCardversionnumber,
            Handbookversionno: Handbookversionno,
            Giftsversionnumber: Giftsversionnumber,
            CellPhoneversionnumber: CellPhoneversionnumber,
            ITSecurityversionnumber: ITSecurityversionnumber,
            ITAcceptableversionnumber: ITAcceptableversionnumber,
          })
        this.AddTableHRUpdateHist()
      }

      setTimeout(() => {
        swal({
          title: "The Form has been updated successfully",
          icon: "success",
        }).then(() => {
          location.reload();
        });
      }, 2000);
    }
  }

  public async CovidCertificateUpdateHRUpdateHist() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-covid-cert") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-covid-cert") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Covid Vaccination Certificate";
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
            `/UH/Covid Vaccination Certificate HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: GlobalSessionIDValue,
                  Tags: "Covid Vaccination Certificate",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public AddTableHRUpdateHist() {
    subweb.lists.getByTitle("Employee Vaccination HR Update History").items.add({
      Status: "Update by Unit HR",
      ChickenPoxVaccinated: $("#chiekbpox-name").val(),
      Hepatitis_x002d_BVaccinated: $("#Hepatitis-name").val(),
      MMRVaccinated: $("#MMR-name").val(),
      InfluenzaVaccinated: $("#Influenza-name").val(),
      MeningococcalMicrobiologyStaffVa: $("#Meningococcal-name").val(),

      ChikenpoxVaccinatedDate: $("#chiekbpox-date").val(),
      HepatitisBVaccinatedDate: $("#Hepatitis-date").val(),
      MMRVaccinatedDate: $("#MMR-date").val(),
      InfluenzaVaccinatedDate: $("#Influenza-date").val(),
      MeningococcalVaccinatedDate: $("#Meningococcal-date").val(),

      ChikenpoxDescription:
        $("#chiekbpox-exposed").val() == ""
          ? "-"
          : $("#chiekbpox-exposed").val(),
      HepatitisBDescription:
        $("#Hepatitis-exposed").val() == ""
          ? "-"
          : $("#Hepatitis-exposed").val(),
      MMRDescription:
        $("#MMR-exposed").val() == "" ? "-" : $("#MMR-exposed").val(),
      InfluenzaDescription:
        $("#Influenza-exposed").val() == ""
          ? "-"
          : $("#Influenza-exposed").val(),
      MeningococcalDescription:
        $("#Meningococcal-exposed").val() == ""
          ? "-"
          : $("#Meningococcal-exposed").val(),

      InfectionControl1:
        $("#chiekbpox-infaction").val() == ""
          ? "-"
          : $("#chiekbpox-infaction").val(),
      InfectionControl2:
        $("#Hepatitis-infaction").val() == ""
          ? "-"
          : $("#Hepatitis-infaction").val(),
      InfectionControl3:
        $("#MMR-infaction").val() == "" ? "-" : $("#MMR-infaction").val(),
      InfectionControl4:
        $("#Influenza-infaction").val() == ""
          ? "-"
          : $("#Influenza-infaction").val(),
      InfectionControl5:
        $("#Meningococcal-infaction").val() == ""
          ? "-"
          : $("#Meningococcal-infaction").val(),
      ONBSessionID: GlobalSessionIDValue,
    });
    subweb.lists.getByTitle("Covid Vaccination HR Update History").items.add({
      Status: "Update by Unit HR",

      FirstDoseName:
        $("#FirstDose-name").val() == "" ? "-" : $("#FirstDose-name").val(),
      SecondDoseName:
        $("#SecondDose-name").val() == ""
          ? "-"
          : $("#SecondDose-name").val(),
      BoosterDoseName:
        $("#BoosterDose-name").val() == ""
          ? "-"
          : $("#BoosterDose-name").val(),
      SecondBoosterDoseName:
        $("#SecondBoosterDose-name").val() == ""
          ? "-"
          : $("#SecondBoosterDose-name").val(),

      FirstPlace:
        $("#FirstDose-place").val() == ""
          ? "-"
          : $("#FirstDose-place").val(),
      SecondPlace:
        $("#SecondDose-place").val() == ""
          ? "-"
          : $("#SecondDose-place").val(),
      FirstboosterPlace:
        $("#BoosterDose-place").val() == ""
          ? "-"
          : $("#BoosterDose-place").val(),
      SecondBoosterPlace:
        $("#SecondBoosterDose-place").val() == ""
          ? "-"
          : $("#SecondBoosterDose-place").val(),

      FirstDate: $("#FirstDose-date").val(),
      SecondDate: $("#SecondDose-date").val(),
      FirstBoosterDate: $("#BoosterDose-date").val(),
      SecondboosterDate: $("#SecondBoosterDose-date").val(),
      ONBSessionID: GlobalSessionIDValue,
    });

  }

  public Autofieldvalue() {
    $("#Employdept-ack-covid").keyup(function () {
      var value = $(this).val();
      $("#Employdept-ack-covid2").val(value);
      $("#Employdept-ack-covid3").val(value);
      $("#Employdept-ack-covid4").val(value);
    });

    $("#Employdept-ack-covid3").keyup(function () {
      var value = $(this).val();
      $("#Employdept-ack-covid2").val(value);
      $("#Employdept-ack-covid").val(value);
      $("#Employdept-ack-covid4").val(value);
    });

    $("#Employdept-ack-covid4").keyup(function () {
      var value = $(this).val();
      $("#Employdept-ack-covid2").val(value);
      $("#Employdept-ack-covid3").val(value);
      $("#Employdept-ack-covid").val(value);
    });

    $("#Employdept-ack-covid2").keyup(function () {
      var value = $(this).val();
      $("#Employdept-ack-covid").val(value);
      $("#Employdept-ack-covid3").val(value);
      $("#Employdept-ack-covid4").val(value);
    });

    $("#Employeeid-ack-covid").keyup(function () {
      var value = $(this).val();
      $(".empidcovid").val(value);
      $("#Employeeid-ack-covid1").val(value);
      $("#Employeeid-ack-covid2").val(value);
      $("#Employeeid-ack-covid4").val(value);
      $("#Employeeid-ack-covid5").val(value);
    });

    $("#Employeeid-ack-covid1").keyup(function () {
      var value = $(this).val();
      $("#Employeeid-ack-covid5").val(value);
      $("#Employeeid-ack-covid").val(value);
      $("#Employeeid-ack-covid2").val(value);
      $("#Employeeid-ack-covid4").val(value);
    });

    $("#Employeeid-ack-covid2").keyup(function () {
      var value = $(this).val();
      $("#Employeeid-ack-covid5").val(value);
      $("#Employeeid-ack-covid1").val(value);
      $("#Employeeid-ack-covid").val(value);
      $("#Employeeid-ack-covid4").val(value);
    });

    $("#Employeeid-ack-covid4").keyup(function () {
      var value = $(this).val();
      $("#Employeeid-ack-covid5").val(value);
      $("#Employeeid-ack-covid1").val(value);
      $("#Employeeid-ack-covid2").val(value);
      $("#Employeeid-ack-covid").val(value);
    });

    $("#Employeeid-ack-covid5").keyup(function () {
      var value = $(this).val();
      $("#Employeeid-ack-covid4").val(value);
      $("#Employeeid-ack-covid1").val(value);
      $("#Employeeid-ack-covid2").val(value);
      $("#Employeeid-ack-covid").val(value);
    });

    $("#EmployDesignation-ack-covid").keyup(function () {
      var value = $(this).val();
      $(".employeedegs").val(value);
    });
    $("#EmployDesignation-ack-covid1").keyup(function () {
      var value = $(this).val();
      $("#EmployDesignation-ack-covid1").val(value);
    });

    $("#Employeeid-ack-covid").keyup(function () {
      var value = $(this).val();
      $(".empidcovid").val(value);
    });

    $("#Jobtitle-ack-covid").keyup(function () {
      var value = $(this).val();
      $(".job_title_covid").val(value);
    });

    $("#Jobtitle-ack-covid1").keyup(function () {
      var value = $(this).val();
      $("#Jobtitle-ack-covid").val(value);
    });

    $(".employeename1").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });

    $(".employeename2").keyup(function () {
      var value = $(this).val();
      $(".employeename1").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);
      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });

    $(".employeename3").keyup(function () {
      var value = $(this).val();
      $(".employeename1").val(value);
      $(".employeename2").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);
      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });

    $(".employeename4").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename1").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });

    $(".employeename5").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename1").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename6").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename1").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename7").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename1").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename8").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename1").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename9").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename1").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename10").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename1").val(value);
      $(".employeename11").val(value);
      $(".employeename12").val(value);
    });
    $(".employeename11").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename1").val(value);
      $(".employeename12").val(value);
    });

    $(".employeename1").keyup(function () {
      var value = $(this).val();
      $(".employeename2").val(value);
      $(".employeename3").val(value);
      $(".employeename4").val(value);
      $(".employeename5").val(value);
      $(".employeename6").val(value);

      $(".employeename7").val(value);
      $(".employeename8").val(value);
      $(".employeename9").val(value);
      $(".employeename10").val(value);
      $(".employeename11").val(value);
      $(".employeename1").val(value);
    });

    $(".currentuser_name").keyup(function () {
      var value = $(this).val();
      $(".currentuser_name").val(value);
    });

    $("#yescovid").change(function () {
      $(".errone").hide();
      if ($(this).is(":checked")) {
        $("#textareaone").show();
      } else {
        $("#textareaone").hide();
      }
    });
    $("#NOcovid").change(function () {
      $(".errone").hide();
      if ($(this).is(":checked")) {
        $("#textareaone").val(null);
      }
    });
    $("#yescovid2").change(function () {
      $(".errtwo").hide();
      if ($(this).is(":checked")) {
        $("#textareatwo").show();
      } else {
        $("#textareatwo").hide();
      }
    });
    $("#NOcovid2").change(function () {
      $(".errtwo").hide();
      $("#textareatwo").val(null);
    });
    $("#covide-country-codes").change(function () {
      $("#err-countrycodesackcovid").hide();
    });
  }

  public EmplyeeID() {
    var Status = true;

    if (Status == true && $("#Employeeid-ack-covid").val() != "") {
      $(".err-Employeeid-ackcovidvalid").hide();
    } else {
      $(".err-Employeeid-ackcovidvalid").show();
      $("#Employeeid-ack-covid").focus();
      Status = false;
    }
    return Status;
  }

  public Emplyeedept() {
    var Status = true;

    if (Status == true && $("#Employdept-ack-covid").val() != "") {
      $(".err-Employeedept-ackcovidvalid").hide();
    } else {
      $(".err-Employeedept-ackcovidvalid").show();
      $("#Employdept-ack-covid").focus();
      Status = false;
    }
    return Status;
  }

  public Emplyeedoj() {
    var Status = true;

    if (Status == true && $("#Employdoj-ack-covid").val() != "") {
      $("#err-Employeedoj-ackcovid").hide();
    } else {
      $("#err-Employeedoj-ackcovid").show();
      $("#Employdoj-ack-covid").focus();
      Status = false;
    }
    return Status;
  }

  public Emplyeedeg() {
    var Status = true;

    if (Status == true && $("#EmployDesignation-ack-covid").val() != "") {
      $("#err-EmployeeDesignation-ackcovid").hide();
    } else {
      $("#err-EmployeeDesignation-ackcovid").show();
      $("#EmployDesignation-ack-covid").focus();
      Status = false;
    }
    return Status;
  }
  public EmplyeeNo() {
    var Status = true;

    if (Status == true && $("#EmployNumber-ack-covid").val() != "") {
      $("#err-EmployeeNumber-ackcovid").hide();
    } else {
      $("#err-EmployeeNumber-ackcovid").show();
      $("#EmployNumber-ack-covid").focus();
      Status = false;
    }
    return Status;
  }

  public tableitemvalidation() {
    var Tablestatus = true;
    if (Tablestatus == true && $(".chikenpox_name").val() != "Select") {
      $(".err_chikenpox_name").hide();
    } else {
      $(".err_chikenpox_name").show();
      $(".chikenpox_name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }
  //
  public tableitemvalidation2() {
    var Tablestatus = true;
    var Chikenboxname = $(".chikenpox_name").val();

    if (Chikenboxname == "Yes") {
      if ((Tablestatus = true && $("#chiekbpox-date").val() != "")) {
        $(".err_chiekbpox_date").hide();
      } else {
        $(".err_chiekbpox_date").show();
        $("#chiekbpox-date").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation3() {
    var Tablestatus = true;
    var Chikenboxname = $(".chikenpox_name").val();

    if (Chikenboxname == "Yes") {
      if ((Tablestatus = true && $("#chiekbpox-exposed").val() != "")) {
        $(".err_chiekbpox_exposed").hide();
      } else {
        $(".err_chiekbpox_exposed").show();
        $("#chiekbpox-exposed").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation4() {
    var Tablestatus = true;
    var Chikenboxname = $(".chikenpox_name").val();

    if (Chikenboxname == "Yes") {
      if ((Tablestatus = true && $("#chiekbpox-infaction").val() != "")) {
        $(".err_chiekbpox_infaction").hide();
      } else {
        $(".err_chiekbpox_infaction").show();
        $("#chiekbpox-infaction").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation5() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#Hepatitis-name").val() != "Select")) {
      $(".err_Hepatitis_name").hide();
    } else {
      $(".err_Hepatitis_name").show();
      $("#Hepatitis-name").focus();
      Tablestatus = false;
    }

    return Tablestatus;
  }

  public tableitemvalidation6() {
    var Tablestatus = true;
    var Hepatitisdname = $("#Hepatitis-name").val();
    if (Hepatitisdname == "Yes") {
      if ((Tablestatus = true && $("#Hepatitis-date").val() != "")) {
        $(".err_Hepatitis_date").hide();
      } else {
        $(".err_Hepatitis_date").show();
        $("#Hepatitis-date").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation7() {
    var Tablestatus = true;
    var Hepatitisdname = $("#Hepatitis-name").val();
    if (Hepatitisdname == "Yes") {
      if ((Tablestatus = true && $("#Hepatitis-exposed").val() != "")) {
        $(".err_Hepatitis_exposed").hide();
      } else {
        $(".err_Hepatitis_exposed").show();
        $("#Hepatitis-exposed").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation8() {
    var Tablestatus = true;
    var Hepatitisdname = $("#Hepatitis-name").val();
    if (Hepatitisdname == "Yes") {
      if ((Tablestatus = true && $("#Hepatitis-infaction").val() != "")) {
        $(".err_Hepatitis_infaction").hide();
      } else {
        $(".err_Hepatitis_infaction").show();
        $("#Hepatitis-infaction").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation9() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#MMR-name").val() != "Select")) {
      $(".err_MMR_name").hide();
    } else {
      $(".err_MMR_name").show();
      $("#MMR-name").focus();
      Tablestatus = false;
    }

    return Tablestatus;
  }
  public tableitemvalidation10() {
    var Tablestatus = true;

    var MMRname = $("#MMR-name").val();
    if (MMRname == "Yes") {
      if ((Tablestatus = true && $("#MMR-date").val() != "")) {
        $(".err_MMR_date").hide();
      } else {
        $(".err_MMR_date").show();
        $("#MMR-date").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation11() {
    var Tablestatus = true;
    var MMRname = $("#MMR-name").val();
    if (MMRname == "Yes") {
      if ((Tablestatus = true && $("#MMR-exposed").val() != "")) {
        $(".err_MMR_exposed").hide();
      } else {
        $(".err_MMR_exposed").show();
        $("#MMR-exposed").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation12() {
    var Tablestatus = true;
    var MMRname = $("#MMR-name").val();
    if (MMRname == "Yes") {
      if ((Tablestatus = true && $("#MMR-infaction").val() != "")) {
        $(".err_MMR_infaction").hide();
      } else {
        $(".err_MMR_infaction").show();
        $("#MMR-infaction").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  ////

  public tableitemvalidation13() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#Influenza-name").val() != "Select")) {
      $(".err_Influenza_name").hide();
    } else {
      $(".err_Influenza_name").show();
      $("#Influenza-name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }
  public tableitemvalidation14() {
    var Tablestatus = true;
    var Influenzaname = $("#Influenza-name").val();
    if (Influenzaname == "Yes") {
      if ((Tablestatus = true && $("#Influenza-date").val() != "")) {
        $(".err_Influenza_date").hide();
      } else {
        $(".err_Influenza_date").show();
        $("#Influenza-date").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation15() {
    var Tablestatus = true;
    var Influenzaname = $("#Influenza-name").val();
    if (Influenzaname == "Yes") {
      if ((Tablestatus = true && $("#Influenza-exposed").val() != "")) {
        $(".err_Influenza_exposed").hide();
      } else {
        $(".err_Influenza_exposed").show();
        $("#Influenza-exposed").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation16() {
    var Tablestatus = true;
    var Influenzaname = $("#Influenza-name").val();
    if (Influenzaname == "Yes") {
      if ((Tablestatus = true && $("#Influenza-infaction").val() != "")) {
        $(".err_Influenza_infaction").hide();
      } else {
        $(".err_Influenza_infaction").show();
        $("#Influenza-infaction").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tableitemvalidation17() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#Meningococcal-name").val() != "Select")) {
      $(".err_Meningococcal_name").hide();
    } else {
      $(".err_Meningococcal_name").show();
      $("#Meningococcal-name").focus();
      Tablestatus = false;
    }

    return Tablestatus;
  }

  public tableitemvalidation18() {
    var Tablestatus = true;
    var Meningococcalname = $("#Meningococcal-name").val();
    if (Meningococcalname == "Yes") {
      if ((Tablestatus = true && $("#Meningococcal-date").val() != "")) {
        $(".err_Meningococcal_date").hide();
      } else {
        $(".err_Meningococcal_date").show();
        $("#Meningococcal-date").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation19() {
    var Tablestatus = true;
    var Meningococcalname = $("#Meningococcal-name").val();
    if (Meningococcalname == "Yes") {
      if ((Tablestatus = true && $("#Meningococcal-exposed").val() != "")) {
        $(".err_Meningococcal_exposed").hide();
      } else {
        $(".err_Meningococcal_exposed").show();
        $("#Meningococcal-exposed").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }
  public tableitemvalidation20() {
    var Tablestatus = true;
    var Meningococcalname = $("#Meningococcal-name").val();
    if (Meningococcalname == "Yes") {
      if ((Tablestatus = true && $("#Meningococcal-infaction").val() != "")) {
        $(".err_Meningococcal_infaction").hide();
      } else {
        $(".err_Meningococcal_infaction").show();
        $("#Meningococcal-infaction").focus();
        Tablestatus = false;
      }
    }
    return Tablestatus;
  }

  public tablevalidation1() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#FirstDose-name").val() != "")) {
      $(".err_FirstDose_name").hide();
    } else {
      $(".err_FirstDose_name").show();
      $("#FirstDose-name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation2() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#FirstDose-place").val() != "")) {
      $(".err_FirstDose_place").hide();
    } else {
      $(".err_FirstDose_place").show();
      $("#FirstDose-place").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation3() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#FirstDose-date").val() != "")) {
      $(".err_FirstDose_date").hide();
    } else {
      $(".err_FirstDose_date").show();
      $("#FirstDose-date").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation4() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondDose-name").val() != "")) {
      $(".err_SecondDose_name").hide();
    } else {
      $(".err_SecondDose_name").show();
      $("#SecondDose-name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation5() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondDose-place").val() != "")) {
      $(".err_SecondDose_place").hide();
    } else {
      $(".err_SecondDose_place").show();
      $("#SecondDose-place").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation6() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondDose-date").val() != "")) {
      $(".err_SecondDose_date").hide();
    } else {
      $(".err_SecondDose_date").show();
      $("#SecondDose-date").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation7() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#BoosterDose-name").val() != "")) {
      $(".err_BoosterDose_name").hide();
    } else {
      $(".err_BoosterDose_name").show();
      $("#BoosterDose-name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation8() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#BoosterDose-place").val() != "")) {
      $(".err_BoosterDose_place").hide();
    } else {
      $(".err_BoosterDose_place").show();
      $("#BoosterDose-place").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public tablevalidation9() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#BoosterDose-date").val() != "")) {
      $(".err_BoosterDose_date").hide();
    } else {
      $(".err_BoosterDose_date").show();
      $("#BoosterDose-date").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }
  public tablevalidation10() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondBoosterDose-name").val() != "")) {
      $(".err_SecondBoosterDose_name").hide();
    } else {
      $(".err_SecondBoosterDose_name").show();
      $("#SecondBoosterDose-name").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }
  public tablevalidation11() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondBoosterDose-place").val() != "")) {
      $(".err_SecondBoosterDose_place").hide();
    } else {
      $(".err_SecondBoosterDose_place").show();
      $("#SecondBoosterDose-place").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }
  public tablevalidation12() {
    var Tablestatus = true;
    if ((Tablestatus = true && $("#SecondBoosterDose-date").val() != "")) {
      $(".err_SecondBoosterDose_date").hide();
    } else {
      $(".err_SecondBoosterDose_date").show();
      $("#SecondBoosterDose-date").focus();
      Tablestatus = false;
    }
    return Tablestatus;
  }

  public RemoveValidationcovid() {
    $(".SecondBoosterDose_name").keyup(function () {
      $(".err_SecondBoosterDose_name").hide();
    });
    $(".empidcovid").keyup(function () {
      $(".err-Employeeid-ackcovidvalid").hide();
    });

    $("#Employdept-ack-covid").keyup(function () {
      $(".err-Employeedept-ackcovidvalid").hide();
    });

    ////

    $("#Employdoj-ack-covid").keyup(function () {
      $("#err-Employeedoj-ackcovid").hide();
    });

    $("#EmployDesignation-ack-covid").keyup(function () {
      $("#err-EmployeeDesignation-ackcovid").hide();
    });

    $(".chikenpox_name").on("change", function () {
      $(".err_chikenpox_name").hide();
    });

    $("#chiekbpox-date").on("change", function () {
      $(".err_chiekbpox_date").hide();
    });

    $("#chiekbpox-exposed").keyup(function () {
      $(".err_chiekbpox_exposed").hide();
    });

    $("#chiekbpox-infaction").keyup(function () {
      $(".err_chiekbpox_infaction").hide();
    });

    $("#Hepatitis-name").on("change", function () {
      $(".err_Hepatitis_name").hide();
    });

    $("#Hepatitis-date").on("change", function () {
      $(".err_Hepatitis_date").hide();
    });
    $("#Hepatitis-exposed").keyup(function () {
      $(".err_Hepatitis_exposed").hide();
    });

    $("#Hepatitis-infaction").keyup(function () {
      $(".err_Hepatitis_infaction").hide();
    });

    $("#MMR-name").on("change", function () {
      $(".err_MMR_name").hide();
    });

    $("#MMR-date").on("change", function () {
      $(".err_MMR_date").hide();
    });

    $("#MMR-exposed").keyup(function () {
      $(".err_MMR_exposed").hide();
    });

    $("#MMR-infaction").keyup(function () {
      $(".err_MMR_infaction").hide();
    });

    $("#Influenza-name").on("change", function () {
      $(".err_Influenza_name").hide();
    });

    $("#Influenza-date").on("change", function () {
      $(".err_Influenza_date").hide();
    });

    $("#Influenza-exposed").keyup(function () {
      $(".err_Influenza_exposed").hide();
    });

    $("#Influenza-infaction").keyup(function () {
      $(".err_Influenza_infaction").hide();
    });

    $("#Meningococcal-name").on("change", function () {
      $(".err_Meningococcal_name").hide();
    });

    $("#Meningococcal-date").on("change", function () {
      $(".err_Meningococcal_date").hide();
    });

    $("#Meningococcal-exposed").keyup(function () {
      $(".err_Meningococcal_exposed").hide();
    });

    $("#Meningococcal-infaction").keyup(function () {
      $(".err_Meningococcal_infaction").hide();
    });

    $("#FirstDose-name").keyup(function () {
      $(".err_FirstDose_name").hide();
    });

    $("#FirstDose-place").keyup(function () {
      $(".err_FirstDose_place").hide();
    });

    $("#FirstDose-date").on("change", function () {
      $(".err_FirstDose_date").hide();
    });

    $("#SecondDose-name").keyup(function () {
      $(".err_SecondDose_name").hide();
    });

    $("#SecondDose-place").keyup(function () {
      $(".err_SecondDose_place").hide();
    });

    $("#SecondDose-date").on("change", function () {
      $(".err_SecondDose_date").hide();
    });

    $("#BoosterDose-name").keyup(function () {
      $(".err_BoosterDose_name").hide();
    });

    $("#BoosterDose-place").keyup(function () {
      $(".err_BoosterDose_place").hide();
    });
    $("#BoosterDose-date").on("change", function () {
      $(".err_BoosterDose_date").hide();
    });

    $("#SecondBoosterDose-name").keyup(function () {
      $(".err_BoosterDose_date").hide();
    });

    $("#SecondBoosterDose-place").keyup(function () {
      $(".err_SecondBoosterDose_place").hide();
    });

    $("#SecondBoosterDose-date").on("change", function () {
      $(".err_SecondBoosterDose_date").hide();
    });

    $("#pcrresult").on("change", function () {
      $("#err-pcrresult-ackcovid").hide();
    });

    $("#textareaone").keyup(function () {
      $("#err-textareaone-ackcovid").hide();
    });
    $("#textareatwo").keyup(function () {
      $("#err-textareatwo-ackcovid").hide();
    });

    $("#pcrdate").on("change", function () {
      $("#pcrdate-err").hide();
    });

    $("#pcrdate").on("change", function () {
      $("#pcrdate-err").hide();
    });
    $(".nocovidpositive").on("change", function () {
      $("#err-textareaone-ackcovid").hide();
    });

    $(".nocovidpositive2").on("change", function () {
      $("#err-textareatwo-ackcovid").hide();
    });
    $("#Jobtitle-ack-covid").keyup(function () {
      $("#err-Jobtitle-ackcovid").hide();
    });
    $("#Attact-covid-cert").on("change", function () {
      $("#err-covid-cert").hide();
    });
  }

  public covidnegpositivevalidation() {
    var status = true;
    if (
      status == true &&
      $("#pcrresult").find(":selected").text() == "Select"
    ) {
      $("#err-pcrresult-ackcovid").show();
      $("#pcrresult").focus();
      status = false;
    } else {
      $("#err-pcrresult-ackcovid").hide();
    }
    return status;
  }

  public checkyesnovalidation() {
    var status = true;
    if ($("#yescovid").is(":checked")) {
      //  err-textareatwo-ackcovid
      if (status == true && $("#textareaone").val() != "") {
        $("#err-textareaone-ackcovid").hide();
      } else {
        $("#err-textareaone-ackcovid").show();
        $("#textareaone").focus();
        status = false;
      }
    } else {
      $("#err-textareaone-ackcovid").hide();
    }
    return status;
  }

  public checkyesnovalidation2() {
    var status = true;
    if ($("#yescovid2").is(":checked")) {
      //  err-textareatwo-ackcovid
      if (status == true && $("#textareatwo").val() != "") {
        $("#err-textareatwo-ackcovid").hide();
      } else {
        $("#err-textareatwo-ackcovid").show();
        $("#textareatwo").focus();
        status = false;
      }
    } else {
      $("#err-textareatwo-ackcovid").hide();
    }
    return status;
  }

  public Countrycodecovide() {
    var status = true;
    if (
      status == true &&
      $("#covide-country-codes").find(":selected").text() == "Select"
    ) {
      $("#err-countrycodesackcovid").show();
      $("#covide-country-codes").focus();
      status = false;
    } else {
      $("#err-countrycodesackcovid").hide();
    }
    return status;
  }

  public numberonlycovid() {
    var status = true;
    var numbers = /^[0-9]+$/;
    var phone = $.trim(($("#Employcontact-ack-covid") as any).val());

    if (status == true && phone.match(numbers)) {
      $("#err-format-ackcovid").hide();
    } else {
      $("#err-format-ackcovid").show();
      $("#Employcontact-ack-covid").focus();
      status = false;
    }
    return status;
  }

  public Mobilenovalidation() {
    var status = true;
    if (status == true && $("#Employcontact-ack-covid").val() != "") {
      $("#err-Employeecontact-ackcovid").hide();
    } else {
      $("#err-Employeecontact-ackcovid").show();
      $("#Employcontact-ack-covid").focus();
      status = false;
    }
    return status;
  }

  public pcrvaliddate() {
    var status = true;
    if (status == true && $("#pcrdate").val() != "") {
      $("#pcrdate-err").hide();
    } else {
      $("#pcrdate-err").show();
      $("#pcrdate").focus();
      status = false;
    }
    return status;
  }

  public Jobtitlecovid() {
    var status = true;
    if (status == true && $("#Jobtitle-ack-covid").val() != "") {
      $("#err-Jobtitle-ackcovid").hide();
    } else {
      $("#err-Jobtitle-ackcovid").show();
      $("#Jobtitle-ack-covid").focus();
      status = false;
    }
    return status;
  }

  public questiononevalid() {
    var status = true;
    if (status == true && $("#Yescovidpositive ").is(":checked")) {
      $(".err-que-two").hide();
    } else if (status == true && $(".coi_question_second_no").is(":checked")) {
      $(".err-que-two").hide();
    } else {
      $(".err-que-two").show();
      $(".coi_question_second_no").focus();
      status = false;
    }
    return status;
  }
  public checkbox() {
    var status = true;

    var yescovid = $("#yescovid").is(":checked");
    var nocovid = $("#NOcovid").is(":checked");
    var yescovid2 = $("#yescovid2").is(":checked");
    var nocovid2 = $("#NOcovid2").is(":checked");

    if (yescovid == false && nocovid == false) {
      status = false;
      $(".errone").show();
      $("#yescovid").focus();
    }
    if (yescovid2 == false && nocovid2 == false) {
      status = false;
      $(".errtwo").show();
      $("#yescovid2").focus();
    }
    return status;
  }

  public PcrDate() {
    var status = true;
    if (status == true && $("#pcrdate").val() != "") {
      $("#pcrdate-err").hide();
    } else {
      $("#pcrdate-err").show();
      $("#pcrdate").focus();
      status = false;
    }
    return status;
  }

  public PcrResult() {
    var status = true;
    if (status == true && $("#pcrresult").val() != "Select") {
      $("#err-pcrresult-ackcovid").hide();
    } else {
      $("#err-pcrresult-ackcovid").show();
      $("#pcrresult").focus();
      status = false;
    }
    return status;
  }

  public EmployeeNameValidation() {
    var status = true;
    if (status == true && $(".Ackemployeename").val() != "") {
      $("#err-Employeename-ackcovid").hide();
    } else {
      $("#err-Employeename-ackcovid").show();
      $(".Ackemployeename").focus();
      status = false;
    }
    return status;
  }
  public dynamichrnamevalidation() {
    var status = true;
    if (status == true && $("#hr-name-listdata").val() != "") {
      $("#err-hr-name").hide();
    } else {
      $("#err-hr-name").show();
      $("#hr-name-listdata").focus();
      status = false;
    }
    return status;
  }

  public listhrnamevalidation() {
    var status = true;
    if (status == true && $("#hr-name-dynamic").val() != "") {
      $("#err-hr-name").hide();
    } else {
      $("#err-hr-name").show();
      $("#hr-name-listdata").focus();
      status = false;
    }
    return status;
  }

  public SaveListItem() {
    if (
      this.EmployeeNameValidation() &&
      this.Emplyeedept() &&
      this.checkbox() &&
      this.Emplyeedeg() &&
      this.PcrDate() &&
      this.PcrResult() &&
      this.EmplyeeNo() &&
      this.checkyesnovalidation2() &&
      this.checkyesnovalidation() &&
      this.pcrvaliddate() &&
      this.covidnegpositivevalidation() &&
      this.Jobtitlecovid() &&
      // this.Countrycodecovide() &&
      // this.Mobilenovalidation() &&
      // this.numberonlycovid() &&
      // this.listhrnamevalidation() &&
      this.tableitemvalidation() &&
      this.tableitemvalidation2() &&
      this.tableitemvalidation3() &&
      //  this.tableitemvalidation4() &&
      this.tableitemvalidation5() &&
      this.tableitemvalidation6() &&
      this.tableitemvalidation7() &&
      //   this.tableitemvalidation8() &&
      this.tableitemvalidation9() &&
      this.tableitemvalidation10() &&
      this.tableitemvalidation11() &&
      //    this.tableitemvalidation12() &&
      this.tableitemvalidation13() &&
      this.tableitemvalidation14() &&
      this.tableitemvalidation15() &&
      //   this.tableitemvalidation16() &&
      this.tableitemvalidation17() &&
      this.tableitemvalidation18() &&
      this.tableitemvalidation19() &&
      //     this.tableitemvalidation20() &&
      this.tablevalidation1() &&
      this.tablevalidation2() &&
      this.tablevalidation3() &&
      this.tablevalidation4() &&
      this.tablevalidation5() &&
      this.tablevalidation6() &&
      // this.tablevalidation7() &&
      // this.tablevalidation8() &&
      // this.tablevalidation9() &&
      // this.tablevalidation10() &&
      // this.tablevalidation11() &&
      // this.tablevalidation12() &&
      this.Attachmentvalidation_for_Covid_Cert()
    ) {

      //   if($(".Yescovidpositive").is(":checked")){
      //  var textquestionone=   $("#textareaone").val()
      //   }else{
      //     textquestionone= "-"
      //   }

      //   if($(".Yescovidpositive").is(":checked")){
      //     var textquestiontwo= $("#textareatwo").val()
      //      }else{
      //       textquestiontwo= "-"
      //      }
      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          newweb.lists
            .getByTitle("Acknowledgement And Policy Declarations Transaction")
            .items.add({
              Title: "ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT",
              Status: "Submitted by employee",
              BusinessUnit: officename,
              UnitLogo: LogoUrl,
              EmployeeName: $(".Ackemployeename").val(),
              EmployeeId:
                $("#Employeeid-ack-covid").val() == ""
                  ? "-"
                  : $("#Employeeid-ack-covid").val(),
              EmployeeDepartment: $("#Employdept-ack-covid").val(),
              EmployeeDesignation: $(".employeedegack").val(),
              DateofJoining: $("#Employdoj-ack-covid").val(),
              Covid_x002d_19positive: $("#textareaone").val(),
              directcontactCovid_x002d_19posit: $("#textareatwo").val(),
              PCRtakendate: $("#pcrdate").val(),
              PCRresult: $("#pcrresult").val(),
              EmployeeNumber: $("#EmployNumber-ack-covid").val(),
              EmployeeJobTitle: $("#Jobtitle-ack-covid").val(),
              ContactNumber: $("#Employcontact-ack-covid").val(),
              Empoyee_x0020_UnitName: $("#Unitname-ack-covid").val(),
              Countrycode: $("#covide-country-codes").val(),
              ONBSessionID: this.state.ONBSessionID,
              HRNAME: $("#hr-name-dynamic").val(),
              Attachmentusername: this.state.CurrentUserName,
              CovidControlNumber: this.state.ControlNumber + "/" + EmployeeVaccinationcontrolno,
              AccommodationControlNo: this.state.ControlNumber + "/" + EmployeeAccommodationcontrolno,
              IDCardcontrolnumber: this.state.ControlNumber + "/" + EmployeeIDCardAcknowledgementcontrolno,
              Handbookcontrolnumber: this.state.ControlNumber + "/" + EmployeeHandbookAcknowledgementcontrolno,
              Giftscontrolno: this.state.ControlNumber + "/" + EmployeeGiftsAcceptancePolicycontrolno,
              CellPhonecontrolNumber: this.state.ControlNumber + "/" + EmployeeUseOfCellPhonecontrolno,
              ITSecuritycontrolno: this.state.ControlNumber + "/" + ITSecurityPolicyAcknowledgementcontrolno,
              ITAcceptablecontrolnumber: this.state.ControlNumber + "/" + ITAcceptableUsagePolicycontrolno,

              covidversionnumber: EmployeeVaccinationVersionno,
              Accommodationversionnumber: EmployeeAccommodationVersionno,
              IDCardversionnumber: EmployeeIDCardAcknowledgementVersionno,
              Handbookversionno: EmployeeHandbookAcknowledgementVersionno,
              Giftsversionnumber: EmployeeGiftsAcceptancePolicyVersionno,
              CellPhoneversionnumber: EmployeeUseOfCellPhoneVersionno,
              ITSecurityversionnumber: ITSecurityPolicyAcknowledgementVersionno,
              ITAcceptableversionnumber: ITAcceptableUsagePolicyVersionno,
            })
            .then((results: any) => {
              //(results.data.ID);
              newweb.lists
                .getByTitle("Onboarding Transaction Master")
                .items.filter(
                  "ONBSessionID eq '" +
                  this.state.ONBSessionID +
                  "' and Title eq 'ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT'"
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
                    this.Savetableitem(results.data.ID);
                    this.CovidCertificateSave();
                  }
                })
                .then(() => {
                  setTimeout(() => {
                    swal({
                      title: "The Form has been submitted successfully",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    } as any).then(async () => {
                      location.reload();
                    });
                  }, 2000);
                });
            });
        }
      });
    }
  }

  public Savetableitem(listID) {
    if (
      this.tablevalidation1() &&
      this.tablevalidation2() &&
      this.tablevalidation3() &&
      this.tablevalidation4() &&
      this.tablevalidation5() &&
      this.tablevalidation6()
      // this.tablevalidation7() &&
      // this.tablevalidation8() &&
      // this.tablevalidation9() &&
      // this.tablevalidation10() &&
      // this.tablevalidation11() &&
      // this.tablevalidation12()
    ) {
      newweb.lists
        .getByTitle("Covid Vaccination")
        .items.add({
          Title: "ACKNOWLEDGMENT POLICY AND DECLEARATION",
          Status: "Submitted by employee",
          BussinessUnit: officename,
          AcknowledgementItmeId: listID,
          FirstDoseName:
            $("#FirstDose-name").val() == "" ? "-" : $("#FirstDose-name").val(),
          SecondDoseName:
            $("#SecondDose-name").val() == ""
              ? "-"
              : $("#SecondDose-name").val(),
          BoosterDoseName:
            $("#BoosterDose-name").val() == ""
              ? "-"
              : $("#BoosterDose-name").val(),
          SecondBoosterDoseName:
            $("#SecondBoosterDose-name").val() == ""
              ? "-"
              : $("#SecondBoosterDose-name").val(),

          FirstPlace:
            $("#FirstDose-place").val() == ""
              ? "-"
              : $("#FirstDose-place").val(),
          SecondPlace:
            $("#SecondDose-place").val() == ""
              ? "-"
              : $("#SecondDose-place").val(),
          FirstboosterPlace:
            $("#BoosterDose-place").val() == ""
              ? "-"
              : $("#BoosterDose-place").val(),
          SecondBoosterPlace:
            $("#SecondBoosterDose-place").val() == ""
              ? "-"
              : $("#SecondBoosterDose-place").val(),

          FirstDate: $("#FirstDose-date").val(),
          SecondDate: $("#SecondDose-date").val(),
          FirstBoosterDate: $("#BoosterDose-date").val(),
          SecondboosterDate: $("#SecondBoosterDose-date").val(),
          ONBSessionID: this.state.ONBSessionID,
        })
        .then((results: any) => { });

      newweb.lists
        .getByTitle("Employee Vaccination")
        .items.add({
          Title: "ACKNOWLEDGMENT POLICY AND DECLEARATION",
          Status: "Submitted by employee",
          Bussiness_x0020_Unit: officename,
          AcknowledgementItmeId: listID,
          ChickenPoxVaccinated: $("#chiekbpox-name").val(),
          Hepatitis_x002d_BVaccinated: $("#Hepatitis-name").val(),
          MMRVaccinated: $("#MMR-name").val(),
          InfluenzaVaccinated: $("#Influenza-name").val(),
          MeningococcalMicrobiologyStaffVa: $("#Meningococcal-name").val(),

          ChikenpoxVaccinatedDate: $("#chiekbpox-date").val(),
          HepatitisBVaccinatedDate: $("#Hepatitis-date").val(),
          MMRVaccinatedDate: $("#MMR-date").val(),
          InfluenzaVaccinatedDate: $("#Influenza-date").val(),
          MeningococcalVaccinatedDate: $("#Meningococcal-date").val(),

          ChikenpoxDescription:
            $("#chiekbpox-exposed").val() == ""
              ? "-"
              : $("#chiekbpox-exposed").val(),
          HepatitisBDescription:
            $("#Hepatitis-exposed").val() == ""
              ? "-"
              : $("#Hepatitis-exposed").val(),
          MMRDescription:
            $("#MMR-exposed").val() == "" ? "-" : $("#MMR-exposed").val(),
          InfluenzaDescription:
            $("#Influenza-exposed").val() == ""
              ? "-"
              : $("#Influenza-exposed").val(),
          MeningococcalDescription:
            $("#Meningococcal-exposed").val() == ""
              ? "-"
              : $("#Meningococcal-exposed").val(),

          InfectionControl1:
            $("#chiekbpox-infaction").val() == ""
              ? "-"
              : $("#chiekbpox-infaction").val(),
          InfectionControl2:
            $("#Hepatitis-infaction").val() == ""
              ? "-"
              : $("#Hepatitis-infaction").val(),
          InfectionControl3:
            $("#MMR-infaction").val() == "" ? "-" : $("#MMR-infaction").val(),
          InfectionControl4:
            $("#Influenza-infaction").val() == ""
              ? "-"
              : $("#Influenza-infaction").val(),
          InfectionControl5:
            $("#Meningococcal-infaction").val() == ""
              ? "-"
              : $("#Meningococcal-infaction").val(),
          ONBSessionID: this.state.ONBSessionID,
        })
        .then((results: any) => {
          //(results.data.ID);
        });
      setTimeout(() => {
        swal({
          title: "The Form has been submitted successfully",

          icon: "success",
        }).then(() => {
          // this.dashboard()
          location.reload();
        });
      }, 1700);
    }
  }
  public Getcurrentuser_documentlibrary(curentName) {
    if (GlobalFormOpenedMode == "New") {
      var covid19certificate = [];
      var covidcertificatefinalvalue = [];
      var str = curentName;

      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(
          `Covid Vaccination Certificate/${FullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            covid19certificate.push(files[i]);
            //(files[i]);
          }

          // setTimeout(() => {

          for (var i = 0; i < covid19certificate.length; i++) {
            if (
              covid19certificate[i].ListItemAllFields.Tags == "Covid Vaccination Certificate"

            ) {
              printcovidfilename = files[0].Name;
              covidcertificatefinalvalue.push(covid19certificate[i]);
              covidcertificate =
                covidcertificatefinalvalue[0].ServerRelativeUrl;
              // this.setState({ BankStatement: bankstatement.toString() })
              $("#Attact-covid-cert").hide();
              $(".covid-cert-file-shown").show();
              $(".covid-cert-delete").hide();
            }
          }
          //    }, 2000);
        });
    }
  }
  public async acknowledgemtuserlistcoviddata(ONBSessionID, FormMode) {
    newweb.lists
      .getByTitle("Acknowledgement And Policy Declarations Transaction")
      .items.select(
        "EmployeeId",
        "EmployeeName",
        "Date",
        "EmployeeDepartment",
        "EmployeeDesignation",
        "DateofJoining",
        "Covid_x002d_19positive",
        "directcontactCovid_x002d_19posit",
        "PCRresult",
        "EmployeeNumber",
        "EmployeeJobTitle",
        "SignedDate",
        "ContactNumber",
        "Empoyee_x0020_UnitName",
        "Countrycode",
        "PCRtakendate",
        "HRNAME"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)

      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#EmployeeUnitNameit").val(result[0].BusinessUnit)
          $(".covidtextfield1").prop("disabled", true);
          $(".covidtextfield2").prop("disabled", true);
          $("#hr-name-dynamic").hide();
          $("#hr-name-listdata").show();
          $("#hr-name-listdata").val(result[0].HRNAME);
          $("#dynamiclistusername").show();
          $("#dynamiclistusername").prop("disabled", true);
          $(".dynamiclistusername").show();
          $(".dynamic_name_username").hide();
          $(".dynamic_name_username_emp").hide();
          $(".covidsub_submit").hide();
          $(".covidviewdisable").prop("disabled", true);
          $(".covidviewdisable").prop("disabled", true);
          $(".employeename2").prop("disabled", true);
          $(".employeename3").prop("disabled", true);
          $(".employeename4").prop("disabled", true);
          $(".employeename5").prop("disabled", true);
          $(".employeename6").prop("disabled", true);
          $(".employeename1").prop("disabled", true);
          $(".employeename7").prop("disabled", true);
          $(".employeename8").prop("disabled", true);
          $(".employeename9").prop("disabled", true);
          $(".employeename10").prop("disabled", true);
          $(".employeename11").prop("disabled", true);
          $(".employeename1").prop("disabled", true);
          $(".Employeename_covid_ack_ploicy").val(result[0].EmployeeName);
          $("#pcrdate").val(
            moment(result[0].PCRtakendate).format("YYYY-MM-DD")
          );
          if (result[0].Covid_x002d_19positive != null) {
            $(".covidtextfield1").show();

            $(".Yescovidpositive").prop("checked", true);
          } else {
            $(".nocovidpositive").prop("checked", true);
          }

          if (result[0].directcontactCovid_x002d_19posit != null) {
            $(".covidtextfield2").show();

            $(".Yescovidpositive2").prop("checked", true);
          } else {
            $(".nocovidpositive2").prop("checked", true);
          }
          $("#textareaone").val(result[0].Covid_x002d_19positive);
          $("#textareatwo").val(result[0].directcontactCovid_x002d_19posit);

          // $("#Employeenumber-ack-covid").val(result[0].EmployeeNumber);
          $(".covidviewdisable").prop("disabled", true);
          Covidmainlistid = result[0].ID;
          $("#covide-country-codes").val(result[0].Countrycode);

          $("#covide-country-codes").val(result[0].Countrycode);
          $(".ackcovid_tickimg").show();
          // $(".ackcovidtitle").attr("style", "color:#00A36C");
          // $(".currentdatecovid").val(
          //   moment(result[0].Date).format("YYYY-MM-DD")
          // );
          $(".Ackemployeename").val(result[0].EmployeeName);
          $(".empidcovid").val(result[0].EmployeeId);
          $(".employeedeptcovid").val(result[0].EmployeeDepartment);
          $(".employeedegs").val(result[0].EmployeeDesignation);
          $("#Employdoj-ack-covid").val(result[0].DateofJoining);

          $("#pcrresult").val(result[0].PCRresult);
          $("#EmployNumber-ack-covid").val(result[0].EmployeeNumber);
          $(".job_title_covid").val(result[0].EmployeeJobTitle);
          $("#signeddate").val(
            moment(result[0].SignedDate).format("YYYY-MM-DD")
          );
          $("#Employcontact-ack-covid").val(result[0].ContactNumber);
          $("#Unitname-ack-covid").val(result[0].Empoyee_x0020_UnitName);
        }
      });

    newweb.lists
      .getByTitle("Covid Vaccination")
      .items.select(
        "SecondboosterDate",
        "FirstBoosterDate",
        "SecondDate",
        "FirstDate",
        "SecondBoosterPlace",
        "FirstboosterPlace",
        "SecondPlace",
        "FirstPlace",
        "FirstDoseName",
        "SecondDoseName",
        "BoosterDoseName",
        "SecondBoosterDoseName",

        "ID"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)

      .get()
      .then((response) => {
        if (response.length != 0) {
          Doselistid = response[0].ID;
          $("#FirstDose-name").val(response[0].FirstDoseName);
          $("#SecondDose-name").val(response[0].SecondDoseName);
          $("#BoosterDose-name").val(response[0].BoosterDoseName);
          $("#SecondBoosterDose-name").val(response[0].SecondBoosterDoseName);

          $("#FirstDose-place").val(response[0].FirstPlace);
          $("#SecondDose-place").val(response[0].SecondPlace);
          $("#BoosterDose-place").val(response[0].FirstboosterPlace);
          $("#SecondBoosterDose-place").val(response[0].SecondBoosterPlace);

          $("#FirstDose-date").val(
            moment(response[0].FirstDate).format("YYYY-MM-DD")
          ),
            $("#SecondDose-date").val(
              moment(response[0].SecondDate).format("YYYY-MM-DD")
            ),
            $("#BoosterDose-date").val(
              moment(response[0].FirstBoosterDate).format("YYYY-MM-DD")
            ),
            $("#SecondBoosterDose-date").val(
              moment(response[0].SecondboosterDate).format("YYYY-MM-DD")
            );
        }
      });
    newweb.lists
      .getByTitle("Employee Vaccination")
      .items.select(
        "ChickenPoxVaccinated",
        "Hepatitis_x002d_BVaccinated",
        "MMRVaccinated",
        "InfluenzaVaccinated",
        "MeningococcalMicrobiologyStaffVa",

        "ChikenpoxVaccinatedDate",
        "HepatitisBVaccinatedDate",
        "MMRVaccinatedDate",
        "InfluenzaVaccinatedDate",
        "MeningococcalVaccinatedDate",

        "ChikenpoxDescription",
        "HepatitisBDescription",
        "MMRDescription",
        "InfluenzaDescription",
        "MeningococcalDescription",

        "InfectionControl1",
        "InfectionControl2",
        "InfectionControl3",
        "InfectionControl4",
        "InfectionControl5",

        "ID"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)

      .get()
      .then((res) => {
        //  AcknowledgementItmeId:

        (Doselistid2 = res[0].ID), $("#userupdatecovidbtn").hide();
        $("#covidsub_submit").hide();
        $("#chiekbpox-name").val(res[0].ChickenPoxVaccinated),
          $("#Hepatitis-name").val(res[0].Hepatitis_x002d_BVaccinated),
          $("#MMR-name").val(res[0].MMRVaccinated),
          $("#Influenza-name").val(res[0].InfluenzaVaccinated),
          $("#Meningococcal-name").val(res[0].MeningococcalMicrobiologyStaffVa),
          $("#chiekbpox-date").val(
            moment(res[0].ChikenpoxVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Hepatitis-date").val(
            moment(res[0].HepatitisBVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#MMR-date").val(
            moment(res[0].MMRVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Influenza-date").val(
            moment(res[0].InfluenzaVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#Meningococcal-date").val(
            moment(res[0].MeningococcalVaccinatedDate).format("YYYY-MM-DD")
          ),
          $("#chiekbpox-exposed").val(res[0].ChikenpoxDescription),
          $("#Hepatitis-exposed").val(res[0].HepatitisBDescription),
          $("#MMR-exposed").val(res[0].MMRDescription),
          $("#Influenza-exposed").val(res[0].InfluenzaDescription),
          $("#Meningococcal-exposed").val(res[0].MeningococcalDescription),
          $("#chiekbpox-infaction").val(res[0].InfectionControl1);
        $("#Hepatitis-infaction").val(res[0].InfectionControl2);
        $("#MMR-infaction").val(res[0].InfectionControl3);
        $("#Influenza-infaction").val(res[0].InfectionControl4);
        $("#Meningococcal-infaction").val(res[0].InfectionControl5);
      });
  }

  public covidtypechecking() {
    $(".Yescovidpositive").on("change", function (event) {
      $(".nocovidpositive").prop("checked", false);
      $(".covidtextfield1").show();
    });

    $(".nocovidpositive").on("change", function (event) {
      $(".Yescovidpositive").prop("checked", false);
      $(".covidtextfield1").hide();
    });

    $(".Yescovidpositive2").on("change", function (event) {
      $(".nocovidpositive2").prop("checked", false);
      $(".covidtextfield2").show();
    });

    $(".nocovidpositive2").on("change", function (event) {
      $(".Yescovidpositive2").prop("checked", false);
      $(".covidtextfield2").hide();
    });
  }
  public async Getcountrycode() {
    var reactHandler = this;

    await newweb.lists
      .getByTitle("Country Information")
      .items.select("CountryName", "CountryCode")
      .orderBy("CountryCode", true)
      .top(5000)
      .get()
      .then((items) => {
        for (var i = 0; i < items.length; i++) { }
        reactHandler.setState({
          phonecode: items,
        });
      });
  }

  public async GetUnitHrName(ofcname) {
    await newweb.lists
      .getByTitle("UNIT HR MASTER")
      .items.select("Name/Id", "Name/Title", "Business/Id", "Business/Title")
      .expand("Business", "Name")
      .filter(`Business/Title eq '${ofcname}'`)
      .get()
      .then((items) => {
        // $("#hr-name-dynamic").val(items[0].Name.Title)

      });
  }

  public Attachmentvalidation_for_Covid_Cert() {
    var status = true;
    let myfile = (
      document.querySelector("#Attact-covid-cert") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-covid-cert").hide();
    } else {
      $("#err-covid-cert").show();
      $("#Attact-covid-cert").focus();
      status = false;
    }
    return status;
  }

  public Attachmentvalidation_for_Covid_Cert_update() {
    var status = true;
    let myfile = (
      document.querySelector("#Attact-covid-cert") as HTMLInputElement
    ).files.length;
    if (covidcertificate == "") {
      if (status == true && myfile != 0) {
        $("#err-covid-cert").hide();
      } else {
        $("#err-covid-cert").show();
        $("#Attact-covid-cert").focus();
        status = false;
      }
    }
    return status;
  }

  public deletedocumentlibrary(mod) {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete this",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    } as any).then((willDelete) => {
      if (willDelete) {
        if (mod == "covid-cert") {
          newweb
            .getFileByServerRelativeUrl(covidcertificate)
            .recycle()
            .then(function (data) {
              $("#Attact-covid-cert").show();
              $(".covid-cert-file-shown").hide();

              $(".covid-cert-delete").hide();
              // this.setState({ BankStatement: "" })
              covidcertificate = "";
            });
        }
      }
    });
  }

  public async createfolder(Username) {
    this.Attachbank();
    // var   str="this is the item";
    var str = Username;
    var FullName = str.split(" ").join("");

    const folder = newweb
      .getFolderByServerRelativePath(
        `Covid Vaccination Certificate/${FullName}`
      )
      .select("Exists")
      .get();
    if (!(await folder).Exists) {
      newweb.folders
        .add(`Covid Vaccination Certificate/${FullName}`)
        .then(function (data) {
          //("Folder is created at " + data.data.ServerRelativeUrl);
        })
        .catch(function (data) {
          //(data);
        });
    }
    const fol = subweb.getFolderByServerRelativePath(`Covid Vaccination Certificate HR Update History/${FullName}`)
      .select("Exists").get();
    if (!(await fol).Exists) {
      subweb.folders.add(`Covid Vaccination Certificate HR Update History/${FullName}`)

    }
  }

  public Attachbank() {
    $("#Attact-covid-cert").on("change", function (e) {
      var fileArr2 = [];
      let fileVal13 = (
        document.querySelector("#Attact-covid-cert") as HTMLInputElement
      ).files[0];
      fileArr2.push(fileVal13);
      // for(var i = 0; i < fileArr2.length; i++){
      let fileBloc = $("<span/>", { class: "Attact-covid-cert-block" }),
        fileName = $("<span/>", {
          class: "Attact-covid-certname",
          text: fileArr2[0].name,
        });
      fileBloc
        .append(
          '<span class="file-covid-cert"><span class="Attact-covid-certcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Attact-filename-covid-cert").append(fileBloc);
      $("#Attact-covid-cert").hide();

      // };
    });
    $("#covid19-certification").on(
      "click",
      ".Attact-covid-certcross",
      function (event) {
        //("hi");
        $("#Attact-covid-cert").show();
        $(".Attact-covid-cert-block").remove();
        $("#Attact-covid-cert").val("");
      }
    );
  }
  public Getfolderiteditwmode(curentName) {
    if (GlobalFormOpenedMode == "Edit") {
      var covidcertificatestr = [];
      var covidcertificatefinalvalue = [];
      var str = curentName;

      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(
          `Covid Vaccination Certificate/${FullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            covidcertificatestr.push(files[i]);
          }

          for (var i = 0; i < covidcertificatestr.length; i++) {
            if (covidcertificatestr[i].ListItemAllFields.Tags == "Covid Vaccination Certificate"
              && covidcertificatestr[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue
            ) {
              covidcertificatefinalvalue.push(covidcertificatestr[i]);
              covidcertificate =
                covidcertificatefinalvalue[0].ServerRelativeUrl;
              // this.setState({ BankStatement: bankstatement })
              $("#Attact-covid-cert").hide();
              $(".covid-cert-file-shown").show();
              $(".covid-cert-delete").show();
            }
          }
        });
    }
  }

  public Getfolderitemviewmode(curentName) {
    if (GlobalFormOpenedMode == "View") {
      var covid19certificate = [];
      var covidcertificatefinalvalue = [];
      var str = curentName;

      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(
          `Covid Vaccination Certificate/${FullName}`
        )
        .files.expand("Name", "ListItemAllFields", "Author")
        .get().then((files) => {
          for (var i = 0; i < files.length; i++) {
            covid19certificate.push(files[i]);
            //(files[i]);
          }

          // setTimeout(() => {

          for (var i = 0; i < covid19certificate.length; i++) {
            if (covid19certificate[i].ListItemAllFields.Tags == "Covid Vaccination Certificate"
              && covid19certificate[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {

              printcovidfilename = files[0].Name;
              covidcertificatefinalvalue.push(covid19certificate[i]);
              covidcertificate = covidcertificatefinalvalue[0].ServerRelativeUrl;
              // this.setState({ BankStatement: bankstatement.toString() })
              $("#Attact-covid-cert").hide();
              $(".covid-cert-file-shown").show();
              $(".covid-cert-delete").hide();
            }
          }
          //    }, 2000);
        });
    }
  }
  public async CovidCertificateSave() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-covid-cert") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-covid-cert") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Covid Vaccination Certificate";
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
            `/Covid Vaccination Certificate/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: this.state.ONBSessionID,
                  Tags: "Covid Vaccination Certificate",
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
  public async CovidCertificateUpdate() {
    var str = AttachmentName;

    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-covid-cert") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-covid-cert") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Covid Vaccination Certificate";
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
            `/Covid Vaccination Certificate/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: EditSessionid,
                  Tags: "Covid Vaccination Certificate",
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

  public Printthis() {
    let printContents = document.getElementById(
      "dashboard_right-print-ack-general"
    ).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
    document.body.innerHTML = originalContents;
  }

  public render(): React.ReactElement<IHrOnboardingFormProps> {
    var handler = this;

    const Countrycodesitem: JSX.Element[] = this.state.phonecode.map(function (
      item,
      key
    ) {
      // //(item);
      return (
        <option value={item.CountryCode + "-" + item.CountryName}>
          {item.CountryCode}-{item.CountryName}
        </option>
      );
    });
    const Gdesc: JSX.Element[] = this.state.Gdescription.map(function (
      gitem,
      gkey
    ) {
      return <li>{gitem}</li>;
    });

    const InternetUsagess: JSX.Element[] = this.state.InternetUsages.map(
      function (InternetUsages, gkey) {
        return <li>{InternetUsages}</li>;
      }
    );

    const EmailUsesss: JSX.Element[] = this.state.EmailUsess.map(function (
      EmailUsess,
      gkey
    ) {
      return <li>{EmailUsess}</li>;
    });
    const DesktopLaptopusagess: JSX.Element[] =
      this.state.DesktopLaptopusages.map(function (DesktopLaptopusages, gkey) {
        return <li>{DesktopLaptopusages}</li>;
      });
    const Antivirusss: JSX.Element[] = this.state.Antiviruss.map(function (
      Antiviruss,
      gkey
    ) {
      return <li>{Antiviruss}</li>;
    });
    const RemovableMediass: JSX.Element[] = this.state.RemovableMedias.map(
      function (RemovableMedias, gkey) {
        return <li>{RemovableMedias}</li>;
      }
    );
    const ClearDeskss: JSX.Element[] = this.state.ClearDesks.map(function (
      ClearDesks,
      gkey
    ) {
      return <li>{ClearDesks}</li>;
    });
    const AccessControlss: JSX.Element[] = this.state.AccessControls.map(
      function (AccessControls, gkey) {
        return <li>{AccessControls}</li>;
      }
    );
    const PasswordsUsagess: JSX.Element[] = this.state.PasswordsUsages.map(
      function (PasswordsUsages, gkey) {
        return <li>{PasswordsUsages}</li>;
      }
    );
    const PhysicalSecurityss: JSX.Element[] = this.state.PhysicalSecuritys.map(
      function (PhysicalSecuritys, gkey) {
        return <li>{PhysicalSecuritys}</li>;
      }
    );
    const EquipmentHandles: JSX.Element[] = this.state.EquipmentHandles.map(
      function (EquipmentHandles, gkey) {
        // //(EquipmentHandles);
        return <li>{EquipmentHandles}</li>;
      }
    );
    const usesConfidentialInformations: JSX.Element[] =
      this.state.ConfidentialInformations.map(function (
        ConfidentialInformations,
        gkey
      ) {
        return <li>{ConfidentialInformations}</li>;
      });
    const InformationSecurityManagements: JSX.Element[] =
      this.state.InformationSecurityManagements.map(function (
        InformationSecurityManagements,
        gkey
      ) {
        return <li>{InformationSecurityManagements}</li>;
      });

    return (
      <>
        <div className="all-item">
          <div className="dashboard_right_heading">
            {handler.state.Dynamiclogo &&
              GlobalFormOpenedMode == "New" &&
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

            {GlobalFormOpenedMode != "New" && (
              <LogoMaster description={""} siteurl={this.props.siteurl} />
            )}

            <span>
              {" "}
              Employee policy Acknowledgement & Declarations - General & It
            </span>
          </div>

          <div className="dashboard_right_ffamily ackndpd_generel_iT">
            <div className="policy_ack_declaration_top policy_ack_clinical_part personal_info_part">
              <p>
                Below is the list of policies that the employee is expected to
                Acknowledge and update their details on required fields.
              </p>

              <ul>
                <li> a.) Employee Vaccination Declaration </li>

                <li> b.) Employee Accommodation Guidelines </li>

                <li> c.) Employee ID Card Acknowledgement </li>

                <li> d.) Employee Handbook Acknowledgement </li>

                <li> e.) Employee Gifts Acceptance Policy </li>

                <li>
                  {" "}
                  f.) Employee Use Of Cell Phone And Personal Gadgets At
                  Workplace Policy.
                </li>
                <li>
                  g.) Disciplinary Procedure
                </li>
                <li> h.) IT Security Policy - Acknowledgement </li>

                <li> i.) IT Acceptable Usage Policy – Acknowledgement </li>
                {/* <li>j.) Employee Confidentiality Statement </li> */}
              </ul>
            </div>
            <div className="emp_policy_ack_div">
              <h3>a.) Employee Vaccination Declaration </h3>

              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="currentuser_name form-control Ackemployeename covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>

                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename1 Employeename_covid_ack_ploicy empallnameemp covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employeeid-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable ackemployeeid empidcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation err-Employeeid-ackcovidvalid"
                    id="err-Employeeid-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employdept-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable employeedeptack employeedeptcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Department <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation err-Employeedept-ackcovidvalid"
                    id="err-Employeedept-ackcovid"
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
                      id="EmployDesignation-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable employeedegack employeedegs covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Designation <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-EmployeeDesignation-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="date"
                      id="Employdoj-ack-covid"
                      className="form-control covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Date of Joining
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeedoj-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    {" "}
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <div className="emp-ack-Vaccinationtable table_vaccine table-responsive">
                <table className="tableform">
                  <thead>
                    <tr>
                      <th className="name_vaccine_th">
                        Name of the Vaccine <i className="required">*</i>
                      </th>
                      <th>
                        {" "}
                        Vaccinated (Yes/No) <i className="required">*</i>
                      </th>
                      <th className="vaccine_date_th">
                        If yes, When <i className="required">*</i>
                      </th>
                      <th>
                        Exposed (If Yes) <i className="required">*</i>
                      </th>
                      <th>
                        Recommendation (Infection Control){" "}
                        {/* <i className="required">*</i> */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="name_vaccine_th">Chicken Pox </td>
                      <td>
                        {/* <input
                        type="text"
                        className="chikenpox_name covidviewdisable"
                        id="chiekbpox-name"
                        autoComplete="off"
                      /> */}
                        <select
                          className="form-control chikenpox_name covidviewdisable"
                          id="chiekbpox-name"
                        >
                          <option value="Select" selected>
                            Select
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span
                          className="error-validation error-table-validation err_chikenpox_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="vaccine_date_th">
                        <input
                          type="date"
                          className="chikenpox_two covidviewdisable"
                          id="chiekbpox-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_chiekbpox_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="chikenpox_three covidviewdisable"
                          id="chiekbpox-exposed"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_chiekbpox_exposed"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="chikenpox_four covidviewdisable"
                          id="chiekbpox-infaction"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_chiekbpox_infaction"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="name_vaccine_th">Hepatitis B </td>
                      <td>
                        {/* <input
                        type="text"
                        className="Hepatitis_name covidviewdisable"
                        id="Hepatitis-name"
                        autoComplete="off"
                      /> */}
                        <select
                          className="form-control Hepatitis_name covidviewdisable"
                          id="Hepatitis-name"
                        >
                          <option value="Select" selected>
                            Select
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span
                          className="error-validation error-table-validation err_Hepatitis_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="vaccine_date_th">
                        <input
                          type="date"
                          className="Hepatitis_date covidviewdisable"
                          id="Hepatitis-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_Hepatitis_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Hepatitis_three covidviewdisable"
                          id="Hepatitis-exposed"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Hepatitis_exposed"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Hepatitis_four covidviewdisable"
                          id="Hepatitis-infaction"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Hepatitis_infaction"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="name_vaccine_th">MMR</td>
                      <td>
                        {/* <input
                        type="text"
                        className="MMR_name covidviewdisable"
                        id="MMR-name"
                        autoComplete="off"
                      /> */}
                        <select
                          className="form-control MMR_name covidviewdisable"
                          id="MMR-name"
                        >
                          <option value="Select" selected>
                            Select
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span
                          className="error-validation error-table-validation err_MMR_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="vaccine_date_th">
                        <input
                          type="date"
                          className="MMR_date covidviewdisable"
                          id="MMR-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_MMR_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="MMR_exposed covidviewdisable"
                          id="MMR-exposed"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_MMR_exposed"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="MMR_infaction covidviewdisable"
                          id="MMR-infaction"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_MMR_infaction"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="name_vaccine_th">Influenza </td>
                      <td>
                        {/* <input
                        type="text"
                        className="Influenza_name covidviewdisable"
                        id="Influenza-name"
                        autoComplete="off"
                      /> */}
                        <select
                          className="form-control Influenza_name covidviewdisable"
                          id="Influenza-name"
                        >
                          <option value="Select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span
                          className="error-validation error-table-validation err_Influenza_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="vaccine_date_th">
                        <input
                          type="date"
                          className="Influenza_date covidviewdisable"
                          id="Influenza-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_Influenza_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Influenza_exposed covidviewdisable"
                          id="Influenza-exposed"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Influenza_exposed"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Influenza_infaction covidviewdisable"
                          id="Influenza-infaction"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Influenza_infaction"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="name_vaccine_th">
                        Meningococcal (Microbiology Staff){" "}
                      </td>
                      <td>
                        {/* <input
                        type="text"
                        className="Meningococcal_name covidviewdisable"
                        id="Meningococcal-name"
                        autoComplete="off"
                      /> */}
                        <select
                          className="form-control Meningococcal_name covidviewdisable"
                          id="Meningococcal-name"
                        >
                          <option value="Select" selected>
                            Select
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span
                          className="error-validation error-table-validation err_Meningococcal_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="vaccine_date_th">
                        <input
                          type="date"
                          className="Meningococcal_date covidviewdisable"
                          id="Meningococcal-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_Meningococcal_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Meningococcal_exposed covidviewdisable"
                          id="Meningococcal-exposed"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Meningococcal_exposed"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="Meningococcal_infaction covidviewdisable"
                          id="Meningococcal-infaction"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_Meningococcal_infaction"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="emp-ack-Vaccinationtable table_dose table-responsive">
                <h4>
                  Covid-19 Vaccination <i className="required">*</i>
                </h4>
                <table className="tableform2">
                  {/* <thead className="emp-ack-thread">
                <tr>
                  <th>Covid-19 vaccination</th>
                </tr>
              </thead> */}
                  <thead>
                    <tr>
                      <th>Number Of Doses </th>
                      <th>Name </th>
                      <th>Place </th>
                      <th className="empl_genereal_it_th">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>First Dose </td>

                      <td>
                        <input
                          type="text"
                          className="FirstDose_name covidviewdisable"
                          id="FirstDose-name"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_FirstDose_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="FirstDose_place covidviewdisable"
                          id="FirstDose-place"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_FirstDose_place"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="empl_genereal_it_th">
                        <input
                          type="date"
                          className="FirstDose_date covidviewdisable"
                          id="FirstDose-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_FirstDose_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Second Dose </td>

                      <td>
                        <input
                          type="text"
                          className="SecondDose_name covidviewdisable"
                          id="SecondDose-name"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation  error-table-validation err_SecondDose_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="SecondDose_place covidviewdisable"
                          id="SecondDose-place"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_SecondDose_place"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="empl_genereal_it_th">
                        <input
                          type="date"
                          className="SecondDose_date covidviewdisable"
                          id="SecondDose-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation  error-table-validation err_SecondDose_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Booster Dose </td>
                      <td>
                        <input
                          type="text"
                          className="BoosterDose_name covidviewdisable"
                          id="BoosterDose-name"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_BoosterDose_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="BoosterDose_place covidviewdisable"
                          id="BoosterDose-place"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_BoosterDose_place"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="empl_genereal_it_th">
                        <input
                          type="date"
                          className="BoosterDose_date covidviewdisable"
                          id="BoosterDose-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_BoosterDose_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Second Booster Dose </td>
                      <td>
                        <input
                          type="text"
                          className="SecondBoosterDose_name covidviewdisable"
                          id="SecondBoosterDose-name"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation  error-table-validation err_SecondBoosterDose_name"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="SecondBoosterDose_place covidviewdisable"
                          id="SecondBoosterDose-place"
                          autoComplete="off"
                        />
                        <span
                          className="error-validation error-table-validation err_SecondBoosterDose_place"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                      <td className="empl_genereal_it_th">
                        <input
                          type="date"
                          className="SecondBoosterDose_date covidviewdisable"
                          id="SecondBoosterDose-date"
                          autoComplete="off"
                          max={moment().format("YYYY-MM-DD")}
                        />
                        <span
                          className="error-validation error-table-validation err_SecondBoosterDose_date"
                          style={{ color: "red", display: "none" }}
                        >
                          {" "}
                          This field is mandatory.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="personal_info_p">
                Please attach your covid vaccination certificate{" "}
                <i className="required">*</i>
              </p>
              <div id="covid19-certification" className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="file"
                      id="Attact-covid-cert"
                      className="form-control"
                      autoComplete="off"
                    ></input>
                  </div>
                  <span
                    className="error-validation error-table-validation"
                    id="err-covid-cert"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                  <span id="Attact-filename-covid-cert"></span>
                  <a
                    data-interception="off"
                    href={`${covidcertificate}`}
                    // href={`${this.state.BankStatement}`}
                    style={{ display: "none" }}
                    className="covid-cert-file-shown"
                    target="_blank"
                  >
                    click here
                  </a>
                  <span
                    className="covid-cert-delete"
                    style={{ display: "none" }}
                    onClick={() => this.deletedocumentlibrary("covid-cert")}
                  >
                    <img
                      className="delete_document_item"
                      src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg"
                      alt="image"
                    />
                  </span>
                </div>
              </div>

              <div className="covidpositive">
                <p>
                  1. Have you been Covid-19 positive in the last 3 months from
                  the date of signing this form ? <i className="required">*</i>
                  {/* (If yes, please specify the details
            below, Enter “NA” if it's Not Applicable){" "} */}
                </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="Yescovidpositive covidviewdisable"
                          type="checkbox"
                          id="yescovid"
                          name="yescovid"
                          value="Yes"
                        />
                        <span className="form-check-label">Yes</span>
                      </div>
                    </div>

                    <span
                      style={{ color: "red", display: "none" }}
                      className="errone"
                    >
                      Select any one of the checkboxes above
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="nocovidpositive covidviewdisable"
                          type="checkbox"
                          id="NOcovid"
                          name="NOcovid"
                          value="NO"
                        />
                        <span className="form-check-label">NO</span>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  id="textareaone"
                  style={{ display: "none", resize: "none" }}
                  className="covidtextfield1"
                  name="covidpositive"
                  placeholder="Enter text here"
                />
                <span
                  className="errorvalidation"
                  id="err-textareaone-ackcovid"
                  style={{ color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span>

                <p className="covid-adjust">
                  2. Have you been in direct contact with any Covid-19 positive
                  case in the last 3 months from the date of signing this form ?{" "}
                  <i className="required">*</i>
                </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="Yescovidpositive2 covidviewdisable"
                          type="checkbox"
                          id="yescovid2"
                          name="yescovid2"
                          value="Yes"
                        />
                        <span className="form-check-label">Yes</span>
                      </div>
                    </div>
                    <span
                      style={{ color: "red", display: "none" }}
                      className="errtwo"
                    >
                      Select any one of the checkboxes above
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <div className="form-check">
                        <input
                          className="nocovidpositive2 covidviewdisable"
                          type="checkbox"
                          id="NOcovid2"
                          name="NOcovid2"
                          value="NO"
                        />
                        <span className="form-check-label">NO</span>
                      </div>
                    </div>
                  </div>
                </div>

                <textarea
                  style={{ display: "none", resize: "none" }}
                  id="textareatwo"
                  className="covidtextfield2"
                  name="covidpositive"
                  placeholder="Enter text here"
                />
                <span
                  className="errorvalidation"
                  id="err-textareatwo-ackcovid"
                  style={{ color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span>
              </div>
              <div className="emp-ack_kindly">
                <p className="details_para">
                  3.Kindly mention details of your Last PCR taken
                </p>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="pcrdate"
                        className="pcr_date covidviewdisable"
                        autoComplete="off"
                        max={moment().format("YYYY-MM-DD")}
                      />
                      <span className="floating-label">
                        Last PCR taken date <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="pcrdate-err"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="pcrresult"
                        className="pcrresult form-control covidviewdisable"
                      >
                        <option value="Select">Select</option>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                      </select>
                      <span className="floating-label">
                        PCR result (positive/ negative){" "}
                        <i className="required">*</i>{" "}
                      </span>
                      <span
                        className="error-validation"
                        id="err-pcrresult-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                  </div>
                </div>

                <p className="details_para">
                  I hereby declare that all the details furnished above are
                  correct. Prior to my joining date at the company, if I get
                  Covid-19 positive or exposed to a positive Covid-19 case, I
                  would be keeping the management / HR department informed.{" "}
                </p>
              </div>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="currentuser_name common_fullname-dept-id-deg-disable form-control covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename2 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                {/* <div className="col-md-4">
              <div className="form-group relative">
                <input
                  type="date"
                  id="currentdate-ack-covid"
                  className="form-control currentdateack currentdatecovid covidviewdisable"
                  autoComplete="off"
                  disabled
                />
                <span className="floating-label date_floating_label">
                  Date<i className="required">*</i>
                </span>
              </div>
              <span
                className="error-validation"
                id="err-currentdate-ackcovid"
                style={{ color: "red", display: "none" }}
              >
                This field is mandatory.
              </span>
            </div> */}
                <div className="col-md-4 signature_part">
                  <p>Signature</p>
                </div>
                <div className="col-md-4 signature_part">
                  <p> Date</p>
                </div>
              </div>
            </div>
            <div className="emp_policy_ack_div">
              <h3>b.) Employee Accommodation Guidelines</h3>
              <p>
                1. Employees staying at the company accommodation are advised to
                keep it clean and to the best of hygiene conditions. This is
                directly linked to the health and safety of occupants.
                HR/Facility management will be performing surprise audits at the
                accommodation and any deviations will lead to disciplinary
                actions on concerned occupants.
              </p>

              <p>
                2. Occupants may come from diverse backgrounds and are advised
                to live at company accommodation with peace and harmony and
                respect for each other. Any events of misbehavior, a quarrel
                between occupants, or outsiders will lead to strict action
                against the concerned person.{" "}
              </p>

              <p>
                3. Garbage or any other wastes should be disposed of properly
                and should not be thrown out of the window or in the corridor.
                Disposal of food wastes shall be strictly practiced on daily
                basis.{" "}
              </p>

              <p>
                4. Alcohol consumption and smoking are strictly prohibited
                inside the accommodation premises.{" "}
              </p>
              <p>
                5. Any problem regarding the maintenance work should be reported
                to the concerned Facility Supervisor. {" "}
              </p>
              <p>
                6. Occupants are advised not to keep valuables in the company
                accommodation, and they will be responsible for the safety of
                valuable items if kept in the rooms.{" "}
              </p>

              <p>
                7. No friends, relatives or colleagues should be entertained
                inside the accommodation and no males will be allowed in the
                ladies’ accommodation as well as no females allowed in the male
                accommodation.{" "}
              </p>
              <p>
                8. Observe strictly to put off your TV before 11pm to avoid
                disturbances to other inmates staying with you as well as in the
                nearby room.{" "}
              </p>
              <p>
                {" "}
                9. Occupants are advised to keep noise levels to a minimum which
                should not affect the neighbors.{" "}
              </p>

              <p>
                10. Employees are requested to adhere to the decent dress code
                in the accommodation.{" "}
              </p>
              <p>
                11. Please see that the paint of the accommodation walls is not
                damaged, due to the inserting of nails, sticking posters, etc.
                staff will be penalized if they do not follow the protocol.{" "}
              </p>
              <p>
                {" "}
                12. A cleaning Rota may also be useful to ensure everyone
                participates in maintaining cleanliness and hygiene in the
                apartment.{" "}
              </p>

              <p>
                13. Occupants are advised to use utilities (Water, Electricity)
                responsibly and over-utilization above the defined slabs will be
                penalized and the additional amount to be deducted from the
                occupants of the respective flats. Slab will be available with
                the facilities department Also, any gas Utilized should be borne by the employee.{" "}
              </p>
              <p>
                14. You are requested to return to the accommodation not later
                than 11.45pm in the evenings other than for any work-related
                reasons/exceptional situations. The Security on duty is
                empowered to stop you from entering the accommodation after 12am
                midnight.{" "}
              </p>
              <p>
                {" "}
                15. Building Security on duty is responsible for the facility
                needs and will represent the Facility Department officially
              </p>

              <p>
                {" "}
                16. All personal belongings shall be kept in the allocated
                cupboard/space provided, and avoid discomfort to other inmates,
                by filling the common areas with personal belongings
              </p>
              <p>
                17. You are not supposed to remove the company-provided
                furniture’s/electronic items from the accommodation.{" "}
              </p>
              <p>
                18. The Furniture, Shelf, etc. allotted to each employee has to
                be properly maintained and if anything is found damaged, the
                concerned person will have to bear the cost for
                repair/replacement.{" "}
              </p>

              <div>
                <h4>Note: </h4>
                <p>
                  1. All the inmates staying in company accommodation has to
                  adhere to the instructions of the facility Team and employee
                  has the full right to report to the HR Department if the
                  grievances are not resolved through the facility team.
                  Escalations can be made to Corporate HR if the issues are not
                  addressed by HR.
                </p>
                <p>
                  2. Violations of the above instructions may result in
                  immediate notice to vacate from the company accommodation.
                </p>
              </div>

              <div>
                <h4>Acknowledgment</h4>
                <p>
                  I have received, read, and understood the Accommodation Policy
                  and I hereby confirm that I will abide by the above policy.{" "}
                </p>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control  common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename3 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employeeid-ack-covid1"
                      className="form-control common_fullname-dept-id-deg-disable empidcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeeid-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                {/* <div className="col-md-4">
              <div className="form-group relative">
                <input
                  type="date"
                  id="currentdate-ack-covid2"
                  className="form-control currentdatecovid covidviewdisable"
                  autoComplete="off"
                  disabled
                />
                <span className="floating-label date_floating_label">
                  Date<i className="required">*</i>
                </span>
              </div>
              <span
                className="error-validation"
                id="err-currentdate-ackcovid"
                style={{ color: "red", display: "none" }}
              >
                This field is mandatory.
              </span>
            </div> */}{" "}
                <div className="col-md-4">
                  <div id="emp-uniname-covid" className="form-group relative">
                    <input
                      type="text"
                      id="Unitname-ack-covid"
                      className="form-control currentuer_unitname covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Unit Name<i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    id="dynamicemp-uniname-covid"
                    className="form-group relative"
                  >
                    <input
                      type="text"
                      id="Unitname-ackcoviddynamic"
                      className="form-control covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Unit Name<i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Unitname-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>
              <div className="row form">
                <div className="col-md-4 signature_part">
                  <p>Employee Signature</p>
                </div>
                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
              </div>
              <div className="ack_home">
                <p className="ack_home_place">
                  It is our collective responsibility to support each other and
                  make this place a “home away from home”.{" "}
                </p>

                <p className="ack_home_happy"> Think Happy & Stay Happy </p>
              </div>
            </div>

            <div className="emp_policy_ack_div">
              <h3>c.) Employee ID Card Acknowledgement </h3>
              <p>
                I hereby acknowledge the receipt of personnel I.D. card from the
                Human Resources Department of{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {dynamicUnitnamecovid}
                </span>
                , Abu Dhabi. I accept that this card remains the property of{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {" "}
                  {dynamicUnitnamecovid}
                </span>{" "}
                and will be surrendered upon my resignation or termination of
                employment.
              </p>
              <p>
                I also accept that I am responsible for the safety of this card
                and should it be damaged or lost, a fee will be imposed for its
                replacement.{" "}
              </p>
              <p>
                I agree to abide by the policy of{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {" "}
                  {dynamicUnitnamecovid}
                </span>{" "}
                that the ID card must be worn at all times while on duty.{" "}
              </p>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename4 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employeeid-ack-covid2"
                      className="form-control common_fullname-dept-id-deg-disable empidcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeeid-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4 signature_part">
                  <p> Employee Signature </p>
                </div>
              </div>

              <div className="row form signature_part">
                <div className="col-md-4 signature_part">
                  <p> Date </p>
                </div>
              </div>
            </div>

            <div className="emp_policy_ack_div">
              <div>
                <h3>d.) Employee Handbook Acknowledgement</h3>
                <p>
                  I acknowledge that I have received copy of the{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  Employee Handbook.
                </p>

                <p>
                  I agree that, as an employee, it is my responsibility to:{" "}
                </p>
                <ul>
                  <li>Read this handbook.</li>
                  <li>
                    Ask questions of my supervisor if I need additional
                    information regarding items covered in the handbook.
                  </li>
                  <li>
                    Abide by and observe the policies and procedures of{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    which are generally explained in this handbook.{" "}
                  </li>
                </ul>
              </div>
              <p>
                I understand that I am subject to{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {" "}
                  {dynamicUnitnamecovid}
                </span>{" "}
                policies and procedures, even those not outlined in this
                handbook. I also understand that{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {" "}
                  {dynamicUnitnamecovid}
                </span>{" "}
                may periodically change policies and procedures and that I will
                be responsible to abide by and observe such changes. Finally, I
                acknowledge that this Employee Handbook is neither a contract of
                employment nor a legal document.{" "}
              </p>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename5 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Jobtitle-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable   job_title_covid covidviewdisable"
                      autoComplete="off"
                    />
                    <span className="floating-label date_floating_label">
                      Job Title <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Jobtitle-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employdept-ack-covid2"
                      className="form-control common_fullname-dept-id-deg-disable employeedeptcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Department <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeedept-ackcovid"
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
                      id="Employeeid-ack-covid5"
                      className="form-control common_fullname-dept-id-deg-disable empidcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-EmployeeNumber-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                {/* <div className="col-md-4">
              <div className="form-group relative">
                <input
                  type="date"
                  id="signeddate"
                  className="form-control covidviewdisable"
                  autoComplete="off"
                  disabled
                />
                <span className="floating-label date_floating_label">
                  Signed Date<i className="required">*</i>
                </span>
              </div>
              <span
                className="error-validation"
                id="err-currentdate-ackcovid"
                style={{ color: "red", display: "none" }}
              >
                This field is mandatory.
              </span>
            </div> */}
                <div className="col-md-4 signature_part">
                  <p>Signature</p>
                </div>
                <div className="col-md-4 signature_part">
                  <p>Signed Date</p>
                </div>
              </div>
            </div>

            <div className="emp_policy_ack_div">
              <h3>e.) Employee Gifts Acceptance Policy</h3>
              <h4>1. Purpose</h4>
              <p>
                This policy is designed to provide guidelines around the
                acceptance of gifts during employment at{" "}
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {dynamicUnitnamecovid}
                </span>
                .{" "}
              </p>
              <h4>2. Policy Statement</h4>
              <h5 className="sub_section-ploicy">2.1 Gifts or “Kickbacks”</h5>
              <p>
                {" "}
                2.1.1 Employees are not permitted to accept gifts, vouchers,
                service offers or promises of Payments/commission by suppliers,
                vendors, or others in the course of their employment with
                <span className="Covidform_unitname"> {officename}</span>
                <span
                  style={{ display: "none" }}
                  className="DynamicCovidform_unitname"
                >
                  {dynamicUnitnamecovid}
                </span>
              </p>

              <p>
                2.1.2 The Only exceptions of gifts that may be received are
                baskets or edible items or flowers sent to a group of
                individuals or a department as appreciation for their level of
                service and care.{" "}
              </p>

              <p>
                2.1.3. Should, under exceptional circumstances an employee be
                entrusted to accept a gift, the gift must be declared to the
                manager/HOD and the “Gifts Declaration form” should be completed
                and forwarded to HRD{" "}
              </p>
              <p>
                2.1.4. Employees are strictly forbidden to request any gift or
                financial aid, for himself or others from the clients and
                visitors of the company and its facilities.{" "}
              </p>

              <div>
                <h5 className="sub_section-ploicy">2.2. Gifts Acceptance: </h5>
                <p>
                  2.2.1. Any{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  employee who is given gifts, vouchers, service offers, flight
                  tickets or promised any payment/commission by patients,
                  suppliers, vendors and others, must not accept any such gift,
                  no matter what the monetary value, as it creates the
                  impression of compromised decision-making.{" "}
                </p>

                <p>
                  2.2.2. Gifts given to individuals must be declined politely,
                  explaining the reason for doing so. In case it becomes
                  embarrassing to decline, the same should be submitted to
                  HR/Administration department who in turn will make an entry in
                  the records.{" "}
                </p>

                <p>
                  2.2.3. For employees working in concierge / Valet Parking, any
                  cash received will be collected by the Finance department and
                  will be distributed among the drivers and concierge employees
                  on monthly basis.{" "}
                </p>

                <p>2.2.4. The only exceptions to accepting gifts can be: </p>
                <p className="DI_empgift_li">
                  {" "}
                  <ul>
                    <li>
                      {" "}
                      Promotional merchandize or samples that bears the donor
                      company’s logo, and has no resale value, and which cannot
                      be seen as influencing a deal or decision.{" "}
                    </li>
                    <li>
                      Gifts exchanged internally by{" "}
                      <span className="Covidform_unitname"> {officename}</span>
                      <span
                        style={{ display: "none" }}
                        className="DynamicCovidform_unitname"
                      >
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>{" "}
                      colleagues with one another at special occasions that
                      cannot be seen as creating a culture of favouritism or
                      bias.
                    </li>
                    <li>
                      Gifts given by a group of staff on their own
                      account/accord for Birthdays/ farewells/ anniversaries/
                      marriage etc. to a colleague
                    </li>
                  </ul>
                </p>
                {/* <p>
               Promotional merchandize or samples that bears the donor
              company’s logo, and has no resale value, and which cannot be
              seen as influencing a deal or decision.{" "}
            </p> */}

                {/* <p>
               Gifts exchanged internally by{" "}
              <span className="Covidform_unitname"> {officename}</span>
              <span
                style={{ display: "none" }}
                className="DynamicCovidform_unitname"
              >
                {" "}
                {dynamicUnitnamecovid}
              </span>{" "}
              colleagues with one another at special occasions that cannot be
              seen as creating a culture of favouritism or bias.{" "}
            </p> */}

                {/* <p>
              {" "}
               Gifts given by a group of staff on their own account/accord
              for Birthdays/ farewells/ anniversaries/ marriage etc. to a
              colleague.{" "}
            </p> */}
                <p>
                  2.2.5. If an employee is unsure about how to handle a
                  situation regarding a gift, they should refer to their Line
                  Manager and/or HR Department for guidance.{" "}
                </p>

                <p>
                  2.2.6. Should an employee accept a gift they must declare that
                  they are doing so on behalf of{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  and they must alert their Line Manager of this gift
                  immediately.{" "}
                </p>

                <p>
                  2.2.7. The Employee is strictly forbidden to solicit any gift
                  or financial aid for himself/herself or others from the
                  patients and visitors of{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  and its Facilities as it is damaging the reputation of the
                  Hospital.{" "}
                </p>
                <p>
                  2.2.8. Deliberate violation of this policy forms grounds for
                  Disciplinary Action up to and including termination.{" "}
                </p>

                <div>
                  <h4>Employee Acknowledgment</h4>
                  <div className="emp_ack_parainput">
                    <span>By signing this policy, I</span>
                    <input
                      className="dynamic_name_username_emp common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      type="text"
                      id="currentusername"
                      autoComplete="off"
                      disabled
                    />

                    <input
                      id="dynamiclistusername"
                      style={{ display: "none" }}
                      type="text"
                      className="form-control git_emp_ack common_fullname-dept-id-deg-disable employeename6 Employeename_covid_ack_ploicy dynamiclistusername"
                      autoComplete="off"
                      disabled
                    />

                    <span>
                      , hereby acknowledge understanding of the policy and{" "}
                    </span>
                    <span>
                      acceptance of the policy guidelines and constraints.{" "}
                    </span>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative dynamic_name_username">
                      <input
                        type="text"
                        id="Employeename-ack-covid"
                        className="form-control common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <input
                        type="text"
                        id="Employee_name_ack_ploicy"
                        className="form-control common_fullname-dept-id-deg-disable employeename7 Employeename_covid_ack_ploicy covidviewdisable"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Employeename-ackcovid"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="EmployDesignation-ack-covid1"
                        className="form-control common_fullname-dept-id-deg-disable employeedegs covidviewdisable"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label date_floating_label">
                        Employee Designation <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-deg-ackcovid"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4 signature_part">
                    <p>Employee Signature</p>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4 signature_part">
                    <p>Date</p>
                  </div>

                  <div className="col-md-4 signature_part">
                    <p>HR Signature</p>
                  </div>
                  <div className="col-md-4 signature_part">
                    <p>Date</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="emp_policy_ack_div">
              <h3>
                f.) Employee Use Of Cell Phone And Personal Gadgets At Workplace
                Policy .
              </h3>
              <h4>Purpose</h4>
              <p>
                1.To set the guidelines for the use of personal cell phones and
                other communication devices at work in order to ensure that
                employee performance and productivity is not affected.{" "}
              </p>

              <p>
                {" "}
                2.To ensure that cell phone use while at work is both safe and
                does not disrupt business operations.
              </p>

              <div>
                <h4> Policy Statement </h4>
                <p>
                  1.<span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  prohibits all staff from using personal gadgets in the
                  workplace as a preventive step believed necessary to secure
                  patient/ staff privacy and the Center's confidential
                  information. Personal gadgets include but not limited to
                  laptops, tablets, smartphones, Phones, scanners, printers,
                  cameras etc. Use of these mobile devices can interfere with
                  employee productivity and can be distracting to others.{" "}
                </p>

                <p>
                  2.Staff are not allowed to bring these gadgets to the
                  workplace and if noticed, may be asked to hand it over to the
                  Security Department until the completion of their duty hours.
                  Repeated violation or abuse related to this policy by an
                  employee may result in disciplinary action which may be in the
                  form of Warning, Fine, Suspension or Termination.{" "}
                </p>
                <p>
                  3.With the exception of emergencies and during normal breaks,
                  cell phone usage is prohibited while at the workplace during
                  normal working hours. This includes but is not limited to
                  talking on the cell phone, text messaging, use of social
                  network sites, chatting, playing games on the phone, etc.{" "}
                </p>
                <p>
                  4. Cell phones/sim cards provided for business use are company
                  property and are to be treated as such. Employees are expected
                  to exercise the same discretion in using personal cell phones
                  as is expected for the use of company phones. Company issued
                  cell phones/sim cards are to be used only for business
                  purposes.{" "}
                </p>

                <p>
                  5.Physicians and senior clinical staff who are required to use
                  cell phones at work are excused from this unless found
                  misused.{" "}
                </p>
              </div>
              <div>
                <h4>Scope</h4>
                <p>1. Organization Wide </p>
              </div>
              <div>
                <h4> Target Audience</h4>
                <p>
                  All Staff of{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  including the Outsourced Staff{" "}
                </p>
              </div>
              <div>
                <h4> Responsibilities</h4>
              </div>
              <div>
                <p>
                  1.Head of Department/ Supervisor to ensure that staff are
                  thoroughly oriented and aware of this policy. HODs to make
                  sure that the policy is adhered to and is constantly passed
                  across to all staff during their induction & training period.{" "}
                </p>

                <p>2.Staff are expected to strictly comply with the policy </p>
              </div>

              <div>
                <h4>Procedure</h4>
              </div>

              <div>
                <p>
                  1. Personal phones to be switched to "silent" or "vibrate"
                  once at the workplace.
                </p>

                <p>
                  {" "}
                  2. Cell phones are not to be kept on the counters or in
                  visible areas where it could attract the attention of visitors
                  and distract the attention of the staff. Nurses, technicians,
                  and service assistants are not allowed to carry their phones
                  inside the clinical areas unless permitted or with written
                  exception approved by senior management due to mission
                  requirement.
                </p>

                <p>
                  {" "}
                  3. Use of cell phones during working hours should only be for
                  important calls. Direct family emergencies that must be dealt
                  with immediately such as serious sickness or accidents are
                  classified as important calls. Chatting or texting with
                  friends and family members are not considered as emergencies
                  which can be dealt with in your break time.
                </p>
                <p>
                  4.If there is a necessity to use cell phones for emergency
                  calls at work or during scheduled break periods, employee
                  should refrain from staying at their desk or anywhere among
                  patients and staff.
                </p>
                <p>
                  5. To prevent radio frequency-related emissions interference,
                  all mobile phones are to be switched off in patient care areas
                  with medical equipment.
                </p>
                <p className="epad_cellphone_para">
                  6. The Center expects all cell phone users within the center
                  premise to observe the following cell phone etiquettes
                  <li>No loud conversation </li>
                  <li>No annoying ring tones </li>
                  <li>No profanity </li>
                </p>
              </div>
              <p>
                {" "}
                Use of Cell Phone and Personal Gadgets at Workplace Policy I,
                <input
                  className="dynamic_name_username_emp currentuser_name common_fullname-dept-id-deg-disable  covidviewdisable common_fullname-dept-id-deg-disable"
                  type="text"
                  id="employeename"
                  autoComplete="off"
                  disabled
                />
                <input
                  style={{ display: "none" }}
                  type="text"
                  id="dynamiclistusername"
                  className="form-control git_emp_ack employeename8 Employeename_covid_ack_ploicy dynamiclistusername"
                  autoComplete="off"
                  disabled
                />
                , the undersigned, hereby confirm that I have read and
                understood the information defined in the Use of Cell Phone and
                Personal Gadgets at Workplace Policy and I agree to undertake
                all responsibilities as defined. I also understand that
                breaching the standards of the policy may result in disciplinary
                action up to and including termination and/ or other legal
                recourse.{" "}
              </p>
              <p>
                I understand that this acknowledgment is valid as long as I am
                an employee of the Company{" "}
              </p>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>

                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename9 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>


                <div className="col-md-4 signature_part">
                  <p>Signature</p>
                </div>
                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
              </div>



            </div>
            <div className="emp_policy_ack_div">
              <div className="cross-ref-item">
                <div className="crossreference_top">
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li policy_disciplinary">
                        <h3>g.) Disciplinary procedure</h3>
                        <h4>1. Policy Statement </h4>
                      </li>
                    </ul>
                    <p className="crossreference_paddleft">
                      {" "}
                      It is the intention of the Organization to establish a
                      clear Disciplinary Procedure to be adhered to by Managers
                      and Employees and is consistent with{" "}
                      <span className="emp_policy_ack_bold">
                        <span className="Covidform_unitname">
                          {" "}
                          {officename}
                        </span>
                        <span
                          style={{ display: "none" }}
                          className="DynamicCovidform_unitname"
                        >
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                      </span>
                      Policies and UAE Labor Law.
                    </p>
                  </div>
                  <div>
                    <h4> Purpose</h4>
                    <p className="crossreference_paddleft">
                      {" "}
                      To define guidelines and procedures to ensure a fair and
                      consistent approach in identifying and dealing with issues
                      requiring disciplinary action.{" "}
                    </p>
                  </div>
                  <div>
                    <h4> Scope </h4>
                    <p className="crossreference_paddleft">
                      {" "}
                      The procedures set out in this document are designed to
                      deal with misconduct or indiscipline, or allegations
                      thereof. The policy applies to all employees and
                      third-party contractors/outsourced staff. The procedures
                      do not apply to matters relating to an employee’s
                      professional competence which is dealt through the
                      Performance Improvement Process. The objective of the
                      procedures is to encourage improvement in the conduct of
                      an individual employee and should not be viewed primarily
                      as a means of imposing sanctions. It is important that an
                      employee must always be informed of any disciplinary
                      action taken and the reasons for it.{" "}
                    </p>
                  </div>
                  <div>
                    <h4> Definitions</h4>
                    <p className="crossreference_paddleft"> None </p>
                  </div>
                  <div>
                    <h4> Acronyms Used</h4>
                    <div className="crossreference_paddleft">
                      <ul>
                        <li className="acr_used_li">
                          <p className="acr_usedceo"> CEO </p>
                          <p> - Chief Executive Officer </p>
                        </li>
                        <li className="acr_used_li">
                          <p className="acr_usedhr"> HR </p>
                          <p> - Human Resources </p>
                        </li>
                        <li className="acr_used_li">
                          <p className="acr_usedhod"> HOD </p>
                          <p> - Head of Department </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4> Responsibilities</h4>
                    <ul className="epad_responsibilties_ul crossreference_paddleft">
                      <li className="epad_responsibilties_li">
                        <p className="cr_number"> 1.1 </p>
                        <p>
                          {" "}
                          It is the responsibility of all employees to comply
                          with all Policies and Procedures and to conduct
                          themselves in an exemplary manner.{" "}
                        </p>
                      </li>
                      <li className="epad_responsibilties_li">
                        <p className="cr_number"> 1.2 </p>
                        <p>
                          {" "}
                          It is the responsibility of the HOD and Head of Human
                          Resources to ensure all aspects of the disciplinary
                          process are undertaken fairly and consistently.{" "}
                        </p>
                      </li>
                      <li className="epad_responsibilties_li">
                        <p className="cr_number"> 1.3 </p>
                        <p>
                          {" "}
                          It is the responsibility of the third party
                          contractors/outsourced staff to comply with all
                          Policies and Procedures and to conduct themselves in
                          an exemplary manner.
                        </p>
                      </li>
                    </ul>
                    <h4> Procedure</h4>
                    <ul className="epad_procedure_ul crossreference_paddleft">
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.4 </p>
                        <p>
                          {" "}
                          Any employee/third-party contractors/outsourced staff
                          who violates any policies and/or applicable UAE laws
                          is liable to face appropriate Disciplinary Action.{" "}
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.5 </p>
                        <p>
                          {" "}
                          No direct action will be taken against an
                          employee/third-party contractors/outsourced staff
                          unless the issue has been thoroughly investigated and
                          documented and advice sought from the HR Department.
                          The investigation documentation and
                          employee/third-party contractors/outsourced staff
                          defense shall be recorded in a report and added to
                          employee’s personal file or the third-party
                          contractors/outsourced staff file.{" "}
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.6 </p>
                        <p>
                          {" "}
                          Guidance and advice from the line manager to an
                          employee/third-party contractors/outsourced staff is
                          not considered a disciplinary verbal warning.
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.7 </p>
                        <p>
                          {" "}
                          The manager/supervisor has the authority to issue a
                          verbal warning to the employee/third-party
                          contractors/outsourced staff for minor incidents. For
                          major or more important violations the Head of
                          Department must be involved.{" "}
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.8 </p>
                        <p>
                          {" "}
                          If the employee/third-party contractors/outsourced
                          staff behavior did not improve within the time line
                          given, he/she might be subject to further disciplinary
                          action in line with the procedure.{" "}
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p className="cr_number"> 1.9 </p>
                        <p>
                          {" "}
                          An employee/third-party contractor/outsourced staff
                          should be informed in writing of the reason for the
                          disciplinary action.{" "}
                        </p>
                      </li>
                      <li className="epad_procedure_li">
                        <p> 1.10 </p>
                        <p className="epad_para_employee">
                          {" "}
                          An employee should be informed in writing of any
                          Disciplinary Action to be taken against him/her,
                          including the reasons for such action. An
                          employee/third-party contractor/outsourced staff
                          receipt signature is required on the Disciplinary
                          Action letter before it can be recorded in the
                          employee/third- party contractors/outsourced staff
                          file. In the event the employee/third-party
                          contractors/outsourced staff refuses to accept or sign
                          the disciplinary action letter the Head of Human
                          Resources will record the same in presence of a
                          witness and the same will be placed in the
                          employee/third-party contractors/outsourced staff
                          file.
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li crossreference_subheading">
                        <p className="cr_number"> 2.1 </p>
                        <p className="cr_text">
                          {" "}
                          Disciplinary Action May Consist Of:{" "}
                        </p>
                      </li>
                    </ul>
                    <div className="crossreference_paddleft">
                      <ul>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.1. </p>
                          <p>
                            {" "}
                            Verbal warning (should be documented in the
                            employee/third-party contractors/outsourced staff
                            file){" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.2. </p>
                          <p> First Written Warning </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.3. </p>
                          <p> Second Written Warning </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.4. </p>
                          <p> Salary Deduction (from basic salary) </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.5. </p>
                          <p>
                            {" "}
                            Final Warning/Suspension of employee/third-party
                            contractors/outsourced staff{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.6. </p>
                          <p>
                            {" "}
                            Suspension of Pay (the basic pay for a period not
                            exceeding 10 days){" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.1.7. </p>
                          <p> Discharge (Termination of Service) </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li crossreference_subheading">
                        <p className="cr_number"> 2.2 </p>
                        <p className="cr_text"> Verbal Warning: </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.2.1. </p>
                        <p>
                          {" "}
                          A Verbal Warning is appropriate when it is necessary
                          for the manager in charge to take action against an
                          employee/third-party contractors/outsourced staff for
                          any minor failing or minor misconduct.{" "}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li crossreference_subheading">
                        <p className="cr_number"> 2.3 </p>
                        <p className="cr_text"> First/ Second Warning </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1. </p>
                        <p>
                          {" "}
                          Listed below are the different kinds of misconduct
                          which may warrant a First Warning letter or, if
                          repeated, a Second Warning letter. It is stressed
                          however that this list is not exhaustive and that on
                          all occasions a full and proper investigation must
                          take place prior to the issue of a warning.{" "}
                        </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddingleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.1. </p>
                        <p> Persistent lack of punctuality; </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.2. </p>
                        <p>
                          {" "}
                          Absence from work, including going absent during work,
                          without a valid reason, notification or authorization
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.3. </p>
                        <p> Smoking within unauthorized areas </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.4. </p>
                        <p>
                          {" "}
                          Failure to work in accordance with prescribed
                          procedures{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.5. </p>
                        <p>
                          {" "}
                          Failure to observe Company policies, regulations and
                          procedures
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.6. </p>
                        <p>
                          {" "}
                          Failure to follow the Job Description signed by the
                          staff {" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.7. </p>
                        <p>
                          {" "}
                          Unreasonable standards of dress or personal hygiene{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.8. </p>
                        <p> Improper disposing of sharp/ bio medical waste </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.3.1.9. </p>
                        <p> Violation of information security requirements </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li crossreference_subheading">
                        <p className="cr_number"> 2.4 </p>
                        <p className="cr_text"> Final Warning/ Termination </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1. </p>
                        <p>
                          {" "}
                          Listed below are the different kinds of misconduct
                          which may be considered to be Gross Misconduct and may
                          warrant a Final Warning, Demotion or Dismissal. It is
                          also stressed however that this list is not exhaustive
                          and that on all occasions a full and proper
                          investigation must take place prior to the issuing of
                          a Final Warning, Demotion or Dismissal.{" "}
                        </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddingleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.1. </p>
                        <p>
                          {" "}
                          Theft, including unauthorized possession or damage of
                          Company property{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.2. </p>
                        <p>
                          {" "}
                          Breaches of confidentiality, prejudicial to the
                          interest of the Company{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.3. </p>
                        <p>
                          {" "}
                          Being unfit for duty because of the misuse/consumption
                          of drugs or alcohol{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.4. </p>
                        <p>
                          {" "}
                          Refusal to carry out a management instructions which
                          is within the individuals capabilities and which would
                          be seen to be in the interest of the Company{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.5. </p>
                        <p>
                          {" "}
                          Breach of IT Security policy/ confidentiality /
                          security procedures {" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.6. </p>
                        <p>
                          {" "}
                          Physical assault, breach of the peace or verbal abuse{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.7. </p>
                        <p> Sexual Harassment </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.8. </p>
                        <p>
                          {" "}
                          False declaration of qualifications or professional
                          credentials
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.1.9. </p>
                        <p>
                          {" "}
                          Repeated failure to observe Company rules, regulations
                          or procedures{" "}
                        </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.2. </p>
                        <p>
                          {" "}
                          All formal warnings, first written warning, second
                          written warning and final written warning must be
                          countersigned by the HR and will be routed through the
                          HOD/ Manager.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.3. </p>
                        <p>
                          {" "}
                          The HR Department is responsible for maintaining the
                          confidentiality of all disciplinary proceedings,
                          witness statements, and records; however, there may be
                          circumstances in which disclosure is needed or certain
                          information, or there is need to transfer information
                          to authorities{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.4. </p>
                        <p>
                          {" "}
                          Any Disciplinary Action taken is recorded in the
                          employee/third-party contractors/outsourced staff
                          file.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.5. </p>
                        <p>
                          {" "}
                          The violation may be noted as “no longer applicable”
                          upon the approval of the HOD and Head of Human
                          Resources as follows:{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.6. </p>
                        <p>
                          {" "}
                          Behavior has significantly improved since the verbal
                          disciplinary counseling took place and within
                          timelines set by HOD.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.7. </p>
                        <p>
                          {" "}
                          One year has passed since any Disciplinary Action took
                          place with no further/repeat.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.8. </p>
                        <p> Incidents (First and Second Warning) </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.4.9. </p>
                        <p>
                          {" "}
                          Three years have passed since any Final Warning and/or
                          Suspension.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.4.10. </p>
                        <p>
                          {" "}
                          Where the disciplinary action involves loss of pay the
                          deduction of salary is made from the basic salary. No
                          deduction can be made without the approval of the Head
                          of Human Resources.{" "}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li crossreference_subheading">
                        <p className="cr_number"> 2.5 </p>
                        <p className="cr_text">
                          {" "}
                          Investigation In Cases Of Disciplinary Action
                        </p>
                      </li>
                    </ul>
                    <ul className="crossreference_paddleft">
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.1. </p>
                        <p>
                          {" "}
                          No disciplinary action can be made against an
                          employee/third-party contractors/outsourced staff
                          before giving the employee/third-party
                          contractors/outsourced staff the chance of a fair
                          hearing and to listen to his/her statement and
                          defense. The investigation proceedings are registered
                          in a file kept in the employee/third-party
                          contractors/outsourced staff file in the HR
                          department.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.2. </p>
                        <p>
                          {" "}
                          Disciplinary issues related to time and attendance is
                          conducted by the HOD in consultation with the HR
                          department.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.3. </p>
                        <p>
                          {" "}
                          In instances where the employee/third-party
                          contractors/outsourced staff commit serious violations
                          of Policy and Procedures or actions of misconduct, the
                          HOD will submit a report to the Head of Human
                          Resources.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.4. </p>
                        <p>
                          {" "}
                          An Investigation Panel may be formed by the Head – HR
                          if circumstances warrant it.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.5. </p>
                        <p>
                          {" "}
                          The panel will consist of three members including HOD,
                          Head of Human Resources and Manager from outside the
                          department.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.6. </p>
                        <p>
                          {" "}
                          The chair of the panel will be the Head of Human
                          Resources.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.7. </p>
                        <p>
                          {" "}
                          No suspension or termination decision shall be taken
                          unless an investigation panel has been formed and a
                          report presented by the chair of the panel.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.8. </p>
                        <p>
                          {" "}
                          For those cases where there is a need to temporarily
                          suspend an employee/third-party contractor/outsourced
                          staff for the sake of the investigation, the Head of
                          Human Resources will refer the matter to the panel
                          within two days to take the decision either to stop
                          the suspension or extend for a further period not to
                          exceed 10 days on full pay.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_number"> 2.5.9. </p>
                        <p>
                          {" "}
                          following the investigation, the disciplinary decision
                          of the panel is to suspend the employee, the
                          employee/third-party contractors/outsourced staff may
                          be suspended for a maximum period of 10 days without
                          pay.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.5.10. </p>
                        <p>
                          {" "}
                          The panel should ensure adherence to any terms and
                          conditions of the Medical Staff By- Laws, in respect
                          of the Medical Staff.
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.5.11. </p>
                        <p>
                          {" "}
                          The employee/third-party contractors/outsourced staff
                          have the opportunity to appeal, with evidence. The
                          employee should raise a written appeal to the Head of
                          Human Resources within 5 days of being notified of
                          Disciplinary Action against him/her. The appeal will
                          be considered by the CEO whose decision will be final.{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.5.12. </p>
                        <p>
                          {" "}
                          All violations by a medical staff member which relate
                          to medical practice, treatment of patients or ability
                          to effectively treat patients will be dealt with in
                          accordance with Medical Staff By-Laws
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.5.13. </p>
                        <p>
                          {" "}
                          In instance of improper disposal of sharps/ bio
                          medical waste, disciplinary action will be in the form
                          of asking the concerned staff (person who improperly
                          disposed the sharp item) to bear all expenses incurred
                          as a result of the injury (medical tests and
                          treatment). If there is no evidence that a particular
                          staff is at fault, the whole department will have to
                          bear the related expenses for treatment of the
                          injured. Any action to be taken will after thorough
                          investigation{" "}
                        </p>
                      </li>
                      <li className="disci_li">
                        <p className="cr_num"> 2.5.14. </p>
                        <p>
                          {" "}
                          All employees are responsible for understanding and
                          follow all Codes of Conduct{" "}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li CR_subheading">
                        <p className="cr_number"> 3. </p>
                        <p className="cr_text"> References/Cross References:</p>
                      </li>
                    </ul>
                    <p className="crossreference_paddleft">
                      {" "}
                      Medical Staff By-Laws{" "}
                    </p>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li CR_subheading">
                        <p className="cr_number"> 4. </p>
                        <p className="cr_text"> Relevant Documents & Records</p>
                      </li>
                    </ul>
                    <p className="crossreference_paddleft"> None </p>
                  </div>
                  <div>
                    <ul className="crossreference_ul">
                      <li className="crossreference_li CR_subheading">
                        <p className="cr_number"> 5. </p>
                        <p className="cr_text"> Appendices</p>
                      </li>
                    </ul>
                    <p className="crossreference_paddleft"> None </p>
                  </div>
                </div>
              </div>
              <div>
                <h4> Acknowledgement</h4>
                <p>
                  I hereby confirm they I have read and understood the Disciplinary procedurePolicy and am fully aware that I will be held responsible for any actions that oppose (go against) the policy.
                </p>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name ackempname covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename11 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employeeid-ack-covid4"
                      className="form-control common_fullname-dept-id-deg-disable empidcovid  covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-empnumber-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="EmployeeUnitNameit"
                      className="form-control covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Unit Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-EmployeeUnitNameit"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>
              <div className="row form">

                <div className="col-md-4 signature_part">
                  <p>Employee Signature</p>
                </div>

                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
              </div>
            </div>

            <div className="emp_policy_ack_div">
              <div>
                <h3>
                  h.) <span className="Covidform_unitname"> {officename} </span>
                  <span style={{ display: "none" }} className="DynamicCovidform_unitname" >
                    {dynamicUnitnamecovid} </span> IT Security Policy Acknowledgement
                </h3>
              </div>
              <div>
                <p>
                  The computer network is the property of
                  <span className="DynamicCovidform_unitname">
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  and is to be used in an efficient, ethical and legal manner
                  for legitimate official purposes, improving staff and
                  organization’s achievement and development. Staff are provided
                  with access to the computer network to assist them in the
                  performing their jobs and as a support for hospital’s
                  day-to-day Operational activities and patient care
                  documentation. This access, is a privilege and not a right.
                  Additionally, staffs are also provided with access to the
                  Internet through the computer network. All the staffs have the
                  responsibility to use Hospital computer resources and the
                  Internet in a professional, lawful and ethical manner. Abuse
                  of the computer network or the Internet, may result in
                  disciplinary action, including dismissal from employment and
                  other criminal actions under UAE laws.{" "}
                </p>
              </div>
              <div className="gdesc">
                {/* <ol id="covid-desc"> {Gdesc}</ol> */}
                <ol>
                  <li>
                    Transmission of patient data is forbidden. Unauthorized
                    disclosure of Medical Center data is against the{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}{" "}
                    </span>{" "}
                    IT Security Policy.{" "}
                  </li>

                  <li>
                    Medical Center email communication is used between employees
                    for official purposes only and in no event shall be used for
                    any other purposes.
                  </li>
                  <li>
                    Never open or execute a file or e-mail attachment from an
                    unidentified source. If user is unsure of the source, delete
                    it. Never download or run attached files from an unknown
                    email ID.{" "}
                  </li>
                  <li>
                    All users of the Internet should be aware that the Medical
                    Center network creates an audit log reflecting request for
                    service, both in-bound and out-bound addresses, and is
                    periodically reviewed. Bypassing the Medical Center network
                    security by accessing the Internet directly by using
                    unauthorized means is strictly prohibited.{" "}
                  </li>
                  <li>
                    Management at its sole discretion reserves the right to
                    examine e-mails, personal file directories, web access and
                    other information stored on Medical Center computers, at any
                    time without notice.{" "}
                  </li>

                  <li>
                    Personal computers are not allowed to connect to the Medical
                    Center network.{" "}
                  </li>
                  <li>
                    External storage devices & USBs: The usage of USB and other
                    storage devices are prohibited in the Medical Center
                    systems. If an employee requires some data which is related
                    to his/her work, after necessary approvals from HOD and IT
                    Head, the data must be scanned by IT Department to make sure
                    that it’s free from malicious software and virus, after
                    which the details can be transferred.{" "}
                  </li>
                  <li>
                    In the event of a possible virus infection, the user must
                    inform the IT department immediately.{" "}
                  </li>
                  <li>
                    Desktops and laptops must not be left unattended, while
                    signed-on e.g. during lunch, coffee breaks etc. Users must
                    either log off or activate a password-controlled screensaver
                    if they are leaving their PC. The screensaver should be set
                    to activate by default after 10 minutes of inactivity.{" "}
                  </li>
                  <li>
                    Each user is allocated an individual username and password.
                    Logon passwords must not be written down or disclosed to
                    another individual. The owner of a particular username will
                    be held responsible for all actions performed.{" "}
                  </li>
                  <li>
                    IT equipment must not be removed from the Medical Center
                    premises. If needed, it is the duty of IT department to move
                    the equipment with proper information and after necessary
                    approvals.{" "}
                  </li>

                  <li>
                    Only licensed software is allowed to be used in the Medical
                    Center environment. Staff found using non-licensed software
                    will be dealt seriously.{" "}
                  </li>
                  <li>
                    Staff are not allowed to take unnecessary printouts for
                    personnel use.{" "}
                  </li>
                  <li>
                    Staff are required to use official mobile phone and landline
                    numbers, only to make calls for official purposes. Any
                    unauthorized use of mobile phone and landline numbers may
                    result in disciplinary action, including dismissal from
                    employment and other criminal actions under UAE laws. Usage
                    of personnel mobile phones at work should be limited.{" "}
                  </li>
                  <li>
                    Disclosure and use of confidential information include oral
                    communications as well as its display or distribution in
                    tangible physical documentation, in whole or in part, from
                    any source or in any format (e.g., paper, digital,
                    electronic, internet, social networks like Facebook or
                    WhatsApp, posting, magnetic or optical media, film, etc.).{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}{" "}
                    </span>{" "}
                    is the record owner, and the Employee has no right or
                    ownership interest in any confidential information.{" "}
                  </li>
                  <li>
                    Confidential information will not be used or disclosed by
                    the Employee in violation of any applicable law or other
                    limitations as put in place by Practice from time to time.
                    The employee will ensure that he/she will use and access
                    only the information necessary to perform the Employee’s
                    duties and will not disclose confidential information unless
                    expressly authorized in writing to do so, by the HOD/ HR/
                    Management.{" "}
                  </li>
                </ol>
              </div>

              <div>
                <h4>Employee Acknowledgment</h4>
                <p>
                  I hereby confirm that I read and understood the IT Security
                  policy (refer under approved policies) and confirm that I will
                  abide by the rules and regulations of the policy.{" "}
                </p>
              </div>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>

                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename10 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                {/* <div className="col-md-4">
              <div className="form-group relative">
                <input
                  type="date"
                  id="currentdate-ack-covid5"
                  className="form-control currentdatecovid covidviewdisable"
                  autoComplete="off"
                  disabled
                />
                <span className="floating-label date_floating_label">
                  Date <i className="required">*</i>
                </span>
              </div>
              <span
                className="error-validation"
                id="err-date-ackcovid"
                style={{ color: "red", display: "none" }}
              >
                This field is mandatory.
              </span>
            </div> */}
                <div className="col-md-4 signature_part">
                  <p> Signature of Employee</p>
                </div>

                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
              </div>
            </div>

            <div className="emp_policy_ack_div">
              <div>
                <h3>
                  i.)  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  IT Acceptable Usage Policy – Acknowledgement{" "}
                </h3>
              </div>
              <div>
                <p>
                  The computer network is the property of{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  and is to be used in an efficient, ethical and legal manner
                  for legitimate official purposes, improving staff and
                  organization’s achievement and development.{" "}
                </p>
                <p>
                  Staff are provided with access to the computer network to
                  assist them in the performing their jobs and as a support for
                  group’s day-to-day Operational activities and patient care
                  documentation. This access is a privilege and not a right.{" "}
                </p>
                <p>
                  Additionally, staffs are also provided with access to the
                  Internet through the computer network. All the staffs have the
                  responsibility to use{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  group computer resources and the Internet in a professional,
                  lawful and ethical manner. Abuse of the computer network or
                  the Internet, may result in disciplinary action, including
                  dismissal from employment and other criminal actions under UAE
                  laws{" "}
                </p>
              </div>

              <div className="General_Ownership">
                <h4>General Use And Ownership </h4>
                <ol className="common_covid">
                  <li>
                    1.While{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    desires to provide a reasonable level of privacy, users
                    should be aware that the data they create, use, or process
                    on the corporate systems remains the property of{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    . Because of the need to protect{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    unit’s network, management cannot guarantee the privacy of
                    information on any computing device belonging to{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    .{" "}
                  </li>
                  <li>
                    2. Employees are responsible for exercising good judgment
                    regarding the reasonableness of personal use like Desktop,
                    Network, Internet and Data.{" "}
                  </li>
                  <li>
                    3. For security and network maintenance purposes, authorized
                    individuals within{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    may monitor equipment, systems, emails, and network traffic
                    at any time.{" "}
                  </li>
                  <li>
                    4. <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    reserves the right to audit networks and systems on a
                    periodic basis to ensure compliance with this policy,
                    business objectives and any applicable laws or regulations.{" "}
                  </li>
                  <li>
                    5. For minimizing risk and optimizing resources staffs are
                    accountable for shutting down the systems on completion of
                    the duty shifts.{" "}
                  </li>
                  <li>
                    6. Patient Data are not allowed to print without approval.{" "}
                  </li>
                </ol>
              </div>
              {/* <div className=" Email_Usage">
          <h4>Email Usage</h4>
          <ul>{EmailUsesss}</ul>
        </div> */}
              <div className=" Email_Usage">
                <h4>Email Usage</h4>
                <ol className="common_covid">
                  <li>
                    1. Users shall ensure that all electronic communication
                    resources provided by IT Department are used for official
                    purpose only.{" "}
                  </li>
                  <li>
                    2. Users shall refrain from using the official electronic
                    communication resources for personal
                    communications/correspondences, including social media.
                  </li>
                  <li>
                    3. Users shall be held responsible for any misuse of
                    electronic communication correspondences from their
                    accounts, arising from non-compliance to the information
                    security policies.{" "}
                  </li>
                  <li>
                    4. Users shall refrain from accessing or using any
                    electronic communication account of other Users, unless it
                    is authorized/delegated by the account owner with proper
                    business justification, and this shall be carried out
                    through the responsible business unit and without sharing
                    the password.{" "}
                  </li>
                  <li>
                    5. Company emails are not allowed to use in social media.{" "}
                  </li>
                  <li>
                    6. Mass emailing is not allowed unless a written approval
                    from management is granted.{" "}
                  </li>
                  <li>
                    7. Patient Data are not allowed to send through email
                    without approval.{" "}
                  </li>
                </ol>
              </div>
              {/* <div className="Internet_Usage">
         <h4 > Internet Usage </h4>
          <ul>{InternetUsagess}</ul>
        </div> */}

              <div className="Internet_Usage">
                <h4> Internet Usage </h4>
                <ol className="common_covid">
                  <li>
                    1. Users should make use of internet primarily for official
                    purposes and to fulfill
                  </li>

                  <li>
                    2. The obligation towards their day-to-day business
                    operation.{" "}
                  </li>
                  <li>
                    3. Users are not allowed to post statements/information or
                    comments on the internet that could damage the reputation of
                    UAE Government and/or{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    units.{" "}
                  </li>
                  <li>
                    4. Users shall refrain from using the internet to download,
                    upload or install any software from the internet or any
                    other third party’s unlicensed software.{" "}
                  </li>
                  <li>
                    5. Users shall refrain from using unauthorized websites and
                    tampering the restrictions imposed on third-party websites.{" "}
                  </li>
                  <li>
                    6. Program on any hardware/equipment belonging to the units,
                    unless the User is authorized according to the nature of
                    his/her work.{" "}
                  </li>
                </ol>
              </div>
              <div className=" Desktop_Laptopusage">
                <h4> Desktop & Laptop Usage </h4>
                {/* <ul>{DesktopLaptopusagess}</ul> */}
                <ol className="common_covid">
                  <li>
                    1. Users shall ensure using Computer officially provided by
                    IT department to fulfill the obligations towards their day
                    to day business operations.{" "}
                  </li>
                  <li>
                    2. Users are not allowed to install any unlicensed or
                    illegal copies of software or applications on the officially
                    provided devices.{" "}
                  </li>
                  <li>
                    3. IT approval is required for the usage of application or
                    software.{" "}
                  </li>
                </ol>
              </div>

              <div className="Anti_virus">
                <h4> Antivirus </h4>
                {/* <ul>{Antivirusss}</ul> */}
                <ol className="common_covid">
                  <li>
                    1. Make sure that all the workstations (Laptops and
                    Desktops) are installed with company approved antivirus with
                    the latest version with updates.{" "}
                  </li>
                  <li>
                    2. Users shall not disrupt the auto virus scan scheduled on
                    their devices. If the scan is affecting system performance,
                    users should contact IT Service Desk for resolution.{" "}
                  </li>
                </ol>
              </div>
              {/* <div className="Removable_Media">
        <h4 >       Removable Media   </h4>
          <ul>{RemovableMediass}</ul>
        </div> */}

              <div className="Removable_Media">
                <h4> Removable Media </h4>
                <ol className="common_covid">
                  <li>
                    1. Removable media will be provided with authorized approval
                    with clear business case.
                  </li>
                  <li>
                    2. Staff who have been authorized to use removable media for
                    the purposes of their job roles are responsible for the
                    secure use of those removable media as required by this
                    policy.{" "}
                  </li>
                  <li>
                    3. Staff shall not copy any of the{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    unit’s any form of information for a removable media to any
                    third-party computers, cloud storage or to their personal
                    computers.{" "}
                  </li>
                  <li>
                    4. The safety of the device is the responsibility of the
                    staff who is authorized.{" "}
                  </li>
                </ol>
              </div>
              <div className="Clear_Deskss">
                <h4> Clear Desk & Clear Screen</h4>
                {/* <ul>{ClearDeskss}</ul> */}
                <ol className="common_covid">
                  <li>
                    1.Users shall keep their desks clean and clear of whenever
                    leaving the office unattended as detailed in the clear desk
                    & clear screen policy.{" "}
                  </li>
                  <li>
                    2. User shall ensure that any written on white boards are
                    wiped off, once the discussion is complete, and shall ensure
                    that such information is not visible from outside the room
                    during the meetings.{" "}
                  </li>
                  <li>
                    3. Users shall ensure that they lock the computer screen
                    whenever leaving their desks.
                  </li>
                </ol>
              </div>
              <div className="Access_Control">
                <h4> Access Control </h4>
                <ol className="common_covid">
                  {/* {AccessControlss} */}
                  <li>
                    1. Users shall be aware that all access privileges shall be
                    allocated on a “need to use” basis, only the minimum
                    privileges required for the User’s functional role shall be
                    allocated.{" "}
                  </li>
                  <li>
                    2. Users shall refrain from accessing information systems
                    with credentials of other employees or affiliates.{" "}
                  </li>
                  <li>
                    3. Users shall maintain their exclusive access privileges on
                    information systems by not allowing anyone else to operate
                    from their account.{" "}
                  </li>
                </ol>
              </div>
              <div className="Passwords_Usage">
                <h4> Passwords Usage</h4>
                <ol className="common_covid">
                  {/* {PasswordsUsagess} */}
                  <li>
                    1.Users shall not share their passwords with anyone
                    including their colleagues, friends, family members etc.{" "}
                  </li>
                  <li>
                    2. Users shall not share their passwords with anyone
                    including their colleagues, friends, family members etc.{" "}
                  </li>

                  <li>
                    3. Passwords shall be unique in nature. Users shall avoid
                    using the same password for all systems/applications.{" "}
                  </li>

                  <li>
                    4. Users shall take extreme caution while using passwords in
                    public places or in the presence of other people.{" "}
                  </li>

                  <li>
                    5. Users shall be cautious while entering passwords and
                    ensure that passwords are entered only in the correct
                    password field provided.{" "}
                  </li>

                  <li>
                    6. Users shall ensure that passwords are not stored in clear
                    text in any form.{" "}
                  </li>
                </ol>
              </div>
              <div className="Personal_Devices">
                <h4>Personal Devices </h4>
                <ol className="common_covid">
                  <li>
                    1. The usage of personal devices is not allowed in the
                    office network.{" "}
                  </li>
                </ol>
              </div>
              <div className="Physical_Security">
                <h4> Physical Security </h4>
                <ol className="common_covid">
                  {/* {PhysicalSecurityss} */}
                  <li>
                    1. Employees shall visibly wear the employee ID card issued
                    by the [HR section/department or the function assigned with
                    HR responsibilities] while they are inside the premises of
                    Entity.{" "}
                  </li>
                  <li>
                    2. Visitors shall be escorted at all times by an authorized
                    employee while in Medical Center premises.
                  </li>
                  <li>
                    3. Users shall refrain from entering critical areas (such as
                    data center, filing rooms) without having business
                    justification and without authorization from the respective
                    owner.{" "}
                  </li>
                </ol>
              </div>
              <div className="Information_Security">
                <h4> Information Security Incidents Management </h4>
                <ol className="common_covid">
                  {/* {InformationSecurityManagements} */}
                  <li>
                    1. Users shall promptly report information security
                    incidents either to [Information Security Manager or the job
                    title assigned with responsibilities of managing information
                    security] or any member of [Information Security
                    Section/Department or the function assigned with information
                    security responsibilities].{" "}
                  </li>
                  <li>
                    2. Users shall support the information security incident
                    response team, to contain the incident and take necessary
                    corrective & preventive actions.{" "}
                  </li>
                  <li>
                    3. Users shall refrain from tampering any source of evidence
                    or audit logs on information systems that may be required
                    for future audit and prosecution purposes.{" "}
                  </li>
                </ol>
              </div>
              <div className="uses_formations">
                <h4>Usage Of Confidential Information </h4>
                <ol className="common_covid">
                  {/* {usesConfidentialInformations} */}
                  <li>
                    1. Confidential information will not be used or disclosed by
                    the Employee in violation of any applicable law or other
                    limitations as put in place by practice from time to time.
                    Employee will ensure that he/she will use and access only
                    the information necessary to perform the Employee’s duties
                    and will not disclose confidential information unless
                    expressly authorized in writing to do so, by the HOD/ HR/
                    Management.{" "}
                  </li>
                  <li>
                    2. Disclosure and use of confidential information includes
                    oral communications as well as its display or distribution
                    in tangible physical documentation, in whole or in part,
                    from any source or in any format (e.g., paper, digital,
                    electronic, internet, social networks like Facebook or
                    WhatsApp, posting, magnetic or optical media, film, etc.).{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    is the record owner, and the Employee has no right or
                    ownership interest in any confidential information.
                  </li>
                </ol>
              </div>
              <div className="EquipmentHandles">
                <h4> Equipment Handle </h4>
                {/* <ul>{EquipmentHandles}</ul> */}
                <ol className="common_covid">
                  <li>
                    1. IT equipment must not be removed from the{" "}
                    <span className="Covidform_unitname"> {officename}</span>{" "}
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    unit premises. If needed, it is the duty of IT department to
                    move the equipment with proper information and after
                    necessary approvals
                  </li>

                  <li>
                    2. Desktops and laptops must not be left unattended, while
                    signed-on e.g., during lunch, coffee breaks etc. Users must
                    either log off or activate a password-controlled screensaver
                    if they are leaving their PC.{" "}
                  </li>

                  <li>
                    3. I understand that I need to take proper and reasonable
                    care of the assets at all times, I shall not misuse the same
                    and ensure to take all necessary measures to protect the
                    asset of{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    .{" "}
                  </li>

                  <li>
                    4. I undertake that{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    will have the complete right to take back the asset at any
                    deems fit without assigning reason for the same.{" "}
                  </li>

                  <li>
                    5. I agree that in the event of any loss/damage to the
                    asset, I will immediately lodge a police complaint and
                    submit the original copy to HR Department.{" "}
                  </li>

                  <li>
                    6. I am responsible to return the assets to the concerned
                    departments upon completion of my tenure with{" "}
                    <span className="Covidform_unitname"> {officename}</span>
                    <span
                      style={{ display: "none" }}
                      className="DynamicCovidform_unitname"
                    >
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>{" "}
                    on my last working day.{" "}
                  </li>
                </ol>
              </div>

              <div>
                <h4> Acknowledgement</h4>
                <p>
                  I hereby confirm that I read and understood the IT Acceptable
                  Usage Policy (refer under approved policies) and confirm that
                  I will abide by the rules and regulations of the policy
                </p>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name ackempname covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename11 Employeename_covid_ack_ploicy covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employeeid-ack-covid4"
                      className="form-control common_fullname-dept-id-deg-disable empidcovid  covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee ID
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-empnumber-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employdept-ack-covid3"
                      className="form-control common_fullname-dept-id-deg-disable employeedeptcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Department <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeedept-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>
              <div className="row form">
                {/* <div className="col-md-4">
              <div className="form-group relative">
                <input
                  type="date"
                  id="currentdate-ack-covid6"
                  className="form-control currentdatecovid covidviewdisable"
                  autoComplete="off"
                  disabled
                />
                <span className="floating-label date_floating_label">
                  Date <i className="required">*</i>
                </span>
              </div>
              <span
                className="error-validation"
                id="err-Employeedates-ackcovid"
                style={{ color: "red", display: "none" }}
              >
                This field is mandatory.
              </span>
            </div> */}
                <div className="col-md-4 signature_part">
                  <p>Employee Signature</p>
                </div>

                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
              </div>
            </div>

            {/* <div className="emp_policy_ack_div">
              <div>
                <h3>
                  j.)   <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {dynamicUnitnamecovid}
                  </span>
                  - Employee Confidentiality Statement{" "}
                </h3>
                <p>
                  I, the undersigned, as an employee of{" "}
                  <span className="Covidform_unitname"> {officename}</span>
                  <span
                    style={{ display: "none" }}
                    className="DynamicCovidform_unitname"
                  >
                    {" "}
                    {dynamicUnitnamecovid}
                  </span>{" "}
                  or associated healthcare facility, hereby agree that I shall
                  not disclose or communicate to any unauthorized person,
                  confidential information that I became aware of during the
                  course of my employment.
                </p>
                <p>
                  Confidential information is understood by me to be any
                  medical, financial or administrative information related to
                  the healthcare organization.
                </p>
                <p>
                  {" "}
                  At the end of my employment, I agree to return all medical,
                  financial, administrative and all other documents, manuals,
                  and data that I have received and/ or generated during my
                  employment to my Manager/Supervisor.{" "}
                </p>

                <p>
                  I understand that any violation on my part of the above will
                  subject me to formal disciplinary action and/or legal action
                </p>
              </div>

              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group  relative dynamic_name_username">
                    <input
                      type="text"
                      id="Employeename-ack-covid"
                      className="form-control common_fullname-dept-id-deg-disable currentuser_name ackempname covidviewdisable common_fullname-dept-id-deg-disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="form-group relative employeename_ack_dynamic dynamiclistusername"
                  >
                    <input
                      type="text"
                      id="Employee_name_ack_ploicy"
                      className="form-control common_fullname-dept-id-deg-disable employeename12 Employeename_covid_ack_ploicy covidviewdisable employeename_ack"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeename-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Jobtitle-ack-covid1"
                      className="form-control common_fullname-dept-id-deg-disable job_title_covid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Job Title <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-JobTitle-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employdept-ack-covid4"
                      className="form-control common_fullname-dept-id-deg-disable employeedeptcovid covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Employee Department <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeedept-ackcovid"
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
                      id="covide-country-codes"
                      className="form-control common_fullname-dept-id-deg-disable covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label ">
                      Country code <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-countrycodesackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="Employcontact-ack-covid"
                      className="form-control covidviewdisable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      Contact Number <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Employeecontact-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>

                  <span
                    className="error-validation"
                    id="err-format-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    Characters are not allowed.
                  </span>
                </div>

                <div className="col-md-4 signature_part">
                  <p> Signature of Employee </p>
                </div>
              </div>
              <div className="row form">
                <div className="col-md-4 signature_part">
                  <p>Date</p>
                </div>
               

                <div className="col-md-4">
                  <div className="form-group relative">
                    <input
                      type="text"
                      id="hr-name-dynamic"
                      className="form-control  covidviewdisable"
                      autoComplete="off"
                      disabled
                    />

                    <input
                      type="text"
                      id="hr-name-listdata"
                      className="form-control  covidviewdisable"
                      autoComplete="off"
                      style={{ display: "none" }}
                      disabled
                    />
                    <span className="floating-label date_floating_label">
                      HR Name <i className="required">*</i>
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-hr-name"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
                <div className="col-md-4 signature_part">
                  <p> HR Signature </p>
                </div>
              </div>
              <div className="row signature_part">
                <div className="col-md-4 signature_part">
                  <p> Date </p>
                </div>
              </div>
              
            </div> */}


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
                {this.state.isPrevFormSubmitted &&
                  this.state.isPrevFormSubmitted == true ? (
                  <button
                    className="dashboard_submit_btn covidsub_submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    style={{ cursor: "no-drop" }}
                    className="dashboard_submit_btn covidsub_submit"
                    type="submit"
                  >
                    Submit
                  </button>
                )}

                <button
                  id="covidsublitbtn"
                  style={{ display: "none" }}
                  className="dashboard_submit_btn "
                  type="submit"
                  onClick={() => this.updatelistitemcovid()}
                >
                  {" "}
                  Update{" "}
                </button>
                <button
                  style={{ display: "none" }}
                  className="dashboard_cancel_btn btn-cancel print-btnpolicycovid"
                  type="submit"
                  onClick={() => this.Printthis()}
                >
                  Print
                </button>
                {GlobalFormOpenedMode == "New" && (
                  <button
                    id="btn-sign-covid"
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

                {GlobalFormOpenedMode == "Edit" && (
                  <button
                    id="btn-hr-covid"
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

        <div id="dashboard_right-print-ack-general" style={{ display: "none" }}>
          <div className="all-item">
            <div
              className="dashboard_right_heading"
              style={{ marginBottom: "5px" }}
            >
              {handler.state.Dynamiclogo &&
                GlobalFormOpenedMode == "New" &&
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

              {GlobalFormOpenedMode != "New" && (
                <LogoMaster description={""} siteurl={this.props.siteurl} />
              )}

              <div className="header-title-units">
                <span>
                  {" "}
                  Employee policy Acknowledgement & Declarations - General & It
                </span>
                {/* <ul>
                  <li>
                    Control Number: <b id="print-Covid-Control-Number"></b>
                  </li>
                  <li>
                    Version: <b id="print-Covid-Version-Number"></b>
                  </li>
                </ul> */}
              </div>
            </div>

            <div className="dashboard_right_ffamily ackndpd_generel_iT">
              <div className="first_paragrph_firstbreak">
                <div className="policy_ack_declaration_top policy_ack_clinical_part personal_info_part">
                  <p className="print-intro">
                    Below is the list of policies that the employee is expected
                    to Acknowledge and update their details on required fields.
                  </p>

                  <ul>
                    <li> a.) Employee Vaccination Declaration </li>

                    <li> b.) Employee Accommodation Guidelines </li>

                    <li> c.) Employee ID Card Acknowledgement </li>

                    <li> d.) Employee Handbook Acknowledgement </li>

                    <li> e.) Employee Gifts Acceptance Policy </li>

                    <li>
                      {" "}
                      f.) Employee Use Of Cell Phone And Personal Gadgets At
                      Workplace Policy.
                    </li>
                    <li>
                      g.) Disciplinary Procedure
                    </li>
                    <li> h.) IT Security Policy - Acknowledgement </li>

                    <li> i.) IT Acceptable Usage Policy – Acknowledgement </li>
                    {/* <li>j.) Employee Confidentiality Statement </li> */}
                  </ul>
                </div>
                <div className="emp_policy_ack_div emp_vaccine_it_print clearfix">
                  <h3 style={{ float: "left" }}>a.) Employee vaccination declaration </h3>
                  <div className="header-title-units">

                    <ul>
                      <li>
                        Control Number: <b id="print-Covid-Control-Number"></b>
                      </li>
                      <li>
                        Version: <b id="print-Covid-Version-Number"></b>
                      </li>
                    </ul>
                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid"
                          className="currentuser_name print-control Ackemployeename covidviewdisable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>

                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative print-dynamiclistusername"
                    >
                      <span
                        //    type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename1 print-Employeename_covid_ack_ploicy empallnameemp"
                      //  autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div> */}
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //     type="text"
                          id="print-Employeeid-ack-covid"
                          className="print-control ackemployeeid print-empidcovid covidviewdisable"
                        //   autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee ID
                        </span>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //   type="text"
                          id="Employdept-ack-covid"
                          className="print-control employeedeptack print-employeedeptcovid covidviewdisable"
                        // autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee Department <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation err-Employeedept-ackcovidvalid"
                        id="err-Employeedept-ackcovid"
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
                          id="EmployDesignation-ack-covid"
                          className="print-control employeedegack print-employeedegs covidviewdisable"
                        // autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee Designation <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-EmployeeDesignation-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //   type="date"
                          id="print-Employdoj-ack-covid"
                          className="print-control covidviewdisable"
                        // autoComplete="off"
                        //  disabled
                        />
                        <span className="floating-label date_floating_label">
                          Date of Joining
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeedoj-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        {" "}
                        This field is mandatory.
                      </span>
                    </div>
                  </div>

                  <div className="emp-ack-Vaccinationtable table_vaccine table-responsive">
                    <table className="tableform">
                      <thead>
                        <tr>
                          <th className="name_vaccine_th">
                            Name of the Vaccine{" "}
                          </th>
                          <th>Vaccinated (Yes/No)</th>
                          <th className="vaccine_date_th">If yes, When </th>
                          <th>Exposed (If Yes)</th>
                          <th>Recommendation (Infection Control) </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="name_vaccine_th">Chicken Pox </td>
                          <td>
                            <span
                              //   type="text"
                              className="chikenpox_name covidviewdisable"
                              id="print-chiekbpox-name"
                            //autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_chikenpox_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="vaccine_date_th">
                            <span
                              //    type="date"
                              className="chikenpox_two covidviewdisable"
                              id="print-chiekbpox-date"
                            //     autoComplete="off"
                            //  max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_chiekbpox_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //     type="text"
                              className="chikenpox_three covidviewdisable"
                              id="print-chiekbpox-exposed"
                            //   autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_chiekbpox_exposed"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="chikenpox_four covidviewdisable"
                              id="print-chiekbpox-infaction"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_chiekbpox_infaction"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="name_vaccine_th">Hepatitis B </td>
                          <td>
                            <span
                              //   type="text"
                              className="Hepatitis_name covidviewdisable"
                              id="print-Hepatitis-name"
                            // autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Hepatitis_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="vaccine_date_th">
                            <span
                              //    type="date"
                              className="Hepatitis_date covidviewdisable"
                              id="print-Hepatitis-date"
                            //  autoComplete="off"
                            //max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_Hepatitis_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="Hepatitis_three covidviewdisable"
                              id="print-Hepatitis-exposed"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Hepatitis_exposed"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="Hepatitis_four covidviewdisable"
                              id="print-Hepatitis-infaction"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Hepatitis_infaction"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="name_vaccine_th">MMR</td>
                          <td>
                            <span
                              //    type="text"
                              className="MMR_name covidviewdisable"
                              id="print-MMR-name"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_MMR_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="vaccine_date_th">
                            <span
                              //    type="date"
                              className="MMR_date covidviewdisable"
                              id="print-MMR-date"
                            //  autoComplete="off"
                            // max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_MMR_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="MMR_exposed covidviewdisable"
                              id="print-MMR-exposed"
                            //   autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_MMR_exposed"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="MMR_infaction covidviewdisable"
                              id="print-MMR-infaction"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_MMR_infaction"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="name_vaccine_th">Influenza </td>
                          <td>
                            <span
                              //   type="text"
                              className="Influenza_name covidviewdisable"
                              id="print-Influenza-name"
                            // autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Influenza_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="vaccine_date_th">
                            <span
                              //     type="date"
                              className="Influenza_date covidviewdisable"
                              id="print-Influenza-date"
                            //     autoComplete="off"
                            //   max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_Influenza_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //     type="text"
                              className="Influenza_exposed covidviewdisable"
                              id="print-Influenza-exposed"
                            //   autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Influenza_exposed"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //   type="text"
                              className="Influenza_infaction covidviewdisable"
                              id="print-Influenza-infaction"
                            // autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Influenza_infaction"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="name_vaccine_th">
                            Meningococcal (Microbiology Staff){" "}
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="Meningococcal_name covidviewdisable"
                              id="print-Meningococcal-name"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Meningococcal_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="vaccine_date_th">
                            <span
                              //     type="date"
                              className="Meningococcal_date covidviewdisable"
                              id="print-Meningococcal-date"
                            //   autoComplete="off"
                            //  max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_Meningococcal_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="Meningococcal_exposed covidviewdisable"
                              id="print-Meningococcal-exposed"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Meningococcal_exposed"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="Meningococcal_infaction covidviewdisable"
                              id="print-Meningococcal-infaction"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_Meningococcal_infaction"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="emp-ack-Vaccinationtable table_dose table-responsive">
                    <h4 className="covid_vaccine_it_print">
                      Covid-19 vaccination
                    </h4>
                    <table className="tableform2">
                      {/* <thead className="emp-ack-thread">
<tr>
<th>Covid-19 vaccination</th>
</tr>
</thead> */}
                      <thead>
                        <tr>
                          <th>Number Of Doses </th>
                          <th>Name </th>
                          <th>Place </th>
                          <th className="empl_genereal_it_th">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>First Dose </td>

                          <td>
                            <span
                              //    type="text"
                              className="FirstDose_name covidviewdisable"
                              id="print-FirstDose-name"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_FirstDose_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //     type="text"
                              className="FirstDose_place covidviewdisable"
                              id="print-FirstDose-place"
                            // autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_FirstDose_place"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="empl_genereal_it_th">
                            <span
                              //    type="date"
                              className="FirstDose_date covidviewdisable"
                              id="print-FirstDose-date"
                            //  autoComplete="off"
                            //   max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_FirstDose_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Second Dose </td>

                          <td>
                            <span
                              //    type="text"
                              className="SecondDose_name covidviewdisable"
                              id="print-SecondDose-name"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation  error-table-validation err_SecondDose_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //  type="text"
                              className="SecondDose_place covidviewdisable"
                              id="print-SecondDose-place"
                            //   autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_SecondDose_place"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="empl_genereal_it_th">
                            <span
                              //   type="date"
                              className="SecondDose_date covidviewdisable"
                              id="print-SecondDose-date"
                            //  autoComplete="off"
                            // max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation  error-table-validation err_SecondDose_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Booster Dose </td>
                          <td>
                            <span
                              //    type="text"
                              className="BoosterDose_name covidviewdisable"
                              id="print-BoosterDose-name"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_BoosterDose_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              // type="text"
                              className="BoosterDose_place covidviewdisable"
                              id="print-BoosterDose-place"
                            //    autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_BoosterDose_place"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="empl_genereal_it_th">
                            <span
                              //     type="date"
                              className="BoosterDose_date covidviewdisable"
                              id="print-BoosterDose-date"
                            // autoComplete="off"
                            // max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_BoosterDose_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Second Booster Dose </td>
                          <td>
                            <span
                              // type="text"
                              className="SecondBoosterDose_name covidviewdisable"
                              id="print-SecondBoosterDose-name"
                            //     autoComplete="off"
                            />
                            <span
                              className="error-validation  error-table-validation err_SecondBoosterDose_name"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td>
                            <span
                              //    type="text"
                              className="SecondBoosterDose_place covidviewdisable"
                              id="print-SecondBoosterDose-place"
                            //  autoComplete="off"
                            />
                            <span
                              className="error-validation error-table-validation err_SecondBoosterDose_place"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                          <td className="empl_genereal_it_th">
                            <span
                              //     type="date"
                              className="SecondBoosterDose_date covidviewdisable"
                              id="print-SecondBoosterDose-date"
                            //   autoComplete="off"
                            //   max={moment().format("YYYY-MM-DD")}
                            />
                            <span
                              className="error-validation error-table-validation err_SecondBoosterDose_date"
                              style={{ color: "red", display: "none" }}
                            >
                              {" "}
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="personal_info_p attach_it_print">
                    Please attach your Covid Vaccination Certificate{" "}
                    <i className="required">*</i>
                  </p>
                  <div id="covid19-certification" className="row form">
                    {/* <div className="col-md-4"> */}
                    {/* <div className="form-group relative">
                  <input type="file" id="Attact-covid-cert" className="form-control"
                    autoComplete="off">
                  </input>
                </div>
                <span
                  className="error-validation error-table-validation"
                  id="err-covid-cert"
                  style={{ color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span> */}
                    <span id="print-Attact-filename-covid-cert"></span>
                    <a
                      data-interception="off"
                      href={`${printcovidfilename}`}
                      // href={`${this.state.BankStatement}`}
                      style={{ display: "none" }}
                      className="covid-cert-file-shown"
                      target="_blank"
                    >
                      {/* click here */}
                    </a>
                  </div>
                  {/* </div> */}
                  <div className="covidpositive print-vaccination-it">
                    <p>
                      1. Have you been Covid-19 positive in the last 3 months
                      from the date of signing this form ?
                      {/* (If yes, please specify the details
below, Enter “NA” if it's Not Applicable){" "} */}
                    </p>
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            {/* <input
                            className="print-Yescovidpositive covidviewdisable"
                            type="checkbox"
                            id="yescovid"
                            name="yescovid"
                            value="Yes"
                          /> */}
                            <span className="print-Yescovidpositive"></span>
                          </div>
                        </div>

                        <span
                          style={{ color: "red", display: "none" }}
                          className="errone"
                        >
                          Select any one of the checkboxes above
                        </span>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            {/* <input
                            className="print-nocovidpositive covidviewdisable"
                            type="checkbox"
                            id="NOcovid"
                            name="NOcovid"
                            value="NO"
                          /> */}
                            <span className="print-nocovidpositive"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      id="print-textareaone"
                      // style={{ marginBottom: "20px" }}
                      className="print-covidtextfield1"
                    //   name="covidpositive"
                    // placeholder="Enter text here"
                    />
                    {/* <span
                    className="errorvalidation"
                    id="err-textareaone-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span> */}

                    <p style={{ marginTop: "5px" }}>
                      2. Have you been in direct contact with any Covid-19
                      positive case in the last 3 months from the date of
                      signing this form ?
                    </p>
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            {/* <input
                            className="print-Yescovidpositive2 covidviewdisable"
                            type="checkbox"
                            id="yescovid2"
                            name="yescovid2"
                            value="Yes"
                          /> */}
                            <span className="print-Yescovidpositive2"></span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group relative">
                          <div className="form-check">
                            {/* <input
                            className="print-nocovidpositive2 covidviewdisable"
                            type="checkbox"
                            id="NOcovid2"
                            name="NOcovid2"
                            value="NO"
                          />
                          <span className="form-check-label">NO</span> */}
                            <span className="print-nocovidpositive2"></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span
                      // style={{ display: "none", resize: "none" }}
                      id="print-textareatwo"
                      className="covidtextfield2"
                    //  name="covidpositive"
                    //   placeholder="Enter text here"
                    />
                    {/* <span
                    className="errorvalidation"
                    id="err-textareatwo-ackcovid"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span> */}
                  </div>
                  <div className="emp-ack_kindly">
                    <p className="details_para">
                      3.Kindly mention details of your Last PCR taken
                    </p>
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            //     type="date"
                            id="print-pcrdate"
                            className="print-control covidviewdisable"
                          //   autoComplete="off"
                          //   max={moment().format("YYYY-MM-DD")}
                          />
                          <span className="floating-label">
                            Last PCR taken date <i className="required">*</i>
                          </span>
                        </div>
                        {/* <span
                        className="error-validation"
                        id="pcrdate-err"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                      </div>
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            id="print-pcrresult"
                            className="pcrresult print-control covidviewdisable"
                          >
                            {/* <option value="Select">Select</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option> */}
                          </span>
                          <span className="floating-label">
                            PCR result (positive/ negative){" "}
                            <i className="required">*</i>{" "}
                          </span>
                          <span
                            className="error-validation"
                            id="err-pcrresult-ackcovid"
                            style={{ color: "red", display: "none" }}
                          >
                            This field is mandatory.
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="details_para">
                      I hereby declare that all the details furnished above are
                      correct. Prior to my joining date at the company, if I get
                      Covid-19 positive or exposed to a positive Covid-19 case,
                      I would be keeping the management / HR department
                      informed.{" "}
                    </p>
                  </div>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid2"
                          className="currentuser_name print-control covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <span
                        //  type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename2 print-Employeename_covid_ack_ploicy covidviewdisable"
                      //  autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div> */}
                      <span
                        className="error-validation"
                        id="err-Employeename-ackcovid"
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
                </div>
              </div>
              <div className="first_paragrph_firstbreak print-accommodation-it">
                <div className="emp_policy_ack_div">
                  <div className="clearfix">
                    <div className="header-title-units">
                      <h3 style={{ float: "left" }}>b.) Employee Accommodation Guidelines</h3>
                      <ul>
                        <li>
                          Control Number: <b id="print-Accommodation-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Accommodation-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    1. Employees staying at the company accommodation are
                    advised to keep it clean and to the best of hygiene
                    conditions. This is directly linked to the health and safety
                    of occupants. HR/Facility management will be performing
                    surprise audits at the accommodation and any deviations will
                    lead to disciplinary actions on concerned occupants.
                  </p>

                  <p>
                    2. Occupants may come from diverse backgrounds and are
                    advised to live at company accommodation with peace and
                    harmony and respect for each other. Any events of
                    misbehavior, a quarrel between occupants, or outsiders will
                    lead to strict action against the concerned person.{" "}
                  </p>

                  <p>
                    3. Garbage or any other wastes should be disposed of
                    properly and should not be thrown out of the window or in
                    the corridor. Disposal of food wastes shall be strictly
                    practiced on daily basis.{" "}
                  </p>

                  <p>
                    4. Alcohol consumption and smoking are strictly prohibited
                    inside the accommodation premises.{" "}
                  </p>
                  <p>
                    5. Any problem regarding the maintenance work should be
                    reported to the concerned Facility Supervisor. {" "}
                  </p>
                  <p>
                    6. Occupants are advised not to keep valuables in the
                    company accommodation, and they will be responsible for the
                    safety of valuable items if kept in the rooms.{" "}
                  </p>

                  <p>
                    7. No friends, relatives or colleagues should be entertained
                    inside the accommodation and no males will be allowed in the
                    ladies’ accommodation as well as no females allowed in the
                    male accommodation.{" "}
                  </p>
                  <p>
                    8. Observe strictly to put off your TV before 11pm to avoid
                    disturbances to other inmates staying with you as well as in
                    the nearby room.{" "}
                  </p>
                  <p>
                    {" "}
                    9. Occupants are advised to keep noise levels to a minimum
                    which should not affect the neighbors.{" "}
                  </p>

                  <p>
                    10. Employees are requested to adhere to the decent dress
                    code in the accommodation.{" "}
                  </p>
                  <p>
                    11. Please see that the paint of the accommodation walls is
                    not damaged, due to the inserting of nails, sticking
                    posters, etc. staff will be penalized if they do not follow
                    the protocol.{" "}
                  </p>
                  <p>
                    {" "}
                    12. A cleaning Rota may also be useful to ensure everyone
                    participates in maintaining cleanliness and hygiene in the
                    apartment.{" "}
                  </p>

                  <p>
                    13. Occupants are advised to use utilities (Water,
                    Electricity) responsibly and over-utilization above the
                    defined slabs will be penalized and the additional amount to
                    be deducted from the occupants of the respective flats. Slab
                    will be available with the facilities department Also, any gas Utilized should be borne by the employee.{" "}
                  </p>
                  <p>
                    14. You are requested to return to the accommodation not
                    later than 11.45pm in the evenings other than for any
                    work-related reasons/exceptional situations. The Security on
                    duty is empowered to stop you from entering the
                    accommodation after 12am midnight.{" "}
                  </p>
                  <p>
                    {" "}
                    15. Building Security on duty is responsible for the
                    facility needs and will represent the Facility Department
                    officially
                  </p>

                  <p>
                    {" "}
                    16. All personal belongings shall be kept in the allocated
                    cupboard/space provided, and avoid discomfort to other
                    inmates, by filling the common areas with personal
                    belongings
                  </p>
                  <p>
                    17. You are not supposed to remove the company-provided
                    furniture’s/electronic items from the accommodation.{" "}
                  </p>
                  <p>
                    18. The Furniture, Shelf, etc. allotted to each employee has
                    to be properly maintained and if anything is found damaged,
                    the concerned person will have to bear the cost for
                    repair/replacement.{" "}
                  </p>

                  <div>
                    <h4>Note: </h4>
                    <p>
                      1. All the inmates staying in company accommodation has to
                      adhere to the instructions of the facility Team and
                      employee has the full right to report to the HR Department
                      if the grievances are not resolved through the facility
                      team. Escalations can be made to Corporate HR if the
                      issues are not addressed by HR.
                    </p>
                    <p>
                      2. Violations of the above instructions may result in
                      immediate notice to vacate from the company accommodation.
                    </p>
                  </div>

                  <div className="print-ack-it">
                    <h4>Acknowledgment</h4>
                    <p>
                      I have received, read, and understood the Accommodation
                      Policy and I hereby confirm that I will abide by the above
                      policy.{" "}
                    </p>
                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid3"
                          className="print-control currentuser_name covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <span
                        //  type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename3 print-Employeename_covid_ack_ploicy covidviewdisable"
                      //  autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div> */}
                      <span
                        className="error-validation"
                        id="err-Employeename-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="Employeeid-ack-covid1"
                          className="print-control print-empidcovid covidviewdisable"
                        //     autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee ID
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeeid-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      {/* <div id="print-emp-uniname-covid" className="form-group relative">
                      <input
                        type="text"
                        id="Unitname-ack-covid"
                        className="form-control currentuer_unitname covidviewdisable"
                        autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Unit Name<i className="required">*</i>
                      </span>
                    </div> */}
                      <div
                        id="print-dynamicemp-uniname-covid"
                        className="form-group relative"
                      >
                        <span
                          //    type="text"
                          id="print-Unitname-ackcoviddynamic"
                          className="print-control covidviewdisable"
                        //  autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee Unit Name<i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Unitname-ackcovid"
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
                            <span className="form-check-label">
                              {" "}
                              Employee Signature
                            </span>
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
                  <div className="ack_home print_ack_home">
                    <p className="ack_home_place">
                      It is our collective responsibility to support each other
                      and make this place a “home away from home”.{" "}
                    </p>

                    <p className="ack_home_happy"> Think Happy & Stay Happy </p>
                  </div>
                </div>
              </div>
              <div className="first_paragrph_firstbreak print-idcard-it">
                <div className="emp_policy_ack_div">
                  <div className="clearfix">
                    <div className="header-title-units">
                      <h3 style={{ float: "left" }}>c.) Employee ID Card Acknowledgement </h3>
                      <ul>
                        <li>
                          Control Number: <b id="print-IDCard-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-IDCard-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    I hereby acknowledge the receipt of personnel I.D. card from
                    the Human Resources Department of{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    , Abu Dhabi. I accept that this card remains the property of{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    and will be surrendered upon my resignation or termination
                    of employment.
                  </p>
                  <p>
                    I also accept that I am responsible for the safety of this
                    card and should it be damaged or lost, a fee will be imposed
                    for its replacement.{" "}
                  </p>
                  <p>
                    I agree to abide by the policy of{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    that the ID card must be worn at all times while on duty.{" "}
                  </p>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid4"
                          className="print-control currentuser_name covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <span
                        //  type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename4 print-Employeename_covid_ack_ploicy covidviewdisable"
                      //  autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div> */}
                      <span
                        className="error-validation"
                        id="err-Employeename-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //    type="text"
                          id="Employeeid-ack-covid2"
                          className="print-control print-empidcovid covidviewdisable"
                        // autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee ID
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeeid-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    {/* <div className="col-md-4 signature_part">
                    <p> Date </p>
                  </div> */}
                  </div>

                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">
                              {" "}
                              Employee Signature
                            </span>
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
              <div className="first_paragrph_firstbreak print-handbook-it">
                <div className="emp_policy_ack_div">
                  <div>
                    <div className="clearfix">
                      <div className="header-title-units">

                        <h3 style={{ float: "left" }}>d.) Employee Handbook Acknowledgement</h3>
                        <ul>
                          <li>
                            Control Number: <b id="print-Handbook-Control-Number"></b>
                          </li>
                          <li>
                            Version: <b id="print-Handbook-Version-Number"></b>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      I acknowledge that I have received copy of the{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>{" "}
                      Employee Handbook.
                    </p>

                    <p>
                      I agree that, as an employee, it is my responsibility to:{" "}
                    </p>
                    <ul>
                      <li>Read this handbook.</li>
                      <li>
                        Ask questions of my supervisor if I need additional
                        information regarding items covered in the handbook.
                      </li>
                      <li>
                        Abide by and observe the policies and procedures of{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        which are generally explained in this handbook.{" "}
                      </li>
                    </ul>
                  </div>
                  <p>
                    I understand that I am subject to{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    policies and procedures, even those not outlined in this
                    handbook. I also understand that{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                    may periodically change policies and procedures and that I
                    will be responsible to abide by and observe such changes.
                    Finally, I acknowledge that this Employee Handbook is
                    neither a contract of employment nor a legal document.{" "}
                  </p>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid5"
                          className="print-control currentuser_name covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <span
                        //   type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename5 print-Employeename_covid_ack_ploicy covidviewdisable"
                      // autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Employeename-ackcovid"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span> */}
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="Jobtitle-ack-covid"
                          className="print-control print-job_title_covid covidviewdisable"
                        // autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Job Title <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Jobtitle-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //     type="text"
                          id="Employdept-ack-covid2"
                          className="print-control print-employeedeptcovid covidviewdisable"
                        //   autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Department <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeedept-ackcovid"
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
                          id="Employeeid-ack-covid5"
                          className="print-control print-empidcovid covidviewdisable"
                        //     autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee ID
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-EmployeeNumber-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    {/* <div className="col-md-4">
<div className="form-group relative">
<input
type="date"
id="signeddate"
className="form-control covidviewdisable"
autoComplete="off"
disabled
/>
<span className="floating-label date_floating_label">
Signed Date<i className="required">*</i>
</span>
</div>
<span
className="error-validation"
id="err-currentdate-ackcovid"
style={{ color: "red", display: "none" }}
>
This field is mandatory.
</span>
// </div> */}
                    {/* <div className="col-md-4 signature_part">
                   <p>Signed Date</p>
                  </div> */}
                    {/* <div className="col-md-4 signature_part">
                    <p>Signature</p>
                  </div> */}
                  </div>
                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label"> Signature</span>
                          </div>
                        </div>
                      </div>
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">
                              {" "}
                              Signed Date
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="first_paragrph_firstbreak print-gift-it">
                <div className="emp_policy_ack_div">
                  <div className="clearfix">
                    <div className="header-title-units">
                      <h3 style={{ float: "left" }}>e.) Employee Gifts Acceptance Policy</h3>

                      <ul>
                        <li>
                          Control Number: <b id="print-Gifts-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Gifts-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h4>1. Purpose</h4>
                  <p>
                    This policy is designed to provide guidelines around the
                    acceptance of gifts during employment at{" "}
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                  </p>
                  <h4>2. Policy Statement</h4>
                  <h5 className="sub_section-ploicy">
                    2.1 Gifts or “Kickbacks”
                  </h5>
                  <p>
                    {" "}
                    2.1.1 Employees are not permitted to accept gifts, vouchers,
                    service offers or promises of Payments/commission by
                    suppliers, vendors, or others in the course of their
                    employment with
                    <span className="print-DynamicCovidform_unitname">
                      {" "}
                      {dynamicUnitnamecovid}
                    </span>
                  </p>

                  <p>
                    2.1.2 The Only exceptions of gifts that may be received are
                    baskets or edible items or flowers sent to a group of
                    individuals or a department as appreciation for their level
                    of service and care.{" "}
                  </p>

                  <p>
                    2.1.3. Should, under exceptional circumstances an employee
                    be entrusted to accept a gift, the gift must be declared to
                    the manager/HOD and the “Gifts Declaration form” should be
                    completed and forwarded to HRD{" "}
                  </p>
                  <p>
                    2.1.4. Employees are strictly forbidden to request any gift
                    or financial aid, for himself or others from the clients and
                    visitors of the company and its facilities.{" "}
                  </p>

                  <div>
                    <h5 className="sub_section-ploicy">
                      2.2. Gifts Acceptance:{" "}
                    </h5>
                    <p>
                      2.2.1. Any{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      employee who is given gifts, vouchers, service offers,
                      flight tickets or promised any payment/commission by
                      patients, suppliers, vendors and others, must not accept
                      any such gift, no matter what the monetary value, as it
                      creates the impression of compromised decision-making.{" "}
                    </p>

                    <p>
                      2.2.2. Gifts given to individuals must be declined
                      politely, explaining the reason for doing so. In case it
                      becomes embarrassing to decline, the same should be
                      submitted to HR/Administration department who in turn will
                      make an entry in the records.{" "}
                    </p>

                    <p>
                      2.2.3. For employees working in concierge / Valet Parking,
                      any cash received will be collected by the Finance
                      department and will be distributed among the drivers and
                      concierge employees on monthly basis.{" "}
                    </p>

                    <p>
                      2.2.4. The only exceptions to accepting gifts can be:{" "}
                    </p>
                    <p>
                       Promotional merchandize or samples that bears the donor
                      company’s logo, and has no resale value, and which cannot
                      be seen as influencing a deal or decision.{" "}
                    </p>

                    <p>
                       Gifts exchanged internally by{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      colleagues with one another at special occasions that
                      cannot be seen as creating a culture of favouritism or
                      bias.{" "}
                    </p>

                    <p>
                      {" "}
                       Gifts given by a group of staff on their own
                      account/accord for Birthdays/ farewells/ anniversaries/
                      marriage etc. to a colleague.{" "}
                    </p>
                    <p>
                      2.2.5. If an employee is unsure about how to handle a
                      situation regarding a gift, they should refer to their
                      Line Manager and/or HR Department for guidance.{" "}
                    </p>

                    <p>
                      2.2.6. Should an employee accept a gift they must declare
                      that they are doing so on behalf of{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      and they must alert their Line Manager of this gift
                      immediately.{" "}
                    </p>

                    <p>
                      2.2.7. The Employee is strictly forbidden to solicit any
                      gift or financial aid for himself/herself or others from
                      the patients and visitors of{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {dynamicUnitnamecovid}
                      </span>
                      and its Facilities as it is damaging the reputation of the
                      Hospital.{" "}
                    </p>
                    <p>
                      2.2.8. Deliberate violation of this policy forms grounds
                      for Disciplinary Action up to and including termination.{" "}
                    </p>

                    <div className="print-empack-it">
                      <h4 className="">
                        Employee Acknowledgment
                      </h4>
                      <span>By signing this policy, I</span>{" "}
                      <span
                        className="print-dynamic_name_username_emp currentuser_name covidviewdisable common_fullname_disable"
                        //type="text"
                        id="currentusername"
                      // autoComplete="off"
                      />
                      <span
                        id="print-dynamiclistusername"
                        style={{
                          display: "initial",
                          fontWeight: "bold",
                        }}
                        // type="text"
                        className="print-control git_emp_ack print-employeename6 print-Employeename_covid_ack_ploicy print-dynamiclistusername print-span-bold"
                      // autoComplete="off"
                      />{" "}
                      <span>
                        , hereby acknowledge understanding of the policy and{" "}
                      </span>
                      <span>
                        acceptance of the policy guidelines and constraints.{" "}
                      </span>
                    </div>

                    <div className="row form">
                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            id="print-Employeename-ack-covid6"
                            className="print-control currentuser_name covidviewdisable common_fullname_disable"
                          ></span>
                          <span className="floating-label date_floating_label">
                            Employee Name <i className="required">*</i>
                          </span>
                        </div>
                        {/* <div
                        style={{ display: "none" }}
                        className="form-group relative dynamiclistusername"
                      >
                        <span
                          // type="text"
                          id="Employee_name_ack_ploicy"
                          className="print-control employeename7 print-Employeename_covid_ack_ploicy covidviewdisable"
                        //   autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeename-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                      </div>

                      {/* <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //     type="date"
                        id="currentdate-ack-covid4"
                        className="print-control print-currentdatecovid covidviewdisable"
                      //   autoComplete="off"
                      // disabled
                      />
                      <span className="floating-label date_floating_label">
                        Date<i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-date-ackcovid"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div> */}
                      {/* <div className="col-md-4 signature_part">
                      <p>Employee Signature</p>
                    </div> */}

                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            //  type="text"
                            id="EmployDesignation-ack-covid1"
                            className="print-control print-employeedegs covidviewdisable"
                          //autoComplete="off"
                          />
                          <span className="floating-label date_floating_label">
                            Employee Designation <i className="required">*</i>
                          </span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-deg-ackcovid"
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
                              <span className="form-check-label">
                                {" "}
                                Employee Signature
                              </span>
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

                    <div className="row form">
                      <div className="signature-new-wrap">
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">
                                {" "}
                                HR Signature
                              </span>
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
              <div className=" emp-cellphone-it">
                <div className="emp_policy_ack_div first_paragrph_firstbreak">
                  <div className="clearfix">
                    <div className="header-title-units">

                      <h3 style={{ float: "left", width: "380px" }}>
                        f.) Employee Use Of Cell Phone And Personal Gadgets At Workplace
                        Policy
                      </h3>
                      <ul>
                        <li>
                          Control Number: <b id="print-CellPhone-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-CellPhone-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h4>Purpose</h4>
                  <p>
                    1.To set the guidelines for the use of personal cell phones
                    and other communication devices at work in order to ensure
                    that employee performance and productivity is not affected.{" "}
                  </p>

                  <p>
                    {" "}
                    2.To ensure that cell phone use while at work is both safe
                    and does not disrupt business operations.
                  </p>

                  <div>
                    <h4> Policy Statement </h4>
                    <p>
                      1.
                      <span className="print-Covidform_unitname">
                        {" "}
                        {officename}
                      </span>
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      prohibits all staff from using personal gadgets in the
                      workplace as a preventive step believed necessary to
                      secure patient/ staff privacy and the Center's
                      confidential information. Personal gadgets include but not
                      limited to laptops, tablets, smartphones, Phones,
                      scanners, printers, cameras etc. Use of these mobile
                      devices can interfere with employee productivity and can
                      be distracting to others.{" "}
                    </p>

                    <p>
                      2.Staff are not allowed to bring these gadgets to the
                      workplace and if noticed, may be asked to hand it over to
                      the Security Department until the completion of their duty
                      hours. Repeated violation or abuse related to this policy
                      by an employee may result in disciplinary action which may
                      be in the form of Warning, Fine, Suspension or
                      Termination.{" "}
                    </p>
                    <p>
                      3.With the exception of emergencies and during normal
                      breaks, cell phone usage is prohibited while at the
                      workplace during normal working hours. This includes but
                      is not limited to talking on the cell phone, text
                      messaging, use of social network sites, chatting, playing
                      games on the phone, etc.{" "}
                    </p>
                    <p>
                      4. Cell phones/sim cards provided for business use are
                      company property and are to be treated as such. Employees
                      are expected to exercise the same discretion in using
                      personal cell phones as is expected for the use of company
                      phones. Company issued cell phones/sim cards are to be
                      used only for business purposes.{" "}
                    </p>

                    <p>
                      5.Physicians and senior clinical staff who are required to
                      use cell phones at work are excused from this unless found
                      misused.{" "}
                    </p>
                  </div>
                  <div>
                    <h4>Scope</h4>
                    <p>1. Organization Wide </p>
                  </div>
                  <div>
                    <h4> Target Audience</h4>
                    <p>
                      All Staff of{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      including the Outsourced Staff{" "}
                    </p>
                  </div>
                  <div>
                    <h4> Responsibilities</h4>
                  </div>
                  <div>
                    <p>
                      1.Head of Department/ Supervisor to ensure that staff are
                      thoroughly oriented and aware of this policy. HODs to make
                      sure that the policy is adhered to and is constantly
                      passed across to all staff during their induction &
                      training period.{" "}
                    </p>

                    <p>
                      2.Staff are expected to strictly comply with the policy{" "}
                    </p>
                  </div>

                  <div>
                    <h4>Procedure</h4>
                  </div>

                  <div>
                    <p>
                      1. Personal phones to be switched to "silent" or "vibrate"
                      once at the workplace.
                    </p>

                    <p>
                      {" "}
                      2. Cell phones are not to be kept on the counters or in
                      visible areas where it could attract the attention of
                      visitors and distract the attention of the staff. Nurses,
                      technicians, and service assistants are not allowed to
                      carry their phones inside the clinical areas unless
                      permitted or with written exception approved by senior
                      management due to mission requirement.
                    </p>

                    <p>
                      {" "}
                      3. Use of cell phones during working hours should only be
                      for important calls. Direct family emergencies that must
                      be dealt with immediately such as serious sickness or
                      accidents are classified as important calls. Chatting or
                      texting with friends and family members are not considered
                      as emergencies which can be dealt with in your break time.
                    </p>
                    <p className="print_procedure_it">
                      4.If there is a necessity to use cell phones for emergency
                      calls at work or during scheduled break periods, employee
                      should refrain from staying at their desk or anywhere
                      among patients and staff.
                    </p>
                    <p>
                      5. To prevent radio frequency-related emissions
                      interference, all mobile phones are to be switched off in
                      patient care areas with medical equipment.
                    </p>
                    <p className="epad_cellphone_para">
                      6. The Center expects all cell phone users within the
                      center premise to observe the following cell phone
                      etiquettes
                      <li>No loud conversation </li>
                      <li>No annoying ring tones </li>
                      <li>No profanity </li>
                    </p>
                  </div>

                  <p style={{ marginTop: "20px" }}>
                    {" "}
                    Use of Cell Phone and Personal Gadgets at Workplace Policy
                    I,{" "}
                    {/* <input
                    className="print-dynamic_name_username_emp currentuser_name  covidviewdisable common_fullname_disable"
                    type="text"
                    id="employeename"
                    autoComplete="off"
                  /> */}
                    <span
                      style={{ display: "initial", fontWeight: "bold" }}
                      //   type="text"
                      id="print-dynamiclistusername11"
                      className="print-control print-span-bold"
                    // autoComplete="off"
                    />{" "}
                    , the undersigned, hereby confirm that I have read and
                    understood the information defined in the Use of Cell Phone
                    and Personal Gadgets at Workplace Policy and I agree to
                    undertake all responsibilities as defined. I also understand
                    that breaching the standards of the policy may result in
                    disciplinary action up to and including termination and/ or
                    other legal recourse.{" "}
                  </p>
                  <p>
                    I understand that this acknowledgment is valid as long as I
                    am an employee of the Company{" "}
                  </p>

                  <div className="row form print-empname-it">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid7"
                          className="print-control currentuser_name covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>


                    </div>


                  </div>
                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label"> Signature</span>
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
              <div className="emp_policy_ack_div first_paragrph_firstbreak">
                <div style={{ marginTop: "20px" }} className="cross-ref-item">
                  <div className="crossreference_top">
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li policy_disciplinary">
                          <h3>g.) Disciplinary procedure</h3>
                          <h4>1. Policy Statement </h4>
                        </li>
                      </ul>
                      <p className="crossreference_paddleft">
                        {" "}
                        It is the intention of the Organization to establish a
                        clear Disciplinary Procedure to be adhered to by
                        Managers and Employees and is consistent with{" "}
                        <span className="emp_policy_ack_bold">
                          {" "}
                          Burjeel Holdings{" "}
                        </span>
                        Policies and UAE Labor Law.{" "}
                      </p>
                    </div>
                    <div>
                      <h4> Purpose</h4>
                      <p className="crossreference_paddleft">
                        {" "}
                        To define guidelines and procedures to ensure a fair
                        and consistent approach in identifying and dealing
                        with issues requiring disciplinary action.{" "}
                      </p>
                    </div>
                    <div>
                      <h4> Scope </h4>
                      <p className="crossreference_paddleft">
                        {" "}
                        The procedures set out in this document are designed
                        to deal with misconduct or indiscipline, or
                        allegations thereof. The policy applies to all
                        employees and third-party contractors/outsourced
                        staff. The procedures do not apply to matters relating
                        to an employee’s professional competence which is
                        dealt through the Performance Improvement Process. The
                        objective of the procedures is to encourage
                        improvement in the conduct of an individual employee
                        and should not be viewed primarily as a means of
                        imposing sanctions. It is important that an employee
                        must always be informed of any disciplinary action
                        taken and the reasons for it.{" "}
                      </p>
                    </div>
                    <div>
                      <h4> Definitions</h4>
                      <p className="crossreference_paddleft"> None </p>
                    </div>
                    <div>
                      <h4> Acronyms Used</h4>
                      <div className="crossreference_paddleft">
                        <ul>
                          <li className="acr_used_li">
                            <p className="acr_usedceo"> CEO </p>
                            <p> - Chief Executive Officer </p>
                          </li>
                          <li className="acr_used_li">
                            <p className="acr_usedhr"> HR </p>
                            <p> - Human Resources </p>
                          </li>
                          <li className="acr_used_li">
                            <p className="acr_usedhod"> HOD </p>
                            <p> - Head of Department </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4> Responsibilities</h4>
                      <ul className="epad_responsibilties_ul crossreference_paddleft">
                        <li className="epad_responsibilties_li">
                          <p className="cr_number"> 1.1 </p>
                          <p>
                            {" "}
                            It is the responsibility of all employees to
                            comply with all Policies and Procedures and to
                            conduct themselves in an exemplary manner.{" "}
                          </p>
                        </li>
                        <li className="epad_responsibilties_li">
                          <p className="cr_number"> 1.2 </p>
                          <p>
                            {" "}
                            It is the responsibility of the HOD and Head of
                            Human Resources to ensure all aspects of the
                            disciplinary process are undertaken fairly and
                            consistently.{" "}
                          </p>
                        </li>
                        <li className="epad_responsibilties_li">
                          <p className="cr_number"> 1.3 </p>
                          <p>
                            {" "}
                            It is the responsibility of the third party
                            contractors/outsourced staff to comply with all
                            Policies and Procedures and to conduct themselves
                            in an exemplary manner.
                          </p>
                        </li>
                      </ul>
                      <h4> Procedure</h4>
                      <ul className="epad_procedure_ul crossreference_paddleft">
                        <li className="epad_procedure_li">
                          <p className="cr_number"> 1.4 </p>
                          <p>
                            {" "}
                            Any employee/third-party contractors/outsourced
                            staff who violates any policies and/or applicable
                            UAE laws is liable to face appropriate
                            Disciplinary Action.{" "}
                          </p>
                        </li>
                        <li className="epad_procedure_li">
                          <p className="cr_number"> 1.5 </p>
                          <p>
                            {" "}
                            No direct action will be taken against an
                            employee/third-party contractors/outsourced staff
                            unless the issue has been thoroughly investigated
                            and documented and advice sought from the HR
                            Department. The investigation documentation and
                            employee/third-party contractors/outsourced staff
                            defense shall be recorded in a report and added to
                            employee’s personal file or the third-party
                            contractors/outsourced staff file.{" "}
                          </p>
                        </li>
                        <li className="epad_procedure_li">
                          <p className="cr_number"> 1.6 </p>
                          <p>
                            {" "}
                            Guidance and advice from the line manager to an
                            employee/third-party contractors/outsourced staff
                            is not considered a disciplinary verbal warning.
                          </p>
                        </li>
                        <li className="epad_procedure_li">
                          <p className="cr_number"> 1.7 </p>
                          <p>
                            {" "}
                            The manager/supervisor has the authority to issue
                            a verbal warning to the employee/third-party
                            contractors/outsourced staff for minor incidents.
                            For major or more important violations the Head of
                            Department must be involved.{" "}
                          </p>
                        </li>
                        <li className="epad_procedure_li print-pro-it">
                          <p className="cr_number"> 1.8 </p>
                          <p>
                            {" "}
                            If the employee/third-party contractors/outsourced
                            staff behavior did not improve within the time
                            line given, he/she might be subject to further
                            disciplinary action in line with the procedure.{" "}
                          </p>
                        </li>
                        <li className="epad_procedure_li">
                          <p className="cr_number"> 1.9 </p>
                          <p>
                            {" "}
                            An employee/third-party contractor/outsourced
                            staff should be informed in writing of the reason
                            for the disciplinary action.{" "}
                          </p>
                        </li>
                        <li className="epad_procedure_li">
                          <p> 1.10 </p>
                          <p className="epad_para_employee">
                            {" "}
                            An employee should be informed in writing of any
                            Disciplinary Action to be taken against him/her,
                            including the reasons for such action. An
                            employee/third-party contractor/outsourced staff
                            receipt signature is required on the Disciplinary
                            Action letter before it can be recorded in the
                            employee/third- party contractors/outsourced staff
                            file. In the event the employee/third-party
                            contractors/outsourced staff refuses to accept or
                            sign the disciplinary action letter the Head of
                            Human Resources will record the same in presence
                            of a witness and the same will be placed in the
                            employee/third-party contractors/outsourced staff
                            file.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li crossreference_subheading">
                          <p className="cr_number"> 2.1 </p>
                          <p className="cr_text">
                            {" "}
                            Disciplinary Action May Consist Of:{" "}
                          </p>
                        </li>
                      </ul>
                      <div className="crossreference_paddleft">
                        <ul>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.1. </p>
                            <p>
                              {" "}
                              Verbal Warning (should be documented in the
                              employee/third-party contractors/outsourced
                              staff file){" "}
                            </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.2. </p>
                            <p> First Written Warning </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.3. </p>
                            <p> Second Written Warning </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.4. </p>
                            <p> Salary Deduction (from basic salary) </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.5. </p>
                            <p>
                              {" "}
                              Final Warning/Suspension of employee/third-party
                              contractors/outsourced staff{" "}
                            </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.6. </p>
                            <p>
                              {" "}
                              Suspension of Pay (the basic pay for a period
                              not exceeding 10 days){" "}
                            </p>
                          </li>
                          <li className="disci_li">
                            <p className="cr_number"> 2.1.7. </p>
                            <p> Discharge (Termination of Service) </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li crossreference_subheading">
                          <p className="cr_number"> 2.2 </p>
                          <p className="cr_text"> Verbal Warning: </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.2.1. </p>
                          <p>
                            {" "}
                            A Verbal Warning is appropriate when it is
                            necessary for the manager in charge to take action
                            against an employee/third-party
                            contractors/outsourced staff for any minor failing
                            or minor misconduct.{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li crossreference_subheading">
                          <p className="cr_number"> 2.3 </p>
                          <p className="cr_text"> First/ Second Warning </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1. </p>
                          <p>
                            {" "}
                            Listed below are the different kinds of misconduct
                            which may warrant a First Warning letter or, if
                            repeated, a Second Warning letter. It is stressed
                            however that this list is not exhaustive and that
                            on all occasions a full and proper investigation
                            must take place prior to the issue of a warning.{" "}
                          </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddingleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.1. </p>
                          <p> Persistent lack of punctuality; </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.2. </p>
                          <p>
                            {" "}
                            Absence from work, including going absent during
                            work, without a valid reason, notification or
                            authorization
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.3. </p>
                          <p> Smoking within unauthorized areas </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.4. </p>
                          <p>
                            {" "}
                            Failure to work in accordance with prescribed
                            procedures{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.5. </p>
                          <p>
                            {" "}
                            Failure to observe Company policies, regulations
                            and procedures
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.6. </p>
                          <p>
                            {" "}
                            Failure to follow the Job Description signed by
                            the staff {" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.7. </p>
                          <p>
                            {" "}
                            Unreasonable standards of dress or personal
                            hygiene{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.8. </p>
                          <p>
                            {" "}
                            Improper disposing of sharp/ bio medical waste{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.3.1.9. </p>
                          <p>
                            {" "}
                            Violation of information security requirements{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="print-finalwarning-it">
                      <ul className="crossreference_ul">
                        <li className="crossreference_li crossreference_subheading">
                          <p className="cr_number"> 2.4 </p>
                          <p className="cr_text">
                            {" "}
                            Final Warning/ Termination{" "}
                          </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1. </p>
                          <p>
                            {" "}
                            Listed below are the different kinds of misconduct
                            which may be considered to be Gross Misconduct and
                            may warrant a Final Warning, Demotion or
                            Dismissal. It is also stressed however that this
                            list is not exhaustive and that on all occasions a
                            full and proper investigation must take place
                            prior to the issuing of a Final Warning, Demotion
                            or Dismissal.{" "}
                          </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddingleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.1. </p>
                          <p>
                            {" "}
                            Theft, including unauthorized possession or damage
                            of Company property{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.2. </p>
                          <p>
                            {" "}
                            Breaches of confidentiality, prejudicial to the
                            interest of the Company{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.3. </p>
                          <p>
                            {" "}
                            Being unfit for duty because of the
                            misuse/consumption of drugs or alcohol{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.4. </p>
                          <p>
                            {" "}
                            Refusal to carry out a management instructions
                            which is within the individuals capabilities and
                            which would be seen to be in the interest of the
                            Company{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.5. </p>
                          <p>
                            {" "}
                            Breach of IT Security policy/ confidentiality /
                            security procedures {" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.6. </p>
                          <p>
                            {" "}
                            Physical assault, breach of the peace or verbal
                            abuse{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.7. </p>
                          <p> Sexual Harassment </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.8. </p>
                          <p>
                            {" "}
                            False declaration of qualifications or
                            professional credentials
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.1.9. </p>
                          <p>
                            {" "}
                            Repeated failure to observe Company rules,
                            regulations or procedures{" "}
                          </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.2. </p>
                          <p>
                            {" "}
                            All formal warnings, first written warning, second
                            written warning and final written warning must be
                            countersigned by the HR and will be routed through
                            the HOD/ Manager.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.3. </p>
                          <p>
                            {" "}
                            The HR Department is responsible for maintaining
                            the confidentiality of all disciplinary
                            proceedings, witness statements, and records;
                            however, there may be circumstances in which
                            disclosure is needed or certain information, or
                            there is need to transfer information to
                            authorities{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.4. </p>
                          <p>
                            {" "}
                            Any Disciplinary Action taken is recorded in the
                            employee/third-party contractors/outsourced staff
                            file.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.5. </p>
                          <p>
                            {" "}
                            The violation may be noted as “no longer
                            applicable” upon the approval of the HOD and Head
                            of Human Resources as follows:{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.6. </p>
                          <p>
                            {" "}
                            Behavior has significantly improved since the
                            verbal disciplinary counseling took place and
                            within timelines set by HOD.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.7. </p>
                          <p>
                            {" "}
                            One year has passed since any Disciplinary Action
                            took place with no further/repeat.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.8. </p>
                          <p> Incidents (First and Second Warning) </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.4.9. </p>
                          <p>
                            {" "}
                            Three years have passed since any Final Warning
                            and/or Suspension.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.4.10. </p>
                          <p>
                            {" "}
                            Where the disciplinary action involves loss of pay
                            the deduction of salary is made from the basic
                            salary. No deduction can be made without the
                            approval of the Head of Human Resources.{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li crossreference_subheading">
                          <p className="cr_number"> 2.5 </p>
                          <p className="cr_text">
                            {" "}
                            Investigation In Cases Of Disciplinary Action
                          </p>
                        </li>
                      </ul>
                      <ul className="crossreference_paddleft">
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.1. </p>
                          <p>
                            {" "}
                            No disciplinary action can be made against an
                            employee/third-party contractors/outsourced staff
                            before giving the employee/third-party
                            contractors/outsourced staff the chance of a fair
                            hearing and to listen to his/her statement and
                            defense. The investigation proceedings are
                            registered in a file kept in the
                            employee/third-party contractors/outsourced staff
                            file in the HR department.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.2. </p>
                          <p>
                            {" "}
                            Disciplinary issues related to time and attendance
                            is conducted by the HOD in consultation with the
                            HR department.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.3. </p>
                          <p>
                            {" "}
                            In instances where the employee/third-party
                            contractors/outsourced staff commit serious
                            violations of Policy and Procedures or actions of
                            misconduct, the HOD will submit a report to the
                            Head of Human Resources.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.4. </p>
                          <p>
                            {" "}
                            An Investigation Panel may be formed by the Head –
                            HR if circumstances warrant it.{" "}
                          </p>
                        </li>
                        <li className="disci_li print-investigation-it">
                          <p className="cr_number"> 2.5.5. </p>
                          <p>
                            {" "}
                            The panel will consist of three members including
                            HOD, Head of Human Resources and Manager from
                            outside the department.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.6. </p>
                          <p>
                            {" "}
                            The chair of the panel will be the Head of Human
                            Resources.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.7. </p>
                          <p>
                            {" "}
                            No suspension or termination decision shall be
                            taken unless an investigation panel has been
                            formed and a report presented by the chair of the
                            panel.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.8. </p>
                          <p>
                            {" "}
                            For those cases where there is a need to
                            temporarily suspend an employee/third-party
                            contractor/outsourced staff for the sake of the
                            investigation, the Head of Human Resources will
                            refer the matter to the panel within two days to
                            take the decision either to stop the suspension or
                            extend for a further period not to exceed 10 days
                            on full pay.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_number"> 2.5.9. </p>
                          <p>
                            {" "}
                            following the investigation, the disciplinary
                            decision of the panel is to suspend the employee,
                            the employee/third-party contractors/outsourced
                            staff may be suspended for a maximum period of 10
                            days without pay.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.5.10. </p>
                          <p>
                            {" "}
                            The panel should ensure adherence to any terms and
                            conditions of the Medical Staff By- Laws, in
                            respect of the Medical Staff.
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.5.11. </p>
                          <p>
                            {" "}
                            The employee/third-party contractors/outsourced
                            staff have the opportunity to appeal, with
                            evidence. The employee should raise a written
                            appeal to the Head of Human Resources within 5
                            days of being notified of Disciplinary Action
                            against him/her. The appeal will be considered by
                            the CEO whose decision will be final.{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.5.12. </p>
                          <p>
                            {" "}
                            All violations by a medical staff member which
                            relate to medical practice, treatment of patients
                            or ability to effectively treat patients will be
                            dealt with in accordance with Medical Staff
                            By-Laws
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.5.13. </p>
                          <p>
                            {" "}
                            In instance of improper disposal of sharps/ bio
                            medical waste, disciplinary action will be in the
                            form of asking the concerned staff (person who
                            improperly disposed the sharp item) to bear all
                            expenses incurred as a result of the injury
                            (medical tests and treatment). If there is no
                            evidence that a particular staff is at fault, the
                            whole department will have to bear the related
                            expenses for treatment of the injured. Any action
                            to be taken will after thorough investigation{" "}
                          </p>
                        </li>
                        <li className="disci_li">
                          <p className="cr_num"> 2.5.14. </p>
                          <p>
                            {" "}
                            All employees are responsible for understanding
                            and follow all Codes of Conduct{" "}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li CR_subheading">
                          <p className="cr_number"> 3. </p>
                          <p className="cr_text">
                            {" "}
                            References/Cross References:
                          </p>
                        </li>
                      </ul>
                      <p className="crossreference_paddleft">
                        {" "}
                        Medical Staff By-Laws{" "}
                      </p>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li CR_subheading">
                          <p className="cr_number"> 4. </p>
                          <p className="cr_text">
                            {" "}
                            Relevant Documents & Records
                          </p>
                        </li>
                      </ul>
                      <p className="crossreference_paddleft"> None </p>
                    </div>
                    <div>
                      <ul className="crossreference_ul">
                        <li className="crossreference_li CR_subheading">
                          <p className="cr_number"> 5. </p>
                          <p className="cr_text"> Appendices</p>
                        </li>
                      </ul>
                      <p className="crossreference_paddleft"> None </p>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="pagebreak"
                  style={{ pageBreakAfter: "always" }}
                ></div> */}

                <div>
                  <h4> Acknowledgement</h4>
                  <p>
                    I hereby confirm they I have read and understood the Disciplinary procedurePolicy and am fully aware that I will be held responsible for any actions that oppose (go against) the policy.
                  </p>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-Employeename-ack-covid9"
                        className="print-control currentuser_name ackempname covidviewdisable common_fullname_disable"
                      ></span>
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //    type="text"
                        id="Employeeid-ack-covid4"
                        className="print-control print-empidcovid  covidviewdisable"
                      //  autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee ID
                      </span>
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="print-EmployeeUnitNameit"
                        className="print-control covidviewdisable"
                      //autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Unit Name <i className="required">*</i>
                      </span>
                    </div>

                  </div>
                </div>
                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">
                            {" "}
                            Employee Signature
                          </span>
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


              <div className="first_paragrph_firstbreak print-security-it">
                <div className="emp_policy_ack_div">
                  <div>
                    <div className="clearfix">
                      <div className="header-title-units">
                        <h3 style={{ float: "left", width: "350px" }}>h.){" "}
                          <span className="print-DynamicCovidform_unitname dynamic-unit-securityit print_color_unit_name">
                            {dynamicUnitnamecovid}
                          </span>{" "}
                          IT Security Policy Acknowledgement
                        </h3>

                        <ul>
                          <li>
                            Control Number: <b id="print-ITSecurity-Control-Number"></b>
                          </li>
                          <li>
                            Version: <b id="print-ITSecurity-Version-Number"></b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      The computer network is the property of
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      Dental & Medical Centers and is to be used in an
                      efficient, ethical and legal manner for legitimate
                      official purposes, improving staff and organization’s
                      achievement and development. Staff are provided with
                      access to the computer network to assist them in the
                      performing their jobs and as a support for hospital’s
                      day-to-day Operational activities and patient care
                      documentation. This access, is a privilege and not a
                      right. Additionally, staffs are also provided with access
                      to the Internet through the computer network. All the
                      staffs have the responsibility to use Hospital computer
                      resources and the Internet in a professional, lawful and
                      ethical manner. Abuse of the computer network or the
                      Internet, may result in disciplinary action, including
                      dismissal from employment and other criminal actions under
                      UAE laws.{" "}
                    </p>
                  </div>
                  <div className="gdesc">
                    {/* <ol id="covid-desc"> {Gdesc}</ol> */}
                    <ol>
                      <li>
                        Transmission of patient data is forbidden. Unauthorized
                        disclosure of Medical Center data is against the{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        IT Security Policy.{" "}
                      </li>

                      <li>
                        Medical Center email communication is used between
                        employees for official purposes only and in no event
                        shall be used for any other purposes.
                      </li>
                      <li>
                        Never open or execute a file or e-mail attachment from
                        an unidentified source. If user is unsure of the source,
                        delete it. Never download or run attached files from an
                        unknown email ID.{" "}
                      </li>
                      <li>
                        All users of the Internet should be aware that the
                        Medical Center network creates an audit log reflecting
                        request for service, both in-bound and out-bound
                        addresses, and is periodically reviewed. Bypassing the
                        Medical Center network security by accessing the
                        Internet directly by using unauthorized means is
                        strictly prohibited.{" "}
                      </li>
                      <li>
                        Management at its sole discretion reserves the right to
                        examine e-mails, personal file directories, web access
                        and other information stored on Medical Center
                        computers, at any time without notice.{" "}
                      </li>

                      <li>
                        Personal computers are not allowed to connect to the
                        Medical Center network.{" "}
                      </li>
                      <li>
                        External storage devices & USBs: The usage of USB and
                        other storage devices are prohibited in the Medical
                        Center systems. If an employee requires some data which
                        is related to his/her work, after necessary approvals
                        from HOD and IT Head, the data must be scanned by IT
                        Department to make sure that it’s free from malicious
                        software and virus, after which the details can be
                        transferred.{" "}
                      </li>
                      <li>
                        In the event of a possible virus infection, the user
                        must inform the IT department immediately.{" "}
                      </li>
                      <li>
                        Desktops and laptops must not be left unattended, while
                        signed-on e.g. during lunch, coffee breaks etc. Users
                        must either log off or activate a password-controlled
                        screensaver if they are leaving their PC. The
                        screensaver should be set to activate by default after
                        10 minutes of inactivity.{" "}
                      </li>
                      <li>
                        Each user is allocated an individual username and
                        password. Logon passwords must not be written down or
                        disclosed to another individual. The owner of a
                        particular username will be held responsible for all
                        actions performed.{" "}
                      </li>
                      <li>
                        IT equipment must not be removed from the Medical Center
                        premises. If needed, it is the duty of IT department to
                        move the equipment with proper information and after
                        necessary approvals.{" "}
                      </li>

                      <li>
                        Only licensed software is allowed to be used in the
                        Medical Center environment. Staff found using
                        non-licensed software will be dealt seriously.{" "}
                      </li>
                      <li>
                        Staff are not allowed to take unnecessary printouts for
                        personnel use.{" "}
                      </li>
                      <li>
                        Staff are required to use official mobile phone and
                        landline numbers, only to make calls for official
                        purposes. Any unauthorized use of mobile phone and
                        landline numbers may result in disciplinary action,
                        including dismissal from employment and other criminal
                        actions under UAE laws. Usage of personnel mobile phones
                        at work should be limited.{" "}
                      </li>
                      <li className="print-disclosure-it">
                        Disclosure and use of confidential information include
                        oral communications as well as its display or
                        distribution in tangible physical documentation, in
                        whole or in part, from any source or in any format
                        (e.g., paper, digital, electronic, internet, social
                        networks like Facebook or WhatsApp, posting, magnetic or
                        optical media, film, etc.).{" "}
                        <span className="print-Covidform_unitname">
                          {" "}
                          {officename}
                        </span>
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        is the record owner, and the Employee has no right or
                        ownership interest in any confidential information.{" "}
                      </li>
                      <li>
                        Confidential information will not be used or disclosed
                        by the Employee in violation of any applicable law or
                        other limitations as put in place by Practice from time
                        to time. The employee will ensure that he/she will use
                        and access only the information necessary to perform the
                        Employee’s duties and will not disclose confidential
                        information unless expressly authorized in writing to do
                        so, by the HOD/ HR/ Management.{" "}
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4>Employee Acknowledgment</h4>
                    <p>
                      I hereby confirm that I read and understood the IT
                      Security policy (refer under approved policies) and
                      confirm that I will abide by the rules and regulations of
                      the policy.{" "}
                    </p>
                  </div>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid8"
                          className="print-control currentuser_name covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>

                      {/* <div
                      style={{ display: "none" }}
                      className="form-group relative dynamiclistusername"
                    >
                      <span
                        //  type="text"
                        id="Employee_name_ack_ploicy"
                        className="print-control employeename10 print-Employeename_covid_ack_ploicy covidviewdisable"
                      // autoComplete="off"
                      />
                      <span className="floating-label date_floating_label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Employeename-ackcovid"
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
                          <div className="form-check">
                            <span className="form-check-label"> Signature</span>
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

              <div className="print-acceptance-it">
                <div className="emp_policy_ack_div">
                  <div>
                    <div className="clearfix">
                      <div className="header-title-units">

                        <h3 style={{ float: "left", width: "380px" }}>i.){" "}
                          <span className="print-DynamicCovidform_unitname dynamic-unit-securityit print_color_unit_name">
                            {dynamicUnitnamecovid}
                          </span>{" "}
                          IT Acceptable Usage Policy – Acknowledgement{" "}
                        </h3>
                        <ul>
                          <li>
                            Control Number: <b id="print-ITAcceptable-Control-Number"></b>
                          </li>
                          <li>
                            Version: <b id="print-ITAcceptable-Version-Number"></b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      The computer network is the property of{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      Dental & Medical Centers and is to be used in an
                      efficient, ethical and legal manner for legitimate
                      official purposes, improving staff and organization’s
                      achievement and development.{" "}
                    </p>
                    <p>
                      Staff are provided with access to the computer network to
                      assist them in the performing their jobs and as a support
                      for group’s day-to-day Operational activities and patient
                      care documentation. This access is a privilege and not a
                      right.{" "}
                    </p>
                    <p>
                      Additionally, staffs are also provided with access to the
                      Internet through the computer network. All the staffs have
                      the responsibility to use{" "}
                      <span className="print-Covidform_unitname">
                        {" "}
                        {officename}
                      </span>
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      group computer resources and the Internet in a
                      professional, lawful and ethical manner. Abuse of the
                      computer network or the Internet, may result in
                      disciplinary action, including dismissal from employment
                      and other criminal actions under UAE laws{" "}
                    </p>
                  </div>

                  <div className="General_Ownership">
                    <h4>General Use And Ownership </h4>
                    <ol className="common_covid">
                      <li>
                        1.While{" "}
                        <span className="print-Covidform_unitname">
                          {" "}
                          {officename}
                        </span>
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        desires to provide a reasonable level of privacy, users
                        should be aware that the data they create, use, or
                        process on the corporate systems remains the property of{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        . Because of the need to protect{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        unit’s network, management cannot guarantee the privacy
                        of information on any computing device belonging to{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        .{" "}
                      </li>
                      <li>
                        2. Employees are responsible for exercising good
                        judgment regarding the reasonableness of personal use
                        like Desktop, Network, Internet and Data.{" "}
                      </li>
                      <li>
                        3. For security and network maintenance purposes,
                        authorized individuals within{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        may monitor equipment, systems, emails, and network
                        traffic at any time.{" "}
                      </li>
                      <li>
                        4.{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        reserves the right to audit networks and systems on a
                        periodic basis to ensure compliance with this policy,
                        business objectives and any applicable laws or
                        regulations.{" "}
                      </li>
                      <li>
                        5. For minimizing risk and optimizing resources staffs
                        are accountable for shutting down the systems on
                        completion of the duty shifts.{" "}
                      </li>
                      <li>
                        6. Patient Data are not allowed to print without
                        approval.{" "}
                      </li>
                    </ol>
                  </div>
                  {/* <div className=" Email_Usage">
<h4>Email Usage</h4>
<ul>{EmailUsesss}</ul>
</div> */}
                  <div className=" Email_Usage">
                    <h4>Email Usage</h4>
                    <ol className="common_covid">
                      <li>
                        1. Users shall ensure that all electronic communication
                        resources provided by IT Department are used for
                        official purpose only.{" "}
                      </li>
                      <li>
                        2. Users shall refrain from using the official
                        electronic communication resources for personal
                        communications/correspondences, including social media.
                      </li>
                      <li>
                        3. Users shall be held responsible for any misuse of
                        electronic communication correspondences from their
                        accounts, arising from non-compliance to the information
                        security policies.{" "}
                      </li>
                      <li>
                        4. Users shall refrain from accessing or using any
                        electronic communication account of other Users, unless
                        it is authorized/delegated by the account owner with
                        proper business justification, and this shall be carried
                        out through the responsible business unit and without
                        sharing the password.{" "}
                      </li>
                      <li>
                        5. Company emails are not allowed to use in social
                        media.{" "}
                      </li>
                      <li>
                        6. Mass emailing is not allowed unless a written
                        approval from management is granted.{" "}
                      </li>
                      <li>
                        7. Patient Data are not allowed to send through email
                        without approval.{" "}
                      </li>
                    </ol>
                  </div>
                  {/* <div className="Internet_Usage">
<h4 > Internet Usage </h4>
<ul>{InternetUsagess}</ul>
</div> */}

                  <div className="Internet_Usage">
                    <h4> Internet Usage </h4>
                    <ol className="common_covid">
                      <li>
                        1. Users should make use of internet primarily for
                        official purposes and to fulfill
                      </li>

                      <li>
                        2. The obligation towards their day-to-day business
                        operation.{" "}
                      </li>
                      <li className="print_procedure_it">
                        3. Users are not allowed to post statements/information
                        or comments on the internet that could damage the
                        reputation of UAE Government and/or{" "}
                        <span className="print-Covidform_unitname">
                          {" "}
                          {officename}
                        </span>
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        units.{" "}
                      </li>
                      <li >
                        4. Users shall refrain from using the internet to
                        download, upload or install any software from the
                        internet or any other third party’s unlicensed software.{" "}
                      </li>
                      <li>
                        5. Users shall refrain from using unauthorized websites
                        and tampering the restrictions imposed on third-party
                        websites.{" "}
                      </li>
                      <li>
                        6. Program on any hardware/equipment belonging to the
                        units, unless the User is authorized according to the
                        nature of his/her work.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className=" Desktop_Laptopusage">
                    <h4> Desktop & Laptop Usage </h4>
                    {/* <ul>{DesktopLaptopusagess}</ul> */}
                    <ol className="common_covid">
                      <li>
                        1. Users shall ensure using Computer officially provided
                        by IT department to fulfill the obligations towards
                        their day to day business operations.{" "}
                      </li>
                      <li>
                        2. Users are not allowed to install any unlicensed or
                        illegal copies of software or applications on the
                        officially provided devices.{" "}
                      </li>
                      <li>
                        3. IT approval is required for the usage of application
                        or software.{" "}
                      </li>
                    </ol>
                  </div>

                  <div className="Anti_virus">
                    <h4> Antivirus </h4>
                    {/* <ul>{Antivirusss}</ul> */}
                    <ol className="common_covid">
                      <li>
                        1. Make sure that all the workstations (Laptops and
                        Desktops) are installed with company approved antivirus
                        with the latest version with updates.{" "}
                      </li>
                      <li>
                        2. Users shall not disrupt the auto virus scan scheduled
                        on their devices. If the scan is affecting system
                        performance, users should contact IT Service Desk for
                        resolution.{" "}
                      </li>
                    </ol>
                  </div>
                  {/* <div className="Removable_Media">
<h4 >       Removable Media   </h4>
<ul>{RemovableMediass}</ul>
</div> */}

                  <div className="Removable_Media">
                    <h4> Removable Media </h4>
                    <ol className="common_covid">
                      <li>
                        1. Removable media will be provided with authorized
                        approval with clear business case.
                      </li>
                      <li>
                        2. Staff who have been authorized to use removable media
                        for the purposes of their job roles are responsible for
                        the secure use of those removable media as required by
                        this policy.{" "}
                      </li>
                      <li>
                        3. Staff shall not copy any of the{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        unit’s any form of information for a removable media to
                        any third-party computers, cloud storage or to their
                        personal computers.{" "}
                      </li>
                      <li>
                        4. The safety of the device is the responsibility of the
                        staff who is authorized.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="Clear_Deskss">
                    <h4> Clear Desk & Clear Screen</h4>
                    {/* <ul>{ClearDeskss}</ul> */}
                    <ol className="common_covid">
                      <li>
                        1.Users shall keep their desks clean and clear of
                        whenever leaving the office unattended as detailed in
                        the clear desk & clear screen policy.{" "}
                      </li>
                      <li>
                        2. User shall ensure that any written on white boards
                        are wiped off, once the discussion is complete, and
                        shall ensure that such information is not visible from
                        outside the room during the meetings.{" "}
                      </li>
                      <li>
                        3. Users shall ensure that they lock the computer screen
                        whenever leaving their desks.
                      </li>
                    </ol>
                  </div>
                  <div className="Access_Control">
                    <h4> Access Control </h4>
                    <ol className="common_covid">
                      {/* {AccessControlss} */}
                      <li>
                        1. Users shall be aware that all access privileges shall
                        be allocated on a “need to use” basis, only the minimum
                        privileges required for the User’s functional role shall
                        be allocated.{" "}
                      </li>
                      <li>
                        2. Users shall refrain from accessing information
                        systems with credentials of other employees or
                        affiliates.{" "}
                      </li>
                      <li>
                        3. Users shall maintain their exclusive access
                        privileges on information systems by not allowing anyone
                        else to operate from their account.{" "}
                      </li>
                    </ol>
                  </div>

                  <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

                  <div className="Passwords_Usage" style={{ marginTop: "20px" }}>
                    <h4> Passwords Usage</h4>
                    <ol className="common_covid">
                      {/* {PasswordsUsagess} */}
                      <li>
                        1.Users shall not share their passwords with anyone
                        including their colleagues, friends, family members etc.{" "}
                      </li>
                      <li>
                        2. Users shall not share their passwords with anyone
                        including their colleagues, friends, family members etc.{" "}
                      </li>

                      <li>
                        3. Passwords shall be unique in nature. Users shall
                        avoid using the same password for all
                        systems/applications.{" "}
                      </li>

                      <li>
                        4. Users shall take extreme caution while using
                        passwords in public places or in the presence of other
                        people.{" "}
                      </li>

                      <li>
                        5. Users shall be cautious while entering passwords and
                        ensure that passwords are entered only in the correct
                        password field provided.{" "}
                      </li>

                      <li>
                        6. Users shall ensure that passwords are not stored in
                        clear text in any form.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="Personal_Devices">
                    <h4>Personal Devices </h4>
                    <ol className="common_covid">
                      <li>
                        1. The usage of personal devices is not allowed in the
                        office network.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="Physical_Security">
                    <h4> Physical Security </h4>
                    <ol className="common_covid">
                      {/* {PhysicalSecurityss} */}
                      <li>
                        1. Employees shall visibly wear the employee ID card
                        issued by the [HR section/department or the function
                        assigned with HR responsibilities] while they are inside
                        the premises of Entity.{" "}
                      </li>
                      <li>
                        2. Visitors shall be escorted at all times by an
                        authorized employee while in Medical Center premises.
                      </li>
                      <li>
                        3. Users shall refrain from entering critical areas
                        (such as data center, filing rooms) without having
                        business justification and without authorization from
                        the respective owner.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="Information_Security">
                    <h4> Information Security Incidents Management </h4>
                    <ol className="common_covid">
                      {/* {InformationSecurityManagements} */}
                      <li>
                        1. Users shall promptly report information security
                        incidents either to [Information Security Manager or the
                        job title assigned with responsibilities of managing
                        information security] or any member of [Information
                        Security Section/Department or the function assigned
                        with information security responsibilities].{" "}
                      </li>
                      <li>
                        2. Users shall support the information security incident
                        response team, to contain the incident and take
                        necessary corrective & preventive actions.{" "}
                      </li>
                      <li>
                        3. Users shall refrain from tampering any source of
                        evidence or audit logs on information systems that may
                        be required for future audit and prosecution purposes.{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="uses_formations">
                    <h4>Usage Of Confidential Information </h4>
                    <ol className="common_covid">
                      {/* {usesConfidentialInformations} */}
                      <li>
                        1. Confidential information will not be used or
                        disclosed by the Employee in violation of any applicable
                        law or other limitations as put in place by practice
                        from time to time. Employee will ensure that he/she will
                        use and access only the information necessary to perform
                        the Employee’s duties and will not disclose confidential
                        information unless expressly authorized in writing to do
                        so, by the HOD/ HR/ Management.{" "}
                      </li>
                      <li>
                        2. Disclosure and use of confidential information
                        includes oral communications as well as its display or
                        distribution in tangible physical documentation, in
                        whole or in part, from any source or in any format
                        (e.g., paper, digital, electronic, internet, social
                        networks like Facebook or WhatsApp, posting, magnetic or
                        optical media, film, etc.).{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        is the record owner, and the Employee has no right or
                        ownership interest in any confidential information.
                      </li>
                    </ol>
                  </div>

                  <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

                  <div className="EquipmentHandles" style={{ marginTop: "20px" }}>
                    <h4> Equipment Handle </h4>
                    {/* <ul>{EquipmentHandles}</ul> */}
                    <ol className="common_covid">
                      <li>
                        1. IT equipment must not be removed from the{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        unit premises. If needed, it is the duty of IT
                        department to move the equipment with proper information
                        and after necessary approvals
                      </li>

                      <li>
                        2. Desktops and laptops must not be left unattended,
                        while signed-on e.g., during lunch, coffee breaks etc.
                        Users must either log off or activate a
                        password-controlled screensaver if they are leaving
                        their PC.{" "}
                      </li>

                      <li >
                        3. I understand that I need to take proper and
                        reasonable care of the assets at all times, I shall not
                        misuse the same and ensure to take all necessary
                        measures to protect the asset of{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        .{" "}
                      </li>

                      <li>
                        4. I undertake that{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        will have the complete right to take back the asset at
                        any deems fit without assigning reason for the same.{" "}
                      </li>

                      <li>
                        5. I agree that in the event of any loss/damage to the
                        asset, I will immediately lodge a police complaint and
                        submit the original copy to HR Department.{" "}
                      </li>

                      <li>
                        6. I am responsible to return the assets to the
                        concerned departments upon completion of my tenure with{" "}
                        <span className="print-DynamicCovidform_unitname">
                          {" "}
                          {dynamicUnitnamecovid}
                        </span>
                        on my last working day.{" "}
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4> Acknowledgement</h4>
                    <p>
                      I hereby confirm that I read and understood the IT
                      Acceptable Usage Policy (refer under approved policies)
                      and confirm that I will abide by the rules and regulations
                      of the policy
                    </p>
                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid9"
                          className="print-control currentuser_name ackempname covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>

                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //    type="text"
                          id="Employeeid-ack-covid4"
                          className="print-control print-empidcovid  covidviewdisable"
                        //  autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee ID
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-empnumber-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //  type="text"
                          id="Employdept-ack-covid3"
                          className="print-control print-employeedeptcovid covidviewdisable"
                        //autoComplete="off"
                        />
                        <span className="floating-label date_floating_label">
                          Employee Department <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeedept-ackcovid"
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
                            <span className="form-check-label">
                              {" "}
                              Employee Signature
                            </span>
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
              {/* <div className="first_paragrph_firstbreak">
                <div className="emp_policy_ack_div">
                  <div>
                    <h3 className="print-con-generalit">
                      <span className="print-DynamicCovidform_unitname dynamic-unit-securityit print_color_unit_name">
                        {dynamicUnitnamecovid}
                      </span>
                      - Employee Confidentiality Statement{" "}
                    </h3>
                    <p>
                      I, the undersigned, as an employee of{" "}
                      <span className="print-DynamicCovidform_unitname">
                        {" "}
                        {dynamicUnitnamecovid}
                      </span>
                      or associated healthcare facility, hereby agree that I
                      shall not disclose or communicate to any unauthorized
                      person, confidential information that I became aware of
                      during the course of my employment.
                    </p>
                    <p>
                      Confidential information is understood by me to be any
                      medical, financial or administrative information related
                      to the healthcare organization.
                    </p>
                    <p>
                      {" "}
                      At the end of my employment, I agree to return all
                      medical, financial, administrative and all other
                      documents, manuals, and data that I have received and/ or
                      generated during my employment to my Manager/Supervisor.{" "}
                    </p>

                    <p>
                      I understand that any violation on my part of the above
                      will subject me to formal disciplinary action and/or legal
                      action
                    </p>
                  </div>

                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-Employeename-ack-covid10"
                          className="print-control currentuser_name ackempname covidviewdisable common_fullname_disable"
                        ></span>
                        <span className="floating-label date_floating_label">
                          Employee Name <i className="required">*</i>
                        </span>
                      </div>
                      
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                         
                          id="Jobtitle-ack-covid1"
                          className="print-control print-job_title_covid covidviewdisable"
                      
                        />
                        <span className="floating-label date_floating_label">
                          Job Title <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-JobTitle-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                        
                          id="Employdept-ack-covid4"
                          className="print-control print-employeedeptcovid covidviewdisable"
                       
                        />
                        <span className="floating-label date_floating_label">
                          Employee Department <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeedept-ackcovid"
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
                          id="print-covide-country-codes"
                          className="print-control covidviewdisable"
                        >
                         
                        </span>
                        <span className="floating-label ">
                          Country Code <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-countrycodesackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                      
                          id="print-Employcontact-ack-covid"
                          className="print-control covidviewdisable"
                       
                        />
                        <span className="floating-label date_floating_label">
                          Contact Number <i className="required">*</i>
                        </span>
                      </div>
                      <span
                        className="error-validation"
                        id="err-Employeecontact-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span>

                      <span
                        className="error-validation"
                        id="err-format-ackcovid"
                        style={{ color: "red", display: "none" }}
                      >
                        Characters are not allowed.
                      </span>
                    </div>
                  </div>

                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">
                              Signature of Employee
                            </span>
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
                  <div className="row form print_rowform_generalit">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-hr-name-listdata"
                          className="print-control  covidviewdisable"
                        />
                        <span className="floating-label date_floating_label">
                          HR Name <i className="required">*</i>
                        </span>
                      </div>
                     
                    </div>
                  </div>
                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">
                              HR Signature{" "}
                            </span>
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
               
              </div> */}
              <div className="pageborder"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
