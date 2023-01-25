import * as React from "react";
// import styles from "./LoaNewForm.module.scss";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/site-users";
import * as moment from "moment";
import swal from "sweetalert";
import { sp } from "@pnp/sp/presets/all";
import { result } from "lodash";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";

export interface ILetterAuthorizationNewState {
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  BusinessMaster: any[];
  TCDescription: any[];
  Alreadysublitted: boolean;
  Dynamiclogo: any[];
  Dynamictabledata: any[];
  DynamicProfessionalMemberships: any[];
  CountryName: any[],
  PolicyAckandDeclarationSubmissionStatus: string;
  ONBSessionID: string;
  AttachmentUploaderStatusArray: any[];
  Speciality: any[];
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  policyFormControlNumber: any[];
  HrCompleteStatus: boolean;
}
let currentpersonalids;
var AttachmentFullname = ""
const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
var Description;
var officename = "";
var LogoUrl;
let PolicyItemid;
var ImageSrcpersonal = "";
var Mode;
var ploicyclinicationmode;
var DosimeterId;
var Physicianid;
var idrelese;
let counter = 2;
let counter2 = 2;
var Empnameitem = "";
let Pid;
var Mainparentid1: Number = null;
var Mainparentid2: Number = null;
var Mainparentid3: Number = null;
var Mainparentid4: number = null;
var DynamictableId;
var PhotoVideolistid;
var Physicianlistid;
var Dosimeterlistid;
var stamplistid: number

var dynamicunitname = "";
var dohfile = "";
var dataflowfile = "";
var countrylicensefile = "";
var homecountryregistrationfile = "";
var logbookfile = "";
var blsfile = "";
var aclsfile = "";
var nrpfile = "";
var palsfile = "";
var altsfile = "";
var Tableitemid;
var GlobalSessionIDValue = "";
var GlobalFormOpenedMode = "New";
var EditSessionid: string;


var AttachmentUploaderStatusArray = [];
var AttachmentUploaderStatusArrayValidator = [];

var printdohfile;
var printdataflowfile;
var printcountrylicensefile;
var printhomecountryregistrationfile;
var printlogbookfile;
var printblsfile;
var printaclsfile;
var printpalsfile;
var printnrpfile;
var printaltsfile;

var stampcontrolno;
var stampversionon;
var dosmisterControlno;
var dosmisterversionno;
var physionControlno;
var physicianVersionno;
var PhotoControlno;
var PhotoVersionno;

var Stampcontrolnumber;
var Dosmistercontrolnumber;
var Physioncontrolnumber;
var Photocontrolnumber;
var Stampversionnumber;
var Dosmisterversionnumber;
var Physicianversionnumber;
var Photoversionnumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class LoaNewForm extends React.Component<
  IHrOnboardingFormProps,
  ILetterAuthorizationNewState,
  {}
> {
  constructor(
    props: IHrOnboardingFormProps,
    state: ILetterAuthorizationNewState
  ) {
    super(props);
    this.state = {
      CurrentUserName: [],
      CurrentUserDesignation: [],
      BusinessMaster: [],
      TCDescription: [],
      Alreadysublitted: true,
      Dynamiclogo: [],
      Dynamictabledata: [],
      DynamicProfessionalMemberships: [],
      CountryName: [],
      PolicyAckandDeclarationSubmissionStatus: "Inprogress",
      ONBSessionID: "",
      AttachmentUploaderStatusArray: [],
      Speciality: [],
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      policyFormControlNumber: [],
      HrCompleteStatus: false
    };

  }

  public componentDidMount() {
    this.getCountryName()

    this.CheckAttachmentupdation();
    this.removevalidationpolicy();
    this.Autopopulatingdataoneinputfieldtoanother()
    this.GetSpecialityItems();
    $("#phypolicyempationality").prop('disabled', true);
    $('iv[data-automation-id="pageHeader"]').attr(
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
    $("#stamppolicynamedynamic").attr("disabled", "disabled")
    $("#stamppolicyidnumber").attr("disabled", "disabled")
    $(".policy-name-id-disabled").prop("disabled", true)
    const url: any = new URL(window.location.href);
    PolicyItemid = url.searchParams.get("policyItemID");
    Mode = url.searchParams.get("PADCMode");
    ploicyclinicationmode = url.searchParams.get("PADCMode");
    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");
    if (GlobalFormOpenedMode == "View") {
      $(".viewform-actn-th").hide();
      $(".print-btnplolicy").show();
      $("#stamppolicynamedynamic").attr("disabled", "disabled")
      $("#stamppolicyidnumber").attr("disabled", "disabled")
      $(".policy-name-id-disabled").prop("disabled", true)
      $(".addnew-btn-policy").hide();
      $("input").attr("disabled", "disabled");
      $(".Add-new-btn").hide();
      $("#phypolicyempationality").prop('disabled', true);
      $("#updatebutton-btn").hide();
      this.GetUsersvalueitemid(PolicyItemid);
      this.GetUsersvalueitemidForPrint(PolicyItemid);
      $(".policy-viewm-odeform").prop('disabled', true)
      $(".policy-submit").hide();
    } else if (GlobalFormOpenedMode == "Edit") {

      $(".policy-name-id-disabled").prop("disabled", true)
      $(".addnew-btn-policy").show();
      $("#stamppolicynamedynamic").attr("disabled", "disabled")
      $("#stamppolicyidnumber").attr("disabled", "disabled")
      $("#updatebutton-btn").show();
      $(".policy-submit").hide();
      this.GetUsersvalueitemid(PolicyItemid);
    }
    this.GetCurrentUserDetails();
    // setTimeout(() => {
    //   this.Policyackcurrentuserlistdata();
    // }, 2000);
  }

  public GetUsersvalueitemidForPrint(ppId) {

    $(".print-dynamicpolicyname").hide()
    $("#print-facilityunit-withoutdynamic").show();
    $("#print-facilityunit-dynamic").hide()
    $("#print-userpolicyupdatebtn").hide();
    $("#print-sssaveitemploicy").hide();
    $(".print-policyacknowledgmentimg").show();
    $(`#print-Dynamicimgpolicy`).hide();
    $(`#print-imgshowpolicy`).show();
    $(`.print-policydynamicname`).show();
    $(".print-policyempofficename").hide();
    $("#print-ploicyunitname").hide();
    $("#print-dynamicploicyunitname").show();
    newweb.lists
      .getByTitle("Employee Stamp Acknowledgement Transaction")
      .items.select(
        "ID",
        "Date",
        "EmployeeIDNumber",
        "EmployeePrintedName",
        "EmployeeIDNumber",
        "UnitLogo",
        "BusinessUnit",
        "ONBSessionID",
        "AttachmentFullname",
        "Otherinformation",
        "ControlNumber",
        "VersionNumber",
        "Stampcontrolnumber",
        "Dosmistercontrolnumber",
        "Physioncontrolnumber",
        "Photocontrolnumber",
        "Stampversionnumber",
        "Dosmisterversionnumber",
        "Physicianversionnumber",
        "Photoversionnumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {

        if (result.length != 0) {
          $("#print-Stamp-Control-Number").text(result[0].Stampcontrolnumber)
          $("#print-Stamp-Version-Number").text(result[0].Stampversionnumber)

          $("#print-Dosimeter-Control-Number").text(result[0].Dosmistercontrolnumber)
          $("#print-Dosimeter-Version-Number").text(result[0].Dosmisterversionnumber)

          $("#print-Physician-Control-Number").text(result[0].Physioncontrolnumber)
          $("#print-Physician-Version-Number").text(result[0].Physicianversionnumber)

          $("#print-Photo-Control-Number").text(result[0].Photocontrolnumber)
          $("#print-Photo-Version-Number").text(result[0].Photoversionnumber)

          $("#print-other-info").text(result[0].Otherinformation)
          $(".print-unitname").hide();
          $(".print-dynamicunitname").show();
          $(".print-policyacknowledgmenttitle").attr("style", "color:#00A36C");
          $(".print-stamppolicynamedynamicname").text(result[0].EmployeePrintedName);

          $("#print-stamppolicyidnumber").text(result[0].EmployeeIDNumber);
          // $("#stamppolicydate").val(moment(result.Date).format("YYYY-MM-DD"));

          ImageSrcpersonal = result[0].UnitLogo;
          dynamicunitname = result[0].BusinessUnit;

          newweb.lists
            .getByTitle("Employee Dosimeter Acknowledgement Transaction")
            .items.select(
              "ID",
              "Date",
              "Idstamp2",
              "EmployeeName",
              "EmployeeIDNumber",
              "DosimeterNumber",
              "ONBSessionID"
            )
            .filter("ONBSessionID eq '" + EditSessionid + "'")
            .get()
            .then((response) => {
              DosimeterId = response[0].ID;
              //  $(`#Dosimeterpolicyname`).val(response[0].EmployeeName),
              $(`#print-Dosimeternumber`).text(response[0].DosimeterNumber),
                // $("#domisterpolicydate").val(
                //   moment(response[0].Date).format("YYYY-MM-DD")
                // ),
                $(`#print-Dosimeterpolicyidnumber`).text(response[0].EmployeeIDNumber);
            });

          newweb.lists
            .getByTitle("Physician Profile for PR Transaction")
            .items.select(
              "ID",
              "EmployeeNationality",
              "EmployeeName",
              "Subspecialty",
              "Specialty",
              "ONBSessionID"
            ).filter("ONBSessionID eq '" + EditSessionid + "'")
            .get().then((response) => {
              Physicianid = response[0].ID;


              $(`#print-phypolicyempationality`).text(response[0].EmployeeNationality);
              $("#print-specialty").text(response[0].Specialty);
              $(`#print-Subspecialty`).text(response[0].Subspecialty);
            });

          newweb.lists
            .getByTitle("PhotoVideo Consent and Release Form Transaction")
            .items.select(
              "ID",
              "Date",
              "Idstamp3",
              "EmployeeName",
              "EmployeeIDNumber",
              "Facility",
              "ONBSessionID"
            ).filter("ONBSessionID eq '" + EditSessionid + "'")
            .get()
            .then((response) => {

              idrelese = response[0].ID;
              $(`#print-facilityUnitdynamic`).text(response[0].Facility),
                // $("#consentReleasedate").val(
                //   moment(response[0].Date).format("YYYY-MM-DD")
                // ),
                $(`#print-concentidno`).text(response[0].EmployeeIDNumber);
            });
          newweb.lists
            .getByTitle("Clinicans special interest")
            .items.select("ID", "Specialinterest", "ONBSessionID", "OrderNo", "StampID")
            .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
            .get()
            .then((result) => {
              $(".print-tr_emptydata").hide();
              if (result.length != 0) {
                for (var i = 0; i < result.length; i++) {
                  var newrow = $("<tr>");
                  var cols = "";
                  cols +=
                    '<td><span  id="print-tble-txt-specialinterest" >' +
                    result[i].Specialinterest +
                    '</span></td>';

                  newrow.append(cols);
                  $("table #print-tble-tbody-dynamicspecial-special").append(newrow);
                }
                if (result.length < 5) {
                  var specialRemainingrow: number = 5 - result.length;
                  for (var i = 0; i < specialRemainingrow; i++) {
                    var newrow = $("<tr>");
                    var cols = "";
                    cols +=
                      '<td><span  id="print-tble-txt-specialinterest" >' +
                      "-" +
                      '</span></td>';

                    newrow.append(cols);
                    $("table #print-tble-tbody-dynamicspecial-special").append(newrow);
                  }

                }
              } else {
                for (var i = 0; i < 5; i++) {
                  var newRow = $("<tr>");
                  var cols = "";
                  cols += '<td><span id="print-tble-txt-specialinterest" >' + "-" + '</span></td>';
                  newRow.append(cols);
                  $("table #print-tble-tbody-dynamicspecial-special").append(newRow);

                }
              }
            })


          newweb.lists
            .getByTitle("Clinicans ProfessionalMemberships")
            .items.select("ID", "ProfessionalMemberships", "ONBSessionID", "OrderNo", "StampID")
            .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
            .get()
            .then((result) => {

              if (result.length != 0) {
                for (var i = 0; i < result.length; i++) {
                  var newrow = $("<tr>");

                  var cols = "";
                  cols +=
                    '<td><span id="print-tble-txt-Profationalmembership" >' +
                    result[i].ProfessionalMemberships +
                    '</span></td>';
                  newrow.append(cols);
                  $("table #print-tble-tbody-dynamicspecial-ProfessionalMemberships").append(newrow);
                }
                if (result.length < 5) {
                  var ProfessionalMembershipsRemainingrow: number = 5 - result.length;
                  for (var i = 0; i < ProfessionalMembershipsRemainingrow; i++) {
                    var newrow = $("<tr>");

                    var cols = "";
                    cols +=
                      '<td><span id="print-tble-txt-Profationalmembership" >' +
                      "-" +
                      '</span></td>';
                    newrow.append(cols);
                    $("table #print-tble-tbody-dynamicspecial-ProfessionalMemberships").append(newrow);
                  }

                }
              } else {
                for (var i = 0; i < 5; i++) {
                  var newRow = $("<tr>");
                  var cols = "";
                  cols += '<td><span id="print-tble-txt-Profationalmembership" >' + "-" + '</span></td>';
                  newRow.append(cols);
                  $("table #print-tble-tbody-dynamicspecial-ProfessionalMemberships").append(newRow);

                }
              }
            })

        }

      });
  }



  public GetUsersvalueitemid(ppId) {


    $(".dynamicpolicyname").hide()
    $("#facilityunit-withoutdynamic").show();
    $("#facilityunit-dynamic").hide()
    $("#userpolicyupdatebtn").hide();
    $("#sssaveitemploicy").hide();

    $(`#Dynamicimgpolicy`).hide();
    $(`#imgshowpolicy`).show();
    $(`.policydynamicname`).show();
    $(".policyempofficename").hide();
    $("#ploicyunitname").hide();
    $("#dynamicploicyunitname").show();
    newweb.lists
      .getByTitle("Employee Stamp Acknowledgement Transaction")
      .items.select(
        "ID",
        "Date",
        "EmployeeIDNumber",
        "EmployeePrintedName",
        "EmployeeIDNumber",
        "UnitLogo",
        "BusinessUnit",
        "ONBSessionID",
        "AttachmentFullname",
        "Otherinformation",
        "Stampcontrolnumber",
        "Dosmistercontrolnumber",
        "Physioncontrolnumber",
        "Photocontrolnumber",
        "Stampversionnumber",
        "Dosmisterversionnumber",
        "Physicianversionnumber",
        "Photoversionnumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {

        if (result.length != 0) {
          stamplistid = result[0].ID
          Stampcontrolnumber = result[0].Stampcontrolnumber
          Dosmistercontrolnumber = result[0].Dosmistercontrolnumber
          Physioncontrolnumber = result[0].Physioncontrolnumber
          Photocontrolnumber = result[0].Photocontrolnumber
          Stampversionnumber = result[0].Stampversionnumber
          Dosmisterversionnumber = result[0].Dosmisterversionnumber
          Physicianversionnumber = result[0].Physicianversionnumber
          Photoversionnumber = result[0].Photoversionnumber

          $("#other-info").val(result[0].Otherinformation)
          $(".policyacknowledgmentimg").show();
          AttachmentFullname = result[0].AttachmentFullname
          this.Getpolicydocumentlibraryeditfile(result[0].AttachmentFullname);
          this.Getpolicydocumentlibraryeviewfile(result[0].AttachmentFullname);

          $(".unitname").hide();
          $(".dynamicunitname").show();
          $(".stamppolicynamedynamicname").val(result[0].EmployeePrintedName);
          $("#stamppolicyidnumber").val(result[0].EmployeeIDNumber);


          ImageSrcpersonal = result[0].UnitLogo;
          dynamicunitname = result[0].BusinessUnit;
        }
      });


    newweb.lists
      .getByTitle("Employee Dosimeter Acknowledgement Transaction")
      .items.select(
        "ID",
        "Date",
        "Idstamp2",
        "EmployeeName",
        "EmployeeIDNumber",
        "DosimeterNumber",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((response) => {
        DosimeterId = response[0].ID;
        $(`#Dosimeternumber`).val(response[0].DosimeterNumber),
          $(`#Dosimeterpolicyidnumber`).val(response[0].EmployeeIDNumber);
        $("#concentidno").val(response[0].EmployeeIDNumber);

      });

    newweb.lists
      .getByTitle("Physician Profile for PR Transaction")
      .items.select(
        "ID",
        "EmployeeNationality",
        "EmployeeName",
        "Subspecialty",
        "Specialty",
        "ONBSessionID"
      ).filter("ONBSessionID eq '" + EditSessionid + "'")
      .get().then((response) => {
        Physicianid = response[0].ID;
        setTimeout(() => {
          $(`#phypolicyempationality`).val(response[0].EmployeeNationality);
        }, 1000);


        $(`#Subspecialty`).val(response[0].Subspecialty);

        setTimeout(() => {
          $("#Specialty").val(response[0].Specialty);
        }, 1000);
      });

    newweb.lists
      .getByTitle("PhotoVideo Consent and Release Form Transaction")
      .items.select(
        "ID",
        "Date",
        "Idstamp3",
        "EmployeeName",
        "EmployeeIDNumber",
        "Facility",
        "ONBSessionID"
      ).filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((response) => {
        idrelese = response[0].ID;
        $("#facilityUnitdynamic").val(response[0].Facility),

          $("#concentidno").val(response[0].EmployeeIDNumber);
      });


    newweb.lists
      .getByTitle("Clinicans special interest")
      .items.select("ID", "Specialinterest", "ONBSessionID", "OrderNo", "StampID")
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        $(".tr_emptydata").hide()
        console.log(result);
        $(".tr_emptydata").hide()
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            var newrow = $("<tr>");

            var cols = "";
            cols +=
              '<td><input type="hidden" id="hdn-policysck-dec-special-itm-id" value="' + result[i].ID + '"></input><input type="text" class="form-control" id="tble-txt-specialinterest" autoComplete="off"value="' +
              result[i].Specialinterest +
              '" ></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicspecial-special").append(newrow);
          }
        }
      })




    newweb.lists
      .getByTitle("Clinicans ProfessionalMemberships")
      .items.select("ID", "ProfessionalMemberships", "ONBSessionID", "OrderNo", "StampID")
      .filter("ONBSessionID eq '" + EditSessionid + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        console.log(result);
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            var newrow = $("<tr>");

            var cols = "";
            cols +=
              '<td><input type="hidden" id="hdn-policysck-dec-professional-itm-id" value="' + result[i].ID + '"></input><input type="text" class="form-control" id="tble-txt-Profationalmembership" autoComplete="off"value="' +
              result[i].ProfessionalMemberships +
              '" ></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicspecial-ProfessionalMemberships").append(newrow);
          }
        }
      })
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

        }
        reactHandler.setState({
          CountryName: items,
        });
      });
  }

  public Getpolicydocumentlibraryeditfile(Name) {
    if (GlobalFormOpenedMode == "Edit") {

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

      var str = Name;
      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`PersonalAcknowledgment/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);
          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Doh License") {
              allitem3.push(allitem[i]);
              dohfile = allitem3[0].ServerRelativeUrl;

              $("#dohLicense").hide();
              $(".doh-delete").show();
              $(".doh-item").show();
              $(".ploicy_yes1").attr("style", "color:#00A36C");
              $("#dohyes").show();
              $("#dohno").hide();

            }

            if (allitem[i].ListItemAllFields.Tags == "Copy of data flow") {
              allitem32.push(allitem[i]);
              dataflowfile = allitem32[0].ServerRelativeUrl;

              $("#Copydataflow").hide();
              $(".Copydataflow-delete").show();
              $(".Copydataflow-item").show();
              $(".ploicy_yes2").attr("style", "color:#00A36C");
              $("#copydataflowyes").show();
              $("#copydataflowno").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Home country license") {
              allitem33.push(allitem[i]);
              countrylicensefile = allitem33[0].ServerRelativeUrl;

              $("#homecountrylicense").hide();
              $(".ploicy_yes3").attr("style", "color:#00A36C");
              $(".homecountrylicense-delete").show();
              $(".homecountrylicense-item").show();
              $("#homelicenceyes").show();
              $("#homelicenceno").hide();
            }

            //4
            if (
              allitem[i].ListItemAllFields.Tags ==
              "country registration certificate"
            ) {
              allitem34.push(allitem[i]);
              homecountryregistrationfile = allitem34[0].ServerRelativeUrl;

              $("#country_registration_certificate").hide();
              $(".ploicy_yes4").attr("style", "color:#00A36C");
              $(".country_registration_certificate-delete").show();
              $(".country_registration_certificate-item").show();
              $("#country_registrationeno").hide();
              $("#country_registrationyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "Log Book") {
              allitem35.push(allitem[i]);
              logbookfile = allitem35[0].ServerRelativeUrl;

              $("#Logbook").hide();
              $(".Logbook-delete").show();
              $(".Logbook-item").show();
              $(".ploicy_yes5").attr("style", "color:#00A36C");
              $("#Logbookno").hide();
              $("#Logbookyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "BLS") {
              allitem36.push(allitem[i]);
              blsfile = allitem36[0].ServerRelativeUrl;

              $("#bls").hide();
              $(".ploicy_yes6").attr("style", "color:#00A36C");
              $(".bls-delete").show();
              $(".bls-item").show();
              $("#blsno").hide();
              $("#blsyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ACLS") {
              allitem37.push(allitem[i]);
              aclsfile = allitem37[0].ServerRelativeUrl;

              $("#aclsno").hide();
              $("#aclsyes").show();
              $(".acls-delete").show();
              $(".acls-item").show();
              $("#acls").hide();
              $(".ploicy_yes7").attr("style", "color:#00A36C");
            }

            if (allitem[i].ListItemAllFields.Tags == "PALS") {
              allitem38.push(allitem[i]);
              palsfile = allitem38[0].ServerRelativeUrl;


              $(".pals-delete").show();
              $(".pals-item").show();
              $(".ploicy_yes8").attr("style", "color:#00A36C");
              $("#pals").hide();
              $("#palsno").hide();
              $("#palsyes").show();
            }
            if (allitem[i].ListItemAllFields.Tags == "NRP") {
              allitem39.push(allitem[i]);
              nrpfile = allitem39[0].ServerRelativeUrl;

              $("#nrp").hide();
              $(".ploicy_yes9").attr("style", "color:#00A36C");
              $(".nrp-delete").show();
              $(".nrp-item").show();
              $("#nrpno").hide();
              $("#nrpyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ATLS") {
              allitem310.push(allitem[i]);
              altsfile = allitem310[0].ServerRelativeUrl;

              $(".alts-delete").show();
              $(".alts-item").show();
              $("#alts").hide();
              $("#altsno").hide();
              $("#altsyes").show();
              $(".ploicy_yes10").attr("style", "color:#00A36C");
            }
          }
        });
    }
  }

  public Getpolicydocumentlibraryeviewfile(Name) {
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

      var str = Name;
      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`PersonalAcknowledgment/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);
          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Doh License") {
              allitem3.push(allitem[i]);
              dohfile = allitem3[0].ServerRelativeUrl;
              printdohfile = allitem3[0].Name;
              $("#dohLicense").hide();
              $(".doh-delete").hide();
              $(".doh-item").show();
              $(".ploicy_yes1").attr("style", "color:#00A36C");
              $("#dohyes").show();
              $("#dohno").hide();

              $("#print-dohyes").show();
              $("#print-dohno").hide();

              // $("#High-QualityPhoto-yes").show();
              // $("#High-QualityPhoto-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Copy of data flow") {
              allitem32.push(allitem[i]);
              dataflowfile = allitem32[0].ServerRelativeUrl;
              printdataflowfile = allitem32[0].Name;
              $("#Copydataflow").hide();
              $(".Copydataflow-delete").hide();
              $(".Copydataflow-item").show();
              $(".ploicy_yes2").attr("style", "color:#00A36C");
              $("#copydataflowyes").show();
              $("#copydataflowno").hide();

              $("#print-copydataflowyes").show();
              $("#print-copydataflowno").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Home country license") {
              allitem33.push(allitem[i]);
              countrylicensefile = allitem33[0].ServerRelativeUrl;
              printcountrylicensefile = allitem33[0].Name;
              $("#homecountrylicense").hide();
              $(".ploicy_yes3").attr("style", "color:#00A36C");
              $(".homecountrylicense-delete").hide();
              $(".homecountrylicense-item").show();
              $("#homelicenceyes").show();
              $("#homelicenceno").hide();

              $("#print-homelicenceyes").show();
              $("#print-homelicenceno").hide();
            }

            //4
            if (
              allitem[i].ListItemAllFields.Tags ==
              "country registration certificate"
            ) {
              allitem34.push(allitem[i]);
              homecountryregistrationfile = allitem34[0].ServerRelativeUrl;
              printhomecountryregistrationfile = allitem34[0].Name;
              $("#country_registration_certificate").hide();
              $(".ploicy_yes4").attr("style", "color:#00A36C");
              $(".country_registration_certificate-delete").hide();
              $(".country_registration_certificate-item").show();
              $("#country_registrationeno").hide();
              $("#country_registrationyes").show();

              $("#print-country_registrationeno").hide();
              $("#print-country_registrationyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "Log Book") {
              allitem35.push(allitem[i]);
              logbookfile = allitem35[0].ServerRelativeUrl;
              printlogbookfile = allitem35[0].Name;
              $("#Logbook").hide();
              $(".Logbook-delete").hide();
              $(".Logbook-item").show();
              $(".ploicy_yes5").attr("style", "color:#00A36C");
              $("#Logbookno").hide();
              $("#Logbookyes").show();

              $("#print-Logbookno").hide();
              $("#print-Logbookyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "BLS") {
              allitem36.push(allitem[i]);
              blsfile = allitem36[0].ServerRelativeUrl;
              printblsfile = allitem36[0].Name;
              $("#bls").hide();
              $(".ploicy_yes6").attr("style", "color:#00A36C");
              $(".bls-delete").hide();
              $(".bls-item").show();
              $("#blsno").hide();
              $("#blsyes").show();

              $("#print-blsno").hide();
              $("#print-blsyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ACLS") {
              allitem37.push(allitem[i]);
              aclsfile = allitem37[0].ServerRelativeUrl;
              printaclsfile = allitem37[0].Name;
              $("#aclsno").hide();
              $("#aclsyes").show();

              $("#print-aclsno").hide();
              $("#print-aclsyes").show();

              $(".acls-delete").hide();
              $(".acls-item").show();
              $("#acls").hide();
              $(".ploicy_yes7").attr("style", "color:#00A36C");
            }

            if (allitem[i].ListItemAllFields.Tags == "PALS") {
              allitem38.push(allitem[i]);
              palsfile = allitem38[0].ServerRelativeUrl;
              printpalsfile = allitem38[0].Name;

              $(".pals-delete").hide();
              $(".pals-item").show();
              $(".ploicy_yes8").attr("style", "color:#00A36C");
              $("#pals").hide();
              $("#palsno").hide();
              $("#palsyes").show();

              $("#print-palsno").hide();
              $("#print-palsyes").show();
            }
            if (allitem[i].ListItemAllFields.Tags == "NRP") {
              allitem39.push(allitem[i]);
              nrpfile = allitem39[0].ServerRelativeUrl;
              printnrpfile = allitem39[0].Name;
              $("#nrp").hide();
              $(".ploicy_yes9").attr("style", "color:#00A36C");
              $(".nrp-delete").hide();
              $(".nrp-item").show();
              $("#nrpno").hide();
              $("#nrpyes").show();

              $("#print-nrpno").hide();
              $("#print-nrpyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ATLS") {
              allitem310.push(allitem[i]);
              altsfile = allitem310[0].ServerRelativeUrl;
              printaltsfile = allitem310[0].Name;
              $(".alts-delete").hide();
              $(".alts-item").show();
              $("#alts").hide();
              $("#altsno").hide();
              $("#altsyes").show();

              $("#print-altsno").hide();
              $("#print-altsyes").show();
              $(".ploicy_yes10").attr("style", "color:#00A36C");
            }
          }
        });
    }
  }


  public Autopopulatingdataoneinputfieldtoanother() {
    $("#stamppolicyidnumber").keyup(function () {
      var value = $(this).val();
      $("#Dosimeterpolicyidnumber").val(value);
      $("#concentidno").val(value);


    });
    $("#Dosimeterpolicyidnumber").keyup(function () {
      var value = $(this).val();
      $("#stamppolicyidnumber").val(value);
      $("#concentidno").val(value);


    });

    $("#concentidno").keyup(function () {
      var value = $(this).val();
      $("#stamppolicyidnumber").val(value);
      $("#Dosimeterpolicyidnumber").val(value);


    });

    $(".vieweditname1").keyup(function () {
      var value = $(this).val();
      $(".vieweditname2").val(value);
      $(".vieweditname3").val(value);
      $(".vieweditname4").val(value);
      $(".vieweditname5").val(value);
    });
    $(".vieweditname2").keyup(function () {
      var value = $(this).val();
      $(".vieweditname1").val(value);
      $(".vieweditname3").val(value);
      $(".vieweditname4").val(value);
      $(".vieweditname5").val(value);
    });
    $(".vieweditname3").keyup(function () {
      var value = $(this).val();
      $(".vieweditname1").val(value);
      $(".vieweditname2").val(value);
      $(".vieweditname4").val(value);
      $(".vieweditname5").val(value);
    });

    $(".vieweditname4").keyup(function () {
      var value = $(this).val();
      $(".vieweditname1").val(value);
      $(".vieweditname2").val(value);
      $(".vieweditname3").val(value);
      $(".vieweditname5").val(value);
    });

    $(".vieweditname5").keyup(function () {
      var value = $(this).val();
      $(".vieweditname1").val(value);
      $(".vieweditname2").val(value);
      $(".vieweditname3").val(value);
      $(".vieweditname4").val(value);
    });

    $("#stamppolicyname").keyup(function () {
      var value = $(this).val();

      $("#Dosimeterpolicyname").val(value);
      $("#physicianpolicyname").val(value);
      $(".policy-name1").val(value);
      $("#consentReleaseempname").val(value);

    });


    $("#Dosimeterpolicyname").keyup(function () {
      var value = $(this).val();

      $("#stamppolicyname").val(value);
      $("#physicianpolicyname").val(value);
      $(".policy-name1").val(value);
      $("#consentReleaseempname").val(value);

    });


    $("#physicianpolicyname").keyup(function () {
      var value = $(this).val();

      $("#Dosimeterpolicyname").val(value);
      $("#stamppolicyname").val(value);
      $(".policy-name1").val(value);
      $("#consentReleaseempname").val(value);

    });


    $(".policy-name1").keyup(function () {
      var value = $(this).val();

      $("#Dosimeterpolicyname").val(value);
      $("#physicianpolicyname").val(value);
      $("#stamppolicyname").val(value);
      $("#consentReleaseempname").val(value);

    });


    $("#consentReleaseempname").keyup(function () {
      var value = $(this).val();

      $("#Dosimeterpolicyname").val(value);
      $("#physicianpolicyname").val(value);
      $(".policy-name1").val(value);
      $("#stamppolicyname").val(value);

    });
  }





  public FacilityUnitdynamic() {
    var status = true;
    if (status == true && $(`#facilityUnitdynamic`).val() != "") {
      $("#err-FacilityUnit").hide();
    } else {
      $("#err-FacilityUnit").show();
      status = false;
    }
    return status;
  }


  public EmployeeNamevalidationdynamic() {
    var status = true;
    if (status == true && $("#stamppolicynamedynamic").val() != "") {
      $(".printname-valid-err").hide();
    } else {
      $(".printname-valid-err").show();
      status = false;
    }
    return status;
  }

  public updatepolicyackdecleartion() {
    if (
      this.EmployeeNamevalidationdynamic() &&
      this.specialty() &&
      this.Subspecialty() &&
      this.FacilityUnitdynamic()

    ) {

      swal({
        text: "Please wait!",
        button: false,
        closeOnClickOutside: false,
      } as any);

      if (this.state.HrCompleteStatus == true) {
        this.AddPolicyHrUpdateHistory()
      }

      newweb.lists
        .getByTitle("Employee Stamp Acknowledgement Transaction")
        .items.getById(stamplistid)
        .update({
          EmployeePrintedName: $(`.vieweditname1`).val(),
          Otherinformation: $("#other-info").val(),
          EmployeeIDNumber: $(`#stamppolicyidnumber`).val(),
          Status: "Updated by Unit HR",
        });

      newweb.lists
        .getByTitle("Employee Dosimeter Acknowledgement Transaction")
        .items.getById(DosimeterId)
        .update({
          EmployeeName: $(`.vieweditname1`).val(),
          DosimeterNumber: $(`#Dosimeternumber`).val(),
          //  Date: $("#domisterpolicydate").val(),
          EmployeeIDNumber: $(`#Dosimeterpolicyidnumber`).val(),
          Status: "Updated by Unit HR",
        });
      newweb.lists
        .getByTitle("Physician Profile for PR Transaction")
        .items.getById(Physicianid)
        .update({
          EmployeeName: $(`.vieweditname1`).val(),
          EmployeeNationality: $(`#phypolicyempationality`).val(),
          Specialty: $(`#Specialty`).val(),
          UnitLogo: LogoUrl,
          Subspecialty: $("#Subspecialty").val(),
          Status: "Updated by Unit HR",
        });
      newweb.lists
        .getByTitle("PhotoVideo Consent and Release Form Transaction")
        .items.getById(idrelese)
        .update({
          EmployeeName: $(`.vieweditname1`).val(),
          EmployeeIDNumber: $(`#concentidno`).val(),
          Facility: $(`#facilityUnitdynamic`).val(),
          Status: "Updated by Unit HR",
        })
        .then((results: any) => {

          this.AddtabledataHR(stamplistid, GlobalSessionIDValue)

        });

      if (AttachmentUploaderStatusArrayValidator.length != 0) {


        this.updationAlattachments()
      } else {
        setTimeout(() => {
          swal({
            title: "The Form has been updated successfully",
            icon: "success",
          }).then(() => {
            location.reload()
          });
        }, 4000);
      }
    }
  }
  public AddPolicyHrUpdateHistory() {
    if (AttachmentUploaderStatusArrayValidator.length != 0) {

      this.AddAlattachmentsHRUpdateHist()
    }
    subweb.lists
      .getByTitle("Employee Stamp Acknowledgement HR Update History").items
      .add({
        EmployeePrintedName: $(`.vieweditname1`).val(),
        Otherinformation: $("#other-info").val(),
        EmployeeIDNumber: $(`#stamppolicyidnumber`).val(),
        Status: "Updated by Unit HR",
        ONBSessionID: GlobalSessionIDValue,
        AttachmentFullname: this.state.CurrentUserName,
        BusinessUnit: officename,
        Stampcontrolnumber: Stampcontrolnumber,
        Dosmistercontrolnumber: Dosmistercontrolnumber,
        Physioncontrolnumber: Physioncontrolnumber,
        Photocontrolnumber: Photocontrolnumber,
        Stampversionnumber: Stampversionnumber,
        Dosmisterversionnumber: Dosmisterversionnumber,
        Physicianversionnumber: Physicianversionnumber,
        Photoversionnumber: Photoversionnumber,
      });

    subweb.lists
      .getByTitle("Employee Dosimeter Acknowledgement HR Update History").items
      .add({
        EmployeeName: $(`.vieweditname1`).val(),
        DosimeterNumber: $(`#Dosimeternumber`).val(),
        //  Date: $("#domisterpolicydate").val(),
        EmployeeIDNumber: $(`#Dosimeterpolicyidnumber`).val(),
        Status: "Updated by Unit HR",
        ONBSessionID: GlobalSessionIDValue,
        BusinessUnit: officename,
      });
    subweb.lists
      .getByTitle("Physician Profile for PR HR Update History").items
      .add({
        EmployeeName: $(`.vieweditname1`).val(),
        EmployeeNationality: $(`#phypolicyempationality`).val(),
        Specialty: $(`#Specialty`).val(),
        UnitLogo: LogoUrl,
        Subspecialty: $("#Subspecialty").val(),
        Status: "Updated by Unit HR",
        ONBSessionID: GlobalSessionIDValue,
        BusinessUnit: officename,
      });
    subweb.lists
      .getByTitle("PhotoVideo Consent and Release Form HR Update History").items
      .add({
        EmployeeName: $(`.vieweditname1`).val(),
        EmployeeIDNumber: $(`#concentidno`).val(),
        Facility: $(`#facilityUnitdynamic`).val(),
        Status: "Updated by Unit HR",
        ONBSessionID: GlobalSessionIDValue,
        BusinessUnit: officename,
      })
      .then((results: any) => {

        this.AddtabledataHRUpdateHist(stamplistid, GlobalSessionIDValue)

      });
  }
  public AddtabledataHRUpdateHist(stamplistid, ONBSessionID) {
    $("#cust-table-ProfessionalMemberships tbody tr").each(function (index) {
      var currentrow = $(this)
      var column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val();

      if (column1 != "") {
        column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val() : "-";

        subweb.lists
          .getByTitle("Clinicans Professional Memberships HR Update History")
          .items.add({
            ProfessionalMemberships: column1,
            StampID: stamplistid,
            ONBSessionID: ONBSessionID,
            OrderNo: index

          });

      }

    });

    $("#cust-table-special tbody tr").each(function (index) {
      var currentrow = $(this)
      var column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val();

      if (column1 != "") {
        column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val() : "-";

        subweb.lists
          .getByTitle("Clinicans Special Interest HR Update History")
          .items.add({
            Specialinterest: column1,
            StampID: stamplistid,
            ONBSessionID: ONBSessionID,
            OrderNo: index

          });


      }

    });
  }
  public AddtabledataHR(stamplistid, ONBSessionID) {
    $("#cust-table-ProfessionalMemberships tbody tr").each(function (index) {
      var currentrow = $(this)
      var column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val();

      if (column1 != "") {
        column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-Profationalmembership']").val() : "-";
        var TempTableChildItemID: any = currentrow.find("td:eq(0)").find("input[id*='hdn-policysck-dec-professional-itm-id']").val();


        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Clinicans ProfessionalMemberships")
            .items.add({
              ProfessionalMemberships: column1,
              StampID: stamplistid,
              ONBSessionID: ONBSessionID,
              OrderNo: index

            });
        } else {
          newweb.lists
            .getByTitle("Clinicans ProfessionalMemberships")
            .items.getById(parseInt(TempTableChildItemID)).update({
              ProfessionalMemberships: column1,
              StampID: stamplistid,
              ONBSessionID: ONBSessionID,
              OrderNo: index
            });
        }


      }

    });



    $("#cust-table-special tbody tr").each(function (index) {
      var currentrow = $(this)
      var column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val();

      if (column1 != "") {
        column1 = currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val() != "" ? currentrow.find("td:eq(0)").find("input[id*='tble-txt-specialinterest']").val() : "-";


        var TempTableChildItemID: any = currentrow.find("td:eq(0)").find("input[id*='hdn-policysck-dec-special-itm-id']").val();


        if (TempTableChildItemID == "null") {
          newweb.lists
            .getByTitle("Clinicans special interest")
            .items.add({
              Specialinterest: column1,
              StampID: stamplistid,
              ONBSessionID: ONBSessionID,
              OrderNo: index

            });
        } else {
          newweb.lists
            .getByTitle("Clinicans special interest")
            .items.getById(parseInt(TempTableChildItemID)).update({
              Specialinterest: column1,
              StampID: stamplistid,
              ONBSessionID: ONBSessionID,
              OrderNo: index
            });
        }


      }

    });
  }

  public AddAlattachmentsHRUpdateHist() {
    this.Add_HR_Upadate_Attachmentfiledoh();
    this.Add_HR_Upadate_Attachmentfilesave();
    this.Add_HR_Upadate_Attachmentfilesavelicence();
    this.Add_HR_Upadate_countryregistrationcertificate();
    this.Add_HR_Upadate_Logbook();
    this.Add_HR_Upadate_Blsattachment();
    this.Add_HR_Upadate_Attachmentacls();
    this.Add_HR_Upadate_Attachmentpals();
    this.Add_HR_Upadate_Attachmentnrp();
    this.Add_HR_Upadate_Attachmentalts();
  }

  public async Add_HR_Upadate_Attachmentfiledoh() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#dohLicense") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#dohLicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "dohLicense";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Doh License",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentfilesave() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#Copydataflow") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#Copydataflow") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Copy-of-data-flow";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Copy of data flow",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentfilesavelicence() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#homecountrylicense") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#homecountrylicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "homecountry-license";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Home country license",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_countryregistrationcertificate() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector(
        "#country_registration_certificate"
      ) as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector(
            "#country_registration_certificate"
          ) as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "country-registration-certificate";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "country registration certificate",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Logbook() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#Logbook") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#Logbook") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Logbook";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Log Book",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Blsattachment() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#bls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#bls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "bls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "BLS",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentacls() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#acls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#acls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "acls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ACLS",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentpals() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#pals") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#pals") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "pals";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PALS",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentnrp() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#nrp") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#nrp") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "nrp";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "NRP",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }

  public async Add_HR_Upadate_Attachmentalts() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#alts") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#alts") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "alts";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await subweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/UH/Personal Acknowledgment HR Update History/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ATLS",
                })

            });
          })
          .catch((error) => { });
      }
    }
  }



  public updationAlattachments() {
    this.Updation_Attachmentfiledoh();
    this.Updation_Attachmentfilesave();
    this.Updation_Attachmentfilesavelicence();
    this.Updation_countryregistrationcertificate();
    this.Updation_Logbook();
    this.Updation_Blsattachment();
    this.Updation_Attachmentacls();
    this.Updation_Attachmentpals();
    this.Updation_Attachmentnrp();
    this.Updation_Attachmentalts();
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

        // $(".policy-name1").val(resultData.d.DisplayName)
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



        reacthandler.createfolderwithname(Name);
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            var ofcname = properties[i].Value;
            $(".Unitnameploicyfacility").val(ofcname)
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

      const fieldname1: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Control Number")();

      const fieldname2: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Version Number")();


      await newweb.lists.getByTitle("Onboarding Subsection Form Name Master").items.select("*", "Title")

        .get()
        .then((results) => {

          if (results.length != 0) {


            for (var i = 0; i < results.length; i++) {
              if (results[i].Title == "Employee Seal Stamp Acknowledgement") {
                stampcontrolno = results[i][fieldname1.InternalName]
                stampversionon = results[i][fieldname2.InternalName]



              }
              if (results[i].Title == "Employee Dosimeter Acknowledgement") {
                dosmisterControlno = results[i][fieldname1.InternalName]
                dosmisterversionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Physician Profile For PR") {
                physionControlno = results[i][fieldname1.InternalName]
                physicianVersionno = results[i][fieldname2.InternalName]


              }
              if (results[i].Title == "Photo Video Consent And Release Form") {
                PhotoControlno = results[i][fieldname1.InternalName]
                PhotoVersionno = results[i][fieldname2.InternalName]


              }
            }
          }


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
          this.GetUsernamefrompersonalinfo(response[0].ONBSessionID)
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'JOINING REPORT' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'POLICY ACKNOWLEDGMENT AND DECLARATION'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "POLICY ACKNOWLEDGMENT AND DECLARATION") {
          this.setState({
            PolicyAckandDeclarationSubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.GetAttachmentfolderitem(this.state.CurrentUserName);
            this.Policyackcurrentuserlistdata(ONBSessionID, FormMode);

          }
        }
      }
    });
  }



  public GetUsernamefrompersonalinfo(ONBSessionID) {

    newweb.lists
      .getByTitle("Personal Information Master")
      .items.select(
        "FullName",
        "ContactNumber",
        "Countrycodefirstsection",
        "ONBSessionID",
        "Gender",
        "jobappliedfor",
        "CurrentNationality"

      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {



          $("#stamppolicyname").val(result[0].FullName)
          $("#Dosimeterpolicyname").val(result[0].FullName)
          $("#physicianpolicyname").val(result[0].FullName)
          $(".employee-userName").val(result[0].FullName)
          $("#consentReleaseempname").val(result[0].FullName)
          $("#phypolicyempationality").val(result[0].CurrentNationality)

        }
      })

    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "Designation",
        "Department",
        "ONBSessionID",
        "EmployeeIDNumber",
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {
          $("#stamppolicyidnumber").val(result[0].EmployeeIDNumber)
          $("#Dosimeterpolicyidnumber").val(result[0].EmployeeIDNumber)
          $(".sconcentidnos").val(result[0].EmployeeIDNumber)

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

  public filevaliadation1() {
    var filestatus = true;
    let filedoh = (document.querySelector("#dohLicense") as HTMLInputElement)
      .files.length;
    if ((filestatus = true && filedoh != 0)) {
      $("#err-dohinputfiled").hide();
    } else {
      $("#err-dohinputfiled").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationcopy() {
    var filestatus = true;
    let myfilcopy = (
      document.querySelector("#Copydataflow") as HTMLInputElement
    ).files.length;
    if ((filestatus = true && myfilcopy != 0)) {
      $("#err-Copydataflow").hide();
    } else {
      $("#err-Copydataflow").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationhome1() {
    var filestatus = true;
    let myfiledohhome = (
      document.querySelector("#homecountrylicense") as HTMLInputElement
    ).files.length;
    if ((filestatus = true && myfiledohhome != 0)) {
      $("#err-homecountry").hide();
    } else {
      $("#err-homecountry").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filecountryregistration() {
    var filestatus = true;
    let countryreg = (
      document.querySelector(
        "#country_registration_certificate"
      ) as HTMLInputElement
    ).files.length;
    if ((filestatus = true && countryreg != 0)) {
      $("#err-country_reg_cert").hide();
    } else {
      $("#err-country_reg_cert").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationlogbook() {
    var filestatus = true;
    let logbookfile = (document.querySelector("#Logbook") as HTMLInputElement)
      .files.length;
    if ((filestatus = true && logbookfile != 0)) {
      $("#err-logbook").hide();
    } else {
      $("#err-logbook").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationbls() {
    var filestatus = true;
    let blifile = (document.querySelector("#bls") as HTMLInputElement).files
      .length;
    if ((filestatus = true && blifile != 0)) {
      $("#err-bls").hide();
    } else {
      $("#err-bls").show();
      filestatus = false;
    }
    return filestatus;
  }
  public filemyacls() {
    var filestatus = true;
    let myacls = (document.querySelector("#acls") as HTMLInputElement).files
      .length;
    if ((filestatus = true && myacls != 0)) {
      $("#err-acls").hide();
    } else {
      $("#err-acls").show();
      filestatus = false;
    }
    return filestatus;
  }
  public filevalidationpals() {
    var filestatus = true;
    let myfilpals = (document.querySelector("#pals") as HTMLInputElement).files
      .length;
    if ((filestatus = true && myfilpals != 0)) {
      $("#err-pals").hide();
    } else {
      $("# err-homecountry").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationnrp() {
    var filestatus = true;
    let mynrp = (document.querySelector("#nrp") as HTMLInputElement).files
      .length;
    if ((filestatus = true && mynrp != 0)) {
      $("#err-nrp").hide();
    } else {
      $("#err-nrp").show();
      filestatus = false;
    }
    return filestatus;
  }

  public filevalidationhome() {
    var filestatus = true;
    let myfiledohhome = (document.querySelector("#alts") as HTMLInputElement)
      .files.length;
    if ((filestatus = true && myfiledohhome != 0)) {
      $("#err-alts").hide();
    } else {
      $("#err-alts").show();
      filestatus = false;
    }
    return filestatus;
  }

  public Idcardno() {
    var status = true;
    if (status == true && $(`#stamppolicyidnumber`).val() != "") {
      $("#err-idnopolicy").hide();
    } else {
      $("#err-idnopolicy").show();
      $("#stamppolicyidnumber").focus()
      status = false;
    }
    return status;
  }

  public Dosimeterpolicyidnumbers() {
    var status = true;
    if (status == true && $(`#Dosimeterpolicyidnumber`).val() != "") {
      $("#err-Dosimeteridpolicy").hide();
    } else {
      $("#err-Dosimeteridpolicy").show();
      $("#Dosimeterpolicyidnumber").focus()
      status = false;
    }
    return status;
  }

  public Dosimeternumber() {
    var status = true;
    if (status == true && $(`#Dosimeternumber`).val() != "") {
      $("#err-DosimeterNumber").hide();
    } else {
      $("#err-DosimeterNumber").show();
      $("#Dosimeternumber").focus()
      status = false;
    }
    return status;
  }
  public physicianemployeenationality() {
    var status = true;
    if (status == true && $(`#phypolicyempationality`).find(":selected").text() == "Select") {
      $("#err-physicianemployeenationality").show();
      $("#phypolicyempationality").focus()
      status = false;
    } else {
      $("#err-physicianemployeenationality").hide();

    }
    return status;
  }

  public specialty() {
    var status = true;
    if (status == true && $(`#Specialty`).find(":selected").text() != "Select") {
      $("#err-specialtyidpolicy").hide();
    } else {
      $("#err-specialtyidpolicy").show();
      $("#Specialty").focus()
      status = false;
    }
    return status;
  }

  public Subspecialty() {
    var status = true;
    if (status == true && $(`#Subspecialty`).val() != "") {
      $("#err-Subspecialty").hide();
    } else {
      $("#err-Subspecialty").show();
      $("#Subspecialty").focus()
      status = false;
    }
    return status;
  }

  public Concentidno() {
    var status = true;
    if (status == true && $(`.sconcentidnos`).val() != "") {
      $("#err-concentidno").hide();
    } else {
      $("#err-concentidno").show();
      $(".sconcentidnos").focus()
      status = false;
    }
    return status;
  }

  public FacilityUnit() {
    var status = true;
    if (status == true && $(`#facilityUnit`).val() != "") {
      $("#err-FacilityUnit").hide();
    } else {
      $("#err-FacilityUnit").show();
      $("#facilityUnit").focus()
      status = false;
    }
    return status;
  }
  public EmployeeNamevalidation() {
    var status = true;
    if (status == true && $("#stamppolicyname").val() != "") {
      $(".printname-valid-err").hide();
    } else {
      $(".printname-valid-err").show();
      $("#stamppolicyname").focus()
      status = false;
    }
    return status;
  }




  public SaveListItem() {
    if (
      this.EmployeeNamevalidation() &&
      this.specialty() &&
      this.Subspecialty() &&
      this.FacilityUnit()

    ) {
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
            .getByTitle("Employee Stamp Acknowledgement Transaction")
            .items.add({
              Title: "POLICY ACKNOWLEDGMENT AND DECLARATION",
              EmployeePrintedName: $(`#stamppolicyname`).val(),
              EmployeeIDNumber: $(`#stamppolicyidnumber`).val(),
              BusinessUnit: officename,
              Status: "Submitted by employee",
              UnitLogo: LogoUrl,
              ONBSessionID: this.state.ONBSessionID,
              AttachmentFullname: this.state.CurrentUserName,
              Otherinformation: $("#other-info").val(),

              Stampcontrolnumber: this.state.ControlNumber + "/" + stampcontrolno,
              Dosmistercontrolnumber: this.state.ControlNumber + "/" + dosmisterControlno,
              Physioncontrolnumber: this.state.ControlNumber + "/" + physionControlno,
              Photocontrolnumber: this.state.ControlNumber + "/" + PhotoControlno,
              Stampversionnumber: stampversionon,
              Dosmisterversionnumber: dosmisterversionno,
              Physicianversionnumber: physicianVersionno,
              Photoversionnumber: PhotoVersionno,

            })
            .then((result: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'POLICY ACKNOWLEDGMENT AND DECLARATION'").orderBy("Created", false).get().then((response) => {
                if (response.length != 0) {
                  newweb.lists.getByTitle("Onboarding Transaction Master").items.getById(response[0].Id).update({
                    Status: "Completed",
                    CompletedOn: moment().format("MM/DD/YYYY")
                  });
                }
              });


              this.Addtabledata(result.data.ID, this.state.ONBSessionID);
              if (AttachmentUploaderStatusArrayValidator.length != 0) {


                this.Alattachments();
              } else {
                setTimeout(() => {
                  swal({
                    title: "The form has been Submitted Successfully",
                    icon: "success",
                  }).then(() => {
                    location.reload()
                  });
                }, 4000);
              }

            });
        }
      });

      let list2 = newweb.lists.getByTitle(
        "Employee Dosimeter Acknowledgement Transaction"
      );
      list2.items
        .add({
          Title: "POLICY ACKNOWLEDGMENT AND DECLARATION",
          EmployeeName: $(`#Dosimeterpolicyname`).val(),
          DosimeterNumber: $(`#Dosimeternumber`).val(),
          BusinessUnit: officename,
          Status: "Submitted by employee",
          EmployeeIDNumber: $(`#Dosimeterpolicyidnumber`).val(),
          UnitLogo: LogoUrl,
          ONBSessionID: this.state.ONBSessionID
        }).then((resultsss: any) => {

        });
      let list4 = newweb.lists.getByTitle(
        "PhotoVideo Consent and Release Form Transaction"
      );
      list4.items
        .add({
          Title: "POLICY ACKNOWLEDGMENT AND DECLARATION",
          EmployeeName: $(`#consentReleaseempname`).val(),
          EmployeeIDNumber: $(`#concentidno`).val(),
          Facility: $(`#facilityUnit`).val(),
          UnitLogo: LogoUrl,
          BusinessUnit: officename,
          Status: "Submitted by employee",
          ONBSessionID: this.state.ONBSessionID
        }).then((results: any) => {


        });


      let list3 = newweb.lists.getByTitle(
        "Physician Profile for PR Transaction"
      );
      list3.items
        .add({
          Title: "POLICY ACKNOWLEDGMENT AND DECLARATION",
          EmployeeName: $(`#physicianpolicyname`).val(),
          EmployeeNationality: $(`#phypolicyempationality`).val(),
          Specialty: $(`#Specialty`).val(),
          UnitLogo: LogoUrl,
          Subspecialty: $("#Subspecialty").val(),
          BusinessUnit: officename,
          Status: "Submitted by employee",
          ONBSessionID: this.state.ONBSessionID
        })
        .then((resultss: any) => {



        });

    }
  }




  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-ack-clinicians').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    location.reload();
    document.body.innerHTML = originalContents;

  }


  public async createfolderwithname(Username) {
    // var   str="this is the item";
    var str = Username;
    var FullName = str.split(" ").join("");

    const folder = newweb
      .getFolderByServerRelativePath(`PersonalAcknowledgment/${FullName}`)
      .select("Exists")
      .get();
    if (!(await folder).Exists) {
      newweb.folders
        .add(`PersonalAcknowledgment/${FullName}`)
        .then(function (data) {
          //("Folder is created at " + data.data.ServerRelativeUrl);
        })
        .catch(function (data) {
          //(data);
        });
    }
    const fol = subweb.getFolderByServerRelativePath(`Personal Acknowledgment HR Update History/${FullName}`)
      .select("Exists").get();
    if (!(await fol).Exists) {
      subweb.folders.add(`Personal Acknowledgment HR Update History/${FullName}`)
    }
  }

  public CheckAttachmentupdation() {
    $("#dohLicense").on("change", function (event) {
      $("#dohno").hide();
      $("#dohyes").show();
      $(".ploicy_yes1").attr("style", "color:#00A36C");
      $("#attactmentdoh-yes").prop("checked", true);
    });

    $("#dohLicense").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#dohLicense") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "dohLicense-fileblock" }),
        fileName = $("<span/>", {
          class: "dohLicensename",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="dohLicensecross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Doh-append").append(fileBloc);
      $("#dohLicense").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".dohLicensecross",
      function (event) {
        //("hi");
        $("#dohLicense").show();
        $(".dohLicense-fileblock").remove();
        $("#dohLicense").val("");

        $("#dohyes").hide();
        $("#dohno").show();
      }
    );

    //
    $("#Copydataflow").on("change", function (event) {
      $("#copydataflowno").hide();
      $("#copydataflowyes").show();
      $(".ploicy_yes2").attr("style", "color:#00A36C");
      $("#Copydataflow-yes").prop("checked", true);
    });
    //
    $("#Copydataflow").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#Copydataflow") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "Copydataflow-fileblock" }),
        fileName = $("<span/>", {
          class: "Copydataflowname",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="Copydataflowcross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Copydataflow-append").append(fileBloc);
      $("#Copydataflow").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".Copydataflowcross",
      function (event) {
        //("hi");
        $("#Copydataflow").show();
        $(".Copydataflow-fileblock").remove();
        $("#Copydataflow").val("");

        $("#copydataflowyes").hide();
        $("#copydataflowno").show();
      }
    );

    $("#homecountrylicense").on("change", function (event) {
      $("#homelicenceyes").show();
      $(".ploicy_yes3").attr("style", "color:#00A36C");
      $("#homelicenceno").hide();
      $("#homecountrylicense-yes").prop("checked", true);
    });
    //
    $("#homecountrylicense").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#homecountrylicense") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "homecountrylicense-fileblock" }),
        fileName = $("<span/>", {
          class: "homecountrylicense-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="homecountrylicense-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#homecountrylicense-append").append(fileBloc);
      $("#homecountrylicense").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".homecountrylicense-cross",
      function (event) {
        //("hi");
        $("#homecountrylicense").show();
        $(".homecountrylicense-fileblock").remove();
        $("#homecountrylicense").val("");

        $("#homelicenceyes").hide();
        $("#homelicenceno").show();
      }
    );

    $("#country_registration_certificate").on("change", function (event) {
      $("#country_registrationeno").hide();
      $("#country_registrationyes").show();
      $(".ploicy_yes4").attr("style", "color:#00A36C");

      $("#country_registration_certificate-yes").prop("checked", true);
    });
    //

    $("#country_registration_certificate").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (
        document.querySelector("#homecountrylicense") as HTMLInputElement
      ).files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", {
        class: "country_registration_certificate-fileblock",
      }),
        fileName = $("<span/>", {
          class: "country_registration_certificate-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="country_registration_certificate-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#country_registration_certificate-append").append(fileBloc);
      $("#country_registration_certificate").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".country_registration_certificate-cross",
      function (event) {
        //("hi");
        $("#country_registration_certificate").show();
        $(".country_registration_certificate-fileblock").remove();
        $("#country_registration_certificate").val("");

        $("#country_registrationeno").show();
        $("#country_registrationyes").hide();
      }
    );

    $("#Logbook").on("change", function (event) {
      $("#Logbookno").hide();
      $("#Logbookyes").show();
      $(".ploicy_yes5").attr("style", "color:#00A36C");
      $("#Logbook-yes").prop("checked", true);
    });
    //

    $("#Logbook").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#Logbook") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "Logbook-fileblock" }),
        fileName = $("<span/>", {
          class: "Logbook-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="Logbook-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Logbook-append").append(fileBloc);
      $("#Logbook").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".Logbook-cross",
      function (event) {
        //("hi");
        $("#Logbook").show();
        $(".Logbook-fileblock").remove();
        $("#Logbook").val("");

        $("#Logbookno").show();
        $("#Logbookyes").hide();
      }
    );

    $("#bls").on("change", function (event) {
      $("#blsno").hide();
      $("#blsyes").show();
      $(".ploicy_yes6").attr("style", "color:#00A36C");

      $("#bls-yes").prop("checked", true);
    });
    //

    $("#bls").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#bls") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "bls-fileblock" }),
        fileName = $("<span/>", {
          class: "bls-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="bls-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#bls-append").append(fileBloc);
      $("#bls").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".bls-cross",
      function (event) {
        //("hi");
        $("#bls").show();
        $(".bls-fileblock").remove();
        $("#bls").val("");

        $("#blsno").show();
        $("#blsyes").hide();
      }
    );

    $("#acls").on("change", function (event) {
      $("#aclsno").hide();
      $("#aclsyes").show();
      $(".ploicy_yes7").attr("style", "color:#00A36C");
      $("#acls-yes").prop("checked", true);
    });
    //

    $("#acls").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#acls") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "acls-fileblock" }),
        fileName = $("<span/>", {
          class: "acls-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="acls-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#acls-append").append(fileBloc);
      $("#acls").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".acls-cross",
      function (event) {
        //("hi");
        $("#acls").show();
        $(".acls-fileblock").remove();
        $("#acls").val("");

        $("#aclsno").show();
        $("#aclsyes").hide();
      }
    );

    $("#nrp").on("change", function (event) {
      $("#nrpno").hide();
      $("#nrpyes").show();
      $(".ploicy_yes9").attr("style", "color:#00A36C");
      $("#nrp-yes").prop("checked", true);
    });
    //

    $("#nrp").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#nrp") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "nrp-fileblock" }),
        fileName = $("<span/>", {
          class: "nrp-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="nrp-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#nrp-append").append(fileBloc);
      $("#nrp").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".nrp-cross",
      function (event) {
        //("hi");
        $("#nrp").show();
        $(".nrp-fileblock").remove();
        $("#nrp").val("");

        $("#nrpno").show();
        $("#nrpyes").hide();
      }
    );
    $("#alts").on("change", function (event) {
      $("#altsno").hide();
      $("#altsyes").show();
      $(".ploicy_yes10").attr("style", "color:#00A36C");


      $("#alts-yes").prop("checked", true);
    });
    //
    $("#alts").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#alts") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "alts-fileblock" }),
        fileName = $("<span/>", {
          class: "alts-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="alts-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#alts-append").append(fileBloc);
      $("#alts").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".alts-cross",
      function (event) {
        //("hi");
        $("#alts").show();
        $(".alts-fileblock").remove();
        $("#alts").val("");

        $("#altsno").show();
        $("#altsyes").hide();
      }
    );

    $("#pals").on("change", function (event) {
      $("#palsno").hide();
      $(".ploicy_yes8").attr("style", "color:#00A36C");
      $("#palsyes").show();

      $("#pals-yes").prop("checked", true);
    });
    $("#pals").on("change", function (e) {
      var fileArr1 = [];
      let fileVal13 = (document.querySelector("#pals") as HTMLInputElement)
        .files[0];
      fileArr1.push(fileVal13);
      // for(var i = 0; i < fileArr1.length; i++){
      let fileBloc = $("<span/>", { class: "pals-fileblock" }),
        fileName = $("<span/>", {
          class: "pals-name",
          text: fileArr1[0].name,
        });
      fileBloc
        .append(
          '<span class="file-delete13"><span class="pals-cross attachment_comman_class"><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#pals-append").append(fileBloc);
      $("#pals").hide();
      // };
    });
    $("table #tble-tbody-Attachments").on(
      "click",
      ".pals-cross",
      function (event) {
        //("hi");

        $(".pals-fileblock").remove();
        $("#pals").val("");
        $("#pals").show();
        $("#palsno").show();
        $("#palsyes").hide();
      }
    );
  }
  public GetAttachmentfolderitem(Name) {

    if (GlobalFormOpenedMode == "New") {
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

      // var str = `${this.state.CurrentUserName}`;
      var str = Name;
      var FullName = str.split(" ").join("");

      //(Name);

      newweb
        .getFolderByServerRelativeUrl(`PersonalAcknowledgment/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          //(files);

          for (var i = 0; i < files.length; i++) {
            allitem.push(files[i]);
            //(files[i]);

          }

          for (var i = 0; i < allitem.length; i++) {
            if (allitem[i].ListItemAllFields.Tags == "Doh License") {
              allitem3.push(allitem[i]);
              dohfile = allitem3[0].ServerRelativeUrl;
              $("#dohLicense").hide();
              $(".doh-delete").hide();
              $(".doh-item").show();
              $(".ploicy_yes1").attr("style", "color:#00A36C");
              $("#dohyes").show();
              $("#dohno").hide();

              // $("#High-QualityPhoto-yes").show();
              // $("#High-QualityPhoto-no").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Copy of data flow") {
              allitem32.push(allitem[i]);
              dataflowfile = allitem32[0].ServerRelativeUrl;
              $("#Copydataflow").hide();
              $(".Copydataflow-delete").hide();
              $(".Copydataflow-item").show();
              $(".ploicy_yes2").attr("style", "color:#00A36C");
              $("#copydataflowyes").show();
              $("#copydataflowno").hide();
            }

            if (allitem[i].ListItemAllFields.Tags == "Home country license") {
              allitem33.push(allitem[i]);
              countrylicensefile = allitem33[0].ServerRelativeUrl;
              $("#homecountrylicense").hide();
              $(".ploicy_yes3").attr("style", "color:#00A36C");
              $(".homecountrylicense-delete").hide();
              $(".homecountrylicense-item").show();
              $("#homelicenceyes").show();
              $("#homelicenceno").hide();
            }

            //4
            if (
              allitem[i].ListItemAllFields.Tags ==
              "country registration certificate"
            ) {
              allitem34.push(allitem[i]);
              homecountryregistrationfile = allitem34[0].ServerRelativeUrl;
              $("#country_registration_certificate").hide();
              $(".ploicy_yes4").attr("style", "color:#00A36C");
              $(".country_registration_certificate-delete").hide();
              $(".country_registration_certificate-item").show();
              $("#country_registrationeno").hide();
              $("#country_registrationyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "Log Book") {
              allitem35.push(allitem[i]);
              logbookfile = allitem35[0].ServerRelativeUrl;
              $("#Logbook").hide();
              $(".Logbook-delete").hide();
              $(".Logbook-item").show();
              $(".ploicy_yes5").attr("style", "color:#00A36C");
              $("#Logbookno").hide();
              $("#Logbookyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "BLS") {
              allitem36.push(allitem[i]);
              blsfile = allitem36[0].ServerRelativeUrl;
              $("#bls").hide();
              $(".ploicy_yes6").attr("style", "color:#00A36C");
              $(".bls-delete").hide();
              $(".bls-item").show();
              $("#blsno").hide();
              $("#blsyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ACLS") {
              allitem37.push(allitem[i]);
              aclsfile = allitem37[0].ServerRelativeUrl;
              $("#aclsno").hide();
              $("#aclsyes").show();
              $(".acls-delete").hide();
              $(".acls-item").show();
              $("#acls").hide();
              $(".ploicy_yes7").attr("style", "color:#00A36C");
            }

            if (allitem[i].ListItemAllFields.Tags == "PALS") {
              allitem38.push(allitem[i]);
              palsfile = allitem38[0].ServerRelativeUrl;

              $(".pals-delete").hide();
              $(".pals-item").show();
              $(".ploicy_yes8").attr("style", "color:#00A36C");
              $("#pals").hide();
              $("#palsno").hide();
              $("#palsyes").show();
            }
            if (allitem[i].ListItemAllFields.Tags == "NRP") {
              allitem39.push(allitem[i]);
              nrpfile = allitem39[0].ServerRelativeUrl;
              $("#nrp").hide();
              $(".ploicy_yes9").attr("style", "color:#00A36C");
              $(".nrp-delete").hide();
              $(".nrp-item").show();
              $("#nrpno").hide();
              $("#nrpyes").show();
            }

            if (allitem[i].ListItemAllFields.Tags == "ATLS") {
              allitem310.push(allitem[i]);
              altsfile = allitem310[0].ServerRelativeUrl;
              $(".alts-delete").hide();
              $(".alts-item").show();
              $("#alts").hide();
              $("#altsno").hide();
              $("#altsyes").show();
              $(".ploicy_yes10").attr("style", "color:#00A36C");
            }
          }
        });
    }
  }

  public Deleteploicyfile(Mod) {
    swal({
      title: "Are you sure?",
      text: "You Want Delete This Item",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    } as any).then((willadd) => {

      if (willadd) {
        if (Mod == "doh") {
          newweb
            .getFileByServerRelativeUrl(dohfile)
            .recycle()
            .then(function (data) {
              $("#dohLicense").show();
              $(".doh-delete").hide();
              $(".doh-item").hide();
              $("#dohyes").hide();
              $("#dohno").show();
              //(data);
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
            });
        } else if (Mod == "Copydataflow") {
          newweb
            .getFileByServerRelativeUrl(dataflowfile)
            .recycle()
            .then(function (data) {
              $("#Copydataflow").show();
              $(".Copydataflow-delete").hide();
              $(".Copydataflow-item").hide();

              $("#copydataflowyes").hide();
              $("#copydataflowno").show();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "homecountrylicense") {
          newweb
            .getFileByServerRelativeUrl(countrylicensefile)
            .recycle()
            .then(function (data) {
              $("#homecountrylicense").show();
              $(".homecountrylicense-delete").hide();
              $(".homecountrylicense-item").hide();
              $("#homelicenceyes").hide();
              $("#homelicenceno").show();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "countryregistrationcertificate") {
          newweb
            .getFileByServerRelativeUrl(homecountryregistrationfile)
            .recycle()
            .then(function (data) {
              $("#country_registration_certificate").show();

              $(".country_registration_certificate-delete").hide();
              $(".country_registration_certificate-item").hide();
              $("#country_registrationeno").show();
              $("#country_registrationyes").hide();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "Logbook") {
          newweb
            .getFileByServerRelativeUrl(logbookfile)
            .recycle()
            .then(function (data) {
              $("#Logbook").show();
              $(".Logbook-delete").hide();
              $(".Logbook-item").hide();

              $("#Logbookno").show();
              $("#Logbookyes").hide();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "bls") {
          newweb
            .getFileByServerRelativeUrl(blsfile)
            .recycle()
            .then(function (data) {
              $("#bls").show();
              $(".bls-delete").hide();
              $(".bls-item").hide();
              $("#blsno").show();
              $("#blsyes").hide();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "acls") {
          newweb
            .getFileByServerRelativeUrl(aclsfile)
            .recycle()
            .then(function (data) {
              $("#aclsno").show();
              $("#aclsyes").hide();
              $(".acls-delete").hide();
              $(".acls-item").hide();
              $("#acls").show();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "pals") {
          newweb
            .getFileByServerRelativeUrl(palsfile)
            .recycle()
            .then(function (data) {
              $(".pals-delete").hide();
              $(".pals-item").hide();

              $("#pals").show();
              $("#palsno").show();
              $("#palsyes").hide();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "nrp") {
          newweb
            .getFileByServerRelativeUrl(nrpfile)
            .recycle()
            .then(function (data) {
              $("#nrp").show();
              $(".nrp-delete").hide();
              $(".nrp-item").hide();
              $("#nrpno").show();
              $("#nrpyes").hide();
              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            });
        } else if (Mod == "alts") {
          newweb
            .getFileByServerRelativeUrl(altsfile)
            .recycle()
            .then(function (data) {
              $(".alts-delete").hide();
              $(".alts-item").hide();
              $("#alts").show();
              $("#altsno").show();
              $("#altsyes").hide();

              swal({
                title: "Item Deleted Successfully",
                icon: "success",
              })
              //(data);
            })
        }
      }
    });
  }

  public Alattachments() {
    this.Attachmentfiledoh();
    this.Attachmentfilesave();
    this.Attachmentfilesavelicence();
    this.countryregistrationcertificate();
    this.Logbook();
    this.Blsattachment();
    this.Attachmentacls();
    this.Attachmentpals();
    this.Attachmentnrp();
    this.Attachmentalts();
  }

  public async Attachmentfiledoh() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#dohLicense") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#dohLicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "dohLicense";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Doh License",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentfilesave() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#Copydataflow") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#Copydataflow") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Copy-of-data-flow";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Copy of data flow",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentfilesavelicence() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#homecountrylicense") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#homecountrylicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "homecountry-license";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Home country license",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async countryregistrationcertificate() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector(
        "#country_registration_certificate"
      ) as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector(
            "#country_registration_certificate"
          ) as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "country-registration-certificate";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "country registration certificate",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Logbook() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#Logbook") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#Logbook") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Logbook";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Log Book",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Blsattachment() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#bls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#bls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "bls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "BLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("bls");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentacls() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#acls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#acls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "acls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ACLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("acls");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentpals() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#pals") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#pals") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "pals";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PALS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("pals");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentnrp() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#nrp") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#nrp") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "nrp";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "NRP",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("nrp");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Attachmentalts() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#alts") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#alts") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "alts";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ATLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("alts");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "New") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The form has been submitted successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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





  ////
  public async Updation_Attachmentfiledoh() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#dohLicense") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#dohLicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "dohLicense";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Doh License",
                })
                .then((myupdate) => {
                  debugger
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentfilesave() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#Copydataflow") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#Copydataflow") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Copy-of-data-flow";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Copy of data flow",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentfilesavelicence() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector("#homecountrylicense") as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector("#homecountrylicense") as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "homecountry-license";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Home country license",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_countryregistrationcertificate() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (
      document.querySelector(
        "#country_registration_certificate"
      ) as HTMLInputElement
    ).files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (
          document.querySelector(
            "#country_registration_certificate"
          ) as HTMLInputElement
        ).files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "country-registration-certificate";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "country registration certificate",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Logbook() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#Logbook") as HTMLInputElement)
      .files.length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#Logbook") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "Logbook";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "Log Book",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("dohLicense");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Blsattachment() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#bls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#bls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "bls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "BLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("bls");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentacls() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#acls") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#acls") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "acls";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ACLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("acls");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentpals() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#pals") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#pals") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "pals";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "PALS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("pals");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentnrp() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#nrp") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#nrp") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "nrp";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "NRP",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("nrp");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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

  public async Updation_Attachmentalts() {
    var str = AttachmentFullname;
    var FullName = str.split(" ").join("");
    //Highersecondary
    var fileArrdoh = [];
    var FileNameGenerateddoh: string;

    let myfiledoh = (document.querySelector("#alts") as HTMLInputElement).files
      .length;

    if (myfiledoh != 0) {
      // $("#attactmentdoh-yes").prop("checked", true);
      for (var j = 0; j < myfiledoh; j++) {
        let fileVal11 = (document.querySelector("#alts") as HTMLInputElement)
          .files[0];
        fileArrdoh.push(fileVal11);

        //(fileArrdoh.push(fileVal11));
      }
      for (var i = 0; i < fileArrdoh.length; i++) {
        var NameofTable11 = "alts";
        var tempfilename11 = fileArrdoh[i].name.split(".");
        FileNameGenerateddoh =
          tempfilename11[0] +
          "-" +
          NameofTable11 +
          "." +
          tempfilename11[1] +
          "";

        await newweb
          .getFolderByServerRelativeUrl(
            this.props.context.pageContext.web.serverRelativeUrl +
            `/PersonalAcknowledgment/${FullName}`
          )
          .files.add(FileNameGenerateddoh, fileArrdoh[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  BusinessUnit: officename,
                  Tags: "ATLS",
                })
                .then((myupdate) => {
                  AttachmentUploaderStatusArray.push("alts");
                  this.setState({
                    AttachmentUploaderStatusArray: AttachmentUploaderStatusArray
                  });
                  if (GlobalFormOpenedMode == "Edit") {
                    setTimeout(() => {
                      if (AttachmentUploaderStatusArrayValidator.length == this.state.AttachmentUploaderStatusArray.length) {
                        swal({
                          title: "The Form has been updated successfully",
                          icon: "success",
                        }).then(() => {
                          location.reload()
                        });

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


  public dashboardloa() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
  }

  public AddNewRow(e) {
    e.preventDefault();


    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-special");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {
        $("#tble-tbody-dynamicspecial-special").append(`<tr>
   
        <td> <input type="hidden" id="hdn-policysck-dec-special-itm-id" value="null"><input type="text" id="tble-txt-specialinterest"  class"policy-viewm-odeform" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel"  title=delete><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

      } else {
        swal({
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    } if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-special");
      var Editrows: number = table.getElementsByTagName("tr").length

      if (Editrows < 7) {
        $("#tble-tbody-dynamicspecial-special").append(`<tr>
   
        <td> <input type="hidden" id="hdn-policysck-dec-special-itm-id" value="null"><input type="text" id="tble-txt-specialinterest"  class"policy-viewm-odeform" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel"  title=delete><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

      } else {
        swal({
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }

    counter = counter + 1;
    $("table #tble-tbody-dynamicspecial-special").on(
      "click",
      ".ibtnDel",
      function (event) {



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
            counter = counter - 1 + 2;

            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });


      }
    );
  }

  public AddNewRowprofactional(e) {
    e.preventDefault();

    if (GlobalFormOpenedMode == "New") {
      var table = document.getElementById("cust-table-ProfessionalMemberships");
      var rows: number = table.getElementsByTagName("tr").length

      if (rows < 6) {
        $("#tble-tbody-dynamicspecial-ProfessionalMemberships").append(`<tr>
  
        <td> <input type="hidden" id="hdn-policysck-dec-professional-itm-id" value="null"><input type="text" id="tble-txt-Profationalmembership"  class"policy-viewm-odeform" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel" title=delete><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

      } else {
        swal({
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }


    } else if (GlobalFormOpenedMode == "Edit") {
      var table = document.getElementById("cust-table-ProfessionalMemberships");
      var Editrows: number = table.getElementsByTagName("tr").length

      if (Editrows < 7) {
        $("#tble-tbody-dynamicspecial-ProfessionalMemberships").append(`<tr>
  
        <td> <input type="hidden" id="hdn-policysck-dec-professional-itm-id" value="null"><input type="text" id="tble-txt-Profationalmembership"  class"policy-viewm-odeform" autoComplete="off"></input></td>
        <td class="delete_icon_td"><a href="#" class="ibtnDel" title=delete><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
      </tr>`);

      }
      else {
        swal({
          title: " Only 5 row can be added",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        } as any);
      }

    }

    counter2 = counter2 + 1;
    $("table #tble-tbody-dynamicspecial-ProfessionalMemberships").on(
      "click",
      ".ibtnDel",
      function (event) {


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
            counter2 = counter2 - 1 + 2;

            swal({
              title: "Deleted Successfully",
              icon: "success",
            });
          }
        });

      }
    );
  }

  public Addtabledata(id, ONBSessionID) {

    $("#cust-table-special tbody tr").each(function (index) {
      var Specialinterest = $(this)
        .find("td").eq(0).find("input[id*='tble-txt-specialinterest']").val()
      if (Specialinterest != "") {
        Specialinterest = $(this).find("td").eq(0).find("input[id*='tble-txt-specialinterest']").val() != "" ? $(this).find("td").eq(0).find("input[id*='tble-txt-specialinterest']").val() : "-"

        newweb.lists
          .getByTitle("Clinicans special interest")
          .items.add({
            Specialinterest: Specialinterest,
            ONBSessionID: ONBSessionID,
            StampID: id,
            OrderNo: index

          })
      }
    });


    $("#cust-table-ProfessionalMemberships tbody tr").each(function (index) {
      var Profationmemenrship = $(this).find("td").eq(0).find("input[id*='tble-txt-Profationalmembership']").val();
      if (Profationmemenrship != "") {
        $(this).find("td").eq(0).find("input[id*='tble-txt-Profationalmembership']").val() != "" ? $(this).find("td").eq(0).find("input[id*='tble-txt-Profationalmembership']").val() : "-";
        newweb.lists.getByTitle("Clinicans ProfessionalMemberships")
          .items.add({
            ProfessionalMemberships: Profationmemenrship,
            ONBSessionID: ONBSessionID,
            StampID: id,
            OrderNo: index
          })
      }
    });

  }

  public Policyackcurrentuserlistdata(ONBSessionID, FormMode) {


    newweb.lists
      .getByTitle("Employee Stamp Acknowledgement Transaction")
      .items.select(
        "ID",
        "Date",
        "EmployeeIDNumber",
        "EmployeePrintedName",
        "EmployeeIDNumber",
        "ONBSessionID",
        "Otherinformation"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((result) => {
        if (result.length != 0) {
          $(".viewform-actn-th").hide();
          $("#other-info").prop("disabled", true)
          $(".addnew-btn-policy").hide(); //we are hiding add new row btn after submit by employee
          $(".policyacknowledgmentimg").show();
          $("#other-info").val(result[0].Otherinformation)
          $(".vieweditname1").val(result[0].EmployeePrintedName);
          $(".vieweditname2").val(result[0].EmployeePrintedName);
          $(".vieweditname3").val(result[0].EmployeePrintedName);
          $(".vieweditname4").val(result[0].EmployeePrintedName);
          $(".vieweditname5").val(result[0].EmployeePrintedName);

          $(".dynamicpolicyname").hide()
          $(`.policydynamicname`).show();
          $(".policyempofficename").hide();
          $(".commonviewmodepolicy").prop('disabled', true)
          // stamplistid = result[0].ID;

          $(".policy-viewm-odeform").prop('disabled', true)
          $("#phypolicyempationality").prop('disabled', true)
          $(".policy-submit").hide();
          $("#userpolicyupdatebtn").hide();
          //   $(".policyacknowledgmenttitle").attr("style", "color:#00A36C");

          $("#stamppolicynamedynamic").val(result[0].EmployeePrintedName);

          $("#stamppolicyidnumber").val(result[0].EmployeeIDNumber);
          // $("#stamppolicydate").val(
          //   moment(result[0].Date).format("YYYY-MM-DD")
          // );
        } else {

        }
      });

    newweb.lists
      .getByTitle("Employee Dosimeter Acknowledgement Transaction")
      .items.select(
        "ID",
        "Date",
        "EmployeeName",
        "EmployeeIDNumber",
        "DosimeterNumber",
        "ONBSessionID"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          $(`#Dosimeternumber`).val(response[0].DosimeterNumber),
            $(`#Dosimeterpolicyidnumber`).val(response[0].EmployeeIDNumber);
        }
      });

    newweb.lists
      .getByTitle("Physician Profile for PR Transaction")
      .items.select(

        "ID",
        "EmployeeNationality",
        "EmployeeName",
        "Subspecialty",
        "Specialty",
        "ONBSessionID"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          setTimeout(() => {
            $("#phypolicyempationality").val(response[0].EmployeeNationality)
          }, 1000);


          $(`#Subspecialty`).val(response[0].Subspecialty);
          setTimeout(() => {
            $("#Specialty").val(response[0].Specialty)
          }, 1000);
        }
      });

    newweb.lists
      .getByTitle("PhotoVideo Consent and Release Form Transaction")
      .items.select(

        "ID",
        "Date",
        "EmployeeName",
        "EmployeeIDNumber",
        "Facility",
        "ONBSessionID"
      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((response) => {
        if (response.length != 0) {

          $("#facilityUnit").val(response[0].Facility),

            $(`#concentidno`).val(response[0].EmployeeIDNumber);
        }
      });


    newweb.lists
      .getByTitle("Clinicans special interest")
      .items.select("ID", "Specialinterest", "ONBSessionID", "OrderNo", "StampID")
      .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        console.log(result);
        $(".tr_emptydata").hide()
        if (result.length != 0) {

          for (var i = 0; i < result.length; i++) {
            var newrow = $("<tr>");

            var cols = "";
            cols +=
              '<td><input type="hidden" id="hdn-policysck-dec-special-itm-id" value="' + result[i].ID + '"></input><input type="text" class="form-control" id="tble-txt-specialinterest" autoComplete="off"value="' +
              result[i].Specialinterest +
              '" disabled></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicspecial-special").append(newrow);
          }
        }
      })

    newweb.lists
      .getByTitle("Clinicans ProfessionalMemberships")
      .items.select("ID", "ProfessionalMemberships", "ONBSessionID", "OrderNo", "StampID")
      .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true)
      .get()
      .then((result) => {
        console.log(result);
        $(".tr_emptydata").hide()
        if (result.length != 0) {
          for (var i = 0; i < result.length; i++) {
            var newrow = $("<tr>");

            var cols = "";
            cols +=
              '<td><input type="hidden" id="hdn-policysck-dec-professional-itm-id" value="' + result[i].ID + '"></input><input type="text" class="form-control" id="tble-txt-Profationalmembership" autoComplete="off"value="' +
              result[i].ProfessionalMemberships +
              '" disabled></input></td>';
            newrow.append(cols);
            $("table #tble-tbody-dynamicspecial-ProfessionalMemberships").append(newrow);
          }
        }
      })


  }
  public GetSpecialityItems() {
    newweb.lists.getByTitle("Speciality Master").items.orderBy("Title", true).get().then((result) => {
      this.setState({
        Speciality: result
      });

    });

  }

  public removevalidationpolicy() {
    $("#stamppolicyidnumber").keyup(function () {

      $("#err-idnopolicy").hide();
    });

    $("#Dosimeterpolicyidnumber").keyup(function () {

      $("#err-Dosimeteridpolicy").hide();
    });


    $("#Dosimeternumber").keyup(function () {

      $("#err-DosimeterNumber").hide();
    });


    $("#phypolicyempationality").on("change", function () {

      $("#err-physicianemployeenationality").hide();
    });


    $("#Specialty").on("change", function () {

      $("#err-specialtyidpolicy").hide();
    });

    $("#Subspecialty").keyup(function () {

      $("#err-Subspecialty").hide();
    });
  }

  public landingpage() {

    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;

  }
  public Redirectodashboard() {

    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;

  }





  public AddedAttachments(e, domid, from) {
    if (from == "dohLicense") {
      let resumefile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (resumefile != 0) {
        AttachmentUploaderStatusArrayValidator.push("dohLicense");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Copydataflow") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("Copydataflow");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "homecountrylicense") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("homecountrylicense");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "country_registration_certificate") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("country_registration_certificate");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "Logbook") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("Logbook");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "alts") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("alts");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "bls") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("bls");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "acls") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("acls");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "pals") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("pals");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    } else if (from == "nrp") {
      let profilepicfile = (document.querySelector("#" + domid + "") as HTMLInputElement).files.length;
      if (profilepicfile != 0) {
        AttachmentUploaderStatusArrayValidator.push("nrp");
      } else {
        AttachmentUploaderStatusArrayValidator.pop();
      }
    }
  }


  public render(): React.ReactElement<IHrOnboardingFormProps> {

    var handler = this;

    const Allcountryname: JSX.Element[] = this.state.CountryName.map(function (
      item,
      key
    ) {
      //(item);

      return <option value={item.CountryName}>{item.CountryName}</option>;
    });
    const SpecialityMaster: JSX.Element[] = this.state.Speciality.map(
      function (item, key) {

        return (
          <option value={item.Title}>
            {item.Title}
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

            <span>Policy acknowledgement & declarations (Clinicians/Nursing/Allied health staff specific)</span>
            {/* <span>Clinicians /Allied health staff specific</span> */}
          </div>

          <div className="dashboard_right_ffamily">
            <div className="policy_ack_declaration_top policy_ack_clinical_part personal_info_part ebd_uq_para">
              <p>
                {" "}
                Below is the list of policies that clinicians & clinical staff are
                expected to Acknowledge and update their details on required
                fields.{" "}
              </p>

              <ul>
                <li> a.) Employee Seal/Stamp Acknowledgement </li>

                <li> b.) Employee Dosimeter Acknowledgement </li>

                <li> c.) Physician Profile For PR </li>

                <li> d.) Photo/Video Consent And Release Form </li>
              </ul>
            </div>
            <div className="policy_ack_declaration_top onboarding_top_padding personal_info_part">
              <div className="policy_ack_declaration">
                <h3>a.) Employee Seal/Stamp Acknowledgement</h3>
                <p>
                  I hereby acknowledge the receipt of the Seal/Stamp from the
                  Human Resources Department of{" "}
                  <span className="unitname">{officename}</span>
                  <span style={{ display: "none" }} className="dynamicunitname">
                    {dynamicunitname}.
                  </span>{" "}

                </p>
                <p>
                  I accept that this seal/stamp remains the property of{" "}
                  <span className="unitname">{officename}</span> <span style={{ display: "none" }} className="dynamicunitname"> {dynamicunitname} </span> and will be surrendered upon my resignation or termination of
                  employment. I also accept that I am responsible for the safety
                  of this seal/stamp and should it be damaged or lost, a fee will
                  be imposed for its replacement.
                </p>
              </div>

              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="policyempofficename form-group relative">
                    <input
                      type="text"
                      id="stamppolicyname"

                      name="name"
                      className="form-control policy-name1 commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee  Name <i className="required">*</i>{" "}
                    </span>
                  </div>

                  <div
                    style={{ display: "none" }}
                    className="policydynamicname form-group relative"
                  >
                    <input
                      type="text"
                      id="stamppolicynamedynamic"
                      name="name"
                      className="form-control vieweditname1 stamppolicynamedynamicname commonviewmodepolicy policy-viewm-odeform"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name <i className="required">*</i>{" "}
                    </span>
                  </div>
                  <span
                    className="error-validation printname-valid-err"
                    id="err-printednamepolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>


                <div className="col-md-4">
                  <div className="policy form-group relative ">
                    <input
                      type="text"
                      id="stamppolicyidnumber"
                      name="idnumber"
                      className="form-control commonviewmodepolicy policy-declearation-idno policy-viewm-odeform"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      {" "}
                      Employee ID Number
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-idnopolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>

                <div className="col-md-4 signature_part">


                  <p>Employee  Signature</p>
                </div>
              </div>

              <div className="row form signature_part">





                <div className="col-md-4 signature_part">


                  <p>Date</p>




                </div>
              </div>
            </div>

            <div className="policy_ack_declaration_top personal_info_part">
              <div className="policy_ack_declaration">
                <h3> b.) Employee Dosimeter Acknowledgement</h3>
                <h4>Dosimeter- Do`s</h4>
                <p>
                  1. Do wear it while working, it has no value in your locker or
                  purse{" "}
                </p>

                <p>2. Do wear it with the window facing outward </p>

                <p>
                  3. Do leave it at the same place every day when you leave work
                  to ensure its usual location{" "}
                </p>

                <p>
                  4. Do place the control Dosimeter in a designated control area,
                  the dose to control subtracted from each Dosimeter and needs to
                  be accurate
                </p>
                <p>
                  5. Do report lost or damaged Dosimeters immediately. Prevent
                  damage by not leaving Dosimeter in areas of high temperature
                  such as dashboard or its clothes dryer
                </p>
                <p>
                  6. Do use it all the time at work. Time gaps make analysis more
                  difficult, less accurate and reduce legal historical value of
                  reports{" "}
                </p>
                <h4>Dosimeter- Don’ts </h4>
                <p>
                  1 Do not place an assigned Dosimeter for testing of stray
                  radiation; an additional Dosimeter can be assigned for testing.
                </p>
                <p>
                  2. Do not share Dosimeter, this is illegal. An average for a
                  shared Dosimeter is meaningless to each individual
                </p>
                <p>
                  3. Do not tamper with your Dosimeter or anyone else’s. The
                  reports are legal documents and are regarded as exposures
                  received, tampering with Dosimeter may lead to disciplinary
                  action
                </p>
                <p>
                  4. Don’t wear it when you are receiving x-rays for your own
                  health problem
                </p>
                <p>5. Don’t wear it away from the workplace </p>
                <div className="policy_ack_declaration">
                  <h4>Dosimeter Acknowledgement </h4>
                  <p>
                    I hereby acknowledge the receipt of the Dosimeter from the
                    Human Resource Department of{" "}
                    <span className="unitname">{officename}</span>
                    <span style={{ display: "none" }} className="dynamicunitname">
                      {dynamicunitname}
                    </span>
                    . I accept that this remains the property of
                    <span className="unitname PACK_unitname">{officename}</span>
                    <span style={{ display: "none" }} className="dynamicunitname">
                      {dynamicunitname}
                    </span>{" "}
                    and will be surrendered upon my resignation or termination of
                    employment.{" "}
                  </p>
                  <p>
                    I also accept that I am responsible for the safety of this
                    Dosimeter and should it be damaged or lost, a fee will be
                    imposed for its replacement. I am aware of the Do’s and Don’ts
                    of Dosimeter as detailed above.
                  </p>
                </div>
              </div>

              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="policyempofficename form-group relative">
                    <input
                      type="text"
                      id="Dosimeterpolicyname"

                      name="name"
                      className="form-control policy-name1 policy-name-id-disabled commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name <i className="required">*</i>{" "}
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="policydynamicname form-group relative"
                  >
                    <input
                      type="text"
                      id="stamppolicynamedynamic"
                      name="name"
                      className="form-control vieweditname2 policy-name-id-disabled stamppolicynamedynamicname commonviewmodepolicy policy-viewm-odeform"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name <i className="required">*</i>{" "}
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-Dosimeternamepolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>


                <div className="col-md-4">
                  <div className="policy form-group relative ">
                    <input
                      type="text"
                      id="Dosimeterpolicyidnumber"
                      name="idnumber"
                      className="form-control policy-name-id-disabled commonviewmodepolicy policy-declearation-idno policy-viewm-odeform"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee ID Number
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-Dosimeteridpolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="policy form-group relative ">
                    <input
                      type="text"
                      id="Dosimeternumber"
                      name="idnumber"
                      className="form-control commonviewmodepolicy policy-viewm-odeform"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      {" "}
                      Dosimeter Number
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-DosimeterNumber"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>
              </div>

              <div className="row form">
                <div className="col-md-4 signature_part">

                  <p>
                    Employee  Signature
                  </p>

                </div>

                <div className="col-md-4 signature_part">


                  <p>
                    Date
                  </p>


                </div>
              </div>
            </div>

            <div className="policy_ack_declaration_top personal_info_part">
              <div className="policy_ack_declaration">
                <h3>c.) Physician Profile For PR</h3>
              </div>

              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="policyempofficename form-group relative">
                    <input
                      type="text"
                      id="physicianpolicyname"

                      name="name"
                      className="form-control policy-name1 policy-name-id-disabled commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name <i className="required">*</i>{" "}
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="policydynamicname form-group relative"
                  >
                    <input
                      type="text"
                      id="stamppolicynamedynamic"
                      name="name"
                      className="form-control vieweditname3 policy-name-id-disabled stamppolicynamedynamicname policy-viewm-odeform"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name <i className="required">*</i>{" "}
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-physiciannamepolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="policy form-group relative ">
                    <input
                      type="text"
                      id="phypolicyempationality"
                      name="nationality"
                      className="form-control commonviewmodepolicy policy-viewm-odeform"
                      autoComplete="off"
                    />
                    {/* <select id="phypolicyempationality" className="form-control policy-name-id-disabled commonviewmodepolicy policy-viewm-odeform" disabled>
                 <option value="Select">Select</option>
                  {Allcountryname}
                </select> */}

                    <span className="floating-label">
                      {" "}
                      Employee Nationality<i className="required">*</i>{" "}
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-physicianemployeenationality"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="policy form-group relative ">
                    <select
                      id="Specialty"
                      className="form-control commonviewmodepolicy policy-viewm-odeform"
                    >
                      <option value="Select">Select</option>
                      {SpecialityMaster}
                    </select>
                    <span className="floating-label">
                      {" "}
                      Speciality <i className="required">*</i>{" "}
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-specialtyidpolicy"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="policy form-group relative">
                    <input
                      type="text"
                      id="Subspecialty"
                      name="Subspecialty"
                      className="form-control commonviewmodepolicy policy-viewm-odeform"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      Subspeciality<i className="required">*</i>
                    </span>
                  </div>

                  <span
                    className="error-validation"
                    id="err-Subspecialty"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>
              </div>

              <div className="dynalictablename policy_ack_special">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    {/* <h4 className="contact-pg-title">
                  Special Procedures/Interests
                </h4> */}
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-dynamic"
                    id="cust-table-special"
                  >
                    <thead>
                      <tr>
                        <th> Special Procedures/Interests </th>
                        <th className="viewform-actn-th"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicspecial-special">
                      <tr className="tr_emptydata">
                        <td>
                          <input
                            type="text"
                            id="tble-txt-specialinterest"
                            className="form-control policy-viewm-odeform"
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
                    className="Add-new-btn addnew-btn-policy"
                    onClick={(e) => this.AddNewRow(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>

              <div className="dynalictablename policy_ack_prefess">
                <div className="table-wrapper-date clearfix">
                  <div className="table-search personal_information_title">
                    {/* <h4 className="contact-pg-title">Professional memberships</h4> */}
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-dynamic"
                    id="cust-table-ProfessionalMemberships">
                    <thead>
                      <tr>
                        <th> Professional Memberships </th>
                        <th className="viewform-actn-th"></th>
                      </tr>
                    </thead>
                    <tbody id="tble-tbody-dynamicspecial-ProfessionalMemberships">
                      <tr className="tr_emptydata">
                        <td>
                          <input
                            type="text"
                            id="tble-txt-Profationalmembership"
                            className="form-control policy-viewm-odeform"
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
                    className="Add-new-btn addnew-btn-policy"
                    onClick={(e) => this.AddNewRowprofactional(e)}
                  >
                    Add New Row
                  </button>
                </div>
              </div>
              <div className="policy_ack_othersinfo">
                {" "}
                <h4>Other Information (If Any) </h4>
                <textarea id="other-info" style={{ resize: "none" }} placeholder="Enter the text here"></textarea>
              </div>

              <div className="policy_ack_declaration_para">
                <p>
                  I hereby confirm that the above information is true to the best
                  of my knowledge
                </p>
              </div>

              <div className="row form row_top">
                <div className="col-md-4">
                  <div className="form-group relative  dynamicpolicyname">
                    <input
                      type="text"
                      id="Name"
                      name="name"
                      className="form-control employee-userName policy-name1 policy-name-id-disabled commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      Employee Name<i className="required">*</i>
                    </span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="policydynamicname form-group relative"
                  >
                    <input
                      type="text"
                      id="stamppolicynamedynamic"
                      name="name"
                      className="form-control vieweditname4 policy-name-id-disabled stamppolicynamedynamicname policy-viewm-odeform commonviewmodepolicy"
                      autoComplete="off"
                      disabled
                    />
                    <span className="floating-label">
                      {" "}
                      Employee Name<i className="required">*</i>{" "}
                    </span>
                  </div>
                  <span
                    className="error-validation"
                    id="err-nameerror"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.{" "}
                  </span>
                </div>

                <div className="col-md-4 signature_part">
                  <p>
                    Signature
                  </p>

                </div>

                <div className="col-md-4 signature_part">

                  <p>
                    Date
                  </p>

                </div>
              </div>

              <div className="row form  clinical_row">
                <div className="col-md-4 signature_part">
                  <p> Head – Clinical Services Signature </p>
                </div>
              </div>

            </div>

            <div className="policy_ack_declaration_top personal_info_part">
              <div className="policy_ack_declaration">
                <h3>d.) Photo/Video Consent And Release Photo/Video Consent And Release Form</h3>
              </div>
              <div className="policy_ack_declaration">
                <p> I understand that photographs will be used for <span id="ploicyunitname">{officename}</span><span style={{ display: "none" }} id="dynamicploicyunitname">
                  {dynamicunitname}</span>
                  's official social media activities for marketing, brand
                  awareness or promotional services of the facility on its social
                  media platforms and website, or on other social media platforms
                  associated with <span id="ploicyunitname">{officename}</span>{" "}
                  <span style={{ display: "none" }} id="dynamicploicyunitname"> {dynamicunitname}</span> Group for the purpose of advertising and promoting
                  <span id="ploicyunitname">{officename}</span> <span style={{ display: "none" }} id="dynamicploicyunitname">
                    {dynamicunitname}</span> services.
                </p>
                <p>
                  I understand that photography and videotaping will ensure
                  respect for the cultural, social and moral values of the
                  individual’s religion/society. Also, comply with all rules,
                  customs, and traditions of UAE.
                </p>
              </div>
              <div className="policy_ack_declaration">
                <h4>Employee Acknowledgment </h4>
              </div>
              <div className="policy_ack_declaration">
                <p>
                  I hereby confirm that the above information is true to the best
                  of my knowledge I have read and fully understood the above and
                  agree to abide by it.{" "}
                </p>
              </div>

              <div className="Consent and Release">
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="policyempofficename form-group relative">
                      <input
                        type="text"
                        id="consentReleaseempname"

                        name="name"
                        className="form-control policy-name1 policy-name-id-disabled  viewmodedisableplicyhealth policy-viewm-odeform commonviewmodepolicy common_fullname_disable"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="policydynamicname form-group relative"
                    >
                      <input
                        type="text"
                        id="stamppolicynamedynamic"
                        name="name"
                        className="form-control vieweditname5 policy-name-id-disabled stamppolicynamedynamicname policy-viewm-odeform"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>


                    <span
                      className="error-validation common_nameerr"
                      id="err-physiciannamepolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>


                  <div className="col-md-4">
                    <div className="policy form-group relative">
                      <input
                        type="text"
                        id="concentidno"
                        name="idno"
                        className="form-control sconcentidnos policy-name-id-disabled commonviewmodepolicy policy-viewm-odeform policy-declearation-idno"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">
                        Employee ID Number
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-concentidno"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div id="facilityunit-dynamic" className="policy form-group relative">
                      <input
                        type="text"
                        id="facilityUnit"
                        name="FacilityUnit"
                        className="form-control Unitnameploicyfacility commonviewmodepolicy policy-viewm-odeform"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">
                        Facility/ Unit<i className="required">*</i>
                      </span>
                    </div>


                    <div id="facilityunit-withoutdynamic" style={{ display: "none" }} className="policy form-group relative">
                      <input
                        type="text"
                        id="facilityUnitdynamic"
                        name="FacilityUnit"
                        className="form-control commonviewmodepolicy policy-viewm-odeform"
                        autoComplete="off"
                        disabled
                      />
                      <span className="floating-label">
                        Facility/ Unit<i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-FacilityUnit"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>
                </div>
                <div className="row form">

                  <div className="col-md-4 signature_part">
                    <p>
                      Signature
                    </p>

                  </div>

                  <div className="col-md-4 signature_part">


                    <p>
                      Date
                    </p>


                  </div>

                </div>
              </div>
            </div>
            <div className="personal_info_part">


              <div className="Attachments Attachments-Required">
                <div className="table-wrapper-Attachments clearfix">
                  <div className="table-search policy_acknowledgment_form policy_ack_declaration">
                    <h4 className="contact-pg-title">Attachments Required</h4>
                  </div>
                </div>
                <table
                  className="table table-bordered"
                  id="cust-table-Attachments"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Licenses/Certifications Attachments Required{" "}
                      </th>
                      <th className="clinian_field_th" scope="col">Field </th>

                      <th scope="col">Attached (Yes/No)</th>
                    </tr>
                  </thead>
                  <tbody id="tble-tbody-Attachments">
                    <tr>
                      <td>1</td>
                      <td>
                        {" "}
                        <span>DOH License </span>
                      </td>
                      <td>
                        <input
                          id="dohLicense"
                          className="form-control dohinputfiled commonviewmodepolicy policy-viewm-odeform"
                          type="file"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "dohLicense", "dohLicense")}
                        ></input>
                        <span
                          className="error-validation"
                          id="err-dohinputfiled"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <a data-interception="off"
                          href={`${dohfile}`}
                          style={{ display: "none" }}
                          className="doh-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="Doh-append"></span>

                        <span
                          className="doh-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("doh")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                      </td>

                      <td>
                        <div style={{ display: "none" }} id="dohyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes1">YES</span>
                        </div>

                        <div id="dohno">
                          {" "}

                          <span>No</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Copy of data flow</td>
                      <td>
                        <input
                          type="file"
                          id="Copydataflow"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "Copydataflow", "Copydataflow")}
                        ></input>
                        <span
                          className="error-validation"
                          id="err-Copydataflow"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <a data-interception="off"
                          href={`${dataflowfile}`}
                          style={{ display: "none" }}
                          className="Copydataflow-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="Copydataflow-append"></span>
                        <span
                          className="Copydataflow-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("Copydataflow")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="copydataflowyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes2">YES</span>
                        </div>

                        <div id="copydataflowno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <span>Copy of home country license </span>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="homecountrylicense"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "homecountrylicense", "homecountrylicense")}
                        ></input>


                        <a data-interception="off"
                          href={`${countrylicensefile}`}
                          style={{ display: "none" }}
                          className="homecountrylicense-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="homecountrylicense-append"></span>
                        <span
                          className="homecountrylicense-delete"
                          style={{ display: "none" }}
                          onClick={() =>
                            this.Deleteploicyfile("homecountrylicense")
                          }
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-homecountry"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="homelicenceyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes3">YES</span>
                        </div>

                        <div id="homelicenceno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td>
                        <span>
                          Copy of home country registration certificate{" "}
                        </span>
                      </td>

                      <td>
                        <input
                          type="file"
                          id="country_registration_certificate"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "country_registration_certificate", "country_registration_certificate")}
                        ></input>
                        <span
                          className="error-validation"
                          id="err-country_reg_cert"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <a data-interception="off"
                          href={`${homecountryregistrationfile}`}
                          style={{ display: "none" }}
                          className="country_registration_certificate-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="country_registration_certificate-append"></span>
                        <span
                          className="country_registration_certificate-delete"
                          style={{ display: "none" }}
                          onClick={() =>
                            this.Deleteploicyfile(
                              "countryregistrationcertificate"
                            )
                          }
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                      </td>
                      <td>
                        <div
                          style={{ display: "none" }}
                          id="country_registrationyes"
                        >

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes4">YES</span>
                        </div>

                        <div id="country_registrationeno">


                          <span>No</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td>
                        {" "}
                        <span>Log book </span>
                      </td>

                      <td>
                        <input
                          type="file"
                          id="Logbook"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "Logbook", "Logbook")}
                        ></input>
                        <span
                          className="error-validation"
                          id="err-logbook"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>

                        <a data-interception="off"
                          href={`${logbookfile}`}
                          style={{ display: "none" }}
                          className="Logbook-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="Logbook-append"></span>
                        <span
                          className="Logbook-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("Logbook")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="Logbookyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes5">YES</span>
                        </div>

                        <div id="Logbookno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>
                        <span>BLS </span>
                      </td>

                      <td>
                        <input
                          type="file"
                          id="bls"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "bls", "bls")}
                        ></input>


                        <a data-interception="off"
                          href={`${blsfile}`}
                          style={{ display: "none" }}
                          className="bls-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="bls-append"></span>
                        <span
                          className="bls-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("bls")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-bls"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="blsyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes6">YES</span>
                        </div>

                        <div id="blsno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>
                        <span>ACLS (as per designated medical dept)</span>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="acls"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "acls", "acls")}
                        ></input>


                        <a data-interception="off"
                          href={`${aclsfile}`}
                          style={{ display: "none" }}
                          className="acls-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="acls-append"></span>
                        <span
                          className="acls-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("acls")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-acls"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="aclsyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes7">YES</span>
                        </div>

                        <div id="aclsno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>
                        {" "}
                        <span>PALS (as per designated medical dept) </span>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="pals"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "pals", "pals")}
                        ></input>


                        <a data-interception="off"
                          href={`${palsfile}`}
                          style={{ display: "none" }}
                          className="pals-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="pals-append"></span>
                        <span
                          className="pals-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("pals")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-pals"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="palsyes">


                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes8">YES</span>
                        </div>

                        <div id="palsno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>9</td>
                      <td>
                        <span>NRP (as per designated medical dept) </span>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="nrp"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "nrp", "nrp")}
                        ></input>


                        <a data-interception="off"
                          href={`${nrpfile}`}
                          style={{ display: "none" }}
                          className="nrp-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="nrp-append"></span>
                        <span
                          className="nrp-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("nrp")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-nrp"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="nrpyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes9">YES</span>
                        </div>

                        <div id="nrpno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>
                        <span>ATLS (as per designated medical dept) </span>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="alts"
                          className="form-control policy-viewm-odeform"
                          autoComplete="off"
                          onChange={(e) => this.AddedAttachments(e, "alts", "alts")}
                        ></input>

                        <a data-interception="off"
                          href={`${altsfile}`}
                          style={{ display: "none" }}
                          className="alts-item"
                          target="_blank"
                        >
                          click here
                        </a>
                        <span id="alts-append"></span>
                        <span
                          className="alts-delete"
                          style={{ display: "none" }}
                          onClick={() => this.Deleteploicyfile("alts")}
                        >
                          <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                        </span>
                        <span
                          className="error-validation"
                          id="err-alts"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "none" }} id="altsyes">

                          <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img>
                          <span className="ploicy_yes10">YES</span>
                        </div>

                        <div id="altsno">

                          <span>No</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

              <div className="dashboard_btn Dyname-btn">


                {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                  <button
                    id="sssaveitemploicy"
                    className="dashboard_submit_btn policy-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}
                  >
                    Submit
                  </button>
                  :
                  <button style={{ cursor: "no-drop" }}
                    id="sssaveitemploicy"
                    className="dashboard_submit_btn policy-submit"
                    type="submit"
                  >
                    Submit
                  </button>
                }


                <button
                  style={{ display: "none" }}
                  id="updatebutton-btn"
                  className="dashboard_submit_btn"
                  type="submit"
                  onClick={() => this.updatepolicyackdecleartion()}
                >
                  Update
                </button>

                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnplolicy" type="submit" onClick={() => this.Printthis()}>Print</button>
                {GlobalFormOpenedMode == "New" &&
                  <button id="btn-sign-policy" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="btn-hr-policy" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }
              </div>


            </div>


          </div>
        </div>

        <div id="dashboard_right-print-ack-clinicians" style={{ display: "none" }}>
          <div className="dashboard_right_heading" style={{ marginBottom: "20px" }}>
            {handler.state.Dynamiclogo &&
              handler.state.Dynamiclogo.map(function (imgitem, Index) {
                var img = imgitem.UnitLogo;
                var Dynamiclogo = JSON.parse(img);
                // LogoUrl=img.serverRelativeUrl
                return (
                  <img
                    id="print-Dynamicimgpolicy"
                    className="currentuseimgpolicy"
                    style={{ height: "50px", width: "80px" }}
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
              <span>Policy acknowledgement & declarations (Clinicians/Nursing/Allied health staff specific)</span>
              {/* <ul>
                <li>Control Number: <b id="print-policy-Control-Number"></b></li>
                <li>Version: <b id="print-policy-Version-Number"></b></li>
              </ul> */}

            </div>
          </div>

          <div className="dashboard_right_ffamily print_clinicians">
            <div className="page-break-policyack-decleration">


              <div className="policy_ack_declaration_top policy_ack_clinical_part personal_info_part">
                <p className="print-topborder">
                  {" "}
                  Below is the list of policies that clinicians & clinical staff are
                  expected to Acknowledge and update their details on required
                  fields.{" "}
                </p>

                <ul>
                  <li> a.) Employee Seal/Stamp Acknowledgement </li>

                  <li> b.) Employee Dosimeter Acknowledgement </li>

                  <li> c.) Physician Profile For PR </li>

                  <li> d.) Photo/Video Consent And Release Form </li>
                </ul>
              </div>
              <div className="policy_ack_declaration_top onboarding_top_padding personal_info_part">
                <div className="policy_ack_declaration">
                  <h3 style={{ float: "left" }}>a.) Employee Seal/Stamp Acknowledgement</h3>
                  <div className="clearfix">
                    <div className="header-title-units">
                      <ul>
                        <li>
                          Control Number: <b id="print-Stamp-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Stamp-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    I hereby acknowledge the receipt of the Seal/Stamp from the
                    Human Resources Department of{" "}
                    <span className="print-unitname">{officename}</span>
                    <span style={{ display: "none" }} className="print-dynamicunitname">
                      {dynamicunitname}.
                    </span>{" "}

                  </p>
                  <p>
                    I accept that this seal/stamp remains the property of{" "}
                    <span className="print-unitname">{officename}</span> <span style={{ display: "none" }} className="print-dynamicunitname"> {dynamicunitname} </span> and will be surrendered upon my resignation or termination of
                    employment. I also accept that I am responsible for the safety
                    of this seal/stamp and should it be damaged or lost, a fee will
                    be imposed for its replacement.
                  </p>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="print-policyempofficename form-group relative">
                      <input
                        type="text"
                        id="stamppolicyname"

                        name="name"
                        className="form-control policy-name1 commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>

                    <div
                      style={{ display: "none" }}
                      className="print-policydynamicname form-group relative"
                    >
                      <span
                        //  type="text"
                        id="stamppolicynamedynamic"
                        //   name="name"
                        className="print-control vieweditname1 print-stamppolicynamedynamicname commonviewmodepolicy policy-viewm-odeform"
                      // autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation printname-valid-err"
                      id="err-printednamepolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>


                  <div className="col-md-4">
                    <div className="policy form-group relative ">
                      <span
                        // type="text"
                        id="print-stamppolicyidnumber"
                        // name="idnumber"
                        className="print-control commonviewmodepolicy policy-declearation-idno policy-viewm-odeform"
                      //  autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee ID Number
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-idnopolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  {/* <div className="col-md-4 signature_part">


                <p>Employee  Signature</p>
              </div> */}
                </div>

                {/* <div className="row form signature_part">

              <div className="col-md-4 signature_part">

                <p>Date</p>

              </div>
            </div> */}
                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Employee  Signature</span>
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
            <div className="page-break-policyack-decleration">
              <div className="policy_ack_declaration_top personal_info_part" style={{ marginTop: "-30px" }}>
                <div className="policy_ack_declaration print-dosi-clinician">
                  <div className="clearfix">
                    <h3 style={{ float: "left" }}>b.) Employee Dosimeter Acknowledgement</h3>
                    <div className="header-title-units">
                      <ul>
                        <li>
                          Control Number: <b id="print-Dosimeter-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Dosimeter-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h4>Dosimeter- Do`s</h4>
                  <p>
                    1. Do wear it while working, it has no value in your locker or
                    purse{" "}
                  </p>

                  <p>2. Do wear it with the window facing outward </p>

                  <p>
                    3. Do leave it at the same place every day when you leave work
                    to ensure its usual location{" "}
                  </p>

                  <p>
                    4. Do place the control Dosimeter in a designated control area,
                    the dose to control subtracted from each Dosimeter and needs to
                    be accurate
                  </p>
                  <p>
                    5. Do report lost or damaged Dosimeters immediately. Prevent
                    damage by not leaving Dosimeter in areas of high temperature
                    such as dashboard or its clothes dryer
                  </p>
                  <p>
                    6. Do use it all the time at work. Time gaps make analysis more
                    difficult, less accurate and reduce legal historical value of
                    reports{" "}
                  </p>
                  <h4>Dosimeter- Don’ts </h4>
                  <p>
                    1 Do not place an assigned Dosimeter for testing of stray
                    radiation; an additional Dosimeter can be assigned for testing.
                  </p>
                  <p>
                    2. Do not share Dosimeter, this is illegal. An average for a
                    shared Dosimeter is meaningless to each individual
                  </p>
                  <p>
                    3. Do not tamper with your Dosimeter or anyone else’s. The
                    reports are legal documents and are regarded as exposures
                    received, tampering with Dosimeter may lead to disciplinary
                    action
                  </p>


                  <p>
                    4. Don’t wear it when you are receiving x-rays for your own
                    health problem
                  </p>
                  <p>5. Don’t wear it away from the workplace </p>
                  <div className="pageborder"></div>

                  <div className="policy_ack_declaration" >
                    <h4>Dosimeter Acknowledgement </h4>
                    <p>
                      I hereby acknowledge the receipt of the Dosimeter from the
                      Human Resource Department of{" "}
                      <span className="print-unitname">{officename}</span>
                      <span style={{ display: "none" }} className="print-dynamicunitname">
                        {dynamicunitname}
                      </span>
                      . I accept that this remains the property of
                      <span className="print-unitname">{officename}</span>
                      <span style={{ display: "none" }} className="print-dynamicunitname">
                        {dynamicunitname}
                      </span>{" "}
                      and will be surrendered upon my resignation or termination of
                      employment.{" "}
                    </p>
                    <p>
                      I also accept that I am responsible for the safety of this
                      Dosimeter and should it be damaged or lost, a fee will be
                      imposed for its replacement. I am aware of the Do’s and Don’ts
                      of Dosimeter as detailed above.
                    </p>
                  </div>
                </div>

                <div className="row form row_top" >
                  <div className="col-md-4">
                    <div className="print-policyempofficename form-group relative">
                      <input
                        type="text"
                        id="Dosimeterpolicyname"

                        name="name"
                        className="form-control policy-name1 commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="print-policydynamicname form-group relative"
                    >
                      <span
                        //  type="text"
                        id="stamppolicynamedynamic"
                        //name="name"
                        className="print-control vieweditname2 print-stamppolicynamedynamicname commonviewmodepolicy policy-viewm-odeform"
                      // autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Dosimeternamepolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>


                  <div className="col-md-4">
                    <div className="policy form-group relative ">
                      <span
                        //   type="text"
                        id="print-Dosimeterpolicyidnumber"
                        //   name="idnumber"
                        className="print-control commonviewmodepolicy policy-declearation-idno policy-viewm-odeform"
                      //   autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee ID Number
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-Dosimeteridpolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="policy form-group relative ">
                      <span
                        //  type="text"
                        id="print-Dosimeternumber"
                        // name="idnumber"
                        className="print-control commonviewmodepolicy policy-viewm-odeform"
                      //  autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Dosimeter Number {" "}
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-DosimeterNumber"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>
                </div>

                {/* <div className="row form">
              <div className="col-md-4 signature_part">
                <p>
                  Employee  Signature
                </p>
              </div>

              <div className="col-md-4 signature_part">

                <p>
                  Date
                </p>

              </div>
            </div> */}
                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Employee  Signature</span>
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

            <div className="policy_ack_declaration_top personal_info_part" style={{ marginTop: "-30px" }}>
              <div className="page-break-policyack-decleration">

                <div className="policy_ack_declaration print-dosi-clinician">
                  <div className="clearfix">
                    <h3 style={{ float: "left" }}>c.) Physician Profile For PR</h3>

                    <div className="header-title-units">
                      <ul>
                        <li>
                          Control Number: <b id="print-Physician-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Physician-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row form">
                  <div className="col-md-4">
                    <div className="print-policyempofficename form-group relative">
                      <input
                        type="text"
                        id="physicianpolicyname"

                        name="name"
                        className="form-control policy-name1 commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="print-policydynamicname form-group relative"
                    >
                      <span
                        //  type="text"
                        id="stamppolicynamedynamic"
                        //  name="name"
                        className="print-control vieweditname3 print-stamppolicynamedynamicname policy-viewm-odeform"
                      //  autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name <i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-physiciannamepolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  <div className="col-md-4">
                    <div className="policy form-group relative ">
                      {/* <input
          type="text"
          id="phypolicyempationality"
          name="nationality"
          className="form-control commonviewmodepolicy policy-viewm-odeform"
          autoComplete="off"
        /> */}
                      <span id="print-phypolicyempationality" className="print-control commonviewmodepolicy policy-viewm-odeform">
                        {/* {Allcountryname} */}
                      </span>

                      <span className="floating-label">
                        {" "}
                        Employee Nationality<i className="required">*</i>{" "}
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-physicianemployeenationality"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="policy form-group relative ">
                      <span
                        //  type="text"
                        id="print-specialty"
                        //   name="specialty"
                        className="print-control commonviewmodepolicy policy-viewm-odeform"
                      // autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Specialty <i className="required">*</i>{" "}
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-specialtyidpolicy"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="policy form-group relative">
                      <span
                        //    type="text"
                        id="print-Subspecialty"
                        //  name="Subspecialty"
                        className="print-control commonviewmodepolicy policy-viewm-odeform"
                      //  autoComplete="off"
                      />
                      <span className="floating-label">
                        Subspecialty<i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-Subspecialty"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>
                </div>

                <div className="dynalictablename policy_ack_special">
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search personal_information_title">
                      {/* <h4 className="contact-pg-title">
                    Special Procedures/Interests
                  </h4> */}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-dynamic"
                      id="print-cust-table-special"
                    >
                      <thead>
                        <tr>
                          <th> Special Procedures/Interests </th>
                          <th className="viewform-actn-th"></th>
                        </tr>
                      </thead>
                      <tbody id="print-tble-tbody-dynamicspecial-special">
                        <tr className="print-tr_emptydata">
                          <td>
                            <input
                              type="text"
                              id="tble-txt-specialinterest"
                              className="form-control policy-viewm-odeform"
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
                      className="Add-new-btn addnew-btn-policy"
                      onClick={(e) => this.AddNewRow(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>

                <div className="dynalictablename policy_ack_prefess">
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search personal_information_title">
                      {/* <h4 className="contact-pg-title">Professional memberships</h4> */}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-dynamic"
                      id="print-cust-table-ProfessionalMemberships">
                      <thead>
                        <tr>
                          <th> Professional Memberships </th>
                          {/* <th className="viewform-actn-th"></th> */}
                        </tr>
                      </thead>
                      <tbody id="print-tble-tbody-dynamicspecial-ProfessionalMemberships">
                        <tr className="print-tr_emptydata" style={{ display: "none" }}>
                          <td>
                            <input
                              type="text"
                              id="tble-txt-Profationalmembership"
                              className="form-control policy-viewm-odeform"
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
                      className="Add-new-btn addnew-btn-policy"
                      onClick={(e) => this.AddNewRowprofactional(e)}
                    >
                      Add New Row
                    </button>
                  </div>
                </div>
                <div className="policy_ack_othersinfo" style={{ marginBottom: "10px" }}>
                  {" "}
                  <h4>Other Information (If Any) </h4>
                  <span id="print-other-info" className="print-agr"></span>
                </div>

                <div className="policy_ack_declaration_para">
                  <p>
                    I hereby confirm that the above information is true to the best
                    of my knowledge
                  </p>
                </div>

                <div className="row form" style={{ marginTop: "-10px" }}>
                  <div className="col-md-4">
                    <div className="form-group relative  print-dynamicpolicyname">
                      {/* <input
                      type="text"
                      id="Name"
                      name="name"

                      className="form-control policy-name1 commonviewmodepolicy policy-viewm-odeform common_fullname_disable"
                      autoComplete="off"
                    />
                    <span className="floating-label">
                      Employee Name<i className="required">*</i>
                    </span> */}
                    </div>
                    <div
                      style={{ display: "none" }}
                      className="print-policydynamicname form-group relative"
                    >
                      <span
                        //  type="text"
                        id="print-stamppolicynamedynamic"
                        //  name="name"
                        className="print-control vieweditname4 print-stamppolicynamedynamicname policy-viewm-odeform commonviewmodepolicy"
                      //  autoComplete="off"
                      />
                      <span className="floating-label">
                        {" "}
                        Employee Name<i className="required">*</i>{" "}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nameerror"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.{" "}
                    </span>
                  </div>

                  {/* <div className="col-md-4 signature_part">
                <p>
                  Signature
                </p>

              </div>

              <div className="col-md-4 signature_part">

                <p>
                  Date
                </p>

              </div> */}

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

                {/* <div className="row form  clinical_row">
              <div className="col-md-4 signature_part">
                <p> Head – Clinical Services Signature </p>
              </div>
            </div> */}
                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check" style={{ borderTop: "0px" }}>
                          <span className="form-check-label" style={{ whiteSpace: "nowrap" }}>Head – Clinical Services Signature</span>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
              <div>
                <div className="policy_ack_declaration_top personal_info_part">
                  <div className="policy_ack_declaration print-video-clinician">
                    <h3> d.) Photo/Video Consent And Release Form</h3>
                  </div>
                  <div className="policy_ack_declaration">
                    <p> I understand that photographs will be used for <span id="print-ploicyunitname">{officename}</span><span style={{ display: "none" }} id="print-dynamicploicyunitname">
                      {dynamicunitname}</span>
                      's official social media activities for marketing, brand
                      awareness or promotional services of the facility on its social
                      media platforms and website, or on other social media platforms
                      associated with <span id="print-ploicyunitname">{officename}</span>{" "}
                      <span style={{ display: "none" }} id="print-dynamicploicyunitname"> {dynamicunitname}</span> Group for the purpose of advertising and promoting
                      <span id="print-ploicyunitname">{officename}</span> <span style={{ display: "none" }} id="print-dynamicploicyunitname">
                        {dynamicunitname}</span> services.
                    </p>
                    <p>
                      I understand that photography and videotaping will ensure
                      respect for the cultural, social and moral values of the
                      individual’s religion/society. Also, comply with all rules,
                      customs, and traditions of UAE.
                    </p>
                  </div>
                  <div className="policy_ack_declaration">
                    <h4>Employee Acknowledgment </h4>
                  </div>
                  <div className="policy_ack_declaration">
                    <p>
                      I hereby confirm that the above information is true to the best
                      of my knowledge I have read and fully understood the above and
                      agree to abide by it.{" "}
                    </p>
                  </div>

                  <div className="Consent and Release">
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="print-policyempofficename form-group relative">
                          <input
                            type="text"
                            id="consentReleaseempname"

                            name="name"
                            className="form-control policy-name1  viewmodedisableplicyhealth policy-viewm-odeform commonviewmodepolicy common_fullname_disable"
                            autoComplete="off"
                          />
                          <span className="floating-label">
                            Employee Name <i className="required">*</i>
                          </span>
                        </div>

                        <div
                          style={{ display: "none" }}
                          className="print-policydynamicname form-group relative"
                        >
                          <span
                            //  type="text"
                            id="stamppolicynamedynamic"
                            //  name="name"
                            className="print-control vieweditname5 print-stamppolicynamedynamicname policy-viewm-odeform"
                          // autoComplete="off"
                          />
                          <span className="floating-label">
                            {" "}
                            Employee Name <i className="required">*</i>{" "}
                          </span>
                        </div>


                        <span
                          className="error-validation common_nameerr"
                          id="err-physiciannamepolicy"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>


                      <div className="col-md-4">
                        <div className="policy form-group relative">
                          <span
                            //  type="text"
                            id="print-concentidno"
                            //  name="idno"
                            className="print-control sconcentidnos commonviewmodepolicy policy-viewm-odeform policy-declearation-idno"
                          /// autoComplete="off"
                          />
                          <span className="floating-label">
                            Employee ID Number
                          </span>
                        </div>

                        <span
                          className="error-validation"
                          id="err-concentidno"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div id="print-facilityunit-dynamic" className="policy form-group relative">
                          <input
                            type="text"
                            id="facilityUnit"
                            name="FacilityUnit"
                            className="form-control Unitnameploicyfacility commonviewmodepolicy policy-viewm-odeform"
                            autoComplete="off"

                          />
                          <span className="floating-label">
                            Facility/ Unit<i className="required">*</i>
                          </span>
                        </div>


                        <div id="print-facilityunit-withoutdynamic" style={{ display: "none" }} className="policy form-group relative">
                          <span
                            // type="text"
                            id="print-facilityUnitdynamic"
                            // name="FacilityUnit"
                            className="print-control commonviewmodepolicy policy-viewm-odeform"
                          // autoComplete="off"
                          />
                          <span className="floating-label">
                            Facility/ Unit<i className="required">*</i>
                          </span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-FacilityUnit"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.{" "}
                        </span>
                      </div>
                    </div>

                    {/* <div className="row form">

                  <div className="col-md-4 signature_part">
                    <p>
                      Signature
                    </p>

                  </div>
                  <div className="col-md-4 signature_part">
                    <p>
                      Date
                    </p>
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
                  </div>
                </div>

                <div className="personal_info_part print-clinican-attachememt">
                  <div className="Attachments Attachments-Required">
                    <div className="table-wrapper-Attachments clearfix">
                      <div className="table-search policy_acknowledgment_form policy_ack_declaration">
                        <h4 className="contact-pg-title">Attachments Required</h4>
                      </div>
                    </div>
                    <table
                      className="table table-bordered"
                      id="cust-table-Attachments"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">
                            Licenses/Certifications Attachments Required{" "}
                          </th>
                          <th className="clinian_field_th" scope="col">Field </th>

                          <th scope="col">Attached (Yes/No)</th>
                        </tr>
                      </thead>
                      <tbody id="tble-tbody-Attachments">
                        <tr>
                          <td>1</td>
                          <td>
                            {" "}
                            <span>DOH License </span>
                          </td>
                          <td>
                            {/* <input
                        id="dohLicense"
                        className="form-control dohinputfiled commonviewmodepolicy policy-viewm-odeform"
                        type="file"
                        autoComplete="off"
                      ></input>
                      <span
                        className="error-validation"
                        id="err-dohinputfiled"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}

                            <a
                              //  href={`${dohfile}`}
                              href={`${printdohfile}`}
                              style={{ display: "none" }}
                              className="doh-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="Doh-append"></span>

                            {/* <span
                        className="doh-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("doh")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span> */}
                          </td>

                          <td>
                            <div style={{ display: "none" }} id="print-dohyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="attactmentdoh-yes"
                  checked
                  name="YES"
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes1">YES</span>
                            </div>

                            <div id="print-dohno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="attactmentdoh-no"
                  name="NO"
                  checked
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>2</td>
                          <td>Copy of data flow</td>
                          <td>
                            {/* <input
                        type="file"
                        id="Copydataflow"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input>
                      <span
                        className="error-validation"
                        id="err-Copydataflow"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}

                            <a
                              //   href={`${dataflowfile}`}
                              href={`${printdataflowfile}`}
                              style={{ display: "none" }}
                              className="Copydataflow-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="Copydataflow-append"></span>
                            {/* <span
                        className="Copydataflow-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("Copydataflow")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-copydataflowyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="Copydataflow-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes2">YES</span>
                            </div>

                            <div id="print-copydataflowno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="Copydataflow-no"
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
                            <span>Copy of home country license </span>
                          </td>
                          <td>
                            {/* <input
                        type="file"
                        id="homecountrylicense"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}


                            <a
                              //  href={`${countrylicensefile}`}
                              href={`${printcountrylicensefile}`}
                              style={{ display: "none" }}
                              className="homecountrylicense-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="homecountrylicense-append"></span>
                            {/* <span
                        className="homecountrylicense-delete"
                        style={{ display: "none" }}
                        onClick={() =>
                          this.Deleteploicyfile("homecountrylicense")
                        }
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-homecountry"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-homelicenceyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="homecountrylicense-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes3">YES</span>
                            </div>

                            <div id="print-homelicenceno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="homecountrylicense-no"
                  checked
                  name="NO"
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>4</td>
                          <td>
                            <span>
                              Copy of home country registration certificate{" "}
                            </span>
                          </td>

                          <td>
                            {/* <input
                        type="file"
                        id="country_registration_certificate"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input>
                      <span
                        className="error-validation"
                        id="err-country_reg_cert"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}

                            <a
                              // href={`${homecountryregistrationfile}`}
                              href={`${printhomecountryregistrationfile}`}
                              style={{ display: "none" }}
                              className="country_registration_certificate-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-country_registration_certificate-append"></span>
                            {/* <span
                        className="country_registration_certificate-delete"
                        style={{ display: "none" }}
                        onClick={() =>
                          this.Deleteploicyfile(
                            "countryregistrationcertificate"
                          )
                        }
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span> */}
                          </td>
                          <td>
                            <div
                              style={{ display: "none" }}
                              id="print-country_registrationyes"
                            >
                              {/* <input
                  type="checkbox"
                  disabled
                  id="country_registration_certificate-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes4">YES</span>
                            </div>

                            <div id="print-country_registrationeno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="country_registration_certificate-no"
                  name="NO"
                  checked
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>5</td>
                          <td>
                            {" "}
                            <span>Log book </span>
                          </td>

                          <td>
                            {/* <input
                        type="file"
                        id="Logbook"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input>
                      <span
                        className="error-validation"
                        id="err-logbook"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}

                            <a
                              // href={`${logbookfile}`}
                              href={`${printlogbookfile}`}
                              style={{ display: "none" }}
                              className="Logbook-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-Logbook-append"></span>
                            {/* <span
                        className="Logbook-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("Logbook")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-Logbookyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="Logbook-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes5">YES</span>
                            </div>

                            <div id="print-Logbookno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="Logbook-no"
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
                            <span>BLS </span>
                          </td>

                          <td>
                            {/* <input
                        type="file"
                        id="bls"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}


                            <a
                              // href={`${blsfile}`}
                              href={`${printblsfile}`}
                              style={{ display: "none" }}
                              className="bls-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-bls-append"></span>
                            {/* <span
                        className="bls-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("bls")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-bls"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-blsyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="bls-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes6">YES</span>
                            </div>

                            <div id="print-blsno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  checked
                  disabled
                  id="bls-no"
                  name="NO"
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <span>ACLS (as per designated medical dept)</span>
                          </td>
                          <td>
                            {/* <input
                        type="file"
                        id="acls"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}


                            <a
                              //  href={`${aclsfile}`}
                              href={`${printaclsfile}`}
                              style={{ display: "none" }}
                              className="acls-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-acls-append"></span>
                            {/* <span
                        className="acls-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("acls")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-acls"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-aclsyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="acls-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes7">YES</span>
                            </div>

                            <div id="print-aclsno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="acls-no"
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
                            <span>PALS (as per designated medical dept) </span>
                          </td>
                          <td>
                            {/* <input
                        type="file"
                        id="pals"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}


                            <a
                              //  href={`${palsfile}`}
                              href={`${printpalsfile}`}
                              style={{ display: "none" }}
                              className="pals-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-pals-append"></span>
                            {/* <span
                        className="pals-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("pals")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-pals"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-palsyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="pals-yes"
                  name="YES"
                  checked
                /> */}

                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes8">YES</span>
                            </div>

                            <div id="print-palsno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="pals-no"
                  name="NO"
                  checked
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>9</td>
                          <td>
                            <span>NRP (as per designated medical dept) </span>
                          </td>
                          <td>
                            {/* <input
                        type="file"
                        id="nrp"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}


                            <a
                              // href={`${nrpfile}`}
                              href={`${printnrpfile}`}
                              style={{ display: "none" }}
                              className="nrp-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-nrp-append"></span>
                            {/* <span
                        className="nrp-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("nrp")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-nrp"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-nrpyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  checked
                  id="nrp-yes"
                  name="YES"
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes9">YES</span>
                            </div>

                            <div id="print-nrpno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  checked
                  disabled
                  id="nrp-no"
                  name="NO"
                /> */}
                              <span>No</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>
                            <span>ATLS (as per designated medical dept) </span>
                          </td>
                          <td>
                            {/* <input
                        type="file"
                        id="alts"
                        className="form-control policy-viewm-odeform"
                        autoComplete="off"
                      ></input> */}

                            <a
                              // href={`${altsfile}`}
                              href={`${printaltsfile}`}
                              style={{ display: "none" }}
                              className="alts-item"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>
                            <span id="print-alts-append"></span>
                            {/* <span
                        className="alts-delete"
                        style={{ display: "none" }}
                        onClick={() => this.Deleteploicyfile("alts")}
                      >
                        <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                      </span>
                      <span
                        className="error-validation"
                        id="err-alts"
                        style={{ color: "red", display: "none" }}
                      >
                        This field is mandatory.
                      </span> */}
                          </td>
                          <td>
                            <div style={{ display: "none" }} id="print-altsyes">
                              {/* <input
                  type="checkbox"
                  disabled
                  id="alts-yes"
                  name="YES"
                  checked
                /> */}
                              {/* <img className="attactment-img" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png" alt="error"></img> */}
                              <span className="ploicy_yes10">YES</span>
                            </div>

                            <div id="print-altsno">
                              {" "}
                              {/* <input
                  type="checkbox"
                  disabled
                  id="alts-no"
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
              </div>
            </div>
            <div className="pageborder"></div>
          </div>
        </div>
      </>
    );
  }
}
