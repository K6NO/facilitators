import i18n from 'meteor/universe:i18n';
import React from 'react';

export const getLanguageName = (locale) => {
  return [
      { value: 'en-US', label: i18n.__('searchbox.en-US')},
      { value: 'es', label: i18n.__('searchbox.es')},
      { value: 'hu', label: i18n.__('searchbox.hu')},
      { value: 'ro', label: i18n.__('searchbox.ro')},
      { value: 'sk', label: i18n.__('searchbox.sk')},
  ].filter(e => e.value === locale)[0].label
};

export const getLanguageArray = () => {
  return [
      { value: 'en-US', label: i18n.__('searchbox.en-US')},
      { value: 'es', label: i18n.__('searchbox.es')},
      { value: 'hu', label: i18n.__('searchbox.hu')},
      { value: 'ro', label: i18n.__('searchbox.ro')},
      { value: 'sk', label: i18n.__('searchbox.sk')},
  ]
};

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

export const getMultiTimeArray = () => {
  return [
      { value: 'timevs', text: i18n.__('activity.timevs'), markup: multiSelectOptionMarkup(i18n.__('activity.timevs'))},
      { value: 'timesh', text: i18n.__('activity.timesh'), markup: multiSelectOptionMarkup(i18n.__('activity.timesh'))},
      { value: 'timemd', text: i18n.__('activity.timemd'), markup: multiSelectOptionMarkup(i18n.__('activity.timemd'))},
      { value: 'timeln', text: i18n.__('activity.timeln'), markup: multiSelectOptionMarkup(i18n.__('activity.timeln'))},
      { value: 'timevl', text: i18n.__('activity.timevl'), markup: multiSelectOptionMarkup(i18n.__('activity.timevl'))},
  ]
};

export const getMultiTagsArray = () => {
  return [
      { value: '0', text: i18n.__('tags.0'), markup: multiSelectOptionMarkup(i18n.__('tags.0'))},
      { value: '1', text: i18n.__('tags.1'), markup: multiSelectOptionMarkup(i18n.__('tags.1'))},
      { value: '2', text: i18n.__('tags.2'), markup: multiSelectOptionMarkup(i18n.__('tags.2'))},
      { value: '3', text: i18n.__('tags.3'), markup: multiSelectOptionMarkup(i18n.__('tags.3'))},
      { value: '4', text: i18n.__('tags.4'), markup: multiSelectOptionMarkup(i18n.__('tags.4'))},
      { value: '5', text: i18n.__('tags.5'), markup: multiSelectOptionMarkup(i18n.__('tags.5'))},
      { value: '6', text: i18n.__('tags.6'), markup: multiSelectOptionMarkup(i18n.__('tags.6'))},
      { value: '7', text: i18n.__('tags.7'), markup: multiSelectOptionMarkup(i18n.__('tags.7'))},
      { value: '8', text: i18n.__('tags.8'), markup: multiSelectOptionMarkup(i18n.__('tags.8'))},
      { value: '9', text: i18n.__('tags.9'), markup: multiSelectOptionMarkup(i18n.__('tags.9'))},
      { value: '10', text: i18n.__('tags.10'), markup: multiSelectOptionMarkup(i18n.__('tags.10'))},
      { value: '11', text: i18n.__('tags.11'), markup: multiSelectOptionMarkup(i18n.__('tags.11'))},
      { value: '12', text: i18n.__('tags.12'), markup: multiSelectOptionMarkup(i18n.__('tags.12'))},
      { value: '13', text: i18n.__('tags.13'), markup: multiSelectOptionMarkup(i18n.__('tags.13'))},
      { value: '14', text: i18n.__('tags.14'), markup: multiSelectOptionMarkup(i18n.__('tags.14'))},
      { value: '15', text: i18n.__('tags.15'), markup: multiSelectOptionMarkup(i18n.__('tags.15'))},
      { value: '16', text: i18n.__('tags.16'), markup: multiSelectOptionMarkup(i18n.__('tags.16'))},
      { value: '17', text: i18n.__('tags.17'), markup: multiSelectOptionMarkup(i18n.__('tags.17'))},
      { value: '18', text: i18n.__('tags.18'), markup: multiSelectOptionMarkup(i18n.__('tags.18'))},
      { value: '19', text: i18n.__('tags.19'), markup: multiSelectOptionMarkup(i18n.__('tags.19'))},
  ]
};

export const getMultiLanguagesArray = () => {
  return [
    { value: 'en-US', text: i18n.__('searchbox.en-US'), markup: multiSelectOptionMarkup(i18n.__('searchbox.en-US'))},
    { value: 'es', text: i18n.__('searchbox.es'), markup: multiSelectOptionMarkup(i18n.__('searchbox.es'))},
    { value: 'hu', text: i18n.__('searchbox.hu'), markup: multiSelectOptionMarkup(i18n.__('searchbox.hu'))},
    { value: 'ro', text: i18n.__('searchbox.ro'), markup: multiSelectOptionMarkup(i18n.__('searchbox.ro'))},
    { value: 'sk', text: i18n.__('searchbox.sk'), markup: multiSelectOptionMarkup(i18n.__('searchbox.sk'))},
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