import React, { FC } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PendingBlock from '../common/PendingBlock';
import useUser from '../../hooks/useUser';

import styles from './Payment.module.sass';

export const Payment: FC = () => {
  const user = useUser();
  const renderHeader = () => {
    return (
      <div>
        {user.status !== 'ACTIVE' ? <PendingBlock className={styles.pendingBlock} /> : null}
        <Typography className={styles.title}>Payment options</Typography>
        <Typography className={styles.subtitle}>
          You need to add payment information, in order to be able to receive payment for delivery services
        </Typography>
      </div>
    );
  };

  // const renderLinkedCard = () => {
  //   return (
  //     <div className={classNames(styles.cardBlock, styles.linkedCardBlock)}>
  //       <div className={classNames(styles.linkedCard, styles.card)}>
  //         <Typography className={styles.cardTitle}>Linked Bank Account</Typography>
  //         <Typography className={styles.cardNumber}>4929 **** **** 4928</Typography>
  //         <Typography className={styles.expireDate}>Expires End: 12/24</Typography>
  //       </div>
  //       <div className={styles.manageCardMobile}>{renderManageCardButtons()}</div>
  //       <div className={classNames(styles.balance, styles.card)}>
  //         <Typography className={styles.balanceTitle}>Balance</Typography>
  //         <Typography className={styles.money}>
  //           $2942
  //           <span className={styles.pennies}>.70</span>
  //         </Typography>
  //       </div>
  //     </div>
  //   );
  // };
  //
  // const renderButtons = () => {
  //   return (
  //     <div className={styles.buttonsWrapper}>
  //       <Button className={classNames(styles.button, styles.withdraw)} variant="outlined" color="secondary">
  //         <Typography className={styles.buttonText}>Withdraw Funds</Typography>
  //       </Button>
  //       <div className={styles.manageCardDesktop}>{renderManageCardButtons()}</div>
  //     </div>
  //   );
  // };

  // const renderManageCardButtons = () => {
  //   return (
  //     <div>
  //       <Button color="secondary" className={classNames(styles.button, styles.leftBtn)}>
  //         <Typography className={styles.buttonText}>Change</Typography>
  //       </Button>
  //       <Button color="primary" className={styles.button}>
  //         <Typography className={styles.buttonText}>Delete</Typography>
  //       </Button>
  //     </div>
  //   );
  // };

  // const renderLinkedCardPage = () => {
  //   return (
  //     <>
  //       {renderHeader()}
  //       {renderLinkedCard()}
  //       {renderButtons()}
  //     </>
  //   );
  // };

  const renderNotLinkedCardPage = () => {
    return (
      <>
        {renderHeader()}
        {renderNotLinkedCard()}
        <div className={styles.buttonContainer}>
          <Button variant="contained" color="secondary" className={styles.linkButton}>
            <Typography className={styles.linkText}>Link Bank Account</Typography>
          </Button>
        </div>
      </>
    );
  };

  const renderNotLinkedCard = () => {
    return (
      <div className={classNames(styles.cardBlock, styles.notLinkedCardBlock)}>
        <div className={classNames(styles.notLinkedCard, styles.card)}>
          <Typography className={styles.cardTitle}>Bank Account</Typography>
          <Typography className={styles.cardNumber}>0000 **** **** 0000</Typography>
          <Typography className={styles.expireDate}>Expires End</Typography>
        </div>
      </div>
    );
  };

  return <div className={styles.mainContent}>{renderNotLinkedCardPage()}</div>;
};
