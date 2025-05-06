// src/screens/priest/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { APP_COLORS } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/default-profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome, Pandit</Text>
            <Text style={styles.nameText}>{userInfo?.name || 'Sharma'}</Text>
            <View style={styles.profileMeta}>
              <Text style={styles.roleText}>
                Senior Priest • 12 years experience
              </Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statSubtext}>Confirmed ceremonies</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Earnings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Earnings')}>
              <Text style={styles.viewAllText}>This Month</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.statValue}>₹24,500</Text>
          <Text style={styles.statSubtext}>+12% from last month</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Bookings')}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={APP_COLORS.primary}
            />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>View Schedule</Text>
            <Text style={styles.actionText}>Manage bookings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Earnings')}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons
              name="wallet-outline"
              size={24}
              color={APP_COLORS.primary}
            />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Withdraw</Text>
            <Text style={styles.actionText}>Available: ₹12,300</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
  },
  headerContainer: {
    backgroundColor: APP_COLORS.white,
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: APP_COLORS.gray,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileMeta: {
    marginTop: 4,
  },
  roleText: {
    fontSize: 14,
    color: APP_COLORS.gray,
    marginBottom: 4,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: APP_COLORS.success,
    marginRight: 6,
  },
  onlineText: {
    color: APP_COLORS.success,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    width: '48%',
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: APP_COLORS.gray,
  },
  viewAllText: {
    fontSize: 12,
    color: APP_COLORS.primary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: APP_COLORS.gray,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 16,
    width: '48%',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: APP_COLORS.secondary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  actionText: {
    fontSize: 12,
    color: APP_COLORS.gray,
  },
});

export default HomeScreen;