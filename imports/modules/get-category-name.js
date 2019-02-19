import i18n from 'meteor/universe:i18n';
import React from 'react';


export const getCategoryName = (category) => {
    return [
        { value: 'footprint', label: i18n.__('categories.footprint')},
        { value: 'deepeco', label: i18n.__('categories.deepeco')},
        { value: 'ecofem', label: i18n.__('categories.ecofem')},
        { value: 'landart', label: i18n.__('categories.landart')},
        { value: 'food', label: i18n.__('categories.food')},
        { value: 'community', label: i18n.__('categories.community')},
    ].filter(e => e.value === category)[0].label
};

export const getCategoryArray = () => {
    return [
        { value: 'footprint', label: i18n.__('categories.footprint')},
        { value: 'deepeco', label: i18n.__('categories.deepeco')},
        { value: 'ecofem', label: i18n.__('categories.ecofem')},
        { value: 'landart', label: i18n.__('categories.landart')},
        { value: 'food', label: i18n.__('categories.food')},
        { value: 'community', label: i18n.__('categories.community')},
    ]
};

export const getMultiCategoryArray = () => {
    return [
        { value: 'footprint', text: i18n.__('categories.footprint'), markup: multiSelectOptionMarkup(i18n.__('categories.footprint'))},
        { value: 'deepeco', text: i18n.__('categories.deepeco'), markup: multiSelectOptionMarkup(i18n.__('categories.deepeco'))},
        { value: 'ecofem', text: i18n.__('categories.ecofem'), markup: multiSelectOptionMarkup(i18n.__('categories.ecofem'))},
        { value: 'landart', text: i18n.__('categories.landart'), markup: multiSelectOptionMarkup(i18n.__('categories.landart'))},
        { value: 'food', text: i18n.__('categories.food'), markup: multiSelectOptionMarkup(i18n.__('categories.food'))},
        { value: 'community', text: i18n.__('categories.community'), markup: multiSelectOptionMarkup(i18n.__('categories.community'))},
    ]
};

export const getMultiGroupArray = () => {
  return [
      { value: 'groupvs', text: i18n.__('activity.groupvs'), markup: multiSelectOptionMarkup(i18n.__('activity.groupvs'))},
      { value: 'groupsm', text: i18n.__('activity.groupsm'), markup: multiSelectOptionMarkup(i18n.__('activity.groupsm'))},
      { value: 'groupmd', text: i18n.__('activity.groupmd'), markup: multiSelectOptionMarkup(i18n.__('activity.groupmd'))},
      { value: 'grouplg', text: i18n.__('activity.grouplg'), markup: multiSelectOptionMarkup(i18n.__('activity.grouplg'))},
      { value: 'groupvl', text: i18n.__('activity.groupvl'), markup: multiSelectOptionMarkup(i18n.__('activity.groupvl'))},
  ]
};

export const getMultiAgeArray = () => {
  return [
      { value: 'agech', text: i18n.__('activity.agech'), markup: multiSelectOptionMarkup(i18n.__('activity.agech'))},
      { value: 'agete', text: i18n.__('activity.agete'), markup: multiSelectOptionMarkup(i18n.__('activity.agete'))},
      { value: 'ageya', text: i18n.__('activity.ageya'), markup: multiSelectOptionMarkup(i18n.__('activity.ageya'))},
      { value: 'agead', text: i18n.__('activity.agead'), markup: multiSelectOptionMarkup(i18n.__('activity.agead'))},
      { value: 'ageel', text: i18n.__('activity.ageel'), markup: multiSelectOptionMarkup(i18n.__('activity.ageel'))},
  ]
};

const multiSelectOptionMarkup = (text) => (
    <div>
      <span className="checkbox">
        <svg className="checkbox-icon" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 488.878 488.878">
          <g><polygon points="143.294,340.058 50.837,247.602 0,298.439 122.009,420.447 122.149,420.306 144.423,442.58 488.878,98.123 437.055,46.298 "/></g>
        </svg>
      </span>
      <span>{text}</span>
    </div>
  );