import * as React from "react";
// import styles from "./LoaNewForm.module.scss";
import { ISidenavProps } from "./IHrOnboardingFormProps";
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
// "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/css/form%20css/style.css?v=13.5"
// );
export interface ILetterAuthorizationNewState { }

const newweb = Web(
  "https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/"
);
var Description;
var officename = "";
var LogoUrl;
var GlobalFormOpened = ''
export default class LoaNewForm extends React.Component<
  ISidenavProps,
  ILetterAuthorizationNewState,
  {}
> {
  constructor(props: ISidenavProps, state: ILetterAuthorizationNewState) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    //this.GetUserDetails()
    const url: any = new URL(window.location.href);
    GlobalFormOpened = url.searchParams.get("mdeopn");
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

    $(".personaltitleitemid").addClass("current");


  }

  public inputForm(mod) {
    if (mod == "loa") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".loatitle").addClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $("#joiningreport").hide();
      $("#loaform").show();
      $("#Employeenda").hide();
      $("#Codeconduct").hide();
      $("#specimensignatue").hide();
      $("#coimain").hide();
      $("#personalinfomation").hide();
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
    } else if (mod == "Nda") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".ndatitle").addClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $("#joiningreport").hide();
      $("#Employeenda").show();
      $("#Codeconduct").hide();
      $("#specimensignatue").hide();
      $("#loaform").hide();
      $("#coimain").hide();
      $("#personalinfomation").hide();
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
    } else if (mod == "codeofconduct") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $("#Codeconduct").show();
      $(".coctitle").addClass("current");
      $(".joiningreporttitle").removeClass("current");
      $("#joiningreport").hide();
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".coititle").removeClass("current");
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $("#personalinfomation").hide();
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
    } else if (mod == "signature") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".coititle").removeClass("current");
      $(".signtitle").addClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $("#joiningreport").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#Codeconduct").hide();
      $("#specimensignatue").show();
      $("#coimain").hide();
      $("#personalinfomation").hide();
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
    } else if (mod == "coiform") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").addClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $("#joiningreport").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#Codeconduct").hide();
      $("#specimensignatue").hide();
      $("#coimain").show();
      $("#personalinfomation").hide();
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
    } else if (mod == "personalinfo") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").addClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $(".joiningreporttitle").removeClass("current");
      $("#joiningreport").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").show();
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
    } else if (mod == "joiningreport") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").addClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").show();
      $(".ackcovidtitle").removeClass("current");

      $("#ackcovid").hide();
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
    } else if (mod == "PolicyAcknowledgement") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").addClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#ploicy-acknowledgment").show();
      $(".privilegeform-title").removeClass("current");
      $("#hr-it-privilegeform").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
      $(".uniformbanktitle").removeClass("current");

      $("#uniforbankdetails").hide();
      $(".ackcovidtitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#ackcovid").hide();
    } else if (mod == "ackpolicygeneralit") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").addClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ackcovid").show();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
      $(".uniformbanktitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
    } else if (mod == "bankdetailfrom") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);
      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".uniformbanktitle").addClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#uniforbankdetails").show();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
      $(".ephytitle").removeClass("current");
      $("#ephysicianform").hide();
    } else if (mod == "ephysician") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);

      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".ephytitle").addClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ephysicianform").show();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
    } else if (mod == "privilegeform") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);

      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".privilegeform-title").addClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").show();
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
    } else if (mod == "preexisting") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);

      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".preexisting-title").addClass("current");
      $(".integrity-title").removeClass("current");

      $("#integrity-and-benefit").hide();
      $("#pre-existing-medical-condition-form").show();
      $("#hr-it-privilegeform").hide();
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
    } else if (mod == "integrity") {
      $('#hr-on-boarding-forscroll')[0].scrollIntoView(true);

      $(".coititle").removeClass("current");
      $(".loatitle").removeClass("current");
      $(".ndatitle").removeClass("current");
      $(".coctitle").removeClass("current");
      $(".signtitle").removeClass("current");
      $(".personaltitleitemid").removeClass("current");
      $(".joiningreporttitle").removeClass("current");
      $(".policyacknowledgmenttitle").removeClass("current");
      $(".ackcovidtitle").removeClass("current");
      $(".ephytitle").removeClass("current");
      $(".privilegeform-title").removeClass("current");
      $(".uniformbanktitle").removeClass("current");
      $(".preexisting-title").removeClass("current");
      $(".integrity-title").addClass("current");

      $("#integrity-and-benefit").show();
      $("#pre-existing-medical-condition-form").hide();
      $("#hr-it-privilegeform").hide();
      $("#ephysicianform").hide();
      $("#uniforbankdetails").hide();
      $("#ackcovid").hide();
      $("#ploicy-acknowledgment").hide();
      $("#loaform").hide();
      $("#Employeenda").hide();
      $("#coimain").hide();
      $("#specimensignatue").hide();
      $("#Codeconduct").hide();
      $("#personalinfomation").hide();
      $("#joiningreport").hide();
    }
  }

  // public Scrolltopform() {

  //   var Focusthis = $('#dashboard_right-print'); // ---> here use any id which is in top of the page
  //   if (Focusthis.length) {
  //     var TopValue = Focusthis.offset().top;
  //     $('#personalinfomation').animate({ //--> here yu need to give the class or id of the body of the page, where you have the scroll
  //       scrollTop: TopValue
  //     }, 'slow');
  //   }
  // }
  public render(): React.ReactElement<ISidenavProps> {
    var handler = this;

    return (
      <div>
        <ul>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("personalinfo")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image personalinformationimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="personaltitleitemid tick_img_text">
              PERSONAL INFORMATION
            </span>
          </li>

          <li
            className="left-nav-item"
            onClick={() => this.inputForm("joiningreport")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image joiningreport_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="joiningreporttitle tick_img_text">
              JOINING REPORT
            </span>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("coiform")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image coi_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="coititle tick_img_text">
              CONFLICT OF INTEREST{" "}
            </span>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("codeofconduct")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image coc_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="coctitle tick_img_text">
              EMPLOYEE CODE OF CONDUCT & ETHICS
            </span>
          </li>

          <li className="left-nav-item" onClick={() => this.inputForm("loa")}>
            <img
              style={{ display: "none" }}
              className="tick_image loa_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="loatitle tick_img_text">
              LETTER OF AUTHORIZATION
            </span>
          </li>

          <li
            className="left-nav-item"
            onClick={() => this.inputForm("signature")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image sign_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="signtitle tick_img_text">
              SPECIMEN SIGNATURE FORM
            </span>
          </li>
          <li className="left-nav-item" onClick={() => this.inputForm("Nda")}>
            <img
              style={{ display: "none" }}
              className="tick_image nda_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="ndatitle tick_img_text">
              EMPLOYEE NON-DISCLOSURE AGREEMENT
            </span>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("ackpolicygeneralit")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image  ackcovid_tickimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="ackcovidtitle tick_img_text">

              EMPLOYEE POLICY ACKNOWLEDGMENT & DECLARATION - GENERAL & IT
            </span>
          </li>

          {/* <div style={{display:"none"}} className="policy_ack_leftside_text">
            Only for Clinicians and Allied health staff
            </div> */}
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("PolicyAcknowledgement")}
          >

            <div className="policy_ack_leftside_img">
              <img
                style={{ display: "none" }}
                className="tick_image policyacknowledgmentimg"
                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
              />
              <span className="policyacknowledgmenttitle tick_img_text">
                POLICY ACKNOWLEDGEMENT AND DECLARATIONS (CLINICIANS/NURSING/ALLIED HEALTH STAFF SPECIFIC)
              </span>
            </div>
            <div className="policy_ack_leftside_text">
              Only for Clinicians , Nursing and Allied health staff
            </div>
          </li>
          {/* <div style={{display:"none"}} className="ephysician_leftside_text">
       only for clinicians
         </div> */}
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("ephysician")}
          >

            <div className="ephysician_leftside_img">
              <img
                style={{ display: "none" }}
                className="tick_image  ephysucessicon"
                src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
              />
              <span className="ephytitle tick_img_text">
                E-PHYSICIAN PROFILE
              </span>
            </div>
            <div className="ephysician_leftside_text">
              only for clinicians
            </div>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("bankdetailfrom")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image  uniformbanksuccessimg"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="uniformbanktitle tick_img_text">
              UNIFORM REQUEST & BANK DETAILS
            </span>
          </li>

          <li
            className="left-nav-item"
            onClick={() => this.inputForm("privilegeform")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image  privilegeform-img"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"
            />
            <span className="privilegeform-title tick_img_text">
              HR IT PRIVILEGE FORM
            </span>
          </li>
          <li
            className="left-nav-item"
            onClick={() => this.inputForm("preexisting")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image  preexisting-img"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"

            />
            <span className="preexisting-title tick_img_text">
              PRE EXISTING MEDICAL CONDITION FORM
            </span>
          </li>

          <li
            className="left-nav-item"
            onClick={() => this.inputForm("integrity")}
          >
            <img
              style={{ display: "none" }}
              className="tick_image  integrity-img"
              src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/Site%20Asset/Remo%20Portal%20Assets/img/tick_img.png"

            />
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
