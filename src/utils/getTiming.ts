export const getTiming = (time : number , t:any) => {
  const newtime = time * 100;
  if (newtime >= 100) {
    return (newtime / 100).toFixed() + t("days-ago");
  } else if (newtime < 100 && newtime > 4) {
    return ((newtime * 24) / 100).toFixed() + t("hours-ago");
  } else {
    return t("minutes-ago");
  }
};
