<script>
	import { afterUpdate, onMount } from 'svelte';
	import Scatterplot from '../components/Scatterplot.svelte';

	let points;
    let data;
	let progress;

	onMount(async () => {
        points = await (await fetch('/video_demo.json')).json();
    });

	$: if (points) {
		data = points.map((point) => {
			return {
				x: point.tip1,
				y: point.tip2
			};
		});
	}
</script>

<video
	id="video"
	controls={true}
	bind:currentTime={progress}
	muted={true}
	src="/trim.5AF0A6C8-6431-41A0-A3A5-F5DF17C5E849.MOV"
/>
{progress}
<br />
<Scatterplot
	{...{
		points: data
	}}
/>

<style>
	:global(body) {
		margin: 0;
	}
	#video {
		width: 100vw;
		margin-left: 0;
	}
</style>
