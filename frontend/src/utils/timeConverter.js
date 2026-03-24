export const timeConverter = (time) => {
    let [hour, minute] = time.split(":");
    hour = Number(hour);

    let period = hour < 12 ? "AM" : "PM";

    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    return (`${hour}:${minute} ${period}`);
}