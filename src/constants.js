import axios from "axios";

export const USER_ID = Number(
  new URLSearchParams(document.location.search).get("vk_user_id")
);
export const APP_ID = Number(
  new URLSearchParams(document.location.search).get("vk_app_id")
);
export const NAME_PROJECT = "landing";

export const admins = [
  73606509, 571236380, 441322977, 199643446, 450664203, 391988320, 383856049,
  253771795, 250393557, 309328688, 459382447,
];

// https://vk.com/id571236380 - https://vk.com/app8036441
// https://vk.com/id441322977 - https://vk.com/app8037589
// https://vk.com/id199643446 - https://vk.com/app8038336
// https://vk.com/id450664203 - https://vk.com/app8038337
// https://vk.com/id391988320 - https://vk.com/app8038339
// https://vk.com/id383856049 - https://vk.com/app8038340
// https://vk.com/id253771795 - https://vk.com/app8038344
// https://vk.com/id250393557 - https://vk.com/app8038347
// https://vk.com/id309328688 - https://vk.com/app8038353
// https://vk.com/id459382447 - https://vk.com/app8038355
