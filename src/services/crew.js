import { Replicache } from '../../libs/replicache.js';
const rep = new Replicache({
  pushURL: '/api/replicache-push',
  pullURL: '/api/replicache-pull',
  mutators: {
    async createMessage(transaction, { id, from, content, order }) {
      await transaction.put(`character/${id}`, {
        from,
        content,
        order,
      });
    },
  },
});
