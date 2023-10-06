const phone = /^1[3456789]\d{9}$/;
const emial = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/**
 * 验证手机号
 *
 * @export
 * @param {*} rules
 * @param {*} value
 * @param {*} callback
 */
export function validatorPhone(rules, value, callback) {
  if (phone.test(value)) {
    callback();
  } else {
    callback(new Error("请输入11数字的手机号"));
  }
}

/**
 * 验证邮箱
 *
 * @export
 * @param {*} rules
 * @param {*} value
 * @param {*} callback
 */
 export function validatorEmail(rules, value, callback) {
  if (emial.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确邮箱格式"));
  }
}
