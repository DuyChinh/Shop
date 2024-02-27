import classes from "./Alert.module.css"

const Alert = () => {
  return (
    <div className={classes.alertContainer}>
      <div className={classes.alertWrapper}>
        <p className={classes.title}>Bạn chưa đăng nhập!</p>
      </div>
    </div>
  );
}

export default Alert