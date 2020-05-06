/**
 * Created by Ken on 26/02/2015.
 */
jQuery(function($){
    $.datepicker.regional['content-protector-i18n'] = {
        closeText: ContentProtectorJQDatepickerI18n.closeText,
        prevText: ContentProtectorJQDatepickerI18n.prevText,
        nextText: ContentProtectorJQDatepickerI18n.nextText,
        currentText: ContentProtectorJQDatepickerI18n.currentText,
        monthNames: ContentProtectorJQDatepickerI18n.monthNames,
        monthNamesShort: ContentProtectorJQDatepickerI18n.monthNamesShort,
        dayNames: ContentProtectorJQDatepickerI18n.dayNames,
        dayNamesShort: ContentProtectorJQDatepickerI18n.dayNamesShort,
        dayNamesMin: ContentProtectorJQDatepickerI18n.dayNamesMin,
        weekHeader: ContentProtectorJQDatepickerI18n.weekHeader,
        dateFormat: ContentProtectorJQDatepickerI18n.dateFormat,
        firstDay: ContentProtectorJQDatepickerI18n.firstDay,
        isRTL: ContentProtectorJQDatepickerI18n.isRTL,
        showMonthAfterYear: ContentProtectorJQDatepickerI18n.showMonthAfterYear,
        yearSuffix: ContentProtectorJQDatepickerI18n.yearSuffix	};
    $.datepicker.setDefaults($.datepicker.regional['content-protector-i18n']);

    $.timepicker.regional['content-protector-i18n'] = {
        hourText: ContentProtectorJQTimepickerI18n.hourText,
        minuteText: ContentProtectorJQTimepickerI18n.minuteText,
        amPmText: ContentProtectorJQTimepickerI18n.amPmText,
        showPeriod: ContentProtectorJQTimepickerI18n.showPeriod,
        showPeriodLabels: ContentProtectorJQTimepickerI18n.showPeriodLabels,
        showLeadingZero: ContentProtectorJQTimepickerI18n.showLeadingZero,
        timeSeparator: ContentProtectorJQTimepickerI18n.timeSeparator,
        closeButtonText: ContentProtectorJQTimepickerI18n.closeButtonText,
        nowButtonText: ContentProtectorJQTimepickerI18n.nowButtonText,
        deselectButtonText: ContentProtectorJQTimepickerI18n.deselectButtonText };
    $.timepicker.setDefaults($.timepicker.regional['content-protector-i18n']);

});