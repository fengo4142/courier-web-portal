import React, { FC, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';

import useDelivery from '../../hooks/useDelivery';
import { useStores } from '../../store';

import Search from '../common/Search';
import SVGIcon from '../common/SVGIcon';
import PendingBlock from '../common/PendingBlock';
import useUser from '../../hooks/useUser';

import styles from './Delivery.module.sass';

const items: any = [];

export const Delivery: FC = () => {
  const user = useUser();
  const { getDeliveries, filters, deliveries } = useDelivery();
  const { deliveryStore } = useStores();
  const { page, search } = filters;
  const [isLoading, setIsLoading] = useState(true);
  const PER_PAGE = 5;

  const getDeliveriesList = useCallback(async () => {
    setIsLoading(true);
    try {
      const deliveryList = await getDeliveries({
        sub: user.sub,
        page,
        perPage: PER_PAGE,
        search
      });
      deliveryStore.set('deliveries')(deliveryList.data);
      deliveryStore.set('meta')(deliveryList.meta);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, [getDeliveries, page, deliveryStore, search]);

  useEffect(() => {
    getDeliveriesList().catch();
    // eslint-disable-next-line
  }, [page, search]);

  const handleChangePage = () => {
    return <div />;
  };

  const renderNoDeliveries = () => {
    return (
      <div
        className={styles.paper}
        style={
          user.status === 'PENDING'
            ? { height: 'calc(100% - 99px - 32px - 127px)' }
            : { height: 'calc(100% - 99px - 32px)' }
        }
      >
        <div className={styles.noDeliveries}>
          <SVGIcon name={'noDeliveries'} />
          <Typography className={styles.title}>You haven't made deliveries yet</Typography>
          <Typography className={styles.subtitle}>
            All the information on completed deliveries will appear here
          </Typography>
        </div>
      </div>
    );
  };

  const renderHeaderBlock = () => {
    return (
      <div className={styles.header}>
        <div className={styles.navigation}>
          <Search
            classes={{
              input: styles.input,
              root: styles.search,
              inputRoot: styles.inputRoot
            }}
          />
          <Typography className={styles.title}>Delivery History</Typography>
          <TablePagination
            classes={{ caption: styles.pagination }}
            rowsPerPageOptions={[]}
            component="div"
            count={0}
            rowsPerPage={10}
            page={0}
            onChangePage={handleChangePage}
          />
        </div>
        <div className={styles.tableHeader}>
          <div className={styles.date}>Date</div>
          <div className={styles.time}>Time</div>
          <div className={styles.trip}>Trip number</div>
          <div className={styles.earned}>Earned</div>
        </div>
      </div>
    );
  };

  const renderDeliveryHistory = () => {
    if (deliveries.length > 0) {
      return (
        <div className={classNames(styles.paper, styles.deliveriesPaper)}>
          <div className={styles.deliveries}>
            <Table>
              <TableBody>
                {deliveries.map((row: any) => (
                  <TableRow key={row._id} className={styles.tableItem}>
                    <TableCell className={styles.date}>{row.updatedAt && moment(row.updatedAt).format('LL')}</TableCell>
                    <TableCell className={styles.time}>
                      {row.updatedAt && moment(row.updatedAt).format('HH:mm A')}
                    </TableCell>
                    <TableCell className={styles.trip}>
                      {row.order_uuid && row.order_uuid.replace('order-', '')}
                    </TableCell>
                    <TableCell className={styles.earned} align="right">
                      ${row.payout ? Number(row.payout.amount).toFixed(2) : '0.00'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    } else {
      return renderNoDeliveries();
    }
  };

  return (
    <div className={styles.deliveryWrapper}>
      {user.status !== 'ACTIVE' && <PendingBlock className={styles.pendingBlock} />}
      {renderHeaderBlock()}
      {renderDeliveryHistory()}
    </div>
  );
};
