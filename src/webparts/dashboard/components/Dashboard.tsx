import * as React from "react";
import styles from "./Dashboard.module.scss";
import { IDashboardProps } from "./IDashboardProps";
import { escape, toArray } from "@microsoft/sp-lodash-subset";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import "@pnp/sp/site-users";
import Loadashboard from "../components/letterDashboard";
import EmployeeNdadashboard from "../components/NdaDashboard";
import Cocdashboard from "../components/cocDashboard";
import SpecimentSignaturedashboard from "../components/signDashboard";
import CoiDashboard from "../components/coiDashboards";
import Sidedashboardnav from "../components/dashboardsidenav";
import Personaldashboards from "../components/personalinfomation"

import JoiningReportdashboard from "../components/joiningreport"

import Policyack from "../components/policyacknowledgmentdashboard"
import Bankdetailsdashboard from "../components/UniformRequestbankdetailsdashboard"
import AcknowledgmentPolicyCovid from "../components/AcknowledgmentpolicyCovidDashboard"
import Ephyprofile from "../components/Ephysiciandashboad"
import Hritprivilegeform from "../components/ITPrivlage"
import PreExistDashboard from "./PreExistDashboard";
import IntegrityDashboard from "./IntegrityAndBenefitDash";
import { Item } from "@pnp/sp/items";

SPComponentLoader.loadCss(
  `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
);
SPComponentLoader.loadCss(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=3.8"
);
export interface IDashboardstate {
  Items: any[];
  TotalCountitem: number;
  InProgresscount: number;
  Completedcount: number;
  EmpInProgresscount: number;
  HRInProgresscount: number;
  UnitHrUnitDetails: string;
  GroupHRUnitDetails: string;
}

const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);

let completed: any = [];
let Total = [];
let Inprogres: any = [];
const HrUnitNames = [];
export default class LoaNewForm extends React.Component<
  IDashboardProps,
  IDashboardstate,
  {}
> {
  constructor(props: IDashboardProps, state: IDashboardstate) {
    super(props);
    this.state = {
      Items: [],
      TotalCountitem: 0,
      InProgresscount: 0,
      Completedcount: 0,
      EmpInProgresscount: 0,
      HRInProgresscount: 0,
      UnitHrUnitDetails: '',
      GroupHRUnitDetails: ''
    };

  }

  public componentDidMount() {
    this.GetCurrentUserID()
    $(".headerRow-45").hide();
    $(".spAppAndPropertyPanelContainer .sp-appBar").hide();
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
    $(".personaltitle").addClass("current");
    //  this.StatusCounting();

    this.showloader()
  }







  public showloader() {
    $("#isloading-inprogress-fordashboard").show();
    setTimeout(() => {
      this.showcontent();
    }, 6000);
  }
  public showcontent() {
    $(".show-dashboardcontent").show()
    $("#isloading-inprogress-fordashboard").hide();
  }






  public GetCurrentUserID() {
    var reacthandler = this;
    let curruser = newweb.currentUser.get().then(function (res) {
      //(res);
      var loacurrentuserid = res.Id;
      reacthandler.GetBusinessUnitfromInitation(loacurrentuserid);

    })
  }
  public async GetBusinessUnitfromInitation(currentuserid) {

    let IsUnitHR = false;
    let IsGroupHR = false;
    let IsHeadHR = false;

    //Unit hr
    await newweb.lists
      .getByTitle("UNIT HR MASTER")
      .items.select("Name/Id", "Business/Title")
      .expand("Name", "Business")
      .filter(`Name/Id eq ${currentuserid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          IsUnitHR = true;
          this.setState({
            UnitHrUnitDetails: response[0].Business.Title,
          });
          for (var i = 0; i < response.length; i++) {

            if (HrUnitNames.indexOf(response[i].Business.Title) == -1) {
              HrUnitNames.push(response[i].Business.Title)
            }
          }
          this.StatusCounting("UnitHR");
        }
      });

    //Group hr
    await newweb.lists
      .getByTitle("Group Hr Manager Master")
      .items.select("Name/Id", "Business/Title")
      .expand("Name", "Business")
      .filter(`Name/Id eq ${currentuserid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {

          IsGroupHR = true;
          this.setState({
            GroupHRUnitDetails: response[0].Business.Title,
          });
          this.StatusCounting("GroupHR");
        }
      });

    //Head HR
    await newweb.lists
      .getByTitle("Group Head Hr Master")
      .items.select("Name/Id")
      .expand("Name")
      .filter(`Name/Id eq ${currentuserid}`)
      .get()
      .then((response) => {
        if (response.length != 0) {
          IsHeadHR = true;
          this.StatusCounting("HRHead");
        }
      });

    if (IsHeadHR) {
      this.StatusCounting("HRHead");
    } else if (IsUnitHR && IsGroupHR == false) {
      this.StatusCounting("UnitHR");
    } else if (IsUnitHR == false && IsGroupHR) {
      this.StatusCounting("GroupHR");
    } else if (IsUnitHR && IsGroupHR) {
      this.StatusCounting("GroupHR-UnitHR");
    }
  }


  public async StatusCounting(viewmode) {

    if (viewmode == "UnitHR") {
      var TotalCountitem = 0
      var EmpInProgresscount = 0
      var HRInProgresscount = 0
      var Completedcount = 0

      for (var i = 0; i < HrUnitNames.length; i++) {
        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master").
          items.select("ID", "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            TotalCountitem += response.length

          });


        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Status eq 'InProgress' and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            EmpInProgresscount += response.length

          });
        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Inprogress'and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            HRInProgresscount += response.length

          });


        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Completed' and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            Completedcount += response.length

          });
      }

      this.setState({
        TotalCountitem: TotalCountitem,
        EmpInProgresscount: EmpInProgresscount,
        HRInProgresscount: HRInProgresscount,
        Completedcount: Completedcount
      });

    }
    else if (viewmode == "GroupHR") {
      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master").
        items.select("ID", "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Bussiness_x0020_Unit/Title eq '" + this.state.GroupHRUnitDetails + "'").get().then((response) => {
          //(response);

          this.setState({
            TotalCountitem: response.length,

          });
        });


      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Status eq 'InProgress' and Bussiness_x0020_Unit/Title eq '" + this.state.GroupHRUnitDetails + "'").get().then((response) => {
          //(response);

          this.setState({
            EmpInProgresscount: response.length,

          });
        });
      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Inprogress'and Bussiness_x0020_Unit/Title eq '" + this.state.GroupHRUnitDetails + "'").get().then((response) => {
          //(response);
          this.setState({
            HRInProgresscount: response.length,

          });
        });


      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Completed' and Bussiness_x0020_Unit/Title eq '" + this.state.GroupHRUnitDetails + "'").get().then((response) => {
          //(response);

          this.setState({
            Completedcount: response.length,

          });
        });

    }
    else if (viewmode == "HRHead") {
      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master").
        items.get().then((response) => {
          //(response);

          this.setState({
            TotalCountitem: response.length,

          });
        });


      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status').filter("Status eq 'InProgress' ").get().then((response) => {
          //(response);

          this.setState({
            EmpInProgresscount: response.length,

          });
        });
      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status').filter("StatusbyUnitHR eq 'Inprogress'").get().then((response) => {
          //(response);
          this.setState({
            HRInProgresscount: response.length,

          });
        });


      await newweb.lists
        .getByTitle("Employee Initiation Onboarding Master")
        .items.select('Status').filter("StatusbyUnitHR eq 'Completed'").get().then((response) => {
          //(response);

          this.setState({
            Completedcount: response.length,

          });
        });

    }
    else if (viewmode == "GroupHR-UnitHR") {

      if (HrUnitNames.indexOf(this.state.GroupHRUnitDetails) == -1) {
        HrUnitNames.push(this.state.GroupHRUnitDetails)
      }
      var TotalCountitem = 0
      var EmpInProgresscount = 0
      var HRInProgresscount = 0
      var Completedcount = 0

      for (var i = 0; i < HrUnitNames.length; i++) {
        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master").
          items.select("ID", "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            TotalCountitem += response.length

          });


        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("Status eq 'InProgress' and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            EmpInProgresscount += response.length

          });
        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Inprogress'and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            HRInProgresscount += response.length

          });


        await newweb.lists
          .getByTitle("Employee Initiation Onboarding Master")
          .items.select('Status', "Bussiness_x0020_Unit/Title").expand("Bussiness_x0020_Unit").filter("StatusbyUnitHR eq 'Completed' and Bussiness_x0020_Unit/Title eq '" + HrUnitNames[i] + "'").get().then((response) => {

            Completedcount += response.length

          });
      }

      this.setState({
        TotalCountitem: TotalCountitem,
        EmpInProgresscount: EmpInProgresscount,
        HRInProgresscount: HRInProgresscount,
        Completedcount: Completedcount
      });

    }

  }

  public render(): React.ReactElement<IDashboardProps> {
    var handler = this;

    return (
      <div className={styles.dashboard} >
        <div style={{ display: "none" }} className="containers relatives show-dashboardcontent">
          <div className="section-rigth">
            <div className="inner-page-contents ">
              <div className="sec">
                <div className="dashboard_section clearfix">
                  <div className="dashboard_heading_card">
                    <div className="heading">
                      <a data-interception='off' href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?env=WebView">
                        <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/next.png" />
                      </a>
                      <span id="title-dashboard">Dashboard </span>
                    </div>
                    <div className="dashboard_header_part">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="three-blocks-dashboard">
                            <div className="three-blocks-img-dashboard">
                              <img
                                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/total-icon%20(1).svg"
                                alt="image"
                              />
                            </div>
                            <div className="three-blocks-desc-dashboard">
                              <h3> {this.state.TotalCountitem}</h3>
                              <p> Total</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="three-blocks-dashboard">
                            <div className="three-blocks-img-dashboard">
                              <img
                                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/approved.png"
                                alt="image"
                              />
                            </div>
                            <div className="three-blocks-desc-dashboard">
                              <h3 id="completed-length">{this.state.Completedcount}</h3>
                              <p> Completed </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="three-blocks-dashboard">
                            <div className="three-blocks-img-dashboard">
                              <img
                                src="
                https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/pending.png
                
               "
                                alt="image"
                              />
                            </div>
                            <div className="three-blocks-desc-dashboard">
                              <h3 id="inprogress-length"> {this.state.EmpInProgresscount} </h3>
                              <p> Pending with Employee </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="three-blocks-dashboard">
                            <div className="three-blocks-img-dashboard">
                              <img
                                src="
                https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/pending.png
                
               "
                                alt="image"
                              />
                            </div>
                            <div className="three-blocks-desc-dashboard">
                              <h3 id="inprogress-length"> {this.state.HRInProgresscount} </h3>
                              <p> Pending with HR </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard_section_part">
                    <div className="dashboard_left">
                      <Sidedashboardnav
                        description={""}
                        siteurl={""}
                        UserId={undefined}
                      />
                    </div>

                    <div className="dashboard_right">
                      <div className="personaldashboarddata" id="personal-dashboarddata">
                        <Personaldashboards description={""} siteurl={""} UserId={undefined} />
                      </div>

                      <div id="loa-Dashboard" style={{ display: "none" }} >
                        <Loadashboard
                          description={""}
                          siteurl={""}
                          UserId={undefined}
                        />
                      </div>

                      <div style={{ display: "none" }} id="Nda-Dashboard">
                        <EmployeeNdadashboard
                          description={""}
                          siteurl={""}
                          UserId={undefined}
                        />
                      </div>
                      <div style={{ display: "none" }} id="coc-Dashboard">
                        <Cocdashboard
                          description={""}
                          siteurl={""}
                          UserId={undefined}
                        />
                      </div>
                      <div style={{ display: "none" }} id="sign-Dashboard">
                        <SpecimentSignaturedashboard
                          description={""}
                          siteurl={""}
                          UserId={undefined}
                        />
                      </div>
                      <div style={{ display: "none" }} id="coiDashboard">
                        <CoiDashboard
                          description={""}
                          siteurl={""}
                          UserId={undefined}
                        />
                      </div>
                      <div style={{ display: "none" }} id="joiningreport-Dashboard">

                        <JoiningReportdashboard

                          description={""}

                          siteurl={""}

                          UserId={undefined} />

                      </div>
                      <div style={{ display: "none" }} id="policyckn-Dashboard">

                        <Policyack

                          description={""}

                          siteurl={""}

                          UserId={undefined} />

                      </div>

                      <div style={{ display: "none" }} id="bankdetailashboard">
                        <Bankdetailsdashboard description={""} siteurl={""} UserId={undefined} />
                      </div>

                      <div style={{ display: "none" }} id="ackcovidploicy">
                        <AcknowledgmentPolicyCovid description={""} siteurl={""} UserId={undefined} />
                      </div>
                      <div style={{ display: "none" }} id="ephydashboard">
                        < Ephyprofile description={""} siteurl={""} UserId={undefined} />
                      </div>
                      <div id="HRitdashboard" style={{ display: "none" }}>
                        <Hritprivilegeform description={""} siteurl={""} UserId={undefined} />
                      </div>

                      <div id="PreExistdashboard" style={{ display: "none" }}>
                        <PreExistDashboard description={""} siteurl={""} UserId={undefined} />
                      </div>
                      <div id="Integrityashdashboard" style={{ display: "none" }}>
                        <IntegrityDashboard description={""} siteurl={""} UserId={undefined} />
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "none" }} id="isloading-inprogress-fordashboard">
          <img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/Loader/loader-hrform.gif"></img>
        </div>
      </div>
    );
  }
}
