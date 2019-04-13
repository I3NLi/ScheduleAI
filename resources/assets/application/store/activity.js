export default {
  state: {
    activities: [],
    activityDefault: {
      id: '',
      type: '', //0:todo 1:event
      // status: '',
      title: '',
      description: '',
      importance: '',
      tags: '',

      parent_id: '', //唯一
      childeren: [],

      start_at: '',
      until_at: '',
      estimated_time_cost: '',

      time_cost_for_work: '',
      time_cost_for_plan: '',

      created_at: '',
      updated_at: '',
      complete_at: '',
      deleted_at: '',

      missions: {},
      permission: {},
      setting: {},
      log: {}
    }
  },
  getters: {
    activityById: state => (id) => {
      return state.activities.find(activity => activity.id === id);
    },
    activities: (state) => (filter) => {
      return state.activities.filter(filter);
    },
    activitiesByFathererID: (state) => (id) => {
      return state.activities.filter(activity => activity.parent_id === id);
    }
  },
  actions: {
    activity(context, newActivity) {
      axios.post('/api/v1/activity', newActivity).then(function(response) {
        context.commit('activity', response.data);
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
  mutations: {
    activity(state, newActivity) {
      oldActivityIndex = state.activities.findIndex(activity => activity.id === newActivity.id);
      if (oldActivityIndex) {
        state.activity[oldActivityIndex] = newActivity;
      } else {
        state.activity.push(newActivity);
      }
    }
  }
}
