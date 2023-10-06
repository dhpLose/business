import { validatorPhone, validatorEmail } from "@/utils/validator";
const createRules = data => {
  data.forEach(item => {
    let rules_array = [];
    // 检测规则是一个数组类型
    if (item.required) {
      const rules = { required: true, message: item.message || createMessage(item) };
      rules_array.push(rules);
    }
    // 校验手机号
    if (item.value_type && item.value_type === "phone") {
      const rules = { validator: validatorPhone, trigger: "blur" };
      rules_array.push(rules);
    }
    // 校验邮箱
    if (item.value_type && item.value_type === "email") {
      const rules = { validator: validatorEmail, trigger: "blur" };
      rules_array.push(rules);
    }
    // 是否有额外的检验规则
    if (item.rules && Array.isArray(item.rules) && item.rules.length > 0) {
      rules_array = rules_array.concat(item.rules);
    }
    item.rules = rules_array;
  });
  return data;
};

const createMessage = data => {
  let type = data.type;
  let message = "";
  switch (type) {
    case "input":
      message = `请输入${data.label}`;
      break;
    case "select":
      message = `请选择${data.label}`;
      break;
    case "checkbox":
      message = `请选择${data.label}`;
      break;

    default:
      message = `请输入${data.label}`;
      break;
  }
  return message;
};
export default createRules;
