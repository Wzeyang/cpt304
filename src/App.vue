<template>
  <div class="container">
    <h1 align="center">景点信息</h1>

    <div style="display: flex; height: 35px">
      <p style="font-size: 20px">城市名:</p>
      <input
        id="search"
        v-on:keyup.enter="get_weather"
        height="10"
        v-model="city"
      />
    </div>

    <calendar></calendar>

    <div class="weather">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <span class="icon"
              ><img
                class="img-fluid"
                :src="
                  weather.wea.includes('晴')
                    ? 'https://img.icons8.com/emoji/96/000000/sun-emoji.png'
                    : 'https://img.icons8.com/emoji/96/000000/cloud-emoji.png'
                "
            /></span>
            <div class="title">
              <p>{{ weather.city }}</p>
            </div>
            <div class="temp" v-if="render">
              {{ weather.tem }}<sup>&deg;</sup>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="header">天气</div>
                <div class="value">{{ weather.wea }}</div>
              </div>
              <div class="col-4">
                <div class="header">风力</div>
                <div class="value">{{ weather.win_speed }}</div>
                <div class="value">东南风</div>
              </div>
              <div class="col-4">
                <div class="header">最低温</div>
                <div class="value">{{ weather.tem2 }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <span class="icon"
              ><img
                class="img-fluid"
                :src="
                  weather.wea.includes('晴')
                    ? 'https://img.icons8.com/emoji/96/000000/sun-emoji.png'
                    : 'https://img.icons8.com/emoji/96/000000/cloud-emoji.png'
                "
            /></span>
            <div class="title">
              <p>明天@{{ city }}</p>
            </div>
            <div class="temp">{{ weather.hours[27].tem }}<sup>&deg;</sup></div>
            <div class="row">
              <div class="col-4">
                <div class="header">天气</div>
                <div class="value">{{ weather.hours[27].wea }}</div>
              </div>
              <div class="col-4">
                <div class="header">风力</div>
                <div class="value">{{ weather.hours[27].win_speed }}</div>
                <div class="value">{{ weather.hours[27].win }}</div>
              </div>
              <div class="col-4">
                <div class="header">空气质量</div>
                <div class="value">{{ weather.hours[27].aqi }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map" id="amap"></div>
      <div id="tip">
        <input
          type="text"
          id="poisearch"
          value="请输入关键字：(选定后搜索)"
          :v-model="address"
          onfocus='this.value=""'
        />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import AMapLoader from "@amap/amap-jsapi-loader";

window._AMapSecurityConfig = {
  securityJsCode: "eaf8091d47b27e527811a102dbaf9005",
};

export default {
  components: { Calendar, AMapLoader },
  name: "App",
  async mounted() {
    console.log("onload");
    var res = await fetch(
      `https://v0.yiketianqi.com/api?unescape=1&version=v63&appid=88187621&appsecret=RUNvY7IY`,
      {
        method: "GET",
      }
    );
    var data = await res.json();
    console.log(data);
    this.city = data.city;
    this.weather = data;
    this.render = true;
    this.initMap();
  },
  data() {
    return {
      address: "",
      render: false,
      map: null,
      mouseTool: null,
      overlays: [],
      auto: null,
      placeSearch: null,
      pageTitle: "title",
      city: "",
      weather: {
        wea: "晴",
        win_speed: " ",
        win: "",
        temp: 0,
        temp2: 0,
        hours: [
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
          { tem: 0, wea: "", win: 0, win_speed: 0, aqi: "" },
        ],
      },
    };
  },
  methods: {
    initMap() {
      let that = this;
      AMapLoader.load({
        key: "639b1ec4cc208f84d9e41073394dfde7",
        // plugins: ["AMap.ToolBar", "AMap.Scale", "AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // plugins: ["AMap.AutoComplete", "AMap.PlaceSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          // 初始化地图
          that.map = new AMap.Map("amap", {
            viewMode: "2D", //  是否为3D地图模式
            zoom: 17, // 初始化地图级别
            center: [113.65553, 34.748764], //中心点坐标  郑州
            resizeEnable: true,
          });

          // that.map.addControl(new AMap.Scale());
          // that.map.addControl(new AMap.ToolBar());

          that.map.plugin(["AMap.PlaceSearch", "AMap.Autocomplete"], () => {
            let autoOptions = { input: "poisearch" };
            that.auto = new AMap.Autocomplete(autoOptions);
            that.placeSearch = new AMap.PlaceSearch({
              map: that.map,
            });
          });
          that.auto.on("select", that.Handleselect); //注册监听，当选中某条记录时会触发
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Handleselect(e) {
      console.log("a");
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询查询
    },
    async get_weather() {
      this.address = this.city;
      console.log(this.city);
      var res = await fetch(
        `https://v0.yiketianqi.com/api?unescape=1&version=v63&appid=88187621&appsecret=RUNvY7IY&city=${this.city}`,
        {
          method: "GET",
        }
      );
      var data = await res.json();
      console.log(data);
      if (data.errcode) {
        alert("城市名错误");
      } else {
        this.weather = data;
      }
    },
  },
};
</script>

<style>
.good-review-score {
  background-color: #1d2270;
  color: white;
  text-align: center;
  padding: 10px;
  margin-right: 5px;
  /*width: 50px;
    height: 30px; 
    line-height: 30px*/
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(238, 237, 237, 0.33);
  color: rgb(105, 104, 104);
  font-family: sans-serif;
}

.container {
  height: 80vh;
  position: absolute;
  left: 50px;
  top: 50px;
  width: 767px;
  background-color: #ffffff;
  border-color: #ffffff;
  align-items: center;
  border-radius: 1rem;
  vertical-align: middle;
}

@media (max-width: 767px) {
  .container {
    height: fit-content;
  }
}

.map {
  position: absolute;
  left: 800px;
  top: 0px;
  width: 767px;
  height: 700px;
}

.weather {
  min-width: 763px;
  width: 100%;
}

.card {
  padding: 1rem;
  margin: 1.5rem 4vw;
  border-radius: 1rem;
  background-color: rgba(238, 237, 237, 0.22);
  border-color: rgba(238, 237, 237, 0.22);
  box-shadow: 5px 6px 6px 2px #e9ecef;
  text-align: center;
}

.card {
  margin: 1.5rem;
}

.title {
  justify-content: center;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.title p {
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
}

.temp {
  font-size: 2.6rem;
  margin-bottom: 1rem;
}

.header {
  color: #dddddd;
}

.col-4 {
  padding: 0 0.2rem;
}

.icon {
  align-self: flex-end;
  margin-right: -2.5rem;
  margin-top: -2rem;
  z-index: 999;
}

.icon img {
  width: 5rem;
}

#tip {
  background-color: #ddf;
  color: #333;
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  position: absolute;
  top: 20px;
  right: -800px;
  border-radius: 5px;
  overflow: hidden;
  line-height: 20px;
}

#tip input[type="text"] {
  height: 25px;
  border: 0;
  padding-left: 5px;
  width: 280px;
  border-radius: 3px;
  outline: none;
}
</style>
