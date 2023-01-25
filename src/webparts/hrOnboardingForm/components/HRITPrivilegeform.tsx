import * as React from "react";
import { IHrOnboardingFormProps } from "./IHrOnboardingFormProps";
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

import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";



export interface IPrivilegeState {

    CurrentUserName: any[];
    CurrentUserDesignation: any[];
    BusinessMaster: any[];

    Alreadysublitted: boolean;
    Dynamiclogo: any[];
    firstname: any[];
    lastname: any[];
    ONBSessionID: string;
    HRITSubmissionStatus: string;
    isPrevFormSubmitted: boolean;
    ControlNumber: any[];
    VersionNumber: any[];
    HRITFormControlNumber: any[];
    EmployeeCategory: any[];
    HRITFormVersionNumber: any[];
    HrCompleteStatus: boolean;

}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;

var officename = "";
var LogoUrl;
let HRITItemID;

var Mode;
var lettermode;
var HRITPrivilageId;
var employeeloabussinessName = "";
var officefirstname;
var officlelastname;
var ControlNumber;
var VersionNumber;
var OfficeName;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")
export default class Privilege extends React.Component<IHrOnboardingFormProps, IPrivilegeState, {}> {
    constructor(props: IHrOnboardingFormProps, state: IPrivilegeState) {
        super(props);
        this.state = {

            CurrentUserName: [],
            CurrentUserDesignation: [],
            BusinessMaster: [],
            Alreadysublitted: true,
            Dynamiclogo: [],
            firstname: [],
            lastname: [],
            ONBSessionID: "",
            HRITSubmissionStatus: "Inprogress",
            isPrevFormSubmitted: false,
            ControlNumber: [],
            VersionNumber: [],
            HRITFormControlNumber: [],
            EmployeeCategory: [],
            HRITFormVersionNumber: [],
            HrCompleteStatus: false
        };


    }
    public componentDidMount() {
        this.GetCurrentUserDetails();
        this.GetEmployeeCategoryItem();
        this.HideErrorTextontyping();
        const url: any = new URL(window.location.href);
        HRITItemID = url.searchParams.get("HRITItemID");
        Mode = url.searchParams.get("HRITMode");
        lettermode = url.searchParams.get("HRITMode");

        GlobalFormOpenedMode = url.searchParams.get("mdeopn");
        GlobalSessionIDValue = url.searchParams.get("glblsessid");
        EditSessionid = url.searchParams.get("glblsessid");



        $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
        $("#spCommandBar").attr("style", "display: none !important");
        $("#spLeftNav").attr("style", "display: none !important");
        $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
        $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");


        if (GlobalFormOpenedMode == "View") {
            $("#PerantFacility").prop('disabled', true)
            $("#update-btn-HRIT").hide()
            $("#HRIT-submit").hide()
            this.Gethritprivlageformview()
            this.GethritprivlagePrintview()
        } else if (GlobalFormOpenedMode == "Edit") {
            this.Gethritprivlageformedit()
            $("#update-btn-HRIT").show()
            $("#HRIT-submit").hide()
        }
    }

    public async GethritprivlagePrintview() {

        await newweb.lists.getByTitle("HR IT Privilege Transaction")
            .items.select(
                "ID",
                "DateofJoining",
                "StaffTypeVisiting",
                "Designation",
                "StaffType",
                "Department",
                "Status",
                "EmployeeID",
                "ONBSessionID",
                "EmployeeName",
                "EmployeeCategory",
                "Author/Title",
                "Facility",
                "ControlNumber",
                "VersionNumber",
                "BusinessUnit"
            )
            .filter(`ONBSessionID eq '${EditSessionid}'`).expand("Author")
            .get().then((response) => {


                if (response.length != 0) {
                    $(".privilegeform-img").show()
                    $(".HRIT-submit").hide()
                    HRITPrivilageId = response[0].ID;
                    $("#print-privilege-unitname").text(response[0].BusinessUnit)
                    $("#print-PrivilegeEmpName").text(response[0].EmployeeName);

                    $("#print-PrivilegeEmpId").text(response[0].EmployeeID);

                    $("#print-PrivilegeDept").text(response[0].Department);


                    //$("#print-staff-type-visiting").val(response[0].StaffTypeVisiting);
                    $(".print-privilegedateofjoining").text(" ");
                    $("#print-PrivilegeDesignation").text(response[0].Designation);
                    $("#Print-decleration-employeename").text(response[0].EmployeeName);

                    $(".print-privilege-category").text(response[0].EmployeeCategory)
                    $("#print-staff-type").text(response[0].StaffType);
                    $("#print-PerantFacilityItem").text(response[0].Facility)
                    $("#print-itprivlage-Control-Number").text(response[0].ControlNumber)
                    $("#print-itprivlage-Version-Number").text(response[0].VersionNumber)

                }
            });



    }
    public async Gethritprivlageformview() {

        await newweb.lists.getByTitle("HR IT Privilege Transaction")
            .items.select(
                "ID",
                "DateofJoining",
                "StaffTypeVisiting",
                "Designation",
                "StaffType",
                "Department",
                "Status",
                "EmployeeID",
                "ONBSessionID",
                "EmployeeName",
                "EmployeeCategory",
                "Author/Title",
                "Facility",
                "BusinessUnit"
            )
            .filter(`ONBSessionID eq '${EditSessionid}'`).expand("Author")
            .get().then((response) => {
                // console.log(response);
                // console.log(response[0].DateofJoining);

                if (response.length != 0) {
                    $("#privilege-unitname").text(response[0].BusinessUnit)
                    $("#PerantFacility").val(response[0].Facility)
                    $(".privilegeform-img").show()
                    $(".HRIT-submit").hide()
                    HRITPrivilageId = response[0].ID;
                    $("#privilege_para_empname").val(response[0].EmployeeName);
                    $("#PrivilegeEmpName").val(response[0].EmployeeName);
                    $("#PrivilegeEmpId").val(response[0].EmployeeID);

                    $("#PrivilegeDept").val(response[0].Department);


                    $("#staff-type-visiting").val(response[0].StaffTypeVisiting);
                    $(".privilegedateofjoining").val(moment(response[0].DateofJoining).format("YYYY-MM-DD"));
                    $("#PrivilegeDesignation").val(response[0].Designation);

                    setTimeout(() => {
                        $(".privilege-category").val(response[0].EmployeeCategory);
                        $("#staff-type").val(response[0].StaffType);

                    }, 1000);

                }
            });



    }

    public async Gethritprivlageformedit() {

        await newweb.lists.getByTitle("HR IT Privilege Transaction")
            .items.select(
                "ID",
                "DateofJoining",
                "StaffTypeVisiting",
                "Designation",
                "StaffType",
                "Department",
                "Status",
                "EmployeeID",
                "ONBSessionID",
                "EmployeeName",
                "EmployeeCategory",
                "Author/Title",
                "Facility",
                "BusinessUnit",
                "ControlNumber",
                "VersionNumber"
            )
            .filter(`ONBSessionID eq '${EditSessionid}'`).expand("Author")
            .get().then((response) => {


                if (response.length != 0) {
                    HRITPrivilageId = response[0].ID;
                    ControlNumber = response[0].ControlNumber
                    VersionNumber = response[0].VersionNumber

                    $("#privilege-unitname").text(response[0].BusinessUnit)
                    $("#PerantFacility").val(response[0].Facility)
                    $(".privilegeform-img").show()
                    $(".HRIT-submit").hide()

                    $("#privilege_para_empname").val(response[0].EmployeeName);
                    $("#PrivilegeEmpName").val(response[0].EmployeeName);
                    $("#PrivilegeEmpId").val(response[0].EmployeeID);

                    $("#PrivilegeDept").val(response[0].Department);

                    //  $("#staff-type").val(response[0].StaffType);
                    $("#staff-type-visiting").val(response[0].StaffTypeVisiting);
                    $(".privilegedateofjoining").val(moment(response[0].DateofJoining).format("YYYY-MM-DD"));
                    $("#PrivilegeDesignation").val(response[0].Designation);

                    setTimeout(() => {
                        $(".privilege-category").val(response[0].EmployeeCategory)
                        $("#staff-type").val(response[0].StaffType);
                    }, 1000);

                }
            });



    }




    public GetEmployeeCategoryItem() {
        newweb.lists
            .getByTitle("Employee Category")
            .items.select("Category", "ID")
            .orderBy("Category", true)
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

    public UpdateListItemHRITPrivilage() {

        if (this.Validfacility()) {
            newweb.lists.getByTitle("HR IT Privilege Transaction").items.getById(HRITPrivilageId).update({
                Title: "HR IT PRIVILEGE FORM",
                EmployeeName: $("#PrivilegeEmpName").val(),
                EmployeeID: $("#PrivilegeEmpId").val(),
                DateofJoining: $("#PrivilegeJoiningDate").val(),
                Department: $("#PrivilegeDept").val(),
                StaffType: $("#staff-type").val(),
                StaffTypeVisiting: $("#staff-type-visiting").val(),
                EmployeeCategory: $("#PrivilegeCategory").val(),
                Designation: $("#PrivilegeDesignation").val(),
                Status: "Updated by Unit HR",
                Facility: $("#PerantFacility").val(),
            })
                .then((results: any) => {

                    if (this.state.HrCompleteStatus == true) {
                        subweb.lists.getByTitle("HR IT Privilege HR Update History").items.add({
                            Title: "HR IT PRIVILEGE FORM",
                            EmployeeName: $("#PrivilegeEmpName").val(),
                            EmployeeID: $("#PrivilegeEmpId").val(),
                            DateofJoining: $("#PrivilegeJoiningDate").val(),
                            Department: $("#PrivilegeDept").val(),
                            StaffType: $("#staff-type").val(),
                            StaffTypeVisiting: $("#staff-type-visiting").val(),
                            EmployeeCategory: $("#PrivilegeCategory").val(),
                            Designation: $("#PrivilegeDesignation").val(),
                            Status: "Updated by Unit HR",
                            Facility: $("#PerantFacility").val(),
                            ONBSessionID: GlobalSessionIDValue,
                            BusinessUnit: OfficeName,
                            ControlNumber: ControlNumber,
                            VersionNumber: VersionNumber

                        })
                    }
                    swal({
                        title: "The Form has been updated successfully",
                        icon: "success",
                    }).then(() => {
                        location.reload();
                    });
                });
        }

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
                        if (GlobalFormOpenedMode == "New") {
                            officename = properties[i].Value;
                        }
                        OfficeName = properties[i].Value;
                        var ofcname = properties[i].Value;

                        setTimeout(() => {
                            reacthandler.LogoUnitDynamic(ofcname);
                            reacthandler.GetContolandVersionNumber(ofcname)
                            reacthandler.GetControlNumberAccordingtoformname(ofcname)

                        }, 500);
                    }
                    if (properties[i].Key == "LastName") {
                        officefirstname = properties[i].Value;
                        var firstofficename = properties[i].Value;
                        reacthandler.setState({
                            lastname: firstofficename,
                        });
                    }
                    if (properties[i].Key == "FirstName") {
                        officlelastname = properties[i].Value;
                        var lastofficename = properties[i].Value;
                        reacthandler.setState({
                            firstname: lastofficename,
                        });
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) { },
        });
    }

    public async GetCurrentUserONBSessionID(currentuseremailid, FormMode) {

        if (FormMode == "New") {
            newweb.lists.getByTitle("Employee Initiation Onboarding Master").items.filter("Name/EMail eq '" + currentuseremailid + "'").orderBy("Created", false).top(1).get().then((response) => {
                if (response.length != 0) {
                    this.setState({
                        ONBSessionID: response[0].ONBSessionID
                    });
                    this.GetUsernamefrompersonalinfo(response[0].ONBSessionID)
                    this.Getdetailsfromjoiningreport(response[0].ONBSessionID)
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


        newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'UNIFORM REQUEST BANK DETAILS' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
            if (response.length != 0) {
                this.setState({
                    isPrevFormSubmitted: true
                });
            }
        });
        newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'HR IT PRIVILEGE FORM'").orderBy("Created", false).get().then((response) => {
            if (response.length != 0) {
                if (response[0].Title == "HR IT PRIVILEGE FORM") {
                    this.setState({
                        HRITSubmissionStatus: response[0].Status
                    });

                    if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
                        this.GetHRITPrivilage(ONBSessionID, FormMode);
                    }
                }
            }
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
                .filter(`Title eq 'HR IT PRIVILEGE FORM'`)
                .get()
                .then((results) => {
                    this.setState({
                        HRITFormControlNumber: results[0][fieldname1.InternalName],
                        HRITFormVersionNumber: results[0][fieldname2.InternalName]
                    })


                });

        }
    }

    public LogoUnitDynamic(ofc) {

        if (GlobalFormOpenedMode == "New") {
            newweb.lists.getByTitle("Business Unit Master").items.select("ID", "UnitLogo").filter(`Title eq '${ofc}'`).get().then((results) => {
                var img = results[0].UnitLogo;
                LogoUrl = JSON.parse(img).serverRelativeUrl;
                this.setState({
                    Dynamiclogo: results,
                });
            });
        }
    }
    public HideErrorTextontyping() {

        $("#PerantFacility").keyup(function () {
            $("#err-Perant-Facility").hide();
        });




    }
    public Validfacility() {
        var status = true;
        if (status == true && $("#PerantFacility").val() != "") {
            $("#err-Perant-Facility").hide();
        } else {
            $("#err-Perant-Facility").show();
            $("#PerantFacility").focus();
            status = false;

        }
        return status;
    }

    public SaveListItem() {
        if (this.Validfacility()) {

            swal({
                title: "Are you sure?",
                text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willadd) => {
                if (willadd) {
                    newweb.lists.getByTitle("HR IT Privilege Transaction").items.add({
                        Title: "HR IT PRIVILEGE FORM",
                        EmployeeName: $("#PrivilegeEmpName").val(),
                        EmployeeID: $("#PrivilegeEmpId").val(),
                        DateofJoining: $("#PrivilegeJoiningDate").val(),
                        Department: $("#PrivilegeDept").val(),
                        StaffType: $("#staff-type").val(),
                        StaffTypeVisiting: $("#staff-type-visiting").val(),
                        EmployeeCategory: $("#PrivilegeCategory").val(),
                        Designation: $("#PrivilegeDesignation").val(),
                        Status: "Submitted by employee",
                        UnitLogo: LogoUrl,
                        BusinessUnit: officename,
                        Facility: $("#PerantFacility").val(),
                        ONBSessionID: this.state.ONBSessionID,
                        VersionNumber: this.state.HRITFormVersionNumber,
                        ControlNumber: this.state.ControlNumber + "/" + this.state.HRITFormControlNumber
                    })
                        .then((results: any) => {
                            newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'HR IT PRIVILEGE FORM'").orderBy("Created", false).get().then((response) => {
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
                                    setTimeout(() => {
                                        location.reload();
                                    }, 2500);
                                });
                            });
                        });
                }
            });

        }

    }


    public GetUsernamefrompersonalinfo(ONBSessionID) {
        if (GlobalFormOpenedMode == "New") {
            newweb.lists
                .getByTitle("Personal Information Master")
                .items.select(
                    "FullName",
                    "ONBSessionID",
                    "Category"
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")

                .get()
                .then((result) => {
                    if (result.length != 0) {

                        $("#PrivilegeEmpName").val(result[0].FullName);
                        $("#privilege_para_empname").val(result[0].FullName);
                        $("#PrivilegeCategory").val(result[0].Category);

                        $(".privilege-disabled").prop("disabled", "disabled")
                        $(".privilege_para_input").prop("disabled", "disabled")
                    }
                })
        }
    }
    public Getdetailsfromjoiningreport(ONBSessionID) {
        if (GlobalFormOpenedMode == "New") {
            newweb.lists
                .getByTitle("Employee Joining Report Transaction")
                .items.select(
                    "ID",
                    "Name",
                    "Designation",
                    "EmployeeIDNumber",
                    "DateofJoining",
                    "Department",
                    "ONBSessionID",
                    "BusinessUnit",
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")
                .get().then((result) => {
                    if (result.length != 0) {
                        $(".privilegedateofjoining").val(moment(result[0].DateofJoining).format("YYYY-MM-DD"));
                        $("#PrivilegeDesignation").val(result[0].Designation);
                        $("#PrivilegeDept").val(result[0].Department);
                        $("#PrivilegeEmpId").val(result[0].EmployeeIDNumber);


                    }
                });
        }
    }


    public Printthis() {
        let printContents = document.getElementById('dashboard_right-print-privilege').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        location.reload();
        document.body.innerHTML = originalContents;

    }


    public async GetHRITPrivilage(ONBSessionID, formstatus) {

        await newweb.lists.getByTitle("HR IT Privilege Transaction")
            .items.select(
                "ID",
                "DateofJoining",
                "StaffTypeVisiting",
                "Designation",
                "StaffType",
                "Department",
                "Status",
                "EmployeeID",
                "ONBSessionID",
                "EmployeeName",
                "EmployeeCategory",
                "Author/Title",
                "Facility"
            )
            .filter(`ONBSessionID eq '${ONBSessionID}'`).expand("Author")
            .get().then((response) => {

                if (response.length != 0) {
                    $(".privilegeform-img").show()
                    $(".HRIT-submit").hide()
                    $("#PerantFacility").prop('disabled', true)
                    $("#PerantFacility").val(response[0].Facility)
                    $("#PrivilegeEmpName").val(response[0].EmployeeName);
                    $("#PrivilegeEmpId").val(response[0].EmployeeID);
                    $(".privilegedateofjoining").val(moment(response[0].DateofJoining).format("YYYY-MM-DD"));
                    $("#PrivilegeDept").val(response[0].Department);
                    $("#staff-type").val(response[0].StaffType);
                    $("#staff-type-visiting").val(response[0].StaffTypeVisiting);
                    $("#PrivilegeCategory").val(response[0].EmployeeCategory);
                    $("#PrivilegeDesignation").val(response[0].Designation);



                }
            });



    }
    public render(): React.ReactElement<IHrOnboardingFormProps> {
        var handler = this;
        const Employeecategorys: JSX.Element[] = this.state.EmployeeCategory.map(
            function (item, key) {
                return <option value={item.Category}>{item.Category}</option>;
            }
        );
        return (
            <>
                <div >
                    <div className="dashboard_right_heading">
                        {handler.state.Dynamiclogo && GlobalFormOpenedMode == "New" &&
                            handler.state.Dynamiclogo.map(function (imgitem, Index) {
                                var img = imgitem.UnitLogo;
                                var Dynamiclogo = JSON.parse(img);

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
                        <span>HR IT PRIVILEGE FORM</span>

                    </div>
                    <div className="dashboard_right_ffamily">
                        <div className="privilege_top personal_info_part">
                            <div>
                                <div className="row form row_top">
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PrivilegeEmpName"
                                                name="PrivilegeEmpName"
                                                className="form-control privilege-Employeename privilege-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Employee Name
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-privilege-empname"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PrivilegeEmpId"
                                                name="PrivilegeEmpId"
                                                className="form-control privilege-empid privilege-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Employee ID
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <input
                                                type="text"
                                                id="PrivilegeDesignation"
                                                name="IdentityCardNo"
                                                className="form-control privilege-designation privilege-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Designation
                                                {/* <i className="required">*</i> */}
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-privilege-designation"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>

                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <input
                                                type="date"
                                                id="PrivilegeJoiningDate"
                                                name="date"
                                                className="form-control  privilegedateofjoining privilege-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Date of Joining
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-privilege-dateofjoining"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PrivilegeDept"
                                                name="PrivilegeDept"
                                                className="form-control privilege-dept privilege-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Department
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-privilege-dept"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <select id="PrivilegeCategory" className="form-control privilege-category" disabled>
                                                <option value="">Select</option>
                                                {Employeecategorys}
                                            </select>
                                            <span className="floating-label">
                                                Category
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-privilege-category"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row form">
                                <div className="col-md-4">
                                    <div className="form-group relative">
                                        <select id="staff-type" className="form-control privilege-category" disabled>
                                            <option selected>New</option>
                                            <option>Visiting</option>
                                            <option>Transfer In</option>
                                            <option>Exit-LWD</option>
                                            <option>Transfer Out</option>
                                        </select>
                                        <span className="floating-label">
                                            Staff Type
                                            <i className="required">*</i>
                                        </span>
                                    </div>
                                </div>
                                <div id="if-user-select-visiting-show" style={{ display: "none" }} className="col-md-4">
                                    <div className="form-group relative">
                                        <input
                                            type="text"
                                            id="PrivilegeVisiting"
                                            name="PrivilegeVisiting"
                                            className="form-control privilege-visiting"
                                            autoComplete="off" />
                                        <span className="floating-label">
                                            Please explain
                                            <i className="required">*</i>
                                        </span>
                                    </div>
                                    <span
                                        className="error-validation"
                                        id="err-privilege-visiting"
                                        style={{ color: "red", display: "none" }}>
                                        This field is mandatory.
                                    </span>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group relative">
                                        <input
                                            type="text"
                                            id="PerantFacility"
                                            name="facility"
                                            className="form-control "
                                            autoComplete="off" />
                                        <span className="floating-label">

                                            Mention the Name of Parent Facility <i className="required">*</i>
                                        </span>
                                    </div>
                                    <span
                                        className="error-validation"
                                        id="err-Perant-Facility"
                                        style={{ color: "red", display: "none" }}>
                                        This field is mandatory.
                                    </span>
                                </div>
                            </div>

                            <div className="privilege_part">
                                <div className="row form mention_name_block">
                                    <div className="col-md-6 heading">
                                        <h3> Access Status    </h3>
                                    </div>
                                </div>
                                <div style={{ marginTop: "10px" }} className="table-responsive">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="table-privilege"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                {/* <th scope="col">#</th> */}
                                                <th scope="col"></th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Access Requested By (HOD)</th>
                                                <th scope="col">Exit Clearance Status</th>


                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-dynamicprivilege">

                                            <tr>
                                                <td>
                                                    Computer Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Intranet Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    HIS Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    I-site Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Department Folder Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Secured/Restricted Area Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Other Application Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Asset Assigned
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Email ID
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    SAP Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>




                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="privilege_part">
                                <h3>Privilege Status</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="table-privilege-status"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr >
                                                <th scope="col" style={{ width: "112px" }}></th>
                                                <th scope="col" style={{ width: "112px" }}>Status (Yes/No)</th>
                                                <th scope="col">Remarks</th>

                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-dynamicprivilege-status">

                                            <tr>
                                                <td>
                                                    Renewed
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    Revised
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    New
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    Revoked
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="privilege_part">
                                <div className="privilege-declaration">
                                    <h3>Declaration</h3>
                                    <p style={{ lineHeight: "28px" }}>
                                        I Mr./Ms. <input style={{ borderBottom: "none" }} type="text" id="privilege_para_empname" className="privilege_para_input" disabled />hereby acknowledge that I have received the
                                        above mentioned IT privileges. I understand that this belongs to <span style={{ borderBottom: "none" }} id="privilege-unitname" className="privilege_para_input">{officename}</span> and is under my possession for
                                        carrying out my office work. I hereby assure that I will take care of the IT privileges of the company to the best
                                        possible extent.
                                    </p>
                                </div>
                                <div className="row form">
                                    <div className="col-md-4 signature_part sign_part">
                                        <p> Employee Signature
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="privilege_part">

                                <h3 style={{ textAlign: "center", textTransform: "uppercase" }}> Approved by</h3>
                                {/* <div className="table-responsive">
                                    <table    className="table table-bordered"  id="table-privilege-approvedby">
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr >
                                                <th scope="col" style={{ width: "100px" }}></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Signature</th>
                                                <th scope="col" style={{ width: "110px" }}>Date</th>

                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-dynamicprivilege-status">

                                            <tr>
                                                <td>
                                                    HOD
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    HR
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    IT
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Unit Head
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div> */}


                                <div className="row form">
                                    <h3>HOD</h3>

                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>
                                <div className="row form">
                                    <h3>HR</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>

                                <div className="row form">
                                    <h3>IT</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>


                                <div className="row form">
                                    <h3>Unit Head</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
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

                                        className="dashboard_submit_btn HRIT-submit"
                                        type="submit"
                                        onClick={() => this.SaveListItem()}>
                                        Submit
                                    </button>
                                    :
                                    <button style={{ cursor: "no-drop" }}

                                        className="dashboard_submit_btn HRIT-submit"
                                        type="submit">
                                        Submit
                                    </button>
                                }

                                <button
                                    style={{ display: "none" }}
                                    id="update-btn-HRIT"
                                    className="dashboard_submit_btn"
                                    type="submit"
                                    onClick={() => this.UpdateListItemHRITPrivilage()}>
                                    Update
                                </button>
                                <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btnloa" type="submit" onClick={() => this.Printthis()}>Print</button>
                                {GlobalFormOpenedMode == "New" &&
                                    <button id="btn-sign-loa" className="dashboard_submit_btn btn-cancel" type="reset">
                                        <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                                            Cancel
                                        </a>
                                    </button>
                                }

                                {GlobalFormOpenedMode == "Edit" &&
                                    <button id="btn-hr-loa" className="dashboard_submit_btn btn-cancel" type="reset">
                                        <a data-interception="off" target="_self" href="https://remodigital.sharepoint.com/sites/Remo/RemoSolutions/EMPONB/SitePages/Dashboard.aspx?env=WebView`">
                                            Cancel
                                        </a>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "none" }} id="dashboard_right-print-privilege">
                    <div className="dashboard_right_heading">
                        {handler.state.Dynamiclogo && GlobalFormOpenedMode == "New" &&
                            handler.state.Dynamiclogo.map(function (imgitem, Index) {
                                var img = imgitem.UnitLogo;
                                var Dynamiclogo = JSON.parse(img);

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

                        <div className="header-title-units">
                            <span>HR IT PRIVILEGE FORM</span>
                            <ul>
                                <li>Control Number: <b id="print-itprivlage-Control-Number"></b></li>
                                <li>Version: <b id="print-itprivlage-Version-Number"></b></li>
                            </ul>

                        </div>
                    </div>
                    <div className="dashboard_right_ffamily" style={{ marginTop: "5px" }}>
                        <div className="privilege_top personal_info_part">
                            <div >
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span id="print-PrivilegeEmpName" className="print-control print-privilege-Employeename privilege-disabled">

                                            </span>
                                            <span className="floating-label">
                                                Employee Name
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span id="print-PrivilegeEmpId" className="print-control print-privilege-empid privilege-disabled">




                                            </span>
                                            <span className="floating-label">
                                                Employee ID
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <span id="print-PrivilegeDesignation" className="print-control print-privilege-designation"></span>





                                            <span className="floating-label">
                                                Designation
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <span id="print-PrivilegeJoiningDate" className="print-control  print-privilegedateofjoining">




                                            </span>
                                            <span className="floating-label">
                                                Date of Joining
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span id="print-PrivilegeDept" className="print-control print-privilege-dept"></span>





                                            <span className="floating-label">
                                                Department
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <span id="print-PrivilegeCategory" className="print-control print-privilege-category">


                                            </span>
                                            <span className="floating-label">
                                                Category
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row form">
                                <div className="col-md-4">
                                    <div className="form-group relative">
                                        <span id="print-staff-type" className="print-control">

                                        </span>
                                        <span className="floating-label">
                                            Staff Type
                                            <i className="required">*</i>
                                        </span>
                                    </div>
                                </div>



                                <div className="col-md-4">
                                    <div className="form-group relative">
                                        <span id="print-PerantFacilityItem" className="print-control"></span>
                                        <span className="floating-label">
                                            Mention the Name of Parent Facility
                                            <i className="required">*</i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="privilege_part">
                                <div className="row form mention_name_block">
                                    <div className="col-md-6 heading">
                                        <h3> Access Status </h3>
                                    </div>



                                </div>
                                <div className="table-responsive print_mention_block">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="table-privilege"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                {/* <th scope="col">#</th> */}
                                                <th scope="col"></th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Access Requested By (HOD)</th>
                                                <th scope="col">Exit Clearance Status</th>


                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-dynamicprivilege">

                                            <tr>
                                                <td>
                                                    Computer Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Intranet Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    HIS Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    I-site Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Department Folder Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Secured/Restricted Area Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Other Application Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Asset Assigned
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    Email ID
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    SAP Access
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                            </tr>




                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="privilege_part">
                                <h3>Privilege Status</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="table-privilege-status"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr >
                                                <th scope="col" style={{ width: "112px" }}></th>
                                                <th scope="col" style={{ width: "112px" }}>Status (Yes/No)</th>
                                                <th scope="col">Remarks</th>

                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-dynamicprivilege-status">

                                            <tr>
                                                <td>
                                                    Renewed
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    Revised
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    New
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    Revoked
                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="privilege_part print-decaration-privilege">
                                <div className="privilege-declaration">
                                    <h3>Declaration</h3>
                                    <p style={{ lineHeight: "26px" }}>
                                        I Mr./Ms. <span className="print-inputfield" id="Print-decleration-employeename"></span> hereby acknowledge that I have received the
                                        above mentioned IT privileges. I understand that this belongs to <span id="print-privilege-unitname" className="privilege_para_input print-inputfield" ></span> and is under my possession for
                                        carrying out my office work. I hereby assure that I will take care of the IT privileges of the company to the best
                                        possible extent.
                                    </p>
                                </div>
                                <div className="row form">
                                    <div className="col-md-4 signature_part sign_part">
                                        <p> Employee Signature: </p>
                                    </div>
                                </div>
                            </div>

                            <div className="privilege_part print-approved_privilege">



                                <h3 style={{ textAlign: "center", textTransform: "uppercase" }}> Approved by</h3>


                                <div className="row form">
                                    <h3>HOD</h3>

                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>
                                <div className="row form">
                                    <h3>HR</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>

                                <div className="row form">
                                    <h3>IT</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
                                    </div>
                                </div>


                                <div className="row form">
                                    <h3>Unit Head</h3>
                                    <div className="col-md-4 signature_part">
                                        <p> Name </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Signature </p>
                                    </div>

                                    <div className="col-md-4 signature_part">
                                        <p> Date </p>
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
                        <div className="pageborder"></div>
                    </div>
                </div>
            </>
        );
    }
}