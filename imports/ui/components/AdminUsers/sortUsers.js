export const byRole = (a,b) => {
    if(a.roles && a.roles.length > b.roles.length) {
      return -1;
    }
    if (a.roles && a.roles.length < b.roles.length) {
      return 1;
    }
    return 0;
}

export const byOrganisation = (a,b) => {
    if(a.organisation > b.organisation) {
        return 1;
      }
      if (a.organisation < b.organisation) {
        return -1;
      }
      return 0;
}