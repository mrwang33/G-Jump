cc.Class({
    extends: cc.Component,

    properties: {
        // 跳跃高度
        jumpHeight: 0,
        // 跳跃持续时间
        jumpTimes: 0,
        // 下落速度
        maxMoveSpeed: 0
    },

    // 跳跃
    setJumpUpAction: function () {
        var jumpUp = cc.moveBy(this.jumpTimes, cc.p(0, this.jumpHeight));
        return jumpUp;
    },

    // 下落
    setJumpDownAction: function () {
        var jumpDown = cc.moveBy(this.jumpTimes, cc.p(0, -this.jumpHeight));
        return jumpDown;
    },

    setJumpRunAction: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpUpAction();
        // 下落
        this.maxMoveSpeed = this.setJumpDownAction();
        // 包装动作
        var seq = cc.sequence(this.jumpAction, this.maxMoveSpeed);
        this.node.runAction(seq);
    },

    heroDownMove: function () {
        var heroDown = cc.moveBy(0.8, cc.p(0, -5));
        return heroDown;
    },

    start () {

    },

    onload: function () {
        this.setJumpRunAction();
    },

    update (dt) {
        this.node.runAction(this.heroDownMove());//精灵移动
    }
});
