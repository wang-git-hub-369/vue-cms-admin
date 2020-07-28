<template>
	<div class="counter">
		<button type="button" class="decrease" @click='handleDecrease'>-</button>
		<span class="number">{{value}}</span>
		<button type="button" class="increase" @click='handleIncrease'>+</button>
	</div>
</template>
<script>
	export default {
		props: ['value', 'min', 'max', 'step'],
		methods: {
			//点击加号
			handleIncrease() {
				//最大值
				if (this.value >= this.max) {
					alert("最多选中十个")
					return;
				}
				this.$emit('up', this.step);
			},
			//点击减号
			handleDecrease() {
				//最小值
				if (this.value <= this.min) {
					return;
				}
				this.$emit('down',this.step);
			}
		},
	}
</script>

<style>
	.counter {
		display: flex;
		align-items: center;
		width: 200px;
	}

	.decrease,
	.increase {
		padding: 6px 20px;
		border: 1px solid #999999;
		border-radius: 3px;
		font-size: 18px;
	}

	.decrease {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.increase {
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.number {
		padding: 6px;
		min-width: 100px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
		text-align: center;
	}
</style>
