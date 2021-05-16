import React, { FC, useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useDelivery from '../../hooks/useDelivery';
import { useStores } from '../../store';

import { filterEarning } from '../../constants';
import useUser from '../../hooks/useUser';
import SVGIcon from '../common/SVGIcon';
import Select from '../common/Select';
import PendingBlock from '../common/PendingBlock';

import styles from './Earning.module.sass';

// const items = [
//   {
//     id: uuid(),
//     date: 'January 15, 2020',
//     time: '8:42 pm',
//     tripNumber: '92989921',
//     earned: '$192.10'
//   },
//   {
//     id: uuid(),
//     date: 'January 15, 2020',
//     time: '8:42 pm',
//     tripNumber: '92989921',
//     earned: '$192.10'
//   },
//   {
//     id: uuid(),
//     date: 'January 15, 2020',
//     time: '8:42 pm',
//     tripNumber: '92989921',
//     earned: '$192.10'
//   }
// ];

export const Earning: FC = () => {
  const user = useUser();
  const { getDeliveries, deliveries, getDeliveryOverview, filters, overview } = useDelivery();
  const { deliveryStore } = useStores();
  const { page } = filters;
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<number>(filterEarning[0].value);
  const PER_PAGE = 5;

  const getDeliveriesList = useCallback(async () => {
    setIsLoading(true);
    try {
      const deliveryList = await getDeliveries({
        sub: user.sub,
        page,
        perPage: PER_PAGE
      });
      deliveryStore.set('deliveries')(deliveryList.data);
      deliveryStore.set('meta')(deliveryList.meta);

      const deliveryOverview = await getDeliveryOverview({
        sub: user.sub,
        period
      });
      deliveryStore.set('overview')(deliveryOverview.data);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, [period, getDeliveries, page, deliveryStore]);

  useEffect(() => {
    getDeliveriesList().catch();
    // eslint-disable-next-line
  }, [page, period]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPeriod(event.target.value as number);
  };

  const renderProfitBlock = () => {
    return (
      <div className={styles.metrics}>
        <div className={styles.header}>
          <Typography className={styles.title}>Earning Metrics</Typography>
          <Select
            value={period}
            onChange={handleChange}
            items={filterEarning}
            IconComponent={() => <SVGIcon name={'downArrow'} style={{ height: '15px', width: '15px' }} />}
            classes={{ input: styles.input, root: styles.select }}
          />
        </div>
        <div className={styles.moneyWrapper}>
          <div className={classNames(styles.moneyBlock, styles.fullCol)}>
            <Typography className={styles.title}>Total Earned</Typography>
            <Typography className={classNames(styles.money, styles.earned)}>
              ${Math.floor(overview.totalFees + overview.totalTips)}
              <span className={styles.pennies}>
                .
                {Math.floor(
                  ((Math.abs(overview.totalFees + overview.totalTips) -
                    Math.floor(overview.totalFees + overview.totalTips)) *
                    100) %
                    100
                )}
              </span>
            </Typography>
          </div>
          <div className={classNames(styles.moneyBlock, styles.halfCol)}>
            <Typography className={classNames(styles.title, styles.left)}>Delivery Fees</Typography>
            <Typography className={classNames(styles.money, styles.left)}>
              ${Math.floor(overview.totalFees)}
              <span className={styles.pennies}>
                .{Math.floor(((Math.abs(overview.totalFees) - Math.floor(overview.totalFees)) * 100) % 100)}
              </span>
            </Typography>
          </div>
          <div className={classNames(styles.moneyBlock, styles.halfCol)}>
            <Typography className={classNames(styles.title, styles.right)}>Earned Tips</Typography>
            <Typography className={classNames(styles.money, styles.right)}>
              ${Math.floor(overview.totalTips)}
              <span className={styles.pennies}>
                .{Math.floor(((Math.abs(overview.totalTips) - Math.floor(overview.totalTips)) * 100) % 100)}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  const renderLastDeliveryHistory = (path: string) => {
    return (
      <div className={styles.deliveries}>
        <div className={styles.header}>
          <Typography className={styles.title}>Latest Delivery</Typography>
          <Link to={path} className={styles.link}>
            View All
          </Link>
        </div>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell className={classNames(styles.date, styles.headerCell)}>Date</TableCell>
              <TableCell className={classNames(styles.time, styles.headerCell)}>Time</TableCell>
              <TableCell className={classNames(styles.trip, styles.headerCell)}>Trip number</TableCell>
              <TableCell className={classNames(styles.earned, styles.headerCell)} align="right">
                Earned
              </TableCell>
            </TableRow>
          </TableHead>
          {!deliveries.length && (
            <Typography className={styles.noDelivery}>There is no delivery history yet</Typography>
          )}
          <TableBody>
            {deliveries.length &&
              deliveries.map((row) => (
                <TableRow key={row._id} className={styles.tableItem}>
                  <TableCell className={styles.date}>{row.updatedAt && moment(row.updatedAt).format('ll')}</TableCell>
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
    );
  };

  return (
    <div className={styles.earningWrapper}>
      {user.status !== 'ACTIVE' ? <PendingBlock className={styles.pendingBlock} /> : null}
      {renderProfitBlock()}
      {renderLastDeliveryHistory('/dashboard/delivery')}
    </div>
  );
};
