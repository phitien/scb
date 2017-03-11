var months= ['January','February','March','April','May','June','July','August','September','October','November','December'];
export default {
     formatDatetime : timestamp => {
        // var time = new Date(timestamp);
        var currentTime = new Date().getTime();
        var diff = currentTime - timestamp;
        if (diff < 60000 && diff >= 0) {
            return 'moments ago';
        }
        else if (diff < 3600000 && diff >= 60000) {
            var minute = Math.round(diff / 60000);
            if (minute === 1) {
                return minute + ' minute ago';
            } else {
                return minute + ' minutes ago';
            }
        }
        else if (diff < 86400000 && diff >= 3600000) {
            var hour = Math.round(diff / 3600000);
            if (hour === 1) {
                return hour + ' hour ago';
            } else {
                return hour + ' hours ago';
            }
        }
        else if (diff < 604800000 && diff >= 86400000) {
            var day = Math.round(diff / 86400000);
            if (day === 1) {
                return day + ' day ago';
            } else {
                return day + ' days ago';
            }
        }
        else {
            var t = new Date(timestamp);
            return t.getDate() +' '+months[t.getMonth()] +', '+ t.getFullYear();
        }

    },

    articleDateTime: timestamp => {

        var date = new Date(timestamp);
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getUTCMonth();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return months[month] + ' '+day + ','+year+ ' \u2014 ' +hours+':'+minutes +' '+ampm;
    }


}
