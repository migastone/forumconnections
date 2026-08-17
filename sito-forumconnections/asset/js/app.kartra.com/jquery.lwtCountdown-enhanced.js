/*!
 * Enhanced jQuery Countdown plugin v1.0 with Web Worker support
 * Fixes browser throttling issues when tab is inactive
 * 
 * Based on original jQuery Countdown plugin v1.0
 * http://www.littlewebthings.com/projects/countdown/
 *
 * Copyright 2010, Vassilis Dourdounis
 * Enhanced by Kartra
 */

(function($){
    
    // Web Worker for countdown timing
    let countdownWorker = null;
    let workerSupported = false;
    
    // Initialize Web Worker if supported
    function initWorker() {
        if (typeof Worker !== 'undefined') {
            try {
                // Create worker from inline script or external file
                const workerScript = `
                    // Store active countdowns
                    const activeCountdowns = new Map();
                    
                    // Handle messages from the main thread
                    self.addEventListener('message', function(e) {
                        const { type, countdownId, data } = e.data;
                        
                        switch (type) {
                            case 'start':
                                startCountdown(countdownId, data);
                                break;
                            case 'stop':
                                stopCountdown(countdownId);
                                break;
                            case 'pause':
                                pauseCountdown(countdownId);
                                break;
                            case 'resume':
                                resumeCountdown(countdownId);
                                break;
                        }
                    });
                    
                    function startCountdown(countdownId, data) {
                        const { targetTime, onTick, onComplete } = data;
                        
                        // Calculate initial time remaining
                        const now = Date.now();
                        const timeRemaining = Math.max(0, targetTime - now);
                        
                        // Store countdown data
                        activeCountdowns.set(countdownId, {
                            targetTime,
                            onTick,
                            onComplete,
                            isPaused: false,
                            startTime: now,
                            pausedTime: 0
                        });
                        
                        // Start the countdown
                        tickCountdown(countdownId);
                    }
                    
                    function stopCountdown(countdownId) {
                        activeCountdowns.delete(countdownId);
                    }
                    
                    function pauseCountdown(countdownId) {
                        const countdown = activeCountdowns.get(countdownId);
                        if (countdown) {
                            countdown.isPaused = true;
                            countdown.pauseStartTime = Date.now();
                        }
                    }
                    
                    function resumeCountdown(countdownId) {
                        const countdown = activeCountdowns.get(countdownId);
                        if (countdown) {
                            countdown.isPaused = false;
                            if (countdown.pauseStartTime) {
                                countdown.pausedTime += Date.now() - countdown.pauseStartTime;
                                countdown.pauseStartTime = null;
                            }
                        }
                    }
                    
                    function tickCountdown(countdownId) {
                        const countdown = activeCountdowns.get(countdownId);
                        
                        if (!countdown) {
                            return; // Countdown was stopped
                        }
                        
                        if (countdown.isPaused) {
                            // Resume after a short delay when unpaused
                            setTimeout(() => tickCountdown(countdownId), 100);
                            return;
                        }
                        
                        const now = Date.now();
                        const adjustedNow = now - countdown.pausedTime;
                        const timeRemaining = Math.max(0, countdown.targetTime - adjustedNow);
                        
                        // Calculate time components
                        const totalSeconds = Math.floor(timeRemaining / 1000);
                        const seconds = totalSeconds % 60;
                        const minutes = Math.floor(totalSeconds / 60) % 60;
                        const hours = Math.floor(totalSeconds / 3600) % 24;
                        const days = Math.floor(totalSeconds / 86400);
                        
                        // Send tick data to main thread
                        self.postMessage({
                            type: 'tick',
                            countdownId,
                            data: {
                                timeRemaining,
                                totalSeconds,
                                seconds,
                                minutes,
                                hours,
                                days,
                                isComplete: timeRemaining <= 0
                            }
                        });
                        
                        if (timeRemaining > 0) {
                            // Schedule next tick
                            setTimeout(() => tickCountdown(countdownId), 1000);
                        } else {
                            // Countdown complete
                            self.postMessage({
                                type: 'complete',
                                countdownId
                            });
                            
                            // Clean up
                            activeCountdowns.delete(countdownId);
                        }
                    }
                `;
                
                const blob = new Blob([workerScript], { type: 'application/javascript' });
                const workerUrl = URL.createObjectURL(blob);
                countdownWorker = new Worker(workerUrl);
                
                // Handle worker messages
                countdownWorker.onmessage = function(e) {
                    const { type, countdownId, data } = e.data;
                    const $element = $('#' + countdownId);
                    
                    if (type === 'tick') {
                        updateCountdownDisplay($element, data);
                    } else if (type === 'complete') {
                        const callback = $.data($element[0], 'callback');
                        if (callback) {
                            callback();
                        }
                    }
                };
                
                workerSupported = true;
            } catch (e) {
                console.warn('Web Worker not supported, falling back to setTimeout');
                workerSupported = false;
            }
        }
    }
    
    // Initialize worker on first use
    if (!countdownWorker) {
        initWorker();
    }
    
    // Update countdown display
    function updateCountdownDisplay($element, timeData) {
        const { seconds, minutes, hours, days, weeks } = timeData;
        
        $element.dashChangeTo($element.attr('id'), 'countdown__item--seconds', seconds, 800);
        $element.dashChangeTo($element.attr('id'), 'countdown__item--minutes', minutes, 1200);
        $element.dashChangeTo($element.attr('id'), 'countdown__item--hours', hours, 1200);
        $element.dashChangeTo($element.attr('id'), 'countdown__item--day', days, 1200);
        $element.dashChangeTo($element.attr('id'), 'weeks_dash', weeks || 0, 1200);
    }

    $.fn.countDown = function (options) {
        config = {};
        $.extend(config, options);

        diffSecs = this.setCountDown(config);
    
        if (config.onComplete) {
            $.data($(this)[0], 'callback', config.onComplete);
        }
        if (config.omitWeeks) {
            $.data($(this)[0], 'omitWeeks', config.omitWeeks);
        }

        $('#' + $(this).attr('id') + ' .digit-list__item').html('<div class="top"></div><div class="bottom"></div>');
        
        // Use Web Worker if available, otherwise fall back to original method
        if (workerSupported && countdownWorker) {
            this.doCountDownWithWorker($(this).attr('id'), diffSecs, 500);
        } else {
            $(this).doCountDown($(this).attr('id'), diffSecs, 500);
        }

        return this;
    };

    $.fn.stopCountDown = function () {
        const countdownId = $(this).attr('id');
        
        if (workerSupported && countdownWorker) {
            countdownWorker.postMessage({
                type: 'stop',
                countdownId: countdownId
            });
        } else {
            clearTimeout($.data(this[0], 'timer'));
        }
    };

    $.fn.startCountDown = function () {
        const countdownId = $(this).attr('id');
        
        if (workerSupported && countdownWorker) {
            const diffSecs = $.data(this[0], 'diffSecs');
            this.doCountDownWithWorker(countdownId, diffSecs, 500);
        } else {
            this.doCountDown($(this).attr('id'), $.data(this[0], 'diffSecs'), 500);
        }
    };

    $.fn.setCountDown = function (options) {
        var targetTime = new Date();

        if (options.targetDate) {
            targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
        }
        else if (options.targetOffset) {
            targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
            targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
            targetTime.setDate(options.targetOffset.day + targetTime.getDate());
            targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
            targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
            targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
        }

        var nowTime = new Date();
        diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);

        $.data(this[0], 'diffSecs', diffSecs);
        $.data(this[0], 'targetTime', targetTime.valueOf());

        return diffSecs;
    };

    // New method using Web Worker
    $.fn.doCountDownWithWorker = function (id, diffSecs, duration) {
        const $this = $('#' + id);
        const targetTime = $.data($this[0], 'targetTime') || (Date.now() + (diffSecs * 1000));
        
        if (diffSecs <= 0) {
            const callback = $.data($this[0], 'callback');
            if (callback) {
                callback();
            }
            return;
        }

        // Start worker countdown
        countdownWorker.postMessage({
            type: 'start',
            countdownId: id,
            data: {
                targetTime: targetTime,
                onTick: true,
                onComplete: true
            }
        });
    };

    // Original method (fallback)
    $.fn.doCountDown = function (id, diffSecs, duration) {
        $this = $('#' + id);
        if (diffSecs <= 0) {
            diffSecs = 0;
            if ($.data($this[0], 'timer')) {
                clearTimeout($.data($this[0], 'timer'));
            }
        }

        secs = diffSecs % 60;
        mins = Math.floor(diffSecs/60)%60;
        hours = Math.floor(diffSecs/60/60)%24;
        if ($.data($this[0], 'omitWeeks') == true) {
            days = Math.floor(diffSecs/60/60/24);
            weeks = Math.floor(diffSecs/60/60/24/7);
        }
        else {
            days = Math.floor(diffSecs/60/60/24)%7;
            weeks = Math.floor(diffSecs/60/60/24/7);
        }

        $this.dashChangeTo(id, 'countdown__item--seconds', secs, duration ? duration : 800);
        $this.dashChangeTo(id, 'countdown__item--minutes', mins, duration ? duration : 1200);
        $this.dashChangeTo(id, 'countdown__item--hours', hours, duration ? duration : 1200);
        $this.dashChangeTo(id, 'countdown__item--day', days, duration ? duration : 1200);
        $this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

        $.data($this[0], 'diffSecs', diffSecs);
        if (diffSecs > 0) {
            e = $this;
            t = setTimeout(function() { e.doCountDown(id, diffSecs-1) } , 1000);
            $.data(e[0], 'timer', t);
        } 
        else if (cb = $.data($this[0], 'callback')) {
            $.data($this[0], 'callback')();
        }
    };

    $.fn.dashChangeTo = function(id, dash, n, duration) {
        $this = $('#' + id);
        var digits = String(n).length,
        $elements  = $this.find('.' + dash + ' .digit-list__item');

        if ($elements.length !== 0 && digits > $elements.length) {
            var $parent = $elements.parent(),
            $clone = $elements.eq(1).clone();

            for (var i = $elements.length; i < digits; i++) {
                $parent.append($clone);
            }
        }

        for (var i=($this.find('.' + dash + ' .digit-list__item').length-1); i>=0; i--) {
            var d = n%10;
            n = (n - d) / 10;
            $this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit-list__item:eq('+i+')', d, duration);
        }
    };

    $.fn.digitChangeTo = function (digit, n, duration) {
        if (!duration) {
            duration = 800;
        }
        if ($(digit + ' div.top').html() != n + '') {
            $(digit + ' div.top').css({'display': 'none'});
            $(digit + ' div.top').html((n ? n : '0')).slideDown(duration);

            $(digit + ' div.bottom').animate({'height': ''}, duration, function() {
                $(digit + ' div.bottom').html($(digit + ' div.top').html());
                $(digit + ' div.bottom').css({'display': 'block', 'height': ''});
                $(digit + ' div.top').hide().slideUp(10);
            });
        }
    };

})(jQuery);
