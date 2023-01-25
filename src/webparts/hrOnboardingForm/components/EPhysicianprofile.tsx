import * as React from "react";
// import styles from "./LoaNewForm.module.scss";
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
import { IFieldInfo } from "@pnp/sp/fields/types";

let counter = 2;
let count = 2;


export interface ILetterAuthorizationNewState {
  Language: any[];
  Profession: any[];
  Population: any[];
  Licensing: any[];
  Speciality: any[];
  Medical: any[];
  Country: any[];
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  BusinessMaster: any[];
  TCDescription: any[];
  Alreadysublitted: boolean;
  Dynamiclogo: any[];
  ImageSrcephysician: string;
  EphyProfileSubmissionStatus: string;
  ONBSessionID: string;
  isPrevFormSubmitted: boolean;
  VersionNumber: any[];
  ControlNumber: any[];
  EphyFormControlNumber: any[];
  Ephyformversionno: any[];
  HrCompleteStatus: boolean;
}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");
var Description;
var officename = "";
var LogoUrl;
let ephysicianItemID;
var ImageSrcephysician = "";
var Mode;
var ephymode;
var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;

var Ephysicianlistid: number
var GlobalModes = "";
var ControlNumber;
var VersionNumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class LoaNewForm extends React.Component<
  IletterofauthorizationProps,
  ILetterAuthorizationNewState,
  {}
> {
  constructor(
    props: IletterofauthorizationProps,
    state: ILetterAuthorizationNewState
  ) {
    super(props);
    this.state = {
      Language: [],
      Profession: [],
      Population: [],
      Licensing: [],
      Speciality: [],
      Medical: [],
      Country: [],
      CurrentUserName: [],
      CurrentUserDesignation: [],
      BusinessMaster: [],
      TCDescription: [],
      Alreadysublitted: true,
      Dynamiclogo: [],
      ImageSrcephysician: "",
      EphyProfileSubmissionStatus: "Inprogress",
      ONBSessionID: "",
      isPrevFormSubmitted: false,
      VersionNumber: [],
      ControlNumber: [],
      EphyFormControlNumber: [],
      Ephyformversionno: [],
      HrCompleteStatus: false
    };
  }

  public componentDidMount() {
    // this.Degreeawarded();
    this.ephyremovevalidation()
    this.GetCurrentUserDetails();
    this.GetLanguagesItems();
    this.GetProfessionItems();
    this.GetLicensingItems();
    this.GetSpecialityPopulationItems();
    this.GetSpecialityItems();
    this.GetMedicalDegreeItems();
    this.GetCountryInformationItems();
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
    $("#txt-current-date").val(moment().format("YYYY-MM-DD"));
    const url: any = new URL(window.location.href);
    ephysicianItemID = url.searchParams.get("ephysicianItemID");
    Mode = url.searchParams.get("EphysicianMode");
    ephymode = url.searchParams.get("EphysicianMode");
    GlobalModes = url.searchParams.get("mdeopn");
    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    if (GlobalFormOpenedMode == "View") {

      this.GetEPhysicianAuthViewItem(ephysicianItemID);
      this.GetEPhysicianAuthViewItemForPrint(ephysicianItemID);

    } else if (GlobalFormOpenedMode == "Edit") {
      this.GetephysicianiditemEditmode(ephysicianItemID);


    }

  }

  public GetEPhysicianAuthViewItemForPrint(ID) {



    $(".print-IamgeephysicianItemID").show();
    // $(".ephytitle").attr("style", "color:#00A36C");
    // $(".print-ephysucessicon").show()

    setTimeout(() => {
      newweb.lists.getByTitle("E Physician Profile Transaction")
        .items.select(
          "ID",
          "LanguagesSpoken",
          "SpecialityPopulation",
          "LicensingTitle",
          "Speciality",
          "ScopeofServices",
          "LicenseNumber",
          "Membership",
          "DegreeAwarded",
          "OtherDegree",
          "University",
          "College",
          "DateofEnrollment",
          "ProfessionType",
          "CountryofIssue",
          "AuthorityName",
          "ONBSessionID",
          "Unitlogo",
          "DateofGraduation",
          "ControlNumber",
          "VersionNumber"
        ).filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
          if (result.length != 0) {
            $("#print-ephy-Control-Number").text(result[0].ControlNumber);
            $("#print-ephy-Version-Number").text(result[0].VersionNumber);
            //(result);
            //  $(".print-lang-ephy").text(result[0].LanguagesSpoken);
            $("#print-SpecialityPopulation").text(result[0].SpecialityPopulation);
            $(".print-licence-title").text(result[0].LicensingTitle);
            //  $("#print-ProfessionType").text(result[0].ProfessionType);
            $("#print-Speciality").text(result[0].Speciality);
            $("#print-ScopeofServices").text(result[0].ScopeofServices)
            $("#print-LicenseNumber").text(result[0].LicenseNumber);
            $("#print-Membership").text(result[0].Membership);
            $("#print-MedicalDegree").text(result[0].DegreeAwarded);
            // $("#print-degreeawarded").text(result.OtherDegree);
            $("#print-University").text(result[0].University);
            $("#print-College").text(result[0].College);
            $("#print-ProfessionType").text(result[0].ProfessionType);
            $("#print-DateofEnrollment").text(moment(result[0].DateofEnrollment).format("DD-MM-YYYY"));
            $("#print-DateofGraduation").text(moment(result[0].DateofGraduation).format("DD-MM-YYYY"));

            $("#print-AuthorityName").text(result[0].AuthorityName);
            $("#print-LanguageKnown").text(result[0].LanguagesSpoken);
            ImageSrcephysician = result[0].Unitlogo;
            this.setState({ ImageSrcephysician: result[0].Unitlogo });

            setTimeout(() => {
              $("#print-CountryofIssue").text($("#CountryofIssue").find(":selected").text());
            }, 500);
          }
          newweb.lists.getByTitle("Board Certification Transaction").items.select("Issue", "Graduation", "Enrollment", "TrainingFacility", "OrderNo", "CertificationTitle").filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true).get().then((result) => {
            if (result.length != 0) {
              for (var i = 0; i < result.length; i++) {
                var OrderNo = result[i].OrderNo;
                var Title = result[i].CertificationTitle;
                var Training = result[i].TrainingFacility;
                var Roll = moment(result[i].Enrollment).format("DD-MM-YYYY");
                var Graduate = moment(result[i].Graduation).format("DD-MM-YYYY")
                var Country = result[i].Issue;



                var newRow = $("<tr>");
                var cols = "";
                //cols += '<td><input className="tble-txt-row-order" type="text" disabled  value="' + OrderNo + '"></input></td>';
                cols += '<td><span className="CertificationTitle" >' + result[i].CertificationTitle + '</span></td>';
                cols += '<td><span className="TrainingFacility" >' + result[i].TrainingFacility + '</span></td>';
                cols += '<td><span className="Enrollment">' + moment(result[i].Enrollment).format("DD-MM-YYYY"); + '</span></td>';
                // cols += '<td><span className="Graduation">' + Graduate + '</span></td>';
                // cols += '<td><span className="Issue">' + Country + '</span></td>';

                newRow.append(cols);
                $("table #print-tbody-table-dynamicfirst").append(newRow);

              }
              if (result.length < 7)
                var Boardremainingrow: number = 7 - result.length
              for (var i = 0; i < Boardremainingrow; i++) {




                var newRow = $("<tr>");
                var cols = "";

                cols += '<td><span className="CertificationTitle" >' + "-" + '</span></td>';
                cols += '<td><span className="TrainingFacility" >' + "-" + '</span></td>';
                cols += '<td><span className="Enrollment">' + "-" + '</span></td>';
                // cols += '<td><span className="Graduation">' + "-" + '</span></td>';
                // cols += '<td><span className="Issue">' + "-" + '</span></td>';

                newRow.append(cols);
                $("table #print-tbody-table-dynamicfirst").append(newRow);

              }

            }

            else {
              for (var i = 0; i < 7; i++) {
                var newRow = $("<tr>");
                var cols = "";
                cols += '<td><span className="CertificationTitle" >' + "-" + '</span></td>';
                cols += '<td><span className="TrainingFacility" >' + "-" + '</span></td>';
                cols += '<td><span className="Enrollment">' + "-" + '</span></td>';
                // cols += '<td><span className="Graduation">' + "-" + '</span></td>';
                // cols += '<td><span className="Issue">' + "-" + '</span></td>';

                newRow.append(cols);
                $("table #print-tbody-table-dynamicfirst").append(newRow);

              }
            }
          });


          newweb.lists.getByTitle("Post Graduate Certification").items.select("ID", "Country", "TrainingType", "GraduationDate", "EnrollmentDate", "College", "TraineeCertification", "OrderNo").filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
            if (result.length != 0) {
              for (var i = 0; i < result.length; i++) {
                var OrderNo = result[i].OrderNo;
                var Trainee = result[i].TraineeCertification;
                var college = result[i].college;
                var Roll = moment(result[i].EnrollmentofDate).format("DD-MM-YYYY")
                var Graduate = moment(result[i].GraduationDate).format("DD-MM-YYYY")
                var Type = result[i].TrainingType;
                var Country = result[i].Country;

                var newRow = $("<tr>");
                var cols = "";
                // cols += '<td><input className="tble-txt-row-order" type="text" disabled  value="' + OrderNo + '"></input></td>';
                cols += '<td><span className="CertificationTitle table-border-only" >' + result[i].TraineeCertification + '</span></td>';
                cols += '<td><span   className="Issue table-border-only">' + result[i].College + '</span></td>';
                cols += '<td><span className="TrainingFacility table-border-only" >' + result[i].TrainingType + '</span></td>';
                cols += '<td><span   className="EnrollmentofDate table-border-only" >' + moment(result[i].EnrollmentofDate).format("DD-MM-YYYY") + '</span></td>';
                // cols += '<td><span   className="GraduationofDate table-border-only" >' + Graduate + '</span></td>';
                // cols += '<td><span   className="Country table-border-only" disabled >' + Country + '</span></td>';

                newRow.append(cols);
                $("table #print-tbody-table-dynamicfirst2").append(newRow);
              }

              if (result.length < 5) {
                var postremainingrow: number = 5 - result.length

                for (var i = 0; i < postremainingrow; i++) {


                  var newrow = $("<tr>");
                  var cols = "";

                  cols += '<td><span className="CertificationTitle table-border-only" >' + "-" + '</span></td>';
                  cols += '<td><span   className="Issue table-border-only">' + "-" + '</span></td>';
                  cols += '<td><span className="TrainingFacility table-border-only" >' + "-" + '</span></td>';
                  cols += '<td><span   className="EnrollmentofDate table-border-only" >' + "-" + '</span></td>';
                  // cols += '<td><span   className="GraduationofDate table-border-only" >' + "-" + '</span></td>';
                  // cols += '<td><span   className="Country table-border-only" disabled >' + "-" + '</span></td>';

                  newrow.append(cols);
                  $("table #print-tbody-table-dynamicfirst2").append(newrow);
                }
              }
            }

            else {
              for (var i = 0; i < 5; i++) {


                var newRow = $("<tr>");
                var cols = "";

                cols += '<td><span className="CertificationTitle table-border-only" >' + "-" + '</span></td>';
                cols += '<td><span   className="Issue table-border-only">' + "-" + '</span></td>';
                cols += '<td><span className="TrainingFacility table-border-only" >' + "-" + '</span></td>';
                cols += '<td><span   className="EnrollmentofDate table-border-only" >' + "-" + '</span></td>';
                // cols += '<td><span   className="GraduationofDate table-border-only" >' + "-" + '</span></td>';
                // cols += '<td><span   className="Country table-border-only" disabled >' + "-" + '</span></td>';

                newRow.append(cols);
                $("table #print-tbody-table-dynamicfirst2").append(newRow);
              }
            }
          });


        })

    }, 1000);

  }

  public GetEPhysicianAuthViewItem(ID) {
    $(".tr_firstrowphy").hide()
    $(".tr_secondrowphy").hide()
    $(".print-btnephy").show()
    $("#ephysiciansubmitbutton").hide()
    $("#ephysician-updatebtn").hide()
    $(".ephysicianimg-icon").hide()
    $('input').attr('disabled', 'disabled');
    $(".add-bth-wrap-ephyician").hide();
    $(".IamgeephysicianItemID").show();
    $(".view-th-hide").hide();
    // $(".ephytitle").attr("style", "color:#00A36C");


    setTimeout(() => {

      newweb.lists.getByTitle("E Physician Profile Transaction")
        .items.select(
          "ID",
          "LanguagesSpoken",
          "SpecialityPopulation",
          "LicensingTitle",
          "Speciality",
          "ScopeofServices",
          "LicenseNumber",
          "Membership",
          "DegreeAwarded",
          "OtherDegree",
          "University",
          "College",
          "DateofEnrollment",
          "ProfessionType",
          "CountryofIssue",
          "AuthorityName",
          "ONBSessionID",
          "Unitlogo",
          "DateofGraduation"
        ).filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
          if (result.length != 0) {

            $(".ephysucessicon").show()

            $(".lang-ephy").val(result[0].LanguagesSpoken);
            $("#LanguageKnown").val(result[0].LanguagesSpoken);
            $("#SpecialityPopulation").val(result[0].SpecialityPopulation);
            $(".licence-title").val(result[0].LicensingTitle);
            $("#Speciality").val(result[0].Speciality);
            $("#ScopeofServices").val(result[0].ScopeofServices)
            $("#LicenseNumber").val(result[0].LicenseNumber);
            $("#Membership").val(result[0].Membership);
            $("#MedicalDegree").val(result[0].DegreeAwarded);
            $("#ProfessionType").val(result[0].ProfessionType);
            // $("#degreeawarded").val(result[0].OtherDegree);

            $("#University").val(result[0].University);
            $("#College").val(result[0].College);
            $("#DateofEnrollment").val(moment(result[0].DateofEnrollment).format("YYYY-MM-DD"));
            $("#DateofGraduation").val(moment(result[0].DateofGraduation).format("YYYY-MM-DD"));
            $("#CountryofIssue").val(result[0].CountryofIssue);
            $("#AuthorityName").val(result[0].AuthorityName);
            ImageSrcephysician = result[0].Unitlogo;
            this.setState({ ImageSrcephysician: result[0].Unitlogo })
          }
          newweb.lists.getByTitle("Board Certification Transaction").items.select("Issue", "Graduation", "Enrollment", "TrainingFacility", "OrderNo", "CertificationTitle").filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true).get().then((result) => {
            if (result.length != 0) {
              for (var i = 0; i < result.length; i++) {
                var OrderNo = result[i].OrderNo;
                var Title = result[i].CertificationTitle;
                var Training = result[i].TrainingFacility;
                var Roll = moment(result[i].Enrollment).format("YYYY-MM-DD");
                var Graduate = moment(result[i].Graduation).format("YYYY-MM-DD");
                var Country = result[i].Issue;

                $(".tr_firstrowphy").hide()

                var newRow = $("<tr>");
                var cols = "";
                cols += '<td><input type="hidden" id="hdn-ephytab-itm-id" value="' + result[i].ID + '"></input><input type="text" className="CertificationTitle"    value="' + result[i].CertificationTitle + '" disabled></input></td>';
                cols += '<td><input type="text" className="TrainingFacility"   value="' + result[i].TrainingFacility + '"disabled></input></td>';
                cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '"  className="Enrollment"   value="' + result[i].Enrollment + '"disabled></input></td>';
                cols += '<td><input type= "date"  max="' + moment().format("DD-MM-YYYY") + '"  className="Graduation"   value="' + result[i].Graduation + '"disabled></input></td>';
                cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '"   className="Issue"   value="' + result[i].Issue + '"disabled></input></td>';

                newRow.append(cols);
                $("table #tbody-table-dynamicfirst").append(newRow);


              }
            }
          });



          newweb.lists.getByTitle("Post Graduate Certification").items.select("ID", "Country", "TrainingType", "GraduationDate", "EnrollmentDate", "College", "TraineeCertification", "OrderNo").filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
            if (result.length != 0) {
              for (var i = 0; i < result.length; i++) {
                var OrderNo = result[i].OrderNo;
                var Trainee = result[i].TraineeCertification;
                var college = result[i].college;
                var Roll = moment(result[i].EnrollmentofDate).format("YYYY-MM-DD");
                var Graduate = moment(result[i].GraduationDate).format("YYYY-MM-DD");
                var Type = result[i].TrainingType;
                var Country = result[i].Country;


                var newRow = $("<tr>");
                var cols = "";

                cols += '<td><input type="hidden" id="hdn-ephy-post-itm-id" value="' + result[i].ID + '"></input><input type="text" id="TraineeCertification" disabled class="CertificationTitle table-border-only"    value="' + result[i].TraineeCertification + '"disabled></input></td>';
                cols += '<td><input type= "text"  class="Issue table-border-only"  id="College"   value="' + result[i].College + '"></input></td>';
                cols += '<td><input type="text" class="TrainingFacility table-border-only" id="TrainingType"   value="' + result[i].TrainingType + '"disabled></input></td>';
                cols += '<td><input type= "date"  max="' + moment().format("DD-MM-YYYY") + '"id="EnrollmentofDate"  class="EnrollmentofDate table-border-only"   value="' + result[i].EnrollmentDate + '"disabled></input></td>';
                cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="GraduationofDate" class="GraduationofDate table-border-only"   value="' + result[i].GraduationDate + '"disabled></input></td>';
                cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="Countryofissuetwo"  class="Country table-border-only"   value="' + result[i].Country + '"disabled></input></td>';

                newRow.append(cols);
                $("table #tbody-table-dynamicfirst2").append(newRow);
              }
            }
          });



        })

      $("#ephysiciansubmitbutton").hide();
      $("#ephysician-updatebtn").hide();
      $('#Ephycust-table-block tbody tr').find("input").prop('disabled', true);
      $('#Ephycust-table-block2 tbody tr').find("input").prop('disabled', true);
      $('select').attr('disabled', 'disabled');

    }, 1000);
  }


  public GetephysicianiditemEditmode(ID) {
    $(".txt-current-date").prop('disabled', false);
    $(".ephysicianimg-icon").hide()
    $("#ephysiciansubmitbutton").hide()
    $("#ephysician-updatebtn").show()
    $(".IamgeephysicianItemID").show();

    newweb.lists.getByTitle("E Physician Profile Transaction")
      .items.select(
        "ID",
        "LanguagesSpoken",
        "SpecialityPopulation",
        "LicensingTitle",
        "Speciality",
        "ScopeofServices",
        "LicenseNumber",
        "Membership",
        "DegreeAwarded",
        "OtherDegree",
        "University",
        "College",
        "DateofEnrollment",
        "ProfessionType",
        "CountryofIssue",
        "AuthorityName",
        "ONBSessionID",
        "Unitlogo",
        "DateofGraduation",
        "ControlNumber",
        "VersionNumber",
      ).filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
        if (result.length != 0) {
          $(".ephysucessicon").show()
          Ephysicianlistid = result[0].ID
          ControlNumber = result[0].ControlNumber
          VersionNumber = result[0].VersionNumber

          $(".lang-ephy").val(result[0].LanguagesSpoken);
          $("#LanguageKnown").val(result[0].LanguagesSpoken);
          $("#LicenseNumber").val(result[0].LicenseNumber);
          $("#Membership").val(result[0].Membership);

          setTimeout(() => {
            $("#Speciality").val(result[0].Speciality);
            $("#ScopeofServices").val(result[0].ScopeofServices)
          }, 2000);

          setTimeout(() => {
            $("#MedicalDegree").val(result[0].DegreeAwarded);
            $("#ProfessionType").val(result[0].ProfessionType);
          }, 2000);

          setTimeout(() => {
            $("#SpecialityPopulation").val(result[0].SpecialityPopulation);
            $(".licence-title").val(result[0].LicensingTitle);
          }, 2000);
          // $("#degreeawarded").val(result[0].OtherDegree);

          $("#University").val(result[0].University);
          $("#College").val(result[0].College);
          $("#DateofEnrollment").val(moment(result[0].DateofEnrollment).format("YYYY-MM-DD"));
          $("#DateofGraduation").val(moment(result[0].DateofGraduation).format("YYYY-MM-DD"));
          setTimeout(() => {
            $("#CountryofIssue").val(result[0].CountryofIssue);
          }, 1000);

          $("#AuthorityName").val(result[0].AuthorityName);
          ImageSrcephysician = result[0].Unitlogo;
          this.setState({ ImageSrcephysician: result[0].Unitlogo })
        }
        newweb.lists.getByTitle("Board Certification Transaction").items.select("ID", "Issue", "Graduation", "Enrollment", "TrainingFacility", "OrderNo", "CertificationTitle").filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true).get().then((result) => {
          if (result.length != 0) {
            for (var i = 0; i < result.length; i++) {
              var OrderNo = result[i].OrderNo;
              var Title = result[i].CertificationTitle;
              var Training = result[i].TrainingFacility;
              var Roll = moment(result[i].Enrollment).format("YYYY-MM-DD");
              var Graduate = moment(result[i].Graduation).format("YYYY-MM-DD");
              var Country = result[i].Issue
              $(".tr_firstrowphy").hide()


              var newRow = $("<tr>");
              var cols = "";
              cols += '<td><input type="hidden" id="hdn-ephytab-itm-id" value="' + result[i].ID + '"></input><input type="text" id="CertificationTitle" className="CertificationTitle"    value="' + Title + '"></input></td>';

              cols += '<td><input type="text" className="TrainingFacility" id="TrainingFacility"   value="' + result[i].TrainingFacility + '"></input></td>';
              cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="Enrollment1"  className="Enrollment"   value="' + result[i].Enrollment + '"></input></td>';
              cols += '<td><input type= "date"  max="' + moment().format("DD-MM-YYYY") + '" id="Graduation"  className="Graduation"   value="' + result[i].Graduation + '"></input></td>';
              cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="Countryofissueone"  className="Issue"   value="' + result[i].Issue + '"></input></td>';

              newRow.append(cols);
              $("table #tbody-table-dynamicfirst").append(newRow);


            }
          }
        });



        newweb.lists.getByTitle("Post Graduate Certification").items.select("ID", "Country", "TrainingType", "GraduationDate", "EnrollmentDate", "College", "TraineeCertification", "OrderNo").filter("ONBSessionID eq '" + EditSessionid + "'").get().then((result) => {
          if (result.length != 0) {
            $(".tr_secondrowphy").hide()
            for (var i = 0; i < result.length; i++) {
              var OrderNo = result[i].OrderNo;
              var Trainee = result[i].TraineeCertification;
              var college = result[i].college;
              var Roll = moment(result[i].EnrollmentofDate).format("YYYY-MM-DD");
              var Graduate = moment(result[i].GraduationDate).format("YYYY-MM-DD");
              var Type = result[i].TrainingType;
              var Country = result[i].Country;


              var newRow = $("<tr>");
              var cols = "";

              cols += '<td><input type="hidden" id="hdn-ephy-post-itm-id" value="' + result[i].ID + '"></input><input type="text" id="TraineeCertification" class="CertificationTitle table-border-only"    value="' + result[i].TraineeCertification + '"></input></td>';
              cols += '<td><input type= "text"  class="Issue table-border-only"  id="College"   value="' + result[i].College + '"></input></td>';
              cols += '<td><input type="text" class="TrainingFacility table-border-only" id="TrainingType"   value="' + result[i].TrainingType + '"></input></td>';
              cols += '<td><input type= "date"  max="' + moment().format("DD-MM-YYYY") + '"id="EnrollmentofDate"  class="EnrollmentofDate table-border-only"   value="' + result[i].EnrollmentDate + '"></input></td>';
              cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="GraduationofDate" class="GraduationofDate table-border-only"   value="' + result[i].GraduationDate + '"></input></td>';
              cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '" id="Countryofissuetwo"  class="Country table-border-only"   value="' + result[i].Country + '"></input></td>';



              newRow.append(cols);
              $("table #tbody-table-dynamicfirst2").append(newRow);
            }
          }
        });

      })

    $("#ephysiciansubmitbutton").hide()
    $("#ephysician-updatebtn").show()

  }





  public EphysicianUpdate() {
    if (this.Lang() && this.ProfessionType() && this.SpecialityPopulation() && this.LicensingTitle() && this.Speciality() && this.MedicalDegree() && this.ScopeofServices() && this.Validationephy()) {

      swal({
        text: "Please wait!",
        button: false,
        closeOnClickOutside: false,
      } as any);
      var Language = $("#LanguageKnown").val();
      var Profession = $("#ProfessionType").val();
      var Population = $("#SpecialityPopulation").val();
      var Licensing = $("#LicensingTitle").val();
      var Speciality = $("#Speciality").val();
      var Scope = $("#ScopeofServices").val();
      var License = $("#LicenseNumber").val();
      var Member = $("#Membership").val();
      var Medical = $("#MedicalDegree").val();
      var Other = $("#degreeawarded").val();
      var University = $("#University").val();
      var College = $("#College").val();
      var Enrollment = $("#DateofEnrollment").val();
      var Graduation = $("#DateofGraduation").val();
      var Country = $("#CountryofIssue").val();
      var Authority = $("#AuthorityName").val();

      newweb.lists.getByTitle("E Physician Profile Transaction").items.getById(Ephysicianlistid).update({
        Title: "E-Physician Profile",
        LanguagesSpoken: Language,
        ProfessionType: Profession,
        SpecialityPopulation: Population,
        LicensingTitle: Licensing,
        Speciality: Speciality,
        ScopeofServices: Scope,
        LicenseNumber: License,
        Membership: Member,
        DegreeAwarded: Medical,
        OtherDegree: Other,
        University: University,
        College: College,
        DateofEnrollment: moment(Enrollment, "YYYY-MM-DD").format("MM-DD-YYYY"),
        DateofGraduation: moment(Graduation, "YYYY-MM-DD").format("MM-DD-YYYY"),
        CountryofIssue: Country,
        AuthorityName: Authority,
        Status: "Updated by Unit HR",

      })
        .then((results: any) => {

          this.UpdatedTabletoList(Ephysicianlistid, GlobalSessionIDValue);
          if (this.state.HrCompleteStatus == true) {
            subweb.lists.getByTitle("E Physician Profile HR Update History").items.add({
              Title: "E-Physician Profile",
              LanguagesSpoken: Language,
              ProfessionType: Profession,
              SpecialityPopulation: Population,
              LicensingTitle: Licensing,
              Speciality: Speciality,
              ScopeofServices: Scope,
              LicenseNumber: License,
              Membership: Member,
              DegreeAwarded: Medical,
              OtherDegree: Other,
              University: University,
              College: College,
              DateofEnrollment: moment(Enrollment, "YYYY-MM-DD").format("MM-DD-YYYY"),
              DateofGraduation: moment(Graduation, "YYYY-MM-DD").format("MM-DD-YYYY"),
              CountryofIssue: Country,
              AuthorityName: Authority,
              Status: "Updated by Unit HR",
              ONBSessionID: GlobalSessionIDValue,
              BussinessUnit: officename,
              ControlNumber: ControlNumber,
              VersionNumber: VersionNumber,
            }).then(() => {
              this.AddTabletoHRUpdateHist(Ephysicianlistid, GlobalSessionIDValue);
            })
          }
        })



    }
  }
  public AddTabletoHRUpdateHist(id, ONBSessionID) {
    $('#Ephycust-table-block tbody tr').each(function (Index) {

      var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val();
      var training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val();
      var roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val();
      var graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val();
      var issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val();


      if (title != "" || training != "" || roll != "" || graduation != "" || issue != "") {

        var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() : "-";
        training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() : "-";
        roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() : "-";
        graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='Graduation']").val() : "-";
        issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() : "-";

        subweb.lists.getByTitle('Board Certification Transaction HR Update History').items.add({
          Title: "Board Certification",
          CertificationTitle: title,
          TrainingFacility: training,
          Enrollment: roll,
          Graduation: graduation,
          Issue: issue,
          OrderNo: Index,
          ONBSessionID: ONBSessionID,
          EphysicianId: id


        });

      }

    });


    $('#Ephycust-table-block2 tbody tr').each(function (Index) {

      var trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val();
      var college = $(this).find("td:eq(1)").find("input[id*='College']").val();
      var type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val();
      var enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val();
      var graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val();
      var country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val();

      if (trainee != "" || college != "" || type != "" || enroll != "" || graduate != "" || country != "") {

        trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() : "-";
        college = $(this).find("td:eq(1)").find("input[id*='College']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='College']").val() : "-";
        type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() : "-";
        enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() : "-";
        graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() : "-";
        country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() != "" ? $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() : "-";


        subweb.lists.getByTitle('Post Graduate Certification HR Update History').items.add({
          Title: "Post Graduation",
          TraineeCertification: trainee,
          College: college,
          TrainingType: type,
          EnrollmentDate: enroll,
          GraduationDate: graduate,
          Country: country,
          OrderNo: Index,
          ONBSessionID: ONBSessionID,
          EphysicianId: id
        });
      }

    })
  }

  public async UpdatedTabletoList(id, ONBSessionID) {
    $('#Ephycust-table-block tbody tr').each(function (Index) {

      var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val();
      var training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val();
      var roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val();
      var graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val();
      var issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val();


      if (title != "" || training != "" || roll != "" || graduation != "" || issue != "") {

        var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() : "-";
        training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() : "-";
        roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() : "-";
        graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='Graduation']").val() : "-";
        issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() : "-";


        var TempTableChildItemID: any = $(this).find("td:eq(0)").find("input[id*='hdn-ephytab-itm-id']").val();

        //if (TempTableChildItemID == "null") {
        if (TempTableChildItemID == "null" || TempTableChildItemID == undefined) {
          newweb.lists.getByTitle('Board Certification Transaction').items.add({
            Title: "Board Certification",
            CertificationTitle: title,
            TrainingFacility: training,
            Enrollment: roll,
            Graduation: graduation,
            Issue: issue,
            OrderNo: Index,
            ONBSessionID: ONBSessionID,
            EphysicianId: id


          });
        } else {

          newweb.lists.getByTitle('Board Certification Transaction').items.getById(parseInt(TempTableChildItemID)).update({
            Title: "Board Certification",
            CertificationTitle: title,
            TrainingFacility: training,
            Enrollment: roll,
            Graduation: graduation,
            Issue: issue,
            OrderNo: Index,
            ONBSessionID: ONBSessionID,
            EphysicianId: id

          });
        }

      }

    });


    $('#Ephycust-table-block2 tbody tr').each(function (Index) {

      var trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val();
      var college = $(this).find("td:eq(1)").find("input[id*='College']").val();
      var type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val();
      var enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val();
      var graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val();
      var country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val();

      if (trainee != "" || college != "" || type != "" || enroll != "" || graduate != "" || country != "") {

        trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() : "-";
        college = $(this).find("td:eq(1)").find("input[id*='College']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='College']").val() : "-";
        type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() : "-";
        enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() : "-";
        graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() : "-";
        country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() != "" ? $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() : "-";
        var TempTableChildItemIDpost: any = $(this).find("td:eq(0)").find("input[id*='hdn-ephy-post-itm-id']").val();

        //if (TempTableChildItemIDpost == "null") {
        if (TempTableChildItemIDpost == "null" || TempTableChildItemIDpost == undefined) {
          newweb.lists.getByTitle('Post Graduate Certification').items.add({
            Title: "Post Graduation",
            TraineeCertification: trainee,
            College: college,
            TrainingType: type,
            EnrollmentDate: enroll,
            GraduationDate: graduate,
            Country: country,
            OrderNo: Index,
            ONBSessionID: ONBSessionID,
            EphysicianId: id
          });
        } else {
          newweb.lists.getByTitle('Post Graduate Certification').items.getById(parseInt(TempTableChildItemIDpost)).update({
            Title: "Post Graduation",
            TraineeCertification: trainee,
            College: college,
            TrainingType: type,
            EnrollmentDate: enroll,
            GraduationDate: graduate,
            Country: country,
            OrderNo: Index,
            ONBSessionID: ONBSessionID,
            EphysicianId: id
          });
        }
      }

    })

    setTimeout(() => {

      swal({
        title: "The Form has been updated successfully",
        icon: "success",
      }).then(() => {
        location.reload()
      });
    }, 3000);


  }

  public ephyremovevalidation() {
    $("#LanguageKnown").keyup(function () {

      $("#err-languagesknown").hide();

    });
    $("#LicenseNumber").keyup(function () {
      $("#err-licensenumber").hide();
    });

    $("#Membership").keyup(function () {
      $("#err-membership").hide();
    });

    $("#University").keyup(function () {
      $("#err-university").hide();
    });

    $("#College").keyup(function () {
      $("#err-college").hide();
    });

    $("#DateofEnrollment").on("change", function () {
      $("#err-dateofenrollment").hide();
    });

    $("#DateofGraduation").on("change", function () {
      $("#err-dateofgraduation").hide();
    });

    $("#AuthorityName").keyup(function () {
      $("#err-authorityname").hide();
    });

    $("#ScopeofServices").keyup(function () {

      $("#err-scopeofservices").hide();

    });
    $("#ProfessionType").change(function () {

      $("#err-professiontype").hide();

    });
    $("#SpecialityPopulation").change(function () {

      $("#err-SpecialityPopulation").hide();

    });
    $("#LicensingTitle").change(function () {

      $("#err-licensingtitle").hide();

    });
    $("#Speciality").change(function () {

      $("#err-speciality").hide();

    });
    $("#CountryofIssue").change(function () {
      $("#err-countryofissue").hide();
    });
  }

  public Validationephy() {
    let FormStatus = true;
    var Language = $("#LanguageKnown").val();
    var Profession = $("#ProfessionType").val();
    var Population = $("#SpecialityPopulation").val();
    var Licensing = $("#LicensingTitle").val();
    var Speciality = $("#Speciality").val();
    // var Scope = $("#ScopeofServices").val();
    var License = $("#LicenseNumber").val();
    var Member = $("#Membership").val();
    var Medical = $("#MedicalDegree").val();
    var Other = $("#degreeawarded").val();
    var University = $("#University").val();
    var College = $("#College").val();
    var Enrollment = $("#DateofEnrollment").val();
    var Graduation = $("#DateofGraduation").val();
    var Country = $("#CountryofIssue").val();
    var Authority = $("#AuthorityName").val();

    if (Language == "") {
      $("#err-languageknown").show();
      $("#LanguageKnown").focus();
      FormStatus = false;
    } else {
      $("#err-languageknown").hide();
    }

    if (Profession == "") {
      $("#err-professiontype").show();
      $("#ProfessionType").focus();
      FormStatus = false;

    } else {
      $("#err-professiontype").hide();

    }

    if (License == "") {
      $("#err-licensenumber").show();
      $("#LicenseNumber").focus();
      FormStatus = false;

    } else {
      $("#err-licensenumber").hide();

    }


    if (Population == "") {
      $("#err-specialitypopulation").show();
      $("#SpecialityPopulation").focus();
      FormStatus = false;

    } else {
      $("#err-specialitypopulation").hide();

    }

    if (Licensing == "") {
      $("#err-licensingtitle").show();
      $("#LicensingTitle").focus();
      FormStatus = false;

    } else {
      $("#err-licensingtitle").hide();

    }

    if (Speciality == "") {
      $("#err-speciality").show();
      $("#Speciality").focus();
      FormStatus = false;

    } else {
      $("#err-speciality").hide();

    }


    if (Member == "") {
      $("#err-membership").show();
      $("#Membership").focus();
      FormStatus = false;

    } else {
      $("#err-membership").hide();
    }

    if (Medical == "") {
      $("#err-medicaldegree").show();
      $("#MedicalDegree").focus();
      FormStatus = false;

    } else {
      $("#err-medicaldegree").hide();
    }



    if (University == "") {
      $("#err-university").show();
      $("#University").focus();
      FormStatus = false;

    } else {
      $("#err-university").hide();
    }

    if (College == "") {
      $("#err-college").show();
      $("#College").focus();
      FormStatus = false;

    } else {
      $("#err-college").hide();
    }

    if (Enrollment == "") {
      $("#err-dateofenrollment").show();
      $("#DateofEnrollment").focus();
      FormStatus = false;

    } else {
      $("#err-dateofenrollment").hide();
    }

    if (Graduation == "") {
      $("#err-dateofgraduation").show();
      $("#DateofGraduation").focus();
      FormStatus = false;

    } else {
      $("#err-dateofgraduation").hide();
    }

    if (Country == "Select") {
      $("#err-countryofissue").show();
      $("#CountryofIssue").focus();
      FormStatus = false;

    } else {
      $("#err-countryofissue").hide();
    }

    if (Authority == "") {
      $("#err-authorityname").show();
      $("#AuthorityName").focus();
      FormStatus = false;

    } else {
      $("#err-authorityname").hide();
    }

    return FormStatus;
  }



  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
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
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;

        // alert(officename)
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
            // //(officename);
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
        .filter(`Title eq 'EPHYSICAN PROFILE'`).get()
        .then((results) => {
          this.setState({
            EphyFormControlNumber: results[0][fieldname1.InternalName],
            Ephyformversionno: results[0][fieldname2.InternalName]
          })


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
          this.GetPersonalinforationdata(response[0].ONBSessionID)
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'PERSONAL INFORMATION FORM' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'EPHYSICAN PROFILE'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "EPHYSICAN PROFILE") {
          this.setState({
            EphyProfileSubmissionStatus: response[0].Status
          });
          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.getephyuserlist(ONBSessionID, FormMode);
          }
        }


      }
    });
  }


  public GetPersonalinforationdata(ONBSessionID) {
    newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "FullName",
        "ONBSessionID",
        "CurrentNationality"

      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {


        }
      })
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
  public Lang() {
    var status = true;
    if ((status == true && $("#LanguageKnown").val() == "")) {
      $("#err-languagesknown").show();
      $("#LanguageKnown").focus()
      status = false;
    } else {
      $("#err-languagesknown").hide();
    }
    return status;
  }

  public ProfessionType() {
    var status = true;
    if ((status == true && $("#ProfessionType").find(":selected").text() == "Select")) {
      $("#err-professiontype").show();
      $("#ProfessionType").focus()
      status = false;
    } else {
      $("#err-professiontype").hide();
    }
    return status;
  }

  public SpecialityPopulation() {
    var status = true;
    if ((status == true && $("#SpecialityPopulation").find(":selected").text() == "Select")) {
      $("#err-SpecialityPopulation").show();
      $("#SpecialityPopulation").focus()
      status = false;
    } else {
      $("#err-SpecialityPopulation").hide();
    }
    return status;
  }

  public LicensingTitle() {
    var status = true;
    if ((status == true && $("#LicensingTitle").find(":selected").text() == "Select")) {
      $("#err-licensingtitle").show();
      $("#LicensingTitle").focus()
      status = false;
    } else {
      $("#err-licensingtitle").hide();
    }
    return status;
  }
  public CountryOfIssue() {
    var status = true;
    if ((status == true && $("#CountryofIssue").find(":selected").text() == "Select")) {
      $("#err-countryofissue").show();
      $("#CountryofIssue").focus()
      status = false;
    } else {
      $("#err-countryofissue").hide();
    }
    return status;
  }
  public Speciality() {
    var status = true;
    if ((status == true && $("#Speciality").find(":selected").text() == "Select")) {
      $("#err-speciality").show();
      $("#Speciality").focus()
      status = false;
    } else {
      $("#err-speciality").hide();
    }
    return status;
  }
  public MedicalDegree() {
    var status = true;
    if ((status == true && $("#MedicalDegree").find(":selected").text() == "Select")) {
      $("#err-Awarded").show();
      $("#MedicalDegree").focus()
      status = false;
    } else {
      $("#err-Awarded").hide();
    }
    return status;
  }
  public ScopeofServices() {
    var status = true;
    if ((status == true && $("#ScopeofServices").val() == "")) {
      $("#err-scopeofservices").show();
      $("#ScopeofServices").focus()
      status = false;
    } else {
      $("#err-scopeofservices").hide();
    }
    return status;
  }


  public SaveListItem() {

    if (this.Lang() &&
      this.ProfessionType() &&
      this.SpecialityPopulation() &&
      this.LicensingTitle() &&
      this.Speciality() &&
      this.ScopeofServices() &&
      this.MedicalDegree() &&
      this.Validationephy()) {

      var Profession = $("#ProfessionType").val();
      var Population = $("#SpecialityPopulation").val();
      var Licensing = $("#LicensingTitle").val();
      var Speciality = $("#Speciality").val();
      var Scope = $("#ScopeofServices").val();
      var License = $("#LicenseNumber").val();
      var Member = $("#Membership").val();
      var Medical = $("#MedicalDegree").val();
      var Other = $("#degreeawarded").val();
      var University = $("#University").val();
      var College = $("#College").val();
      var Enrollment = $("#DateofEnrollment").val();
      var Graduation = $("#DateofGraduation").val();
      var Country = $("#CountryofIssue").val();
      var Authority = $("#AuthorityName").val();
      var Language = $("#LanguageKnown").val();

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


          newweb.lists.getByTitle('E Physician Profile Transaction').items.add(
            {
              Title: "EPHYSICAN PROFILE",
              LanguagesSpoken: Language,
              ProfessionType: Profession,
              SpecialityPopulation: Population,
              LicensingTitle: Licensing,
              Speciality: Speciality,
              ScopeofServices: Scope,
              LicenseNumber: License,
              Membership: Member,
              DegreeAwarded: Medical,
              OtherDegree: Other,
              University: University,
              College: College,
              DateofEnrollment: moment(Enrollment, "YYYY-MM-DD").format("MM-DD-YYYY"),
              DateofGraduation: moment(Graduation, "YYYY-MM-DD").format("MM-DD-YYYY"),
              CountryofIssue: Country,
              AuthorityName: Authority,
              Unitlogo: LogoUrl,
              Status: "Created by Employee",
              BussinessUnit: officename,
              ONBSessionID: this.state.ONBSessionID,
              ControlNumber: this.state.ControlNumber + "/" + this.state.EphyFormControlNumber,
              VersionNumber: this.state.Ephyformversionno

            }
          )
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'EPHYSICAN PROFILE'").orderBy("Created", false).get().then((response) => {
                if (response.length != 0) {
                  newweb.lists.getByTitle("Onboarding Transaction Master").items.getById(response[0].Id).update({
                    Status: "Completed",
                    CompletedOn: moment().format("MM/DD/YYYY")
                  });
                }
              })
              this.AddTableToList(results.data.ID, this.state.ONBSessionID);

            });

        }
      });
    }
  }

  public AddTableToList(id, ONBSessionID) {


    $('#Ephycust-table-block tbody tr').each(function (Index) {

      var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val();
      var training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val();
      var roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val();
      var graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val();
      var issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val();


      if (title != "" || training != "" || roll != "" || graduation != "" || issue != "") {

        var title = $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='CertificationTitle']").val() : "-";
        training = $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='TrainingFacility']").val() : "-";
        roll = $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='Enrollment']").val() : "-";
        graduation = $(this).find("td:eq(3)").find("input[id*='Graduation']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='Graduation']").val() : "-";
        issue = $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='Countryofissueone']").val() : "-";

        newweb.lists.getByTitle('Board Certification Transaction').items.add({
          Title: "Board Certification",
          CertificationTitle: title,
          TrainingFacility: training,
          Enrollment: roll,
          Graduation: graduation,
          Issue: issue,
          EphysicianId: id,
          ONBSessionID: ONBSessionID,
          OrderNo: Index
        }).then((results: any) => {

        });
      }

    });




    $('#Ephycust-table-block2 tbody tr').each(function (Index) {

      var trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val();
      var college = $(this).find("td:eq(1)").find("input[id*='College']").val();
      var type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val();
      var enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val();
      var graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val();
      var country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val();

      if (trainee != "" || college != "" || type != "" || enroll != "" || graduate != "" || country != "") {

        trainee = $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() != "" ? $(this).find("td:eq(0)").find("input[id*='TraineeCertification']").val() : "-";
        college = $(this).find("td:eq(1)").find("input[id*='College']").val() != "" ? $(this).find("td:eq(1)").find("input[id*='College']").val() : "-";
        type = $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() != "" ? $(this).find("td:eq(2)").find("input[id*='TrainingType']").val() : "-";
        enroll = $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() != "" ? $(this).find("td:eq(3)").find("input[id*='EnrollmentofDate']").val() : "-";
        graduate = $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() != "" ? $(this).find("td:eq(4)").find("input[id*='GraduationofDate']").val() : "-";
        country = $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() != "" ? $(this).find("td:eq(5)").find("input[id*='Countryofissuetwo']").val() : "-";



        newweb.lists.getByTitle('Post Graduate Certification').items.add({
          Title: "Post Graduation",
          TraineeCertification: trainee,
          College: college,
          TrainingType: type,
          EnrollmentDate: enroll,
          GraduationDate: graduate,
          Country: country,
          EphysicianId: id,
          ONBSessionID: ONBSessionID,
          OrderNo: Index
        }).then((results: any) => {
          setTimeout(() => {
            swal({

              title: "The Form has been submitted successfully",

              icon: 'success'

            }).then(() => {

              location.reload()


            });
          }, 1500);
        });
      }

    });

  }

  public addrowephytable(e) {

    e.preventDefault();

    var board_last_input1 = $("#tbody-table-dynamicfirst tr:last").find("input").eq(1).val();
    var board_last_input2 = $("#tbody-table-dynamicfirst tr:last").find("input").eq(2).val();
    var board_last_input3 = $("#tbody-table-dynamicfirst tr:last").find("input").eq(3).val();
    var board_last_input4 = $("#tbody-table-dynamicfirst tr:last").find("input").eq(4).val();
    var board_last_input5 = $("#tbody-table-dynamicfirst tr:last").find("input").eq(5).val();


    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("Ephycust-table-block");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 8) {

        if (board_last_input1 != "" || board_last_input2 != "" || board_last_input3 != "" || board_last_input4 != "" || board_last_input5 != "") {

          $("#tbody-table-dynamicfirst").append(`<tr>
  
        <td><input type="hidden" id="hdn-ephytab-itm-id" value="null"><input type="text" id="CertificationTitle" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="text" id="TrainingFacility" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Enrollment1" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Graduation" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Countryofissueone" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel12"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

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
          title: " Only 7 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    } if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("Ephycust-table-block");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 9) {
        if (board_last_input1 != "" || board_last_input2 != "" || board_last_input3 != "" || board_last_input4 != "" || board_last_input5 != "") {
          $("#tbody-table-dynamicfirst").append(`<tr>
  
        <td><input type="hidden" id="hdn-ephytab-itm-id" value="null"><input type="text" id="CertificationTitle" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="text" id="TrainingFacility" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Enrollment1" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Graduation" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td><input type="date" id="Countryofissueone" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel12"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);
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
          title: " Only 7 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }



    counter = counter + 1;
    $("table #tbody-table-dynamicfirst").on("click", ".ibtnDel12", function (event) {
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any)
        .then((willDelete) => {
          if (willDelete) {
            $(this).closest("tr").remove();
            counter = counter - 1 + 2;
            setTimeout(() => {
              swal({
                title: "Deleted Successfully",
                icon: "success",
              } as any);
            }, 500);
          }
        });
    });
  }

  public AddSecondNewRow(e) {

    e.preventDefault();

    var post_last_input1 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(1).val();
    var post_last_input2 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(2).val();
    var post_last_input3 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(3).val();
    var post_last_input4 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(4).val();
    var post_last_input5 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(5).val();
    var post_last_input6 = $("#tbody-table-dynamicfirst2 tr:last").find("input").eq(6).val();


    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("Ephycust-table-block2");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {

        if (post_last_input1 != "" || post_last_input2 != "" || post_last_input3 != "" || post_last_input4 != "" || post_last_input5 != "" || post_last_input6 != "") {

          $("#tbody-table-dynamicfirst2").append(`<tr>
  
    <td><input type="hidden" id="hdn-ephy-post-itm-id" value="null"><input type="text" id="TraineeCertification" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="text" id="College" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="test" id="TrainingType" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="EnrollmentofDate" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="GraduationofDate" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="Countryofissuetwo"max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("Ephycust-table-block2");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 7) {
        if (post_last_input1 != "" || post_last_input2 != "" || post_last_input3 != "" || post_last_input4 != "" || post_last_input5 != "" || post_last_input6 != "") {
          $("#tbody-table-dynamicfirst2").append(`<tr>
  
    <td><input type="hidden" id="hdn-ephy-post-itm-id" value="null"><input type="text" id="TraineeCertification" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="text" id="College" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="test" id="TrainingType" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="EnrollmentofDate" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="GraduationofDate" max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td><input type="date" id="Countryofissuetwo"max="${moment().format("YYYY-MM-DD")}" class="form-control table-border-only" autoComplete="off"></input></td>
    <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
  </tr>`);
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
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }
    }






    count = count + 1;
    $("table #tbody-table-dynamicfirst2").on("click", ".ibtnDel2", function (event) {
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any)
        .then((willDelete) => {
          if (willDelete) {
            $(this).closest("tr").remove();
            count = count - 1 + 2;
            setTimeout(() => {
              swal({
                title: "Deleted Successfully",
                icon: "success",
              } as any);
            }, 500);
          }
        });
    });
  }

  public GetLanguagesItems() {
    newweb.lists.getByTitle("Language Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Language: result
      });

    });

  }

  public GetProfessionItems() {
    newweb.lists.getByTitle("Profession Type Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Profession: result
      });

    });

  }

  public GetSpecialityPopulationItems() {
    newweb.lists.getByTitle("Speciality Population Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Population: result
      });

    });

  }

  public GetLicensingItems() {
    newweb.lists.getByTitle("Licensing Title Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Licensing: result
      });

    });

  }

  public GetSpecialityItems() {
    newweb.lists.getByTitle("Speciality Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Speciality: result
      });

    });

  }

  public GetMedicalDegreeItems() {
    newweb.lists.getByTitle("Medical Degree Awarded Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Medical: result
      });

    });

  }

  public GetCountryInformationItems() {
    newweb.lists.getByTitle("Country Information").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Country: result
      });

    });

  }




  public async getephyuserlist(ONBSessionID, FormMode) {

    $(".view-th-hide").hide()
    $(".tr_firstrowphy").hide()
    $(".tr_secondrowphy").hide()
    await newweb.lists
      .getByTitle("E Physician Profile Transaction")
      .items.select(
        "ID",
        "LanguagesSpoken",
        "SpecialityPopulation",
        "LicensingTitle",
        "Author/Title",
        "Speciality",
        "ScopeofServices",
        "LicenseNumber",
        "Membership",
        "DegreeAwarded",
        "OtherDegree",
        "University",
        "College",
        "DateofEnrollment",
        "ProfessionType",
        "CountryofIssue",
        "AuthorityName",
        "ONBSessionID",
        "DateofGraduation"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".add-bth-wrap-ephyician").hide()
          setTimeout(() => {
            this.Gettabledata(result[0].ID, ONBSessionID);
          }, 2000);

          $(".ephycianviewmodecommom").prop("disabled", true);

          $(".ephybtn").hide();
          // $(".ephytitle").attr("style", "color:#00A36C");
          $(".ephysucessicon").show()
          $("#LanguageKnown").val(result[0].LanguagesSpoken);
          $("#SpecialityPopulation").val(result[0].SpecialityPopulation);
          $(".licence-title").val(result[0].LicensingTitle);
          $("#Speciality").val(result[0].Speciality);
          $("#ScopeofServices").val(result[0].ScopeofServices)
          $("#LicenseNumber").val(result[0].LicenseNumber);
          $("#Membership").val(result[0].Membership);
          $("#MedicalDegree").val(result[0].DegreeAwarded);
          $("#ProfessionType").val(result[0].ProfessionType);
          // $("#degreeawarded").val(result[0].OtherDegree);

          $("#University").val(result[0].University);
          $("#College").val(result[0].College);
          $("#DateofEnrollment").val(moment(result[0].DateofEnrollment).format("YYYY-MM-DD"));
          $("#DateofGraduation").val(moment(result[0].DateofGraduation).format("YYYY-MM-DD"));
          $("#CountryofIssue").val(result[0].CountryofIssue);
          $("#AuthorityName").val(result[0].AuthorityName);
          setTimeout(() => {
            $('#Ephycust-table-block tbody tr').find("input").prop('disabled', true);
            $('#Ephycust-table-block2 tbody tr').find("input").prop('disabled', true);
          }, 1000);

        }
      });

  }

  public async Gettabledata(id, ONBSessionID) {
    newweb.lists
      .getByTitle("Board Certification Transaction")
      .items.select(
        "ID",
        "CertificationTitle",
        "TrainingFacility",
        "Enrollment",
        "Graduation",
        "Issue",
        "EphysicianId",
        "OrderNo",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true)

      .get()
      .then((result) => {


        if (result.length != 0) {

          console.log(result);

          $(".tr_firstrowphy").hide()
          for (var i = 0; i < result.length; i++) {
            var newRow = $("<tr>");
            var cols = "";
            cols += '<td><input type="hidden" id="hdn-ephytab-itm-id" value="' + result[i].ID + '"></input><input type="text" id="CertificationTitle"    value="' + result[i].CertificationTitle + '"disabled></input></td>';
            cols += '<td><input type="text" id="TrainingFacility"   value="' + result[i].TrainingFacility + '"disabled></input></td>';
            cols += '<td><input type="date" max="' + moment().format("DD-MM-YYYY") + '"  id="Enrollment"   value="' + result[i].Enrollment + '"disabled></input></td>';
            cols += '<td><input type="date"  max="' + moment().format("DD-MM-YYYY") + '"  id="Graduation"   value="' + result[i].Graduation + '"disabled></input></td>';
            cols += '<td><input type="date" max="' + moment().format("DD-MM-YYYY") + '"   id="Issue"   value="' + result[i].Issue + '"disabled></input></td>';

            newRow.append(cols);
            $("table #tbody-table-dynamicfirst").append(newRow);
          }
        }
        $("#CertificationTitle").prop('disabled', true)
        $("#TrainingFacility").prop('disabled', true)
        $("#Enrollment").prop('disabled', true)
        $("#Graduation").prop('disabled', true)
        $("#Issue").prop('disabled', true)

      });

    ////

    newweb.lists
      .getByTitle("Post Graduate Certification")
      .items.select(
        "ID",
        "OrderNo",
        "TraineeCertification",
        "College",
        "TrainingType",
        "EnrollmentDate",
        "GraduationDate",
        "Country",
        "EphysicianId",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true)

      .get()
      .then((result) => {
        console.log(result);
        if (result.length != 0) {
          $(".tr_secondrowphy").hide()

          for (var i = 0; i < result.length; i++) {
            var newRow = $("<tr>");
            var cols = "";

            cols += '<td><input type="hidden" id="hdn-ephy-post-itm-id" value="' + result[i].ID + '"></input><input type="text" className="CertificationTitle table-border-only" disabled  disabled value="' + result[i].TraineeCertification + '"></input></td>';
            cols += '<td><input type= "text"  class="Issue table-border-only" disabled  value="' + result[i].College + '"disabled></input></td>';
            cols += '<td><input type="text" class="TrainingFacility table-border-only" disabled  value="' + result[i].TrainingType + '"disabled></input></td>';
            cols += '<td><input type= "date"  max="' + moment().format("DD-MM-YYYY") + '"  class="EnrollmentofDate table-border-only" disabled  value="' + result[i].EnrollmentDate + '"disabled></input></td>';
            cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '"  class="GraduationofDate table-border-only" disabled  value="' + result[i].GraduationDate + '"disabled></input></td>';
            cols += '<td><input type= "date" max="' + moment().format("DD-MM-YYYY") + '"  class="Country table-border-only" disabled  value="' + result[i].Country + '"disabled></input></td>';

            newRow.append(cols);
            $("table #tbody-table-dynamicfirst2").append(newRow);
          }
        }
      });

  }


  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-ep').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    location.reload();

  }

  public render(): React.ReactElement<IletterofauthorizationProps> {
    var handler = this;
    const LanguageKnown: JSX.Element[] = this.state.Language.map(
      function (item, key) {

        return (
          <option>
            {item.Title}
          </option>
        );
      }
    );

    const ProfessionType: JSX.Element[] = this.state.Profession.map(
      function (item, key) {

        return (
          <option>
            {item.Title}
          </option>
        );
      }
    );

    const SpecialityPopulation: JSX.Element[] = this.state.Population.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.Title}
          </option>
        );
      }
    );

    const LicensingTitle: JSX.Element[] = this.state.Licensing.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.Title}
          </option>
        );
      }
    );

    const SpecialityMaster: JSX.Element[] = this.state.Speciality.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.Title}
          </option>
        );
      }
    );

    const MedicalDegree: JSX.Element[] = this.state.Medical.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.Title}
          </option>
        );
      }
    );

    const CountryInformation: JSX.Element[] = this.state.Country.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.CountryName}
          </option>
        );
      }
    );

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
            <span>E-Physician Profile</span>
          </div>

          <div className="dashboard_right_ffamily">
            <div className="e_physician_top">

              <div className="dashboard_right_text">

                <div className="personal_info_part">
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        {/* <select id="LanguageKnown" className="Status lang-ephy form-control ephycianviewmodecommom">
                    <option value="Select">Select</option>
                    {LanguageKnown}
                  </select>

                  <span className="floating-label ">Languages Known <i className="required">*</i></span> */}


                        <input type="text" id="LanguageKnown" name="LanguageKnown" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label">Languages Known <i className="required">*</i></span>




                      </div>
                      <span className="error-validation" id="err-languagesknown" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="ProfessionType" className="Status form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {ProfessionType}
                        </select>

                        <span className="floating-label ">Profession Type <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-professiontype" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="SpecialityPopulation" className="Status form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {SpecialityPopulation}
                        </select>

                        <span className="floating-label ">Speciality Population <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-SpecialityPopulation" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="LicensingTitle" className="Status licence-title form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {LicensingTitle}
                        </select>

                        <span className="floating-label ">Licensing Title <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-licensingtitle" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="Speciality" className="Status form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {SpecialityMaster}
                        </select>

                        <span className="floating-label ">Speciality <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-speciality" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="ScopeofServices" name="Department" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">Scope of Services <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-scopeofservices" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>

                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="LicenseNumber" name="LicenseNumber" className="form-control ephycianviewmodecommom licensenumber-epy" autoComplete="off" ></input>
                        <span className="floating-label ">DOH License Number <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-licensenumber" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="Membership" name="Membership" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">Fellowship & Membership <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-membership" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="MedicalDegree" className="Status form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {MedicalDegree}
                        </select>
                        {/* <input type="text" name="degreeawarded" style={{display: "none" }} id="degreeawarded" className="form-control ephycianviewmodecommom" autoComplete="off" ></input> */}

                        <span className="floating-label ">Degree Awarded <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-Awarded" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    {/* <div className="col-md-4 degreeawarded" style={{ display: "none" }}>
                <div className="form-group relative">
                <input type="text" name="degreeawarded" id="degreeawarded" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                  <span className="floating-label "> Other Degree Awarded <i className="required">*</i></span>
                </div>
                <span className="error-validation" id="err-otherdegrreawarded" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
              </div> */}

                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="University" name="University" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">University <i className="required">*</i></span>
                      </div>

                      <span className="error-validation" id="err-university" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="College" name="College" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">College <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-college" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="date" id="DateofEnrollment" name="DateofEnrollment" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">Date of Enrollment <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-dateofenrollment" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>


                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="date" max={moment().format("YYYY-MM-DD")} id="DateofGraduation" name="DateofGraduation" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">Date of Graduation <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-dateofgraduation" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <select id="CountryofIssue" className="Status form-control ephycianviewmodecommom">
                          <option value="Select">Select</option>
                          {CountryInformation}
                        </select>
                        <span className="floating-label ">Country of Issue <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-countryofissue" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <input type="text" id="AuthorityName" name="AuthorityName" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
                        <span className="floating-label ">Licensing Authority Name <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-authorityname" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                  </div>

                </div>
              </div>



              <div className="custom-table ephysician sec">
                <div className="personal_info_part">
                  <div className="e_physician_table">
                    <div className="table-wrapper-date clearfix"><div className="table-search"><h3 className="contact-pg-title">Board Certification </h3></div>

                    </div>
                    <div className="ephytable">
                      <table className="table table-bordered" id="Ephycust-table-block">
                        <thead>
                          <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col" className="size-table">Certification Title</th>
                            <th scope="col" className="size-table">Training Facility/College</th>
                            <th scope="col" className="size-table ">Date of Enrollment </th>
                            <th scope="col" className="size-table">Date of Graduation</th>
                            <th scope="col" className="size-table">Date of Issue</th>
                            <th className="view-th-hide" scope="col"></th>
                          </tr>

                        </thead>
                        <tbody id="tbody-table-dynamicfirst">
                          <tr className="tr_firstrowphy">

                            <td className="size-table">
                              <input type="hidden" id="hdn-ephytab-itm-id" value="null" />
                              <input type="text" id="CertificationTitle" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input>
                            </td>
                            <td className="size-table"><input type="text" id="TrainingFacility" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Enrollment" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Graduation" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Countryofissueone" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td></td>
                          </tr>

                        </tbody>
                      </table>
                    </div >
                    <div className="add-btn-wrap clearfix add-bth-wrap-ephyician">
                      <button type="submit" onClick={(e) => this.addrowephytable(e)}>Add New Row</button>
                    </div>
                  </div>
                </div>

                <div className="personal_info_part">
                  <div className="e_physician_table">
                    <div className="table-wrapper-date clearfix"><div className="table-search"><h3 className="contact-pg-title">Post Graduate Certification </h3></div>
                    </div>
                    <div className="ephytable">
                      <table className="table table-bordered2" id="Ephycust-table-block2">
                        <thead>
                          <tr>
                            <th scope="col" className="size-table E_PHYSICIAN_thTrainee">Trainee Certification</th>
                            <th scope="col" className="size-table E_PHYSICIAN_thTraining">Training Facility/College</th>
                            <th scope="col" className="size-table E_PHYSICIAN_thType">Training Type : Clinical/Non-Clinical</th>
                            <th scope="col" className="size-table E_PHYSICIAN_thenroll">Date of Enrollment</th>
                            <th scope="col" className="size-table E_PHYSICIAN_thgraution">Date of Graduation</th>
                            <th scope="col" className="size-table E_PHYSICIAN_thissue">Date of Issue</th>
                            <th className="view-th-hide" scope="col"></th>
                          </tr>

                        </thead>
                        <tbody id="tbody-table-dynamicfirst2">
                          <tr className="tr_secondrowphy">

                            <td className="size-table">
                              <input type="hidden" id="hdn-ephy-post-itm-id" value="null" />
                              <input type="text" id="TraineeCertification" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input>
                            </td>
                            <td className="size-table"><input type="text" id="College" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="test" id="TrainingType" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="EnrollmentofDate" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="GraduationofDate" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Countryofissuetwo" max={moment().format("DD-MM-YYYY")} className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>

                            <td></td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                    <div className="add-btn-wrap clearfix add-bth-wrap-ephyician">
                      <button type="submit" onClick={(e) => this.AddSecondNewRow(e)}>Add New Row</button>
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

                  <div className="dashboard_btn Dyname-btn" >


                    {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                      <button id="ephysiciansubmitbutton"
                        className="dashboard_submit_btn ephybtn"
                        type="submit"
                        onClick={() => this.SaveListItem()}
                      >
                        Submit
                      </button>
                      :
                      <button id="ephysiciansubmitbutton" style={{ cursor: "no-drop" }}
                        className="dashboard_submit_btn ephybtn"
                        type="submit"
                      >
                        Submit
                      </button>
                    }


                    <button style={{ display: "none" }} id="ephysician-updatebtn"
                      className="dashboard_submit_btn"
                      type="submit"
                      onClick={() => this.EphysicianUpdate()}
                    >
                      Update
                    </button>

                    <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnephy" type="submit" onClick={() => this.Printthis()}>Print</button>
                    {GlobalFormOpenedMode == "New" &&
                      <button id="ephy-btn-employe-newpage" className="dashboard_submit_btn btn-cancel" type="reset">
                        <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                          Cancel
                        </a>
                      </button>
                    }

                    {GlobalModes == "Edit" &&
                      <button id="eph-ephybtn-hr-editviewpagepersonal" className="dashboard_submit_btn btn-cancel" type="reset">
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

        <div id="dashboard_right-print-ep" style={{ display: "none" }}>
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
              <span>E-Physician Profile</span>
              <ul>
                <li>Control Number: <b id="print-ephy-Control-Number"></b></li>
                <li>Version: <b id="print-ephy-Version-Number"></b></li>
              </ul>

            </div>
          </div>

          <div className="dashboard_right_ffamily">
            <div className="e_physician_top">

              <div className="dashboard_right_text">

                <div className="personal_info_part">
                  <div className="row form print-topborder">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        {/* <select id="LanguageKnown" className="Status lang-ephy form-control ephycianviewmodecommom">
            <option value="Select">Select</option>
            {LanguageKnown}
          </select>

          <span className="floating-label ">Languages Known <i className="required">*</i></span> */}


                        <span
                          // type="text" 
                          id="print-LanguageKnown"
                          // name="LanguageKnown" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label">Languages Known <i className="required">*</i></span>




                      </div>
                      <span className="error-validation" id="err-languagesknown" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span id="print-ProfessionType" className="Status print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
              {ProfessionType} */}
                        </span>

                        <span className="floating-label ">Profession Type <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-professiontype" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span id="print-SpecialityPopulation" className="Status print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
              {SpecialityPopulation} */}
                        </span>

                        <span className="floating-label ">Speciality Population <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-SpecialityPopulation" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span id="LicensingTitle" className="Status print-licence-title print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
              {LicensingTitle} */}
                        </span>

                        <span className="floating-label ">Licensing Title <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-licensingtitle" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span id="print-Speciality" className="Status print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
              {SpecialityMaster} */}
                        </span>

                        <span className="floating-label ">Speciality <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-speciality" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //type="text" 
                          id="print-ScopeofServices"
                          // name="Department" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label ">Scope of Services </span>
                      </div>
                      <span className="error-validation" id="err-scopeofservices" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>

                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text" 
                          id="print-LicenseNumber"
                          // name="LicenseNumber"
                          className="print-control ephycianviewmodecommom licensenumber-epy"
                        //autoComplete="off"
                        ></span>
                        <span className="floating-label ">DOH License Number<i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-licensenumber" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text" 
                          id="print-Membership"
                          // name="Membership" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label ">Fellowship & Membership <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-membership" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          id="print-MedicalDegree" className="Status print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
              {MedicalDegree} */}
                        </span>
                        {/* <input type="text" name="degreeawarded" style={{display: "none" }} id="degreeawarded" className="form-control ephycianviewmodecommom" autoComplete="off" ></input> */}

                        <span className="floating-label ">Degree Awarded <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-Awarded" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    {/* <div className="col-md-4 degreeawarded" style={{ display: "none" }}>
        <div className="form-group relative">
        <input type="text" name="degreeawarded" id="degreeawarded" className="form-control ephycianviewmodecommom" autoComplete="off" ></input>
          <span className="floating-label "> Other Degree Awarded <i className="required">*</i></span>
        </div>
        <span className="error-validation" id="err-otherdegrreawarded" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
      </div> */}

                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text"
                          id="print-University"
                          // name="University" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label ">University <i className="required">*</i></span>
                      </div>

                      <span className="error-validation" id="err-university" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text" 
                          id="print-College"
                          // name="College" 
                          className="print-control ephycianviewmodecommom"
                        // autoComplete="off" 
                        ></span>
                        <span className="floating-label ">College <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-college" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="date" 
                          id="print-DateofEnrollment"
                          // name="DateofEnrollment" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label ">Date of Enrollment <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-dateofenrollment" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>


                  </div>
                  <div className="row form">
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          //type="date" 
                          id="print-DateofGraduation"
                          // name="DateofGraduation" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off" 
                        ></span>
                        <span className="floating-label ">Date of Graduation <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-dateofgraduation" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span id="print-CountryofIssue" className="Status print-control ephycianviewmodecommom">
                          {/* <option value="Select">Select</option>
                        {CountryInformation} */}
                        </span>
                        <span className="floating-label ">Country of Issue</span>
                      </div>
                      <span className="error-validation" id="err-countryofissue" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group relative">
                        <span
                          // type="text" 
                          id="print-AuthorityName"
                          // name="AuthorityName" 
                          className="print-control ephycianviewmodecommom"
                        //autoComplete="off"
                        ></span>
                        <span className="floating-label ">Licensing Authority Name <i className="required">*</i></span>
                      </div>
                      <span className="error-validation" id="err-authorityname" style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                    </div>
                  </div>

                </div>
              </div>



              <div className="custom-table ephysician sec" style={{ marginLeft: "-20px" }}>
                <div className="personal_info_part print-board-table">
                  <div className="e_physician_table">
                    <div className="table-wrapper-date clearfix"><div className="table-search"><h3 className="contact-pg-title">Board Certification </h3></div>

                    </div>
                    <div className="ephytable">
                      <table className="table table-bordered" id="Ephycust-table-block">
                        <thead>
                          <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col" className="size-table">Certification Title</th>
                            <th scope="col" className="size-table">Training Facility/College</th>
                            <th scope="col" className="size-table">Date of Enrollment </th>
                            {/* <th scope="col" className="size-table">Date of Graduation</th> */}
                            {/* <th scope="col" className="size-table">Country of Issue</th> */}

                          </tr>

                        </thead>
                        <tbody id="print-tbody-table-dynamicfirst">
                          <tr className="tr_firstrowphy">

                            <td className="size-table"><input type="text" id="CertificationTitle" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="text" id="TrainingFacility" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Enrollment" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Graduation" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Countryofissueone" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>

                          </tr>

                        </tbody>
                      </table>
                    </div >
                    <div className="add-btn-wrap clearfix add-bth-wrap-ephyician">
                      <button type="submit" onClick={(e) => this.addrowephytable(e)}>Add New Row</button>
                    </div>
                  </div>
                </div>

                <div className="personal_info_part print-ephy-table">
                  <div className="e_physician_table">
                    <div className="table-wrapper-date clearfix"><div className="table-search"><h3 className="contact-pg-title">Post Graduate Certification </h3></div>
                    </div>
                    <div className="ephytable">
                      <table className="table table-bordered2" id="Ephycust-table-block2">
                        <thead>
                          <tr>

                            <th scope="col" className="size-table">Trainee Certification</th>
                            <th scope="col" className="size-table">Training Facility/College</th>
                            <th scope="col" className="size-table">Training Type : Clinical/Non-Clinical</th>
                            <th scope="col" className="size-table">Date of Enrollment</th>
                            {/* <th scope="col" className="size-table">Date of Graduation</th> */}
                            {/* <th scope="col" className="size-table">Country of Issue</th> */}

                          </tr>

                        </thead>
                        <tbody id="print-tbody-table-dynamicfirst2">
                          <tr className="tr_secondrowphy">

                            <td className="size-table"><input type="text" id="TraineeCertification" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="text" id="College" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="test" id="TrainingType" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="EnrollmentofDate" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="GraduationofDate" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>
                            <td className="size-table"><input type="date" id="Countryofissuetwo" className="form-control table-border-only ephycianviewmodecommom" autoComplete="off"></input></td>


                          </tr>

                        </tbody>
                      </table>
                    </div>
                    <div className="add-btn-wrap clearfix add-bth-wrap-ephyician">
                      <button type="submit" onClick={(e) => this.AddSecondNewRow(e)}>Add New Row</button>
                    </div>
                  </div>


                </div>
                <div className="personal_info_part" style={{ marginTop: "-15px" }}>
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

