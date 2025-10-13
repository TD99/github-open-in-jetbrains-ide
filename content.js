// noinspection JSIgnoredPromiseFromCall

let buttonCounter = 0;

const SUPPORTED_IDE_LIST = [
  {
    id: 'studio',
    name: 'Android Studio',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.2693 10.3368c-.3321 0-.6026.2705-.6026.6031v9.8324h-1.7379l-3.3355-6.9396c.476-.5387.6797-1.286.5243-2.0009a2.2862 2.2862 0 0 0-1.2893-1.6248v-.8124c.0121-.2871-.1426-.5787-.4043-.7407-.1391-.0825-.2884-.1234-.4402-.1234a.8478.8478 0 0 0-.4318.1182c-.2701.1671-.4248.4587-.4123.7662l-.0003.721c-1.0149.3668-1.6619 1.4153-1.4867 2.5197a2.282 2.282 0 0 0 .5916 1.2103l-3.2096 6.9064H4.0928c-1.0949-.007-1.9797-.8948-1.9832-1.9896V5.016c-.0055 1.1024.8836 2.0006 1.9859 2.0062a2.024 2.024 0 0 0 .1326-.0037h14.7453s2.5343-.2189 2.8619 1.5392c-.2491.0287-.4449.2321-.4449.4889 0 .7115-.5791 1.2901-1.3028 1.2901h-.8183zM17.222 22.5366c.2347.4837.0329 1.066-.4507 1.3007-.1296.0629-.2666.0895-.4018.0927a.9738.9738 0 0 1-.3194-.0455c-.024-.0078-.046-.0209-.0694-.0305a.9701.9701 0 0 1-.2277-.1321c-.0247-.0192-.0495-.038-.0724-.0598-.0825-.0783-.1574-.1672-.21-.2757l-1.2554-2.6143-1.5585-3.2452a.7725.7725 0 0 0-.6995-.4443h-.0024a.792.792 0 0 0-.7083.4443l-1.5109 3.2452-1.2321 2.6464a.9722.9722 0 0 1-.7985.5795c-.0626.0053-.1238-.0024-.185-.0087-.0344-.0036-.069-.0053-.1025-.0124-.0489-.0103-.0954-.0278-.142-.0452-.0301-.0113-.0613-.0197-.0901-.0339-.0496-.0244-.0948-.0565-.1397-.0889-.0217-.0156-.0457-.0275-.0662-.045a.9862.9862 0 0 1-.1695-.1844.9788.9788 0 0 1-.0708-.9852l.8469-1.8223 3.2676-7.0314a1.7964 1.7964 0 0 1-.7072-1.1637c-.1555-.9799.5129-1.9003 1.4928-2.0559V9.3946a.3542.3542 0 0 1 .1674-.3155.3468.3468 0 0 1 .3541 0 .354.354 0 0 1 .1674.3155v1.159l.0129.0064a1.8028 1.8028 0 0 1 1.2878 1.378 1.7835 1.7835 0 0 1-.6439 1.7836l3.3889 7.0507.8481 1.7643zM12.9841 12.306c.0042-.6081-.4854-1.1044-1.0935-1.1085a1.1204 1.1204 0 0 0-.7856.3219 1.101 1.101 0 0 0-.323.7716c-.0042.6081.4854 1.1044 1.0935 1.1085h.0077c.6046 0 1.0967-.488 1.1009-1.0935zm-1.027 5.2768c-.1119.0005-.2121.0632-.2571.1553l-1.4127 3.0342h3.3733l-1.4564-3.0328a.274.274 0 0 0-.2471-.1567zm8.1432-6.7459l-.0129-.0001h-.8177a.103.103 0 0 0-.103.103v12.9103a.103.103 0 0 0 .0966.103h.8435c.9861-.0035 1.7836-.804 1.7836-1.79V9.0468c0 .9887-.8014 1.7901-1.7901 1.7901zM2.6098 5.0161v.019c.0039.816.6719 1.483 1.4874 1.4869a12.061 12.061 0 0 1 .1309-.0034h1.1286c.1972-1.315.7607-2.525 1.638-3.4859H4.0993c-.9266.0031-1.6971.6401-1.9191 1.4975.2417.0355.4296.235.4296.4859zm6.3381-2.8977L7.9112.3284a.219.219 0 0 1 0-.2189A.2384.2384 0 0 1 8.098 0a.219.219 0 0 1 .1867.1094l1.0496 1.8158a6.4907 6.4907 0 0 1 5.3186 0L15.696.1094a.2189.2189 0 0 1 .3734.2189l-1.0302 1.79c1.6671.9125 2.7974 2.5439 3.0975 4.4018l-12.286-.0014c.3004-1.8572 1.4305-3.488 3.0972-4.4003zm5.3774 2.6202a.515.515 0 0 0 .5271.5028.515.515 0 0 0 .5151-.5151.5213.5213 0 0 0-.8885-.367.5151.5151 0 0 0-.1537.3793zm-5.7178-.0067a.5151.5151 0 0 0 .5207.5095.5086.5086 0 0 0 .367-.1481.5215.5215 0 1 0-.734-.7341.515.515 0 0 0-.1537.3727z"/></svg>',
  },
  {
    id: 'clion',
    name: 'CLion',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0,0v24h24V0H0ZM3.19,5.1c.4-.71.94-1.26,1.64-1.66.7-.4,1.47-.61,2.33-.61.73,0,1.39.13,2,.4s1.11.65,1.51,1.13c.4.48.67,1.04.81,1.66h-1.83c-.12-.32-.3-.61-.54-.85-.23-.25-.52-.44-.85-.57-.33-.13-.7-.2-1.09-.2-.53,0-1.01.13-1.43.4-.43.27-.76.63-1,1.1-.24.46-.36.98-.36,1.56s.12,1.1.36,1.57c.24.46.58.83,1,1.09s.91.4,1.43.4c.4,0,.76-.07,1.09-.2.34-.13.62-.32.85-.56.24-.25.42-.53.54-.86h1.83c-.14.62-.41,1.18-.81,1.67-.4.49-.91.86-1.51,1.13s-1.27.4-2,.4c-.86,0-1.63-.2-2.33-.6-.7-.41-1.24-.96-1.64-1.66-.4-.71-.6-1.5-.6-2.37s.2-1.66.6-2.36ZM12.59,21H2.99v-1.8h9.6v1.8ZM18.73,11.95h-5.99V2.98h1.74v7.39h4.25v1.58Z"/></svg>',
  },
  {
    id: 'dataspell',
    name: 'DataSpell',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7.87,10.1c-.4.24-.87.36-1.4.36h-1.66v-5.96h1.66c.53,0,1,.12,1.4.36.41.23.71.58.94,1.03.22.45.33.98.33,1.59s-.11,1.14-.33,1.59c-.22.46-.53.8-.94,1.03ZM24,0v24H0V0h24ZM3.05,11.99h3.43c.85,0,1.61-.2,2.29-.58.67-.38,1.21-.92,1.58-1.6.38-.69.58-1.46.58-2.32s-.19-1.63-.58-2.32c-.38-.68-.91-1.22-1.58-1.61-.68-.38-1.44-.58-2.29-.58h-3.43v9.01ZM12.59,19.2H2.99v1.8h9.6v-1.8ZM18.49,9.35c0-.43-.1-.83-.29-1.19-.19-.37-.46-.68-.81-.92-.35-.26-.74-.43-1.18-.52l-1.53-.34c-.28-.06-.5-.18-.66-.34s-.24-.37-.24-.62c0-.22.06-.41.17-.58.11-.17.28-.29.48-.38.21-.1.46-.14.73-.14s.52.05.73.15c.21.1.38.23.49.41.12.17.17.37.17.58h1.76c0-.51-.14-.97-.41-1.37-.26-.39-.64-.7-1.12-.93-.48-.22-1.04-.33-1.64-.33s-1.15.11-1.62.35c-.47.22-.85.55-1.11.95-.27.41-.4.87-.4,1.39,0,.43.09.8.26,1.15.18.34.43.62.74.85.32.23.7.39,1.12.49l1.59.35c.31.07.54.2.71.39.17.19.26.43.26.72,0,.22-.07.43-.19.61-.13.18-.31.32-.53.43-.23.1-.48.15-.8.15s-.6-.05-.85-.17c-.24-.11-.43-.26-.57-.47-.14-.19-.2-.43-.2-.68h-1.76c0,.55.16,1.04.44,1.46.29.43.68.76,1.18.99.5.24,1.09.35,1.73.35s1.24-.12,1.74-.36c.5-.23.9-.57,1.18-.99.28-.43.43-.9.43-1.43Z"/></svg>',
  },
  {
    id: 'goland',
    name: 'GoLand',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.33,6.08c-.24-.48-.58-.85-1.01-1.12-.43-.27-.91-.41-1.44-.41s-1.02.14-1.45.41c-.43.27-.77.64-1.01,1.12-.24.47-.36,1.01-.36,1.61s.12,1.13.36,1.61c.25.47.58.85,1.01,1.12.43.27.91.4,1.45.4s1.01-.13,1.44-.4c.43-.28.77-.65,1.01-1.12.24-.48.36-1.02.36-1.61s-.12-1.13-.36-1.61ZM19.33,6.08c-.24-.48-.58-.85-1.01-1.12-.43-.27-.91-.41-1.44-.41s-1.02.14-1.45.41c-.43.27-.77.64-1.01,1.12-.24.47-.36,1.01-.36,1.61s.12,1.13.36,1.61c.25.47.58.85,1.01,1.12.43.27.91.4,1.45.4s1.01-.13,1.44-.4c.43-.28.77-.65,1.01-1.12.24-.48.36-1.02.36-1.61s-.12-1.13-.36-1.61ZM0,0v24h24V0H0ZM3,5.3c.4-.71.95-1.28,1.66-1.68.71-.41,1.49-.62,2.36-.62.7,0,1.35.13,1.94.38.59.25,1.1.6,1.5,1.06.41.45.7.97.86,1.57h-1.9c-.14-.28-.32-.53-.56-.74-.23-.21-.51-.37-.83-.49-.31-.11-.65-.17-1.01-.17-.54,0-1.02.13-1.45.4-.43.26-.77.64-1.02,1.1-.24.47-.36,1-.36,1.58s.12,1.12.36,1.59c.25.46.59.83,1.02,1.1.43.27.91.4,1.45.4.5,0,.94-.09,1.34-.28.41-.19.73-.44.97-.77.2-.28.32-.58.37-.92h-2.11v-1.39h3.84v.71c0,.8-.19,1.52-.58,2.17-.38.65-.91,1.15-1.59,1.52-.67.37-1.42.56-2.25.56s-1.66-.2-2.36-.61c-.7-.41-1.25-.97-1.66-1.68-.4-.72-.61-1.52-.61-2.4s.2-1.68.61-2.39ZM12.59,21H2.99v-1.8h9.6v1.8ZM20.9,10.09c-.4.71-.95,1.27-1.66,1.68s-1.49.61-2.36.61-1.66-.2-2.37-.61c-.7-.41-1.26-.97-1.66-1.68-.4-.72-.61-1.52-.61-2.4s.2-1.68.61-2.39c.4-.71.96-1.28,1.66-1.68.71-.41,1.5-.62,2.37-.62s1.66.2,2.36.62c.71.4,1.26.97,1.66,1.68.4.71.61,1.51.61,2.39s-.2,1.68-.61,2.4ZM18.32,4.96c-.43-.27-.91-.41-1.44-.41s-1.02.14-1.45.41c-.43.27-.77.64-1.01,1.12-.24.47-.36,1.01-.36,1.61s.12,1.13.36,1.61c.25.47.58.85,1.01,1.12.43.27.91.4,1.45.4s1.01-.13,1.44-.4c.43-.28.77-.65,1.01-1.12.24-.48.36-1.02.36-1.61s-.12-1.13-.36-1.61c-.24-.48-.58-.85-1.01-1.12Z"/></svg>',
  },
  {
    id: 'idea',
    name: 'IntelliJ IDEA',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0,0v24h24V0H0ZM3,10.43h1.79v-5.87h-1.79v-1.57h5.3v1.57h-1.79v5.87h1.79v1.57H3v-1.57ZM12.6,21H3v-1.8h9.6v1.8ZM13.59,9.16c0,.54-.13,1.03-.38,1.46-.25.43-.59.77-1.03,1.01-.44.25-.93.37-1.47.37h-1.51v-1.62h1.29c.26,0,.5-.05.7-.17.2-.11.36-.27.47-.47.11-.2.17-.43.17-.7V3h1.76v6.16Z"/></svg>',
  },
  {
    id: 'phpstorm',
    name: 'PhpStorm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.66,7.25h-1.95v-2.62h1.95c.29,0,.54.05.76.16s.38.26.5.46c.11.19.17.43.17.69s-.06.5-.17.7c-.12.2-.29.35-.5.46-.22.1-.46.16-.76.16ZM24,0v24H0V0h24ZM3,12h1.72v-3.32h2.01c.63,0,1.18-.11,1.66-.34.47-.23.84-.55,1.1-.97.26-.41.39-.91.39-1.45s-.13-1.02-.38-1.43c-.25-.41-.61-.73-1.08-.95-.47-.23-1.01-.34-1.63-.34h-3.77v8.8ZM12.59,19.2H2.99v1.8h9.6v-1.8ZM17.21,9.43c0-.43-.09-.82-.28-1.18-.19-.37-.44-.67-.79-.91-.34-.25-.72-.41-1.16-.49l-1.75-.33c-.28-.05-.49-.16-.65-.32-.16-.17-.23-.37-.23-.62,0-.21.07-.39.19-.55.13-.16.3-.29.53-.38.23-.09.47-.14.76-.14s.54.05.76.14c.23.09.41.22.53.39.13.17.2.36.2.58h1.72c0-.5-.14-.94-.43-1.33-.28-.39-.66-.69-1.15-.91-.49-.22-1.04-.32-1.65-.32s-1.15.11-1.64.33c-.48.22-.86.53-1.14.93-.27.4-.41.86-.41,1.37,0,.41.08.79.25,1.13.17.34.41.62.72.85.31.22.68.37,1.1.45l1.81.35c.29.06.53.19.7.38.17.19.26.42.26.7,0,.23-.07.43-.21.61-.14.17-.33.31-.58.41-.25.1-.52.14-.83.14-.33,0-.62-.05-.88-.16s-.46-.26-.61-.46c-.14-.19-.22-.42-.22-.67h-1.72c0,.54.16,1.01.45,1.43.29.41.7.74,1.21.97.52.23,1.1.34,1.75.34s1.23-.11,1.75-.34c.52-.23.92-.55,1.21-.97.29-.41.43-.88.43-1.41Z"/></svg>',
  },
  {
    id: 'pycharm',
    name: 'PyCharm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8,7.12h-1.99v-2.68h1.99c.3,0,.55.05.77.17.22.11.4.26.52.46.12.2.18.44.18.71s-.06.51-.18.71c-.12.2-.29.36-.52.47-.22.11-.47.16-.77.16ZM24,0v24H0V0h24ZM3.06,11.98h1.75v-3.4h2.06c.64,0,1.21-.11,1.69-.35.49-.23.86-.56,1.13-.99.26-.42.4-.92.4-1.48s-.13-1.04-.39-1.46c-.26-.43-.63-.75-1.11-.98-.48-.23-1.03-.35-1.66-.35h-3.86v9ZM12.59,19.2H2.99v1.8h9.6v-1.8ZM12.37,7.48c0-.58.12-1.1.36-1.57.25-.47.58-.83,1.01-1.1.43-.26.91-.4,1.45-.4.39,0,.76.07,1.09.2.33.13.62.32.85.57.24.25.42.53.54.86h1.84c-.14-.63-.41-1.19-.82-1.67-.4-.49-.91-.86-1.52-1.13-.61-.27-1.28-.41-2.01-.41-.86,0-1.64.2-2.34.61-.7.4-1.25.96-1.64,1.67-.4.7-.6,1.49-.6,2.37s.2,1.67.6,2.38c.4.71.95,1.26,1.64,1.67.7.4,1.48.61,2.34.61.73,0,1.4-.14,2.01-.41.61-.27,1.12-.64,1.52-1.13.41-.49.68-1.05.82-1.68h-1.84c-.12.32-.3.61-.54.86-.23.24-.52.43-.85.56-.34.13-.7.2-1.09.2-.53,0-1.01-.13-1.45-.4-.43-.26-.76-.63-1.01-1.09-.24-.47-.36-1-.36-1.58Z"/></svg>',
  },
  {
    id: 'rider',
    name: 'Rider',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8,7.14h-1.99v-2.68h1.99c.29,0,.55.05.77.16s.39.26.51.46c.12.2.18.44.18.71s-.06.5-.18.71c-.12.2-.29.35-.51.47s-.48.16-.77.16ZM17.64,7.5c0,.61-.11,1.14-.32,1.59-.22.45-.53.8-.94,1.03-.4.24-.87.36-1.4.36h-1.66v-5.96h1.66c.53,0,1,.12,1.4.36.4.23.71.58.94,1.03.22.45.32.98.32,1.59ZM17.64,7.5c0,.61-.11,1.14-.32,1.59-.22.45-.53.8-.94,1.03-.4.24-.87.36-1.4.36h-1.66v-5.96h1.66c.53,0,1,.12,1.4.36.4.23.71.58.94,1.03.22.45.32.98.32,1.59ZM24,0v24H0V0h24ZM3.05,12h1.76v-3.4h1.51l1.94,3.4h2.02l-2.14-3.61s.08-.02.13-.04c.1-.03.2-.06.29-.1.49-.24.86-.57,1.12-1,.26-.43.4-.92.4-1.48s-.13-1.03-.4-1.45c-.26-.42-.62-.75-1.1-.98-.48-.23-1.04-.35-1.67-.35h-3.86v9ZM12.59,19.2H2.99v1.8h9.6v-1.8ZM19.44,7.5c0-.86-.19-1.63-.57-2.32-.38-.68-.91-1.22-1.59-1.61-.67-.38-1.43-.58-2.29-.58h-3.43v9h3.43c.85,0,1.61-.19,2.29-.58.68-.39,1.21-.92,1.59-1.6.38-.69.57-1.46.57-2.32ZM17.32,5.91c.22.45.32.98.32,1.59s-.11,1.14-.32,1.59c-.22.45-.53.8-.94,1.03-.4.24-.87.36-1.4.36h-1.66v-5.96h1.66c.53,0,1,.12,1.4.36.4.23.71.58.94,1.03Z"/></svg>',
  },
  {
    id: 'rubymine',
    name: 'RubyMine',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.09,5.09c-.12-.2-.29-.35-.51-.46-.22-.11-.48-.17-.77-.17h-1.99v2.68h1.99c.29,0,.55-.05.77-.16s.39-.26.51-.47c.12-.2.18-.44.18-.71s-.06-.51-.18-.71ZM8.09,5.09c-.12-.2-.29-.35-.51-.46-.22-.11-.48-.17-.77-.17h-1.99v2.68h1.99c.29,0,.55-.05.77-.16s.39-.26.51-.47c.12-.2.18-.44.18-.71s-.06-.51-.18-.71ZM0,0v24h24V0H0ZM3.05,3h3.86c.63,0,1.19.11,1.67.35.48.23.85.56,1.1.98.26.42.4.9.4,1.46s-.14,1.05-.4,1.48c-.26.43-.64.76-1.12.99-.1.05-.2.08-.3.11-.04.01-.09.02-.13.04l2.15,3.61h-2.02l-1.94-3.4h-1.51v3.4h-1.76V3ZM12.59,21H2.99v-1.8h9.6v1.8ZM20.42,12h-1.73v-6.42l.02-.47-2.09,6.89h-1.27l-2.07-6.85.02.43v6.42h-1.73V3h2.44l1.85,5.91.16.77.14-.77,1.79-5.91h2.48v9ZM7.58,6.98c.22-.11.39-.26.51-.47.12-.2.18-.44.18-.71s-.06-.51-.18-.71c-.12-.2-.29-.35-.51-.46-.22-.11-.48-.17-.77-.17h-1.99v2.68h1.99c.29,0,.55-.05.77-.16Z"/></svg>',
  },
  {
    id: 'rustrover',
    name: 'RustRover',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8,7.14h-1.99v-2.68h1.99c.3,0,.56.06.78.16.22.12.39.27.51.47.12.2.18.43.18.71s-.06.5-.18.71c-.12.2-.29.36-.51.47-.22.11-.48.16-.78.16ZM24,0v24H0V0h24ZM3.06,12h1.75v-3.4h1.52l1.93,3.4h2.02l-2.15-3.61s.09-.02.14-.03c.1-.03.2-.06.29-.1.49-.25.86-.58,1.13-1,.26-.43.39-.92.39-1.48s-.13-1.04-.39-1.45c-.26-.42-.62-.75-1.1-.98-.48-.24-1.04-.35-1.67-.35h-3.86v9ZM12.6,19.2H3v1.8h9.6v-1.8ZM18.94,12l-2.14-3.61s.09-.02.13-.03c.1-.03.2-.06.29-.1.49-.25.87-.58,1.13-1,.26-.43.4-.92.4-1.48s-.13-1.04-.39-1.45c-.26-.42-.63-.75-1.11-.98-.48-.24-1.04-.35-1.67-.35h-3.86v9h1.76v-3.4h1.51l1.94,3.4h2.01ZM16.75,5.09c-.12-.2-.29-.35-.51-.47-.22-.1-.48-.16-.77-.16h-1.99v2.68h1.99c.29,0,.55-.05.77-.16.22-.11.39-.27.51-.47.12-.21.18-.44.18-.71s-.06-.51-.18-.71Z"/></svg>',
  },
  {
    id: 'webstorm',
    name: 'WebStorm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0,0v24h24V0H0ZM12.59,21H2.99v-1.8h9.6v1.8ZM11.49,12.01h-2l-1.52-6.54-1.54,6.54h-1.99L2.27,3.01h1.82l1.45,6.57,1.55-6.57h1.78l1.62,6.57,1.41-6.57h1.78l-2.19,9ZM20.38,10.81c-.28.42-.67.75-1.18.99-.5.24-1.09.36-1.73.36s-1.23-.12-1.74-.35c-.5-.23-.89-.56-1.18-.99-.28-.43-.43-.91-.44-1.46h1.76c0,.26.07.49.2.68.14.2.33.35.57.46.25.11.53.17.85.17s.57-.05.8-.14c.23-.11.41-.25.53-.43s.19-.38.19-.62c0-.29-.09-.52-.26-.71-.17-.19-.41-.32-.71-.39l-1.59-.35c-.43-.1-.8-.26-1.12-.49-.32-.23-.56-.52-.74-.85-.17-.34-.26-.72-.26-1.15,0-.52.13-.98.4-1.38.26-.41.64-.73,1.11-.96.48-.23,1.02-.35,1.62-.35s1.16.11,1.64.34c.48.22.85.53,1.12.93.27.4.41.85.41,1.36h-1.76c0-.22-.05-.41-.17-.58-.11-.18-.28-.31-.49-.41-.21-.1-.46-.14-.73-.14s-.52.05-.73.14c-.21.09-.37.22-.49.39-.11.16-.17.35-.17.57,0,.25.08.46.24.62.16.16.38.28.66.35l1.54.33c.44.09.83.26,1.18.52.35.25.62.56.81.93.19.36.29.76.29,1.19,0,.53-.14,1.01-.43,1.43Z"/></svg>',
  },
];
const FALLBACK_IDE_ID = 'idea';

async function getDefaultIDE() {
  const isSupported = (id) => SUPPORTED_IDE_LIST.some((ide) => ide.id === id);
  const getSafeIde = (ide) => (isSupported(ide) ? ide : FALLBACK_IDE_ID);

  try {
    if (chrome?.storage?.sync) {
      const result = await new Promise((resolve) => {
        chrome.storage.sync.get({ defaultIde: FALLBACK_IDE_ID }, resolve);
      });
      return getSafeIde(result.defaultIde);
    }

    const ide = localStorage.getItem('defaultIde');
    return getSafeIde(ide);
  } catch (e) {
    console.warn('Storage not available, using fallback IDE.', e);

    try {
      const ide = localStorage.getItem('defaultIde');
      return getSafeIde(ide);
    } catch {
      return FALLBACK_IDE_ID;
    }
  }
}

function setDefaultIDE(ide) {
  try {
    if (chrome?.storage?.sync) {
      chrome.storage.sync.set({ defaultIde: ide });
    } else {
      localStorage.setItem('defaultIde', ide);
    }
  } catch (e) {
    console.warn('Storage not available, fallback', e);
    localStorage.setItem('defaultIde', ide);
  }
}

function buildUri(ideId, repoUrl) {
  return `jetbrains://${ideId}/checkout/git?checkout.repo=${encodeURIComponent(repoUrl)}`;
}

function closeOldModal() {
  const oldModal = document.querySelector('#__primerPortalRoot__').firstChild;

  if (oldModal) {
    oldModal.remove();
  }
}

function createActionButton(label, onClick, extraClass = '', icon = null) {
  const id = `idea-${buttonCounter++}`;
  const labelId = `${id}--label`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = id;
  btn.tabIndex = 0;
  btn.setAttribute('aria-labelledby', labelId);
  btn.setAttribute('data-size', 'medium');
  btn.className = `open-with-jetbrains-ide-btn ${extraClass}`;

  const spacer = document.createElement('span');
  spacer.className = 'open-with-jetbrains-ide-spacer';
  btn.appendChild(spacer);

  if (icon && isSafeSvg(icon)) {
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'open-with-jetbrains-ide-icon';
    const svgDocument = new DOMParser().parseFromString(icon, 'image/svg+xml');
    const svgElement = svgDocument.documentElement;
    iconWrapper.appendChild(svgElement);
    btn.appendChild(iconWrapper);
  }

  const labelWrapper = document.createElement('span');
  labelWrapper.className = 'open-with-jetbrains-ide-subcontent';
  labelWrapper.setAttribute(
    'data-component',
    'ActionList.Item--DividerContainer'
  );

  const labelSpan = document.createElement('span');
  labelSpan.className = 'open-with-jetbrains-ide-label';
  labelSpan.id = labelId;
  labelSpan.textContent = label;

  labelWrapper.appendChild(labelSpan);
  btn.appendChild(labelWrapper);

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
}

function isSafeSvg(svgString) {
  return !/<\s*(script|iframe|object|embed|link|style|on\w+)/i.test(svgString);
}

async function addIdeButtons(container, repoUrl) {
  if (!container || container.querySelector('.open-with-jetbrains-ide-item'))
    return;

  const defaultIde = await getDefaultIDE();
  const ideData = SUPPORTED_IDE_LIST.find((i) => i.id === defaultIde);

  // list item
  const li = document.createElement('li');
  li.className = 'open-with-jetbrains-ide-item';
  li.setAttribute('data-has-description', 'false');

  // wrapper for split button
  const wrapper = document.createElement('div');
  wrapper.className = 'open-with-jetbrains-ide-split';

  // main button (default IDE)
  const mainBtn = createActionButton(
    `Open with ${ideData.name}`,
    () => (window.location.href = buildUri(defaultIde, repoUrl))
  );
  wrapper.appendChild(mainBtn);

  // overflow button (chevron)
  const overflowBtn = createActionButton('▾', () => openIdeModal(repoUrl));
  overflowBtn.classList.add('open-with-jetbrains-ide-overflow');
  wrapper.appendChild(overflowBtn);

  li.appendChild(wrapper);

  // insert before Download ZIP
  const list = container.querySelector('div > ul');
  if (list && list.lastElementChild) {
    list.insertBefore(li, list.lastElementChild);
  }
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeIdeModal();
  }
}

function closeIdeModal() {
  const overlay = document.querySelector(
    '.open-with-jetbrains-ide-modal-overlay'
  );
  if (overlay) {
    overlay.classList.add('closing');
    overlay.addEventListener('animationend', () => overlay.remove());
  }

  document.removeEventListener('keydown', handleEscape);
}

function openIdeModal(repoUrl) {
  if (document.querySelector('.open-with-jetbrains-ide-modal')) return;

  closeOldModal();

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

  const overlay = document.createElement('div');
  overlay.className = 'open-with-jetbrains-ide-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'open-with-jetbrains-ide-modal';

  const title = document.createElement('h3');
  title.textContent = 'Select the IDE to open with';
  modal.appendChild(title);

  SUPPORTED_IDE_LIST.forEach((ide, index) => {
    const btn = createActionButton(
      `Open with ${ide.name}`,
      () => {
        setDefaultIDE(ide.id);
        closeIdeModal();
        window.location.href = buildUri(ide.id, repoUrl);
      },
      '',
      ide.icon
    );

    if (index === 0) {
      requestAnimationFrame(() => btn.focus());
    }

    modal.appendChild(btn);
  });

  const note = document.createElement('p');
  note.className = 'open-with-jetbrains-ide-note';
  note.textContent =
    'If this repository was already cloned in a JetBrains IDE, that IDE will be chosen automatically.';
  modal.appendChild(note);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeIdeModal();
  });

  document.addEventListener('keydown', handleEscape);
}

function handleNode(node) {
  if (!(node instanceof HTMLDivElement)) return;

  let container = node.classList?.contains(
    'react-overview-code-button-action-list'
  )
    ? node
    : (node.querySelector('.react-overview-code-button-action-list') ??
      node.closest('.react-overview-code-button-action-list'));
  if (!container) return;

  const linkInput = container.querySelector('input#clone-with-https');
  if (!linkInput) return;

  const repoLink = linkInput.value.trim();
  if (!repoLink) return;

  addIdeButtons(container, repoLink);
}

function observeCloneDropdown() {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach(handleNode);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function handleLoaded() {
  const container = document.querySelector(
    '.react-overview-code-button-action-list'
  );
  if (container) {
    handleNode(container);
  }
}

if (/^https:\/\/github\.com\/[^/]+\/[^/]+/.test(window.location.href)) {
  console.info('GitHub to JetBrains IDE Extension active.');
  addEventListener('load', () => handleLoaded());
  observeCloneDropdown();
}
