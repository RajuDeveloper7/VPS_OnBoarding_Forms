import * as React from "react";
// import styles from "./LoaNewForm.module.scss";
import { IDashboardProps } from "./IDashboardProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { sp } from "@pnp/sp";
import * as moment from "moment";

// SPComponentLoader.loadCss(
//   `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css`
// );
// SPComponentLoader.loadCss(
//   "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.5"
// );
export interface ILetterAuthorizationNewState {

}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings//HRFORM/");

export default class LoaNewForm extends React.Component<IDashboardProps, ILetterAuthorizationNewState, {}> {
  constructor(props: IDashboardProps, state: ILetterAuthorizationNewState) {
    super(props);
    this.state = {

    };

  }

  public componentDidMount() {
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


  }

  public inputForm(mod) {
    if (mod == "loa") {
      $("#Integrityashdashboard").hide()
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".loatitle").addClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $("#loa-Dashboard").show();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#coiDashboard").hide();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $(".integrity-title").removeClass("current");
    } else if (mod == "Nda") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $(".ndatitle").addClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $(".loatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").show();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#coiDashboard").hide();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "codeofconduct") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $("#Codeconduct").show();
      $(".coctitle").addClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").show();
      $("#sign-Dashboard").hide();
      $("#coiDashboard").hide();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "signature") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".signtitle").addClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").show();
      $("#coiDashboard").hide();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if ((mod == "coiform")) {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").addClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $("#personal-dashboarddata").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#coiDashboard").show();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "Personaldashboard") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").addClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $(".Joiningreporttitle").removeClass("current")
      $("#joiningreport-Dashboard").hide()
      $("#personal-dashboarddata").show();
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "JoiningReportdashboard") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").addClass("current")
      $("#joiningreport-Dashboard").show()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".plocyacknowtitle").removeAttr("current")
      $("#policyckn-Dashboard").hide()
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "plocyacknows") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").addClass("current")
      $("#policyckn-Dashboard").show()
      $("#joiningreport-Dashboard").hide()

      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $(".banktitle").removeClass("current")
      $("#bankdetailashboard").hide()
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "bankdetails") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").addClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").show()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "policycovid") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").show()
      $(".ackcovidploicytitle").addClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "ephyprofile") {
      $("#PreExistdashboard").hide()
      $("#HRitdashboard").hide()
      $(".hrit-title").removeClass("current")
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").show()
      $(".ephytitle").addClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "hritprivilege") {
      $("#PreExistdashboard").hide()
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $("#HRitdashboard").show()
      $(".hrit-title").addClass("current")
      $(".preexist-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");
    } else if (mod == "preexist") {
      $("#PreExistdashboard").show()
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $("#HRitdashboard").hide()
      $(".preexist-title").addClass("current")
      $(".hrit-title").removeClass("current")
      $("#Integrityashdashboard").hide()
      $(".integrity-title").removeClass("current");

    } else if (mod == "integrity") {
      $("#Integrityashdashboard").show()
      $("#PreExistdashboard").hide()
      $(".coititle").removeClass("current");
      $(".personaltitle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".Joiningreporttitle").removeClass("current")
      $(".plocyacknowtitle").removeClass("current")
      $(".banktitle").removeClass("current")
      $("#policyckn-Dashboard").hide()
      $("#joiningreport-Dashboard").hide()
      $("#bankdetailashboard").hide()
      $("#coiDashboard").hide();
      $("#loa-Dashboard").hide();
      $("#Nda-Dashboard").hide();
      $("#coc-Dashboard").hide();
      $("#sign-Dashboard").hide();
      $("#personal-dashboarddata").hide();
      $("#ackcovidploicy").hide()
      $(".ackcovidploicytitle").removeClass("current")
      $("#ephydashboard").hide()
      $(".ephytitle").removeClass("current")
      $("#HRitdashboard").hide()
      $(".preexist-title").removeClass("current")
      $(".hrit-title").removeClass("current")
      $(".integrity-title").addClass("current");
    }
  }



  public render(): React.ReactElement<IDashboardProps> {
    var handler = this;

    return (
      <div className="dashboardleft">
        <ul>
          <li className="left-nav-item" onClick={() => this.inputForm("Personaldashboard")}>
            <span className="personaltitle tick_img_text">

              PERSONAL INFORMATION
            </span>
          </li>


          <li className="left-nav-item" onClick={() => this.inputForm("JoiningReportdashboard")}>

            <span className="Joiningreporttitle tick_img_text">

              JOINING REPORT

            </span>

          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("coiform")}
          >
            <span className="coititle tick_img_text">
              CONFLICT OF INTEREST{" "}
            </span>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("codeofconduct")}
          >
            <span className="coctitle tick_img_text">
              EMPLOYEE CODE OF CONDUCT & ETHICS
            </span>
          </li>

          <li className="left-nav-item" onClick={() => this.inputForm("loa")}>
            <span className="loatitle tick_img_text">
              LETTER OF AUTHORIZATION
            </span>
          </li>


          <li
            className="left-nav-item"
            onClick={() => this.inputForm("signature")}
          >
            <span className="signtitle tick_img_text">
              SPECIMEN SIGNATURE FORM
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("Nda")}>
            <span className="ndatitle tick_img_text">
              EMPLOYEE NON-DISCLOSURE AGREEMENT
            </span>
          </li>

          <li className="left-nav-item" onClick={() => this.inputForm("policycovid")}>
            <span className="ackcovidploicytitle tick_img_text">
              EMPLOYEE POLICY ACKNOWLEDGMENT & DECLARATION - GENERAL & IT
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("plocyacknows")}>
            <span className="plocyacknow plocyacknowtitle tick_img_text">
              POLICY ACKNOWLEDGEMENT AND DECLARATIONS (CLINICIANS/NURSING/ALLIED HEALTH STAFF SPECIFIC)
            </span>
            <div className="policy_ack_leftside_text"> Only For Clinicians , Nursing and Allied health staff</div>
          </li>

          <li className="left-nav-item" onClick={() => this.inputForm("ephyprofile")}>
            <span className="ephytitle tick_img_text">
              E-PHYSICIAN PROFILE
            </span>
            <div className="ephysician_leftside_text"> Only For Clinicians</div>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("bankdetails")}>
            <span className="banktitle tick_img_text">
              UNIFORM REQUEST & BANK DETAILS
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("hritprivilege")}>
            <span className="hrit-title tick_img_text">
              HR IT PRIVILEGE FORM
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("preexist")}>
            <span className="preexist-title tick_img_text">
              PREEXISTING MEDICAL CONDITION FORM
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("integrity")}>
            <span className="integrity-title tick_img_text">
              DECLARATION OF POLICY ON INTEGRITY AND BENEFIT DISCLOSURE
            </span>
            <div className="ephysician_leftside_text">
              Only for Licensed Healthcare professionals in Abu Dhabi Emirate
            </div>
          </li>

        </ul>
      </div>
    );
  }
}
