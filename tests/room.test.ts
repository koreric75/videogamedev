/**
 * Room System Tests
 * Tests for room-based enemy spawning and transitions
 */

import { config } from '../src/game/config';

describe('Room System Configuration', () => {
  test('should have room configuration defined', () => {
    expect(config.room).toBeDefined();
    expect(config.room.enemiesPerRoom).toBeDefined();
    expect(config.room.totalRooms).toBeDefined();
  });

  test('should have valid room settings', () => {
    expect(config.room.enemiesPerRoom).toBeGreaterThan(0);
    expect(config.room.totalRooms).toBeGreaterThan(0);
  });

  test('should spawn correct number of enemies per room', () => {
    expect(config.room.enemiesPerRoom).toBe(3);
  });

  test('should have multiple rooms', () => {
    expect(config.room.totalRooms).toBe(5);
  });
});
