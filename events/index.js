module.exports = ({ server }) => {
  require('./closeServer').default(server); // register event listeners to close servers
}