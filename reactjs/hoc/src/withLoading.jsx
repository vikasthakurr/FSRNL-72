const withLoading = (Component) => {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <h2>please wait we are loading....</h2>;
    }
    return <Component {...props} />;
  };
};

export default withLoading;
