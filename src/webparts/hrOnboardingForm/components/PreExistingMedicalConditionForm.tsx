import * as React from "react";
import { IPreExistingMedicalConditionFormProps } from "./IHrOnboardingFormProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/presets/all";
import { sp } from "@pnp/sp";
import * as moment from "moment";
import swal from "sweetalert";
import { escape } from "@microsoft/sp-lodash-subset";
import { Log } from "@microsoft/sp-core-library";
import { Markup } from "interweave";
import LogoMaster from "./LogoMaster";
import { IFieldInfo } from "@pnp/sp/fields/types";


export interface IPreExistingMedicalConditionFormState {
    FirstName: string;
    LastName: string;
    Date: string;
    CurrentUserName: any[];
    CurrentUserDesignation: any[];
    BusinessMaster: any[];
    Alreadysublitted: boolean;
    Dynamiclogo: any[];
    firstname: any[];
    lastname: any[];
    ONBSessionID: string;
    PreExistingSubmissionStatus: string;
    isPrevFormSubmitted: boolean;
    ControlNumber: any[];
    VersionNumber: any[];
    PreExistFormControlNumber: any[];
    countrynames: any[];

    HrCompleteStatus: boolean;
}

const newweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/");

var GlobalFormOpenedMode = "New";
var GlobalSessionIDValue = "";
var EditSessionid: string;
var Description;
var officename = "";
var LogoUrl;
var ImageSrcloa = "";
var Mode;
var employeeloabussinessName = "";
var officefirstname;
var officlelastname;

var PreExistID;
var PreExistItemID;
var Occupational_History_Counter = 2;
var Medical_History_Counter = 2;
var Surgical_History_Counter = 2;
var Family_History_Counter = 2;
var ControlNumber;
var VersionNumber;

const subweb = Web("https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/UH/")

export default class PreExistingMedicalConditionForm extends React.Component<IPreExistingMedicalConditionFormProps, IPreExistingMedicalConditionFormState, {}> {
    constructor(props: IPreExistingMedicalConditionFormProps, state: IPreExistingMedicalConditionFormState) {
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            Date: "",
            CurrentUserName: [],
            CurrentUserDesignation: [],
            BusinessMaster: [],
            Alreadysublitted: true,
            Dynamiclogo: [],
            firstname: [],
            lastname: [],
            ONBSessionID: "",
            PreExistingSubmissionStatus: "Inprogress",
            isPrevFormSubmitted: false,
            ControlNumber: [],
            VersionNumber: [],
            PreExistFormControlNumber: [],
            countrynames: [],
            HrCompleteStatus: false
        };


    }
    public componentDidMount() {
        const url: any = new URL(window.location.href);
        PreExistID = url.searchParams.get("PreExItemID");
        Mode = url.searchParams.get("PreExMode");

        GlobalFormOpenedMode = url.searchParams.get("mdeopn");
        GlobalSessionIDValue = url.searchParams.get("glblsessid");
        EditSessionid = url.searchParams.get("glblsessid");

        $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
        $("#spCommandBar").attr("style", "display: none !important");
        $("#spLeftNav").attr("style", "display: none !important");
        $('div[data-automation-id="pageHeader"]').attr("style", "display: none !important");
        $("#spCommandBar,#SuiteNavWrapper").attr("style", "display: none !important");


        if (GlobalFormOpenedMode == "View") {
            this.GetPreExistViewItem(GlobalSessionIDValue);
            this.GetPreExistItemForPrint(GlobalSessionIDValue);
        } else if (GlobalFormOpenedMode == "Edit") {
            this.GetPreExistEditItem(GlobalSessionIDValue);
        }

        this.GetCurrentUserDetails();
        this.getCountryName();
        this.removevalidation();
        this.Preload();

        $("#PregnantNo").prop("checked", true);
        $("#DrugsNo").prop("checked", true);


    }
    public Preload() {
        $("input[name='PreExistingHeight'] ,input[name='PreExistingWeight'], .tble-familyage , .no-of-children , .no-of-pregnancies , .no-of-live-births").on('input', function (e) {
            $(this).val($(this).val().toString().replace(/[^0-9.]/g, '')); // input only take numeric values
        });

        if ($("#PreExistingGender").val() == "Female") {
            $(".female_part").show();
        } else {
            $(".female_part").hide();
        }
        $("#PreExistingGender").on("change", function () {
            if ($(this).val() == "Female") {
                $(".female_part").show();
            } else {
                $(".female_part").hide();
            }
        })
        $("#Medications").on('change', function () {
            if ($(this).prop('checked')) {
                $(".medical-history-table-part").hide();
            } else {
                $(".medical-history-table-part").show();
            }
        })
        $("#Surgical-History").on('change', function () {
            if ($(this).prop('checked')) {
                $(".surgical-history-table-part").hide();
            } else {
                $(".surgical-history-table-part").show();
            }
        })

        $("#Drug-Reaction").on("change", function () {
            $("#err-preexisiting-Drug-Reason").hide();
            if ($(this).prop("checked")) {
                $("#Drug-Reaction-Reason").show()
            } else {
                $("#Drug-Reaction-Reason").hide()
            }
        })
        $("#Allergy").on("change", function () {
            $("#err-preexisiting-Allergy-Reason").hide();
            if ($(this).prop("checked")) {
                $("#Allergy-Reason").show()
            } else {
                $("#Allergy-Reason").hide()
            }
        })
        $("#NoofPregnancies").keyup(function () {
            $("#err-no-of-pregnancies").hide();
        })
        $("#NoofLiveBirths").keyup(function () {
            $("#err-no-of-live-births").hide();
        })

    }
    public async getCountryName() {
        var reactHandler = this;

        await newweb.lists
            .getByTitle("Country Information")
            .items.select("CountryName")
            .orderBy("CountryName", true)
            .top(5000)
            .get()
            .then((items) => {
                reactHandler.setState({
                    countrynames: items,
                });
            });
    }

    public async GetPreExistItemForPrint(ID) {

        await newweb.lists.getByTitle("Pre Existing Medical Condition Transaction")
            .items.select(
                "Title",
                "FirstName",
                "LastName",
                "Nationality",
                "DateofBirth",
                "Gender",
                "Height",
                "Weight",
                "WorkExposure",
                "PersonalHistory",
                "Pregnant",
                "NumberofPregnancies",
                "NumberofLiveBirths",
                "NoofChildren",
                "FamilyHistoryCheck",
                "Tobacco",
                "ExerciseType",
                "Minutes",
                "Alcohol",
                "RecreationalDrugs",
                "Medications",
                "SurgicalHistory",
                "DrugReactionReason",
                "AllergyReason",
                "BusinessUnit",
                "Status",
                "Author/Title",
                "UnitLogo",
                "ONBSessionID",
                "VersionNumber",
                "ControlNumber"
            )
            .filter(`ONBSessionID eq '${GlobalSessionIDValue}'`).expand("Author")
            .get().then((response) => {

                $(".print-btn-preex").show();
                $(".preexist-submit").hide();

                if (response.length != 0) {

                    if (response[0].Medications == 'Yes') {
                        $("#print-Medications").show();
                        $(".print-medical-history-table-part").hide();
                    }
                    if (response[0].SurgicalHistory == 'Yes') {
                        $("#print-Surgical-History").show();
                        $(".print-surgical-history-table-part").hide();
                    }

                    this.GettabledataForPrint(response[0].ID, GlobalSessionIDValue);

                    $("#print-PreExistingFirstName").text(response[0].FirstName)
                    $("#print-PreExistingLastName").text(response[0].LastName)
                    setTimeout(() => {
                        $("#print-PreExistingNationality").text(response[0].Nationality)
                    }, 2000);
                    $("#print-PreExistingDateofBirth").text(moment(response[0].DateofBirth).format("MM-DD-YYYY"))
                    $("#print-PreExistingGender").text(response[0].Gender)

                    $("#print-PreExistingHeight").text(response[0].Height + " cm")
                    $("#print-PreExistingWeight").text(response[0].Weight + " kg")
                    $("#print-NoofPregnancies").text(response[0].NumberofPregnancies)
                    $("#print-NoofLiveBirths").text(response[0].NumberofLiveBirths)
                    $("#print-NoofChildren").text(response[0].NoofChildren)
                    $("#print-tobacco").text(response[0].Tobacco)
                    $("#print-exercisetype").text(response[0].ExerciseType)
                    $("#print-minutes").text(response[0].Minutes)
                    $("#print-alcohol").text(response[0].Alcohol)
                    $("#print-preexisting-Control-Number").text(response[0].ControlNumber)
                    $("#print-preexisting-Version-Number").text(response[0].VersionNumber)

                    if (response[0].Gender == 'Female') {
                        $(".female_part").show();
                        if (response[0].Pregnant == 'Yes') {
                            $("#print-PregnantYes").show();
                            $(".print-female-statics").show();
                        } else if (response[0].Pregnant == 'No') {
                            $("#print-PregnantNo").show();
                            $(".print-female-statics").hide();
                        }
                    }


                    response[0].RecreationalDrugs == 'Yes' && $("#print-DrugsYes").show();
                    response[0].RecreationalDrugs == 'No' && $("#print-DrugsNo").show();


                    if (response[0].WorkExposure != null) {
                        response[0].WorkExposure.map(function (data) {
                            $(`#print-${data}`).attr("checked", "checked");

                            setTimeout(() => {
                                $(`#print-${data}`).prop("disabled", false);
                            }, 2000);

                        })
                    }

                    // $("#print-tble-tbody-preexisiting-personal-history").empty();

                    // if (response[0].PersonalHistory != null) {
                    //     var Personal_History = response[0].PersonalHistory
                    //     if (Personal_History.length < 4) {
                    //         $("#print-table-preexisiting-personal-history").remove();
                    //         Personal_History.map(function (data) {
                    //             var PersChecked = $(`#${data}`).parent().find('span').eq(0).text();
                    //             $("#CheckedPersHist").append(`
                    // <div class="col-md-4"><div class="form-group relative"><span id=print-${data}>${PersChecked}</span></div></div>
                    // `)
                    //             if (data == "Drug-Reaction") {
                    //                 $(`#print-${data}`).text(`${PersChecked}:`)
                    //                 $(`#print-${data}`).parent().addClass("print_report_jr").append(`<p>${response[0].DrugReactionReason}</p>`)
                    //             }
                    //             if (data == "Allergy") {
                    //                 $(`#print-${data}`).text(`${PersChecked}:`)
                    //                 $(`#print-${data}`).parent().addClass("print_report_jr").append(`<p>${response[0].AllergyReason}</p>`)
                    //             }
                    //         })
                    //     } else {
                    //         for (var i = 0; i < Personal_History.length; i++) {
                    //             var PersChecked = $(`#${Personal_History[i]}`).parent().find('span').eq(0).text();
                    //             var id;
                    //             if (i % 3 == 0) {
                    //                 id = i;
                    //                 $("#print-tble-tbody-preexisiting-personal-history").append(`<tr id=print-person-hist${i}></tr>`)
                    //             }
                    //             $(`#print-person-hist${id}`).each(function () {
                    //                 $(this).append(`<td><span id=print-${Personal_History[i]}>${PersChecked}</span></td>`)
                    //             })

                    //             if (Personal_History[i] == "Drug-Reaction") {
                    //                 $(`#print-${Personal_History[i]}`).text(`${PersChecked}:`)
                    //                 $(`#print-${Personal_History[i]}`).parent().addClass("print_report_jr").append(`<p>${response[0].DrugReactionReason}</p>`)
                    //             }
                    //             if (Personal_History[i] == "Allergy") {
                    //                 $(`#print-${Personal_History[i]}`).text(`${PersChecked}:`)
                    //                 $(`#print-${Personal_History[i]}`).parent().addClass("print_report_jr").append(`<p>${response[0].AllergyReason}</p>`)
                    //             }
                    //         }
                    //     }
                    // }
                    if (response[0].PersonalHistory != null) {
                        response[0].PersonalHistory.map(function (data) {
                            $(`#print-${data}`).attr("checked", "checked");

                            if (data == "Drug-Reaction") {
                                $("#print-Drug-Reaction-Reason").show().text(response[0].DrugReactionReason)
                            }
                            if (data == "Allergy") {
                                $("#print-Allergy-Reason").show().text(response[0].AllergyReason)
                            }

                            setTimeout(() => {
                                $(`#print-${data}`).prop("disabled", false);
                            }, 2000);

                        })
                    }

                    if (response[0].FamilyHistoryCheck != null) {
                        response[0].FamilyHistoryCheck.map(function (data) {
                            $(`#print-${data}`).attr("checked", "checked");

                            setTimeout(() => {
                                $(`#print-${data}`).prop("disabled", false);
                            }, 2000);

                        })
                    }
                }
            })


    }

    public async GetPreExistViewItem(GlobalSessionIDValue) {

        await newweb.lists.getByTitle("Pre Existing Medical Condition Transaction")
            .items.select(
                "Title",
                "FirstName",
                "LastName",
                "Nationality",
                "DateofBirth",
                "Gender",
                "Height",
                "Weight",
                "WorkExposure",
                "PersonalHistory",
                "Pregnant",
                "NumberofPregnancies",
                "NumberofLiveBirths",
                "NoofChildren",
                "FamilyHistoryCheck",
                "Tobacco",
                "ExerciseType",
                "Minutes",
                "Alcohol",
                "RecreationalDrugs",
                "Medications",
                "SurgicalHistory",
                "DrugReactionReason",
                "AllergyReason",
                "BusinessUnit",
                "Status",
                "Author/Title",
                "UnitLogo",
                "ONBSessionID",
                "VersionNumber",
                "ControlNumber"
            )
            .filter(`ONBSessionID eq '${GlobalSessionIDValue}'`).expand("Author")
            .get().then((response) => {

                if (response.length != 0) {

                    $(".preexisting-img").show()
                    $(".preexist-submit").hide()
                    $(".preexisiting-disabled").prop("disabled", "disabled");
                    $(".preexisiting_sec input[type=checkbox]").prop("disabled", true);

                    $(".tble-occupational-first-row").hide();
                    $(".tble-familyhistory-first-row").hide();
                    $(".tble-medicalhistory-first-row").hide();
                    $(".tble-surgicalhistory-first-row").hide();
                    $(".Action-columnviewmode-PreExist").hide();
                    $(".Add-new-occupational").hide();
                    $(".Add-new-family-history").hide();
                    $(".Add-new-medical-history").hide();
                    $(".Add-new-surgical-history").hide();

                    if (response[0].Medications == 'Yes') {
                        $("#Medications").prop("checked", true)
                        $(".medical-history-table-part").hide();
                    }

                    if (response[0].SurgicalHistory == 'Yes') {
                        $("#Surgical-History").prop("checked", true)
                        $(".surgical-history-table-part").hide();
                    }

                    this.Gettabledata(response[0].ID, GlobalSessionIDValue);

                    $("#PreExistingFirstName").val(response[0].FirstName)
                    $("#PreExistingLastName").val(response[0].LastName)
                    $("#PreExistingDateofBirth").val(moment(response[0].DateofBirth).format("YYYY-MM-DD"))
                    setTimeout(() => {
                        $("#PreExistingNationality").val(response[0].Nationality)
                    }, 2000);
                    $("#PreExistingGender").val(response[0].Gender)
                    $("#PreExistingHeight").val(response[0].Height)
                    $("#PreExistingWeight").val(response[0].Weight)
                    $("#NoofPregnancies").val(response[0].NumberofPregnancies)
                    $("#NoofLiveBirths").val(response[0].NumberofLiveBirths)
                    $("#NoofChildren").val(response[0].NoofChildren)
                    $("#tobacco").val(response[0].Tobacco)
                    $("#exercisetype").val(response[0].ExerciseType)
                    $("#minutes").val(response[0].Minutes)
                    $("#alcohol").val(response[0].Alcohol)

                    if (response[0].Gender == 'Female') {
                        $(".female_part").show();
                        if (response[0].Pregnant == 'Yes') {
                            $("#PregnantYes").prop("checked", true)
                            $("#PregnantNo").prop("checked", false)
                            $(".female-statics").show();
                        } else if (response[0].Pregnant == 'No') {
                            $("#PregnantNo").prop("checked", true)
                            $("#PregnantYes").prop("checked", false)
                            $(".female-statics").hide();
                        }
                    }

                    if (response[0].RecreationalDrugs == 'Yes') {
                        $("#DrugsYes").prop("checked", true)
                        $("#DrugsNo").prop("checked", false);
                    } else if (response[0].RecreationalDrugs == 'No') {
                        $("#DrugsNo").prop("checked", true)
                        $("#DrugsYes").prop("checked", false)
                    }


                    // var Work_Exposure = response[0].WorkExposure

                    if (response[0].WorkExposure != null) {
                        response[0].WorkExposure.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }

                    //var Personal_History = response[0].PersonalHistory

                    if (response[0].PersonalHistory != null) {
                        response[0].PersonalHistory.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                            if (data == "Drug-Reaction") {
                                $("#Drug-Reaction-Reason").show().val(response[0].DrugReactionReason)
                            }
                            if (data == "Allergy") {
                                $("#Allergy-Reason").show().val(response[0].AllergyReason)
                            }
                        })
                    }

                    //    var Family_HistoryCheck = response[0].FamilyHistoryCheck

                    if (response[0].FamilyHistoryCheck != null) {
                        response[0].FamilyHistoryCheck.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }
                }
            })
    }

    public async GetPreExistEditItem(GlobalSessionIDValue) {

        await newweb.lists.getByTitle("Pre Existing Medical Condition Transaction")
            .items.select(
                "Title",
                "FirstName",
                "LastName",
                "Nationality",
                "DateofBirth",
                "Gender",
                "Height",
                "Weight",
                "WorkExposure",
                "PersonalHistory",
                "Pregnant",
                "NumberofPregnancies",
                "NumberofLiveBirths",
                "NoofChildren",
                "FamilyHistoryCheck",
                "Tobacco",
                "ExerciseType",
                "Minutes",
                "Alcohol",
                "RecreationalDrugs",
                "Medications",
                "SurgicalHistory",
                "DrugReactionReason",
                "AllergyReason",
                "BusinessUnit",
                "Status",
                "Author/Title",
                "UnitLogo",
                "ONBSessionID",
                "VersionNumber",
                "ControlNumber",
                "ID"
            )
            .filter(`ONBSessionID eq '${GlobalSessionIDValue}'`).expand("Author")
            .get().then((response) => {

                if (response.length != 0) {

                    PreExistItemID = response[0].ID
                    ControlNumber = response[0].ControlNumber
                    VersionNumber = response[0].VersionNumber

                    $(".tble-occupational-first-row").remove()
                    $(".tble-familyhistory-first-row").remove()
                    $(".tble-medicalhistory-first-row").remove()
                    $(".tble-surgicalhistory-first-row").remove()

                    $(".preexisting-img").show()
                    $(".preexist-submit").hide()
                    $("#update-btn-preexist").show();

                    if (response[0].Medications == 'Yes') {
                        $("#Medications").prop("checked", true)
                        $(".medical-history-table-part").hide();
                    }

                    if (response[0].SurgicalHistory == 'Yes') {
                        $("#Surgical-History").prop("checked", true)
                        $(".surgical-history-table-part").hide();
                    }

                    this.Gettabledata(response[0].ID, GlobalSessionIDValue);

                    $("#PreExistingFirstName").val(response[0].FirstName)
                    $("#PreExistingLastName").val(response[0].LastName)
                    $("#PreExistingDateofBirth").val(moment(response[0].DateofBirth).format("YYYY-MM-DD"))
                    setTimeout(() => {
                        $("#PreExistingNationality").val(response[0].Nationality)
                    }, 2000);
                    $("#PreExistingGender").val(response[0].Gender)
                    $("#PreExistingHeight").val(response[0].Height)
                    $("#PreExistingWeight").val(response[0].Weight)
                    $("#NoofPregnancies").val(response[0].NumberofPregnancies)
                    $("#NoofLiveBirths").val(response[0].NumberofLiveBirths)
                    $("#NoofChildren").val(response[0].NoofChildren)
                    $("#tobacco").val(response[0].Tobacco)
                    $("#exercisetype").val(response[0].ExerciseType)
                    $("#minutes").val(response[0].Minutes)
                    $("#alcohol").val(response[0].Alcohol)

                    if (response[0].Gender == 'Female') {
                        $(".female_part").show();
                        if (response[0].Pregnant == 'Yes') {
                            $("#PregnantYes").prop("checked", true)
                            $("#PregnantNo").prop("checked", false)
                            $(".female-statics").show();
                        } else if (response[0].Pregnant == 'No') {
                            $("#PregnantNo").prop("checked", true)
                            $("#PregnantYes").prop("checked", false)
                            $(".female-statics").hide();
                        }
                    }

                    if (response[0].RecreationalDrugs == 'Yes') {
                        $("#DrugsYes").prop("checked", true)
                        $("#DrugsNo").prop("checked", false);
                    } else if (response[0].RecreationalDrugs == 'No') {
                        $("#DrugsNo").prop("checked", true)
                        $("#DrugsYes").prop("checked", false)
                    }


                    // var Work_Exposure = response[0].WorkExposure

                    if (response[0].WorkExposure != null) {
                        response[0].WorkExposure.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }

                    //var Personal_History = response[0].PersonalHistory

                    if (response[0].PersonalHistory != null) {
                        response[0].PersonalHistory.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                            if (data == "Drug-Reaction") {
                                $("#Drug-Reaction-Reason").show().val(response[0].DrugReactionReason)
                            }
                            if (data == "Allergy") {
                                $("#Allergy-Reason").show().val(response[0].AllergyReason)
                            }
                        })
                    }

                    //    var Family_HistoryCheck = response[0].FamilyHistoryCheck

                    if (response[0].FamilyHistoryCheck != null) {
                        response[0].FamilyHistoryCheck.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }
                }
            })
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

        this.GetUsernamefrompersonalinfo(ONBSessionID)
        newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'HR IT PRIVILEGE FORM' and Status eq 'Completed'").orderBy("Created", false).get().then((response) => {
            if (response.length != 0) {
                this.setState({
                    isPrevFormSubmitted: true
                });
            }
        });
        newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + ONBSessionID + "' and Title eq 'PRE EXISTING MEDICAL CONDITION FORM'").orderBy("Created", false).get().then((response) => {
            if (response.length != 0) {
                if (response[0].Title == "PRE EXISTING MEDICAL CONDITION FORM") {
                    this.setState({
                        PreExistingSubmissionStatus: response[0].Status
                    });
                    if (GlobalFormOpenedMode == "New" && response[0].Status == "Completed") {
                        this.GetPreExistinglistitem(ONBSessionID, FormMode);
                    }
                }
            }
        });

    }

    public async GetPreExistinglistitem(ONBSessionID, FormMode) {
        await newweb.lists.getByTitle("Pre Existing Medical Condition Transaction")
            .items.select(
                "Title",
                "FirstName",
                "LastName",
                "Nationality",
                "DateofBirth",
                "Gender",
                "Height",
                "Weight",
                "WorkExposure",
                "PersonalHistory",
                "Pregnant",
                "NumberofPregnancies",
                "NumberofLiveBirths",
                "NoofChildren",
                "FamilyHistoryCheck",
                "Tobacco",
                "ExerciseType",
                "Minutes",
                "Alcohol",
                "RecreationalDrugs",
                "Medications",
                "SurgicalHistory",
                "DrugReactionReason",
                "AllergyReason",
                "BusinessUnit",
                "Status",
                "Author/Title",
                "UnitLogo",
                "ONBSessionID",
                "VersionNumber",
                "ControlNumber"
            )
            .filter(`ONBSessionID eq '${ONBSessionID}'`).expand("Author")
            .get().then((response) => {

                if (response.length != 0) {
                    $(".preexisting-img").show();
                    $(".preexist-submit").hide();
                    $(".preexisiting-disabled").prop("disabled", "disabled");
                    $(".preexisiting_sec input[type=checkbox]").prop("disabled", true);

                    $(".tble-occupational-first-row").hide();
                    $(".tble-familyhistory-first-row").hide();
                    $(".tble-medicalhistory-first-row").hide();
                    $(".tble-surgicalhistory-first-row").hide();

                    $(".Action-columnviewmode-PreExist").hide();
                    $(".Add-new-occupational").hide();
                    $(".Add-new-family-history").hide();
                    $(".Add-new-medical-history").hide();
                    $(".Add-new-surgical-history").hide();

                    if (response[0].Medications == 'Yes') {
                        $("#Medications").prop("checked", true)
                        $(".medical-history-table-part").hide();
                    }
                    response[0].SurgicalHistory
                    if (response[0].SurgicalHistory == 'Yes') {
                        $("#Surgical-History").prop("checked", true)
                        $(".surgical-history-table-part").hide();
                    }

                    this.Gettabledata(response[0].ID, ONBSessionID);

                    $("#PreExistingFirstName").val(response[0].FirstName)
                    $("#PreExistingLastName").val(response[0].LastName)
                    $("#PreExistingNationality").val(response[0].Nationality)
                    $("#PreExistingDateofBirth").val(moment(response[0].DateofBirth).format("YYYY-MM-DD"))
                    $("#PreExistingGender").val(response[0].Gender)
                    $("#PreExistingHeight").val(response[0].Height)
                    $("#PreExistingWeight").val(response[0].Weight)
                    $("#NoofPregnancies").val(response[0].NumberofPregnancies)
                    $("#NoofLiveBirths").val(response[0].NumberofLiveBirths)
                    $("#NoofChildren").val(response[0].NoofChildren)
                    $("#tobacco").val(response[0].Tobacco)
                    $("#exercisetype").val(response[0].ExerciseType)
                    $("#minutes").val(response[0].Minutes)
                    $("#alcohol").val(response[0].Alcohol)


                    if (response[0].Gender == 'Female') {
                        $(".female_part").show();
                        if (response[0].Pregnant == 'Yes') {
                            $("#PregnantYes").prop("checked", true)
                            $("#PregnantNo").prop("checked", false)
                            $(".female-statics").show();
                        } else if (response[0].Pregnant == 'No') {
                            $("#PregnantNo").prop("checked", true)
                            $("#PregnantYes").prop("checked", false)
                            $(".female-statics").hide();
                        }
                    }

                    if (response[0].RecreationalDrugs == 'Yes') {
                        $("#DrugsYes").prop("checked", true)
                        $("#DrugsNo").prop("checked", false);
                    } else if (response[0].RecreationalDrugs == 'No') {
                        $("#DrugsNo").prop("checked", true)
                        $("#DrugsYes").prop("checked", false)
                    }

                    // var Work_Exposure = response[0].WorkExposure

                    if (response[0].WorkExposure != null) {
                        response[0].WorkExposure.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }

                    //var Personal_History = response[0].PersonalHistory

                    if (response[0].PersonalHistory != null) {
                        response[0].PersonalHistory.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                            if (data == "Drug-Reaction") {
                                $("#Drug-Reaction-Reason").show().val(response[0].DrugReactionReason)
                            }
                            if (data == "Allergy") {
                                $("#Allergy-Reason").show().val(response[0].AllergyReason)
                            }
                        })
                    }

                    //    var Family_HistoryCheck = response[0].FamilyHistoryCheck

                    if (response[0].FamilyHistoryCheck != null) {
                        response[0].FamilyHistoryCheck.map(function (data) {
                            $(`#${data}`).prop("checked", true);
                        })
                    }
                }
            })
    }

    public Gettabledata(Id, ONBSessionID) {
        if (GlobalFormOpenedMode == "New" || GlobalFormOpenedMode == "View") {
            newweb.lists
                .getByTitle("Occupational History")
                .items.select(
                    "PreExistingId",
                    "From",
                    "To",
                    "Occupation",
                    "ONBSessionID",
                    "OrderNo",
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")
                .orderBy("OrderNo", true)
                .get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="occu-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input type="month" id="Occupational-From" class="form-control" autoComplete="off"value="' +
                                    result[i].From +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="month" id="Occupational-To" class="form-control" autoComplete="off" value="' +
                                    result[i].To +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="Occupation"  class="form-control" autoComplete="off"value="' +
                                    result[i].Occupation +
                                    '" disabled></input></td>';
                                newrow.append(cols);
                                $("table #tble-tbody-preexisiting-occupational").append(newrow);

                            }
                        }
                    }
                });

            newweb.lists
                .getByTitle("Family History")
                .items.select(
                    "PreExistingId",
                    "Family",
                    "Age",
                    "StateofHealth",
                    "ONBSessionID",
                    "OrderNo",
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")
                .orderBy("OrderNo", true)
                .get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            // if (result[i].From != "-" || result[i].To != "-") {

                            var newrow = $("<tr>");
                            var cols = "";

                            cols +=
                                '<td><input type="hidden" id="familyhist-itm-id" value="' +
                                result[i].ID +
                                '"></input><input type="text" id="familyhistory-famliy" class="form-control" autoComplete="off"value="' +
                                result[i].Family +
                                '" disabled></input></td>';
                            cols +=
                                '<td><input type="text" id="FamilyAge" class="form-control" autoComplete="off" value="' +
                                result[i].Age +
                                '" disabled></input></td>';
                            cols +=
                                '<td><input type="text" id="StateofHealth"  class="form-control" autoComplete="off"value="' +
                                result[i].StateofHealth +
                                '" disabled></input></td>';
                            newrow.append(cols);
                            $("table #tble-tbody-preexisiting-familyhistory").append(newrow);

                            // }
                        }
                    }
                });
            if ($("#Medications").prop("checked") == false) {
                newweb.lists
                    .getByTitle("Medical History")
                    .items.select(
                        "PreExistingId",
                        "MedicationandDosage",
                        "DateStarted",
                        "ReasonforMedication",
                        "Currently",
                        "ONBSessionID",
                        "OrderNo",
                    )
                    .filter("ONBSessionID eq '" + ONBSessionID + "'")
                    .orderBy("OrderNo", true)
                    .get()
                    .then((result) => {
                        if (result.length != 0) {

                            for (var i = 0; i < result.length; i++) {
                                // if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="occu-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input  id="Medication-and-dosage" class="form-control" autoComplete="off"value="' +
                                    result[i].MedicationandDosage +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="date" id="Date-Started" class="form-control" autoComplete="off" value="' +
                                    result[i].DateStarted +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="Reason-for-medication"  class="form-control" autoComplete="off"value="' +
                                    result[i].ReasonforMedication +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="currently-taking-this-medication"  class="form-control" autoComplete="off"value="' +
                                    result[i].Currently +
                                    '" disabled></input></td>';
                                newrow.append(cols);
                                $("table #tble-tbody-preexisiting-medicalhistory").append(newrow);

                                // }
                            }
                        }
                    });
            }
            if ($("#Surgical-History").prop("checked") == false) {
                newweb.lists
                    .getByTitle("Surgical History")
                    .items.select(
                        "PreExistingId",
                        "Date",
                        "Problem",
                        "SurgeryPerfomred",
                        "CurrentStatus",
                        "ONBSessionID",
                        "OrderNo",
                    )
                    .filter("ONBSessionID eq '" + ONBSessionID + "'")
                    .orderBy("OrderNo", true)
                    .get()
                    .then((result) => {
                        if (result.length != 0) {

                            for (var i = 0; i < result.length; i++) {
                                // if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="occu-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input type="date"  id="Surgical-History-Date" class="form-control" autoComplete="off"value="' +
                                    result[i].Date +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="Surgical-History-Surgey" class="form-control" autoComplete="off" value="' +
                                    result[i].Problem +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="Surgical-History-Surgey-Perfomred"  class="form-control" autoComplete="off"value="' +
                                    result[i].SurgeryPerfomred +
                                    '" disabled></input></td>';
                                cols +=
                                    '<td><input type="text" id="Surgical-History-Current-Status"  class="form-control" autoComplete="off"value="' +
                                    result[i].CurrentStatus +
                                    '" disabled></input></td>';
                                newrow.append(cols);
                                $("table #tble-tbody-preexisiting-surgicalhistory").append(newrow);

                                // }
                            }
                        }
                    });
            }
        } else if (GlobalFormOpenedMode == "Edit") {
            newweb.lists
                .getByTitle("Occupational History")
                .items.select(
                    "ID",
                    "PreExistingId",
                    "From",
                    "To",
                    "Occupation",
                    "ONBSessionID",
                    "OrderNo",
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")
                .orderBy("OrderNo", true)
                .get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="occu-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input type="month" id="Occupational-From" class="form-control" autoComplete="off"value="' +
                                    result[i].From +
                                    '" ></input></td>';
                                cols +=
                                    '<td><input type="month" id="Occupational-To" class="form-control" autoComplete="off" value="' +
                                    result[i].To +
                                    '" ></input></td>';
                                cols +=
                                    '<td><input type="text" id="Occupation"  class="form-control" autoComplete="off"value="' +
                                    result[i].Occupation +
                                    '" ></input></td>';
                                newrow.append(cols);
                                $("table #tble-tbody-preexisiting-occupational").append(newrow);

                            }
                        }
                    }
                });

            newweb.lists
                .getByTitle("Family History")
                .items.select(
                    "ID",
                    "PreExistingId",
                    "Family",
                    "Age",
                    "StateofHealth",
                    "ONBSessionID",
                    "OrderNo",
                )
                .filter("ONBSessionID eq '" + ONBSessionID + "'")
                .orderBy("OrderNo", true)
                .get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            // if (result[i].From != "-" || result[i].To != "-") {

                            var newrow = $("<tr>");
                            var cols = "";

                            cols +=
                                '<td><input type="hidden" id="familyhist-itm-id" value="' +
                                result[i].ID +
                                '"></input><select id="familyhistory-famliy" class="form-control familyhistory-tble-family-' + i +
                                '"><option value="">Select</option><option value="Father">Father</option><option value="Mother">Mother</option><option value="Brother">Brother(s)</option><option value="Sister">Sister(s)</option><option value="Spouse">Spouse</option><option value="Son">Son(s)</option><option value="Daughter">Daughter(s)</option></select></td>';

                            cols +=
                                '<td><input type="text" id="FamilyAge" class="form-control tble-familyage" autoComplete="off" value="' +
                                result[i].Age +
                                '" ></input></td>';
                            cols +=
                                '<td><input type="text" id="StateofHealth"  class="form-control" autoComplete="off"value="' +
                                result[i].StateofHealth +
                                '" ></input></td>';
                            newrow.append(cols);
                            $("table #tble-tbody-preexisiting-familyhistory").append(newrow);
                            $(".familyhistory-tble-family-" + i + "").val(result[i].Family);
                            // }
                        }
                    }
                });
            if ($("#Medications").prop("checked") == false) {
                newweb.lists
                    .getByTitle("Medical History")
                    .items.select(
                        "ID",
                        "PreExistingId",
                        "MedicationandDosage",
                        "DateStarted",
                        "ReasonforMedication",
                        "Currently",
                        "ONBSessionID",
                        "OrderNo",
                    )
                    .filter("ONBSessionID eq '" + ONBSessionID + "'")
                    .orderBy("OrderNo", true)
                    .get()
                    .then((result) => {
                        if (result.length != 0) {

                            for (var i = 0; i < result.length; i++) {
                                // if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="med-hist-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input  id="Medication-and-dosage" class="form-control" autoComplete="off"value="' +
                                    result[i].MedicationandDosage +
                                    '" ></input></td>';
                                cols +=
                                    '<td><input type="date" id="Date-Started" class="form-control" autoComplete="off" value="' +
                                    result[i].DateStarted +
                                    '" ></input></td>';
                                cols +=
                                    '<td><input type="text" id="Reason-for-medication"  class="form-control" autoComplete="off"value="' +
                                    result[i].ReasonforMedication +
                                    '" ></input></td>';
                                cols +=
                                    '<td><select id="currently-taking-this-medication"  class="form-control currently-taking-' + i +
                                    '" ><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select></td>';
                                newrow.append(cols);

                                $("table #tble-tbody-preexisiting-medicalhistory").append(newrow);
                                $(".currently-taking-" + i + "").val(result[i].Currently)
                                // }
                            }
                        }
                    });
            }
            if ($("#Surgical-History").prop("checked") == false) {
                newweb.lists
                    .getByTitle("Surgical History")
                    .items.select(
                        "ID",
                        "PreExistingId",
                        "Date",
                        "Problem",
                        "SurgeryPerfomred",
                        "CurrentStatus",
                        "ONBSessionID",
                        "OrderNo",
                    )
                    .filter("ONBSessionID eq '" + ONBSessionID + "'")
                    .orderBy("OrderNo", true)
                    .get()
                    .then((result) => {
                        if (result.length != 0) {

                            for (var i = 0; i < result.length; i++) {
                                // if (result[i].From != "-" || result[i].To != "-") {

                                var newrow = $("<tr>");
                                var cols = "";

                                cols +=
                                    '<td><input type="hidden" id="sur-hist-itm-id" value="' +
                                    result[i].ID +
                                    '"></input><input type="date"  id="Surgical-History-Date" class="form-control" autoComplete="off"value="' +
                                    result[i].Date +
                                    '" ></input></td>';
                                cols +=
                                    '<td><input type="text" id="Surgical-History-Surgey" class="form-control" autoComplete="off" value="' +
                                    result[i].Problem +
                                    '" ></input></td>';
                                cols +=
                                    '<td><select id="Surgical-History-Surgey-Perfomred"  class="form-control surgey-perfomred-' + i +
                                    '" ><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select></td>';
                                cols +=
                                    '<td><input type="text" id="Surgical-History-Current-Status"  class="form-control" autoComplete="off"value="' +
                                    result[i].CurrentStatus +
                                    '" ></input></td>';
                                newrow.append(cols);
                                $("table #tble-tbody-preexisiting-surgicalhistory").append(newrow);
                                $(".surgey-perfomred-" + i + "").val(result[i].SurgeryPerfomred)
                                // }
                            }
                        }
                    });
            }
        }

    }

    public GettabledataForPrint(ID, ONBSessionID) {
        newweb.lists.getByTitle("Occupational History")
            .items.select(
                "ID",
                "PreExistingId",
                "From",
                "To",
                "Occupation",
                "ONBSessionID",
                "OrderNo",
            )
            .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true).get()
            .then((result) => {
                if (result.length != 0) {

                    for (var i = 0; i < result.length; i++) {
                        // if (result[i].From != "-" || result[i].To != "-") {
                        var from = result[i].From != "-" ? moment(result[i].From).format("MM/YYYY") : "-";
                        var to = result[i].To != "-" ? moment(result[i].To).format("MM/YYYY") : "-";

                        var newrow = $("<tr>");
                        var cols = "";

                        cols +=
                            '<td><span  id="Occupational-From" >' +
                            from +
                            '</span></td>';
                        cols +=
                            '<td><span  id="Occupational-To" >' +
                            to +
                            '</span></td>';
                        cols +=
                            '<td><span id="Occupation"  >' +
                            result[i].Occupation +
                            '</span></td>';
                        newrow.append(cols);
                        $("table #print-tble-tbody-preexisiting-occupational").append(newrow);

                        // }
                    }
                    if (result.length < 3) {
                        var occu_remainingrow: number = 3 - result.length

                        for (var i = 0; i < occu_remainingrow; i++) {

                            var newRow = $("<tr>");
                            var cols = "";

                            cols += '<td><span id="Occupational-From" >' + "-" + '</span></td>';
                            cols += '<td><span id="Occupational-To" >' + "-" + '</span></td>';
                            cols += '<td><span id="Occupation">' + "-" + '</span></td>';

                            newRow.append(cols);
                            $("table #print-tble-tbody-preexisiting-occupational").append(newRow);

                        }

                    }
                } else {

                    for (var i = 0; i < 3; i++) {

                        var newRow = $("<tr>");
                        var cols = "";

                        cols += '<td><span id="Occupational-From" >' + "-" + '</span></td>';
                        cols += '<td><span id="Occupational-To" >' + "-" + '</span></td>';
                        cols += '<td><span id="Occupation">' + "-" + '</span></td>';

                        newRow.append(cols);
                        $("table #print-tble-tbody-preexisiting-occupational").append(newRow);

                    }
                }

            });

        newweb.lists.getByTitle("Family History")
            .items.select(
                "ID",
                "PreExistingId",
                "Family",
                "Age",
                "StateofHealth",
                "ONBSessionID",
                "OrderNo",
            )
            .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true).get()
            .then((result) => {
                if (result.length != 0) {

                    for (var i = 0; i < result.length; i++) {
                        // if (result[i].From != "-" || result[i].To != "-") {

                        var newrow = $("<tr>");
                        var cols = "";

                        cols +=
                            '<td><span id="familyhistory-famliy" class="print-familyhistory-tble-family-' + i +
                            '"></span></td>';
                        cols +=
                            '<td><span id="FamilyAge"> ' +
                            result[i].Age +
                            '</span></td>';
                        cols +=
                            '<td><span id="StateofHealth" > ' +
                            result[i].StateofHealth +
                            '</span></td>';
                        newrow.append(cols);
                        $("table #print-tble-tbody-preexisiting-familyhistory").append(newrow);
                        $(".print-familyhistory-tble-family-" + i + "").text(result[i].Family);
                        // }
                    } if (result.length < 12) {
                        var famrow = 12 - result.length
                        for (var i = 0; i < famrow; i++) {

                            var newRow = $("<tr>");
                            var cols = "";

                            cols += '<td><span id="familyhistory-famliy" >' + "-" + '</span></td>';
                            cols += '<td><span id="FamilyAge" >' + "-" + '</span></td>';
                            cols += '<td><span id="StateofHealth">' + "-" + '</span></td>';

                            newRow.append(cols);
                            $("table #print-tble-tbody-preexisiting-familyhistory").append(newRow);

                        }
                    }
                } else {

                    for (var i = 0; i < 12; i++) {

                        var newRow = $("<tr>");
                        var cols = "";

                        cols += '<td><span id="familyhistory-famliy" >' + "-" + '</span></td>';
                        cols += '<td><span id="FamilyAge" >' + "-" + '</span></td>';
                        cols += '<td><span id="StateofHealth">' + "-" + '</span></td>';

                        newRow.append(cols);
                        $("table #print-tble-tbody-preexisiting-familyhistory").append(newRow);

                    }
                }
            });

        if ($("#Medications").prop("checked") == false) {
            newweb.lists.getByTitle("Medical History").items.select(
                "ID",
                "PreExistingId",
                "MedicationandDosage",
                "DateStarted",
                "ReasonforMedication",
                "Currently",
                "ONBSessionID",
                "OrderNo",
            )
                .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true).get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            // if (result[i].From != "-" || result[i].To != "-") {

                            var newrow = $("<tr>");
                            var cols = "";

                            var date = result[i].DateStarted != "-" ? moment(result[i].DateStarted).format("DD/MM/YYYY") : "-";

                            cols +=
                                '<td><span  id="Medication-and-dosage" >' +
                                result[i].MedicationandDosage +
                                '</span></td>';
                            cols +=
                                '<td><span id="Date-Started"  >' +
                                date +
                                '</span></td>';
                            cols +=
                                '<td><span id="Reason-for-medication" >' +
                                result[i].ReasonforMedication +
                                '</span></td>';
                            cols +=
                                '<td><span id="currently-taking-this-medication" class="print-currently-taking-' + i +
                                '" ></span></td>';
                            newrow.append(cols);

                            $("table #print-tble-tbody-preexisiting-medicalhistory").append(newrow);
                            $(".print-currently-taking-" + i + "").text(result[i].Currently)
                            // }
                        }
                        if (result.length < 5) {
                            var medrow = 5 - result.length
                            for (var i = 0; i < medrow; i++) {

                                var newRow = $("<tr>");
                                var cols = "";

                                cols += '<td><span id="Medication-and-dosage" >' + "-" + '</span></td>';
                                cols += '<td><span id="Date-Started" >' + "-" + '</span></td>';
                                cols += '<td><span id="Reason-for-medication">' + "-" + '</span></td>';
                                cols += '<td><span id="currently-taking-this-medication">' + "-" + '</span></td>';

                                newRow.append(cols);
                                $("table #print-tble-tbody-preexisiting-medicalhistory").append(newRow);

                            }
                        }
                    } else {

                        for (var i = 0; i < 5; i++) {

                            var newRow = $("<tr>");
                            var cols = "";

                            cols += '<td><span id="Medication-and-dosage" >' + "-" + '</span></td>';
                            cols += '<td><span id="Date-Started" >' + "-" + '</span></td>';
                            cols += '<td><span id="Reason-for-medication">' + "-" + '</span></td>';
                            cols += '<td><span id="currently-taking-this-medication">' + "-" + '</span></td>';

                            newRow.append(cols);
                            $("table #print-tble-tbody-preexisiting-medicalhistory").append(newRow);

                        }
                    }
                });
        }
        if ($("#Surgical-History").prop("checked") == false) {
            newweb.lists.getByTitle("Surgical History").items.select(
                "ID",
                "PreExistingId",
                "Date",
                "Problem",
                "SurgeryPerfomred",
                "CurrentStatus",
                "ONBSessionID",
                "OrderNo",
            )
                .filter("ONBSessionID eq '" + ONBSessionID + "'").orderBy("OrderNo", true).get()
                .then((result) => {
                    if (result.length != 0) {

                        for (var i = 0; i < result.length; i++) {
                            // if (result[i].From != "-" || result[i].To != "-") {

                            var newrow = $("<tr>");
                            var cols = "";

                            var date = result[i].Date != "-" ? moment(result[i].Date).format("DD/MM/YYYY") : "-";
                            cols +=
                                '<td><span id="Surgical-History-Date"  >' +
                                date +
                                '</span></td>';
                            cols +=
                                '<td><span type="text" id="Surgical-History-Surgey"  >' +
                                result[i].Problem +
                                '</span></td>';
                            cols +=
                                '<td><span id="Surgical-History-Surgey-Perfomred"  class="print-surgey-perfomred-' + i +
                                '" ></span></td>';
                            cols +=
                                '<td><span type="text" id="Surgical-History-Current-Status"   >' +
                                result[i].CurrentStatus +
                                '</span></td>';
                            newrow.append(cols);
                            $("table #print-tble-tbody-preexisiting-surgicalhistory").append(newrow);
                            $(".print-surgey-perfomred-" + i + "").text(result[i].SurgeryPerfomred)
                            // }
                        } if (result.length < 5) {
                            var surgrow = 5 - result.length;
                            for (var i = 0; i < surgrow; i++) {

                                var newRow = $("<tr>");
                                var cols = "";

                                cols += '<td><span id="Surgical-History-Date" >' + "-" + '</span></td>';
                                cols += '<td><span id="Surgical-History-Surgey" >' + "-" + '</span></td>';
                                cols += '<td><span id="Surgical-History-Surgey-Perfomred">' + "-" + '</span></td>';
                                cols += '<td><span id="Surgical-History-Current-Status">' + "-" + '</span></td>';

                                newRow.append(cols);
                                $("table #print-tble-tbody-preexisiting-surgicalhistory").append(newRow);

                            }
                        }
                    } else {

                        for (var i = 0; i < 5; i++) {

                            var newRow = $("<tr>");
                            var cols = "";

                            cols += '<td><span id="Surgical-History-Date" >' + "-" + '</span></td>';
                            cols += '<td><span id="Surgical-History-Surgey" >' + "-" + '</span></td>';
                            cols += '<td><span id="Surgical-History-Surgey-Perfomred">' + "-" + '</span></td>';
                            cols += '<td><span id="Surgical-History-Current-Status">' + "-" + '</span></td>';

                            newRow.append(cols);
                            $("table #print-tble-tbody-preexisiting-surgicalhistory").append(newRow);

                        }
                    }
                });

        }
    }

    public UpdateListItemPreExist() {
        if (this.FirstName() &&
            this.LastName() &&
            this.Nationality() &&
            this.DateofBirth() &&
            this.Gender() &&
            this.Drug_Reaction() &&
            this.Allergy() &&
            this.NoofPregnancies() &&
            this.NoofLiveBirths()
        ) {

            var Work_Exposure = [], Personal_History = [], Family_HistoryCheck = [];


            $('input[name=Work-Exposure]:checked').each(function () {
                var text = $(this).attr("id")
                Work_Exposure.push(text)
            });

            $('input[name=Personal-History]:checked').each(function () {
                var text = $(this).attr("id")
                Personal_History.push(text)
            });

            $('input[name=family-history-check]:checked').each(function () {
                var text = $(this).attr("id")
                Family_HistoryCheck.push(text)
            });
            var Pregnant = null;
            var NoofPregnancies = null;
            var NoofLiveBirths = null;

            if ($("#PreExistingGender").val() == 'Female') {
                if ($("#PregnantYes").prop("checked")) {
                    Pregnant = 'Yes'
                    NoofPregnancies = $("#NoofPregnancies").val();
                    NoofLiveBirths = $("#NoofLiveBirths").val();
                }
                if ($("#PregnantNo").prop("checked")) {
                    Pregnant = 'No'
                }
            }

            var Drugs
            if ($("#DrugsYes").prop("checked") == true) {
                Drugs = "Yes"
            }
            if ($("#DrugsNo").prop("checked") == true) {
                Drugs = "No"
            }

            swal({
                text: "Please wait!",
                button: false,
                closeOnClickOutside: false,
            } as any);

            newweb.lists.getByTitle("Pre Existing Medical Condition Transaction")
                .items.getById(PreExistItemID)
                .update({
                    Title: "PRE EXISTING MEDICAL CONDITION FORM",
                    FirstName: $("#PreExistingFirstName").val(),
                    LastName: $("#PreExistingLastName").val(),
                    Nationality: $("#PreExistingNationality").val(),
                    DateofBirth: $("#PreExistingDateofBirth").val(),
                    Gender: $("#PreExistingGender").val(),
                    Height: $("#PreExistingHeight").val() != "" ? $("#PreExistingHeight").val() : "-",
                    Weight: $("#PreExistingWeight").val() != "" ? $("#PreExistingWeight").val() : "-",
                    WorkExposure: { results: Work_Exposure },
                    PersonalHistory: { results: Personal_History },
                    Pregnant: Pregnant,
                    NumberofPregnancies: NoofPregnancies,
                    NumberofLiveBirths: NoofLiveBirths,
                    NoofChildren: $("#NoofChildren").val() != "" ? $("#NoofChildren").val() : "-",
                    FamilyHistoryCheck: { results: Family_HistoryCheck },
                    Tobacco: $("#tobacco").val() != "" ? $("#tobacco").val() : "-",
                    ExerciseType: $("#exercisetype").val() != "" ? $("#exercisetype").val() : "-",
                    Minutes: $("#minutes").val() != "" ? $("#minutes").val() : "-",
                    Alcohol: $("#alcohol").val() != "" ? $("#alcohol").val() : "-",
                    RecreationalDrugs: Drugs,
                    Medications: $("#Medications").prop("checked") ? 'Yes' : 'No',
                    SurgicalHistory: $("#Surgical-History").prop("checked") ? 'Yes' : 'No',
                    DrugReactionReason: $("#Drug-Reaction").prop("checked") ? $("#Drug-Reaction-Reason").val() : null,
                    AllergyReason: $("#Allergy").prop("checked") ? $("#Allergy-Reason").val() : null,

                    Status: "Updated by Unit HR",
                }).then(() => {
                    this.UpdateTableData(PreExistItemID, GlobalSessionIDValue)
                    if (this.state.HrCompleteStatus == true) {

                        subweb.lists.getByTitle("Pre Existing Medical Condition HR Update History").items
                            .add({
                                Title: "PRE EXISTING MEDICAL CONDITION FORM",
                                FirstName: $("#PreExistingFirstName").val(),
                                LastName: $("#PreExistingLastName").val(),
                                Nationality: $("#PreExistingNationality").val(),
                                DateofBirth: $("#PreExistingDateofBirth").val(),
                                Gender: $("#PreExistingGender").val(),
                                Height: $("#PreExistingHeight").val() != "" ? $("#PreExistingHeight").val() : "-",
                                Weight: $("#PreExistingWeight").val() != "" ? $("#PreExistingWeight").val() : "-",
                                WorkExposure: { results: Work_Exposure },
                                PersonalHistory: { results: Personal_History },
                                Pregnant: Pregnant,
                                NumberofPregnancies: NoofPregnancies,
                                NumberofLiveBirths: NoofLiveBirths,
                                NoofChildren: $("#NoofChildren").val() != "" ? $("#NoofChildren").val() : "-",
                                FamilyHistoryCheck: { results: Family_HistoryCheck },
                                Tobacco: $("#tobacco").val() != "" ? $("#tobacco").val() : "-",
                                ExerciseType: $("#exercisetype").val() != "" ? $("#exercisetype").val() : "-",
                                Minutes: $("#minutes").val() != "" ? $("#minutes").val() : "-",
                                Alcohol: $("#alcohol").val() != "" ? $("#alcohol").val() : "-",
                                RecreationalDrugs: Drugs,
                                Medications: $("#Medications").prop("checked") ? 'Yes' : 'No',
                                SurgicalHistory: $("#Surgical-History").prop("checked") ? 'Yes' : 'No',
                                DrugReactionReason: $("#Drug-Reaction").prop("checked") ? $("#Drug-Reaction-Reason").val() : null,
                                AllergyReason: $("#Allergy").prop("checked") ? $("#Allergy-Reason").val() : null,
                                Status: "Updated by Unit HR",

                                ONBSessionID: GlobalSessionIDValue,
                                BusinessUnit: officename,
                                VersionNumber: VersionNumber,
                                ControlNumber: ControlNumber
                            }).then(() => {
                                this.AddTableToUpdateHistory(PreExistItemID, GlobalSessionIDValue)
                            })
                    }
                })
        }
    }
    public AddTableToUpdateHistory(id, ONBSessionID) {

        $("#tble-tbody-preexisiting-occupational tr").each(function (index) {
            var currentrow = $(this);
            var From = currentrow.find("td:eq(0)").find("input[id='Occupational-From']").val();
            var To = currentrow.find("td:eq(1)").find("input[id='Occupational-To']").val();
            var Occupation = currentrow.find("td:eq(2)").find("input[id='Occupation']").val();

            if (From != "" || To != "" || Occupation != "") {

                From = From != "" ? From : "-";

                To = To != "" ? To : "-";

                Occupation = Occupation != "" ? Occupation : "-";

                subweb.lists.getByTitle("Occupational History HR Update History")
                    .items.add({
                        From: From,
                        To: To,
                        Occupation: Occupation,
                        PreExistingId: id,
                        ONBSessionID: ONBSessionID,
                        OrderNo: index,
                    });
            }
        });

        $("#tble-tbody-preexisiting-familyhistory tr").each(function (index) {
            var currentrow = $(this);
            var Familyhistory = currentrow.find("td:eq(0)").find("select[id='familyhistory-famliy']").val();
            var FamilyAge = currentrow.find("td:eq(1)").find("input[id='FamilyAge']").val();
            var StateofHealth = currentrow.find("td:eq(2)").find("input[id='StateofHealth']").val();

            if (Familyhistory != "" || FamilyAge != "" || StateofHealth != "") {

                Familyhistory = Familyhistory != "" ? Familyhistory : "-";

                FamilyAge = FamilyAge != "" ? FamilyAge : "-";

                StateofHealth = StateofHealth != "" ? StateofHealth : "-";


                subweb.lists.getByTitle("Family History HR Update History")
                    .items.add({
                        PreExistingId: id,
                        Family: Familyhistory,
                        Age: FamilyAge,
                        StateofHealth: StateofHealth,
                        ONBSessionID: ONBSessionID,
                        OrderNo: index,
                    });
            }
        });

        if ($("#Medications").prop("checked") == false) {
            $("#tble-tbody-preexisiting-medicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Medication = currentrow.find("td:eq(0)").find("input[id='Medication-and-dosage']").val();
                var Date = currentrow.find("td:eq(1)").find("input[id='Date-Started']").val();
                var Reason = currentrow.find("td:eq(2)").find("input[id='Reason-for-medication']").val();
                var currently = currentrow.find("td:eq(3)").find("select[id='currently-taking-this-medication']").val();

                if (Medication != "" || Date != "" || Reason != "" || currently != "") {

                    Medication = Medication != "" ? Medication : "-";

                    Date = Date != "" ? Date : "-";

                    Reason = Reason != "" ? Reason : "-";

                    currently = currently != "" ? currently : "-";

                    subweb.lists.getByTitle("Medical History HR Update History")
                        .items.add({
                            PreExistingId: id,
                            MedicationandDosage: Medication,
                            DateStarted: Date,
                            ReasonforMedication: Reason,
                            Currently: currently,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });

                }
            });
        }

        if ($("#Surgical-History").prop("checked") == false) {
            $("#tble-tbody-preexisiting-surgicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Date = currentrow.find("td:eq(0)").find("input[id='Surgical-History-Date']").val();
                var Surgey = currentrow.find("td:eq(1)").find("input[id='Surgical-History-Surgey']").val();
                var Perfomred = currentrow.find("td:eq(2)").find("select[id='Surgical-History-Surgey-Perfomred']").val();
                var Status = currentrow.find("td:eq(3)").find("input[id='Surgical-History-Current-Status']").val();

                if (Date != "" || Surgey != "" || Perfomred != "" || Status != "") {

                    Date = Date != "" ? Date : "-";

                    Surgey = Surgey != "" ? Surgey : "-";

                    Perfomred = Perfomred != "" ? Perfomred : "-";

                    Status = Status != "" ? Status : "-";

                    subweb.lists.getByTitle("Surgical History HR Update History")
                        .items.add({
                            PreExistingId: id,
                            Date: Date,
                            Problem: Surgey,
                            SurgeryPerfomred: Perfomred,
                            CurrentStatus: Status,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });

                }
            });
        }
    }

    public UpdateTableData(id, ONBSessionID) {

        $("#tble-tbody-preexisiting-occupational tr").each(function (index) {
            var currentrow = $(this);
            var From = currentrow.find("td:eq(0)").find("input[id='Occupational-From']").val();
            var To = currentrow.find("td:eq(1)").find("input[id='Occupational-To']").val();
            var Occupation = currentrow.find("td:eq(2)").find("input[id='Occupation']").val();

            if (From != "" || To != "" || Occupation != "") {

                From = From != "" ? From : "-";

                To = To != "" ? To : "-";

                Occupation = Occupation != "" ? Occupation : "-";

                var TempTableChildItemID: any = currentrow
                    .find("td:eq(0)")
                    .find("input[id='occu-itm-id']")
                    .val();


                if (TempTableChildItemID == "null") {
                    newweb.lists.getByTitle("Occupational History")
                        .items.add({
                            From: From,
                            To: To,
                            Occupation: Occupation,
                            PreExistingId: id,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });
                } else {
                    newweb.lists.getByTitle("Occupational History")
                        .items.getById(parseInt(TempTableChildItemID))
                        .update({
                            From: From,
                            To: To,
                            Occupation: Occupation,
                            PreExistingId: id,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });
                }
            }
        });

        $("#tble-tbody-preexisiting-familyhistory tr").each(function (index) {
            var currentrow = $(this);
            var Familyhistory = currentrow.find("td:eq(0)").find("select[id='familyhistory-famliy']").val();
            var FamilyAge = currentrow.find("td:eq(1)").find("input[id='FamilyAge']").val();
            var StateofHealth = currentrow.find("td:eq(2)").find("input[id='StateofHealth']").val();

            if (Familyhistory != "" || FamilyAge != "" || StateofHealth != "") {

                Familyhistory = Familyhistory != "" ? Familyhistory : "-";

                FamilyAge = FamilyAge != "" ? FamilyAge : "-";

                StateofHealth = StateofHealth != "" ? StateofHealth : "-";

                var TempTableChildItemID: any = currentrow
                    .find("td:eq(0)")
                    .find("input[id='familyhist-itm-id']")
                    .val();


                if (TempTableChildItemID == "null") {
                    newweb.lists.getByTitle("Family History")
                        .items.add({
                            PreExistingId: id,
                            Family: Familyhistory,
                            Age: FamilyAge,
                            StateofHealth: StateofHealth,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });
                } else {
                    newweb.lists.getByTitle("Family History")
                        .items.getById(parseInt(TempTableChildItemID))
                        .update({
                            PreExistingId: id,
                            Family: Familyhistory,
                            Age: FamilyAge,
                            StateofHealth: StateofHealth,
                            ONBSessionID: ONBSessionID,
                            OrderNo: index,
                        });
                }
            }
        });

        if ($("#Medications").prop("checked") == false) {
            $("#tble-tbody-preexisiting-medicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Medication = currentrow.find("td:eq(0)").find("input[id='Medication-and-dosage']").val();
                var Date = currentrow.find("td:eq(1)").find("input[id='Date-Started']").val();
                var Reason = currentrow.find("td:eq(2)").find("input[id='Reason-for-medication']").val();
                var currently = currentrow.find("td:eq(3)").find("select[id='currently-taking-this-medication']").val();

                if (Medication != "" || Date != "" || Reason != "" || currently != "") {

                    Medication = Medication != "" ? Medication : "-";

                    Date = Date != "" ? Date : "-";

                    Reason = Reason != "" ? Reason : "-";

                    currently = currently != "" ? currently : "-";

                    var TempTableChildItemID: any = currentrow
                        .find("td:eq(0)")
                        .find("input[id='med-hist-itm-id']")
                        .val();


                    if (TempTableChildItemID == "null") {
                        newweb.lists
                            .getByTitle("Medical History")
                            .items.add({
                                PreExistingId: id,
                                MedicationandDosage: Medication,
                                DateStarted: Date,
                                ReasonforMedication: Reason,
                                Currently: currently,
                                ONBSessionID: ONBSessionID,
                                OrderNo: index,
                            });
                    } else {
                        newweb.lists
                            .getByTitle("Medical History")
                            .items.getById(parseInt(TempTableChildItemID))
                            .update({
                                PreExistingId: id,
                                MedicationandDosage: Medication,
                                DateStarted: Date,
                                ReasonforMedication: Reason,
                                Currently: currently,
                                ONBSessionID: ONBSessionID,
                                OrderNo: index,
                            });
                    }
                }
            });
        } else {
            newweb.lists.getByTitle("Medical History").items.select("PreExistingId", "ID")
                .filter(`PreExistingId eq ${PreExistItemID}`).get().then((item) => {

                    item.map(function (data) {
                        newweb.lists.getByTitle("Medical History").items.getById(data.Id).delete();
                    })
                })
        }

        if ($("#Surgical-History").prop("checked") == false) {
            $("#tble-tbody-preexisiting-surgicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Date = currentrow.find("td:eq(0)").find("input[id='Surgical-History-Date']").val();
                var Surgey = currentrow.find("td:eq(1)").find("input[id='Surgical-History-Surgey']").val();
                var Perfomred = currentrow.find("td:eq(2)").find("select[id='Surgical-History-Surgey-Perfomred']").val();
                var Status = currentrow.find("td:eq(3)").find("input[id='Surgical-History-Current-Status']").val();

                if (Date != "" || Surgey != "" || Perfomred != "" || Status != "") {

                    Date = Date != "" ? Date : "-";

                    Surgey = Surgey != "" ? Surgey : "-";

                    Perfomred = Perfomred != "" ? Perfomred : "-";

                    Status = Status != "" ? Status : "-";

                    var TempTableChildItemID: any = currentrow
                        .find("td:eq(0)")
                        .find("input[id='sur-hist-itm-id']")
                        .val();


                    if (TempTableChildItemID == "null") {
                        newweb.lists
                            .getByTitle("Surgical History")
                            .items.add({
                                PreExistingId: id,
                                Date: Date,
                                Problem: Surgey,
                                SurgeryPerfomred: Perfomred,
                                CurrentStatus: Status,
                                ONBSessionID: ONBSessionID,
                                OrderNo: index,
                            });
                    } else {
                        newweb.lists
                            .getByTitle("Surgical History")
                            .items.getById(parseInt(TempTableChildItemID))
                            .update({
                                PreExistingId: id,
                                Date: Date,
                                Problem: Surgey,
                                SurgeryPerfomred: Perfomred,
                                CurrentStatus: Status,
                                ONBSessionID: ONBSessionID,
                                OrderNo: index,
                            });
                    }
                }
            });
        } else {
            newweb.lists.getByTitle("Surgical History").items.select("PreExistingId", "ID")
                .filter(`PreExistingId eq ${PreExistItemID}`).get().then((item) => {

                    item.map(function (data) {
                        newweb.lists.getByTitle("Surgical History").items.getById(data.Id).delete();
                    })
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

    }

    public NoofPregnancies() {
        var status = true;
        if ($("#PregnantYes").prop("checked")) {

            if ($("#NoofPregnancies").val() != "") {
                status = true;
                $("#err-no-of-pregnancies").hide()
            } else {
                status = false;
                $("#NoofPregnancies").focus();
                $("#err-no-of-pregnancies").show()
            }
        }
        return status;
    }
    public NoofLiveBirths() {
        var status = true;
        if ($("#PregnantYes").prop("checked")) {

            if ($("#NoofLiveBirths").val() != "") {
                status = true;
                $("#err-no-of-live-births").hide()
            } else {
                status = false;
                $("#NoofLiveBirths").focus();
                $("#err-no-of-live-births").show()
            }
        }
        return status;
    }

    public Drug_Reaction() {
        var status = true;
        if ($("#Drug-Reaction").prop("checked")) {

            if ($("#Drug-Reaction-Reason").val() != "") {
                status = true;
                $("#err-preexisiting-Drug-Reason").hide()
            } else {
                status = false;
                $("#err-preexisiting-Drug-Reason").show()
                $("#Drug-Reaction").focus();
            }
        }

        return status;
    }
    public Allergy() {
        var status = true;
        if ($("#Allergy").prop("checked")) {

            if ($("#Allergy-Reason").val() != "") {
                status = true;
                $("#err-preexisiting-Allergy-Reason").hide();
            } else {
                status = false;
                $("#err-preexisiting-Allergy-Reason").show();
                $("#Allergy").focus();
            }
        }
        return status;
    }

    public FirstName() {
        var status = true;
        if (status == true && $("#PreExistingFirstName").val() != "") {
            $("#err-preexisiting-firstname").hide();
        } else {
            $("#err-preexisiting-firstname").show();
            $("#PreExistingFirstName").focus();
            status = false;
        }
        return status;
    }
    public LastName() {
        var status = true;
        if (status == true && $("#PreExistingLastName").val() != "") {
            $("#err-preexisiting-lastname").hide();
        } else {
            $("#err-preexisiting-lastname").show();
            $("#PreExistingLastName").focus();
            status = false;
        }
        return status;
    }
    public Nationality() {
        var status = true;
        if (status == true && $("#PreExistingNationality").val() != "") {
            $("#err-preexisiting-nationality").hide();
        } else {
            $("#err-preexisiting-nationality").show();
            $("#PreExistingNationality").focus();
            status = false;
        }
        return status;
    }
    public DateofBirth() {
        var status = true;
        if (status == true && $("#PreExistingDateofBirth").val() != "") {
            $("#err-preexisiting-dateofbirth").hide();
        } else {
            $("#err-preexisiting-dateofbirth").show();
            $("#PreExistingDateofBirth").focus();
            status = false;
        }
        return status;
    }
    public Gender() {
        var status = true;
        if (status == true && $("#PreExistingGender").val() != "") {
            $("#err-preexisiting-gender").hide();
        } else {
            $("#err-preexisiting-gender").show();
            $("#PreExistingGender").focus();
            status = false;
        }
        return status;
    }
    public Height() {
        var status = true;
        if (status == true && $("#PreExistingHeight").val() != "") {
            $("#err-preexisiting-height").hide();
        } else {
            $("#err-preexisiting-height").show();
            $("#PreExistingHeight").focus();
            status = false;
        }
        return status;
    }
    public Weight() {
        var status = true;
        if (status == true && $("#PreExistingWeight").val() != "") {
            $("#err-preexisiting-weight").hide();
        } else {
            $("#err-preexisiting-weight").show();
            $("#PreExistingWeight").focus();
            status = false;
        }
        return status;
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
                        officename = properties[i].Value;
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
                .filter(`Title eq 'PRE EXISTING MEDICAL CONDITION FORM'`).get()
                .then((results) => {

                    this.setState({
                        PreExistFormControlNumber: results[0][fieldname1.InternalName],
                        VersionNumber: results[0][fieldname2.InternalName]
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

    public SaveListItem() {
        if (this.Drug_Reaction() &&
            this.Allergy() &&
            this.NoofPregnancies() &&
            this.NoofLiveBirths()
        ) {

            var Work_Exposure = [], Personal_History = [], Family_HistoryCheck = [];

            $('input[name=Work-Exposure]:checked').each(function () {
                var text = $(this).attr("id")
                Work_Exposure.push(text)
            });

            $('input[name=Personal-History]:checked').each(function () {
                var text = $(this).attr("id")
                Personal_History.push(text)
            });

            $('input[name=family-history-check]:checked').each(function () {
                var text = $(this).attr("id")
                Family_HistoryCheck.push(text)
            });
            var Pregnant = null;
            var NoofPregnancies = null;
            var NoofLiveBirths = null;

            if ($("#PreExistingGender").val() == 'Female') {
                if ($("#PregnantYes").prop("checked")) {
                    Pregnant = 'Yes'
                    NoofPregnancies = $("#NoofPregnancies").val();
                    NoofLiveBirths = $("#NoofLiveBirths").val();
                }
                if ($("#PregnantNo").prop("checked")) {
                    Pregnant = 'No'
                }

            }

            var Drugs
            if ($("#DrugsYes").prop("checked") == true) {
                Drugs = "Yes"
            }
            if ($("#DrugsNo").prop("checked") == true) {
                Drugs = "No"
            }

            swal({
                title: "Are you sure?",
                text: "Please confirm the updated data before submitting, You cannot make any changes once it is submitted",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willadd) => {
                if (willadd) {
                    let list = newweb.lists.getByTitle("Pre Existing Medical Condition Transaction");
                    list.items
                        .add({
                            Title: "PRE EXISTING MEDICAL CONDITION FORM",
                            FirstName: $("#PreExistingFirstName").val(),
                            LastName: $("#PreExistingLastName").val(),
                            Nationality: $("#PreExistingNationality").val(),
                            DateofBirth: $("#PreExistingDateofBirth").val(),
                            Gender: $("#PreExistingGender").val(),
                            Height: $("#PreExistingHeight").val() != "" ? $("#PreExistingHeight").val() : "-",
                            Weight: $("#PreExistingWeight").val() != "" ? $("#PreExistingWeight").val() : "-",
                            WorkExposure: { results: Work_Exposure },
                            PersonalHistory: { results: Personal_History },
                            Pregnant: Pregnant,
                            NumberofPregnancies: NoofPregnancies,
                            NumberofLiveBirths: NoofLiveBirths,
                            NoofChildren: $("#NoofChildren").val() != "" ? $("#NoofChildren").val() : "-",
                            FamilyHistoryCheck: { results: Family_HistoryCheck },
                            Tobacco: $("#tobacco").val() != "" ? $("#tobacco").val() : "-",
                            ExerciseType: $("#exercisetype").val() != "" ? $("#exercisetype").val() : "-",
                            Minutes: $("#minutes").val() != "" ? $("#minutes").val() : "-",
                            Alcohol: $("#alcohol").val() != "" ? $("#alcohol").val() : "-",
                            RecreationalDrugs: Drugs,
                            Medications: $("#Medications").prop("checked") ? 'Yes' : 'No',
                            SurgicalHistory: $("#Surgical-History").prop("checked") ? 'Yes' : 'No',
                            DrugReactionReason: $("#Drug-Reaction").prop("checked") ? $("#Drug-Reaction-Reason").val() : null,
                            AllergyReason: $("#Allergy").prop("checked") ? $("#Allergy-Reason").val() : null,

                            BusinessUnit: officename,
                            Status: "Submitted by employee",
                            UnitLogo: LogoUrl,
                            ONBSessionID: this.state.ONBSessionID,
                            VersionNumber: this.state.VersionNumber,
                            ControlNumber: this.state.ControlNumber + "-" + this.state.PreExistFormControlNumber
                        })
                        .then((results: any) => {
                            this.AddTableToList(results.data.ID, this.state.ONBSessionID);
                            newweb.lists.getByTitle("Onboarding Transaction Master").items.filter("ONBSessionID eq '" + this.state.ONBSessionID + "' and Title eq 'PRE EXISTING MEDICAL CONDITION FORM'").orderBy("Created", false).get().then((response) => {
                                if (response.length != 0) {
                                    newweb.lists.getByTitle("Onboarding Transaction Master").items.getById(response[0].Id).update({
                                        Status: "Completed",
                                        CompletedOn: moment().format("MM/DD/YYYY")
                                    });
                                }
                            }).then(() => {

                                swal({
                                    text: "Please wait!",
                                    button: false,
                                    closeOnClickOutside: false,
                                } as any);
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
                            })
                        });
                }
            });
        }
    }
    public AddTableToList(id, ONBSessionID) {
        $("#tble-tbody-preexisiting-occupational tr").each(function (index) {
            var currentrow = $(this);
            var From = currentrow.find("td:eq(0)").find("input[id='Occupational-From']").val();
            var To = currentrow.find("td:eq(1)").find("input[id='Occupational-To']").val();
            var Occupation = currentrow.find("td:eq(2)").find("input[id='Occupation']").val();

            if (From != "" || To != "" || Occupation != "") {

                From = From != "" ? From : "-";

                To = To != "" ? To : "-";

                Occupation = Occupation != "" ? Occupation : "-";

                newweb.lists.getByTitle("Occupational History").items.add({
                    PreExistingId: id,
                    From: From,
                    To: To,
                    Occupation: Occupation,
                    ONBSessionID: ONBSessionID,
                    OrderNo: index,
                });
            }
        });

        $("#tble-tbody-preexisiting-familyhistory tr").each(function (index) {
            var currentrow = $(this);
            var Familyhistory = currentrow.find("td:eq(0)").find("select[id='familyhistory-famliy']").val();
            var FamilyAge = currentrow.find("td:eq(1)").find("input[id='FamilyAge']").val();
            var StateofHealth = currentrow.find("td:eq(2)").find("input[id='StateofHealth']").val();

            if (Familyhistory != "" || FamilyAge != "" || StateofHealth != "") {

                Familyhistory = Familyhistory != "" ? Familyhistory : "-";

                FamilyAge = FamilyAge != "" ? FamilyAge : "-";

                StateofHealth = StateofHealth != "" ? StateofHealth : "-";

                newweb.lists.getByTitle("Family History").items.add({
                    PreExistingId: id,
                    Family: Familyhistory,
                    Age: FamilyAge,
                    StateofHealth: StateofHealth,
                    ONBSessionID: ONBSessionID,
                    OrderNo: index,
                });
            }
        });

        if ($("#Medications").prop("checked") == false) {
            $("#tble-tbody-preexisiting-medicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Medication = currentrow.find("td:eq(0)").find("input[id='Medication-and-dosage']").val();
                var Date = currentrow.find("td:eq(1)").find("input[id='Date-Started']").val();
                var Reason = currentrow.find("td:eq(2)").find("input[id='Reason-for-medication']").val();
                var currently = currentrow.find("td:eq(3)").find("select[id='currently-taking-this-medication']").val();

                if (Medication != "" || Date != "" || Reason != "" || currently != "") {

                    Medication = Medication != "" ? Medication : "-";

                    Date = Date != "" ? Date : "-";

                    Reason = Reason != "" ? Reason : "-";

                    currently = currently != "" ? currently : "-";

                    newweb.lists.getByTitle("Medical History").items.add({
                        PreExistingId: id,
                        MedicationandDosage: Medication,
                        DateStarted: Date,
                        ReasonforMedication: Reason,
                        Currently: currently,
                        ONBSessionID: ONBSessionID,
                        OrderNo: index,
                    });
                }
            });
        }

        if ($("#Surgical-History").prop("checked") == false) {
            $("#tble-tbody-preexisiting-surgicalhistory tr").each(function (index) {
                var currentrow = $(this);
                var Date = currentrow.find("td:eq(0)").find("input[id='Surgical-History-Date']").val();
                var Surgey = currentrow.find("td:eq(1)").find("input[id='Surgical-History-Surgey']").val();
                var Perfomred = currentrow.find("td:eq(2)").find("select[id='Surgical-History-Surgey-Perfomred']").val();
                var Status = currentrow.find("td:eq(3)").find("input[id='Surgical-History-Current-Status']").val();

                if (Date != "" || Surgey != "" || Perfomred != "" || Status != "") {

                    Date = Date != "" ? Date : "-";

                    Surgey = Surgey != "" ? Surgey : "-";

                    Perfomred = Perfomred != "" ? Perfomred : "-";

                    Status = Status != "" ? Status : "-";

                    newweb.lists.getByTitle("Surgical History").items.add({
                        PreExistingId: id,
                        Date: Date,
                        Problem: Surgey,
                        SurgeryPerfomred: Perfomred,
                        CurrentStatus: Status,
                        ONBSessionID: ONBSessionID,
                        OrderNo: index,
                    });
                }
            });
        }

    }


    public GetUsernamefrompersonalinfo(ONBSessionID) {

        newweb.lists
            .getByTitle("Personal Information Master")
            .items.select(
                "FirstName",
                "DateofBirth",
                "CurrentNationality",
                "LastName",
                "Gender",
                "ONBSessionID",
            )
            .filter("ONBSessionID eq '" + ONBSessionID + "'")

            .get()
            .then((result) => {
                if (result.length != 0) {

                    $("#PreExistingFirstName").val(result[0].FirstName).prop("disabled", "disabled");
                    $("#PreExistingLastName").val(result[0].LastName).prop("disabled", "disabled");
                    $("#PreExistingNationality").val(result[0].CurrentNationality).prop("disabled", "disabled");

                    $("#PreExistingDateofBirth").val(moment(result[0].DateofBirth).format("YYYY-MM-DD")).prop("disabled", "disabled");
                    $("#PreExistingGender").val(result[0].Gender).prop("disabled", "disabled");
                    if (result[0].Gender == "Female") {
                        $(".female_part").show();
                    }
                    //$(".preexisiting-disabled").prop("disabled", "disabled")
                }
            })
    }

    public OccupationalAddNewRow(e) {

        e.preventDefault();

        var occupational_last_input1 = $("#tble-tbody-preexisiting-occupational tr:last").find("input").eq(1).val();
        var occupational_last_input2 = $("#tble-tbody-preexisiting-occupational tr:last").find("input").eq(2).val();
        var occupational_last_input3 = $("#tble-tbody-preexisiting-occupational tr:last").find("input").eq(3).val();

        if (GlobalFormOpenedMode == "New") {
            var table = document.getElementById("table-preexisiting-occupational");
            var rows: number = table.getElementsByTagName("tr").length

            if (rows < 4) {

                if (occupational_last_input1 != "" && occupational_last_input2 != "" && occupational_last_input3 != "") {

                    $("#tble-tbody-preexisiting-occupational").append(`<tr>
           
            <td><input type="hidden" id="occu-itm-id" value="null"></input>
            <input type="month" id="Occupational-From" class="form-control tble-occupational-from" autoComplete="off"></input></td>
            <td><input type="month" id="Occupational-To" class="form-control tble-occupational-to" autoComplete="off"></input></td>
           
            <td><input type="text" id="Occupation" class="form-control tble-occupation-to" autoComplete="off"></input></td>
            <td class="delete_icon_td"><a href="#" class="ibtnDel1"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: "Only 3 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }

        } else if (GlobalFormOpenedMode == "Edit") {
            var table = document.getElementById("tble-tbody-preexisiting-occupational");
            var Editrows: number = table.getElementsByTagName("tr").length

            if (Editrows < 3) {

                if (occupational_last_input1 != "" && occupational_last_input2 != "" && occupational_last_input3 != "") {
                    $("#tble-tbody-preexisiting-occupational").append(`<tr>
           
                <td><input type="hidden" id="occu-itm-id" value="null"></input>
                <input type="month" id="Occupational-From" class="form-control tble-occupational-from" autoComplete="off"></input></td>
                <td><input type="month" id="Occupational-To" class="form-control tble-occupational-to" autoComplete="off"></input></td>
               
                <td><input type="text" id="Occupation" class="form-control tble-occupation-to" autoComplete="off"></input></td>
                <td class="delete_icon_td"><a href="#" class="ibtnDel1"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
              </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 3 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }
        }

        Occupational_History_Counter = Occupational_History_Counter + 1;
        $("table #tble-tbody-preexisiting-occupational").on("click", ".ibtnDel1", function (event) {
            swal({
                title: "Are you sure?",
                text: "Do you want to delete this!",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willdelete) => {
                if (willdelete) {
                    $(this).closest("tr").remove();
                    Occupational_History_Counter = Occupational_History_Counter - 1 + 2;
                    swal({
                        title: "Deleted Successfully",
                        icon: "success",
                    });
                }
            });
        });
    }
    public FamilyHistoryAddNewRow(e) {

        e.preventDefault();

        var family_history_last_input1 = $("#tble-tbody-preexisiting-familyhistory tr:last").find("select").eq(0).val();
        var family_history_last_input2 = $("#tble-tbody-preexisiting-familyhistory tr:last").find("input").eq(1).val();
        var family_history_last_input3 = $("#tble-tbody-preexisiting-familyhistory tr:last").find("input").eq(3).val();


        if (GlobalFormOpenedMode == "New") {
            var table = document.getElementById("table-preexisiting-familyhistory");
            var rows: number = table.getElementsByTagName("tr").length

            if (rows < 13) {

                if (family_history_last_input1 != "" && family_history_last_input2 != "" && family_history_last_input3 != "") {

                    $("#tble-tbody-preexisiting-familyhistory").append(`<tr>
           
            <td><input type="hidden" id="familyhist-itm-id" value="null"></input>
            <select id="familyhistory-famliy" class="form-control">
                                                        <option value="">Select</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Brother">Brother(s)</option>
                                                        <option value="Sister">Sister(s)</option>
                                                        <option value="Spouse">Spouse</option>
                                                        <option value="Son">Son(s)</option>
                                                        <option value="Daughter">Daughter(s)</option>
                                                    </select></td>
            <td><input type="text" id="FamilyAge" class="form-control tble-familyage"></input></td>
           
            <td><input type="text" id="StateofHealth" class="form-control"></input></td>
            
            <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 12 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }



        } else if (GlobalFormOpenedMode == "Edit") {
            var table = document.getElementById("table-preexisiting-familyhistory");
            var Editrows: number = table.getElementsByTagName("tr").length

            if (Editrows < 13) {

                if (family_history_last_input1 != "" && family_history_last_input2 != "" && family_history_last_input3 != "") {

                    $("#tble-tbody-preexisiting-familyhistory").append(`<tr>
           
            <td><input type="hidden" id="familyhist-itm-id" value="null"></input>
            <select id="familyhistory-famliy" class="form-control">
                                                        <option value="">Select</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Brother">Brother(s)</option>
                                                        <option value="Sister">Sister(s)</option>
                                                        <option value="Spouse">Spouse</option>
                                                        <option value="Son">Son(s)</option>
                                                        <option value="Daughter">Daughter(s)</option>
                                                    </select></td>
            <td><input type="text" id="FamilyAge" class="form-control tble-familyage"></input></td>
           
            <td><input type="text" id="StateofHealth" class="form-control"></input></td>
            
            <td class="delete_icon_td"><a href="#" class="ibtnDel2"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 12 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }
        }

        Family_History_Counter = Family_History_Counter + 1;
        $("table #tble-tbody-preexisiting-familyhistory").on("click", ".ibtnDel2", function (event) {

            swal({
                title: "Are you sure?",
                text: "Do you want to delete this!",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willdelete) => {
                if (willdelete) {
                    $(this).closest("tr").remove();
                    Family_History_Counter = Family_History_Counter - 1 + 2;
                    swal({
                        title: "Deleted Successfully",
                        icon: "success",
                    });
                }
            });
        });
    }
    public MedicalHistoryAddNewRow(e) {

        e.preventDefault();

        var medical_history_last_input1 = $("#tble-tbody-preexisiting-medicalhistory tr:last").find("input").eq(1).val();
        var medical_history_last_input2 = $("#tble-tbody-preexisiting-medicalhistory tr:last").find("input").eq(2).val();
        var medical_history_last_input3 = $("#tble-tbody-preexisiting-medicalhistory tr:last").find("input").eq(3).val();
        var medical_history_last_input4 = $("#tble-tbody-preexisiting-medicalhistory tr:last").find("select").eq(0).val();

        if (GlobalFormOpenedMode == "New") {
            var table = document.getElementById("table-preexisiting-medicalhistory");
            var rows: number = table.getElementsByTagName("tr").length

            if (rows < 6) {

                if (medical_history_last_input1 != "" && medical_history_last_input2 != "" && medical_history_last_input3 != "" && medical_history_last_input4 != "") {

                    $("#tble-tbody-preexisiting-medicalhistory").append(`<tr>
           
            <td><input type="hidden" id="med-hist-itm-id" value="null"></input>
            <input type="text" id="Medication-and-dosage" class="form-control medication-and-dosage" autoComplete="off"></input></td>
            <td><input type="date" id="Date-Started" class="form-control date-started" autoComplete="off"></input></td>
           
            <td><input type="text" id="Reason-for-medication" class="form-control reason-for-medication" autoComplete="off"></input></td>
            <td>
            <select id="currently-taking-this-medication" class="form-control ">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select></td>
            <td class="delete_icon_td"><a href="#" class="ibtnDel3"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 5 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }





        } else if (GlobalFormOpenedMode == "Edit") {
            var table = document.getElementById("table-preexisiting-medicalhistory");
            var Editrows: number = table.getElementsByTagName("tr").length

            if (Editrows < 6) {

                if (medical_history_last_input1 != "" && medical_history_last_input2 != "" && medical_history_last_input3 != "" && medical_history_last_input4 != "") {

                    $("#tble-tbody-preexisiting-medicalhistory").append(`<tr>
             
              <td><input type="hidden" id="med-hist-itm-id" value="null"></input>
              <input type="text" id="Medication-and-dosage" class="form-control medication-and-dosage" autoComplete="off"></input></td>
              <td><input type="date" id="Date-Started" class="form-control date-started" autoComplete="off"></input></td>
             
              <td><input type="text" id="Reason-for-medication" class="form-control reason-for-medication" autoComplete="off"></input></td>
              <td>
              <select id="currently-taking-this-medication" class="form-control ">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
              </select></td>
              <td class="delete_icon_td"><a href="#" class="ibtnDel3"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
            </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 5 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }
        }

        Medical_History_Counter = Medical_History_Counter + 1;
        $("table #tble-tbody-preexisiting-medicalhistory").on("click", ".ibtnDel3", function (event) {

            swal({
                title: "Are you sure?",
                text: "Do you want to delete this!",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willdelete) => {
                if (willdelete) {
                    $(this).closest("tr").remove();
                    Medical_History_Counter = Medical_History_Counter - 1 + 2;
                    swal({
                        title: "Deleted Successfully",
                        icon: "success",
                    });
                }
            });
        });
    }
    public SurgicalHistoryAddNewRow(e) {

        e.preventDefault();

        var surgical_history_last_input1 = $("#tble-tbody-preexisiting-surgicalhistory tr:last").find("input").eq(1).val();
        var surgical_history_last_input2 = $("#tble-tbody-preexisiting-surgicalhistory tr:last").find("input").eq(2).val();
        var surgical_history_last_input3 = $("#tble-tbody-preexisiting-surgicalhistory tr:last").find("select").eq(0).val();
        var surgical_history_last_input4 = $("#tble-tbody-preexisiting-surgicalhistory tr:last").find("input").eq(3).val();

        if (GlobalFormOpenedMode == "New") {
            var table = document.getElementById("table-preexisiting-surgicalhistory");
            var rows: number = table.getElementsByTagName("tr").length

            if (rows < 6) {

                if (surgical_history_last_input1 != "" && surgical_history_last_input2 != "" && surgical_history_last_input3 != "" && surgical_history_last_input4 != "") {

                    $("#tble-tbody-preexisiting-surgicalhistory").append(`<tr>
           
            <td><input type="hidden" id="sur-hist-itm-id" value="null"></input>
            <input type="date" id="Surgical-History-Date" class="form-control tble-surgical-history-date"></input></td>
            <td><input type="text" id="Surgical-History-Surgey" class="form-control tble-surgical-history-surgey"></input></td>
            <td>
            <select id="Surgical-History-Surgey-Perfomred" class="form-control ">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select></td>
            <td> <input type="text" id="Surgical-History-Current-Status" class="form-control tble-surgical-history-current-status"></input></td>
            
            <td class="delete_icon_td"><a href="#" class="ibtnDel4"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 5 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }





        } else if (GlobalFormOpenedMode == "Edit") {
            var table = document.getElementById("table-preexisiting-surgicalhistory");
            var Editrows: number = table.getElementsByTagName("tr").length

            if (Editrows < 6) {

                if (surgical_history_last_input1 != "" && surgical_history_last_input2 != "" && surgical_history_last_input3 != "" && surgical_history_last_input4 != "") {

                    $("#tble-tbody-preexisiting-surgicalhistory").append(`<tr>
           
            <td><input type="hidden" id="sur-hist-itm-id" value="null"></input>
            <input type="date" id="Surgical-History-Date" class="form-control tble-surgical-history-date"></input></td>
            <td><input type="text" id="Surgical-History-Surgey" class="form-control tble-surgical-history-surgey"></input></td>
            <td>
            <select id="Surgical-History-Surgey-Perfomred" class="form-control ">
                <option value="Select">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select></td>
            <td> <input type="text" id="Surgical-History-Current-Status" class="form-control tble-surgical-history-current-status"></input></td>
            
            <td class="delete_icon_td"><a href="#" class="ibtnDel4"><span><img src="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/Site%20Asset/Remo%20Portal%20Assets/img/delete_circle.svg" class="action_btn" alt="image"></span></a></td>
          </tr>`);
                    this.ONkeytypinghidedynamictabledaerrrortext()
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
                    title: " Only 5 rows can be added",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                } as any);
            }
        }

        Surgical_History_Counter = Surgical_History_Counter + 1;
        $("table #tble-tbody-preexisiting-surgicalhistory").on("click", ".ibtnDel4", function (event) {

            swal({
                title: "Are you sure?",
                text: "Do you want to delete this!",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            } as any).then((willdelete) => {
                if (willdelete) {
                    $(this).closest("tr").remove();
                    Surgical_History_Counter = Surgical_History_Counter - 1 + 2;
                    swal({
                        title: "Deleted Successfully",
                        icon: "success",
                    });
                }
            });
        });
    }
    public ONkeytypinghidedynamictabledaerrrortext() {
        this.Preload();
        $("#tble-tbody-dynamic3 tr:last").on("keyup", function () {

            var val1 = $(this).find('td:eq(0) input:eq(1)').val();
            var val2 = $(this).find('td:eq(1) input').val();
            var val3 = $(this).find('td:eq(2) input').val();
            if (val1 != "" && val2 != "" && val3 != "") {
                $("#err-table-qualification").hide();
            }

        })
        $("#tble-tbody-dynamic3_Employment_History tr:last").on("keyup", function () {

            var val1 = $(this).find('td:eq(0) input:eq(1)').val();
            var val2 = $(this).find('td:eq(1) input').val();
            var val3 = $(this).find('td:eq(3) input').val();
            var val4 = $(this).find('td:eq(4) input').val();
            var val5 = $(this).find('td:eq(5) input').val();
            var val6 = $(this).find('td:eq(6) input').val();

            if (val1 != "" && val2 != "" && val3 != "" && val4 != "" && val5 != "" && val6 != "") {
                $("#err-table-employmenthistory").hide();
            }

        })
        $("#tble-tbody-dynamicemployreference tr:last").on("keyup", function () {

            var val1 = $(this).find('td:eq(0) input:eq(1)').val();
            var val2 = $(this).find('td:eq(1) input').val();
            var val3 = $(this).find('td:eq(2) input').val();
            if (val1 != "" && val2 != "" && val3 != "") {
                $("#err-table-employeereferencedetails").hide();
            }

        })
        $("#tble-tbody-dynamicEmergencyContact tr:last").on("keyup", function () {

            var val1 = $(this).find('td:eq(0) input:eq(1)').val();
            var val2 = $(this).find('td:eq(1) input').val();
            var val3 = $(this).find('td:eq(2) input').val();
            if (val1 != "" && val2 != "" && val3 != "") {
                $("#err-table-EmergencyContactPersonInUAE").hide();
            }

        })
        $("#tble-tbody-dynamicemergencycontactpepersonoutside tr:last").on("keyup", function () {

            var val1 = $(this).find('td:eq(0) input:eq(1)').val();
            var val2 = $(this).find('td:eq(1) input').val();
            var val3 = $(this).find('td:eq(2) input').val();
            if (val1 != "" && val2 != "" && val3 != "") {
                $("#err-table-EmergencyContactPersonOutside").hide();
            }

        })
    }


    public Printthis() {
        let printContents = document.getElementById('dashboard_right-print-preexist').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        location.reload();
        document.body.innerHTML = originalContents;

    }

    public RecreationalDrugs(type) {
        if (type == "Yes") {
            if ($("#DrugsYes").prop("checked") == true) {
                $("#DrugsNo").prop("checked", false);
            }
        } else {
            if ($("#DrugsNo").prop("checked") == true) {
                $("#DrugsYes").prop("checked", false);
            }
        }
    }

    public Pregnant(type) {
        if (type == "Yes") {
            if ($("#PregnantYes").prop("checked") == true) {
                $("#PregnantNo").prop("checked", false);
                $(".female-statics").show();
            } else {
                $(".female-statics").hide();
            }
        } else {
            if ($("#PregnantNo").prop("checked") == true) {
                $("#PregnantYes").prop("checked", false);
                $(".female-statics").hide();
            }
        }
    }

    public removevalidation() {
        $("#PreExistingFirstName").keyup(function () {
            $("#err-preexisiting-firstname").hide();
        });
        $("#PreExistingLastName").keyup(function () {
            $("#err-preexisiting-lastname").hide();
        });
        $("#PreExistingNationality").on("change", function () {
            $("#err-preexisiting-nationality").hide();
        });
        $("#PreExistingDateofBirth").keyup(function () {
            $("#err-preexisiting-dateofbirth").hide();
        });
        $("#PreExistingGender").on("change", function () {
            $("#err-preexisiting-gender").hide();
        });
        $("#Drug-Reaction-Reason").keyup(function () {
            $("#err-preexisiting-Drug-Reason").hide();
        });
        $("#Allergy-Reason").keyup(function () {
            $("#err-preexisiting-Allergy-Reason").hide();
        });
    }

    public Redirectodashboard() {
        location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`;
    }
    public landingpage() {
        location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView`;
    }
    public dashboard() {
        location.href = `https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView&Mode=Dashboard`;
    }

    public render(): React.ReactElement<IPreExistingMedicalConditionFormProps> {
        var handler = this;

        const Allcountryname: JSX.Element[] = this.state.countrynames.map(function (item, key) {
            return <option value={item.CountryName}>{item.CountryName}</option>;
        });
        return (
            <>
                <div >
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
                        <span>PRE EXISTING MEDICAL CONDITION FORM</span>

                    </div>
                    <div className="dashboard_right_ffamily">
                        <div className="preexisiting_top personal_info_part preexisiting_sec">
                            <div className="preexisiting_part">
                                <div className="row form row_top">
                                    <h3>General Health History Questionnaire</h3>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PreExistingFirstName"
                                                name="PreExistingFirstName"
                                                className="form-control preexisting-firstname preexisiting-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                First Name:
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-firstname"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PreExistingLastName"
                                                name="PreExistingLastName"
                                                className="form-control preexisting-lastname preexisiting-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Last Name:
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-lastname"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <select
                                                id="PreExistingNationality"
                                                className="form-control preexisiting-nationality preexisiting-disabled"
                                                disabled>
                                                <option value="">Select</option>
                                                {Allcountryname}
                                            </select>

                                            <span className="floating-label">
                                                Nationality:
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-nationality"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>

                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <input
                                                type="date"
                                                id="PreExistingDateofBirth"
                                                // name="PreExistingDateofBirth"
                                                //  max={moment().format("YYYY-MM-DD")}
                                                className="form-control preexisiting-dateofbirth preexisiting-disabled"
                                                autoComplete="off" disabled />
                                            <span className="floating-label">
                                                Date of Birth:
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-dateofbirth"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <select
                                                id="PreExistingGender"
                                                className="form-control preexisiting-gender preexisiting-disabled"
                                                disabled>
                                                <option value="" selected>Select</option>
                                                <option value="Male" >Male</option>
                                                <option value="Female" >Female</option>
                                                <option value="Other" >Other</option>
                                            </select>
                                            <span className="floating-label">
                                                Gender:
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-gender"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PreExistingHeight"
                                                name="PreExistingHeight"
                                                className="form-control preexisiting-height preexisiting-disabled"
                                                autoComplete="off" />
                                            <p className="height-cm">cm</p>
                                            <span className="floating-label">
                                                Height:
                                                {/* <i className="required">*</i> */}
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-height"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group relative ">
                                            <input
                                                type="text"
                                                id="PreExistingWeight"
                                                name="PreExistingWeight"
                                                className="form-control preexisiting-weight preexisiting-disabled"
                                                autoComplete="off" />
                                            <p className="weight-kg">kg</p>
                                            <span className="floating-label">
                                                Weight:
                                                {/* <i className="required">*</i> */}
                                            </span>
                                        </div>
                                        <span
                                            className="error-validation"
                                            id="err-preexisiting-weight"
                                            style={{ color: "red", display: "none" }}>
                                            This field is mandatory.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <h3>Occupational History</h3>
                                <div className="table-responsive mb-20">
                                    <table
                                        className="table table-bordered "
                                        id="table-preexisiting-occupational"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                <th scope="col" style={{ width: "0" }}>From</th>
                                                <th scope="col" style={{ width: "0" }}>To</th>
                                                <th scope="col">Occupation</th>
                                                <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-preexisiting-occupational">

                                            <tr className="tble-occupational-first-row">
                                                <td>
                                                    <input
                                                        type="month"
                                                        id="Occupational-From"
                                                        className="form-control tble-occupational-from"
                                                        autoComplete="off"
                                                        max={moment().format("YYYY-MM")}
                                                    ></input>

                                                </td>
                                                <td>
                                                    <input
                                                        type="month"
                                                        id="Occupational-To"
                                                        className="form-control tble-occupational-to"
                                                        autoComplete="off"
                                                        max={moment().format("YYYY-MM")}
                                                    ></input>

                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="Occupation"
                                                        className="form-control tble-occupation-to"
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
                                        className="Add-new-btn  Add-new-occupational"
                                        onClick={(e) => this.OccupationalAddNewRow(e)}
                                    >
                                        Add New Row
                                    </button>
                                </div>
                                <h4>Work Exposure (checkbox if yes)</h4>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Ionizing-Radiation" value="Ionizing-Radiation" />
                                                <span className="form-check-label">Ionizing-Radiation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Chemicals" value="Chemicals" />
                                                <span className="form-check-label">Chemicals</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Heavy-Metals" value="Heavy-Metals" />
                                                <span className="form-check-label">Heavy Metals</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Dust" value="Dust" />
                                                <span className="form-check-label">Dust</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Noise" value="Noise" />
                                                <span className="form-check-label">Noise</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="Compensation" value="Compensation" />
                                                <span className="form-check-label">Industrial Accident / Compensation</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <h3>Personal History – Do You Suffer From Or Have You Had?- (check box if yes)</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="table-preexisiting-personal-history"
                                    >
                                        <tbody id="tble-tbody-preexisiting-personal-history">

                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <input type="checkbox" id="Rheumatic-Fever" name="Personal-History" /> <span>Rheumatic Fever</span>
                                                </td>
                                                <td style={{ width: "30%" }}>
                                                    <input type="checkbox" id="Rectal-Bleeding" name="Personal-History" /> <span>Rectal Bleeding</span>
                                                </td>
                                                <td style={{ width: "35%" }}>
                                                    <input type="checkbox" id="Thyroid-Disease" name="Personal-History" /> <span>Thyroid Disease</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td >
                                                    <input type="checkbox" id="Muscular-Weakness" name="Personal-History" /> <span>Muscular Weakness/ Paralysis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="High-Blood-Pressure" name="Personal-History" /> <span>High Blood Pressure</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Hernia" name="Personal-History" /> <span>Hernia</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Anxiety" name="Personal-History" /> <span>Anxiety / Depression</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Back-Pain" name="Personal-History" /> <span>Lost Time Due to Back Pain</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Varicose-Vein" name="Personal-History" /> <span>Varicose Vein</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Venereal-Disease" name="Personal-History" /> <span>Venereal Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Insomnia" name="Personal-History" /> <span>Insomnia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Unexplained-Chronic" name="Personal-History" /> <span>Unexplained Chronic Fatigue</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Chest-Pain" name="Personal-History" /> <span>Chest Pain</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Kidney-Disease" name="Personal-History" /> <span>Kidney Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Back-Trouble" name="Personal-History" /> <span>Back Trouble</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Irritable" name="Personal-History" /> <span>Irritable or Inflammatory Bowel Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Breathlessness" name="Personal-History" /> <span>Breathlessness</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Renal-Colic" name="Personal-History" /> <span>Renal Colic</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Bone-Complaint" name="Personal-History" /> <span>Bone Complaint</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Migraines" name="Personal-History" /> <span>Lost Work Time Due to Migraines</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Palpitations" name="Personal-History" /> <span>Palpitations</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Incontinence" name="Personal-History" /> <span>Incontinence</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Joint-Complaint" name="Personal-History" /> <span>Joint Complaint</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Diagnosis-of-Depression" name="Personal-History" /> <span>Diagnosis of Depression</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Pneumonia" name="Personal-History" /> <span>Pneumonia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Frequent-Urination" name="Personal-History" /> <span>Frequent Urination</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Skin-Disease" name="Personal-History" /> <span>Skin Disease</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Dipolar-Disorder" name="Personal-History" /> <span>Diagnosis of Dipolar Disorder</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Tuberculosis" name="Personal-History" /> <span>Tuberculosis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Painful-Urination" name="Personal-History" /> <span>Painful Urination</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Multiple-Sclerosis" name="Personal-History" /> <span>Multiple Sclerosis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Compulsive-Disorder" name="Personal-History" /> <span>Diagnosis Of Obsessive Compulsive Disorder</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Bronchitis" name="Personal-History" /> <span>Bronchitis</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Blood-in-Urine" name="Personal-History" /> <span>Blood in Urine</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Jaundice" name="Personal-History" /> <span>Jaundice</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Panic-Attacks" name="Personal-History" /> <span>Diagnosis of Anxiety or Panic Attacks</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Asthma" name="Personal-History" /> <span>Asthma</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Epilepsy" name="Personal-History" /> <span>Epilepsy</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Diabetes" name="Personal-History" /> <span>Diabetes</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Psychiatric-hospital" name="Personal-History" /> <span>Have you been admitted to a medical health / Psychiatric hospital?</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Chronic-Cough" name="Personal-History" /> <span>Chronic Cough</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Stroke" name="Personal-History" /> <span>Stroke</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Poliomyelitis" name="Personal-History" /> <span>Poliomyelitis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="psychiatric-illness" name="Personal-History" /> <span>Have you ever suffered any mental and / or psychiatric illness/disorder?</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Sputum-With-Blood" name="Personal-History" /> <span>Sputum With Blood</span>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Migraine" name="Personal-History" /> <span>Migraine</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Anemia" name="Personal-History" /> <span>Anemia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="prescribed" name="Personal-History" /> <span>Have you ever taken and/or been prescribed any Psychiatric meds?</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Peptic-Ulcer" name="Personal-History" /> <span>Peptic Ulcer</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Loss-of-Consciousness" name="Personal-History" /> <span>Loss of Consciousness</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Cancer" name="Personal-History" /> <span>Cancer</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="traumas" name="Personal-History" /> <span>Have you ever suffered any serious head traumas/ injuries?</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Hemorrhoids" name="Personal-History" /> <span>Hemorrhoids</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Numbness" name="Personal-History" /> <span>Numbness/ Tingling</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Arthritis" name="Personal-History" /> <span>Arthritis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="counselor" name="Personal-History" /> <span>Have you even seen a Psychiatric and/or Psychologist / counselor?</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Eye-Trouble" name="Personal-History" /> <span>Eye Trouble</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Ear-Trouble" name="Personal-History" /> <span>Ear Trouble</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="Fibromyalgia" name="Personal-History" /> <span>Fibromyalgia</span>
                                                </td>
                                                <td className="drug-reaction">
                                                    <input type="checkbox" id="Drug-Reaction" name="Personal-History" /> <span>Drug Reaction :</span>

                                                    <input type="text" id="Drug-Reaction-Reason" className="form-control"
                                                        placeholder="Please provide the relevant details" style={{ display: "none" }} />

                                                    <span className="error-validation" id="err-preexisiting-Drug-Reason"
                                                        style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="Color-Vision" name="Personal-History" />  <span>Difficulty Color Vision</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="nose-trouble" name="Personal-History" /> <span>Nose Trouble</span>
                                                </td>
                                                <td className="allergy">
                                                    <input type="checkbox" id="Allergy" name="Personal-History" /> <span>Allergy :</span>

                                                    <input type="text" id="Allergy-Reason" className="form-control"
                                                        placeholder="Please provide the relevant details" style={{ display: "none" }} />

                                                    <span className="error-validation" id="err-preexisiting-Allergy-Reason"
                                                        style={{ color: "red", display: "none" }}>This field is mandatory.</span>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="preexisiting_part female_part">
                                <h3>Female</h3>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check female-pregnant">
                                                <span>Are you pregnant?</span>
                                                <input type="checkbox" name="Pregnant" onChange={() => this.Pregnant("Yes")}
                                                    className="preexisiting-disabled ml-5" value="Yes" id="PregnantYes" />
                                                <span className="form-check-label">Yes</span>

                                                <input type="checkbox" name="Pregnant" onChange={() => this.Pregnant("No")}
                                                    className="preexisiting-disabled ml-5" value="No" id="PregnantNo" />
                                                <span className="form-check-label">No</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="female-statics" style={{ display: "none" }}>
                                        <div className="col-md-4 ">
                                            <div className="form-group relative">
                                                Number of Pregnancies:{" "}
                                                <input type="text" id="NoofPregnancies" className="no-of-pregnancies preexisiting-disabled" />
                                            </div>
                                            <span className="error-validation" id="err-no-of-pregnancies"
                                                style={{ color: "red", display: "none" }}>This field is mandatory.</span>

                                        </div>
                                        <div className="col-md-4 ">
                                            <div className="form-group relative">
                                                Number of Live Births:{" "}
                                                <input type="text" id="NoofLiveBirths" className="no-of-live-births preexisiting-disabled" />
                                            </div>
                                            <span className="error-validation" id="err-no-of-live-births"
                                                style={{ color: "red", display: "none" }}>This field is mandatory.</span>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <h3>Family History</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered"
                                        id="table-preexisiting-familyhistory"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                <th scope="col" style={{ width: "20%" }}>Family</th>
                                                <th scope="col" style={{ width: "10%" }}>Age</th>
                                                <th scope="col">State of Health / Cause of Death</th>

                                                <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tble-tbody-preexisiting-familyhistory">

                                            <tr className="tble-familyhistory-first-row">
                                                <td>
                                                    <select id="familyhistory-famliy" className="form-control">
                                                        <option value="">Select</option>
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Brother">Brother(s)</option>
                                                        <option value="Sister">Sister(s)</option>
                                                        <option value="Spouse">Spouse</option>
                                                        <option value="Son">Son(s)</option>
                                                        <option value="Daughter">Daughter(s)</option>
                                                    </select>

                                                </td>
                                                <td>
                                                    <input type="text" id="FamilyAge" className="form-control tble-familyage" />
                                                </td>
                                                <td>
                                                    <input type="text" id="StateofHealth" className="form-control" />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="add-btn-wrap clearfix">
                                    <button
                                        type="submit"
                                        className="Add-new-btn  Add-new-family-history"
                                        onClick={(e) => this.FamilyHistoryAddNewRow(e)}
                                    >
                                        Add New Row
                                    </button>
                                </div>
                                <div className="row form">
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <input type="text" id="NoofChildren" className="form-control no-of-children preexisiting-disabled"></input>
                                            <span className="floating-label">Number of children</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <h3>Is There A Family History Of – (check box if yes)</h3>
                                <div className="row form">
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" name="family-history-check" type="checkbox" id="Is-there-Heart-Disease" value="Heart-Disease" />
                                                <span className="form-check-label">Heart Disease</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" name="family-history-check" type="checkbox" id="Is-there-Anemia" value="Anemia" />
                                                <span className="form-check-label">Anemia</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Kidney-Disease" value="Kidney-Disease" />
                                                <span className="form-check-label">Kidney Disease</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Diabetes" value="Diabetes" />
                                                <span className="form-check-label">Diabetes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form">
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-High-Blood-Pressure" value="High-Blood-Pressure" />
                                                <span className="form-check-label">High Blood Pressure</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Asthma" value="Asthma" />
                                                <span className="form-check-label">Asthma</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Stroke" value="Stroke" />
                                                <span className="form-check-label">Stroke</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Cancer" value="Cancer" />
                                                <span className="form-check-label">Cancer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row form">
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Allergy" value="Heart-Disease" />
                                                <span className="form-check-label">Allergy</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Tuberculosis" value="Anemia" />
                                                <span className="form-check-label">Tuberculosis</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Epilepsy" value="Kidney-Disease" />
                                                <span className="form-check-label">Epilepsy</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="Is-there-Mental-Disorder" value="Diabetes" />
                                                <span className="form-check-label">Mental Disorder</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part life_style_input">
                                <h3>Life Style</h3>
                                <div className="row form">
                                    <div className="col-md-6">
                                        Daily consumption of tobacco:
                                        <input type="text" id="tobacco" className="preexisiting-disabled" />
                                        per day
                                    </div>
                                    <div className="col-md-6">
                                        Average weekly consumption of alcohol:
                                        <input type="text" id="alcohol" className="preexisiting-disabled" />
                                        units per week
                                    </div>
                                </div>
                                <div className="row form">
                                    <div className="col-md-6">
                                        Exercise type:
                                        <input type="text" id="exercisetype" className="preexisiting-disabled" />
                                        minutes per day:
                                        <input type="text" id="minutes" className="preexisiting-disabled" />
                                    </div>
                                    <div className="col-md-6">
                                        <span> Recreational Drugs : </span>
                                        <input type="checkbox" name="DrugsYes" id="DrugsYes" onChange={() => this.RecreationalDrugs("Yes")}
                                            className="preexisiting-disabled" value="Yes"></input>
                                        <span className="form-check-label">Yes</span>

                                        <input type="checkbox" name="DrugsNo" id="DrugsNo" onChange={() => this.RecreationalDrugs("No")}
                                            className="preexisiting-disabled" value="No"></input>
                                        <span className="form-check-label">No</span>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <h3>Medical History</h3>
                                <p className="preex_p_font">Information on Medications taken on a regular or occasional basis over the past two years</p>
                                <p> <input type="checkbox" name="Medications" id="Medications" className="medications preexisiting-disabled" ></input>
                                    <span className="single-checkbox">I have not take any medications over the past 2 years</span></p>
                                <div className="medical-history-table-part">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered"
                                            id="table-preexisiting-medicalhistory"
                                        >
                                            <thead style={{ background: "#0047ab" }}>
                                                <tr>
                                                    <th scope="col">Medication and dosage </th>
                                                    <th scope="col">Date started (dd/mm/yyyy)</th>
                                                    <th scope="col">Reason for medication</th>
                                                    <th scope="col">Are you currently taking this medication?</th>

                                                    <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tble-tbody-preexisiting-medicalhistory">

                                                <tr className="tble-medicalhistory-first-row">
                                                    <td>
                                                        <input type="text" id="Medication-and-dosage" className="form-control medication-and-dosage" />
                                                    </td>
                                                    <td>
                                                        <input type="date" id="Date-Started" className="form-control date-started" />
                                                    </td>
                                                    <td>
                                                        <input type="text" id="Reason-for-medication" className="form-control reason-for-medication" />
                                                    </td>
                                                    <td>
                                                        <select id="currently-taking-this-medication" className="form-control ">
                                                            <option value="">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="add-btn-wrap clearfix">
                                        <button
                                            type="submit"
                                            className="Add-new-btn  Add-new-medical-history"
                                            onClick={(e) => this.MedicalHistoryAddNewRow(e)}
                                        >
                                            Add New Row
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part mb-0">
                                <h3>Surgical History</h3>
                                <p className="preex_p_font">List of all Chronic Health Problems, Hospitalizations and Surgeries that you have experienced</p>
                                <p><input type="checkbox" name="Surgical-History" id="Surgical-History" className="surgical-history preexisiting-disabled" />
                                    <span className="single-checkbox">I have not had any chronic health problems,hospitalizations, nor surgeries</span></p>
                                <div className="surgical-history-table-part">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered"
                                            id="table-preexisiting-surgicalhistory"
                                        >
                                            <thead style={{ background: "#0047ab" }}>
                                                <tr>
                                                    <th scope="col" style={{ width: "10%" }}>Date</th>
                                                    <th scope="col" >Problem / hospitalization / surgery </th>
                                                    <th scope="col" style={{ width: "17%" }}>Surgery performed ?</th>
                                                    <th scope="col" style={{ width: "40%" }}>Current status related to each health issue & date of any surgery performed</th>

                                                    <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                                </tr>

                                            </thead>
                                            <tbody id="tble-tbody-preexisiting-surgicalhistory">

                                                <tr className="tble-surgicalhistory-first-row">
                                                    <td>
                                                        <input type="date" id="Surgical-History-Date" className="form-control tble-surgical-history-date" />
                                                    </td>
                                                    <td>
                                                        <input type="text" id="Surgical-History-Surgey" className="form-control tble-surgical-history-surgey" />
                                                    </td>
                                                    <td>
                                                        <select id="Surgical-History-Surgey-Perfomred" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="NO">No</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="text" id="Surgical-History-Current-Status" className="form-control tble-surgical-history-current-status " />
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="add-btn-wrap clearfix">
                                        <button
                                            type="submit"
                                            className="Add-new-btn  Add-new-surgical-history"
                                            onClick={(e) => this.SurgicalHistoryAddNewRow(e)}
                                        >
                                            Add New Row
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part">
                                <div className="row form preex_p_font">
                                    <p>Please check to make sure you have completed all questions on the above.
                                        Your medical information cannot be evaluated unless all questions are completed or marked “unknown”</p>
                                    <p>I affirm that the information and response I have provided are accurate true to the best of my knowledge. </p>
                                </div>
                                <div className="row form ">
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
                                    id="saveitemid"
                                    className="dashboard_submit_btn preexist-submit"
                                    type="submit"
                                    onClick={() => this.SaveListItem()}>
                                    Submit
                                </button>
                                :
                                <button style={{ cursor: "no-drop" }}
                                    id="saveitemid"
                                    className="dashboard_submit_btn preexist-submit"
                                    type="submit">
                                    Submit
                                </button>
                            }

                            <button
                                style={{ display: "none" }}
                                id="update-btn-preexist"
                                className="dashboard_submit_btn"
                                type="submit"
                                onClick={() => this.UpdateListItemPreExist()}>
                                Update
                            </button>
                            <button style={{ display: "none" }} className="dashboard_cancel_btn btn-cancel print-btn-preex" type="submit" onClick={() => this.Printthis()}>Print</button>
                            {GlobalFormOpenedMode == "New" &&
                                <button id="btn-sign-preexist" className="dashboard_submit_btn btn-cancel" type="reset">
                                    <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/VPS-Onboarding-Landingpage.aspx?WebView">
                                        Cancel
                                    </a>
                                </button>
                            }

                            {GlobalFormOpenedMode == "Edit" &&
                                <button id="btn-hr-preexist" className="dashboard_submit_btn btn-cancel" type="reset">
                                    <a data-interception="off" target="_self" href="https://vpshealth.sharepoint.com/sites/BurjeelHoldings/HRFORM/SitePages/Dashboard.aspx?env=WebView`">
                                        Cancel
                                    </a>
                                </button>
                            }
                        </div>
                    </div>
                </div>

                <div id="dashboard_right-print-preexist" style={{ display: "none" }}>
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
                        <div className="header-title-units">
                            <span>PRE EXISTING MEDICAL CONDITION FORM</span>
                            <ul>
                                <li>Control Number: <b id="print-preexisting-Control-Number"></b></li>
                                <li>Version: <b id="print-preexisting-Version-Number"></b></li>
                            </ul>
                        </div>
                    </div>
                    <div className="dashboard_right_ffamily">
                        <div className="preexisiting_top personal_info_part print-preexisiting_sec">
                            <div className="preexisiting_part">
                                <div className="row form row_top">
                                    <h3>General Health History Questionnaire</h3>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span
                                                id="print-PreExistingFirstName"

                                                className="print-control preexisting-firstname"
                                            />
                                            <span className="floating-label">
                                                First Name
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span

                                                id="print-PreExistingLastName"

                                                className="print-control preexisting-lastname"
                                            />
                                            <span className="floating-label">
                                                Last Name
                                                <i className="required">*</i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <span
                                                id="print-PreExistingNationality"
                                                className="print-control preexisiting-nationality"
                                            >

                                            </span>

                                            <span className="floating-label">
                                                Nationality
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span
                                                id="print-PreExistingDateofBirth"


                                                className="print-control preexisiting-dateofbirth"
                                            />
                                            <span className="floating-label">
                                                Date of Birth
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative ">
                                            <span
                                                id="print-PreExistingGender"
                                                className="print-control preexisiting-gender"
                                            >
                                            </span>
                                            <span className="floating-label">
                                                Gender
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-4 print-height-weight">
                                        <div className="form-group relative ">
                                            <span

                                                id="print-PreExistingHeight"

                                                className="print-control "
                                            />
                                            {/* <p className="height-cm">cm</p> */}
                                            <span className="floating-label">
                                                Height
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className="col-md-2 print-height-weight">
                                        <div className="form-group relative ">
                                            <span
                                                id="print-PreExistingWeight"
                                                className="print-control"
                                            />
                                            {/* <p className="weight-kg">kg</p> */}
                                            <span className="floating-label">
                                                Weight
                                                <i className="required">*</i>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part preexisitng-occu">
                                <h3 style={{ paddingTop: "5px" }}>Occupational History</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered "
                                        id="print-table-preexisiting-occupational"
                                    >
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                <th scope="col" style={{ width: "100px" }}>From</th>
                                                <th scope="col" style={{ width: "100px" }}>To</th>
                                                <th scope="col">Occupation</th>
                                                <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="print-tble-tbody-preexisiting-occupational">

                                            <tr className="tble-occupational-first-row">
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

                                <h4>Work Exposure (checkbox if yes)</h4>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Ionizing-Radiation" value="Ionizing-Radiation" />
                                                <span className="form-check-label">Ionizing-Radiation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Chemicals" value="Chemicals" />
                                                <span className="form-check-label">Chemicals</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Heavy-Metals" value="Heavy-Metals" />
                                                <span className="form-check-label">Heavy Metals</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Dust" value="Dust" />
                                                <span className="form-check-label">Dust</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Noise" value="Noise" />
                                                <span className="form-check-label">Noise</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 print-Industrial">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="Work-Exposure" id="print-Compensation" value="Compensation" />
                                                <span className="form-check-label">Industrial Accident / Compensation</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

                            <div className="preexisiting_part" style={{ marginTop: "20px" }}>
                                <h3>Personal History – Do You Suffer From Or Have You Had?- (check box if yes)</h3>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered mb-0"
                                        id="print-table-preexisiting-personal-history"
                                    >

                                        <tbody id="print-tble-tbody-preexisiting-personal-history">

                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <input type="checkbox" id="print-Rheumatic-Fever" name="print-Personal-History" /> <span>Rheumatic Fever</span>
                                                </td>
                                                <td style={{ width: "30%" }}>
                                                    <input type="checkbox" id="print-Rectal-Bleeding" name="print-Personal-History" /> <span>Rectal Bleeding</span>
                                                </td>
                                                <td style={{ width: "35%" }}>
                                                    <input type="checkbox" id="print-Thyroid-Disease" name="print-Personal-History" /> <span>Thyroid Disease</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td >
                                                    <input type="checkbox" id="print-Muscular-Weakness" name="print-Personal-History" /> <span>Muscular Weakness/ Paralysis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-High-Blood-Pressure" name="print-Personal-History" /> <span>High Blood Pressure</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Hernia" name="print-Personal-History" /> <span>Hernia</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Anxiety" name="print-Personal-History" /> <span>Anxiety / Depression</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Back-Pain" name="print-Personal-History" /> <span>Lost Time Due to Back Pain</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Varicose-Vein" name="print-Personal-History" /> <span>Varicose Vein</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Venereal-Disease" name="print-Personal-History" /> <span>Venereal Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Insomnia" name="print-Personal-History" /> <span>Insomnia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Unexplained-Chronic" name="print-Personal-History" /> <span>Unexplained Chronic Fatigue</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Chest-Pain" name="print-Personal-History" /> <span>Chest Pain</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Kidney-Disease" name="print-Personal-History" /> <span>Kidney Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Back-Trouble" name="print-Personal-History" /> <span>Back Trouble</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Irritable" name="print-Personal-History" /> <span>Irritable or Inflammatory Bowel Disease</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Breathlessness" name="print-Personal-History" /> <span>Breathlessness</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Renal-Colic" name="print-Personal-History" /> <span>Renal Colic</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Bone-Complaint" name="print-Personal-History" /> <span>Bone Complaint</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Migraines" name="print-Personal-History" /> <span>Lost Work Time Due to Migraines</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Palpitations" name="print-Personal-History" /> <span>Palpitations</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Incontinence" name="print-Personal-History" /> <span>Incontinence</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Joint-Complaint" name="print-Personal-History" /> <span>Joint Complaint</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Diagnosis-of-Depression" name="print-Personal-History" /> <span>Diagnosis of Depression</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Pneumonia" name="print-Personal-History" /> <span>Pneumonia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Frequent-Urination" name="print-Personal-History" /> <span>Frequent Urination</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Skin-Disease" name="print-Personal-History" /> <span>Skin Disease</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Dipolar-Disorder" name="print-Personal-History" /> <span>Diagnosis of Dipolar Disorder</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Tuberculosis" name="print-Personal-History" /> <span>Tuberculosis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Painful-Urination" name="print-Personal-History" /> <span>Painful Urination</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Multiple-Sclerosis" name="print-Personal-History" /> <span>Multiple Sclerosis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Compulsive-Disorder" name="print-Personal-History" /> <span>Diagnosis Of Obsessive Compulsive Disorder</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Bronchitis" name="print-Personal-History" /> <span>Bronchitis</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Blood-in-Urine" name="print-Personal-History" /> <span>Blood in Urine</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Jaundice" name="print-Personal-History" /> <span>Jaundice</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Panic-Attacks" name="print-Personal-History" /> <span>Diagnosis of Anxiety or Panic Attacks</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Asthma" name="print-Personal-History" /> <span>Asthma</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Epilepsy" name="print-Personal-History" /> <span>Epilepsy</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Diabetes" name="print-Personal-History" /> <span>Diabetes</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Psychiatric-hospital" name="print-Personal-History" /> <span>Have you been admitted to a medical health / Psychiatric hospital?</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Chronic-Cough" name="print-Personal-History" /> <span>Chronic Cough</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Stroke" name="print-Personal-History" /> <span>Stroke</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Poliomyelitis" name="print-Personal-History" /> <span>Poliomyelitis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-psychiatric-illness" name="print-Personal-History" /> <span>Have you ever suffered any mental and / or psychiatric illness/disorder?</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Sputum-With-Blood" name="print-Personal-History" /> <span>Sputum With Blood</span>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Migraine" name="print-Personal-History" /> <span>Migraine</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Anemia" name="print-Personal-History" /> <span>Anemia</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-prescribed" name="print-Personal-History" /> <span>Have you ever taken and/or been prescribed any Psychiatric meds?</span>
                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Peptic-Ulcer" name="print-Personal-History" /> <span>Peptic Ulcer</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Loss-of-Consciousness" name="print-Personal-History" /> <span>Loss of Consciousness</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Cancer" name="print-Personal-History" /> <span>Cancer</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-traumas" name="print-Personal-History" /> <span>Have you ever suffered any serious head traumas/ injuries?</span>

                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Hemorrhoids" name="print-Personal-History" /> <span>Hemorrhoids</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Numbness" name="print-Personal-History" /> <span>Numbness/ Tingling</span>
                                                </td>


                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Arthritis" name="print-Personal-History" /> <span>Arthritis</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-counselor" name="print-Personal-History" /> <span>Have you even seen a Psychiatric and/or Psychologist / counselor?</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Eye-Trouble" name="print-Personal-History" /> <span>Eye Trouble</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Ear-Trouble" name="print-Personal-History" /> <span>Ear Trouble</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-Fibromyalgia" name="print-Personal-History" /> <span>Fibromyalgia</span>
                                                </td>
                                                <td className="print-drug-td">
                                                    <input type="checkbox" id="print-Drug-Reaction" name="Personal-History" /> <span>Drug Reaction :</span>

                                                    <span id="print-Drug-Reaction-Reason" className=""
                                                        style={{ display: "none" }} />

                                                </td>

                                            </tr>

                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="print-Color-Vision" name="print-Personal-History" />  <span>Difficulty Color Vision</span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="print-nose-trouble" name="print-Personal-History" /> <span>Nose Trouble</span>
                                                </td>
                                                <td className="print-allergy-td">
                                                    <input type="checkbox" id="print-Allergy" name="print-Personal-History" /> <span>Allergy :</span>

                                                    <span id="print-Allergy-Reason" className=""
                                                        style={{ display: "none" }} />

                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                                <div id="CheckedPersHist" className="row form print-family-check"></div>
                            </div>

                            <div className="preexisiting_part female_part" style={{ paddingTop: "-5px" }}>
                                <h3 style={{ marginBottom: "0px" }}>Female</h3>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check print_report_jr">
                                                Are you pregnant?{" "}

                                                <span id="print-PregnantYes" style={{ display: "none" }}>Yes</span>

                                                <span id="print-PregnantNo" style={{ display: "none" }}>No</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="print-female-statics">
                                        <div className="col-md-4 print_report_jr">
                                            Number of Pregnancies:{" "}
                                            <span id="print-NoofPregnancies" className="" />
                                        </div>
                                        <div className="col-md-4 print_report_jr">
                                            Number of Live Births:{" "}
                                            <span id="print-NoofLiveBirths" className="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

                            <div className="preexisiting_part" style={{ paddingTop: "20px" }}>
                                <h3>Family History</h3>
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="print-table-preexisiting-familyhistory">
                                        <thead style={{ background: "#0047ab" }}>
                                            <tr>
                                                <th scope="col" style={{ width: "20%" }}>Family</th>
                                                <th scope="col" style={{ width: "10%" }}>Age</th>
                                                <th scope="col">State of Health / Cause of Death</th>

                                                <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="print-tble-tbody-preexisiting-familyhistory">

                                            <tr className="tble-familyhistory-first-row">
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

                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <span id="print-NoofChildren" className="print-control no-of-children preexisiting-disabled"></span>
                                            <span className="floating-label">Number of children</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="preexisiting_part" >
                                <h3 style={{ marginTop: "-5px" }}>Is There A Family History Of – (check box if yes)</h3>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" name="family-history-check" type="checkbox" id="print-Is-there-Heart-Disease" value="Heart-Disease" />
                                                <span className="form-check-label">Heart Disease</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" name="family-history-check" type="checkbox" id="print-Is-there-Anemia" value="Anemia" />
                                                <span className="form-check-label">Anemia</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="print-Is-there-Kidney-Disease" value="Kidney-Disease" />
                                                <span className="form-check-label">Kidney Disease</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="print-Is-there-Diabetes" value="Diabetes" />
                                                <span className="form-check-label">Diabetes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="family-history-check" id="print-Is-there-High-Blood-Pressure" value="High-Blood-Pressure" />
                                                <span className="form-check-label">High Blood Pressure</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Asthma" value="Asthma" />
                                                <span className="form-check-label">Asthma</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row form">
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Stroke" value="Stroke" />
                                                <span className="form-check-label">Stroke</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Cancer" value="Cancer" />
                                                <span className="form-check-label">Cancer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Allergy" value="Heart-Disease" />
                                                <span className="form-check-label">Allergy</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row form">

                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Tuberculosis" value="Anemia" />
                                                <span className="form-check-label">Tuberculosis</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Epilepsy" value="Kidney-Disease" />
                                                <span className="form-check-label">Epilepsy</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group relative">
                                            <div className="form-check">
                                                <input className="" type="checkbox" name="print-family-history-check" id="print-Is-there-Mental-Disorder" value="Diabetes" />
                                                <span className="form-check-label">Mental Disorder</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="preexisiting_part preexisitng-lifestyle life_style_input print_report_jr">
                                <h3>Life Style</h3>
                                <div className="row form" style={{ marginTop: "-5px" }}>
                                    <ul className="print_life_style_li">
                                        <li>
                                            <div className="" >
                                                Daily consumption of tobacco:{" "}
                                                <span id="print-tobacco" className="preexisiting-disabled" />
                                                {" "}per day
                                            </div>
                                        </li>
                                        <li>
                                            <div className="">
                                                Average weekly consumption of alcohol:{" "}
                                                <span id="print-alcohol" className="preexisiting-disabled" />
                                                {" "}units per week
                                            </div>
                                        </li>
                                        <li>
                                            <div className="">
                                                Exercise type:{" "}
                                                <span id="print-exercisetype" className="preexisiting-disabled" />
                                                {" "}minutes per day:{" "}
                                                <span id="print-minutes" className="preexisiting-disabled" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className=" print_report_jr">

                                                Recreational Drugs :{" "}

                                                <span id="print-DrugsYes" style={{ display: "none" }} >Yes</span>

                                                <span id="print-DrugsNo" style={{ display: "none" }}>No</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pagebreak" style={{ pageBreakAfter: "always" }}></div>

                            <div className="preexisiting_part" style={{ marginTop: "20px" }}>
                                <h3>Medical History</h3>
                                <p>Information on Medications taken on a regular or occasional basis over the past two years </p>
                                <p className="print_report_jr">
                                    <span className="single-checkbox" id="print-Medications" style={{ display: "none" }}>I have not take any medications over the past 2 years</span>
                                </p>
                                <div className="print-medical-history-table-part">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered"
                                            id="print-table-preexisiting-medicalhistory"
                                        >
                                            <thead style={{ background: "#0047ab" }}>
                                                <tr>
                                                    <th scope="col">Medication and dosage </th>
                                                    <th scope="col">Date started (dd/mm/yyyy)</th>
                                                    <th scope="col">Reason for medication</th>
                                                    <th scope="col">Are you currently taking this medication?</th>

                                                    <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="print-tble-tbody-preexisiting-medicalhistory">

                                                <tr className="tble-medicalhistory-first-row">
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
                            </div>


                            <div className="preexisiting_part mb-0 preexisitng-occu">
                                <h3>Surgical History</h3>
                                <p>List of all Chronic Health Problems, Hospitalizations and Surgeries that you have experienced</p>
                                <p className="print_report_jr">
                                    <span className="single-checkbox" id="print-Surgical-History" style={{ display: "none" }}>I have not had any chronic health problems,hospitalizations, nor surgeries</span>
                                </p>
                                <div className="print-surgical-history-table-part">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered"
                                            id="print-table-preexisiting-surgicalhistory"
                                        >
                                            <thead style={{ background: "#0047ab" }}>
                                                <tr>
                                                    <th scope="col" style={{ width: "15%" }}>Date</th>
                                                    <th scope="col" >Problem / hospitalization / surgery </th>
                                                    <th scope="col" style={{ width: "12.5%" }}>Surgery performed ?</th>
                                                    <th scope="col" style={{ width: "40%" }}>Current status related to each health issue & date of any surgery performed</th>

                                                    <th className="Action-columnviewmode-PreExist" scope="col"></th>
                                                </tr>

                                            </thead>
                                            <tbody id="print-tble-tbody-preexisiting-surgicalhistory">

                                                <tr className="tble-surgicalhistory-first-row">
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
                            </div>

                            <div className="preexisiting_part" style={{ marginTop: "-20px" }}>
                                <div className="row form ">
                                    <p>Please check to make sure you have completed all questions on the above.
                                        Your medical information cannot be evaluated unless all questions are completed or marked “unknown”</p>
                                    <p>I affirm that the information and response I have provided are accurate true to the best of my knowledge. </p>
                                </div>
                                <div className="signature-new-wrap print-jr-sign">

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
            </>
        );
    }
}