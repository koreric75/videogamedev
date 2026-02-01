import { Entity, EntityFactory, EntityManager, TransformComponent, PhysicsComponent } from '../src/game/core/entity';

describe('Entity System', () => {
  describe('Entity', () => {
    it('should create entity with unique ID', () => {
      const entity1 = new Entity();
      const entity2 = new Entity();
      
      expect(entity1.id).toBeDefined();
      expect(entity2.id).toBeDefined();
      expect(entity1.id).not.toBe(entity2.id);
    });

    it('should add and retrieve components', () => {
      const entity = new Entity();
      const transform: TransformComponent = {
        type: 'transform',
        position: { x: 0, y: 0 },
        rotation: 0,
        scale: { x: 1, y: 1 },
      };

      entity.addComponent(transform);
      
      expect(entity.hasComponent('transform')).toBe(true);
      expect(entity.getComponent('transform')).toBe(transform);
    });

    it('should remove components', () => {
      const entity = new Entity();
      const transform: TransformComponent = {
        type: 'transform',
        position: { x: 0, y: 0 },
        rotation: 0,
        scale: { x: 1, y: 1 },
      };

      entity.addComponent(transform);
      expect(entity.hasComponent('transform')).toBe(true);
      
      entity.removeComponent('transform');
      expect(entity.hasComponent('transform')).toBe(false);
    });

    it('should be destroyed when destroy is called', () => {
      const entity = new Entity();
      
      expect(entity.active).toBe(true);
      entity.destroy();
      expect(entity.active).toBe(false);
    });
  });

  describe('EntityFactory', () => {
    it('should create player with required components', () => {
      const player = EntityFactory.createPlayer(100, 200);
      
      expect(player.id).toBe('player');
      expect(player.hasComponent('transform')).toBe(true);
      expect(player.hasComponent('physics')).toBe(true);
      expect(player.hasComponent('sprite')).toBe(true);
      expect(player.hasComponent('collider')).toBe(true);
      expect(player.hasComponent('health')).toBe(true);
      
      const transform = player.getComponent<TransformComponent>('transform');
      expect(transform?.position.x).toBe(100);
      expect(transform?.position.y).toBe(200);
    });

    it('should create enemy with required components', () => {
      const enemy = EntityFactory.createEnemy(50, 75);
      
      expect(enemy.hasComponent('transform')).toBe(true);
      expect(enemy.hasComponent('physics')).toBe(true);
      expect(enemy.hasComponent('sprite')).toBe(true);
      expect(enemy.hasComponent('collider')).toBe(true);
      
      const transform = enemy.getComponent<TransformComponent>('transform');
      expect(transform?.position.x).toBe(50);
      expect(transform?.position.y).toBe(75);
    });

    it('should create pickup with required components', () => {
      const pickup = EntityFactory.createPickup(10, 20);
      
      expect(pickup.hasComponent('transform')).toBe(true);
      expect(pickup.hasComponent('sprite')).toBe(true);
      expect(pickup.hasComponent('collider')).toBe(true);
      
      const transform = pickup.getComponent<TransformComponent>('transform');
      expect(transform?.position.x).toBe(10);
      expect(transform?.position.y).toBe(20);
    });
  });

  describe('EntityManager', () => {
    let manager: EntityManager;

    beforeEach(() => {
      manager = new EntityManager();
    });

    it('should add and retrieve entities', () => {
      const entity = new Entity('test-id');
      manager.add(entity);
      
      expect(manager.get('test-id')).toBe(entity);
    });

    it('should remove entities', () => {
      const entity = new Entity('test-id');
      manager.add(entity);
      
      expect(manager.get('test-id')).toBe(entity);
      
      manager.remove('test-id');
      expect(manager.get('test-id')).toBeUndefined();
    });

    it('should get all entities', () => {
      const entity1 = new Entity('id1');
      const entity2 = new Entity('id2');
      
      manager.add(entity1);
      manager.add(entity2);
      
      const all = manager.getAll();
      expect(all).toHaveLength(2);
      expect(all).toContain(entity1);
      expect(all).toContain(entity2);
    });

    it('should get entities by component', () => {
      const entity1 = new Entity('id1');
      const entity2 = new Entity('id2');
      
      entity1.addComponent({
        type: 'transform',
        position: { x: 0, y: 0 },
        rotation: 0,
        scale: { x: 1, y: 1 },
      } as TransformComponent);
      
      manager.add(entity1);
      manager.add(entity2);
      
      const withTransform = manager.getByComponent('transform');
      expect(withTransform).toHaveLength(1);
      expect(withTransform[0]).toBe(entity1);
    });

    it('should clear all entities', () => {
      const entity1 = new Entity('id1');
      const entity2 = new Entity('id2');
      
      manager.add(entity1);
      manager.add(entity2);
      
      expect(manager.getAll()).toHaveLength(2);
      
      manager.clear();
      expect(manager.getAll()).toHaveLength(0);
    });
  });
});
