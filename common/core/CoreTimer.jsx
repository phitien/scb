import ObjectAssign from 'object-assign';
import cookie from 'react-cookie';
/**
 * @class CoreTimer
 */
export default class CoreTimer {
    get options() {
        if (!this.opts) {
            this.opts = {
                unit: 'S',// S(second) or M(minute) or H(hour) or D(day)
                delayTime: 15, // run in 15 seconds after page loaded
                nextRun: 5*60, // next time after 5 minutes
                run: function() {
                    console.log(new Date);
                },
                canRun: function() {
                    return true;
                }
            };
        }
        return this.opts;
    }
    get run() {
        let me = this;
        let run = this.options.run;
        let canRun = this.options.canRun;
        cookie.save('app-timer-last-run', (new Date).getTime());
        return function() {
            if (canRun()) run();
        };
    }
    get now() {
        return (new Date).getTime();
    }
    get lastRun() {
        return parseInt(cookie.load('app-timer-last-run'));
    }
    get unit() {
        return this.options.unit.toUpperCase() == 'D' ? 24*60*60*1000 : this.options.unit == 'H' ? 60*60*1000 : this.options.unit == 'M' ? 60*1000 : 1000;
    }
    get delayTime() {
        return (parseInt(this.options.delayTime) | 0) * this.unit;
    }
    get nextRun() {
        let next = parseInt(this.options.nextRun);
        if(!next) return false;
        return this.lastRun + (next * this.unit);
    }
    schedule(opts) {
        this.opts = ObjectAssign({}, this.options, opts);
        if(!this.lastRun) {
            setTimeout(this.run, this.delayTime);
        }
        else {
            let nextRun = this.nextRun;
            if(nextRun && nextRun <= this.now)
                setTimeout(this.run, this.delayTime);
        }
    }
}
