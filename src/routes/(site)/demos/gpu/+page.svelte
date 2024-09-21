<script lang="ts">
	let play = $state(false);
	let play_gpu = $state(false);
</script>

<div class="container">
	<button type="button" class:play class="box" onclick={() => (play = !play)}></button>
	<button type="button" class:play={play_gpu} class="box gpu" onclick={() => (play_gpu = !play_gpu)}
		>GPU</button
	>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.box {
		width: 100px;
		height: 100px;
		background-color: var(--green);
		position: relative;
		left: 0;
		&:not(&.gpu) {
			transition: left 5s ease;
			&.play {
				left: 100%;
			}
		}
	}

	.gpu {
		will-change: transform;
		background-color: var(--pink);
		color: var(--black);
		align-content: center;
		text-align: center;
		transition: translate 5s;
		&.play {
			translate: 100vb 0 0;
		}
	}
</style>
