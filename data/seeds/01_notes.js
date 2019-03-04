
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test Note 1', textBody: 'Commodo ad proident esse proident veniam pariatur adipisicing culpa do mollit dolore ullamco.'},
        {title: 'Test Note 2', textBody: 'Nisi tempor magna tempor ea ipsum incididunt fugiat pariatur.'},
        {title: 'Test Note 3', textBody: 'Amet laboris pariatur dolore ad aliquip.'},
      ]);
    });
};
