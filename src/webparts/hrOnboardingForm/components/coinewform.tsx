import * as React from "react";
import { IcoiProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/fields";
import { Web } from "@pnp/sp/presets/all";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import swal from "sweetalert";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";



export interface IConflictofInterestNewState {
  Conflict: any[];
  Interest: any[];
  DynamicTable: any[];
  COIMasterList: any[];
  rawHtmlNDA: any[];
  CurrentUserName: any[];
  CurrentUserDesignation: any[];
  CurrentUserOffice: string;
  Hereby: string;
  EmployeeName: string;
  Date: string;
  EmployeeDesignation: string;
  Hospital: string;
  WitnessName: string;
  WitnessDate: string;
  ContractTransactioHistory: string;
  Contract: string;
  Dynamiclogo: any[];
  ONBSessionID: string;
  COISubmissionStatus: string;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[];
  VersionNumber: any[];
  coiFormControlNumber: any[];
  coiFormVersionNumber: any[]
  HrCompleteStatus: boolean;
}

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var officename = "";
var dynamicnamebusiness = "";
var LogoUrl;
let CoiItemID;
let Mode;
let coismode;
var coiImgsrc;
var coilistid;
var GlobalModes = "";
var VersionNumber;
var ControlNumber;

const newwebdata = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM"
);
const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class ConflictofInterestNew extends React.Component<
  IcoiProps,
  IConflictofInterestNewState,
  {}
> {
  constructor(props: IcoiProps) {
    super(props);
    this.state = {
      CurrentUserOffice: "",
      Conflict: [],
      DynamicTable: [],
      COIMasterList: [],
      rawHtmlNDA: [],
      Interest: [],
      CurrentUserName: [],
      CurrentUserDesignation: [],
      Hereby: "",
      EmployeeName: "",
      Date: "",
      EmployeeDesignation: "",
      Hospital: "",
      WitnessName: "",
      WitnessDate: "",
      ContractTransactioHistory: "",
      Contract: "",
      Dynamiclogo: [],
      ONBSessionID: "",
      COISubmissionStatus: "Inprogress",
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      coiFormControlNumber: [],
      coiFormVersionNumber: [],
      HrCompleteStatus: false
    };
  }
  public componentDidMount() {
    const url: any = new URL(window.location.href);
    CoiItemID = url.searchParams.get("CoiItemID");
    Mode = url.searchParams.get("CoiMode");
    coismode = url.searchParams.get("CoiMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");
    GlobalModes = url.searchParams.get("mdeopn");

    this.Questionansshowing()
    this.GetCurrentUserDetails();
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
    $(".coi-Witnessdate").val(moment().format("YYYY-MM-DD"));
    $(".coidates").val(moment().format("YYYY-MM-DD"));
    $(".employee_input").prop('disabled', true);
    $(".empcoinamed").prop('disabled', true);
    $(".empcoiemployeeprintname").prop('disabled', true);
    $("#EmployeeDesignation").prop('disabled', true);
    $(".coi-hospital").prop('disabled', true);
    // $(".swal-footer").attr("style", "text-align:center")
    this.GetConflictofInterestItems();
    this.GetConflistlistItems();
    this.RemoveValidationCoi();
    this.Autopopulate()

    if (GlobalFormOpenedMode == "Edit") {
      this.GetEmployeeCOiEthicsEditItem(GlobalSessionIDValue);

    } else if (GlobalFormOpenedMode == "View") {
      this.GetEmployeeCOiEthicsViewItem(GlobalSessionIDValue);
      this.GetEmployeeCOiEthicsViewItemForPrint(GlobalSessionIDValue);
    }


  }

  public GetEmployeeCOiEthicsViewItemForPrint(ID) {

    // $(".coititle").attr("style", "color:#00A36C");
    $("#print-coihospitalwithout").show();
    $("#print-coihospitalwith").hide();
    $("#print-dynamicnamebusiness").show();
    $("#print-unitnamecoi").hide();
    $(".print-coiempname").hide();
    $(".print-coiempnameedit").show();
    $("#print-coiitemidimg").show();
    $(".print-coiimg").show();
    $("#print-coiiconimg").hide()

    newweb.lists.getByTitle("COI Transaction").items.select(
      "ID",
      "Date",
      "EmployeeName",
      "EmployeeDesignation",
      "Hospital",
      "WitnessName",
      "WitnessDate",
      "ContractTransactionHistory",
      "Contract",
      "Author/Title",
      "Answereone",
      "Answeretwo",
      "Answerethree",
      "ONBSessionID",
      "BusinessUnit",
      "Logounit",
      "Questiononecheckbox",
      "Questiontwocheckbox",
      "Questionthreecheckbox",
      "ControlNumber",
      "VersionNumber"

    )
      .filter("ONBSessionID eq '" + EditSessionid + "'").expand("Author")
      .get().then((result) => {


        if (result.length != 0) {
          $("#print-coi-Control-Number").text(result[0].ControlNumber)
          $("#print-coi-Version-Number").text(result[0].VersionNumber);
          $("#print-Dynamicempnamecoi").text(result[0].EmployeeName);
          $(".print-employee_input").text(result[0].EmployeeName);

          $(".print-coi-deg").text(result[0].EmployeeDesignation);

          $(".print-coihospital").text(result[0].Hospital);
          $(".print-coi-Witness").text(result[0].WitnessName);

          $(".print-coi-Contract").text(result[0].Contract);

          $("#print-Hereby").text(result[0].EmployeeName);
          $(".print-empcoiemployeeprintname").text(result[0].EmployeeName);
          $(".print-empcoiemployeewitnessname").text(result[0].WitnessName);

          setTimeout(() => {
            if (result[0].Answereone != null) {
              // $(".print-coi_question_first_yes").attr('checked', 'checked');
              $(".print-coi_question_first_yes").text("Yes")
              //$(".print-coi_question_first_yes").removeAttr("disabled");
              $("#print-answere-one").text(result[0].Answereone)
              $("#print-answere-first").show();

            } else {
              $(".print-coi_question_first_yes").text("No")
              // $(".print-coi_question_first_no").attr('checked', 'checked');
              // $(".print-coi_question_first_no").removeAttr("disabled");
              $("#print-answere-first").hide();
            }

            if (result[0].Answeretwo != null) {
              // $(".print-coi_question_second_yes").attr('checked', 'checked');
              // $(".print-coi_question_second_yes").removeAttr("disabled");
              $("#print-answere-two").text(result[0].Answeretwo)
              $(".print-coi_question_second_yes").text("Yes")
              $("#print-answere-second").show();

            } else {
              $(".print-coi_question_second_yes").text("No")
              // $(".print-coi_question_second_no").attr('checked', 'checked');
              // $(".print-coi_question_second_no").removeAttr("disabled");
              $("#print-answere-second").hide();
            }


            if (result[0].Answerethree != null) {
              //  $(".print-coi_question_three_yes").attr('checked', 'checked');
              //  $(".print-coi_question_three_yes").removeAttr("disabled");
              $("#print-answere-three").text(result[0].Answerethree)
              $(".print-coi_question_three_yes").text("Yes")

              $("#print-answerethree").show();
            } else {
              $(".print-coi_question_three_yes").text("No")
              // $(".print-coi_question_three_no").attr('checked', 'checked');
              // $(".print-coi_question_three_no").removeAttr("disabled");
              $("#print-answerethree").hide();

            }
          }, 2000);
          coiImgsrc = result[0].Logounit;
          dynamicnamebusiness = result[0].BusinessUnit
        }
      });
  }

  public RemoveValidationCoi() {
    $("#EmployeeDesignation").keyup(function () {
      $("#errdesignation").hide();
    });
    $("#dynamic-witness-name-second").keyup(function () {
      $("#err-employeewitnessname").hide();
      $("#err-witnessname").hide();
    });
    $("#DynamicWitnessName").keyup(function () {
      $("#err-witnessname").hide();
      $("#err-employeewitnessname").hide();
    });


    $("#WitnessName").keyup(function () {
      $("#err-witnessname").hide();
    });
    $("#Contract").keyup(function () {
      $("#err-contract").hide();
    });

    $(".coihospital ").keyup(function () {
      $("#err-hospital").hide();
    });

    $(".coihospital ").keyup(function () {
      $("#err-hospital").hide();
    });

    $(".empcoinamed").keyup(function () {
      $("#err-employeename").hide();
    });

    $(".empdit").keyup(function () {
      $("#err-employeename").hide();
    });


    $(".coi_question_first_yes").on("change", function () {
      $(".err-que-one").hide();
    });
    $(".coi_question_first_no").on("change", function () {
      $(".err-que-one").hide();
    });


    $(".coi_question_second_yes").on("change", function () {
      $(".err-que-two").hide();
    });
    $(".coi_question_second_no").on("change", function () {
      $(".err-que-two").hide();
    });

    $(".coi_question_three_yes").on("change", function () {
      $(".err-que-three").hide();
    });

    $(".coi_question_three_no").on("change", function () {
      $(".err-que-three").hide();
    });
    $("#answere-one").keyup(function () {
      $("#err-questionans-first").hide();
    });

    $("#answere-two").keyup(function () {
      $("#err-questionans-two").hide();
    });
    $("#answere-three").keyup(function () {
      $("#err-questionans-third").hide();
    });
  }


  public GetEmployeeCOiEthicsViewItem(GlobalSessionIDValue) {

    $(".coiimg").show();
    // $(".coititle").attr("style", "color:#00A36C");
    $(".print-btncoi").show()
    $(".checkbox_disable").prop('disabled', true);
    $(`#alldesc`).hide();
    $(`.dynamicdescitemid`).show();
    $(`#coiitemidimg`).show();
    $(`.dynamiccoiimg`).hide();

    $(`#Coibtmitemid`).hide();
    $(`.coi2-submit`).hide();
    $("#userupdatecoibtn").hide();
    $('#ContractTransactionHistory').prop('disabled', true);
    $(".coiviewmodecommon").prop("disabled", true);
    $("#DynamicWitnessName").show();
    $("#WitnessName").hide();
    $("#dynamicnamebusiness").show();
    $("#unitnamecoi").hide();
    $("#coiitemidimg").show();
    $(".coiimg").show();
    $("#coiiconimg").hide();
    $(".list-withness-name").show()
    $(".dynamic-withness-name").hide()
    newweb.lists.getByTitle("COI Transaction").items.select(
      "ID",
      "Date",
      "EmployeeName",
      "EmployeeDesignation",
      "Hospital",
      "WitnessName",
      "WitnessDate",
      "ContractTransactionHistory",
      "Contract",
      "Author/Title",
      "Answereone",
      "Answeretwo",
      "Answerethree",
      "ONBSessionID",
      "BusinessUnit",
      "Logounit",
      "Questiononecheckbox",
      "Questiontwocheckbox",
      "Questionthreecheckbox"

    )
      .filter("ONBSessionID eq '" + EditSessionid + "'").expand("Author")
      .get().then((result) => {


        if (result.length != 0) {
          $(".coi_tickimg").show();
          $(".empcoinamed").val(result[0].EmployeeName);
          $(".employee_input").val(result[0].EmployeeName);

          $(".coi-deg").val(result[0].EmployeeDesignation);
          $(".coihospital").val(result[0].Hospital);
          $("#DynamicWitnessName").val(result[0].WitnessName);

          $(".coi-Contract").val(result[0].Contract);

          setTimeout(() => {
            $("#Hereby").val(result[0].EmployeeName);
            $(".empcoiemployeeprintname").val(result[0].EmployeeName);
            $(".empcoiemployeewitnessname").val(result[0].WitnessName);
            $("#dynamic-witness-name-second").val(result[0].WitnessName);
          }, 1500);



          if (result[0].Questiononecheckbox == "Yes") {
            $(".coi_question_first_yes").prop("checked", true);
            $("#answere-one").val(result[0].Answereone);
            $("#answere-first").show();
          } else {
            $(".coi_question_first_no").prop("checked", true);
          }
          if (result[0].Questiontwocheckbox == "Yes") {
            $(".coi_question_second_yes").prop("checked", true);
            $("#answere-two").val(result[0].Answeretwo)
            $("#answere-second").show();
          } else {
            $(".coi_question_second_no").prop("checked", true);
          }
          if (result[0].Questionthreecheckbox == "Yes") {
            $(".coi_question_three_yes").prop("checked", true);
            $("#answere-three").val(result[0].Answerethree);
            $("#answerethree").show();
          } else {
            $(".coi_question_three_no").prop("checked", true);
          }
          coiImgsrc = result[0].Logounit;
          dynamicnamebusiness = result[0].BusinessUnit;
        }
      });
  }

  public GetEmployeeCOiEthicsEditItem(GlobalSessionIDValue) {
    $(".coiimg").show();
    // $(".coititle").attr("style", "color:#00A36C");
    $(".coi-Witnessdate").prop('disabled', false);
    $(".coidates").prop('disabled', false);
    $(".employee_input").prop('disabled', true);
    $(".empcoinamed").prop('disabled', true);
    $(".empcoiemployeeprintname").prop('disabled', true);
    $("#EmployeeDesignation").prop('disabled', true);
    $(".coi-hospital").prop('disabled', true);
    $(`#alldesc`).hide();
    $(`.dynamicdescitemid`).show();
    $(`#coiitemidimg`).show();
    $(`.dynamiccoiimg`).hide();
    $(`#Coibtmitemid`).show();
    $(`.coi2-submit`).hide();
    $("#DynamicWitnessName").show();
    $("#WitnessName").hide();
    $("#userupdatecoibtn").hide();

    $("#dynamicnamebusiness").show();
    $("#unitnamecoi").hide();
    $("#coiitemidimg").show();
    $(".coiimg").show();
    $("#coiiconimg").hide()
    $(".list-withness-name").show()
    $(".dynamic-withness-name").hide()
    newweb.lists.getByTitle("COI Transaction").items.select(
      "ID",
      "Date",
      "EmployeeName",
      "EmployeeDesignation",
      "Hospital",
      "WitnessName",
      "WitnessDate",
      "ContractTransactionHistory",
      "Contract",
      "Author/Title",
      "Answereone",
      "Answeretwo",
      "Answerethree",
      "ONBSessionID",
      "BusinessUnit",
      "Logounit",
      "Questiononecheckbox",
      "Questiontwocheckbox",
      "Questionthreecheckbox",
      "VersionNumber",
      "ControlNumber",
    )
      .filter("ONBSessionID eq '" + EditSessionid + "'").expand("Author")
      .get().then((result) => {
        if (result.length != 0) {
          coilistid = result[0].ID;
          VersionNumber = result[0].VersionNumber
          ControlNumber = result[0].ControlNumber
          $(".coi_tickimg").show();
          $(".empcoinamed").val(result[0].EmployeeName);
          $(".employee_input").val(result[0].EmployeeName);

          $(".coi-deg").val(result[0].EmployeeDesignation);
          $(".coi-hospital").val(result[0].Hospital);

          //$("#DynamicWitnessName").val(result[0].WitnessName);

          $(".coi-Contract").val(result[0].Contract);

          setTimeout(() => {
            $("#Hereby").val(result[0].EmployeeName);
            $(".empcoiemployeeprintname").val(result[0].EmployeeName);
            //   $(".empcoiemployeewitnessname").val(result[0].WitnessName);

            // $("#dynamic-witness-name-second").val(result[0].WitnessName);

            $("#DynamicWitnessName , #dynamic-witness-name-second").val(this.state.CurrentUserName);

          }, 1500);



          if (result[0].Questiononecheckbox == "Yes") {
            $(".coi_question_first_yes").prop("checked", true);
            $("#answere-one").val(result[0].Answereone);
            $("#answere-first").show();
          } else {
            $(".coi_question_first_no").prop("checked", true);
          }
          if (result[0].Questiontwocheckbox == "Yes") {
            $(".coi_question_second_yes").prop("checked", true);
            $("#answere-two").val(result[0].Answeretwo)
            $("#answere-second").show();
          } else {
            $(".coi_question_second_no").prop("checked", true);
          }
          if (result[0].Questionthreecheckbox == "Yes") {
            $(".coi_question_three_yes").prop("checked", true);
            $("#answere-three").val(result[0].Answerethree);
            $("#answerethree").show();
          } else {
            $(".coi_question_three_no").prop("checked", true);
          }

          coiImgsrc = result[0].Logounit;
          dynamicnamebusiness = result[0].BusinessUnit;

        }
      });
  }

  public Autopopulate() {
    $(".employee_input").keyup(function () {
      var value = $(this).val();
      $(".empdit").val(value);
      $(".empcoinamed").val(value);
      $(".empcoiemployeeprintname").val(value)
    });

    $(".empdit").keyup(function () {
      var value = $(this).val();
      $(".employee_input").val(value);
      $(".empcoinamed").val(value);
      $(".empcoiemployeeprintname").val(value)
    });

    $(".empcoinamed").keyup(function () {
      var value = $(this).val();
      $(".employee_input").val(value);
      $(".empdit").val(value);
      $(".empcoiemployeeprintname").val(value)
    });

    $(".empcoiemployeeprintname").keyup(function () {
      var value = $(this).val();
      $(".employee_input").val(value);
      $(".empdit").val(value);
      $(".empcoinamed").val(value)
    });

    $(".coi-Witness").keyup(function () {
      var value = $(this).val();
      $(".empcoiemployeewitnessname").val(value)
    })
    $(".empcoiemployeewitnessname").keyup(function () {
      var value = $(this).val();
      $(".coi-Witness").val(value)
    })


    $("#dynamic-witness-name-second").keyup(function () {
      var value = $(this).val();
      $("#DynamicWitnessName").val(value)
    })
    $("#DynamicWitnessName").keyup(function () {
      var value = $(this).val();
      $("#dynamic-witness-name-second").val(value)
    })

  }

  public Dynamicempvalid() {
    var status = true;
    if (status == true && $(".empcoinamed").val() != "") {
      $("#err-employeename").hide()
    } else {
      $("#err-employeename").show();
      $(".empcoinamed").focus();
      var status = false;
    }
    return status;
  }


  public hospitalvalidation() {
    var status = true;
    if (status == true && $(".coihospital").val() != "") {
      $("#err-hospital").hide();
    } else {
      $("#err-hospital").show();
      $(".coihospital").focus();
      status = false;
    }
    return status;
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'JOINING REPORT' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        this.setState({
          isPrevFormSubmitted: true
        });
      }
    });

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'CONFLICT OF INTEREST'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "CONFLICT OF INTEREST") {
          this.setState({
            COISubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
            this.GetConflictofinterestlistdata(ONBSessionID, FormMode);
          }
        }
      }
    });
  }


  public dynamicwithnessnamevalidation() {
    var status = true;
    if (status == true && $("#dynamic-witness-name-second").val() != "") {
      $("#err-employeewitnessname").hide()
    } else {
      $("#err-employeewitnessname").show();
      $("#dynamic-witness-name-second").focus();
      var status = false;
    }
    return status;
  }
  public UpdateListItemcoi() {


    if (
      this.Dynamicempvalid() &&
      this.designationname() &&
      this.hospitalvalidation() &&
      this.Withnessname() &&
      this.dynamicwithnessnamevalidation() &&
      this.contractdata() &&
      this.Questiononevalidation() &&
      this.Ansonevalid() &&
      this.Questiontwovalidation() &&
      this.Anstwovalid() &&
      this.Questionthreevalidation() &&
      this.Ansthreevalid()
    ) {


      var Name = $(".empcoinamed").val();
      var Date = $("#Date").val();
      var Designation = $("#EmployeeDesignation").val();
      var Hospital = $(".coihospital").val();
      var Witness = $("#DynamicWitnessName").val();
      // var WDate = $("#WitnessDate").val();
      //  var Transaction = $("#ContractTransactionHistory").val();
      var Contract = $("#Contract").val();

      var ans1 = $("#answere-one").val();
      var ans2 = $("#answere-two").val();
      var ans3 = $("#answere-three").val();

      if ($(".coi_question_first_yes").prop('checked') == true) {
        var questiononecheck = "Yes"
      } else {
        questiononecheck = "No"
      }


      if ($(".coi_question_second_yes").prop('checked') == true) {
        var questiontwocheck = "Yes"
      } else {
        questiontwocheck = "No"
      }

      if ($(".coi_question_three_yes").prop('checked') == true) {
        var quethree = "Yes"
      } else {
        quethree = "No"
      }

      if ($(".coi_question_first_no").prop('checked') == true) {
        ans1 = null;
      }
      if ($(".coi_question_second_no").prop('checked') == true) {
        ans2 = null;
      }
      if ($(".coi_question_three_no").prop('checked') == true) {
        ans3 = null;
      }
      // var PName1 = $("#PrintName1").val();
      // var PName2 = $("#PrintName2").val();
      // var PDate1 = $("#PrintDate1").val();
      // var PDate2 = $("#PrintDate2").val();
      newweb.lists
        .getByTitle('COI Transaction')
        .items.getById(coilistid).update(
          {
            Title: "CONFLICT OF INTEREST",

            EmployeeName: Name,

            EmployeeDesignation: Designation,
            Hospital: Hospital,
            WitnessName: Witness,
            Contract: Contract,
            Questiononecheckbox: questiononecheck,
            Questiontwocheckbox: questiontwocheck,
            Questionthreecheckbox: quethree,

            Answereone: ans1,
            Answeretwo: ans2,
            Answerethree: ans3,
            Status: "Updated by Unit HR",
          }
        )
        .then((results: any) => {
          this.UpdateOtherForms(GlobalSessionIDValue)
          if (this.state.HrCompleteStatus == true) {
            subweb.lists
              .getByTitle('COI HR Update History')
              .items.add({
                Title: "CONFLICT OF INTEREST",

                EmployeeName: Name,

                EmployeeDesignation: Designation,
                Hospital: Hospital,
                WitnessName: Witness,
                Contract: Contract,
                Questiononecheckbox: questiononecheck,
                Questiontwocheckbox: questiontwocheck,
                Questionthreecheckbox: quethree,
                BusinessUnit: officename,
                Answereone: ans1,
                Answeretwo: ans2,
                Answerethree: ans3,
                Status: "Updated by Unit HR",
                ONBSessionID: GlobalSessionIDValue,
                VersionNumber: VersionNumber,
                ControlNumber: ControlNumber,
              })
          }
          setTimeout(() => {

            swal({
              title: "The Form has been updated successfully",
              icon: 'success'
            }).then(() => {
              location.reload()
            });

          }, 2000);
        });
    }
  }

  public UpdateOtherForms(Sessionid) {


    newweb.lists.getByTitle("Acknowledgement And Policy Declarations Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${Sessionid}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Acknowledgement And Policy Declarations Transaction").items.getById(result[0].ID)
          .update({
            HRNAME: $("#dynamic-witness-name-second").val()

          })
      })
    newweb.lists.getByTitle("Emp NDA Transaction").items.select("ID", "ONBSessionID").filter(`ONBSessionID eq '${Sessionid}'`).get()
      .then((result) => {
        newweb.lists.getByTitle("Emp NDA Transaction").items.getById(result[0].ID)
          .update({
            Authorizedsignatory: $("#dynamic-witness-name-second").val()

          })
      })
  }


  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?env=WebView`;
  }
  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
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
        // $(".employee_input").val(resultData.d.DisplayName);
        // $(".empcoinamed").val(resultData.d.DisplayName);
        // $(".empcoiemployeeprintname").val(resultData.d.DisplayName);

        var Designation = resultData.d.Title;
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            officename = properties[i].Value;
            $(".coi-hospital").val(officename)
            var ofcname = properties[i].Value;
            reacthandler.GetUnitHrName(ofcname);
            reacthandler.LogoUnitDynamic(ofcname);
            reacthandler.GetContolandVersionNumber(ofcname)
            reacthandler.GetControlNumberAccordingtoformname(ofcname)
          }
        }
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
        .filter(`Title eq 'CONFLICT OF INTEREST'`).get()
        .then((results) => {

          this.setState({
            coiFormControlNumber: results[0][fieldname1.InternalName],
            coiFormVersionNumber: results[0][fieldname2.InternalName]
          })

          // alert(this.state.ControlNumber+"-"+this.state.coiFormControlNumber)
        });

    }
  }
  public async GetUnitHrName(ofcname) {

    await newweb.lists.getByTitle('UNIT HR MASTER').items
      .select('Name/Id', 'Name/Title', 'Business/Id', 'Business/Title').expand('Business', 'Name')
      .filter(`Business/Title eq '${ofcname}'`)
      .get().then((items) => {

        $(".empcoiemployeewitnessname").val(items[0].Name.Title)
        $("#WitnessName").val(items[0].Name.Title)
      })

  }
  // public Datavalid() {
  //   var status = true;
  //   if (status == true && $("#PrintDate2").val() != "") {
  //     $("#err-printdate2").hide();
  //   } else {
  //     $("#err-printdate2").show();
  //     status = false;
  //   }
  //   return status;
  // }
  // public Datavaliddate() {
  //   var status = true;
  //   if (status == true && $("#PrintDate1").val() != "") {
  //     $("#err-printdat1").hide();
  //   } else {
  //     $("#err-printdat1").show();
  //     status = false;
  //   }
  //   return status;
  // }
  public Datavalidhospital() {
    var status = true;
    if (status == true && $("#Hospital").val() != "") {
      $("#err-hospital").hide();
    } else {
      $("#err-hospital").show();
      $("#Hospital").focus();
      status = false;
    }
    return status;
  }
  public Printnameones() {
    var status = true;
    if (status == true && $("#PrintName1").val() != "") {
      $("#err-printname1").hide();
    } else {
      $("#err-printname1").show();
      $("#PrintName1").focus();
      status = false;
    }
    return status;
  }
  public Printnametwos() {
    var status = true;
    if (status == true && $("#PrintName2").val() != "") {
      $("#err-printname2").hide();
    } else {
      $("#err-printname2").show();
      $("#PrintName2").focus();
      status = false;
    }
    return status;
  }
  public witnessdatedata() {
    var status = true;
    if (status == true && $("#WitnessDate").val() != "") {
      $("#err-witnessdate").hide();
    } else {
      $("#err-witnessdate").show();
      $("#WitnessDate").focus();

      status = false;
    }
    return status;
  }
  public contractdata() {
    var status = true;
    if (status == true && $("#Contract").val() != "") {
      $("#err-contract").hide();
    } else {
      $("#err-contract").show();
      $("#Contract").focus();
      status = false;
    }
    return status;
  }
  public Withnessname() {
    var status = true;
    if (status == true && $("#WitnessName").val() != "") {
      $("#err-witnessname").hide();
    } else {
      $("#err-witnessname").show();
      $("#WitnessName").focus();
      status = false;
    }
    return status;
  }
  public designationname() {
    var status = true;
    if (status == true && $("#EmployeeDesignation").val() != "") {
      $("#errdesignation").hide();
    } else {
      $("#errdesignation").show();
      $("#EmployeeDesignation").focus();
      status = false;
    }
    return status;
  }
  public Coidates() {
    var status = true;
    if (status == true && $(".coidates").val() != "") {
      $(".errordatecoi").hide();
    } else {
      $(".errordatecoi").show();
      $(".coidates").focus();
      status = false;
    }
    return status;
  }

  // public ContractTransactionHistory() {
  //   var status = true;
  //   if (status == true && $("#ContractTransactionHistory").find(":selected").text()== "Select") {
  //     $("#err-contracttransactionhistory").show();
  //     status = false;
  //   } else {
  //     $("#err-contracttransactionhistory").hide();

  //   }
  //   return status;
  // }


  public Questiononevalidation() {
    var status = true;
    if (status == true && $(".coi_question_first_yes").is(":checked")) {
      $(".err-que-one").hide()
    } else if (status == true && $(".coi_question_first_no").is(":checked")) {
      $(".err-que-one").hide()
    } else {
      $(".err-que-one").show();
      $(".coi_question_first_yes").focus();
      status = false;
    }
    return status;
  }


  public Questiontwovalidation() {
    var status = true;
    if (status == true && $(".coi_question_second_yes").is(":checked")) {
      $(".err-que-two").hide()
    } else if (status == true && $(".coi_question_second_no").is(":checked")) {
      $(".err-que-two").hide()
    } else {
      $(".err-que-two").show();
      $(".coi_question_second_yes").focus();
      status = false;
    }
    return status;
  }


  public Questionthreevalidation() {
    var status = true;
    if (status == true && $(".coi_question_three_yes").is(":checked")) {
      $(".err-que-three").hide()
    } else if (status == true && $(".coi_question_three_no").is(":checked")) {
      $(".err-que-three").hide()
    } else {
      $(".err-que-three").show();
      $(".coi_question_three_yes").focus();
      status = false;
    }
    return status;
  }

  public Ansonevalid() {
    var status = true;
    if ($(".coi_question_first_yes").is(":checked")) {

      if (status == true && $("#answere-one").val() != "") {
        $("#err-questionans-first").hide()

      } else {
        $("#err-questionans-first").show();
        $("#answere-one").focus();
        var status = false;
      }

    } else {
      $("#err-questionans-first").hide()
    }
    return status;
  }

  public Anstwovalid() {
    var status = true;
    if ($(".coi_question_second_yes").is(":checked")) {

      if (status == true && $("#answere-two").val() != "") {
        $("#err-questionans-two").hide()

      } else {
        $("#err-questionans-two").show();
        $("#answere-two").focus();
        var status = false;
      }

    } else {
      $("#err-questionans-two").hide()
    }
    return status;
  }

  public Ansthreevalid() {
    var status = true;
    if ($(".coi_question_three_yes").is(":checked")) {

      if (status == true && $("#answere-three").val() != "") {
        $("#err-questionans-third").hide()

      } else {
        $("#err-questionans-third").show();
        $("#answere-three").focus();
        var status = false;
      }

    } else {
      $("#err-questionans-third").hide();

    }
    return status;
  }

  public empprintnamevalidation() {
    var status = true;
    if (status == true && $(".empcoiemployeeprintname").val() != "") {
      $("#err-employeeprintname").hide()
    } else {
      $("#err-employeeprintname").show();
      $(".empcoiemployeeprintname").focus();
      var status = false;
    }
    return status;
  }
  public empwitnessnamevalidation() {
    var status = true;
    if (status == true && $(".empcoiemployeewitnessname").val() != "") {
      $("#err-employeewitnessname").hide()
    } else {
      $("#err-employeewitnessname").show();
      $(".empcoiemployeewitnessname").focus();
      var status = false;
    }
    return status;
  }


  public officehospitalvalidation() {
    var status = true;
    if ($(".coi-hospital").val() != "") {
      $(".err-hospital").hide();
    } else {
      $(".err-hospital").show();
      $(".coi-hospital").focus();
      status = false;
    }
    return status;
  }
  public Saveitems() {
    // alert(this.state.ControlNumber+"-"+this.state.coiFormControlNumber)
    if (
      this.empprintnamevalidation() &&
      this.empwitnessnamevalidation() &&
      this.designationname() &&
      this.officehospitalvalidation() &&
      this.Withnessname() &&
      this.Questiononevalidation() &&
      this.Ansonevalid() &&
      this.Questiontwovalidation() &&
      this.Anstwovalid() &&
      this.Questionthreevalidation() &&
      this.Ansthreevalid() &&
      this.contractdata()

    ) {
      var Multi = $("#dynamicinterest").html();
      var Here = $("#Hereby").val();
      var Name = $(".empcoinamed").val();
      var Date = $("#Date").val();
      var Designation = $("#EmployeeDesignation").val();
      var Hospital = $("#Hospital").val();
      var Witness = $(".empcoiemployeewitnessname").val();
      var WDate = $("#WitnessDate").val();
      //  var Transaction = $("#ContractTransactionHistory").val();
      var Contract = $("#Contract").val();

      if ($(".coi_question_first_yes").prop('checked') == true) {
        var questiononecheck = "Yes"
      } else {
        questiononecheck = "No"
      }


      if ($(".coi_question_second_yes").prop('checked') == true) {
        var questiontwocheck = "Yes"
      } else {
        questiontwocheck = "No"
      }

      if ($(".coi_question_three_yes").prop('checked') == true) {
        var quethree = "Yes"
      } else {
        quethree = "No"
      }
      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {
          let listcoi = newweb.lists.getByTitle("COI Transaction");
          listcoi.items.add({
            Title: "CONFLICT OF INTEREST",
            // COIMasterList: Multi,
            Hereby: Here,
            EmployeeName: Name,

            EmployeeDesignation: Designation,
            Hospital: Hospital,
            WitnessName: Witness,
            WitnessDate: moment(WDate),
            Contract: Contract,
            Answereone: $("#answere-one").val(),
            Answeretwo: $("#answere-two").val(),
            Answerethree: $("#answere-three").val(),
            Questiononecheckbox: questiononecheck,
            Questiontwocheckbox: questiontwocheck,
            Questionthreecheckbox: quethree,
            Logounit: LogoUrl,
            BusinessUnit: officename,
            ONBSessionID: this.state.ONBSessionID,
            Status: "Submitted by Employee",
            ControlNumber: this.state.ControlNumber + "/" + this.state.coiFormControlNumber,
            VersionNumber: this.state.coiFormVersionNumber,
          })
            .then((results: any) => {
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'CONFLICT OF INTEREST'").orderBy("Created", false).get().then((response) => {
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

  public GetConflictofInterestItems() {
    newwebdata.lists
      .getByTitle("COI Preparers Master")
      .items.select(
        "Title",
        "Name/Title,Name/ID",
        "Attachments",
        "AttachmentFiles",
        "Date",
        "Designation"
      )
      .expand("Name", "AttachmentFiles")
      .orderBy("OrderNo")
      .get()
      .then((response) => {
        this.setState({
          Conflict: response,
        });
        //(response);
      });
  }
  public GetConflistlistItems() {
    const urlWeb = Web(
      "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM"
    );
    urlWeb.lists
      .getByTitle("COI Master")
      .items.orderBy("Order", true)
      .filter(`IsActive eq 1`)
      .get()
      .then((result) => {
        this.setState({
          Interest: result,
          rawHtmlNDA: result[0].Desc,
        });
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
  public async getPersonalInfodata(ONBSessionID) {

    await newweb.lists.getByTitle("Employee Joining Report Transaction").items.select("Name", "Designation", "ONBSessionID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get().then((result) => {
        if (result.length != 0) {
          $(".employee_input").val(result[0].Name);
          $(".empcoinamed").val(result[0].Name);
          $(".empcoiemployeeprintname").val(result[0].Name);
          $("#EmployeeDesignation").val(result[0].Designation)
        }
      })
  }


  public async GetConflictofinterestlistdata(ONBSessionID, FormMode) {


    await newweb.lists
      .getByTitle("COI Transaction")
      .items.select(
        "ID",
        "Date",
        "EmployeeName",
        "EmployeeDesignation",
        "Hospital",
        "WitnessName",
        "WitnessDate",
        "ContractTransactionHistory",
        "Contract",
        "Answereone",
        "Answeretwo",
        "Answerethree",
        "ONBSessionID",
        "Author/Title",
        "Questiononecheckbox",
        "Questiontwocheckbox",
        "Questionthreecheckbox"

      )
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then((response) => {
        if (response.length != 0) {

          ///display:button for othe tab



          $(".coi_tickimg").show();
          $(".checkbox_disable").prop('disabled', true);
          $(".empcoinamed").val(response[0].EmployeeName);
          $("#Dynamicempnamecoi").prop('disabled', true)
          if (response[0].Questiononecheckbox == "Yes") {
            $(".coi_question_first_yes").prop("checked", true);
            $("#answere-one").val(response[0].Answereone);
            $("#answere-first").show();
          } else {
            $(".coi_question_first_no").prop("checked", true);
          }
          if (response[0].Questiontwocheckbox == "Yes") {
            $(".coi_question_second_yes").prop("checked", true);
            $("#answere-two").val(response[0].Answeretwo)
            $("#answere-second").show();
          } else {
            $(".coi_question_second_no").prop("checked", true);
          }
          if (response[0].Questionthreecheckbox == "Yes") {
            $(".coi_question_three_yes").prop("checked", true);
            $("#answere-three").val(response[0].Answerethree);
            $("#answerethree").show();
          } else {
            $(".coi_question_three_no").prop("checked", true);
          }

          $(".empcoinamed").prop('disabled', true);
          $(".employee_input").prop('disabled', true);
          $(".coi-hospital").prop('disabled', true);
          $(".coiviewmodecommon").prop("disabled", true);

          // $(".coititle").attr("style", "color:#00A36C");
          $(".empcoinamed").prop('disabled', true);
          $(".coiimg").show();
          $(".coi2-submit").hide();
          $("#userupdatecoibtn").hide()
          $(".coi-dates").val(
            moment(response[0].Date).format("YYYY-MM-DD")
          );
          $(".coi-deg").val(response[0].EmployeeDesignation);
          $(".coi-hospital").val(response[0].Hospital);

          $("#DynamicWitnessName").val(response[0].WitnessName);
          $("#DynamicWitnessName").show()
          $("#WitnessName").hide()
          setTimeout(() => {
            $("#Hereby").val(response[0].EmployeeName);
            $(".empcoiemployeeprintname").val(response[0].EmployeeName);
            $(".empcoiemployeewitnessname").val(response[0].WitnessName);
            $("#DynamicWitnessName").val(response[0].WitnessName);

            $(".empcoiemployeeprintname").prop('disabled', true);
            $(".empcoiemployeewitnessname").prop('disabled', true);
          }, 1500);


          $(".coi-Witnessdate").val(
            moment(response[0].WitnessDate).format("YYYY-MM-DD")
          );
          //  $(".coi-yesno").val(response[0].ContractTransactionHistory);
          $(".coi-Contract").val(response[0].Contract);
          // $(".coi-PrintName1").val(response[0].PrintName1);
          // $(".coi-PrintName2").val(response[0].PrintName2);
          // $(".coi-printDate1").val(
          //   moment(response[0].PrintDate1).format("YYYY-MM-DD")
          // );
          // $(".coi-printDate2").val(
          //   moment(response[0].PrintDate2).format("YYYY-MM-DD")
          // );
        }
      });
    // }
  }



  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-coi').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    location.reload();
    document.body.innerHTML = originalContents;

  }

  public Questionansshowing() {

    if ($("#coi-question-first-yes").prop('checked', false)) {
      $("#answere-first").hide();
    }

    if ($("#coi-question-second-yes").prop('checked', false)) {
      $("#answere-second").hide();
    }


    if ($("#coi-question-three-yes").prop('checked', false)) {
      $("#answerethree").hide();
    }

    $("#coi-question-first-yes").on("change", function (event) {
      if ($(this).is(':checked')) {
        $(".coi_question_first_no").prop("checked", false);
        $("#answere-first").show();
      } else {
        $("#answere-first").hide();
      }

    });

    $("#coi-question-first-no").on("change", function (event) {

      $(".coi_question_first_yes").prop("checked", false);
      $("#answere-first").hide();
    });
    //
    $("#coi-question-second-yes").on("change", function (event) {
      if ($(this).is(':checked')) {
        $(".coi_question_second_no").prop("checked", false);
        $("#answere-second").show();
      } else {
        $("#answere-second").hide();
      }
    });

    $("#coi-question-second-no").on("change", function (event) {
      $(".coi_question_second_yes").prop("checked", false);
      $("#answere-second").hide();
    });


    $("#coi-question-three-yes").on("change", function (event) {
      if ($(this).is(":checked")) {
        $(".coi_question_three_no").prop("checked", false);
        $("#answerethree").show();
      } else {
        $("#answerethree").hide();
      }
    });

    $("#coi-question-three-no").on("change", function (event) {
      $(".coi_question_three_yes").prop("checked", false);
      $("#answerethree").hide();
    });

  }

  public render(): React.ReactElement<IcoiProps> {
    var handler = this;
    const Acknowledgment: JSX.Element[] = this.state.Conflict.map(function (
      item,
      key
    ) {
      var file = item.AttachmentFiles[0].ServerRelativeUrl;
      // //(item);
      return (
        <tr>
          <td>{item.Title}</td>
          <td>{item.Name.Title}</td>
          <td>{item.Designation}</td>
          <td>
            <img src={`${file}`}></img>
          </td>
          <td>{moment(item.Date).format("MM/DD/YYYY")}</td>
        </tr>
      );
    });
    // const Interest: JSX.Element[] = this.state.Interest.map(function (
    //   item,
    //   key
    // ) {
    //   var rawhtml = item.Desc;
    //   var dynamicName = rawhtml.replaceAll("UnitName", officename);
    //   return (
    //     <p className="conflictofinterest" id="dynamicinterest">
    //       <Markup content={dynamicName} />
    //     </p>
    //   );
    // });
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
            <span>Conflict of interest</span>
          </div>
          <div style={{ display: "none" }} className="emp-conflictofinterest">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Signature</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{Acknowledgment}</tbody>
            </table>
          </div>
          <div className="dashboard_right_ffamily">
            <div className="dashboard_right_text">
              {/* <div className="emp-interest" id="alldesc">
            {Interest}
          </div>
          <div style={{ display: "none" }} className="emp-interest dynamicdescitemid" id="coidescitem">
            {Interest}
          </div> */}
              <div className="dashboard_right_text conflict_interest_top">
                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 1. </p>
                      <p className="ci_text"> Introduction</p> */}
                      <h3>1. Introduction</h3>
                    </li>
                  </ul>
                  <p className="ci_para_padd"> A conflict of interest is a situation in which a
                    person or organization is involved in multiple interests, financial or
                    otherwise, one of which could possibly corrupt the motivation or
                    decision-making of that individual or
                    organization. </p>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 2. </p>
                      <p className="ci_text"> Policy statement </p> */}
                      <h3>2. Policy Statement</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 2.1 </p>
                      <p className="ci_text"> <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> is committed to conducting
                        business in a manner that ensures employees, business
                        judgement and decision making is not influenced by undue
                        personal interests. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 2.2 </p>
                      <p className="ci_text"> <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> requires all employees to: </p>
                    </li>
                    <ul className="ci_para_padding">
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.1. </p>
                        <p className="ci_text"> Avoid conflicts of interest where possible;
                        </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.2. </p>
                        <p className="ci_text"> Identify and disclose any conflicts of
                          interest </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.3. </p>
                        <p className="ci_text"> Carefully manage any conflicts of interest
                          and </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.4. </p>
                        <p className="ci_text"> Follow this policy and respond to any
                          breaches. </p>
                      </li>
                    </ul>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 3. </p>
                      <p className="ci_text">Purpose </p> */}
                      <h3>3. Purpose</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 3.1 </p>
                      <p className="ci_text"> The purpose of this policy is to facilitate the
                        effective identification, disclose and management of any
                        actual, potential or perceived conflicts of interest, in order
                        to protect the integrity of  <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> and
                        in so doing, ameliorate Company risk. </p>
                    </li>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 4. </p>
                      <p className="ci_text"> scope </p> */}
                      <h3>4. Scope</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 4.1 </p>
                      <p className="ci_text"> This policy is applicable to all employees of <span id="unitnamecoi">{officename}</span> <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> and significant others as must be defined
                        within the policy. </p>
                    </li>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 5. </p>
                      <p className="ci_text"> Definitions  </p> */}
                      <h3>5. Definitions</h3>
                    </li>
                  </ul>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> Terms </th>
                        <th> Definitions </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> Conflict of
                          Interest </td>
                        <td> “A conflict of interest is a set of circumstances that creates a risk that professional
                          judgement or actions regarding a primary interest will be unduly influenced by a secondary
                          interest.:[1] Primary interest refers to the principal goals of the profession or activity, such
                          as the protection of clients, the health of patients, the integrity of research, and the duties of
                          public officer. Secondary interest includes personal benefit and is not limited to only
                          financial gain but also such motives as the desire for professional advancement, or the
                          wish to do favors for family and friends. These secondary interests are not treated as
                          wrong in and of themselves, but become objectionable when they are believed to have
                          greater weight than the primary interests. Conflict of interest rules in the public sphere
                          mainly focus on financial relationships since they are relatively more objective, fungible,
                          and quantifiable, and usually involved the political, legal, and medical fields.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 6. </p>
                      <p className="ci_text"> Acroyms used  </p> */}
                      <h3>6. Acronyms Used </h3>
                    </li>
                  </ul>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colSpan={4}> ACRONYMS USED </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> HOD </td>
                        <td> Head of Department  </td>
                        <td> HRD </td>
                        <td> Human Resource Department </td>
                      </tr>
                      <tr>
                        <td> FTE </td>
                        <td> Full Time Employee </td>
                        <td> UAE </td>
                        <td> United Arab Emirates </td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 7. </p>
                      <p className="ci_text"> Responsibilities  </p> */}
                      <h3>7. Responsibilities</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 7.1 </p>
                      <p className="ci_text"> All employees </p>
                    </li>
                  </ul>
                </div>



                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 8. </p>
                      <p className="ci_text"> Procedure </p> */}
                      <h3>8. Procedure</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.1 </h4>
                      {/* <p className="ci_text ci_bold"> Disclosure of Potential Conflicts </p> */}
                      <h4>Disclosure of Potential Conflicts</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.1. </p>
                      <p className="ci_text"> Employees must promptly disclose to the Company material information regarding any
                        relationship, ownership or business interest (other than non-controlling investments in publiclytraded corporations), whether direct or indirect, that the employee or a member of his/her
                        immediate family has with any person, or in any business or enterprise, that (1) competes with
                        the Company; or (2) purchases or sells, or seeks to purchase or sell, goods or services to or
                        from the Company.</p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.2. </p>
                      <p className="ci_text"> Upon appointment each employee will make a full, written disclosure of interests, such as
                        relationships, and posts held, that could potentially result in a conflict of interest. This written
                        disclosure will be kept on file and will be updated as appropriate. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.3. </p>
                      <p className="ci_text"> Any employee who believes that they may have a conflict of interest at a later date must consult
                        their Manager/HOD and complete a declaration of conflict / interest form. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.4. </p>
                      <p className="ci_text"> In the course of meetings or activities, committee members will disclose any interests in a
                        transaction or decision where there may be a conflict between the Company’s best interests
                        and the committee member’s best interests. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.2 </h4>
                      {/* <p className="ci_text ci_bold"> Harm To Business Or Reputation
                      </p> */}
                      <h4>Harm To Business Or Reputation</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.1. </p>
                      <p className="ci_text"> No employee should make use of or exploit the Company, their connection with the Company
                        or information obtained in the course of their duties to further their private interest. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.2. </p>
                      <p className="ci_text"> No employee should act in a manner that may bring the Company into disrepute or effect the
                        refutation of the business. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.3. </p>
                      <p className="ci_text"> Employers / Manager, HODs have a duty to take reasonable steps to prevent conflict of
                        interests within the workplace (i.e. re-deployment of related staff) </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.4. </p>
                      <p className="ci_text"> No employee should allow their outside activities to interfere with their work. They should not
                        allow any conflicts between their duties and their private interest to affect their ability to carry
                        out their duties effectively. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.3 </h4>
                      {/* <p className="ci_text ci_bold"> Gifts Or ‘Kickbacks’
                      </p> */}
                      <h4>Gifts Or ‘Kickbacks</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.1. </p>
                      <p className="ci_text"> Employees are not permitted to accept gifts, vouchers, service offers, or promise of payment /
                        commission by suppliers, vendors and others in the course of their employment with <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.2. </p>
                      <p className="ci_text"> . The only exceptions of gifts that may be received are baskets of edible items or flowers sent to
                        a group of individuals or a department as appreciation for their level of service and care.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.3. </p>
                      <p className="ci_text"> Should, under exceptional circumstance an employee be entrusted to accept a gift, the gift
                        must be declared to the Manager / HOD and the ‘Gifts Declaration Form’ should be completed
                        and forwarded to HRD. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.4. </p>
                      <p className="ci_text"> Employees are strictly forbidden to request any gift or financial aid for himself or others from the
                        clients and visitors of the Company and its facilities. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.4 </h4>
                      {/* <p className="ci_text ci_bold"> Company Funds And property
                      </p> */}
                      <h4>Company Funds And property</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.1. </p>
                      <p className="ci_text"> Employees must be conscientious and scrupulous in their handling of funds and property
                        belonging to the Company, and must always avoid any form of financial impropriety.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.2. </p>
                      <p className="ci_text"> Employees must not use, or permit the use of Company property or resources for anything
                        other than approved Company business or activities. Examples of unauthorized use would
                        include using Company computers or photocopies for personal purposes. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.3. </p>
                      <p className="ci_text"> Confidential Information </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.4. </p>
                      <p className="ci_text"> Confidential information (printed, electronic or otherwise) relating to the Company’s past,
                        present, future and contemplated assets, operations, products or services, industrial designs,
                        inventions, production methods, marketing strategies and objectives, personnel, facilities,
                        equipment, finances, pricing, interest rates, sales, customers, routines, policies, and business
                        procedures must never be disclosed to anyone outside the Company’s organization, without the
                        Company’s express written authorization. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.5 </h4>
                      {/* <p className="ci_text ci_bold"> Outside Employment Or Business Activity
                      </p> */}
                      <h4>Outside Employment Or Business Activity</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.5.1. </p>
                      <p className="ci_text"> Any Employee of the Company shall not engage in any other business, trade or occupation
                        directly or indirectly, during or after work hours, with or without compensation.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.5.2. </p>
                      <p className="ci_text"> If an employee wishes to engage in employment or business activity outside his/her
                        employment with the Company, the employee must first disclose to the Company the nature
                        and extent of the proposed employment or business activity, and obtain the Company’s written
                        approval (Board approval required)
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.6 </h4>
                      {/* <p className="ci_text ci_bold"> Protective Steps</p> */}
                      <h4>Protective Steps</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1. </p>
                      <p className="ci_text"> Upon disclosure of the information described above, the Company will take appropriate steps to
                        protect against any actual or potential conflict of interest. Such steps may include:
                      </p>
                    </li>
                  </ul>
                  <ul className="ci_parag_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.1. </p>
                      <p className="ci_text"> Requiring the employee to refrain from being involved in any decisions made by the
                        Company regarding its dealings with such person, business or enterprise; or </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.2. </p>
                      <p className="ci_text"> Requiring the employee to refrain from being involved in any dealings on behalf of
                        the Company with such person, business or enterprise; or </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.3. </p>
                      <p className="ci_text"> Requiring the employee to dispose of his/her interest in such business or enterprise if
                        he/she wishes to remain in the Company’s employ.</p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.7 </h4>
                      {/* <p className="ci_text ci_bold"> Policy Non Compliance </p> */}
                      <h4>Policy Non Compliance</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.7.1. </p>
                      <p className="ci_text">  Failure to comply with the foregoing shall warrant disciplinary action up to and including
                        termination of employment. </p>
                    </li>
                  </ul>



                  <div className="employee_acknow">
                    <h4 className="procedure_padding">Employee Acknowledgment</h4>
                    <div className="procedure_padding">
                      <p className="paragraph_input">
                        By signing this policy, Conflict of interest, I
                        <span className="top-news-sections">
                          <input
                            className="form-control employee_input coiviewmodecommon common_fullname_disable"
                            autoComplete="off"
                            type="text"
                            id="Hereby"

                          />
                        </span>
                      </p>
                      <p className="employee_para">, hereby acknowledge understanding of the policy and acceptance
                        of the policy guidelines and constraints.</p>
                    </div>
                  </div>
                  <span
                    className="error-validation"
                    id="err-hereby"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                  <div className="employee_form top-news-sections form doc_coi">
                    <div className="row form">
                      <div className="col-md-4">
                        <div className="coiempname form-group relative">
                          <input
                            type="text"
                            className="form-control empcoinamed coiviewmodecommon common_fullname_disable"

                            autoComplete="off"
                            id="EmployeeName"
                          />
                          <br />
                          <span className="floating-label ">Employee Name <i className="required">*</i></span>
                        </div>

                        <span
                          className="error-validation"
                          id="err-employeename"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group relative">
                          <input
                            type="text"
                            className="form-control coi-deg coiviewmodecommon"
                            autoComplete="off"
                            id="EmployeeDesignation"
                          />
                          <br />
                          <span className="floating-label">
                            Employee Designation <i className="required">*</i>
                          </span>
                        </div>
                        <span
                          className="error-validation"
                          id="errdesignation"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                      <div className="col-md-4">
                        <div id="coihospital" className="form-group relative">
                          <input
                            type="text"
                            className="form-control coi-hospital coiviewmodecommon"
                            autoComplete="off"
                            id="Hospital"

                          />
                          <br />
                          <span className="floating-label">Name of Unit <i className="required">*</i></span>
                        </div>

                        <span
                          className="error-validation"
                          id="err-hospital"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                    </div>

                    <div className="row form">
                      <div className="col-md-4 signature_part"><p>Signature</p></div>

                      <div className="col-md-4 signature_part"><p>Date</p></div>

                    </div>
                    <div className="row form">

                      <div className="col-md-4">
                        <div className="form-group relative">
                          <input
                            type="text"
                            className="form-control coi-Witness coiewitnessname coiviewmodecommon"
                            autoComplete="off"
                            id="WitnessName"
                          />

                          <input style={{ display: "none" }}
                            type="text"
                            className="form-control coi-Witness coiewitnessname coiviewmodecommon"
                            autoComplete="off"
                            id="DynamicWitnessName"
                          />
                          <br />
                          <span className="floating-label"> Witness Name <i className="required">*</i> </span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-witnessname"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                      <div className="col-md-4 signature_part"><p>Signature</p></div>
                      <div className="col-md-4 signature_part"><p>Date</p></div>

                    </div>


                  </div>

                </div>

              </div>

            </div>



            <div className="padding-botm employee_acknow personal_info_part">

              <h3 className="procedure_padding decleration_h5"> Declaration Of Interest </h3>
              <div className="procedure_padding coi_pls_ans_question">
                Please answer all questions. If the answer is “yes,” please
                explain. An affirmative response does not imply that the
                relationship is improper or that it should be terminated.
              </div>
              <div className="procedure_padding font_para_bold">
                During the past twelve months, have you or (1) any related party
                had any interest, direct or indirect, in any contract or
                transaction with <span id="unitnamecoi">{officename}</span>
                <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>?
                <i className="required"> * </i>
              </div>
              {/* <div className="row form">
              <div className="col-md-4 top-news-sections">
                <div className="form-group relative declaration_select">
                  <select id="ContractTransactionHistory" className="Status form-control coi-yesno coiviewmodecommon" >
                     <option value="Select">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                
                </div>
                <span
                  className="errorvalid"
                  id="err-contracttransactionhistory"
                  style={{ position:"relative", color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span>
              </div>
            </div> */}
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_first_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-first-yes"
                        name="yes"
                        value="Yes"
                      />
                      <span className="form-check-label">Yes</span>
                    </div>
                  </div>
                  <span style={{ color: "red", display: "none" }} className="err-que-one">Select any one of the checkboxes above</span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_first_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-first-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">No</span>
                    </div>
                  </div>

                </div>
              </div>
              <div id="answere-first" style={{ display: "none" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <textarea
                      name="ansone"
                      id="answere-one"
                      className="form-control checkbox_disable"
                      cols={40}
                      style={{ resize: "none" }}
                      placeholder="Enter text here"
                    ></textarea>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-first"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <div className="procedure_padding">
                <p className="font_para_bold"> Do you or any related party have any interest, direct or
                  indirect, in any pending or proposed contract or transaction
                  with <span id="unitnamecoi">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>?
                  <i className="required"> * </i></p>

              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_second_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-second-yes"
                        name="yes"
                        value="Yes"
                      />
                      <span className="form-check-label">Yes</span>
                    </div>
                  </div>
                  <span style={{ color: "red", display: "none" }} className="err-que-two">Select any one of the checkboxes above</span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_second_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-second-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">No</span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="answere-second" style={{ display: "none" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <textarea
                      name="anstwo"
                      id="answere-two"
                      className="form-control checkbox_disable"
                      cols={40}
                      style={{ resize: "none" }}
                      placeholder="Enter text here"
                    ></textarea>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-two"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <div className="procedure_padding font_para_bold">
                Do you or any related party have any other interest, which might
                conflict, or might be perceived to conflict, with your duty or
                loyalty to the interests of <span id="unitnamecoi">{officename}</span>
                <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>?
                <i className="required"> * </i>
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_three_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-three-yes"
                        name="yes"
                        value="Yes"
                      />
                      <span className="form-check-label">Yes</span>
                    </div>
                  </div>
                  <span style={{ color: "red", display: "none" }} className="err-que-three">Select any one of the checkboxes above</span>
                </div>

                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="coi_question_three_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-three-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">No</span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="answerethree" style={{ display: "none" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <textarea
                      name="ansthree"
                      id="answere-three"
                      className="form-control checkbox_disable"
                      cols={40}
                      style={{ resize: "none" }}
                      placeholder="Enter text here"
                    ></textarea>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-third"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <div className="procedure_padding mt-10">
                The answers to the foregoing are accurate to the best of my
                knowledge, and I will promptly notify the Human Resources
                Department of any change, which would make any of the answers no
                longer accurate.
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
              <div >
                <p>
                  [1] For this purpose, a “related party” is defined as members of immediate family, which includes spouse,
                  children, siblings, and parents; estates, rusts, partnerships, limited liability companies, corporations and other
                  entities in which the employee or any member of the employees immediate family has a present or vested future
                  beneficial interest or serves as an officer, director, or trustee, other than entities in which the employees and
                  immediate family members in the aggregate own less than five percent in value of all traded securities.
                </p>
              </div>

            </div>

            <div className="reference_part personal_info_part">
              <h3 className="procedure_padding">

                9. References/Cross References:
              </h3>
              <div className="padding_pro">
                9.1.
                <a className="refer_a" href="https://en.wikipedia.org/wiki/Conflict">
                  Conflict of Interest
                </a>

              </div>
            </div >

            <div className="employee_acknow reference_part personal_info_part">
              <h3 className="procedure_padding">
                {" "}
                10. Relevent Document & Records{" "}
              </h3>
              <div className="padding_pro"> 10.1. None </div>
            </div >

            <div className="padding-botm reference_part personal_info_part">
              <h3 className="procedure_padding"> 11. Appendices </h3>
              <div className="padding_pro">
                {" "}
                <p> 11.1. Conflict Of Interest Agreement Employee Acknowledgement{" "}</p>
              </div>

              <div className="background_tr APPENDICES">
                <h4> Conflict Of Interest Agreement Employee Acknowledgement</h4>
              </div>

              <div className="procedure_padding">
                <p>Acknowledgement of standards to be observed by all employees of  <span id="unitnamecoi" className="space-unitname">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> concerning conflict of interest.
                </p>
              </div>
              <div className="procedure_padding">
                <p> Two (2) signed copies of this agreement are required: one (1) to
                  be kept in the employee’s Personnel File, and the other to be
                  held by the employee.</p>
              </div>
              <div className="procedure_padding">
                <p>   Employees will disclose to his/her immediate supervisor, any
                  interest that might be construed as being in real, potential or
                  apparent conflict with their duties at <span id="unitnamecoi">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> or with
                  the business and affairs of the Company. <i className="required"> * </i></p>
              </div>
              <div className="procedure_padding top-news-sections input_width">
                <input
                  className="form-control coi-Contract coiviewmodecommon"
                  autoComplete="off"
                  type="text"
                  id="Contract"
                  placeholder="Enter text here"
                />
                <span
                  className="errorvalidation"
                  id="err-contract"
                  style={{ position: "relative", color: "red", display: "none" }}
                >
                  This field is mandatory.
                </span>
              </div>

              <div className="procedure_padding">

                <p> I, the undersigned, hereby confirm that I have read and
                  understood the information defined in the Conflict of Interest
                  Policy and I agree to conduct my activities in
                  accord with the contents.</p>
              </div>
              <div className="procedure_padding">
                <p>  I also understand that breaching the standards of the policy may
                  result in disciplinary action up to and including termination
                  and/or other legal recourse.</p>
              </div>

              <div className="employee_form employee_witness_form top-news-sections form">

                <div className="row form row_top">

                  <div className="col-md-6">
                    <div className="coiemployeeprintname form-group relative ">
                      <input
                        type="text"
                        id="coiemployeeprintname"

                        name="coiemployeeprintname"
                        className="form-control empcoiemployeeprintname"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        Employee Name <i className="required">*</i>
                      </span>
                    </div>

                    <span
                      className="error-validation"
                      id="err-employeeprintname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                  <div className="col-md-6">
                    <div className="coiemployeewitnessname form-group relative dynamic-withness-name">
                      <input
                        type="text"
                        id="WitnessName2"
                        name="name"
                        className="form-control empcoiemployeewitnessname"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        Witness Name  <i className="required">*</i>
                      </span>
                    </div>
                    <div style={{ display: "none" }} className=" form-group relative list-withness-name">
                      <input
                        type="text"
                        id="dynamic-witness-name-second"
                        name="name"
                        className="form-control"
                        autoComplete="off"
                      />
                      <span className="floating-label">
                        Witness Name  <i className="required">*</i>
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeewitnessname"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>

                </div>
                <div className="row form">
                  <div className="col-md-6 signature_part">
                    <p> Signature </p>
                  </div>

                  <div className="col-md-6 signature_part">

                    <p> Signature </p>


                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-6 signature_part">
                    <p>Date</p>
                  </div>
                  <div className="col-md-6 signature_part">
                    <p>Date</p>
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
                <button
                  className="dashboard_submit_btn  coi2-submit"
                  type="submit"
                  onClick={() => this.Saveitems()}>
                  Submit
                </button>
                :
                <button style={{ cursor: "no-drop" }}
                  className="dashboard_submit_btn  coi2-submit"
                  type="submit">
                  Submit
                </button>
              }

              <button id="Coibtmitemid" style={{ display: "none" }}
                className="dashboard_submit_btn"
                type="submit"
                onClick={() => this.UpdateListItemcoi()}>
                Update
              </button>

              <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btncoi" type="submit" onClick={() => this.Printthis()}>Print</button>
              {GlobalFormOpenedMode == "New" &&
                <button id="coi-btn-employe-newpage" className="dashboard_submit_btn btn-cancel" type="reset">
                  <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                    Cancel
                  </a>
                </button>
              }
              {GlobalModes == "Edit" &&
                <button id="coi-btn-hr-editviewpagepersonal" className="dashboard_submit_btn btn-cancel" type="reset">
                  <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                    Cancel
                  </a>
                </button>

              }
            </div>

          </div>

        </div>

        <div id="dashboard_right-print-coi" style={{ display: "none" }}>
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
              <span>Conflict of interest</span>
              <ul>
                <li>Control Number: <b id="print-coi-Control-Number"></b></li>
                <li>Version: <b id="print-coi-Version-Number"></b></li>
              </ul>

            </div>
          </div>

          <div className="dashboard_right_ffamily">
            <div className="dashboard_right_text">

              <div className="dashboard_right_text conflict_interest_top">

                {/* <div className="personal_info_part">
        
        <div className="row form row_top">
               <div className="col-md-8">
                 <div className="form-group relative">
                 <span  id="print-coi-Control-Number"  className="print-control">
              
              </span>
                   <span className="floating-label ">
                   Control Number
                   </span>
                 </div>
               </div>
               <div className="col-md-4">
                 <div className="form-group relative">
                   <span  id="print-coi-Version-Number"  className="print-control">
              
                 </span>
                   <span className="floating-label">
                    Version Number
                   </span>
                 </div>
               </div>
             </div>
         </div> */}
                <div className="personal_info_part" >
                  <ul>
                    <li className="conflict_interest_li_heading" style={{ paddingTop: "17px" }}>
                      {/* <p className="ci_number"> 1. </p>
              <p className="ci_text"> Introduction</p> */}
                      <h3>1. Introduction</h3>
                    </li>
                  </ul>
                  <p className="ci_para_padd"> A conflict of interest is a situation in which a
                    person or organization is involved in multiple interests, financial or
                    otherwise, one of which could possibly corrupt the motivation or
                    decision-making of that individual or
                    organization. </p>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 2. </p>
              <p className="ci_text"> Policy statement </p> */}
                      <h3>2. Policy Statement</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 2.1 </p>
                      <p className="ci_text"> <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> is committed to conducting
                        business in a manner that ensures employees, business
                        judgement and decision making is not influenced by undue
                        personal interests. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 2.2 </p>
                      <p className="ci_text"> <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> requires all employees to: </p>
                    </li>
                    <ul className="ci_para_padding">
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.1. </p>
                        <p className="ci_text"> Avoid conflicts of interest where possible
                        </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.2. </p>
                        <p className="ci_text"> Identify and disclose any conflicts of
                          interest </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.3. </p>
                        <p className="ci_text"> Carefully manage any conflicts of interest
                          and </p>
                      </li>
                      <li className="ci_para_padd">
                        <p className="ci_number"> 2.2.4. </p>
                        <p className="ci_text"> Follow this policy and respond to any
                          breaches </p>
                      </li>
                    </ul>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 3. </p>
              <p className="ci_text">Purpose </p> */}
                      <h3>3. Purpose</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 3.1 </p>
                      <p className="ci_text"> The purpose of this policy is to facilitate the
                        effective identification, disclose and management of any
                        actual, potential or perceived conflicts of interest, in order
                        to protect the integrity of  <span id="unitnamecoi">{officename}</span>
                        <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> and
                        in so doing, ameliorate Company risk. </p>
                    </li>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 4. </p>
              <p className="ci_text"> scope </p> */}
                      <h3>4. Scope</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 4.1 </p>
                      <p className="ci_text"> This policy is applicable to all employees of <span id="unitnamecoi">{officename}</span> <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> and significant others as must be defined
                        within the policy. </p>
                    </li>
                  </ul>
                </div>


                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 5. </p>
              <p className="ci_text"> Definitions  </p> */}
                      <h3>5. Definitions</h3>
                    </li>
                  </ul>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th> Terms </th>
                        <th> Definitions </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> Conflict of
                          Interest </td>
                        <td> “A conflict of interest is a set of circumstances that creates a risk that professional
                          judgement or actions regarding a primary interest will be unduly influenced by a secondary
                          interest.:[1] Primary interest refers to the principal goals of the profession or activity, such
                          as the protection of clients, the health of patients, the integrity of research, and the duties of
                          public officer. Secondary interest includes personal benefit and is not limited to only
                          financial gain but also such motives as the desire for professional advancement, or the
                          wish to do favors for family and friends. These secondary interests are not treated as
                          wrong in and of themselves, but become objectionable when they are believed to have
                          greater weight than the primary interests. Conflict of interest rules in the public sphere
                          mainly focus on financial relationships since they are relatively more objective, fungible,
                          and quantifiable, and usually involved the political, legal, and medical fields.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>
                <div className="personal_info_part" style={{ marginTop: "20px" }}>
                  <ul>
                    <li className="conflict_interest_li_heading" >
                      {/* <p className="ci_number"> 6. </p>
              <p className="ci_text"> Acroyms used  </p> */}
                      <h3>6. Acronyms Used </h3>
                    </li>
                  </ul>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th colSpan={4}> ACRONYMS USED </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> HOD </td>
                        <td> Head of Department  </td>
                        <td> HRD </td>
                        <td> Human Resource Department </td>
                      </tr>
                      <tr>
                        <td> FTE </td>
                        <td> Full Time Employee </td>
                        <td> UAE </td>
                        <td> United Arab Emirates </td>
                      </tr>
                    </tbody>
                  </table>
                </div>



                <div className="personal_info_part print_responsibilities">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 7. </p>
              <p className="ci_text"> Responsibilities  </p> */}
                      <h3>7. Responsibilities</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 7.1 </p>
                      <p className="ci_text"> All employees </p>
                    </li>
                  </ul>
                </div>



                <div className="personal_info_part">
                  <ul>
                    <li className="conflict_interest_li_heading">
                      {/* <p className="ci_number"> 8. </p>
              <p className="ci_text"> Procedure </p> */}
                      <h3>8. Procedure</h3>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.1 </h4>
                      {/* <p className="ci_text ci_bold"> Disclosure of Potential Conflicts </p> */}
                      <h4>Disclosure of Potential Conflicts</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.1. </p>
                      <p className="ci_text"> Employees must promptly disclose to the Company material information regarding any
                        relationship, ownership or business interest (other than non-controlling investments in publiclytraded corporations), whether direct or indirect, that the employee or a member of his/her
                        immediate family has with any person, or in any business or enterprise, that (1) competes with
                        the Company; or (2) purchases or sells, or seeks to purchase or sell, goods or services to or
                        from the Company.</p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.2. </p>
                      <p className="ci_text"> Upon appointment each employee will make a full, written disclosure of interests, such as
                        relationships, and posts held, that could potentially result in a conflict of interest. This written
                        disclosure will be kept on file and will be updated as appropriate. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.3. </p>
                      <p className="ci_text"> Any employee who believes that they may have a conflict of interest at a later date must consult
                        their Manager/HOD and complete a declaration of conflict / interest form. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.1.4. </p>
                      <p className="ci_text"> In the course of meetings or activities, committee members will disclose any interests in a
                        transaction or decision where there may be a conflict between the Company’s best interests
                        and the committee member’s best interests. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.2 </h4>
                      {/* <p className="ci_text ci_bold"> Harm To Business Or Reputation
              </p> */}
                      <h4>Harm To Business Or Reputation</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.1. </p>
                      <p className="ci_text"> No employee should make use of or exploit the Company, their connection with the Company
                        or information obtained in the course of their duties to further their private interest. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.2. </p>
                      <p className="ci_text"> No employee should act in a manner that may bring the Company into disrepute or effect the
                        refutation of the business. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.3. </p>
                      <p className="ci_text"> Employers / Manager, HODs have a duty to take reasonable steps to prevent conflict of
                        interests within the workplace (i.e. re-deployment of related staff) </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.2.4. </p>
                      <p className="ci_text"> No employee should allow their outside activities to interfere with their work. They should not
                        allow any conflicts between their duties and their private interest to affect their ability to carry
                        out their duties effectively. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.3 </h4>
                      {/* <p className="ci_text ci_bold"> Gifts Or ‘Kickbacks’
              </p> */}
                      <h4>Gifts Or ‘Kickbacks</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.1. </p>
                      <p className="ci_text"> Employees are not permitted to accept gifts, vouchers, service offers, or promise of payment /
                        commission by suppliers, vendors and others in the course of their employment with <span id="dynamicnamebusiness">{dynamicnamebusiness}</span>
                        . </p>
                    </li>
                    <li className="ci_para_padd print-procedure-coi">
                      <p className="ci_number print-proci"> 8.3.2. </p>
                      <p className="ci_text">  The only exceptions of gifts that may be received are baskets of edible items or flowers sent to
                        a group of individuals or a department as appreciation for their level of service and care.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.3. </p>
                      <p className="ci_text"> Should, under exceptional circumstance an employee be entrusted to accept a gift, the gift
                        must be declared to the Manager / HOD and the ‘Gifts Declaration Form’ should be completed
                        and forwarded to HRD. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.3.4. </p>
                      <p className="ci_text"> Employees are strictly forbidden to request any gift or financial aid for himself or others from the
                        clients and visitors of the Company and its facilities. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.4 </h4>
                      {/* <p className="ci_text ci_bold"> Company Funds And property
              </p> */}
                      <h4>Company Funds And property</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.1. </p>
                      <p className="ci_text"> Employees must be conscientious and scrupulous in their handling of funds and property
                        belonging to the Company, and must always avoid any form of financial impropriety.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.2. </p>
                      <p className="ci_text"> Employees must not use, or permit the use of Company property or resources for anything
                        other than approved Company business or activities. Examples of unauthorized use would
                        include using Company computers or photocopies for personal purposes. </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.3. </p>
                      <p className="ci_text"> Confidential Information </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.4.4. </p>
                      <p className="ci_text"> Confidential information (printed, electronic or otherwise) relating to the Company’s past,
                        present, future and contemplated assets, operations, products or services, industrial designs,
                        inventions, production methods, marketing strategies and objectives, personnel, facilities,
                        equipment, finances, pricing, interest rates, sales, customers, routines, policies, and business
                        procedures must never be disclosed to anyone outside the Company’s organization, without the
                        Company’s express written authorization. </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.5 </h4>
                      {/* <p className="ci_text ci_bold"> Outside Employment Or Business Activity
              </p> */}
                      <h4>Outside Employment Or Business Activity</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.5.1. </p>
                      <p className="ci_text"> Any Employee of the Company shall not engage in any other business, trade or occupation
                        directly or indirectly, during or after work hours, with or without compensation.
                      </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.5.2. </p>
                      <p className="ci_text"> If an employee wishes to engage in employment or business activity outside his/her
                        employment with the Company, the employee must first disclose to the Company the nature
                        and extent of the proposed employment or business activity, and obtain the Company’s written
                        approval (Board approval required)
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.6 </h4>
                      {/* <p className="ci_text ci_bold"> Protective Steps</p> */}
                      <h4>Protective Steps</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1. </p>
                      <p className="ci_text"> Upon disclosure of the information described above, the Company will take appropriate steps to
                        protect against any actual or potential conflict of interest. Such steps may include:
                      </p>
                    </li>
                  </ul>
                  <ul className="ci_parag_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.1. </p>
                      <p className="ci_text"> Requiring the employee to refrain from being involved in any decisions made by the
                        Company regarding its dealings with such person, business or enterprise; or </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.2. </p>
                      <p className="ci_text"> Requiring the employee to refrain from being involved in any dealings on behalf of
                        the Company with such person, business or enterprise; or </p>
                    </li>
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.6.1.3. </p>
                      <p className="ci_text"> Requiring the employee to dispose of his/her interest in such business or enterprise if
                        he/she wishes to remain in the Company’s employ.</p>
                    </li>
                  </ul>
                  <ul>
                    <li className="ci_para_padd">
                      <h4 className="ci_number"> 8.7 </h4>
                      {/* <p className="ci_text ci_bold"> Policy Non Compliance </p> */}
                      <h4>Policy Non Compliance</h4>
                    </li>
                  </ul>
                  <ul className="ci_para_padding">
                    <li className="ci_para_padd">
                      <p className="ci_number"> 8.7.1. </p>
                      <p className="ci_text">  Failure to comply with the foregoing shall warrant disciplinary action up to and including
                        termination of employment. </p>
                    </li>
                  </ul>



                  <div className="employee_acknow coi_part print-empack-coi">
                    <h4 className="procedure_padding" style={{ marginBottom: "30px" }} >Employee Acknowledgment</h4>
                    <div className="procedure_padding">
                      <p className="paragraph_input print_report_jr">
                        By signing this policy, Conflict of interest, I{" "}
                        {/* <span className="top-news-sections"> */}
                        <span
                          className="print-employee_input coiviewmodecommon common_fullname_disable"
                          //  autoComplete="off"
                          // type="text"
                          id="print-Hereby"

                        />
                        {" ,"}
                      </p>
                      <p className="employee_para"> hereby acknowledge understanding of the policy and acceptance
                        of the policy guidelines and constraints.</p>
                    </div>
                  </div>
                  <span
                    className="error-validation"
                    id="err-hereby"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                  <div className="employee_form top-news-sections form doc_coi">
                    <div className="row form print_empname_coi">
                      <div className="col-md-4">
                        <div className="print-coiempname form-group relative">
                          <input
                            type="text"
                            className="form-control empcoinamed coiviewmodecommon common_fullname_disable"

                            autoComplete="off"
                            id="EmployeeName"
                          />
                          <br />
                          <span className="floating-label ">Employee Name <i className="required">*</i></span>
                        </div>
                        <div style={{ display: "none" }} className="print-coiempnameedit form-group relative">
                          <span
                            //  type="text"
                            className="print-control empdit coivaluename coiviewmodecommon"
                            //autoComplete="off"
                            id="print-Dynamicempnamecoi"
                          />
                          <br />
                          <span className="floating-label ">Employee Name<i className="required">*</i></span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-employeename"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>


                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            // type="text"
                            className="print-control print-coi-deg coiviewmodecommon"
                            //autoComplete="off"
                            id="EmployeeDesignation"
                          />
                          <br />
                          <span className="floating-label">
                            Employee Designation <i className="required">*</i>
                          </span>
                        </div>
                        <span
                          className="error-validation"
                          id="errdesignation"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                      <div className="col-md-4">
                        <div id="print-coihospitalwith" className="form-group relative">
                          <span
                            //  type="text"
                            className="form-control coi-hospital coiviewmodecommon"
                            // autoComplete="off"
                            id="Hospital"

                          />
                          <br />
                          <span className="floating-label">Name of Unit <i className="required">*</i></span>
                        </div>
                        <div style={{ display: "none" }} id="print-coihospitalwithout" className="form-group relative">
                          <span
                            //   type="text"
                            className="print-control print-coihospital coiviewmodecommon"
                            // autoComplete="off"
                            id="Hospitals"
                          />
                          <br />
                          <span className="floating-label">Name of Unit <i className="required">*</i></span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-hospital"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>
                    </div>
                    <div className="row form print_signdate_coi">
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

                    <div className="row form print_witnessname_coi">



                      <div className="col-md-4">
                        <div className="form-group relative">
                          <span
                            //  type="text"
                            className="print-control print-coi-Witness coiviewmodecommon"
                            //autoComplete="off"
                            id="WitnessName"
                          />
                          <br />
                          <span className="floating-label"> Witness Name <i className="required">*</i> </span>
                        </div>
                        <span
                          className="error-validation"
                          id="err-witnessname"
                          style={{ color: "red", display: "none" }}
                        >
                          This field is mandatory.
                        </span>
                      </div>

                      {/* <div className="col-md-4">
        <div className="form-group relative">
          <input
            type="date"
            className="form-control coi-Witnessdate coiviewmodecommon"
            autoComplete="off"
            id="WitnessDate"
            disabled
          />
          <br />
          <span className="floating-label"> Date </span>
        </div>
        <span
          className="error-validation"
          id="err-witnessdate"
          style={{ color: "red", display: "none" }}
        >
          This field is mandatory.
        </span>
      </div> */}

                    </div>

                    <div className="row form print_signdate_coi">
                      <div className="signature-new-wrap">
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">Signature </span>
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

            </div>



            <div className="padding-botm employee_acknow personal_info_part page-break-policyack-decleration">

              <h3 className="procedure_padding decleration_h5 print_doi_coi"> Declaration Of Interest </h3>
              <div className="procedure_padding coi_pls_ans_question">
                Please answer all questions. If the answer is “yes,” please
                explain. An affirmative response does not imply that the
                relationship is improper or that it should be terminated.
              </div>
              <div className="procedure_padding print-coi-bold">
                During the past twelve months, have you or (1) any related party
                had any interest, direct or indirect, in any contract or
                transaction with <span id="print-unitnamecoi">{officename}</span>
                <span style={{ display: "none" }} id="print-dynamicnamebusiness">{dynamicnamebusiness}</span>?
              </div>
              {/* <div className="row form">
      <div className="col-md-4 top-news-sections">
        <div className="form-group relative declaration_select">
          <select id="ContractTransactionHistory" className="Status form-control coi-yesno coiviewmodecommon" >
             <option value="Select">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        
        </div>
        <span
          className="errorvalid"
          id="err-contracttransactionhistory"
          style={{ position:"relative", color: "red", display: "none" }}
        >
          This field is mandatory.
        </span>
      </div>
    </div> */}
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check print-mb-ten">
                      {/* <input
                        className="print-coi_question_first_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-first-yes"
                        name="yes"
                        value="Yes"
                      /> */}
                      {/* <span className="form-check-label">Yes</span> */}
                      <span className="print-coi_question_first_yes"></span>
                    </div>
                  </div>


                </div>

                {/* <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="print-coi_question_first_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-first-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">NO</span>
                    </div>
                  </div>

                </div> */}
              </div>
              <div id="print-answere-first" style={{ display: "none", marginBottom: "10px" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <span
                      // name="ansone"
                      id="print-answere-one"
                      className="checkbox_disable"
                    //  cols={40}
                    //  style={{ resize: "none" }}
                    //  placeholder="Enter text here"
                    ></span>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-first"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>

              <div className="procedure_padding">
                <p className="print-coi-bold"> Do you or any related party have any interest, direct or
                  indirect, in any pending or proposed contract or transaction
                  with <span id="unitnamecoi">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>?</p>

              </div>
              <div className="row form print_doi_question">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check print-mb-ten">
                      {/* <input
                        className="print-coi_question_second_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-second-yes"
                        name="yes"
                        value="Yes"
                      /> */}
                      <span className="print-coi_question_second_yes"></span>
                    </div>
                  </div>
                  {/* <span style={{ color: "red", display: "none" }} className="err-que-two">Select any one of the checkboxes above</span> */}
                </div>

                {/* <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="print-coi_question_second_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-second-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">NO</span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div id="print-answere-second" style={{ display: "none", marginBottom: "10px" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <span
                      //  name="anstwo"
                      id="print-answere-two"
                      className="checkbox_disable"
                    // cols={40}
                    // style={{ resize: "none" }}
                    //  placeholder="Enter text here"
                    ></span>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-two"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>



              <div className="procedure_padding print-coi-bold">
                Do you or any related party have any other interest, which might
                conflict, or might be perceived to conflict, with your duty or
                loyalty to the interests of <span id="unitnamecoi">{officename}</span>
                <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span>?
              </div>
              <div className="row form">
                <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check print-mb-ten">
                      {/* <input
                        className="print-coi_question_three_yes checkbox_disable"
                        type="checkbox"
                        id="coi-question-three-yes"
                        name="yes"
                        value="Yes"
                      /> */}
                      <span className="print-coi_question_three_yes"></span>
                    </div>
                  </div>

                </div>

                {/* <div className="col-md-4">
                  <div className="form-group relative">
                    <div className="form-check">
                      <input
                        className="print-coi_question_three_no checkbox_disable"
                        type="checkbox"
                        id="coi-question-three-no"
                        name="no"
                        value="No"
                      />
                      <span className="form-check-label">NO</span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div id="print-answerethree" style={{ display: "none", marginBottom: "10px" }} className="row form">
                <div className="col-md-12">
                  <div className="form-group relative">
                    <span
                      // name="ansthree"
                      id="print-answere-three"
                      className="checkbox_disable"
                    // cols={40}
                    // style={{ resize: "none" }}
                    //  placeholder="Enter text here"
                    ></span>

                  </div>
                  <span
                    className="error-validation"
                    id="err-questionans-third"
                    style={{ color: "red", display: "none" }}
                  >
                    This field is mandatory.
                  </span>
                </div>
              </div>


              <div className="procedure_padding">
                The answers to the foregoing are accurate to the best of my
                knowledge, and I will promptly notify the Human Resources
                Department of any change, which would make any of the answers no
                longer accurate.
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
              <div className="row form" style={{ marginTop: "15px" }}>
                <div className="signature-new-wrap">
                  <div className="employee-signature">
                    <div className="form-group relative">
                      <div className="form-check">
                        <span className="form-check-label"> Signature </span>
                      </div>
                    </div>
                  </div>
                  <div className="employee-signature">
                    <div className="form-group relative">
                      <div className="form-check">
                        <span className="form-check-label"> Date </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div className="print-declara-coi">
              <p className="print-cideclaration">
                [1] For this purpose, a “related party” is defined as members of immediate family, which includes spouse,
                children, siblings, and parents; estates, rusts, partnerships, limited liability companies, corporations and other
                entities in which the employee or any member of the employees immediate family has a present or vested future
                beneficial interest or serves as an officer, director, or trustee, other than entities in which the employees and
                immediate family members in the aggregate own less than five percent in value of all traded securities.
              </p>
            </div>

            <div className="reference_part personal_info_part">
              <h3 className="procedure_padding">

                9. References/Cross References:
              </h3>
              <div className="padding_pro">
                9.1.
                <a className="refer_a" href="https://en.wikipedia.org/wiki/Conflict">
                  Conflict of Interest
                </a>

              </div>
            </div >

            <div className="employee_acknow reference_part personal_info_part">
              <h3 className="procedure_padding">
                {" "}
                10. Relevent Document & Records {" "}
              </h3>
              <div className="padding_pro"> 10.1. None </div>
            </div >


            <div className="padding-botm reference_part personal_info_part print-bb">
              <h3 className="procedure_padding"> 11. Appendices </h3>
              <div className="padding_pro">
                {" "}
                <p> 11.1. Conflict Of Interest Agreement Employee Acknowledgement{" "}</p>
              </div>






              <div className="background_tr APPENDICES">
                <h4> Conflict Of Interest Agreement Employee Acknowledgement</h4>
              </div>


              <div className="procedure_padding">
                <p>     Acknowledgement of standards to be observed by all employees of
                  <span id="unitnamecoi">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> concerning conflict of interest.
                </p>
              </div>
              <div className="procedure_padding">
                <p> Two (2) signed copies of this agreement are required: one (1) to
                  be kept in the employee’s Personnel File, and the other to be
                  held by the employee.</p>
              </div>
              <div className="procedure_padding">
                <p>   Employees will disclose to his/her immediate supervisor, any
                  interest that might be construed as being in real, potential or
                  apparent conflict with their duties at <span id="unitnamecoi">{officename}</span>
                  <span style={{ display: "none" }} id="dynamicnamebusiness">{dynamicnamebusiness}</span> or with
                  the business and affairs of the Company.</p>
              </div>
              <div className="procedure_padding top-news-sections input_width print-mb-ten">
                <span
                  className="print-coi-Contract coiviewmodecommon"
                  //   autoComplete="off"
                  //  type="text"
                  id="Contract"
                // style={{
                //   paddingTop: "7px",
                //   height: "28px",
                //   marginBottom: "10px"
                // }}
                />

              </div>

              <div className="procedure_padding">
                <p> I, the undersigned, hereby confirm that I have read and
                  understood the information defined in the Conflict of Interest
                  Policy and I agree to conduct my activities in
                  accord with the contents.</p>
              </div>
              <div className="procedure_padding">
                <p>  I also understand that breaching the standards of the policy may
                  result in disciplinary action up to and including termination
                  and/or other legal recourse.</p>
              </div>

              <div className="employee_form employee_witness_form top-news-sections form">
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative Employee_title">
                      Employee
                    </div>
                  </div>
                  <div className="col-md-4 print-coi-wit">
                    <div className="form-group relative Employee_title">
                      Witness
                    </div>
                  </div>
                </div>
                <div className="row form">

                  <div className="col-md-4">
                    <div className="coiemployeeprintname form-group relative ">
                      <span
                        //  type="text"
                        id="coiemployeeprintname"
                        style={{ marginTop: "0px" }}
                        className="print-control print-empcoiemployeeprintname"
                      // autoComplete="off"
                      />
                      {/* <span className="floating-label">
                        Print Name <i className="required">*</i>
                      </span> */}
                    </div>


                  </div>

                  <div className="col-md-4 print-coi-wit">
                    <div className="coiemployeewitnessname form-group relative ">
                      <span
                        // type="text"
                        id="WitnessName"
                        style={{ marginTop: "0px" }}
                        //    name="coiemployeewitnessname"
                        className="print-control print-empcoiemployeewitnessname"
                      //      autoComplete="off"
                      />
                      {/* <span className="floating-label">
                        Print Name <i className="required">*</i>
                      </span> */}
                    </div>


                  </div>

                </div>
                {/* <div className="row form">
                  <div className="col-md-6 signature_part">
                    <p> Signature </p>
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
                          <span className="form-check-label">Signature </span>
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
                </div>



                <div className="row form">
                  <div className="signature-new-wrap">
                    <div className="employee-signature">
                      <div className="form-group relative">
                        <div className="form-check">
                          <span className="form-check-label">Date </span>
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
              <div className="page-break-policyack-decleration"></div>
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
      </>
    );
  }
}