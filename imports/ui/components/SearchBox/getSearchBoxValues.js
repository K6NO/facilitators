import i18n from 'meteor/universe:i18n';
import React from 'react';
import { getMultiCategoryArray, getMultiTimeArray, getMultiGroupArray, getMultiAgeArray } from '../../../modules/get-select-translations';

export const getSearchBoxValues = () => [
    {
        className: "CategoryMultiSelector",
        name: "category",
        noSelectionLabel: 'searchbox.categoryDefault',
        ariaLabel: "Search by category. Use up and down arrows to navigate categories. Hit enter to select.",
        options: getMultiCategoryArray()
    },
    {
        className: "GroupMultiSelector",
        name: "group",
        noSelectionLabel: 'searchbox.groupDefault',
        ariaLabel: "Search by group. Use up and down arrows to navigate group size. Hit enter to select.",
        options: getMultiGroupArray()
    },
    {
        className: "AgeMultiSelector",
        name: "age",
        noSelectionLabel: 'searchbox.ageDefault',
        ariaLabel: "Search by age. Use up and down arrows to navigate age. Hit enter to select.",
        options: getMultiAgeArray()
    },
    {
        className: "TimeMultiSelector",
        name: "time",
        noSelectionLabel: 'searchbox.timeDefault',
        ariaLabel: "Search by time. Use up and down arrows to navigate time. Hit enter to select.",
        options: getMultiTimeArray()
    },
];