<script>
	import { onMount } from 'svelte';
	import ParallelPlot from '../components/ParallelPlot.svelte';
	import Scatterplot from '../components/Scatterplot.svelte';

	let points;
	let data, dataWDeriv;
	let progress = 0;

	onMount(async () => {
		points = await (await fetch('/video_demo.json')).json();
	});

	$: if (points) {
		data = filterTime(progress, points)
			.map((point) => {
				return {
					x: point.tip1,
					y: point.tip2
				};
			});
        dataWDeriv = filterTime(progress, diff(points));
	}

    function diff(points) {
        return points.map((d, i, arr) => {
            let point = d;
            point['tip2prime'] = (i-1 > 0 ? d.tip2 - arr[i - 1].tip2 : 0) / 2 + 550
            point['tip1prime'] = (i-1 > 0 ? d.tip1 - arr[i - 1].tip1 : 0) / 2 + 550
            return point;
        })
    }

	function filterTime(time, data) {
		let startTime = 1646183695000;
		return data
			.filter(
				(point) =>
					point.timestamp < time * 1000 + startTime &&
					point.timestamp > time * 1000 + startTime - 500
			)
	}
</script>


<br />
<div id="plots">
    <ParallelPlot data={dataWDeriv} domain={["tip1prime","tip1","tip2","tip2prime"]} range={[0,1000]}
	/>
    <Scatterplot
    {...{
        points: data
    }}
    />
</div>
<video
    id="video"
    controls={true}
    bind:currentTime={progress}
    muted={true}
    src="/trim.5AF0A6C8-6431-41A0-A3A5-F5DF17C5E849.MOV"
/>

<style>
	:global(body) {
		margin: 0;
	}
	#video {
		width: 100%;
	}
    #plots {
        display: flex;
        width: 100%;
    }
</style>
