<script>
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	
	export let points;
	
	let svg;
	let width = 500;
	let height = 200;

	const padding = { top: 20, right: 40, bottom: 40, left: 100 };

	$: xScale = scaleLinear()
		.domain([0, 1250])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, 1250])
		.range([height - padding.bottom, padding.top]);


	onMount(resize);
	
	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}

	let xTicks = linspace(0,1100,23);
	let yTicks = linspace(0,1100,23);

	function linspace(start, stop, steps) {
		var arr = [];
		var step = (stop - start) / (steps - 1);
		for (var i = 0; i < steps; i++) {
			arr.push(start + step * i);
		}
		return arr;
	}

	// import GMM from 'gaussian-mixture-model/index.js';
	// 	var clust_num = 3;
	
	// 	var data = [
		// 		[11,42],[19,45],[15,36],[25,38],[24,33],
		// 		[-24,3],[-31,-4],[-34,-14],[-25,-5],[-16,7]
// 	];
// 	const dim_num = data[1].length;

// 	//weights must sum to 1, one per cluster
// 	var weights_arr = new Array(clust_num).fill(1/clust_num);
	
// 	var means_arr = new Array(clust_num);

// 	for (var i = 0; i < clust_num; i++) {
// 		means[i] = data[Math.floor(Math.random() * data.length)]
// 	}

// 	//variance clacualtions using method from demo
// 	var dim_max_min = new Array(dim_num);
// 	for (var i = 0; i < dim_num; i++) {
//   		ardim_max_minr[i] = new Array(2);
// 	}

// 	//find max and min for each dimetion
// 	for (var i = 0; i < data.length; i++) {
// 		for (var j = 0; i < dim_num; i++) {
// 			if(data[i][j] > dim_max_min[J][0]){
// 				dim_max_min[J][0] = data[i][j];
// 			}
// 			if(data[i][j] < dim_max_min[J][1]){
// 				dim_max_min[J][1] = data[i][j];
// 			}
// 		}
// 	}

// 	var dx = dim_max_min[0][0] - dim_max_min[0][1];
// 	var dy = dim_max_min[1][0] - dim_max_min[1][1];

// 	var covariance_arr = [
// 			[[dx*dx*.01,0],[0,dy*dy*.01]],
// 			[[dx*dx*.01,0],[0,dy*dy*.01]]
// 		];

	
// 	var origional_covariance_arr = [
// 			[[400,0],[0,400]],
// 			[[400,0],[0,400]]
// 		];


// 	var gmm = new GMM({
// 		weights: weights_arr,
// 		means: means_arr,
// 		covariances: covariance_arr
// });

// data.forEach(p => gmm.addPoint(p));
// gmm.runEM(5);

// //generate probabilites of categories
// var probNorm = gmm.predictNormalize([-5, 25]);  // [0.8161537535012295, 0.18384624649877046]

</script>

<svelte:window on:resize='{resize}'/>

<svg bind:this={svg}>
	<!-- y axis -->
	<g class='axis y-axis'>
		{#each yTicks as tick}
			<g class='tick tick-{tick}' transform='translate(0, {yScale(tick)})'>
				<line x1='{padding.left}' x2='{xScale(1200)}'/>
				<text x='{padding.left - 8}' y='+4'>{tick}</text>
			</g>
			<text y='{height/2}' x='{padding.left-12}'  transform='rotate(40deg)' > yAxis </text>
		{/each}
	</g>

	<!-- x axis -->
	<g class='axis x-axis'>
		{#each xTicks as tick}
			<g class='tick' transform='translate({xScale(tick)},0)'>
				<line y1='{yScale(0)}' y2='{yScale(1150)}'/>
				<text y='{height - padding.bottom + 16}'>{tick}</text>
			</g>
		{/each}
		<text y='{height - padding.bottom + 25}' x='{width/2}'> xAxis </text>
	</g>

	<!-- data -->
	{#if points}
	{#each points as point}
		<circle cx='{xScale(point.x)}' cy='{yScale(point.y)}' r='5'/>
	{/each}
	{/if}
</svg>

<style>
	svg {
		width: 500px;
		height: 250px;
		float: left;
	}

	circle {
		fill: orange;
		fill-opacity: 0.6;
		stroke: rgba(0,0,0,0.5);
	}

	.tick line {
		stroke: #ddd;
		stroke-dasharray: 2;
	}

	text {
		font-size: 12px;
		fill: #999;
	}

	.x-axis text {
		text-anchor: middle;
	}

	.y-axis text {
		text-anchor: end;
	}
</style>