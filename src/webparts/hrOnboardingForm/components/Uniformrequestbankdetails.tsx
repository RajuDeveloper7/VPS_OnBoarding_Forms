import * as React from "react";
// import styles from "./LoaNewForm.module.scss";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import swal from "sweetalert";
import { escape, times } from "@microsoft/sp-lodash-subset";
import { Log } from "@microsoft/sp-core-library";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";

// SPComponentLoader.loadCss(
//   `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
// );

// SPComponentLoader.loadCss(
//   "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.5"
// );

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
  UniformBankReqSubmissionStatus: string;
  ONBSessionID: string;
  BankStatement: string;
  isAttachmentAlreadyAdded: boolean;
  isPrevFormSubmitted: boolean;
  ControlNumber: any[],
  VersionNumber: any[],
  UniformFormControlNumber: any[]
  HrCompleteStatus: boolean;
}

var UniformId: number = null;
var TableId: number = null;
var UniformRequestItemId: number = null;
var UniformDescriptionItemId: number = null;
var printfilename;

const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Hrform"
);
var UniformVersionno;
var Uniformcontrolno;
var Bankversionno;
var BankControlno;
var Description;
var officename = "";
var bankstatement = "";
var LogoUrl;
let BankdetailsItemID;
var ImageSrcuniform = "";
var Mode;
var uniformmode;
var uniformitemidlist: number;
var uniformrequestlistitem: number;
var iduniformreq;
var idofuniformdesc;
var GlobalFormOpenedMode = "New";
var EditSessionid: string;
var GlobalSessionIDValue = "";

var Bnanklistid: number
var Uniformrequestlistid: number
var Uniformsizelistid: number
var AttachmentName = "";
var BankControlNumber;
var UniformControlNumber;
var BankVersionNumber;
var UniformVersionNumber;

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
      UniformBankReqSubmissionStatus: "Inprogress",
      ONBSessionID: "",
      BankStatement: "",
      isAttachmentAlreadyAdded: false,
      isPrevFormSubmitted: false,
      ControlNumber: [],
      VersionNumber: [],
      UniformFormControlNumber: [],
      HrCompleteStatus: false
    };

  }

  public componentDidMount() {
    this.Removevalidationuniformrequest()
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
    $(".common-name-dept-id-disable").prop('disabled', true)
    $(".currenttxtdate").val(moment().format("YYYY-MM-DD"));
    // $("#JoiningDateuniform-date").val(moment().format("YYYY-MM-DD"));

    const url: any = new URL(window.location.href);
    BankdetailsItemID = url.searchParams.get("BankdetailsItemID");
    Mode = url.searchParams.get("URBDMode");
    uniformmode = url.searchParams.get("URBDMode");

    GlobalFormOpenedMode = url.searchParams.get("mdeopn");

    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");

    if (GlobalFormOpenedMode == "View") {

      $("#list-date-bank").show()
      $(".print-btnuniform").show()
      $("#txt-dateuniform").hide()
      this.GetUniformItem(EditSessionid);
      this.GetUniformItemForPrint(EditSessionid);
      $(`#imguniform`).show();
      $(".IamgeBankdetailsItemID").show();
      $("#Dynamicimguniform").hide();
      $("#updateitemidsubmit").hide();
      $("#updateitemid").hide();
      $(".updateitemidbtn").hide();
      $("input").attr("disabled", "disabled");
      $("input").prop('disabled', true);
      $("#Bankunifromset").prop('disabled', true);
      $(".Uniformviewmode").prop('disabled', true);
      $("#QuantityofUniform").prop('disabled', true);
      $('#uniforn-update').hide();
    } else if (GlobalFormOpenedMode == "Edit") {
      //$("#list-date-bank").prop('disabled', true);
      $("#txt-dateuniform").hide();
      $("#list-date-bank").show();
      $("#list-date-bank").show()
      $(".updateitemidbtn").show();
      $("#txt-dateuniform").hide()
      $("#JoiningDateuniform-date").prop('disabled', true);
      $(".currenttxtdate").prop('disabled', false)
      $('#uniforn-update').show();
      $(`#imguniform`).show();
      $(".IamgeBankdetailsItemID").show();
      $("#Dynamicimguniform").hide();
      $("#updateitemidsubmit").hide();
      $("#updateitemid").show();

      this.GetUniformItem(BankdetailsItemID);

    }

    this.GetCurrentUserDetails();


  }

  public GetUniformItemForPrint(ID) {

    $("#print-name-of-request").show();
    $(".print-dyanmiclistname").show();
    $(".print-nameuser-dynamic").hide();
    $("#print-nameofreq").hide();
    $(`#print-imguniform`).show();
    // $(".print-withoutdyanmiclist").hide();
    //$(".print-dyanmiclist").show();
    // $("#print-userupdateuniformbtn").hide();
    // $(".print-uniformbanksuccessimg").show();
    // $(".print-uniformbanktitle").attr("style", "color:#00A36C");
    newweb.lists
      .getByTitle("EmployeeBankDetailsMaster")
      .items.filter("ONBSessionID eq '" + ID + "'")
      .get()
      .then((result) => {
        //(result);
        //  this.Getfolderitemviewmode(result[0].NameofEmployee)
        //   this.Getfolderiteditwmode(result[0].NameofEmployee)

        $("#print-txt-dateuniform").text(" ");
        $(".print-dyanmiclistname").text(result[0].NameofEmployee);
        $("#print-deptuniform").text(result[0].Department);
        $("#print-EmployeeIduniform").text(result[0].EmployeeId);
        $("#print-BankName").text(result[0].BankName);
        $("#print-Branch").text(result[0].Branch);
        $("#print-Addressuniforminputbank").text(result[0].Address);
        $("#print-AccountNumber").text(result[0].AccountNumber);
        $("#print-IBANNumber").text(result[0].IBANNumber);

        ImageSrcuniform = result[0].UnitLogo;
        iduniformreq = result[0].UniformRequestItemId;
        newweb.lists
          .getByTitle("UniformRequest")
          .items.select(
            "ID",
            "DateofRequest",
            "EmployeeNo",
            "NameofRequestor",
            "JoiningDate",
            "JobTitle",
            "Department",
            "Sex",
            "DateofLastUniformReceived",
            "QuantityofUniform",
            "UniformVersionNumber",
            "BankVersionNumber",
            "UniformControlNumber",
            "BankControlNumber",
          )
          .filter("ONBSessionID eq '" + ID + "'")
          .get()
          .then((result) => {


            $("#print-Uniform-Version-Number").text(result[0].UniformVersionNumber);
            $("#print-Uniform-Control-Number").text(result[0].UniformControlNumber);

            $("#print-Bank-Version-Number").text(result[0].BankVersionNumber);
            $("#print-Bank-Control-Number").text(result[0].BankControlNumber);
            $("#print-dateofrequestid").text(" ");
            $("#print-EmployeeNouniform").text(result[0].EmployeeNo);
            $("#print-Nameof-Requestor").text(result[0].NameofRequestor);
            // $("#print-JoiningDateuniform").text(
            //   moment(result[0].JoiningDate).format("DD-MM-YYYY")
            // );
            $("#print-JobTitleuniform").text(result[0].JobTitle);
            // $("#Department").val(result[0].Department);
            $("#print-Bankunifromset").text(result[0].Sex);

            $(`#print-DateofLastUniformReceived`).text(" ")
            // if (result[0].DateofLastUniformReceived == 'Invalid date' || result[0].DateofLastUniformReceived == '' || result[0].DateofLastUniformReceived == 'null' || result[0].DateofLastUniformReceived == null || result[0].DateofLastUniformReceived == undefined) {
            //  
            // } else {
            //   $(`#print-DateofLastUniformReceived`).text(moment(result[0].DateofLastUniformReceived).format("DD-MM-YYYY"))
            // }

            // $("#print-DateofLastUniformReceived").text(
            //   moment(result[0].DateofLastUniformReceived).format("DD-MM-YYYY")
            // );

            $("#print-QuantityofUniform").text(result[0].QuantityofUniform);
            $("#print-Departmentuniformrequest").text(result[0].Department)
            UniformRequestItemId = result[0].ID;
          });

        newweb.lists
          .getByTitle("UniformDescription")
          .items.select(
            "WaistcoatXS",
            "WaistcoatS",
            "WaistcoatM",
            "WaistcoatL",
            "WaistcoatXL",
            "CoatXS",
            "CoatS",
            "CoatL",
            "CoatM",
            "CoatXL",
            "JacketXS",
            "JacketS",
            "JacketM",
            "JacketL",
            "JacketXL",
            "TrouserXS",
            "TrouserS",
            "TrouserM",
            "TrouserL",
            "TrouserXL",
            "ID",
            "ShirtblouseXS",
            "ShirtblouseS",
            "shirtblouseM",
            "shirtblouseL",
            "ShirtblouseXL"
          )
          .filter("ONBSessionID eq '" + ID + "'")
          .get()
          .then((result) => {
            //(result);
            idofuniformdesc = result[0].ID;
            $(".print-Shirt_xs").text(result[0].ShirtblouseXS),
              $(".print-Shirt_s").text(result[0].ShirtblouseS),
              $(".print-Shirt_m").text(result[0].shirtblouseM),
              $(".print-Shirt_l").text(result[0].shirtblouseL),
              $(".print-Shirt_xl").text(result[0].ShirtblouseXL),
              $(".print-Trouser_xs").text(result[0].TrouserXS),
              $(".print-Trouser_s").text(result[0].TrouserS),
              $(".print-Trouser_m").text(result[0].TrouserM),
              $(".print-Trouser_l").text(result[0].TrouserL),
              $(".print-Trouser_xl").text(result[0].TrouserXL),
              $(".print-jacket_xs").text(result[0].JacketXS),
              $(".print-jacket_s").text(result[0].JacketS);
            $(".print-jacket_m").text(result[0].JacketM);
            $(".print-jacket_l").text(result[0].JacketL);
            $(".print-jacket_xl").text(result[0].JacketXL);
            $(".print-Coat_xs").text(result[0].CoatXS);
            $(".print-Coat_s").text(result[0].CoatS);
            $(".print-Coat_m").text(result[0].CoatM);
            $(".print-Coat_l").text(result[0].CoatL);
            $(".print-Coat_xl").text(result[0].CoatXL);
            $(".print-Waistcoat_xs").text(result[0].WaistcoatXS);
            $(".print-Waistcoat_s").text(result[0].WaistcoatS);
            $(".print-Waistcoat_l").text(result[0].WaistcoatM);
            $(".print-Waistcoat_m").text(result[0].WaistcoatL);
            $(".print-Waistcoat_xl").text(result[0].WaistcoatXL);
          });
      });

    $(`#print-imguniform`).show();
    $(".print-IamgeBankdetailsItemID").show();
    $("#print-Dynamicimguniform").hide();

  }

  public Redirectodashboard() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
  }

  public landingpage() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
  }

  public async GetUniformItem(ID) {

    $("#name-of-request").show();
    $(".dyanmiclistname").show();
    $(".nameuser-dynamic").hide();
    $("#nameofreq").hide();
    $(`#imguniform`).show();
    $(".withoutdyanmiclist").hide();
    $(".dyanmiclist").show();
    $("#userupdateuniformbtn").hide();



    await newweb.lists
      .getByTitle("EmployeeBankDetailsMaster")
      .items.select(
        "ID",
        "Date",
        "NameofEmployee",
        "Department",
        "EmployeeId",
        "BankName",
        "Branch",
        "Address",
        "Address",
        "AccountNumber",
        "IBANNumber",
        "ONBSessionID",
        "UnitLogo",
        "Attachmentusername"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {


          Bnanklistid = (result[0].ID)
          $(".uniformbanksuccessimg").show();
          this.Getfolderitemviewmode(result[0].Attachmentusername)
          this.Getfolderiteditwmode(result[0].Attachmentusername)
          //txt-dateuniform
          AttachmentName = result[0].Attachmentusername
          $("#list-date-bank").val(moment(result[0].Date).format("YYYY-MM-DD"));
          $(".dyanmiclistname").val(result[0].NameofEmployee);
          $("#deptuniform").val(result[0].Department);
          $("#EmployeeIduniform").val(result[0].EmployeeId);
          $("#BankName").val(result[0].BankName);
          $("#Branch").val(result[0].Branch);
          $("#Addressuniforminputbank").val(result[0].Address);
          $("#AccountNumber").val(result[0].AccountNumber);
          $("#IBANNumber").val(result[0].IBANNumber);
          ImageSrcuniform = result[0].UnitLogo;

          iduniformreq = result[0].UniformRequestItemId;

        }
      });
    newweb.lists
      .getByTitle("UniformRequest")
      .items.select(
        "ID",
        "DateofRequest",
        "EmployeeNo",
        "NameofRequestor",
        "JoiningDate",
        "JobTitle",
        "Department",
        "Sex",
        "DateofLastUniformReceived",
        "QuantityofUniform",
        "ONBSessionID",
        "BankControlNumber",
        "UniformControlNumber",
        "BankVersionNumber",
        "UniformVersionNumber",
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          Uniformrequestlistid = result[0].ID
          BankControlNumber = result[0].BankControlNumber
          UniformControlNumber = result[0].UniformControlNumber
          BankVersionNumber = result[0].BankVersionNumber
          UniformVersionNumber = result[0].UniformVersionNumber
          $("#dateofrequestid").val(
            moment(result[0].DateofRequest).format("YYYY-MM-DD")
          );
          $("#EmployeeNouniform").val(result[0].EmployeeNo);
          $("#Nameof-Requestor").val(result[0].NameofRequestor);
          $("#JoiningDateuniform-date").val(
            moment(result[0].JoiningDate).format("YYYY-MM-DD")
          );
          $("#JobTitleuniform").val(result[0].JobTitle);
          // $("#Department").val(result[0].Department);
          $("#Bankunifromset").val(result[0].Sex);
          $("#DateofLastUniformReceived").val(
            moment(result[0].DateofLastUniformReceived).format("YYYY-MM-DD")
          );
          $("#QuantityofUniform").val(result[0].QuantityofUniform);
          $("#Departmentuniformrequest").val(result[0].Department)
          UniformRequestItemId = result[0].ID;
        }
      });

    newweb.lists
      .getByTitle("UniformDescription")
      .items.select(
        "WaistcoatXS",
        "WaistcoatS",
        "WaistcoatM",
        "WaistcoatL",
        "WaistcoatXL",
        "CoatXS",
        "CoatS",
        "CoatL",
        "CoatM",
        "CoatXL",
        "JacketXS",
        "JacketS",
        "JacketM",
        "JacketL",
        "JacketXL",
        "TrouserXS",
        "TrouserS",
        "TrouserM",
        "TrouserL",
        "TrouserXL",
        "ID",
        "ShirtblouseXS",
        "ShirtblouseS",
        "shirtblouseM",
        "shirtblouseL",
        "ShirtblouseXL",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + EditSessionid + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          Uniformsizelistid = result[0].ID;
          $(".Shirt_xs").val(result[0].ShirtblouseXS),
            $(".Shirt_s").val(result[0].ShirtblouseS),
            $(".Shirt_m").val(result[0].shirtblouseM),
            $(".Shirt_l").val(result[0].shirtblouseL),
            $(".Shirt_xl").val(result[0].ShirtblouseXL),
            $(".Trouser_xs").val(result[0].TrouserXS),
            $(".Trouser_s").val(result[0].TrouserS),
            $(".Trouser_m").val(result[0].TrouserM),
            $(".Trouser_l").val(result[0].TrouserL),
            $(".Trouser_xl").val(result[0].TrouserXL),
            $(".jacket_xs").val(result[0].JacketXS),
            $(".jacket_s").val(result[0].JacketS);
          $(".jacket_m").val(result[0].JacketM);
          $(".jacket_l").val(result[0].JacketL);
          $(".jacket_xl").val(result[0].JacketXL);
          $(".Coat_xs").val(result[0].CoatXS);
          $(".Coat_s").val(result[0].CoatS);
          $(".Coat_m").val(result[0].CoatM);
          $(".Coat_l").val(result[0].CoatL);
          $(".Coat_xl").val(result[0].CoatXL);
          $(".Waistcoat_xs").val(result[0].WaistcoatXS);
          $(".Waistcoat_s").val(result[0].WaistcoatS);
          $(".Waistcoat_l").val(result[0].WaistcoatL);
          $(".Waistcoat_m").val(result[0].WaistcoatM);
          $(".Waistcoat_xl").val(result[0].WaistcoatXL);
        }
      });




  }


  public Getfolderiteditwmode(curentName) {
    if (GlobalFormOpenedMode == "Edit") {

      var bankstatementstr = [];
      var bankstatementfinalvalue = []
      var str = curentName;

      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`BankStatement/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            bankstatementstr.push(files[i]);
          }


          for (var i = 0; i < bankstatementstr.length; i++) {
            if (bankstatementstr[i].ListItemAllFields.Tags == "BANK STATEMENT"
              && bankstatementstr[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {

              bankstatementfinalvalue.push(bankstatementstr[i]);
              bankstatement = bankstatementfinalvalue[0].ServerRelativeUrl;
              this.setState({ BankStatement: bankstatement })
              $("#Attact-bank-statement").hide();
              $(".bankstatement-shown").show();
              $(".bankdelete").show();

            }
          }
        });
    }
  }

  public Getfolderitemviewmode(curentName) {
    if (GlobalFormOpenedMode == "View") {

      var bankstatement = [];
      var bankstatementfinalvalue = []
      var str = curentName;

      var FullName = str.split(" ").join("");
      newweb
        .getFolderByServerRelativeUrl(`BankStatement/${FullName}`)
        .files.expand("Name", "ListItemAllFields", "Author")
        .get()
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            bankstatement.push(files[i]);
            //(files[i]);

          }

          setTimeout(() => {


            for (var i = 0; i < bankstatement.length; i++) {

              if (bankstatement[i].ListItemAllFields.Tags == "BANK STATEMENT"
                && bankstatement[i].ListItemAllFields.ONBSessionID == GlobalSessionIDValue) {

                printfilename = files[0].Name
                bankstatementfinalvalue.push(bankstatement[i]);
                bankstatement = bankstatementfinalvalue[0].ServerRelativeUrl;
                this.setState({ BankStatement: bankstatement.toString() })
                $("#Attact-bank-statement").hide();
                $(".bankstatement-shown").show();
                $(".bankdelete").hide();

              }
            }
          }, 2000);
        });
    }
  }



  public NameofRequestor2() {
    var status = true;
    if ((status == true && $("#Nameof-Requestor").val() != "")) {
      $("#err-nameofrequestor").hide();
    } else {
      $("#err-nameofrequestor").show();
      status = false;
    }
    return status;
  }


  public Attachmentvalidation_forbank_hr() {
    var status = true;
    let myfile = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-bank-attachment").hide();
    } else {
      $("#err-bank-attachment").show();
      $("#Attact-bank-statement").focus()
      status = false;
    }
    return status;
  }




  public AttachmentvalidationEdit() {
    var status = true;
    let myfile = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;
    if (this.state.BankStatement == "") {
      if (status == true && myfile != 0) {
        $("#err-bank-attachment").hide();
      } else {
        $("#err-bank-attachment").show();
        $("#Attact-bank-statement").focus()
        status = false;
      }
    }
    return status;
  }






  public updateitemuniform() {

    if (
      // this.deptuniform() &&
      // this.BankName() &&
      // this.Branch() &&
      // this.Address() &&
      // this.AccountNumber() &&
      // this.IBANNumber() &&
      this.dateofrequestid() &&
      this.NameofRequestor2() &&

      this.JobTitle() &&
      this.Depttwo() &&
      this.Bankunifromset()
    ) {
      var Date = $("#list-date-bank").val();
      var Employee = $("#NameofEmployees").val();
      var Depart = $("#deptuniform").val();
      var Id = $("#EmployeeIduniform").val();

      var Bank = $("#BankName").val() == "" ? "-" : $("#BankName").val();;
      var Branch = $("#Branch").val() == "" ? "-" : $("#Branch").val();
      var Address = $("#Addressuniforminputbank").val() == "" ? "-" : $("#Addressuniforminputbank").val();
      var Account = $("#AccountNumber").val() == "" ? "-" : $("#AccountNumber").val();
      var Iban = $("#IBANNumber").val() == "" ? "-" : $("#IBANNumber").val();
      var EmployeeNo = $("#EmployeeNouniform").val();
      var Name = $("#Nameof-Requestor").val();
      var Join = $("#JoiningDateuniform-date").val();
      var Job = $("#JobTitleuniform").val();

      var Sex = $("#Bankunifromset").find(":selected").text();
      var UniformDate = $("#DateofLastUniformReceived").val();
      var QuantityofUniform = $("#QuantityofUniform").val();
      this.UpdateTableRowstoList();
      this.update_bankstatement();
      newweb.lists
        .getByTitle("EmployeeBankDetailsMaster")
        .items.getById(Bnanklistid)
        .update({
          Title: "UNIFORM REQUEST BANK DETAILS",
          NameofEmployee: Employee,
          Department: Depart,
          EmployeeId: Id,
          Date: Date,
          BankName: Bank,
          Branch: Branch,
          Address: Address,
          AccountNumber: Account,
          IBANNumber: Iban,
          Status: "Updated by Unit HR",
        });

      newweb.lists
        .getByTitle("UniformRequest")
        .items.getById(Uniformrequestlistid)
        .update({
          Title: "UNIFORM REQUEST BANK DETAILS",
          DateofRequest: $("#dateofrequestid").val(),
          EmployeeNo: EmployeeNo,
          NameofRequestor: Name,
          JoiningDate: Join,
          JobTitle: Job,
          Sex: Sex,
          DateofLastUniformReceived: UniformDate,
          QuantityofUniform: QuantityofUniform,
          Department: $("#Departmentuniformrequest").val()
        })
        .then((results: any) => {
          if (this.state.HrCompleteStatus == true) {
            this.AddTableToHRUpdateHistory();
            this.AddDocumentToHRUpdateHistory();
            subweb.lists.getByTitle("Employee Bank Details HR Update History").items
              .add({
                Title: "UNIFORM REQUEST BANK DETAILS",
                NameofEmployee: Employee,
                Department: Depart,
                EmployeeId: Id,
                Date: Date,
                BankName: Bank,
                Branch: Branch,
                Address: Address,
                AccountNumber: Account,
                IBANNumber: Iban,
                Status: "Updated by Unit HR",
                ONBSessionID: GlobalSessionIDValue,
                BussinessUnit: officename,
              });

            subweb.lists.getByTitle("Uniform Request HR Update History").items
              .add({
                Title: "UNIFORM REQUEST BANK DETAILS",
                DateofRequest: $("#dateofrequestid").val(),
                EmployeeNo: EmployeeNo,
                NameofRequestor: Name,
                JoiningDate: Join,
                JobTitle: Job,
                Sex: Sex,
                DateofLastUniformReceived: UniformDate,
                QuantityofUniform: QuantityofUniform,
                Department: $("#Departmentuniformrequest").val(),
                ONBSessionID: GlobalSessionIDValue,
                BankControlNumber: BankControlNumber,
                UniformControlNumber: UniformControlNumber,
                BankVersionNumber: BankVersionNumber,
                UniformVersionNumber: UniformVersionNumber,
              })

          }
          setTimeout(() => {

            swal({
              title: "The Form has been updated successfully",

              icon: "success",
            }).then(() => {
              location.reload();
            });
          }, 2000);
        });
    }
  }
  public AddTableToHRUpdateHistory() {
    subweb.lists.getByTitle("Uniform Description HR Update History").items
      .add({
        Title: "UNIFORM REQUEST",
        ShirtblouseXS: $(".Shirt_xs").val() == "" ? "-" : $(".Shirt_xs").val(),
        ShirtblouseS: $(".Shirt_s").val() == "" ? "-" : $(".Shirt_s").val(),
        shirtblouseM: $(".Shirt_m").val() == "" ? "-" : $(".Shirt_m").val(),
        shirtblouseL: $(".Shirt_l").val() == "" ? "-" : $(".Shirt_l").val(),
        ShirtblouseXL: $(".Shirt_xl").val() == "" ? "-" : $(".Shirt_xl").val(),
        TrouserXS: $(".Trouser_xs").val() == "" ? "-" : $(".Trouser_xs").val(),
        TrouserS: $(".Trouser_s").val() == "" ? "-" : $(".Trouser_s").val(),
        TrouserM: $(".Trouser_m").val() == "" ? "-" : $(".Trouser_m").val(),
        TrouserL: $(".Trouser_l").val() == "" ? "-" : $(".Trouser_l").val(),
        TrouserXL: $(".Trouser_xl").val() == "" ? "-" : $(".Trouser_xl").val(),
        JacketXS: $(".jacket_xs").val() == "" ? "-" : $(".jacket_xs").val(),
        JacketS: $(".jacket_s").val() == "" ? "-" : $(".jacket_s").val(),
        JacketM: $(".jacket_m").val() == "" ? "-" : $(".jacket_m").val(),
        JacketL: $(".jacket_l").val() == "" ? "-" : $(".jacket_l").val(),
        JacketXL: $(".jacket_xl").val() == "" ? "-" : $(".jacket_xl").val(),
        CoatXS: $(".Coat_xs").val() == "" ? "-" : $(".Coat_xs").val(),
        CoatS: $(".Coat_s").val() == "" ? "-" : $(".Coat_s").val(),
        CoatM: $(".Coat_m").val() == "" ? "-" : $(".Coat_m").val(),
        CoatL: $(".Coat_l").val() == "" ? "-" : $(".Coat_l").val(),
        CoatXL: $(".Coat_xl").val() == "" ? "-" : $(".Coat_xl").val(),

        WaistcoatXS: $(".Waistcoat_xs").val() == "" ? "-" : $(".Waistcoat_xs").val(),
        WaistcoatS: $(".Waistcoat_s").val() == "" ? "-" : $(".Waistcoat_s").val(),
        WaistcoatM: $(".Waistcoat_m").val() == "" ? "-" : $(".Waistcoat_m").val(),
        WaistcoatL: $(".Waistcoat_l").val() == "" ? "-" : $(".Waistcoat_l").val(),
        WaistcoatXL: $(".Waistcoat_xl").val() == "" ? "-" : $(".Waistcoat_xl").val(),
        Status: "Updated by Unit Hr",
      });
  }
  public async AddDocumentToHRUpdateHistory() {

    var str = AttachmentName;

    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-bank-statement") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Bank-Statement";
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
            `/UH/Bank Statement HR Update History/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: EditSessionid,
                  Tags: "BANK STATEMENT",
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

  public async update_bankstatement() {
    var str = AttachmentName;

    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-bank-statement") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Bank-Statement";
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
            `/BankStatement/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: EditSessionid,
                  Tags: "BANK STATEMENT",
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
  public UpdateTableRowstoList() {
    newweb.lists
      .getByTitle("UniformDescription")
      .items.getById(Uniformsizelistid)
      .update({
        Title: "UNIFORM REQUEST",
        ShirtblouseXS: $(".Shirt_xs").val() == "" ? "-" : $(".Shirt_xs").val(),
        ShirtblouseS: $(".Shirt_s").val() == "" ? "-" : $(".Shirt_s").val(),
        shirtblouseM: $(".Shirt_m").val() == "" ? "-" : $(".Shirt_m").val(),
        shirtblouseL: $(".Shirt_l").val() == "" ? "-" : $(".Shirt_l").val(),
        ShirtblouseXL: $(".Shirt_xl").val() == "" ? "-" : $(".Shirt_xl").val(),
        TrouserXS: $(".Trouser_xs").val() == "" ? "-" : $(".Trouser_xs").val(),
        TrouserS: $(".Trouser_s").val() == "" ? "-" : $(".Trouser_s").val(),
        TrouserM: $(".Trouser_m").val() == "" ? "-" : $(".Trouser_m").val(),
        TrouserL: $(".Trouser_l").val() == "" ? "-" : $(".Trouser_l").val(),
        TrouserXL: $(".Trouser_xl").val() == "" ? "-" : $(".Trouser_xl").val(),
        JacketXS: $(".jacket_xs").val() == "" ? "-" : $(".jacket_xs").val(),
        JacketS: $(".jacket_s").val() == "" ? "-" : $(".jacket_s").val(),
        JacketM: $(".jacket_m").val() == "" ? "-" : $(".jacket_m").val(),
        JacketL: $(".jacket_l").val() == "" ? "-" : $(".jacket_l").val(),
        JacketXL: $(".jacket_xl").val() == "" ? "-" : $(".jacket_xl").val(),
        CoatXS: $(".Coat_xs").val() == "" ? "-" : $(".Coat_xs").val(),
        CoatS: $(".Coat_s").val() == "" ? "-" : $(".Coat_s").val(),
        CoatM: $(".Coat_m").val() == "" ? "-" : $(".Coat_m").val(),
        CoatL: $(".Coat_l").val() == "" ? "-" : $(".Coat_l").val(),
        CoatXL: $(".Coat_xl").val() == "" ? "-" : $(".Coat_xl").val(),

        WaistcoatXS: $(".Waistcoat_xs").val() == "" ? "-" : $(".Waistcoat_xs").val(),
        WaistcoatS: $(".Waistcoat_s").val() == "" ? "-" : $(".Waistcoat_s").val(),
        WaistcoatM: $(".Waistcoat_m").val() == "" ? "-" : $(".Waistcoat_m").val(),
        WaistcoatL: $(".Waistcoat_l").val() == "" ? "-" : $(".Waistcoat_l").val(),
        WaistcoatXL: $(".Waistcoat_xl").val() == "" ? "-" : $(".Waistcoat_xl").val(),
        Status: "Updated by Unit Hr",
      });
  }



  public GetCurrentUserDetails() {
    // alert(new Date().getTime())

    var reacthandler = this;

    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;
        // $(".Bank_empname").val(Name)
        reacthandler.createfolder(resultData.d.DisplayName);

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

      const fieldname1: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Control Number")();

      const fieldname2: IFieldInfo = await newweb.lists.getByTitle("Onboarding Subsection Form Name Master")
        .fields.getByInternalNameOrTitle("" + ofcname + " Form Version Number")();


      await newweb.lists.getByTitle("Onboarding Subsection Form Name Master").items.select("*", "Title")

        .get()
        .then((results) => {

          if (results.length != 0) {

            for (var i = 0; i < results.length; i++) {
              if (results[i].Title == "Employee Bank Details Form") {
                BankControlno = results[i][fieldname1.InternalName]
                Bankversionno = results[i][fieldname2.InternalName]

              }
              if (results[i].Title == "Employee Uniform Request") {
                Uniformcontrolno = results[i][fieldname1.InternalName]
                UniformVersionno = results[i][fieldname2.InternalName]
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

    newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'UNIFORM REQUEST BANK DETAILS'").orderBy("Created", false).get().then((response) => {
      if (response.length != 0) {
        if (response[0].Title == "UNIFORM REQUEST BANK DETAILS") {
          this.setState({
            UniformBankReqSubmissionStatus: response[0].Status
          });

          if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {

            this.GetAttachment(this.state.CurrentUserName);
            this.Currentuserinformationuniformbank(ONBSessionID, FormMode);


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
        "jobappliedfor"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {


          $("#NameofEmployeeuniform").val(result[0].FullName)
          $("#NameofRequestor").val(result[0].FullName)
          $("#Bankunifromset").val(result[0].Gender)
          //  $("#JobTitleuniform").val(result[0].jobappliedfor)
        }
      })

    newweb.lists
      .getByTitle("Employee Joining Report Transaction")
      .items.select(
        "Designation",
        "Department",
        "ONBSessionID",
        "DateofJoining",
        "EmployeeIDNumber"

      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")

      .get()
      .then((result) => {
        if (result.length != 0) {


          $("#EmployeeIduniform").val(result[0].EmployeeIDNumber)
          $("#EmployeeNouniform").val(result[0].EmployeeIDNumber)
          $("#deptuniform").val(result[0].Department)
          $("#Departmentuniformrequest").val(result[0].Department)
          $("#JobTitleuniform").val(result[0].Designation)
          $("#JoiningDateuniform-date").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
        }
      })
  }



  public async createfolder(Username) {
    this.Attachbank()
    // var   str="this is the item";
    var str = Username;
    var FullName = str.split(" ").join("");

    const folder = newweb
      .getFolderByServerRelativePath(`BankStatement/${FullName}`)
      .select("Exists")
      .get();
    if (!(await folder).Exists) {
      newweb.folders
        .add(`BankStatement/${FullName}`)
        .then(function (data) {
          //("Folder is created at " + data.data.ServerRelativeUrl);
        })
        .catch(function (data) {
          //(data);
        });
    }
    const fol = subweb.getFolderByServerRelativePath(`Bank Statement HR Update History/${FullName}`)
      .select("Exists").get();

    if (!(await fol).Exists) {
      subweb.folders.add(`Bank Statement HR Update History/${FullName}`)
    }
  }

  public Attachbank() {


    $("#Attact-bank-statement").on("change", function (e) {
      var fileArr2 = [];
      let fileVal13 = (
        document.querySelector("#Attact-bank-statement") as HTMLInputElement
      ).files[0];
      fileArr2.push(fileVal13);
      // for(var i = 0; i < fileArr2.length; i++){
      let fileBloc = $("<span/>", { class: "Attact-bank-statement-block" }),
        fileName = $("<span/>", {
          class: "Attact-bank-statementname",
          text: fileArr2[0].name,
        });
      fileBloc
        .append(
          '<span class="file-Attact-bank-statement"><span class="Attact-bank-statementcross "><img style="width:20px" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="error"></span></span>'
        )
        .append(fileName);
      $("#Attact-bank-statementsList").append(fileBloc);
      $("#Attact-bank-statement").hide();
      // };
    });
    $("table #bnk-detalis").on(
      "click",
      ".Attact-bank-statementcross",
      function (event) {
        //("hi");
        $("#Attact-bank-statement").show();
        $(".Attact-bank-statement-block").remove();
        $("#Attact-bank-statement").val("");

      }
    );
  }


  public async bankstatement() {
    var str = `${this.state.CurrentUserName}`;
    var FullName = str.split(" ").join("");

    var fileArr13 = [];
    var FileNameGenerated13: string;

    let myfile13 = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;

    if (myfile13 != 0) {
      for (var j = 0; j < myfile13; j++) {
        let fileVal13 = (
          document.querySelector("#Attact-bank-statement") as HTMLInputElement
        ).files[0];
        fileArr13.push(fileVal13);

        //(fileArr13.push(fileVal13));
      }
      for (var i = 0; i < fileArr13.length; i++) {
        var NameofTable13 = "Bank-Statement";
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
            `/BankStatement/${FullName}`
          )
          .files.add(FileNameGenerated13, fileArr13[i], true)
          .then((data) => {
            data.file.getItem().then((item) => {
              item
                .update({
                  ONBSessionID: this.state.ONBSessionID,
                  Tags: "BANK STATEMENT",
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



  public GetAttachment(curentName) {

    // alert("hu")
    var bankstatement = [];
    var bankstatementfinalvalue = []
    var str = `${this.state.CurrentUserName}`;
    var name = curentName
    var FullName = name.split(" ").join("");
    newweb
      .getFolderByServerRelativeUrl(`BankStatement/${FullName}`)
      .files.expand("Name", "ListItemAllFields", "Author")
      .get()
      .then((files) => {
        for (var i = 0; i < files.length; i++) {
          bankstatement.push(files[i]);
          // //(files[i]);
        }


        for (var i = 0; i < bankstatement.length; i++) {


          if (bankstatement[i].ListItemAllFields.Tags == "BANK STATEMENT") {

            bankstatementfinalvalue.push(bankstatement[i]);

            bankstatement = bankstatementfinalvalue[0].ServerRelativeUrl;
            this.setState({ BankStatement: bankstatement.toString() })
            $("#Attact-bank-statement").hide();
            $(".bankstatement-shown").show();
            $(".bankdelete").hide();

          }
        }
      });

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

        if (mod == "bank") {
          newweb
            .getFileByServerRelativeUrl(bankstatement)
            .recycle()
            .then(function (data) {
              $("#Attact-bank-statement").show();
              $(".bankstatement-shown").hide();

              $(".bankdelete").hide();
              this.setState({ BankStatement: "" })

            });
        }


      }
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
  public deptuniform() {
    var status = true;
    if ((status == true && $("#deptuniform").val() != "")) {
      $("#errdepartmentuniform").hide();
    } else {
      $("#errdepartmentuniform").show();

      $("#deptuniform").focus();


      status = false;
    }
    return status;
  }

  public employeeid() {
    var status = true;
    if ((status == true && $("#EmployeeIduniform").val() != "")) {
      $("#err-employeeiduniform").hide();
    } else {
      $("#err-employeeiduniform").show();
      $("#EmployeeIduniform").focus()
      status = false;
    }
    return status;
  }
  public BankName() {
    var status = true;
    if ((status == true && $("#BankName").val() != "")) {
      $("#err-bankname").hide();
    } else {
      $("#err-bankname").show();
      $("#BankName").focus()
      status = false;
    }
    return status;
  }
  public Branch() {
    var status = true;
    if ((status == true && $("#Branch").val() != "")) {
      $("#err-Branch").hide();
    } else {
      $("#err-Branch").show();
      $("#Branch").focus()
      status = false;
    }
    return status;
  }
  public Address() {
    var status = true;
    if ((status == true && $("#Addressuniforminputbank").val() != "")) {
      $("#err-Addressuniforminputbankbank").hide();
    } else {
      $("#err-Addressuniforminputbankbank").show();
      $("#Addressuniforminputbank").focus()
      status = false;
    }
    return status;
  }

  public AccountNumber() {
    var status = true;
    if ((status == true && $("#AccountNumber").val() != "")) {
      $("#err-accountnumber").hide();
    } else {
      $("#err-accountnumber").show();
      $("#AccountNumber").focus()
      status = false;
    }
    return status;
  }
  public IBANNumber() {
    var status = true;
    if ((status == true && $("#IBANNumber").val() != "")) {
      $("#err-ibannumber").hide();
    } else {
      $("#err-ibannumber").show();
      $("#IBANNumber").focus()
      status = false;
    }
    return status;
  }

  public dateofrequestid() {
    var status = true;
    if ((status == true && $("#dateofrequestid").val() != "")) {
      $("#err-daterequest").hide();
    } else {
      $("#err-daterequest").show();
      $("#dateofrequestid").focus();
      status = false;
    }
    return status;
  }

  public EmployeeNo() {
    var status = true;
    if ((status == true && $("#EmployeeNouniform").val() != "")) {
      $("#err-employeenouniform").hide();

    } else {
      $("#err-employeenouniform").show();
      $("#EmployeeNouniform").focus();
      status = false;

    }
    return status;
  }
  public NameofRequestor() {
    var status = true;
    if ((status == true && $("#NameofRequestor").val() != "")) {
      $("#err-nameofrequestor").hide();
    } else {
      $("#err-nameofrequestor").show();
      $("#NameofRequestor").focus()
      status = false;
    }
    return status;
  }
  public JoiningDate() {
    var status = true;
    if ((status == true && $("#JoiningDateuniform-date").val() != "")) {
      $("#err-joiningdate").hide();
    } else {
      $("#err-joiningdate").show();
      $("#JoiningDateuniform-date").focus()
      status = false;
    }
    return status;
  }
  public JobTitle() {
    var status = true;
    if ((status == true && $("#JobTitleuniform").val() != "")) {
      $("#err-jobtitleuniform").hide();
    } else {
      $("#err-jobtitleuniform").show();
      $("#JobTitleuniform").focus()
      status = false;
    }
    return status;
  }
  public DateofLastUniformReceived() {
    var status = true;
    if ((status == true && $("#DateofLastUniformReceived").val() != "")) {
      $("#err-dateoflastuniformreceived").hide();
    } else {
      $("#err-dateoflastuniformreceived").show();
      $("#DateofLastUniformReceived").focus()
      status = false;
    }
    return status;
  }
  public QuantityofUniform() {
    var status = true;

    if (
      (status ==
        true && $("#QuantityofUniform").find(":selected").text() == "Select")
    ) {
      $("#err-quantityofuniform").show();
      $("#QuantityofUniform").focus();
      status = false;
    } else {
      $("#err-quantityofuniform").hide();
    }
    return status;
  }
  public Bankunifromset() {
    var status = true;
    if (
      (status == true && $("#Bankunifromset").find(":selected").text() == "Select")
    ) {
      $("#err-generuniformbank").show();
      $("#Bankunifromset").focus()
      status = false;
    } else {
      $("#err-generuniformbank").hide();
    }
    return status;
  }

  public Depttwo() {
    var status = true;
    if (status == true && $("#Departmentuniformrequest").val() != "") {
      $("#err-Departmentuniform").hide();
    } else {
      $("#err-Departmentuniform").show();
      $("#Departmentuniformrequest").focus()
      status = false;
    }
    return status;
  }





  public Removevalidationuniformrequest() {
    $("#Departmentuniformrequest").keyup(function () {
      $("#err-Departmentuniform").hide();
    });
    $("#QuantityofUniform").on('change', function () {
      $("#err-quantityofuniform").hide();
    });
    $('#Bankunifromset').on('change', function () {
      $("#err-generuniformbank").hide();
    })


    $("#JobTitleuniform").keyup(function () {
      $("#err-jobtitleuniform").hide();
    });

    $("#JobTitleuniform").keyup(function () {
      $("#err-jobtitleuniform").hide();
    });
    $("#EmployeeNouniform").keyup(function () {
      $("#err-employeenouniform").hide();
    });

    $("#dateofrequestid").keyup(function () {
      $("#err-daterequest").hide();
    });
    $("#IBANNumber").keyup(function () {
      $("#err-ibannumber").hide();
    });


    $("#AccountNumber").keyup(function () {
      $("#err-accountnumber").hide();
    });



    $("#Addressuniforminputbank").keyup(function () {
      $("#err-Addressuniforminputbankbank").hide();
    });


    $("#Branch").keyup(function () {
      $("#err-Branch").hide();
    });

    $("#Branch").keyup(function () {
      $("#err-Branch").hide();
    });

    $("#EmployeeIduniform").keyup(function () {

    });

    $("#EmployeeIduniform").keyup(function () {
      $("#err-employeeiduniform").hide();
    });


    $("#deptuniform").keyup(function () {
      $("#errdepartmentuniform").hide();
    });

    $("#deptuniform").keyup(function () {
      $("#errdepartmentuniform").hide();
    });


    $("#BankName").keyup(function () {
      $("#err-bankname").hide();
    });

    $("#BankName").keyup(function () {
      $("#err-bankname").hide();
    });




    $('#dateofrequestid').on('change', function () {
      $("#err-daterequest").hide();
    })


    $('#dateofrequestid').on('change', function () {
      $("#err-daterequest").hide();
    })

    $("#Attact-bank-statement").on('change', function () {
      $("#err-bank-attachment").hide();
    })
  }


  public Attachmentlengthcheck4() {
    var status = true;
    let myfile = (
      document.querySelector("#Attact-bank-statement") as HTMLInputElement
    ).files.length;

    if (status == true && myfile != 0) {
      $("#err-bank-attachment").hide();
    } else {
      $("#err-bank-attachment").show();
      $("#Attact-bank-statement").focus()
      status = false;
    }
    return status;
  }
  public quantityofuniform_validation() {
    var status = true;


    if (status == true && $("#QuantityofUniform").val() == "Select") {
      $("#err-quantityofuniform").show();
      $("#QuantityofUniform").focus()
      status = false;
    } else {
      $("#err-quantityofuniform").hide();

    }
    return status;
  }



  public SaveListItem() {
    if (
      // this.deptuniform() &&

      // this.BankName() &&
      // this.Branch() &&
      // this.Address() &&
      // this.AccountNumber() &&
      // this.IBANNumber() &&
      this.dateofrequestid() &&
      this.NameofRequestor() &&
      this.JobTitle() &&
      this.Depttwo() &&
      this.Bankunifromset()
      // this.quantityofuniform_validation()

    ) {

      swal({
        title: "Are you sure?",
        text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      } as any).then((willadd) => {
        if (willadd) {

          newweb.lists
            .getByTitle("UniformRequest")
            .items.add({
              Title: "UNIFORM REQUEST BANK DETAILS",
              DateofRequest: $("#dateofrequestid").val(),
              EmployeeNo: $("#EmployeeNouniform").val(),
              NameofRequestor: $("#NameofRequestor").val(),
              JoiningDate: $("#JoiningDateuniform-date").val(),
              JobTitle: $("#JobTitleuniform").val(),
              Sex: $("#Bankunifromset").val(),
              DateofLastUniformReceived: $("#DateofLastUniformReceived").val(),
              QuantityofUniform: $("#QuantityofUniform").val(),
              Department: $("#Departmentuniformrequest").val(),
              ONBSessionID: this.state.ONBSessionID,
              BankControlNumber: this.state.ControlNumber + "/" + BankControlno,
              UniformControlNumber: this.state.ControlNumber + "/" + Uniformcontrolno,
              BankVersionNumber: Bankversionno,
              UniformVersionNumber: UniformVersionno,



            })
            .then((results: any) => {
              //(results.data.ID);
              newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'UNIFORM REQUEST BANK DETAILS'").orderBy("Created", false).get().then((response) => {
                if (response.length != 0) {
                  newweb.lists.getByTitle("Onboarding Transaction Master").items.getById(response[0].Id).update({
                    Status: "Completed",
                    CompletedOn: moment().format("MM/DD/YYYY")
                  });
                }
              });
              this.AddTableToList(results.data.ID);
              this.EmployeeBankDetailsSaveItem(results.data.ID);
              this.bankstatement();
            });
        }
      });
    }
  }


  public EmployeeBankDetailsSaveItem(IDno) {

    var Date = $("#txt-dateuniform").val();
    var Employee = $("#NameofEmployeeuniform").val();
    var Depart = $("#deptuniform").val();
    var Id = $("#EmployeeIduniform").val();
    var Bank = $("#BankName").val() == "" ? "-" : $("#BankName").val();;
    var Branch = $("#Branch").val() == "" ? "-" : $("#Branch").val();
    var Address = $("#Addressuniforminputbank").val() == "" ? "-" : $("#Addressuniforminputbank").val();
    var Account = $("#AccountNumber").val() == "" ? "-" : $("#AccountNumber").val();
    var Iban = $("#IBANNumber").val() == "" ? "-" : $("#IBANNumber").val();

    newweb.lists.getByTitle("EmployeeBankDetailsMaster").items.add({
      Title: "UNIFORM REQUEST BANK DETAILS",
      NameofEmployee: Employee,
      Department: Depart,
      EmployeeId: Id,
      Date: Date,
      BankName: Bank,
      Branch: Branch,
      Address: Address,
      AccountNumber: Account,
      IBANNumber: Iban,
      UniformRequestItemId: IDno,
      Status: "Submitted by Employee",
      BussinessUnit: officename,
      UnitLogo: LogoUrl,
      ONBSessionID: this.state.ONBSessionID,
      Attachmentusername: this.state.CurrentUserName
    });
  }
  public AddTableToList(uniformid) {

    var val = $(".Shirt_xs").val();//""/null/undf
    newweb.lists
      .getByTitle("UniformDescription")
      .items.add({
        Title: "UNIFORM REQUEST",
        ShirtblouseXS: $(".Shirt_xs").val() == "" ? "-" : $(".Shirt_xs").val(),
        ShirtblouseS: $(".Shirt_s").val() == "" ? "-" : $(".Shirt_s").val(),
        shirtblouseM: $(".Shirt_m").val() == "" ? "-" : $(".Shirt_m").val(),
        shirtblouseL: $(".Shirt_l").val() == "" ? "-" : $(".Shirt_l").val(),
        ShirtblouseXL: $(".Shirt_xl").val() == "" ? "-" : $(".Shirt_xl").val(),

        TrouserXS: $(".Trouser_xs").val() == "" ? "-" : $(".Trouser_xs").val(),
        TrouserS: $(".Trouser_s").val() == "" ? "-" : $(".Trouser_s").val(),
        TrouserM: $(".Trouser_m").val() == "" ? "-" : $(".Trouser_m").val(),
        TrouserL: $(".Trouser_l").val() == "" ? "-" : $(".Trouser_l").val(),
        TrouserXL: $(".Trouser_xl").val() == "" ? "-" : $(".Trouser_xl").val(),

        JacketXS: $(".jacket_xs").val() == "" ? "-" : $(".jacket_xs").val(),
        JacketS: $(".jacket_s").val() == "" ? "-" : $(".jacket_s").val(),
        JacketM: $(".jacket_m").val() == "" ? "-" : $(".jacket_m").val(),
        JacketL: $(".jacket_l").val() == "" ? "-" : $(".jacket_l").val(),
        JacketXL: $(".jacket_xl").val() == "" ? "-" : $(".jacket_xl").val(),

        CoatXS: $(".Coat_xs").val() == "" ? "-" : $(".Coat_xs").val(),
        CoatS: $(".Coat_s").val() == "" ? "-" : $(".Coat_s").val(),
        CoatM: $(".Coat_m").val() == "" ? "-" : $(".Coat_m").val(),
        CoatL: $(".Coat_l").val() == "" ? "-" : $(".Coat_l").val(),
        CoatXL: $(".Coat_xl").val() == "" ? "-" : $(".Coat_xl").val(),

        WaistcoatXS: $(".Waistcoat_xs").val() == "" ? "-" : $(".Waistcoat_xs").val(),
        WaistcoatS: $(".Waistcoat_s").val() == "" ? "-" : $(".Waistcoat_s").val(),
        WaistcoatM: $(".Waistcoat_m").val() == "" ? "-" : $(".Waistcoat_m").val(),
        WaistcoatL: $(".Waistcoat_l").val() == "" ? "-" : $(".Waistcoat_l").val(),
        WaistcoatXL: $(".Waistcoat_xl").val() == "" ? "-" : $(".Waistcoat_xl").val(),
        Status: "Submitted by Employee",
        BussinessUnit: officename,
        ONBSessionID: this.state.ONBSessionID,
        uniformid: uniformid,
      })
      .then((results: any) => {
        swal({
          title: "The Form has been submitted successfully",

          icon: "success",
        }).then(() => {
          location.reload();
        });
      });
  }

  public dashboardloa() {
    location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
  }

  public async Currentuserinformationuniformbank(ONBSessionID, FormMode) {


    await newweb.lists
      .getByTitle("EmployeeBankDetailsMaster")
      .items.select(
        "ID",
        "Date",
        "NameofEmployee",
        "Department",
        "EmployeeId",
        "BankName",
        "Branch",
        "Address",
        "Address",
        "AccountNumber",
        "IBANNumber",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .get()
      .then((response) => {
        if (response.length != 0) {

          $("#name-of-request").show();
          $(".dyanmiclistname").show();
          $(".nameuser-dynamic").hide();
          $("#nameofreq").hide();
          $(".dyanmiclistname").val(response[0].NameofEmployee);
          //   $("#Nameof-Requestor").val(response[0].NameofEmployee);




          $("#userupdateuniformbtn").hide();
          $("#Bankunifromset").prop('disabled', true);
          $("#QuantityofUniform").prop('disabled', true);
          $(".Uniformviewmode").prop('disabled', true);

          uniformitemidlist = response[0].ID;
          $(".uniformbanksuccessimg").show();

          $("#updateitemidsubmit").hide();
          $("#txt-date").val(moment(response[0].Date).format("YYYY-MM-DD"));

          $("#deptuniform").val(response[0].Department);
          $("#EmployeeIduniform").val(response[0].EmployeeId);
          $("#BankName").val(response[0].BankName);
          $("#Branch").val(response[0].Branch);
          $("#Addressuniforminputbank").val(response[0].Address);
          $("#AccountNumber").val(response[0].AccountNumber);
          $("#IBANNumber").val(response[0].IBANNumber);
        }
      });

    newweb.lists
      .getByTitle("UniformRequest")
      .items.select(
        "ID",
        "DateofRequest",
        "EmployeeNo",
        "NameofRequestor",
        "JoiningDate",
        "JobTitle",
        "Department",
        "Sex",
        "DateofLastUniformReceived",
        "QuantityofUniform",
        "ONBSessionID"

      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          uniformrequestlistitem = result[0].ID;
          $("#dateofrequestid").val(
            moment(result[0].DateofRequest).format("YYYY-MM-DD")
          );
          $("#EmployeeNouniform").val(result[0].EmployeeNo);
          $("#NameofRequestor").val(result[0].NameofRequestor);
          $(".name-request").val(result[0].NameofRequestor);

          $("#JoiningDateuniform-date").val(
            moment(result[0].JoiningDate).format("YYYY-MM-DD")
          );
          $("#JobTitleuniform").val(result[0].JobTitle);
          $("#Departmentuniformrequest").val(result[0].Department);
          $("#Bankunifromset").val(result[0].Sex);
          $("#DateofLastUniformReceived").val(
            moment(result[0].DateofLastUniformReceived, "YYYY-MM-DD").format("YYYY-MM-DD")
          );
          $("#QuantityofUniform").val(result[0].QuantityofUniform);
        }
      });

    newweb.lists
      .getByTitle("UniformDescription")
      .items.select(
        "WaistcoatXS",
        "WaistcoatS",
        "WaistcoatM",
        "WaistcoatL",
        "WaistcoatXL",
        "CoatXS",
        "CoatS",
        "CoatL",
        "CoatM",
        "CoatXL",
        "JacketXS",
        "JacketS",
        "JacketM",
        "JacketL",
        "JacketXL",
        "TrouserXS",
        "TrouserS",
        "TrouserM",
        "TrouserL",
        "TrouserXL",
        "ID",
        "ShirtblouseXS",
        "ShirtblouseS",
        "shirtblouseM",
        "shirtblouseL",
        "ShirtblouseXL",
        "ONBSessionID"
      )
      .filter("ONBSessionID eq '" + ONBSessionID + "'")
      .get()
      .then((result) => {
        if (result.length != 0) {
          var didss = result[0].ID;
          $(".Shirt_xs").val(result[0].ShirtblouseXS),
            $(".Shirt_s").val(result[0].ShirtblouseS),
            $(".Shirt_m").val(result[0].shirtblouseM),
            $(".Shirt_l").val(result[0].shirtblouseL),
            $(".Shirt_xl").val(result[0].ShirtblouseXL),
            $(".Trouser_xs").val(result[0].TrouserXS),
            $(".Trouser_s").val(result[0].TrouserS),
            $(".Trouser_m").val(result[0].TrouserM),
            $(".Trouser_l").val(result[0].TrouserL),
            $(".Trouser_xl").val(result[0].TrouserXL),
            $(".jacket_xs").val(result[0].JacketXS),
            $(".jacket_s").val(result[0].JacketS);
          $(".jacket_m").val(result[0].JacketM);
          $(".jacket_l").val(result[0].JacketL);
          $(".jacket_xl").val(result[0].JacketXL);
          $(".Coat_xs").val(result[0].CoatXS);
          $(".Coat_s").val(result[0].CoatS);
          $(".Coat_m").val(result[0].CoatM);
          $(".Coat_l").val(result[0].CoatL);
          $(".Coat_xl").val(result[0].CoatXL);


          $(".Waistcoat_xs").val(result[0].WaistcoatXS);
          $(".Waistcoat_s").val(result[0].WaistcoatS);
          $(".Waistcoat_l").val(result[0].WaistcoatL);
          $(".Waistcoat_m").val(result[0].WaistcoatM);
          $(".Waistcoat_xl").val(result[0].WaistcoatXL);

        }
      });

  }

  public Printthis() {

    let printContents = document.getElementById('dashboard_right-print-uq').innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    location.reload();

    document.body.innerHTML = originalContents;

  }

  public isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  public render(): React.ReactElement<IHrOnboardingFormProps> {
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

            <span>Employee Bank Details & Uniform Request</span>
          </div>

          <div className="dashboard_right_ffamily">
            {/* <div className="dashboard_right_text"> */}
            <div className="uniform_bank_top">
              <div className="personal_info_part ebd_uq_top">
                <p className="ebd_uq_para"> The following Requisition forms are listed in this form, The Employee is expected to update the Required fields and submit.
                  List for forms is as below:  </p>
                <div className="ebd_uq_div">
                  <p> a.) Employee Bank Details Form  </p>
                  <p> b.) Employee Uniform Request Form </p>
                </div>
              </div>


              <div className="personal_info_part">
                <div className="uniform_bank_emp_bank">
                  <div className="uniform_bank_div">
                    <h3>a.) Employee Bank Details Form</h3>
                  </div>
                  <div>
                    <table className="account_des_table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-center">
                            {" "}
                            Account description{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bankdetails_td">Employee Name </td>
                          <td>
                            <input
                              type="text"

                              id="NameofEmployeeuniform"
                              name="NameofEmployee"
                              className="form-control common-name-dept-id-disable Bank_empname nameuser-dynamic Uniformviewmode common_fullname_disable"
                              autoComplete="off"
                            ></input>

                            <input
                              style={{ display: "none" }}
                              type="text"
                              id="NameofEmployees"
                              name="NameofEmployee"
                              className="form-control common-name-dept-id-disable dyanmiclistname Uniformviewmode"
                              autoComplete="off"
                              disabled
                            ></input>

                            <span
                              className="error-validation error-table-validation"
                              id="err-nameofemployee"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Department </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              id="deptuniform"
                              name="Department"
                              className="form-control common-name-dept-id-disable Uniformviewmode"
                              autoComplete="off"
                            ></input>
                            <span
                              className="error-validation error-table-validation"
                              id="errdepartmentuniform"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Employee ID Number </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              id="EmployeeIduniform"
                              className="form-control common-name-dept-id-disable Uniformviewmode bankepmloyeeid"
                              autoComplete="off"
                            ></input>
                            <span
                              className="error-validation error-table-validation"
                              id="err-employeeiduniform"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Date</td>
                          <td>
                            <input
                              type="date"
                              id="txt-dateuniform"
                              className="form-control currenttxtdate Uniformviewmode"
                              autoComplete="off"
                              disabled
                            ></input>

                            <input style={{ display: "none" }}
                              type="date"
                              id="list-date-bank"
                              className="form-control  Uniformviewmode"
                              autoComplete="off"

                            ></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <table className="month_salary-table">
                      <thead>
                        <tr>
                          <th colSpan={2}>
                            {" "}
                            OPTION 1:Kindly transfer my monthly salary as per the following{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody id="bnk-detalis">
                        <tr>
                          <td className="bankdetails_td">Bank Name </td>
                          <td>
                            <input
                              type="text"
                              id="BankName"
                              name="BankName"
                              className="form-control Uniformviewmode"
                              autoComplete="off"
                            ></input>

                            <span
                              className="error-validation error-table-validation"
                              id="err-bankname"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Branch</td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              id="Branch"
                              name="Branch"
                              className="form-control Uniformviewmode"
                              autoComplete="off"
                            ></input>
                            <span
                              className="error-validation error-table-validation"
                              id="err-Branch"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Address</td>
                          <td>
                            <input
                              id="Addressuniforminputbank"
                              className="form-control Uniformviewmode"
                              autoComplete="off"
                            ></input>

                            <span
                              className="error-validation error-table-validation"
                              id="err-Addressuniforminputbankbank"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Account No </td>
                          <td>
                            <input
                              type="text"
                              id="AccountNumber"
                              name="AccountNumber"
                              className="form-control Uniformviewmode"
                              autoComplete="off"
                            ></input>

                            <span
                              className="error-validation error-table-validation"
                              id="err-accountnumber"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">IBAN Number </td>
                          <td>
                            <input
                              type="text"
                              id="IBANNumber"
                              name="IBANNumber"
                              className="form-control Uniformviewmode"
                              autoComplete="off"
                            ></input>

                            <span
                              className="error-validation error-table-validation"
                              id="err-ibannumber"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Employee Signature</td>

                          <td></td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">
                            Note: Kindly attach a bank statement letter stating your Account Number and IBAN Number

                          </td>
                          <td>
                            <input type="file" id="Attact-bank-statement" className="form-control Uniformviewmode"
                              autoComplete="off">
                            </input>
                            <span
                              className="error-validation error-table-validation"
                              id="err-bank-attachment"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                            <span id="Attact-bank-statementsList"></span>
                            <a data-interception='off'
                              //href={`${bankstatement}`}
                              href={`${this.state.BankStatement}`}
                              style={{ display: "none" }}
                              className="bankstatement-shown"
                              target="_blank"
                            >
                              click here
                            </a>
                            <span
                              className="bankdelete"
                              style={{ display: "none" }}
                              onClick={() => this.deletedocumentlibrary("bank")}
                            >
                              <img className="delete_document_item" src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" alt="image" />
                            </span>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="signature-table_uniform_div">
                    <table className="signature-table_uniform">
                      <thead>
                        <tr>
                          <th className="option2" colSpan={2}>
                            OPTION 2: Authorize Company to open a Bank Account for
                            me:{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bankdetails_td">Employee Signature</td>

                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="uniform_bank_emp_uniform personal_info_part">
                <div className="uniform_bank_div">
                  <h3>b.) Employee Uniform Request </h3>
                </div>
                <div className="row form row_top">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="dateofrequestid"
                        className="form-control Uniformviewmode"
                        autoComplete="off"
                      ></input>
                      <span className="floating-label">Date of Request <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-daterequest"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="EmployeeNouniform"
                        name="EmployeeNo"
                        className="form-control common-name-dept-id-disable Uniformviewmode"
                        autoComplete="off"
                      ></input>
                      <span className="floating-label ">Employee ID Number </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeenouniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div id="nameofreq" className="form-group relative">
                      <input
                        type="text"
                        id="NameofRequestor"
                        name="NameofRequestor"
                        className="form-control common-name-dept-id-disable Bank_empname Uniformviewmode common_fullname_disable"
                        disabled
                        autoComplete="off"
                      ></input>
                      <span className="floating-label ">Name of Requestor <i className="required">*</i></span>
                    </div>

                    <div
                      id="name-of-request"
                      style={{ display: "none" }}
                      className="form-group relative"
                    >
                      <input
                        type="text"
                        id="Nameof-Requestor"
                        name="NameofRequestor"
                        className="form-control common-name-dept-id-disable name-request Uniformviewmode"

                        autoComplete="off"
                        disabled
                      ></input>
                      <span className="floating-label ">Name of Requestor</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofrequestor"
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
                        id="JoiningDateuniform-date"
                        name="JoiningDate"
                        className="form-control  Uniformviewmode"
                        autoComplete="off"
                        disabled
                      ></input>
                      <span className="floating-label ">Joining Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-joiningdate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="JobTitleuniform"
                        name="JobTitle"
                        className="form-control common-name-dept-id-disable Uniformviewmode"
                      ></input>
                      <span className="floating-label ">Job Title <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-jobtitleuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="text"
                        id="Departmentuniformrequest"
                        name="Dept"
                        className="form-control common-name-dept-id-disable Uniformviewmode"
                      ></input>
                      <span className="floating-label ">Department <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Departmentuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>



                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select id="Bankunifromset" className="Status common-name-dept-id-disable form-control" disabled>
                        <option value="Select">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Others</option>
                      </select>
                      <span className="floating-label ">Gender <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-generuniformbank"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <input
                        type="date"
                        id="DateofLastUniformReceived"
                        name="DateofLastUniformReceived"
                        className="form-control Uniformviewmode"
                        autoComplete="off"
                      ></input>
                      <span className="floating-label ">
                        Date of Last Uniform Received
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateoflastuniformreceived"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <select
                        id="QuantityofUniform"
                        className="Status form-control quantity-uniform-set"
                      >
                        <option value="Select">Select</option>
                        <option value="TwoSets">Two Sets</option>
                        <option value="ThreeSets">Three Sets</option>
                      </select>
                      <span className="floating-label ">Quantity of Uniform
                        {/* <i className="required">*</i>  */}
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-quantityofuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div className="custom-table uniformrequest sec">
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search">
                      <h4 className="contact-pg-title">Uniform Description And Size</h4>
                    </div>
                    <div className="table-sort comments_qstn"></div>
                  </div>
                  <div className="uniformsize uniformtableitem">
                    <table className="uniform-size_table-item">
                      <thead>
                        <tr>
                          <th className="uniform_bank_width">#</th>
                          <th>Title</th>
                          <th className="uniform_bank_width">XS </th>
                          <th className="uniform_bank_width">S</th>
                          <th className="uniform_bank_width">M </th>
                          <th className="uniform_bank_width">L </th>
                          <th className="uniform_bank_width">XL</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Blouse/Shirt</td>

                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Shirt_xs Uniformviewmode"
                              autoComplete="off"
                              maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Shirt_s Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Shirt_m Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Shirt_l Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Shirt_xl Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Trouser</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Trouser_xs Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Trouser_s Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Trouser_m Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Trouser_l Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Trouser_xl Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>jacket</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="jacket_xs Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="jacket_s Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="jacket_m Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="jacket_l Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="jacket_xl Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Coat</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Coat_xs Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Coat_s Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Coat_m Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Coat_l Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Coat_xl Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Waistcoat</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Waistcoat_xs Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Waistcoat_s Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Waistcoat_m Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Waistcoat_l Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <input
                              type="text"
                              className="Waistcoat_xl Uniformviewmode"
                              autoComplete="off" maxLength={5}
                            />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <div className="row form signature_part">
                      <div className="col-md-4">
                        <p> Employee Signature </p>
                      </div>
                      <div className="col-md-4">
                        <p> Signature Head of Dept. </p>
                      </div>
                    </div>
                  </div>
                  <div className="uf_bank_details">
                    <p>
                      {" "}
                      <span className="uniform_bank_snote">Note 1</span>: Employee
                      will not be entitled to replacement uniform(s) due to any
                      lapse in the information given by the employee on this
                      request form.
                    </p>
                    <p>
                      {" "}
                      <span className="uniform_bank_snote">Note 2</span>: Please
                      return the completed form to H.R.D
                    </p>
                    <p>
                      <span className="uniform_bank_snote">Note 3</span>: Blue
                      Scrub Suit Uniform will be provided by our internal tailor.
                    </p>
                  </div>
                </div>


                {/* <div className=" personal_info_part"> */}
                <div className="office_use_only">
                  <h3> For Official Use Only </h3>
                  <div className="row form signature_part">
                    <div className="col-md-4">
                      <p> Checked by </p>
                    </div>
                    <div className="col-md-4">
                      <p> Received by </p>
                    </div>
                  </div>
                  <div className="row form signature_part">
                    <div className="col-md-4">
                      <p> Signature HR & Training Manager </p>
                    </div>
                    <div className="col-md-4">
                      <p> Signature Manager, Administration </p>
                    </div>
                  </div>
                </div>
                {/* </div> */}
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
              </div>
              <div className="dashboard_btn ">


                {this.state.isPrevFormSubmitted && this.state.isPrevFormSubmitted == true ?
                  <button
                    id="updateitemidsubmit"
                    className="dashboard_submit_btn uq-submit"
                    type="submit"
                    onClick={() => this.SaveListItem()}
                  >
                    Submit
                  </button>
                  :
                  <button style={{ cursor: "no-drop" }}
                    id="updateitemidsubmit"
                    className="dashboard_submit_btn"
                    type="submit"
                  >
                    Submit
                  </button>
                }

                <button style={{ display: "none" }} id="uniforn-update"
                  className="dashboard_submit_btn"
                  type="submit"
                  onClick={() => this.updateitemuniform()}
                >
                  Update
                </button>

                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnuniform" type="submit" onClick={() => this.Printthis()}>Print</button>
                {GlobalFormOpenedMode == "New" &&
                  <button id="btn-uniform-newpage" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                      Cancel
                    </a>
                  </button>
                }

                {GlobalFormOpenedMode == "Edit" &&
                  <button id="btn-hr-uniform" className="dashboard_submit_btn btn-cancel" type="reset">
                    <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`">
                      Cancel
                    </a>
                  </button>
                }

              </div>
            </div>
          </div>
        </div>

        <div id="dashboard_right-print-uq" style={{ display: "none" }}>
          <div className="dashboard_right_heading">
            {handler.state.Dynamiclogo &&
              handler.state.Dynamiclogo.map(function (imgitem, Index) {
                var img = imgitem.UnitLogo;
                var Dynamiclogo = JSON.parse(img);
                // LogoUrl=img.serverRelativeUrl
                return (
                  <img
                    id="print-Dynamicimguniform"
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
              <span>Employee Bank Details & Uniform Request</span>
              {/* <ul>
                <li>Control Number: <b id="print-Uniform-request-Control-Number"></b></li>
                <li>Version: <b id="print-Uniform-request-Version-Number"></b></li>
              </ul> */}

            </div>
          </div>

          <div className="dashboard_right_ffamily">
            {/* <div className="dashboard_right_text"> */}
            <div className="uniform_bank_top">
              <div className="personal_info_part ebd_uq_top">
                <p className="ebd_uq_para"> The following Requisition forms are listed in this form, The Employee is expected to update the Required fields and submit.
                  List for forms is as below:  </p>
                <div className="ebd_uq_div">
                  <p> a.) Employee Bank Details Form  </p>
                  <p> b.) Employee Uniform Request Form </p>
                </div>
              </div>


              <div className="personal_info_part">
                <div className="uniform_bank_emp_bank">
                  <div className="uniform_bank_div clearfix">
                    <h3 style={{ float: "left" }}>a.) Employee Bank Details Form</h3>


                    <div className="header-title-units">
                      <ul>
                        <li>
                          Control Number: <b id="print-Bank-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Bank-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <table className="account_des_table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-center">
                            {" "}
                            Account description{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bankdetails_td">Employee Name </td>
                          <td>
                            <input
                              type="text"

                              id="NameofEmployeeuniform"
                              name="NameofEmployee"
                              className="form-control Bank_empname print-nameuser-dynamic Uniformviewmode common_fullname_disable"
                              autoComplete="off"
                            ></input>

                            <span
                              style={{ display: "none" }}
                              //  type="text"
                              id="NameofEmployees"
                              //name="NameofEmployee"
                              className="print-dyanmiclistname Uniformviewmode"
                            //  autoComplete="off"
                            ></span>

                            <span
                              className="error-validation error-table-validation"
                              id="err-nameofemployee"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Department </td>
                          <td>
                            {" "}
                            <span
                              //  type="text"
                              id="print-deptuniform"
                              //  name="Department"
                              className="Uniformviewmode"
                            //  autoComplete="off"
                            ></span>
                            <span
                              className="error-validation error-table-validation"
                              id="errdepartmentuniform"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Employee ID Number </td>
                          <td>
                            {" "}
                            <span
                              //  type="text"
                              id="print-EmployeeIduniform"
                              className="Uniformviewmode bankepmloyeeid"
                            //    autoComplete="off"
                            ></span>
                            <span
                              className="error-validation error-table-validation"
                              id="err-employeeiduniform"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="bankdetails_td">Date</td>
                          <td>
                            <span
                              //  type="date"
                              id="print-txt-dateuniform"
                              className="currenttxtdate Uniformviewmode"
                            //  autoComplete="off"
                            //  disabled
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <table className="month_salary-table">
                      <thead>
                        <tr>
                          <th colSpan={2}>
                            {" "}
                            OPTION 1:Kindly transfer my monthly salary as per the following{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody id="bnk-detalis">
                        <tr>
                          <td className="bankdetails_td">Bank Name </td>
                          <td>
                            <span
                              //  type="text"
                              id="print-BankName"
                              //  name="BankName"
                              className="Uniformviewmode"
                            //  autoComplete="off"
                            ></span>

                            <span
                              className="error-validation error-table-validation"
                              id="err-bankname"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Branch </td>
                          <td>
                            {" "}
                            <span
                              // type="text"
                              id="print-Branch"
                              //  name="Branch"
                              className="Uniformviewmode"
                            //  autoComplete="off"
                            ></span>
                            <span
                              className="error-validation error-table-validation"
                              id="err-Branch"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Address </td>
                          <td>
                            <span
                              id="print-Addressuniforminputbank"
                              className="Uniformviewmode"
                            // autoComplete="off"
                            ></span>

                            <span
                              className="error-validation error-table-validation"
                              id="err-Addressuniforminputbankbank"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Account No </td>
                          <td>
                            <span
                              //  type="text"
                              id="print-AccountNumber"
                              //  name="AccountNumber"
                              className="Uniformviewmode"
                            //  autoComplete="off"
                            ></span>

                            <span
                              className="error-validation error-table-validation"
                              id="err-accountnumber"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">IBAN Number </td>
                          <td>
                            <span
                              //  type="text"
                              id="print-IBANNumber"
                              //  name="IBANNumber"
                              className="Uniformviewmode"
                            //  autoComplete="off"
                            ></span>

                            <span
                              className="error-validation error-table-validation"
                              id="err-ibannumber"
                              style={{ color: "red", display: "none" }}
                            >
                              This field is mandatory.
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">Employee Signature</td>

                          <td></td>
                        </tr>

                        <tr>
                          <td className="bankdetails_td">
                            Note: Kindly attach a bank statement letter stating your Account Number and IBAN Number

                          </td>
                          <td>

                            <span id="print-Attact-bank-statementsList"></span>
                            <a data-interception='off'
                              href={`${printfilename}`}
                              //href={`${this.state.BankStatement}`}
                              style={{ display: "none" }}
                              className="bankstatement-shown"
                              target="_blank"
                            >
                              {/* click here */}
                            </a>

                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="signature-table_uniform_div">
                    <table className="signature-table_uniform">
                      <thead>
                        <tr>
                          <th className="option2" colSpan={2}>
                            OPTION 2: Authorize Company to open a Bank Account for
                            me:{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bankdetails_td">Employee Signature</td>

                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

              <div className="uniform_bank_emp_uniform personal_info_part" style={{ marginTop: "20px" }}>
                <div className="uniform_bank_div">
                  <div className="clearfix">

                    <h3 style={{ float: "left" }}>b.) Employee Uniform Request </h3>
                    <div className="header-title-units">
                      <ul >
                        <li>
                          Control Number: <b id="print-Uniform-Control-Number"></b>
                        </li>
                        <li>
                          Version: <b id="print-Uniform-Version-Number"></b>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        // type="date"
                        id="print-dateofrequestid"
                        className="print-control Uniformviewmode"
                      //  autoComplete="off"
                      ></span>
                      <span className="floating-label">Date of Request <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-daterequest"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="print-EmployeeNouniform"
                        //  name="EmployeeNo"
                        className="print-control Uniformviewmode"
                      //   autoComplete="off"
                      ></span>
                      <span className="floating-label ">Employee No <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-employeenouniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div id="print-nameofreq" className="form-group relative">
                      <input
                        type="text"
                        id="NameofRequestor"
                        name="NameofRequestor"
                        className="form-control Bank_empname Uniformviewmode common_fullname_disable"

                        autoComplete="off"
                      ></input>
                      <span className="floating-label ">Name of Requestor <i className="required">*</i></span>
                    </div>

                    <div
                      id="print-name-of-request"
                      style={{ display: "none" }}
                      className="form-group relative"
                    >
                      <span
                        //   type="text"
                        id="print-Nameof-Requestor"
                        //     name="NameofRequestor"
                        className="print-control name-request Uniformviewmode"

                      //   autoComplete="off"
                      ></span>
                      <span className="floating-label ">Name of Requestor</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-nameofrequestor"
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
                        //   type="date"
                        id="print-JoiningDateuniform"
                        //    name="JoiningDate"
                        className="print-control Uniformviewmode"
                      //  autoComplete="off"
                      //  disabled
                      ></span>
                      <span className="floating-label ">Joining Date</span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-joiningdate"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //    type="text"
                        id="print-JobTitleuniform"
                        //   name="JobTitle"
                        className="print-control Uniformviewmode"
                      ></span>
                      <span className="floating-label ">Job Title <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-jobtitleuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //  type="text"
                        id="print-Departmentuniformrequest"
                        //  name="Dept"
                        className="print-control Uniformviewmode"
                      ></span>
                      <span className="floating-label ">Department <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-Departmentuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>



                </div>
                <div className="row form">
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span id="print-Bankunifromset" className="Status print-control">
                        {/* <option value="Select">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option> */}
                      </span>
                      <span className="floating-label ">Gender <i className="required">*</i></span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-generuniformbank"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        //    type="date"
                        id="print-DateofLastUniformReceived"
                        //   name="DateofLastUniformReceived"
                        className="print-control Uniformviewmode"
                      //   autoComplete="off"
                      ></span>
                      <span className="floating-label ">
                        Date of Last Uniform Received
                      </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-dateoflastuniformreceived"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group relative">
                      <span
                        id="print-QuantityofUniform"
                        className="Status print-control"
                      >
                        {/* <option value="select">Select</option>
                      <option value="TwoSets">Two Sets</option>
                      <option value="ThreeSets">Three Sets</option> */}
                      </span>
                      <span className="floating-label ">Quantity of Uniform </span>
                    </div>
                    <span
                      className="error-validation"
                      id="err-quantityofuniform"
                      style={{ color: "red", display: "none" }}
                    >
                      This field is mandatory.
                    </span>
                  </div>
                </div>

                <div className="custom-table uniformrequest sec uniform_size_print">
                  <div className="table-wrapper-date clearfix">
                    <div className="table-search">
                      <h4 className="contact-pg-title print_uds">Uniform Description And Size</h4>
                    </div>
                    <div className="table-sort comments_qstn"></div>
                  </div>
                  <div className="uniformsize uniformtableitem" style={{ marginBottom: "20px" }}>
                    <table className="uniform-size_table-item">
                      <thead>
                        <tr>
                          <th className="uniform_bank_width">#</th>
                          <th>Title</th>
                          <th className="uniform_bank_width">XS </th>
                          <th className="uniform_bank_width">S</th>
                          <th className="uniform_bank_width">M </th>
                          <th className="uniform_bank_width">L </th>
                          <th className="uniform_bank_width">XL</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Blouse/Shirt</td>

                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Shirt_xs Uniformviewmode"
                            //autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Shirt_s Uniformviewmode"
                            //autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //   type="text"
                              className="print-Shirt_m Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //    type="text"
                              className="print-Shirt_l Uniformviewmode"
                            //autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //    type="text"
                              className="print-Shirt_xl Uniformviewmode"
                            //   autoComplete="off"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Trouser</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //   type="text"
                              className="print-Trouser_xs Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              // type="text"
                              className="print-Trouser_s Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Trouser_m Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Trouser_l Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Trouser_xl Uniformviewmode"
                            //    autoComplete="off"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>jacket</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-jacket_xs Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-jacket_s Uniformviewmode"
                            //    autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-jacket_m Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-jacket_l Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-jacket_xl Uniformviewmode"
                            //   autoComplete="off"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Coat</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Coat_xs Uniformviewmode"
                            //   autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Coat_s Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Coat_m Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Coat_l Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Coat_xl Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Waistcoat</td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Waistcoat_xs Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Waistcoat_s Uniformviewmode"
                            // autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Waistcoat_m Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Waistcoat_l Uniformviewmode"
                            //    autoComplete="off"
                            />{" "}
                          </td>
                          <td className="uniform_bank_width">
                            {" "}
                            <span
                              //  type="text"
                              className="print-Waistcoat_xl Uniformviewmode"
                            //  autoComplete="off"
                            />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {/* <div className="row form signature_part">
                      <div className="col-md-4">
                        <p> Employee Signature </p>
                      </div>
                      <div className="col-md-4">
                        <p> Signature Head of Dept. </p>
                      </div>
                    </div> */}

                    <div className="row form">
                      <div className="signature-new-wrap">
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">Employee Signature</span>
                            </div>
                          </div>
                        </div>
                        <div className="employee-signature">
                          <div className="form-group relative">
                            <div className="form-check">
                              <span className="form-check-label">Signature Head of Dept</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uf_bank_details">
                    <p>
                      {" "}
                      <span className="uniform_bank_snote">Note 1</span>: Employee
                      will not be entitled to replacement uniform(s) due to any
                      lapse in the information given by the employee on this
                      request form.
                    </p>
                    <p>
                      {" "}
                      <span className="uniform_bank_snote">Note 2</span>: Please
                      return the completed form to H.R.D
                    </p>
                    <p>
                      <span className="uniform_bank_snote">Note 3</span>: Blue
                      Scrub Suit Uniform will be provided by our internal tailor.
                    </p>
                  </div>
                </div>


                {/* <div className=" personal_info_part"> */}
                <div className="office_use_only">

                  <h3> For Official Use Only </h3>
                  {/* <div className="row form signature_part">
                    <div className="col-md-4">
                      <p> Checked by </p>
                    </div>
                    <div className="col-md-4">
                      <p> Received by </p>
                    </div>
                  </div> */}
                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Checked by</span>
                          </div>
                        </div>
                      </div>
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Received by</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row form signature_part">
                    <div className="col-md-4">
                      <p> Signature HR & Training Manager </p>
                    </div>
                    <div className="col-md-4">
                      <p> Signature Manager, Administration </p>
                    </div>
                  </div> */}
                  <div className="row form">
                    <div className="signature-new-wrap">
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Signature HR & Training Manager</span>
                          </div>
                        </div>
                      </div>
                      <div className="employee-signature">
                        <div className="form-group relative">
                          <div className="form-check">
                            <span className="form-check-label">Signature Manager, Administration</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
