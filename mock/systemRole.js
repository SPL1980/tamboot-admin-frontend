import { delay } from 'roadhog-api-doc';
import { apiPath } from '@/defaultSettings';
import Constants from '@/utils/constants';

const proxy = {
  'GET /api/system/role/list': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success',
      data: [
        {"id":"1","creator":null,"createTime":null,"modifier":"1","modifyTime":"2019-06-02 17:03:25","version":"6","roleCode":"MANAGER","roleName":"管理员","roleDesc":"进行系统的日常运维"},
        {"id":"6533636090576769024","creator":"1","createTime":"2019-05-13 17:37:13","modifier":null,"modifyTime":null,"version":"0","roleCode":"USER","roleName":"用户","roleDesc":"普通用户"}
      ]
    })
  },

  'GET /api/system/role/page': (req, res) => {
    res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success',
        data: {
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 2,
          result: [
            {"id":"1","creator":null,"createTime":null,"modifier":"1","modifyTime":"2019-06-02 17:03:25","version":"6","roleCode":"MANAGER","roleName":"管理员","roleDesc":"进行系统的日常运维"},
            {"id":"6533636090576769024","creator":"1","createTime":"2019-05-13 17:37:13","modifier":null,"modifyTime":null,"version":"0","roleCode":"USER","roleName":"用户","roleDesc":"普通用户"}
          ]
        }
    })
  },

  'POST /api/system/role/create': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/role/update': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/role/delete/:id': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/role/assignMenus': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },
  
};

const filteredProxy = {};
for (let key in proxy) {
  const newKey = key.replace('/api', apiPath);
  filteredProxy[newKey] = proxy[key];
}

export default delay(filteredProxy, 1000);
