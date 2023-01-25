import * as React from "react";
import styles from "./HrOnboardingForm.module.scss";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
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
import Sidenav from "../components/SideNav";
import Loa from "../components/letterofauthorization";
import EmployeeNda from "../components/NdaNewform";
import Conflictofinterest from "../components/coinewform";
import Cocform from "../components/cocnewform";
import Signform from "../components/Specimensignature";
import Personalinformation from "../components/Personalinfoform";
import Joinging from "../components/Joiningreportform";
import PolicyAcknowledgement from "../components/PolicyAcknowledgementDeclarations";
import Acknowledgmentpolicy from "../components/AcknowledgementPolicycovid";
import Uniformrequestbankdetils from "../components/Uniformrequestbankdetails";

import Ephysician from "../components/EPhysicianprofile";
import HRITPrivilegeform from "../components/HRITPrivilegeform"
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { nullRender } from "office-ui-fabric-react";
import * as _ from "lodash";
import PreExistingMedicalConditionForm from "./PreExistingMedicalConditionForm";
import Privilege from "../components/HRITPrivilegeform";
import IntegrityAndBenefit from "./IntegrityAndBenefit";
// import SpecimentSignature from "../../specimenSignatureNewForm/components/SpecimenSignatureNewForm";

//import Loa from "../../loaNewForm/components/LoaNewForm";
SPComponentLoader.loadScript(
  "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
);
SPComponentLoader.loadScript(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
);
SPComponentLoader.loadCss(
  "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
);
SPComponentLoader.loadCss(
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
);
SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
);
SPComponentLoader.loadCss(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=3.8"
);

SPComponentLoader.loadCss(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/print.css?v=3.8"
);
// SPComponentLoader.loadCss(
//   "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"9// );
// SPComponentLoader.loadScript(
//   "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
// );
// SPComponentLoader.loadScript(
//   "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
// );

SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"
);

SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-circle-progress/1.2.2/circle-progress.min.js"
);
export interface IOnboardingDashboardState {
  Item: any[];
  Totalprogress: any[];
  IsEmployee: boolean;
  IsUnitHR: boolean;
  IsGroupHR: boolean;
  IsHeadHR: boolean;
  UnitHrUnitDetails: string;
  GroupHRUnitDetails: string;
  OpenedFormMode: string;
  ONBSessionID: string;
  IsMasterSubmitDone: boolean;
  IsofficeNameispresent: boolean
}
const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
let currentuserName;

let Totalstatuscounting: any = [];
let totlaforms: any = [];
var modevalue;
var totallength: number = null;
var uniquesidvalues = "";
var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;

export default class OnboardingDashboard extends React.Component<
  IHrOnboardingFormProps,
  IOnboardingDashboardState,
  {}
> {
  constructor(props: IHrOnboardingFormProps, state: IOnboardingDashboardState) {
    super(props);
    this.state = {
      Item: [],
      Totalprogress: null,
      IsEmployee: true,
      IsUnitHR: false,
      IsGroupHR: false,
      IsHeadHR: false,
      UnitHrUnitDetails: "",
      GroupHRUnitDetails: "",
      OpenedFormMode: "",
      ONBSessionID: "",
      IsMasterSubmitDone: false,
      IsofficeNameispresent: false
    };
  }

  public componentDidMount() {
    this.showloader()
    this.GetCurrentUserOfficeName()
    const url: any = new URL(window.location.href);

    modevalue = url.searchParams.get("Mode");
    GlobalFormOpenedMode = url.searchParams.get("mdeopn");
    GlobalSessionIDValue = url.searchParams.get("glblsessid");
    EditSessionid = url.searchParams.get("glblsessid");
    this.Checkingemployeemastersubmitstatus(EditSessionid);
    this.GetCurrentUserEmailIDDetails();
    this.CheckingProgress();
    this.generateuniwueidforemployee();
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

    var formopenmde = url.searchParams.get("mdeopn");
    if (formopenmde == "Edit" || formopenmde == "edit") {
      $(".hr-dashboard-nextlink").show();
      $(".landng-page-nextlink").hide();
      this.setState({
        OpenedFormMode: "Edit",
      });
    } else if (formopenmde == "View" || formopenmde == "View") {
      $(".hr-dashboard-nextlink").show();
      $(".landng-page-nextlink").hide();
      this.setState({
        OpenedFormMode: "View",
      });
    }

    // this.GetInitatationinformationploicy();
    // this.GetAcknowledgmentcovidlistitem();
    this.GetCurrentUserId();
  }
  public GetCurrentUserOfficeName() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
        var Name = resultData.d.DisplayName;
        var Designation = resultData.d.Title;
        var properties = resultData.d.UserProfileProperties.results;
        for (var i = 0; i < properties.length; i++) {
          if (properties[i].Key == "Office") {
            var ofcname = properties[i].Value;
            setTimeout(() => {
              reacthandler.GetBussinessunitandcomparecurrentuser(ofcname)
            }, 500);


          }


        }
      },
      error: function (jqXHR, textStatus, errorThrown) { },
    });
  }

  public showloader() {
    $("#isloading-inprogress-loader").show();
    setTimeout(() => {
      this.showcontent();
    }, 4500);
  }
  public showcontent() {
    $(".after-loader-showcontent").show()
    $("#isloading-inprogress-loader").hide();
    $("#Show-error-message").show()
  }

  public GetBussinessunitandcomparecurrentuser(ofcname) {

    if (GlobalFormOpenedMode == "New") {
      newweb.lists
        .getByTitle("Business Unit Master")
        .items.select("ID", "Title", "UnitLogo")
        .filter(`Title eq '${ofcname}'`)
        .get()
        .then((results) => {
          if (results.length != 0) {

            this.setState({
              IsofficeNameispresent: true
            });

          }


        });
    } else {
      this.setState({
        IsofficeNameispresent: true
      });
    }
  }




  public GetCurrentUserEmailIDDetails() {
    var reacthandler = this;
    $.ajax({
      url: `${reacthandler.props.siteurl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function (resultData) {
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
            this.GetInitatationinformation(response[0].ONBSessionID, FormMode);
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

            this.GetInitatationinformation(response[0].ONBSessionID, FormMode);
          }
        });
    }
  }

  public Checkingemployeemastersubmitstatus(sessid) {

    newweb.lists
      .getByTitle("Employee Initiation Onboarding Master")
      .items.select("ID", "ONBSessionID", "Status")
      .filter("ONBSessionID eq '" + sessid + "' and Status eq 'Completed'")
      .get()
      .then((response) => {
        if (response.length != 0) {
          this.setState({ IsMasterSubmitDone: true });
        }
      });
  }

  public GetCurrentUserId() {
    var reacthandler = this;
    let curruser = newweb.currentUser.get().then(function (res) {

      var loacurrentuserid = res.Id;

      reacthandler.Getcheckuserpermissioncancelbtn(res.Id);
    });
  }

  public async Getcheckuserpermissioncancelbtn(loaid) {
    //Unit hr
    await newweb.lists
      .getByTitle("UNIT HR MASTER")
      .items.select("Name/Id", "Business/Title")
      .expand("Name", "Business")
      .filter(`Name/Id eq ${loaid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          $(".unithrnextbtn").show();
          $(".employeenextbtn").hide();

          $("#covid-employee-cancel-btn").hide();
          $("#covid-hr-cancel-btn").show();

          $("#cancelbtn-newhire").hide();
          $("#cancelbtn-hr").show();

          $(".ndaunithrcancelbtn").show();
          $(".ndaemployeecancelbtn").hide();

          $("#emp-coc-cancele-btn").hide();
          $("#hr-coc-cancele-btn").show();

          $("coi-emp-Cancelbtn").hide();
          $("#coi-hr-Cancelbtn").show();

          $("#emp-ephy-btn").hide();
          $("#hr-ephy-btn").show();

          $("#empcancel-btn-join").hide();
          $("#hr-cancel-btn-join").show();

          $("#emp-btn-loa").hide();
          $("#hr-btn-loa").show();

          $("#unit-hr-cancel-btn").show();
          $("#user-cancel-btn").hide();

          $("#sign-emp-btn").hide();
          $("#sign-hr-btn").show();

          $("#emp-uniformbtn").hide();
          $("#hr-uniformbtn").show();
          this.setState({
            IsUnitHR: true,
            IsEmployee: false,
            UnitHrUnitDetails: response[0].Business.Title,
          });
        } else {
          $(".unithrnextbtn").hide();
          $(".employeenextbtn").show();

          $("#covid-employee-cancel-btn").show();
          $("#covid-hr-cancel-btn").hide();
          $("#cancelbtn-newhire").show();
          $("#cancelbtn-hr").hide();
          $(".ndaunithrcancelbtn").hide();
          $(".ndaemployeecancelbtn").show();

          $("#emp-coc-cancele-btn").show();
          $("#hr-coc-cancele-btn").hide();

          $("coi-emp-Cancelbtn").show();
          $("#coi-hr-Cancelbtn").hide();

          $("#emp-ephy-btn").show();
          $("#hr-ephy-btn").hide();

          $("#empcancel-btn-join").show();
          $("#hr-cancel-btn-join").hide();

          $("#emp-btn-loa").show();
          $("#hr-btn-loa").hide();

          $("#unit-hr-cancel-btn").hide();
          $("#user-cancel-btn").show();

          $("#sign-emp-btn").show();
          $("#sign-hr-btn").hide();

          $("#emp-uniformbtn").show();
          $("#hr-uniformbtn").hide();
        }
      });

    //Group hr
    await newweb.lists
      .getByTitle("Group Hr Manager Master")
      .items.select("Name/Id")
      .expand("Name")
      .filter(`Name/Id eq ${loaid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          $(".unithrnextbtn").show();
          $(".employeenextbtn").hide();
          $("#covid-employee-cancel-btn").hide();
          $("#covid-hr-cancel-btn").show();
          $("#cancelbtn-newhire").hide();
          $("#cancelbtn-hr").show();
          $(".ndaunithrcancelbtn").show();
          $(".ndaemployeecancelbtn").hide();

          $("#emp-coc-cancele-btn").hide();
          $("#hr-coc-cancele-btn").show();

          $("coi-emp-Cancelbtn").hide();
          $("#coi-hr-Cancelbtn").show();

          $("#emp-ephy-btn").hide();
          $("#hr-ephy-btn").show();

          $("#empcancel-btn-join").hide();
          $("#hr-cancel-btn-join").show();

          $("#emp-btn-loa").hide();
          $("#hr-btn-loa").show();

          $("#unit-hr-cancel-btn").show();
          $("#user-cancel-btn").hide();

          $("#sign-emp-btn").hide();
          $("#sign-hr-btn").show();

          $("#emp-uniformbtn").hide();
          $("#hr-uniformbtn").show();
          var grphrunitdetails = response[0].Business;
          var temparr = [];
          var allunits = "";
          // for (var i = 0; i < grphrunitdetails.length; i++) {
          //   temparr.push(grphrunitdetails[i].Title);
          //   allunits = temparr.join(",");
          // }
          this.setState({
            IsGroupHR: true,
            IsEmployee: false,
            //  GroupHRUnitDetails: allunits,
          });
        } else {
          $(".unithrnextbtn").hide();
          $(".employeenextbtn").show();
          $("#covid-employee-cancel-btn").show();
          $("#covid-hr-cancel-btn").hide();
          $("#cancelbtn-newhire").show();
          $("#cancelbtn-hr").hide();
          $(".ndaunithrcancelbtn").hide();
          $(".ndaemployeecancelbtn").show();
          $("#emp-coc-cancele-btn").show();
          $("#hr-coc-cancele-btn").hide();

          $("coi-emp-Cancelbtn").show();
          $("#coi-hr-Cancelbtn").hide();

          $("#emp-ephy-btn").show();
          $("#hr-ephy-btn").hide();

          $("#empcancel-btn-join").show();
          $("#hr-cancel-btn-join").hide();

          $("#emp-btn-loa").show();
          $("#hr-btn-loa").hide();

          $("#unit-hr-cancel-btn").hide();
          $("#user-cancel-btn").show();

          $("#sign-emp-btn").show();
          $("#sign-hr-btn").hide();

          $("#emp-uniformbtn").show();
          $("#hr-uniformbtn").hide();
        }
      });

    //Head HR
    await newweb.lists
      .getByTitle("Group Head Hr Master")
      .items.select("Name/Id")
      .expand("Name")
      .filter(`Name/Id eq ${loaid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          $(".unithrnextbtn").show();
          $(".employeenextbtn").hide();

          $("#covid-employee-cancel-btn").hide();
          $("#covid-hr-cancel-btn").show();
          $("#cancelbtn-newhire").hide();
          $("#cancelbtn-hr").show();
          $(".ndaunithrcancelbtn").show();
          $(".ndaemployeecancelbtn").hide();

          $("#emp-coc-cancele-btn").hide();
          $("#hr-coc-cancele-btn").show();

          $("coi-emp-Cancelbtn").hide();
          $("#coi-hr-Cancelbtn").show();

          $("#emp-ephy-btn").hide();
          $("#hr-ephy-btn").show();

          $("#empcancel-btn-join").hide();
          $("#hr-cancel-btn-join").show();

          $("#emp-btn-loa").hide();
          $("#hr-btn-loa").show();

          $("#unit-hr-cancel-btn").show();
          $("#user-cancel-btn").hide();

          $("#sign-emp-btn").hide();
          $("#sign-hr-btn").show();

          $("#emp-uniformbtn").hide();
          $("#hr-uniformbtn").show();
          this.setState({
            IsHeadHR: true,
            IsEmployee: false,
          });
        } else {
          $(".unithrnextbtn").hide();
          $(".employeenextbtn").show();
          $("#covid-employee-cancel-btn").show();
          $("#covid-hr-cancel-btn").hide();
          $("#cancelbtn-newhire").show();
          $("#cancelbtn-hr").hide();
          $(".ndaunithrcancelbtn").hide();
          $(".ndaemployeecancelbtn").show();

          $("#emp-coc-cancele-btn").show();
          $("#hr-coc-cancele-btn").hide();

          $("coi-emp-Cancelbtn").show();
          $("#coi-hr-Cancelbtn").hide();

          $("#emp-ephy-btn").show();
          $("#hr-ephy-btn").hide();

          $("#empcancel-btn-join").show();
          $("#hr-cancel-btn-join").hide();

          $("#emp-btn-loa").show();
          $("#hr-btn-loa").hide();

          $("#unit-hr-cancel-btn").hide();
          $("#user-cancel-btn").show();

          $("#sign-emp-btn").show();
          $("#sign-hr-btn").hide();

          $("#emp-uniformbtn").show();
          $("#hr-uniformbtn").hide();
        }
      });
  }

  public async GetInitatationinformation(ONBSessionID, FormMode) {
    await newweb.lists
      .getByTitle("Employee Initiation Onboarding Master")
      .items.filter(`ONBSessionID eq '${ONBSessionID}'`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          if (response[0].Status == "Completed") {
            //for hr

            //
            $(".MasterSubmit").remove();
            $(".dyanmic_btn-mastersubmit").remove();
          } else {
            this.CheckingStatus(ONBSessionID);
          }
        } else {
          // this.CheckingStatus();
        }
      });
  }

  public async CheckingStatus(ONBSessionID) {
    var loa = "LETTER OF AUTHORIZATION";
    var nda = "EMPLOYEE NON-DISCLOSURE AGREEMENT";
    var coc = "EMPLOYEE CODE OF CONDUCT & ETHICS";
    var spicement = "SPECIMEN SIGNATURE FORM";
    var Coi = "CONFLICT OF INTEREST";
    var personal = "PERSONAL INFORMATION FORM";
    var join = "JOINING REPORT";
    var policy = "POLICY ACKNOWLEDGMENT AND DECLARATION";
    var generalit = "ACKNOWLEDGMENT POLICY AND DECLARATION AND GENERAL IT";
    var Bankdetalis = "UNIFORM REQUEST BANK DETAILS";
    var ephysician = "EPHYSICAN PROFILE";
    var category;
    var MasterArray: any = [];
    var onboardingTransectionArray: any = [];
    // await newweb.lists
    //   .getByTitle("Onboarding Transaction Master")
    //   .items.filter(`AssignedTo/Id eq ${this.props.UserId}`)
    //   .get()
    //   .then((response) => {

    //     for (var i = 0; i < response.length; i++) {

    //       var Status0 = response[0].Status;
    //       var Status1 = response[1].Status;
    //       var Status2 = response[2].Status;
    //       var Status3 = response[3].Status;
    //       var Status4 = response[4].Status;
    //       var Status5 = response[5].Status;
    //       var Status6 = response[6].Status;
    //       var Status7 = response[7].Status;
    //       var Status8 = response[8].Status;
    //       var Status9 = response[9].Status;
    //       var Status10 = response[10].Status;

    //       if (
    //         Status10 == "Completed" &&
    //         Status9 == "Completed" &&
    //         Status8 == "Completed" &&
    //         Status7 == "Completed" &&
    //         Status6 == "Completed" &&
    //         Status5 == "Completed" &&
    //         Status4 == "Completed" &&
    //         Status3 == "Completed" &&
    //         Status2 == "Completed" &&
    //         Status1 == "Completed" &&
    //         Status0 == "Completed"
    //       ) {
    //         $(".dyanmic_btn-mastersubmit").hide();
    //         $(".MasterSubmit").show();
    //       }
    //     }

    //   });

    await newweb.lists
      .getByTitle("Personal Information Master")
      .items.select("Author/Id", "Category", "ID")
      .filter(`ONBSessionID eq '${ONBSessionID}'`)
      .expand("Author")
      .get()
      .then(async (response) => {
        if (response.length != 0) {
          category = response[0].Category;
        }
      })
      //.then(async () => {
      //   await newweb.lists
      //     .getByTitle("Category Master")//"Email eq '" + userEmail + "'" `CategoryName eq ${category}`
      //     .items.select("CategoryName", "FormsName", "ID", "Title").filter("CategoryName eq '" + category + "'")
      //     .get()
      //     .then((response) => {
      //       MasterArray.push(response[0].FormsName)
      //     });
      // })
      .then(async () => {
        if (category == "Allied") {
          await newweb.lists
            .getByTitle("Onboarding Transaction Master")
            .items.select("ID", "Status", "Title")
            .filter(
              `ONBSessionID eq '${ONBSessionID}' and Title ne 'EPHYSICAN PROFILE'`
            )
            .get()
            .then((response) => {
              for (var i = 0; i < response.length; i++) {
                var Status0 = response[0].Status;
                var Status1 = response[1].Status;
                var Status2 = response[2].Status;
                var Status3 = response[3].Status;
                var Status4 = response[4].Status;
                var Status5 = response[5].Status;
                var Status6 = response[6].Status;
                var Status7 = response[7].Status;
                var Status8 = response[8].Status;
                var Status9 = response[9].Status;
                var Status10 = response[10].Status;
                var Status11 = response[11].Status;

                if (
                  Status11 == "Completed" &&
                  Status10 == "Completed" &&
                  Status9 == "Completed" &&
                  Status8 == "Completed" &&
                  Status7 == "Completed" &&
                  Status6 == "Completed" &&
                  Status5 == "Completed" &&
                  Status4 == "Completed" &&
                  Status3 == "Completed" &&
                  Status2 == "Completed" &&
                  Status1 == "Completed" &&
                  Status0 == "Completed"
                ) {
                  $(".dyanmic_btn-mastersubmit").hide();
                  $(".MasterSubmit").show();
                }
              }
            });
        } else if (category == "Support") {
          //("ss")
          await newweb.lists
            .getByTitle("Onboarding Transaction Master")
            .items.select("ID", "Status", "Title")
            .filter(
              `ONBSessionID eq '${ONBSessionID}' and Title ne 'EPHYSICAN PROFILE' and Title ne 'POLICY ACKNOWLEDGMENT AND DECLARATION'`
            )
            .get()
            .then((response) => {
              for (var i = 0; i < response.length; i++) {
                var Status0 = response[0].Status;
                var Status1 = response[1].Status;
                var Status2 = response[2].Status;
                var Status3 = response[3].Status;
                var Status4 = response[4].Status;
                var Status5 = response[5].Status;
                var Status6 = response[6].Status;
                var Status7 = response[7].Status;
                var Status8 = response[8].Status;
                var Status9 = response[9].Status;
                var Status10 = response[10].Status;

                if (
                  Status10 == "Completed" &&
                  Status9 == "Completed" &&
                  Status8 == "Completed" &&
                  Status7 == "Completed" &&
                  Status6 == "Completed" &&
                  Status5 == "Completed" &&
                  Status4 == "Completed" &&
                  Status3 == "Completed" &&
                  Status2 == "Completed" &&
                  Status1 == "Completed" &&
                  Status0 == "Completed"
                ) {
                  $(".dyanmic_btn-mastersubmit").hide();
                  $(".MasterSubmit").show();
                }
              }
            });
        } else if (category == "Nursing") {
          //("nnnnn")
          await newweb.lists
            .getByTitle("Onboarding Transaction Master")
            .items.select("ID", "Status", "Title")
            .filter(
              `ONBSessionID eq '${ONBSessionID}' and Title ne 'EPHYSICAN PROFILE'`
            )
            .get()
            .then((response) => {
              for (var i = 0; i < response.length; i++) {

                var Status0 = response[0].Status;
                var Status1 = response[1].Status;
                var Status2 = response[2].Status;
                var Status3 = response[3].Status;
                var Status4 = response[4].Status;
                var Status5 = response[5].Status;
                var Status6 = response[6].Status;
                var Status7 = response[7].Status;
                var Status8 = response[8].Status;
                var Status9 = response[9].Status;
                var Status10 = response[10].Status;
                var Status11 = response[11].Status;

                if (
                  Status11 == "Completed" &&
                  Status10 == "Completed" &&
                  Status9 == "Completed" &&
                  Status8 == "Completed" &&
                  Status7 == "Completed" &&
                  Status6 == "Completed" &&
                  Status5 == "Completed" &&
                  Status4 == "Completed" &&
                  Status3 == "Completed" &&
                  Status2 == "Completed" &&
                  Status1 == "Completed" &&
                  Status0 == "Completed"
                ) {
                  $(".dyanmic_btn-mastersubmit").hide();
                  $(".MasterSubmit").show();
                }
              }
            });
        } else if (category == "Administration") {
          //("aaaaa")
          await newweb.lists
            .getByTitle("Onboarding Transaction Master")
            .items.select("ID", "Status", "Title")
            .filter(
              `ONBSessionID eq '${ONBSessionID}' and Title ne 'EPHYSICAN PROFILE' and Title ne 'POLICY ACKNOWLEDGMENT AND DECLARATION'`
            )
            .get()
            .then((response) => {
              for (var i = 0; i < response.length; i++) {
                var Status0 = response[0].Status;
                var Status1 = response[1].Status;
                var Status2 = response[2].Status;
                var Status3 = response[3].Status;
                var Status4 = response[4].Status;
                var Status5 = response[5].Status;
                var Status6 = response[6].Status;
                var Status7 = response[7].Status;
                var Status8 = response[8].Status;
                var Status9 = response[9].Status;
                var Status10 = response[10].Status;

                if (
                  Status10 == "Completed" &&
                  Status9 == "Completed" &&
                  Status8 == "Completed" &&
                  Status7 == "Completed" &&
                  Status6 == "Completed" &&
                  Status5 == "Completed" &&
                  Status4 == "Completed" &&
                  Status3 == "Completed" &&
                  Status2 == "Completed" &&
                  Status1 == "Completed" &&
                  Status0 == "Completed"
                ) {
                  $(".dyanmic_btn-mastersubmit").hide();
                  $(".MasterSubmit").show();
                }
              }
            });
        } else if (category == "Clinicians") {
          //("ccccccc")
          await newweb.lists
            .getByTitle("Onboarding Transaction Master")
            .items.select("ID", "Status", "Title")
            .filter(`ONBSessionID eq '${ONBSessionID}'`)
            .get()
            .then((response) => {
              for (var i = 0; i < response.length; i++) {
                var Status0 = response[0].Status;
                var Status1 = response[1].Status;
                var Status2 = response[2].Status;
                var Status3 = response[3].Status;
                var Status4 = response[4].Status;
                var Status5 = response[5].Status;
                var Status6 = response[6].Status;
                var Status7 = response[7].Status;
                var Status8 = response[8].Status;
                var Status9 = response[9].Status;
                var Status10 = response[10].Status;
                var Status11 = response[11].Status;
                var Status12 = response[12].Status;

                if (
                  Status12 == "Completed" &&
                  Status11 == "Completed" &&
                  Status10 == "Completed" &&
                  Status9 == "Completed" &&
                  Status8 == "Completed" &&
                  Status7 == "Completed" &&
                  Status6 == "Completed" &&
                  Status5 == "Completed" &&
                  Status4 == "Completed" &&
                  Status3 == "Completed" &&
                  Status2 == "Completed" &&
                  Status1 == "Completed" &&
                  Status0 == "Completed"
                ) {
                  //("hi")
                  $(".dyanmic_btn-mastersubmit").hide();
                  $(".MasterSubmit").show();
                }
              }
            });
        }
      });
  }

  public async mastersubmit() {
    // this.generateuniqueid();
    await newweb.lists
      .getByTitle("Employee Initiation Onboarding Master")
      .items.filter(`ONBSessionID eq '${this.state.ONBSessionID}'`)
      .get()
      .then((response) => {
        newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.getById(response[0].Id)
          .update({
            Status: "Completed",
            EmployeeUniqueId: uniquesidvalues,
            StatusbyUnitHR: "Inprogress",
          })
          .then(() => {
            $(".MasterSubmit").hide();
            $(".dyanmic_btn-mastersubmit").hide();
            $(".Updatebycurrentuser").hide();
            swal({
              title: "Onboarding submitted to the HR",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            } as any).then(async () => {
              setTimeout(() => {
                location.reload();
              }, 1500);
            });
          });
      });
  }

  public ChangeHRSubmissionStatusinInitiationMaster() {
    const url: any = new URL(window.location.href);
    var formopenmde = url.searchParams.get("initid");
    var intid: number = parseInt(formopenmde);
    var OnboardingSessionId: string = url.searchParams.get("glblsessid");
    var UserinitationId: number;
    newweb.lists
      .getByTitle("Employee Initiation Onboarding Master")
      .items.select("ID", "ONBSessionID")
      .filter("ONBSessionID eq '" + OnboardingSessionId + "'")
      .get()
      .then((response) => {
        UserinitationId = response[0].ID;

      })
      .then(() => {
        swal({
          title: "Are you sure?",
          text: "Do you want to complete the process?",
          icon: "warning",
          buttons: ["Cancel", "Yes"],
          dangerMode: true,
          closeOnClickOutside: false,
        } as any).then((willDelete) => {
          if (willDelete) {
            newweb.lists
              .getByTitle("Employee Initiation Onboarding Master")
              .items.getById(UserinitationId)
              .update({
                StatusbyUnitHR: "Completed",
              })
              .then(() => {
                swal({
                  title: "Onboarding completed to the employee",
                  icon: "success",
                }).then(() => {
                  location.href =
                    "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView";
                });
              });
          }
        });
      });
  }

  public async CheckingProgress() {
    // this.progressbaritem();
    await newweb.lists
      .getByTitle("Onboarding Transaction Master")
      .items.filter(`AssignedTo/Id eq ${this.props.UserId}`)
      .get()
      .then((response) => {

        for (var i = 0; i < response.length; i++) {
          if (response[i].Status == "Completed") {
            Totalstatuscounting.push(response[i]);
          }
          this.setState({
            Totalprogress: Totalstatuscounting.length,
          });
        }
        var totallengtsh = Totalstatuscounting.length * 100;
        totallength = Totalstatuscounting.length;

        var psent: any = totallengtsh / 11 + "%";

        const percentage = (totallengtsh / 11).toLocaleString("en", {
          style: "percent",
        });
      });

    await newweb.lists
      .getByTitle("Onboarding Form Master")
      .items.get()
      .then((response) => {


        totlaforms.push(response.length);

      });
  }

  public generateuniwueidforemployee() {
    var pwd;
    var uniqueid = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(2, 8);

    var newdate: any = new Date().getTime();

    const generateRandomString = (length = 10) =>
      Math.random().toString(20).substr(2, length);

    let x = generateRandomString();
    uniquesidvalues = "BHL" + x;
  }


  public render(): React.ReactElement<IHrOnboardingFormProps> {
    // const Progress:JSX.Element[]=this.state.Totalprogress.map(function(pitems,key){

    //   return(

    //        )
    // })
    return (
      <div className={styles.hrOnboardingForm} id="hr-on-boarding-forscroll">
        <div className="containers relatives">
          <div className="section-rigth">

            <div className="inner-page-contents">
              <div className="sec">
                <div className="dashboard_section clearfix">
                  {/* <div className="heading">
                    <a href="#">
                      <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/next.png" />
                    </a>
                    <span>Onboarding </span>
                  </div> */}
                  <div
                    style={{ width: "80px", display: "none" }}
                    className="Hrformcircularbar"
                  >
                    <CircularProgressbar
                      value={36}
                      text={`${totallength}%`}
                      maxValue={11}
                      styles={buildStyles({
                        rotation: 0,
                        strokeLinecap: "butt",
                        textSize: "22px",
                        pathTransitionDuration: 0.5,
                        pathColor: `#f46d65`, //Red
                        textColor: "#333333",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>

                  <div className="dashboard_left">
                    <div className="heading">
                      <a
                        data-interception="off"
                        target="_self"
                        className="hr-dashboard-nextlink"
                        style={{ display: "none" }}
                        href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView"
                      >
                        <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/next.png" />
                      </a>

                      <a
                        data-interception="off"
                        target="_self"
                        className="landng-page-nextlink"
                        href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView"
                      >
                        <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/next.png" />
                      </a>
                      <span>Onboarding </span>
                    </div>
                    <Sidenav
                      description={""}
                      siteurl={this.props.siteurl}
                      UserId={this.props.UserId}
                    />
                    {GlobalFormOpenedMode != "View" &&
                      GlobalFormOpenedMode != "Edit" && (
                        <>
                          <div className="dyanmic_btn-mastersubmit">
                            <button
                              type="button"
                              className="disable_mode-master-submit"
                              disabled
                            >
                              Submit My Onboarding
                            </button>
                          </div>
                          <div
                            style={{ display: "none" }}
                            className="MasterSubmit dashboard_btn"
                          >
                            <button
                              className="dashboard_submit_btn"
                              onClick={() => this.mastersubmit()}
                            >
                              Submit My Onboarding
                            </button>
                          </div>
                        </>
                      )}
                    {GlobalFormOpenedMode == "Edit" && (
                      <div
                        className="hr-click-to-complete-onb"
                        style={{ marginTop: "20px" }}
                      >
                        {this.state.IsMasterSubmitDone &&
                          this.state.IsMasterSubmitDone == true ? (
                          <button
                            id="cilck-complete-btn-enable"
                            className="dashboard_submit_btn"
                            onClick={() =>
                              this.ChangeHRSubmissionStatusinInitiationMaster()
                            }
                          >
                            Click to Complete
                          </button>
                        ) : (
                          <button
                            style={{ cursor: "no-drop" }}
                            id="cilck-to-complete-btn-disabled"
                            className="dashboard_submit_btn"
                          >
                            Click to Complete
                          </button>
                        )}
                      </div>
                    )}
                    {/* <button  className="dashboard_submit_btn btn-block" onClick={() => this.generateuniqueid()}>
             generate </button> */}
                  </div>
                  {this.state.IsofficeNameispresent && this.state.IsofficeNameispresent == true ?
                    <div style={{ display: "none" }} className="dashboard_right after-loader-showcontent" id="dashboard_right-print">
                      <div id="loaform" style={{ display: "none" }}>
                        <Loa
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div style={{ display: "none" }} id="Employeenda">
                        <EmployeeNda
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div id="specimensignatue" style={{ display: "none" }}>
                        <Signform
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div style={{ display: "none" }} id="coimain">
                        <Conflictofinterest
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div style={{ display: "none" }} id="Codeconduct">
                        <Cocform
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div id="personalinfomation">
                        <Personalinformation
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                          context={this.props.context}
                        />
                      </div>
                      <div id="joiningreport" style={{ display: "none" }}>
                        <Joinging
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div id="ploicy-acknowledgment" style={{ display: "none" }}>
                        <PolicyAcknowledgement
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                          context={this.props.context}
                        />
                      </div>
                      <div id="ackcovid" style={{ display: "none" }}>
                        <Acknowledgmentpolicy
                          description={""}
                          siteurl={this.props.siteurl}
                          UserId={this.props.UserId}
                          context={this.props.context} />
                      </div>
                      <div id="uniforbankdetails" style={{ display: "none" }}>
                        <Uniformrequestbankdetils
                          description={""}
                          siteurl={""}
                          UserId={this.props.UserId}
                          context={this.props.context}
                        />
                      </div>
                      <div id="ephysicianform" style={{ display: "none" }}>
                        <Ephysician
                          description={""}
                          siteurl={""}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div id="hr-it-privilegeform" style={{ display: "none" }}>
                        <Privilege
                          description={""}
                          siteurl={""}
                          UserId={this.props.UserId} context={this.props.context} />
                      </div>
                      <div id="pre-existing-medical-condition-form" style={{ display: "none" }}>
                        <PreExistingMedicalConditionForm
                          description={""}
                          siteurl={""}
                          UserId={this.props.UserId}
                        />
                      </div>
                      <div id="integrity-and-benefit" style={{ display: "none" }}>
                        <IntegrityAndBenefit description={""} siteurl={this.props.siteurl} UserId={this.props.UserId} />
                      </div>

                    </div>
                    :
                    <div className="dashboard_right" id="Show-error-message" style={{ display: "none" }}>
                      <p className="error-unitname-text">Your business unit name is incorrect. Please contact to HR team.</p>
                    </div>
                  }
                </div>
              </div>
            </div>


          </div>
        </div>

        <div style={{ display: "none" }} id="isloading-inprogress-loader">
          <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/Loader/loader-hrform.gif"></img>
        </div>
      </div>

    );
  }
}
